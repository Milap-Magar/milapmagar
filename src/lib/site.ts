/** Canonical site facts shared by metadata, sitemap, robots, JSON-LD and the share card. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://milapmagar.com.np").replace(/\/$/, "");
export const SITE_NAME = "Milap Magar";
export const SITE_TITLE = "Milap Magar — Designer & Full-Stack Developer in Kathmandu, Nepal";
export const SITE_DESCRIPTION =
  "Milap Magar is a product designer and full-stack developer from Kathmandu, Nepal. Design systems, Next.js, React, Node.js, Java and Spring Boot — products designed and shipped end to end, including Chatblix, Shelfmallow and PixSift.";

export const KEYWORDS = [
  "Milap Magar",
  "Milap Magar developer",
  "Milap Magar designer",
  "full-stack developer Kathmandu",
  "full-stack developer Nepal",
  "product designer Nepal",
  "Next.js developer Nepal",
  "React developer Kathmandu",
  "Java Spring Boot developer Nepal",
  "freelance web developer Nepal",
  "UI UX designer Kathmandu",
  "Chatblix",
  "Shelfmallow",
  "PixSift",
];

/** Absolute URL for a site path — JSON-LD and sitemaps want absolute links. */
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
