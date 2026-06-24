"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Figma,
} from "lucide-react";
import { projects } from "@/data/projects";
import SDSection from "./SDSection";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* The image-led "featured" tile and the green CTA pull from real projects. */
const featured = projects[0];
const spotlight =
  projects.find((p) => !p.commingSoon && p.title !== featured.title) ??
  projects.find((p) => p.title !== featured.title) ??
  projects[0];

const socials = [
  { Icon: Mail, href: "mailto:info@milapmagar.com.np", label: "Email" },
  { Icon: Github, href: "https://github.com/Milap-Magar", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
  { Icon: Figma, href: "https://figma.com", label: "Figma" },
];

const testimonials = [
  {
    quote:
      "Milap is that rare hire who owns both the design and the build. He turned a fuzzy brief into a product that looked sharp and shipped on time.",
    author: "Founder, Shreejana Dry Fruits",
  },
  {
    quote:
      "Working with Milap felt effortless. He thinks in systems, sweats the details, and writes clean, type-safe code. Our frontend has never felt this polished.",
    author: "Product Lead, Early-stage SaaS",
  },
  {
    quote:
      "A genuine full-stack designer. From Figma flows to a pixel-perfect React build, he carried the whole journey and made the hard parts look easy.",
    author: "Indie Maker, Kathmandu",
  },
];

export default function SDSelectedWork() {
  const [t, setT] = useState(0);
  const next = () => setT((i) => (i + 1) % testimonials.length);
  const prev = () =>
    setT((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <SDSection
      id="work"
      num="02"
      title="Selected Work"
      intro="A few things I've designed, built, and shipped."
    >
      <motion.div
        className="sd-bento"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* ── Brand panel (tall, left) ─────────────────────────────────── */}
        <motion.div
          variants={tile}
          className="sd-area-brand sd-brand-panel relative rounded-2xl p-7 flex flex-col justify-between min-h-[260px]"
        >
          <span className="sd-brand-motif" aria-hidden="true" />
          <div className="relative flex flex-col gap-1">
            <span className="sd-serif text-2xl font-bold leading-none">
              Milap Magar
            </span>
            <span className="sd-mono text-[0.6rem] tracking-[0.2em] text-[#9a9aa1]">
              Designer · Developer
            </span>
          </div>

          <div className="relative pointer-events-none select-none">
            <span className="sd-serif font-black leading-none text-white/[0.05] text-[8rem]">
              MM
            </span>
          </div>

          <div className="relative flex items-center gap-2 sd-mono text-[0.66rem] text-[#9a9aa1]">
            <span className="sd-pulse-dot" />
            Available for new work
          </div>
        </motion.div>

        {/* ── Featured project (image, centre-top) ─────────────────────── */}
        <motion.a
          variants={tile}
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          className="sd-area-article sd-card group relative rounded-2xl overflow-hidden min-h-[280px] flex"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={featured.image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
          <span className="absolute top-4 left-4 sd-mono text-[0.6rem] uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-[var(--amber)] text-[var(--on-amber)] font-medium">
            Featured
          </span>
          <div className="relative mt-auto p-6 flex items-end justify-between gap-4 w-full">
            <div className="flex flex-col gap-1.5">
              <h3 className="sd-serif text-2xl sm:text-3xl font-bold text-white">
                {featured.title.trim()}
              </h3>
              <p className="sd-body text-sm text-white/70 max-w-md leading-relaxed">
                {featured.tagline}
              </p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-white shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </div>
        </motion.a>

        {/* ── Hello (right-top) ────────────────────────────────────────── */}
        <motion.div
          variants={tile}
          className="sd-area-hello sd-card rounded-2xl p-7 flex flex-col justify-center gap-3 min-h-[180px]"
        >
          <h3 className="sd-serif text-3xl font-bold text-(--white) flex items-center gap-2">
            Hello{" "}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: [0, 16, -8, 16, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 2.4 }}
              className="inline-block origin-[70%_70%]"
            >
              👋
            </motion.span>
          </h3>
          <p className="sd-body text-sm text-(--muted2) leading-relaxed">
            I&apos;m Milap — a designer &amp; developer crafting products that
            feel right. I handle the whole journey, from Figma flows and design
            systems to pixel-perfect, production-ready React.
          </p>
        </motion.div>

        {/* ── Social links (centre, under featured) ────────────────────── */}
        <motion.div
          variants={tile}
          className="sd-area-social sd-card rounded-2xl p-6 flex flex-col justify-center gap-4 min-h-[140px]"
        >
          <span className="sd-eyebrow">Let&apos;s connect</span>
          <div className="flex flex-wrap items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="sd-social-tile"
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* ── Green CTA / spotlight (tall, right) ───────────────────────── */}
        <motion.div
          variants={tile}
          className="sd-area-green sd-green-card group relative rounded-2xl p-7 flex flex-col min-h-[420px]"
        >
          <div className="relative z-1 flex flex-col gap-4">
            <span className="sd-green-tag">{spotlight.title.trim()}</span>
            <h3 className="sd-serif text-3xl sm:text-4xl font-bold leading-[1.05]">
              Bringing ideas to life.
            </h3>
            <p className="sd-body text-sm leading-relaxed text-[#08110d]/80 max-w-xs">
              {spotlight.tagline} Designed and built end-to-end — from the first
              wireframe to a fast, polished launch.
            </p>
            <a
              href={spotlight.url}
              target="_blank"
              rel="noopener noreferrer"
              className="sd-green-btn mt-1 w-fit"
            >
              Visit site
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </a>
          </div>

          {/* spotlight preview peeking from the bottom */}
          <div className="absolute -bottom-6 -right-4 left-8 top-[60%] rounded-tl-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 rotate-[2deg] transition-transform duration-500 group-hover:rotate-0 group-hover:-translate-y-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={spotlight.image}
              alt={spotlight.title}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </motion.div>

        {/* ── Testimonials (bottom, wide) ──────────────────────────────── */}
        <motion.div
          variants={tile}
          className="sd-area-testi sd-card rounded-2xl p-7 flex flex-col gap-4 min-h-[220px]"
        >
          <div className="flex items-center justify-between">
            <span className="sd-eyebrow">Testimonials</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous testimonial"
                className="sd-icon-btn !w-9 !h-9"
              >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next testimonial"
                className="sd-icon-btn !w-9 !h-9"
              >
                <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
              </button>
            </div>
          </div>

          <div className="relative flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.figure
                key={t}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <blockquote className="sd-body text-base sm:text-lg leading-relaxed text-[var(--white)]">
                  &ldquo;{testimonials[t].quote}&rdquo;
                </blockquote>
                <figcaption className="sd-mono text-xs text-[var(--amber)] not-italic">
                  — {testimonials[t].author}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setT(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === t ? 22 : 8,
                  background: i === t ? "var(--amber)" : "var(--faint)",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </SDSection>
  );
}
