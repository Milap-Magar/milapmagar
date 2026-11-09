import { posts } from "@/data/posts";
import { EMAIL, profile } from "@/data/profile";
import { absoluteUrl, FEED_PATH, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");

const rfc822 = (iso: string) => new Date(`${iso}T00:00:00Z`).toUTCString();

/* Served at /feed.xml — the blog as RSS 2.0, full text, newest first. Generated from data/posts.ts. */
export function GET() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = sorted
    .map((p) => {
      const url = absoluteUrl(`/blog/${p.slug}`);
      const html = p.body.map((para) => `<p>${escape(para)}</p>`).join("");
      return `    <item>
      <title>${escape(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <author>${EMAIL} (${escape(profile.name)})</author>
${p.tags.map((t) => `      <category>${escape(t)}</category>`).join("\n")}
      <description>${escape(p.excerpt)}</description>
      <content:encoded><![CDATA[${html.replace(/]]>/g, "]]]]><![CDATA[>")}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escape(`${SITE_NAME} — Blog`)}</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl(FEED_PATH)}" rel="self" type="application/rss+xml" />
    <description>Notes on design systems, React and shipping products in Nepal.</description>
    <language>en</language>
${sorted[0] ? `    <lastBuildDate>${rfc822(sorted[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
