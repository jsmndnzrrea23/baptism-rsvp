# RSVP App Setup Instructions

## Google Sheets Integration Setup

To enable Google Sheets logging for RSVP responses, follow these steps:

### 1. Create a Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one

### 2. Enable Google Sheets API
1. In the Google Cloud Console, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### 3. Create a Service Account
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "Service Account"
3. Fill in the service account details
4. Click "Create and Continue"
5. Skip the optional steps and click "Done"

### 4. Generate Service Account Key
1. Click on the created service account
2. Go to the "Keys" tab
3. Click "Add Key" > "Create new key"
4. Choose "JSON" format
5. Download the JSON file

### 5. Create Google Spreadsheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Baptism RSVP Responses" (or any name you prefer)
4. Create headers in row 1: `Timestamp`, `Name`, `Email`, `Attending`, `Guest Count`, `Message`
5. Copy the spreadsheet ID from the URL (the long string between `/d/` and `/edit`)

### 6. Share Spreadsheet with Service Account
1. In your Google Spreadsheet, click "Share"
2. Add the service account email (found in the JSON file as `client_email`)
3. Give it "Editor" permissions

### 7. Set Environment Variables
Create a `.env.local` file in your project root with:

```env
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_CREDENTIALS={"type":"service_account","project_id":"your_project_id",...}
```

Copy the entire JSON content from the downloaded service account key file to the `GOOGLE_CREDENTIALS` variable.

### 8. Test the Integration
1. Run your Next.js app: `npm run dev`
2. Go to the RSVP page and submit a test response
3. Check your Google Spreadsheet to see if the data appears

## Customization

### Update Event Details
Edit `/app/page.tsx` and update the event details section with:
- Actual date
- Actual time  
- Actual location

### Add Baby Photo
Replace the emoji placeholder in `/app/page.tsx` with an actual photo:
1. Add the photo to the `/public` folder
2. Update the image source in the component

### Styling
The app uses Tailwind CSS. You can customize colors, fonts, and layout by modifying the className attributes in the components.

## Features

- ✅ Beautiful welcome page with GSAP animations
- ✅ Responsive RSVP form
- ✅ Google Sheets integration for data logging
- ✅ Form validation
- ✅ Success/error handling
- ✅ Modern, baptism-themed design
- ✅ Mobile-friendly interface
