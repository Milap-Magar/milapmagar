import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { posts } from "@/data/posts";
import { profile } from "@/data/profile";
import { JsonLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { Squiggle } from "../../../_components/shared";

const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  const base = pageMetadata({ title: post.title, description: post.excerpt, path: `/blog/${post.slug}`, type: "article" });
  return {
    ...base,
    keywords: post.tags,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [absoluteUrl("/")],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const post = sorted[index];
  const newer = sorted[index - 1];
  const older = sorted[index + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#post`),
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    wordCount: post.body.join(" ").split(/\s+/).length,
    inLanguage: "en",
    image: absoluteUrl("/og.png"),
    author: { "@id": absoluteUrl("/#person") },
    publisher: { "@id": absoluteUrl("/#person") },
    isPartOf: { "@id": absoluteUrl("/blog#blog") },
  };

  return (
    <article className="mx-auto max-w-[46rem]">
      <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm italic text-fg-3 hover:text-accent">
        <ArrowLeft className="h-3.5 w-3.5" /> all posts
      </Link>

      <header className="mt-4">
        <p className="flex flex-wrap items-center gap-x-3 text-sm italic text-fg-3">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} read</span>
          <span aria-hidden="true">·</span>
          <span>by {profile.name}</span>
        </p>
        <h1 className="relative mt-2 w-fit font-display text-[2.2rem] leading-[1.1] text-fg sm:text-[2.6rem]">
          {post.title}
          <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
        </h1>
        <div className="mt-6 flex flex-wrap gap-1.5">
          {post.tags.map((t) => (
            <span key={t} className="rounded-md border border-line bg-paper-2/60 px-2 py-0.5 text-xs text-fg-2">
              {t}
            </span>
          ))}
        </div>
      </header>

      <div className="card ruled mt-6 px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-display text-[1.25rem] leading-snug text-fg">{post.excerpt}</p>
        <div className="mt-6 space-y-5 text-[1.02rem] leading-8 text-fg-2">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      <nav aria-label="More posts" className="mt-8 grid gap-4 sm:grid-cols-2">
        {older ? (
          <Link href={`/blog/${older.slug}`} className="card group p-4 transition-colors hover:border-accent">
            <span className="flex items-center gap-1 text-xs italic text-fg-3">
              <ArrowLeft className="h-3 w-3" /> older
            </span>
            <span className="mt-1 block font-display text-lg leading-tight text-fg group-hover:text-accent">{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link href={`/blog/${newer.slug}`} className="card group p-4 text-right transition-colors hover:border-accent">
            <span className="flex items-center justify-end gap-1 text-xs italic text-fg-3">
              newer <ArrowRight className="h-3 w-3" />
            </span>
            <span className="mt-1 block font-display text-lg leading-tight text-fg group-hover:text-accent">{newer.title}</span>
          </Link>
        )}
      </nav>
      <JsonLd data={jsonLd} />
    </article>
  );
}
