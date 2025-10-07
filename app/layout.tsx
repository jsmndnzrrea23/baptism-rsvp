import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Open_Sans } from "next/font/google";
import "./globals.css";

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
  title: "Baptism of Gianna Louise Nazarrea - October 24, 2024",
  description:
    "Join us for the baptism of Gianna Louise Nazarrea on Friday, October 24, 2024 at 09:00 AM. A special day filled with love, joy, and blessings. RSVP now!",
  keywords: [
    "baptism",
    "Gianna Louise Nazarrea",
    "October 24 2024",
    "Catholic baptism",
    "baby baptism",
    "invitation",
    "RSVP",
  ],
  authors: [{ name: "Gianna's Family" }],
  openGraph: {
    title: "Baptism of Gianna Louise Nazarrea",
    description:
      "Join us for this special celebration on October 24, 2024 at 09:00 AM",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baptism of Gianna Louise Nazarrea",
    description:
      "Join us for this special celebration on October 24, 2024 at 09:00 AM",
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
