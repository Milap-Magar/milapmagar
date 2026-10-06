import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { projects } from "@/data/projects";
import { absoluteUrl } from "@/lib/site";

/* Served at /sitemap.xml. Pages are listed by hand; posts come from data/posts.ts. */
export default function sitemap(): MetadataRoute.Sitemap {
  const newestPost = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))[0]?.date;
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/og.png"), ...projects.map((p) => absoluteUrl(p.image))],
    },
    { url: absoluteUrl("/projects"), lastModified: now, changeFrequency: "monthly", priority: 0.9, images: projects.map((p) => absoluteUrl(p.image)) },
    { url: absoluteUrl("/experience"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), lastModified: newestPost ? new Date(newestPost) : now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...pages, ...postPages];
}
