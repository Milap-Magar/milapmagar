import type { Metadata, Viewport } from "next";
import { Amarante, Lora } from "next/font/google";
import "./globals.css";

/* Amarante carries the personality (name, headings); Lora keeps long text readable. */
const display = Amarante({
  variable: "--font-amarante",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const body = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Milap Magar — Designer & Developer",
  description:
    "Designer & full-stack developer from Kathmandu. Product design, design systems, and Next.js engineering — shipped end to end.",
  verification: {
    google: "AzbXfTo21CjUunu98OjiNdvqCGOFetBuEKVEBfW72WI",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ead6",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
