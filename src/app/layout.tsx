import type { Metadata, Viewport } from "next";
import { Amarante, Lora } from "next/font/google";
import { EMAIL, profile, socials } from "@/data/profile";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl, KEYWORDS, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: KEYWORDS,
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    firstName: "Milap",
    lastName: "Magar",
    username: profile.handle,
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${profile.name} — ${profile.role}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon-192.png", type: "image/png", sizes: "192x192" }],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: "AzbXfTo21CjUunu98OjiNdvqCGOFetBuEKVEBfW72WI",
  },
};

export const viewport: Viewport = {
  themeColor: "#f4ead6",
  colorScheme: "light",
};

/* Site-wide structured data: who this is, and that the site is theirs. Pages add their own. */
const PERSON_ID = absoluteUrl("/#person");
const siteJsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    alternateName: profile.handle,
    url: SITE_URL,
    image: absoluteUrl(profile.avatar ?? "/og.png"),
    jobTitle: profile.role,
    description: SITE_DESCRIPTION,
    email: `mailto:${EMAIL}`,
    worksFor: { "@type": "Organization", name: profile.company, url: "https://chatblix.com" },
    address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
    nationality: { "@type": "Country", name: "Nepal" },
    knowsAbout: ["Product design", "Design systems", "React", "Next.js", "TypeScript", "Node.js", "Java", "Spring Boot", "PostgreSQL"],
    sameAs: Object.values(socials),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="antialiased">
        {children}
        <JsonLd data={siteJsonLd} />
      </body>
    </html>
  );
}
