"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, BookOpen, Minus, Plus } from "lucide-react";
import { posts } from "@/data/posts";
import { openBookCall } from "../_components/bookCall";
import type { Post } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE },
  }),
};

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Full post body, revealed in place when a row opens. */
function PostBody({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-5 max-w-2xl pt-2 pb-8">
      {post.body.map((para, i) => (
        <p key={i} className="text-[var(--muted2)] text-base leading-relaxed">
          {para}
        </p>
      ))}
      <span className="sd-accent-line w-16 mt-2" />
      <span className="sd-mono text-[0.65rem] uppercase tracking-[0.16em] text-[var(--muted)]">
        Thanks for reading · Milap
      </span>
    </div>
  );
}

function JournalRow({
  post,
  open,
  onToggle,
}: {
  post: Post;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: EASE }}
      className="border-b border-[var(--line)]"
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="group w-full text-left py-7 sm:py-8 grid grid-cols-[1fr_auto] items-start gap-x-5"
      >
        <div className="flex flex-col gap-2.5 min-w-0">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            <time
              dateTime={post.date}
              className="sd-mono text-xs text-[var(--amber)] tracking-[0.1em] tabular-nums"
            >
              {formatDate(post.date)}
            </time>
            <span className="sd-mono text-[0.65rem] text-[var(--muted)] tracking-[0.1em] uppercase">
              {post.readTime} read
            </span>
          </div>

          <h2
            className={`sd-serif font-bold text-balance transition-colors duration-300 ${
              open ? "text-[var(--amber)]" : "text-[var(--white)] group-hover:text-[var(--amber)]"
            }`}
            style={{ fontSize: "clamp(1.4rem, 3vw, 2.1rem)", lineHeight: 1.15 }}
          >
            {post.title}
          </h2>

          {!open && (
            <p className="text-sm text-[var(--muted2)] leading-relaxed max-w-2xl">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mt-1">
            {post.tags.map((t) => (
              <span key={t} className="sd-chip">
                {t}
              </span>
            ))}
          </div>
        </div>

        <span
          className={`sd-icon-btn shrink-0 transition-all duration-300 ${
            open ? "text-[var(--amber)] border-[var(--amber)] rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          {open ? (
            <Minus className="w-4 h-4" strokeWidth={1.8} />
          ) : (
            <Plus className="w-4 h-4" strokeWidth={1.8} />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden"
          >
            <PostBody post={post} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function SDBlog() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p !== featured);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [featuredOpen, setFeaturedOpen] = useState(false);

  const toggle = (slug: string) =>
    setOpenSlug((cur) => (cur === slug ? null : slug));

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <span className="sd-hero-grid" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 sm:px-10 pt-36 pb-14 sm:pt-44 sm:pb-16">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mb-6"
          >
            <span className="sd-section-num">The Journal</span>
            <span className="sd-accent-line w-12" />
            <span className="sd-eyebrow">
              {String(posts.length).padStart(2, "0")} entries · read in place
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="show"
            className="sd-serif font-black text-[var(--white)] max-w-4xl"
            style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", lineHeight: 1.0 }}
          >
            Notes from the{" "}
            <span className="italic sd-amber">workbench</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed"
          >
            Short, practical writing on design, code, and the space between —
            every entry opens right here, no click-through required.
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-10 pb-24">
        {/* ── Featured entry ────────────────────────────────────────── */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="sd-card rounded-3xl overflow-hidden mb-14"
        >
          <button
            type="button"
            onClick={() => setFeaturedOpen((v) => !v)}
            aria-expanded={featuredOpen}
            className="w-full text-left p-7 sm:p-10 flex flex-col gap-4"
          >
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-[var(--amber)] text-[var(--on-amber)] font-medium inline-flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" strokeWidth={2} />
                Latest
              </span>
              <time
                dateTime={featured.date}
                className="sd-mono text-xs text-[var(--amber)] tracking-[0.1em] tabular-nums"
              >
                {formatDate(featured.date)}
              </time>
              <span className="sd-mono text-[0.65rem] text-[var(--muted)] tracking-[0.1em] uppercase">
                {featured.readTime} read
              </span>
            </div>

            <h2
              className="sd-serif font-black text-[var(--white)] text-balance"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", lineHeight: 1.08 }}
            >
              {featured.title}
            </h2>

            <p className="text-base text-[var(--muted2)] leading-relaxed max-w-2xl">
              {featured.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-1">
              <div className="flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span key={t} className="sd-chip">
                    {t}
                  </span>
                ))}
              </div>
              <span className="sd-mono text-[0.68rem] uppercase tracking-[0.14em] text-[var(--amber)] inline-flex items-center gap-1.5 ml-auto">
                {featuredOpen ? "Close" : "Read it here"}
                <ArrowUpRight
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${
                    featuredOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                />
              </span>
            </div>
          </button>

          <AnimatePresence initial={false}>
            {featuredOpen && (
              <motion.div
                key="featured-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <div className="px-7 sm:px-10">
                  <PostBody post={featured} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.article>

        {/* ── The rest, as journal rows ─────────────────────────────── */}
        <div className="border-t border-[var(--line)]">
          {rest.map((post) => (
            <JournalRow
              key={post.slug}
              post={post}
              open={openSlug === post.slug}
              onToggle={() => toggle(post.slug)}
            />
          ))}
        </div>

        {/* ── CTA strip ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="sd-serif text-2xl sm:text-3xl font-bold text-[var(--white)] max-w-md text-balance">
            Rather talk than <span className="italic sd-amber">read</span>?
          </p>
          <button type="button" onClick={openBookCall} className="sd-btn-primary w-fit">
            Book a free call
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </motion.div>
      </section>
    </>
  );
}
