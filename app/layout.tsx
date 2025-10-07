import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Open_Sans } from "next/font/google";
import "./globals.css";
import { EVENT_INFO } from "./constants/eventInfo";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Baptism of ${EVENT_INFO.baptism.childName} - ${EVENT_INFO.baptism.date.formatted}`,
  description: `Join us for the baptism of ${EVENT_INFO.baptism.childName} on ${EVENT_INFO.baptism.date.formatted} at ${EVENT_INFO.baptism.time}. ${EVENT_INFO.messages.welcomeSubtitle} RSVP now!`,
  keywords: [
    "baptism",
    EVENT_INFO.baptism.childName,
    `${EVENT_INFO.baptism.date.month} ${EVENT_INFO.baptism.date.day} ${EVENT_INFO.baptism.date.year}`,
    "Catholic baptism",
    "baby baptism",
    "invitation",
    "RSVP",
    EVENT_INFO.baptism.church.name,
  ],
  authors: [{ name: "Gianna's Family" }],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "your-google-verification-code", // Add if you have one
  },
  openGraph: {
    title: `Baptism of ${EVENT_INFO.baptism.childName}`,
    description: `Join us for this special celebration on ${EVENT_INFO.baptism.date.formatted} at ${EVENT_INFO.baptism.time}`,
    type: "website",
    locale: "en_US",
    url: "https://giannalouise-rsvp.vercel.app",
    siteName: "Gianna's Baptism RSVP",
    images: [
      {
        url: "/gianna.jpeg",
        width: 1200,
        height: 630,
        alt: `Photo of ${EVENT_INFO.baptism.childName}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Baptism of ${EVENT_INFO.baptism.childName}`,
    description: `Join us for this special celebration on ${EVENT_INFO.baptism.date.formatted} at ${EVENT_INFO.baptism.time}`,
    images: ["/gianna.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.variable} ${greatVibes.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
