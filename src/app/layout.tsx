import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP, Tangerine } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configure Noto Sans JP
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-noto-sans-jp", 
});

const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-tangerine",
});

export const metadata: Metadata = {
  title: "Milap Magar",
  description: "Designed & Coded by Milx",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} ${tangerine.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
