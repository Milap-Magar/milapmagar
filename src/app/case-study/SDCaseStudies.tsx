"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { openBookCall } from "../_components/bookCall";
import type { CaseStudy } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE },
  }),
};

/** Counts up from 0 when it scrolls into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

/** Full-bleed screenshot panel with a gentle scroll parallax. */
function ParallaxPanel({ study }: { study: CaseStudy }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-3xl border border-[var(--line)] h-[300px] sm:h-[460px]"
    >
      <motion.div style={{ y }} className="absolute -inset-y-[12%] inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={study.image}
          alt={`${study.title} interface`}
          className="w-full h-full object-cover object-top"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <a
        href={study.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-5 left-5 sd-mono text-[0.65rem] uppercase tracking-[0.16em] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 text-white backdrop-blur-sm border border-white/15 hover:bg-[var(--amber)] hover:text-[var(--on-amber)] hover:border-transparent transition-colors"
      >
        {study.url.replace("https://", "")}
        <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
      </a>
    </div>
  );
}

function Study({ study }: { study: CaseStudy }) {
  return (
    <article className="mx-auto max-w-7xl px-6 sm:px-10 py-16 sm:py-24">
      {/* ── Study header ────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="flex flex-col gap-6 mb-12"
      >
        <div className="flex items-center gap-3">
          <span className="sd-section-num">Case Study {study.index}</span>
          <span className="sd-accent-line w-12" />
          <span className="sd-eyebrow">{study.year}</span>
        </div>

        <h2
          className="sd-serif font-black text-[var(--white)]"
          style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)", lineHeight: 1.0 }}
        >
          {study.title}
        </h2>

        <p className="max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed">
          {study.subtitle}
        </p>

        {/* meta strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--line)]">
          <div className="bg-[var(--ink)] px-5 py-4 flex flex-col gap-1">
            <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Role
            </span>
            <span className="text-sm text-[var(--white)]">{study.role}</span>
          </div>
          <div className="bg-[var(--ink)] px-5 py-4 flex flex-col gap-1">
            <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Year
            </span>
            <span className="text-sm text-[var(--white)]">{study.year}</span>
          </div>
          <div className="bg-[var(--ink)] px-5 py-4 flex flex-col gap-1">
            <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Status
            </span>
            <span className="text-sm text-[var(--white)] flex items-center gap-2">
              {study.live && <span className="sd-pulse-dot" />}
              {study.live ? "Live in production" : "In development"}
            </span>
          </div>
          <div className="bg-[var(--ink)] px-5 py-4 flex flex-col gap-1">
            <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] text-[var(--muted)]">
              Stack
            </span>
            <span className="text-sm text-[var(--white)]">
              {study.stack.join(" · ")}
            </span>
          </div>
        </div>
      </motion.header>

      {/* ── Screenshot with parallax ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <ParallaxPanel study={study} />
      </motion.div>

      {/* ── Stats band ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
      >
        {study.stats.map((s) => (
          <div key={s.label} className="sd-card p-6 flex flex-col gap-1">
            <span className="sd-serif font-bold text-4xl text-[var(--amber)]">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="sd-mono text-[0.65rem] text-[var(--muted)] tracking-[0.12em] uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* ── Chapters ────────────────────────────────────────────────── */}
      <div className="mt-16 flex flex-col gap-16 sm:gap-20">
        {study.chapters.map((c, i) => (
          <motion.section
            key={c.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grid lg:grid-cols-[240px_1fr] gap-6 lg:gap-14"
          >
            {/* chapter rail — sticks while its copy scrolls (desktop) */}
            <div className="lg:sticky lg:top-28 self-start flex lg:flex-col items-baseline lg:items-start gap-3">
              <span className="sd-serif text-5xl font-black text-[var(--faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="sd-eyebrow">{c.label}</span>
              <span className="hidden lg:block sd-accent-line w-10 mt-2" />
            </div>

            <div className="flex flex-col gap-5 max-w-2xl">
              <h3 className="sd-serif text-2xl sm:text-3xl font-bold text-[var(--white)] text-balance">
                {c.heading}
              </h3>
              {c.body.map((para, j) => (
                <p
                  key={j}
                  className="text-[var(--muted2)] text-base leading-relaxed"
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.section>
        ))}
      </div>

      {/* ── Pull quote ──────────────────────────────────────────────── */}
      <motion.blockquote
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mt-20 border-l-2 border-[var(--amber)] pl-6 sm:pl-10 py-2"
      >
        <p className="sd-serif italic font-bold text-[var(--white)] text-balance text-2xl sm:text-[2rem] leading-snug max-w-3xl">
          &ldquo;{study.pullQuote}&rdquo;
        </p>
        <footer className="sd-mono text-xs text-[var(--amber)] mt-4">
          — Milap, on {study.title}
        </footer>
      </motion.blockquote>
    </article>
  );
}

export default function SDCaseStudies() {
  // reading progress across the whole page, pinned just under the navbar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  return (
    <>
      <motion.span
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed top-16 left-0 right-0 h-0.5 z-40 origin-left bg-[var(--amber)]"
      />

      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <span className="sd-hero-grid" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 sm:px-10 pt-36 pb-10 sm:pt-44 sm:pb-14">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mb-6"
          >
            <span className="sd-section-num">The Deep Dives</span>
            <span className="sd-accent-line w-12" />
            <span className="sd-eyebrow">
              {String(caseStudies.length).padStart(2, "0")} studies
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
            How the work actually{" "}
            <span className="italic sd-amber">gets made</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed"
          >
            Two products, start to finish — the problem, the approach, the
            build, and what shipped. No highlight reel; the real decisions.
          </motion.p>
        </div>
      </section>

      {caseStudies.map((study, i) => (
        <div key={study.slug}>
          {i > 0 && (
            <div className="mx-auto max-w-7xl px-6 sm:px-10">
              <div className="border-t border-[var(--line)]" />
            </div>
          )}
          <Study study={study} />
        </div>
      ))}

      {/* ── CTA strip ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: EASE }}
        className="mx-auto max-w-7xl px-6 sm:px-10 pb-24 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
      >
        <p className="sd-serif text-2xl sm:text-3xl font-bold text-[var(--white)] max-w-md text-balance">
          Want this level of care on{" "}
          <span className="italic sd-amber">your product</span>?
        </p>
        <button type="button" onClick={openBookCall} className="sd-btn-primary w-fit">
          Book a free call
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </button>
      </motion.div>
    </>
  );
}
