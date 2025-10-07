import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Google Sheets configuration
const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
const SHEET_NAME = 'RSVP Responses';
const GOOGLE_CREDENTIALS = process.env.GOOGLE_CREDENTIALS;

interface RSVPData {
  name: string;
  email: string;
  attending: string;
  guestCount: number;
  message: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: Omit<RSVPData, 'timestamp'> = await request.json();
    
    // Add timestamp
    const rsvpData: RSVPData = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // If Google Sheets is not configured, just log the data
    if (!SPREADSHEET_ID || !GOOGLE_CREDENTIALS) {
      console.log('RSVP Data (Google Sheets not configured):', rsvpData);
      return NextResponse.json({ 
        success: true, 
        message: 'RSVP received (not logged to Google Sheets - configuration needed)' 
      });
    }

    // Initialize Google Sheets API with new JWT constructor
    const credentials = JSON.parse(GOOGLE_CREDENTIALS);
    
    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // First, let's check if the spreadsheet exists and get its sheets
    try {
      const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
      });
      
      console.log('Available sheets:', spreadsheet.data.sheets?.map(sheet => sheet.properties?.title));
      
      // Check if our target sheet exists
      const targetSheet = spreadsheet.data.sheets?.find(
        sheet => sheet.properties?.title === SHEET_NAME
      );
      
      if (!targetSheet) {
        console.log(`Sheet "${SHEET_NAME}" not found. Available sheets:`, 
          spreadsheet.data.sheets?.map(sheet => sheet.properties?.title));
        
        // Try using the first sheet instead
        const firstSheet = spreadsheet.data.sheets?.[0]?.properties?.title || 'Sheet1';
        console.log(`Using first available sheet: ${firstSheet}`);
        
        // Prepare the row data
        const values = [
          rsvpData.timestamp,
          rsvpData.name,
          rsvpData.email,
          rsvpData.attending,
          rsvpData.guestCount.toString(),
          rsvpData.message || '',
        ];

        // Append the data to the first sheet
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${firstSheet}!A:F`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [values],
          },
        });
      } else {
        // Sheet exists, proceed normally
        const values = [
          rsvpData.timestamp,
          rsvpData.name,
          rsvpData.email,
          rsvpData.attending,
          rsvpData.guestCount.toString(),
          rsvpData.message || '',
        ];

        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_NAME}!A:F`,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [values],
          },
        });
      }
    } catch (spreadsheetError) {
      console.error('Error accessing spreadsheet:', spreadsheetError);
      throw new Error(`Cannot access spreadsheet. Please check if the spreadsheet ID is correct and the service account has access.`);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'RSVP submitted successfully' 
    });

  } catch (error) {
    console.error('Error processing RSVP:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit RSVP' 
      },
      { status: 500 }
    );
  }
}
