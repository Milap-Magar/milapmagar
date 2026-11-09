import type { Metadata } from "next";
import { absoluteUrl, FEED_PATH, SITE_NAME } from "./site";

/** Per-page metadata with a canonical URL and matching Open Graph / Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  image = "/og.png",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url, types: { "application/rss+xml": [{ url: FEED_PATH, title: `${SITE_NAME} — Blog` }] } },
    openGraph: {
      type,
      url,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `${title} · ${SITE_NAME}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
      images: [image],
    },
  };
}

/** BreadcrumbList for a subpage; "Home" is added for you. Pass the trail in order, ending on the current page. */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

/** Renders a JSON-LD block. Pass a plain object (or an array of them). */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is data, not markup; escaping "<" keeps it from closing the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
