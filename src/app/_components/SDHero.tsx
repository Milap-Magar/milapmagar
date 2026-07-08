"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Instagram } from "lucide-react";
import { openBookCall } from "./bookCall";

const stats = [
  { value: "2+", label: "Years shipping" },
  { value: "10+", label: "Products built" },
  { value: "2+", label: "Happy clients" },
  { value: "100%", label: "Hands-on" },
];

const socials = [
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
];

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.7, ease: EASE },
  }),
};

export default function SDHero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* crossed "boxed" background — shown in the hero only */}
      <span className="sd-hero-grid" aria-hidden="true" />
      <div className="relative z-[1] mx-auto max-w-7xl px-6 sm:px-10 pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="flex flex-col items-start gap-8">
        {/* Photo + greeting + availability */}
        <motion.div
          custom={0}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex items-center gap-4"
        >
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-[var(--faint)]">
            <Image
              src="/mm.png"
              alt="Milap Magar"
              fill
              className="object-cover"
              sizes="56px"
              priority
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="sd-mono text-sm text-[var(--muted2)]">
              Hi, my name is Milap
            </span>
            <span className="flex items-center gap-2 sd-mono text-[0.7rem] text-[var(--muted)]">
              <span className="sd-pulse-dot" />
              Kathmandu, NP · Available for work
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="show"
          className="sd-serif font-black text-[var(--white)] max-w-4xl"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 5rem)", lineHeight: 1.02 }}
        >
          Designer &amp; developer helping companies{" "}
          <span className="italic sd-amber">ship products</span> that feel
          right.
        </motion.h1>

        {/* Subcopy */}
        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="show"
          className="max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-geist), sans-serif" }}
        >
          I&apos;m a full-stack engineer with a designer&apos;s eye — turning
          rough ideas into polished, production-ready web apps. From Figma to
          pixel-perfect React, I own the whole journey so your product looks
          sharp and works flawlessly.
        </motion.p>

        {/* CTAs + socials */}
        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row sm:items-center gap-5 mt-2"
        >
          <div className="flex items-center gap-3">
            <button type="button" onClick={openBookCall} className="sd-btn-primary">
              Book a free call
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </button>
            <a href="/work" className="sd-btn-ghost">
              View work
            </a>
          </div>
          <div className="flex items-center gap-4 sm:ml-2">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--muted)] hover:text-[var(--amber)] transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          custom={4}
          variants={fade}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 sm:grid-cols-4 gap-px mt-10 w-full rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--line)]"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[var(--ink)] px-6 py-7 flex flex-col gap-1"
            >
              <span className="sd-serif font-bold text-3xl sm:text-4xl text-[var(--white)]">
                {s.value}
              </span>
              <span className="sd-mono text-[0.65rem] text-[var(--muted)] tracking-[0.12em] uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
