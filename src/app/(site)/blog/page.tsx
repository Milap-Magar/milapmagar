import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import PageHeader from "../../_components/PageHeader";

const description =
  "Notes from Milap Magar on design systems, React and Framer Motion, shipping products in Nepal, and the lessons behind Chatblix and other projects.";

export const metadata: Metadata = pageMetadata({ title: "Blog", description, path: "/blog" });

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export default function BlogPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `Blog · ${profile.name}`,
    url: absoluteUrl("/blog"),
    description,
    isPartOf: { "@id": absoluteUrl("/#website") },
    author: { "@id": absoluteUrl("/#person") },
    blogPost: sorted.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
      description: p.excerpt,
      keywords: p.tags.join(", "),
      author: { "@id": absoluteUrl("/#person") },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="notes, written slowly"
        title="Blog"
        intro="Things I learned while building — design handoff, animation patterns, and what shipping for real people in Nepal teaches you."
      />

      {sorted.length === 0 ? (
        <p className="card p-6 italic text-fg-2">Nothing here yet — the first post is being written.</p>
      ) : (
        <ul className="flex flex-col gap-6">
          {sorted.map((post, i) => (
            <li key={post.slug}>
              <article className={`card group relative p-5 sm:p-6 ${i % 2 ? "rotate-[0.3deg]" : "-rotate-[0.3deg]"} transition-transform hover:rotate-0`}>
                {post.featured && <span className="tape -top-2.5 left-6 -rotate-[6deg]" aria-hidden="true" />}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm italic text-fg-3">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime} read</span>
                  {post.featured && (
                    <span className="not-italic rounded-full border border-dashed border-accent px-2 py-0.5 text-xs text-accent">pinned</span>
                  )}
                </div>
                <h2 className="mt-2 font-display text-[1.6rem] leading-tight text-fg">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 hover:text-accent">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-fg-2">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap items-center gap-1.5">
                  {post.tags.map((t) => (
                    <span key={t} className="rounded-md border border-line bg-paper-2/60 px-2 py-0.5 text-xs text-fg-2">
                      {t}
                    </span>
                  ))}
                  <span className="ml-auto flex items-center gap-1 font-display text-lg text-fg-2 transition-colors group-hover:text-accent">
                    Read <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      <JsonLd data={jsonLd} />
    </>
  );
}
