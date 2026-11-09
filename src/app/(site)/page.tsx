import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { getGithubData } from "@/lib/github";
import { JsonLd } from "@/lib/seo";
import { absoluteUrl, FEED_PATH, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import HomeBoard from "../_components/HomeBoard";

export const revalidate = 21600;

/* Title, description and share cards come from the root layout; only the canonical is the home page's own. */
export const metadata: Metadata = {
  alternates: {
    canonical: SITE_URL,
    types: { "application/rss+xml": [{ url: FEED_PATH, title: `${SITE_NAME} — Blog` }] },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": absoluteUrl("/#profile"),
  url: SITE_URL,
  name: SITE_TITLE,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  isPartOf: { "@id": absoluteUrl("/#website") },
  about: { "@id": absoluteUrl("/#person") },
  mainEntity: { "@id": absoluteUrl("/#person") },
  primaryImageOfPage: absoluteUrl(profile.avatar ?? "/og.png"),
};

export default async function Home() {
  const github = await getGithubData();
  return (
    <>
      <HomeBoard github={github} />
      <JsonLd data={jsonLd} />
    </>
  );
}
