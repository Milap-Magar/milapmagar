"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Instagram,
  Facebook,
  MapPin,
} from "lucide-react";
import { openBookCall } from "../_components/bookCall";

const EASE = [0.22, 1, 0.36, 1] as const;

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.07, duration: 0.7, ease: EASE },
  }),
};

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
  {
    Icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
];

const facts = [
  { label: "Based in", value: "Kathmandu, Nepal" },
  { label: "Focus", value: "Design + full-stack build" },
  { label: "Experience", value: "2+ years shipping" },
  { label: "Working style", value: "End to end, hands-on" },
];

/* Milestones anchored to shipped work rather than job titles. */
const timeline = [
  {
    year: "2023",
    title: "First real shelf on the internet",
    body: "Designed and shipped shreejanadryfruits.com — a full e-commerce storefront for a family-run udhyog. React on the front, Nest.js and MongoDB behind the counter.",
  },
  {
    year: "2024",
    title: "Products, plural",
    body: "Built Vault, a private cloud storage system with granular access, and started Sharky Payment — secure, authenticated online transactions. Learned to think in systems, not screens.",
  },
  {
    year: "2025",
    title: "The SaaS year",
    body: "Shipped Chatblix — a unified inbox for five messaging platforms with AI replies — and began Codenest, a GitHub-style local codebase manager. Design to deploy, owned end to end.",
  },
  {
    year: "Now",
    title: "Open for the next one",
    body: "Available for product design and full-stack builds. If it needs to look sharp and work flawlessly, that's the brief I want.",
  },
];

const skillGroups = [
  {
    label: "Design",
    items: ["Figma", "Design systems", "Prototyping", "Motion design"],
  },
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Nest.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "Supabase",
      "Appwrite",
    ],
  },
  {
    label: "Ways of working",
    items: ["Git & PR reviews", "Type-safe by default", "Ship small, ship often"],
  },
];

function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });
  const draw = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.5,
  });

  return (
    <ol ref={ref} className="relative flex flex-col gap-10 pl-8">
      {/* faint rail + green line that draws itself as you scroll */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-1 bottom-1 w-px bg-[var(--faint)]"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY: draw }}
        className="absolute left-[5px] top-1 bottom-1 w-px origin-top bg-[var(--amber)]"
      />

      {timeline.map((t, i) => (
        <motion.li
          key={t.year}
          initial={{ opacity: 0, x: -14 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: EASE }}
          className="relative flex flex-col gap-2"
        >
          <span
            aria-hidden="true"
            className="absolute -left-8 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-[var(--amber)] bg-[var(--ink)]"
          />
          <span className="sd-mono text-xs text-[var(--amber)] tracking-[0.14em]">
            {t.year}
          </span>
          <h3 className="sd-serif text-xl sm:text-2xl font-bold text-[var(--white)]">
            {t.title}
          </h3>
          <p className="text-sm text-[var(--muted2)] leading-relaxed max-w-xl">
            {t.body}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}

export default function SDAbout() {
  return (
    <section className="relative overflow-hidden">
      <span className="sd-hero-grid" aria-hidden="true" />

      <div className="relative z-[1] mx-auto max-w-7xl px-6 sm:px-10 pt-32 sm:pt-40 pb-24">
        <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-20 items-start">
          {/* ── Sticky portrait rail ─────────────────────────────────── */}
          <motion.aside
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="lg:sticky lg:top-28 flex flex-col gap-6"
          >
            <motion.div
              whileHover={{ rotate: -1.5, scale: 1.015 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative aspect-[4/5] w-full max-w-[340px] rounded-3xl overflow-hidden border border-[var(--line)]"
            >
              <Image
                src="/mm.png"
                alt="Milap Magar"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 340px, 90vw"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <span className="flex items-center gap-2 sd-mono text-[0.65rem] text-white">
                  <span className="sd-pulse-dot" />
                  Available for work
                </span>
              </div>
            </motion.div>

            <div className="flex flex-col gap-1">
              <h2 className="sd-serif text-2xl font-bold text-[var(--white)]">
                Milap Magar
              </h2>
              <span className="sd-mono text-[0.65rem] tracking-[0.18em] text-[var(--muted)] uppercase">
                Designer · Developer
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[var(--muted2)] mt-2">
                <MapPin className="w-3.5 h-3.5" strokeWidth={1.6} />
                Kathmandu, Nepal
              </span>
            </div>

            <dl className="flex flex-col divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {facts.map((f) => (
                <div key={f.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="sd-mono text-[0.62rem] uppercase tracking-[0.16em] text-[var(--muted)]">
                    {f.label}
                  </dt>
                  <dd className="text-sm text-[var(--white)] text-right">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="sd-social-tile"
                >
                  <Icon className="w-[18px] h-[18px]" strokeWidth={1.6} />
                </motion.a>
              ))}
            </div>

            <button type="button" onClick={openBookCall} className="sd-btn-primary justify-center">
              Book a free call
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </button>
          </motion.aside>

          {/* ── Scrolling story ──────────────────────────────────────── */}
          <div className="flex flex-col gap-16 sm:gap-20 min-w-0">
            <div className="flex flex-col gap-6">
              <motion.div
                custom={1}
                variants={fade}
                initial="hidden"
                animate="show"
                className="flex items-center gap-3"
              >
                <span className="sd-section-num">The Person</span>
                <span className="sd-accent-line w-12" />
                <span className="sd-eyebrow">About me</span>
              </motion.div>

              <motion.h1
                custom={2}
                variants={fade}
                initial="hidden"
                animate="show"
                className="sd-serif font-black text-[var(--white)] text-balance"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", lineHeight: 1.05 }}
              >
                One person from first{" "}
                <span className="italic sd-amber">sketch</span> to last{" "}
                <span className="italic sd-amber">deploy</span>.
              </motion.h1>

              <motion.div
                custom={3}
                variants={fade}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-4 max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed"
              >
                <p>
                  I&apos;m Milap — a designer and full-stack developer working
                  from Kathmandu. Most products lose something in the handoff
                  between the person who designs them and the person who builds
                  them. My whole practice is built on removing that handoff.
                </p>
                <p>
                  I start in Figma, thinking in flows and design systems, and I
                  finish in production — type-safe React and Next.js, real
                  databases, real users. Because the same pair of hands carries
                  the idea the whole way, nothing gets lost in translation: the
                  spacing survives, the motion survives, the intent survives.
                </p>
                <p>
                  The work I&apos;m proudest of is practical: a family business
                  selling around the clock, a SaaS inbox that keeps a small
                  promise perfectly. Software that disappears into someone&apos;s
                  day is the goal — polish is just how it gets there.
                </p>
              </motion.div>
            </div>

            {/* ── Timeline ───────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-3"
              >
                <span className="sd-eyebrow">The road so far</span>
                <span className="sd-accent-line flex-1 max-w-24" />
              </motion.div>
              <Timeline />
            </div>

            {/* ── Skills ─────────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="flex items-center gap-3"
              >
                <span className="sd-eyebrow">Toolbox</span>
                <span className="sd-accent-line flex-1 max-w-24" />
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-4">
                {skillGroups.map((g, i) => (
                  <motion.div
                    key={g.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.55, delay: i * 0.07, ease: EASE }}
                    className="sd-card p-6 flex flex-col gap-4"
                  >
                    <h3 className="sd-serif text-lg font-bold text-[var(--white)]">
                      {g.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <span key={s} className="sd-chip">
                          {s}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Beyond the code ───────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="sd-card p-7 sm:p-9 flex flex-col gap-4"
            >
              <span className="sd-eyebrow">Beyond the code</span>
              <p className="sd-serif text-xl sm:text-2xl font-bold text-[var(--white)] text-balance leading-snug">
                Away from the screen I&apos;m usually chasing good coffee around
                Kathmandu, collecting typefaces I&apos;ll definitely use
                someday, and explaining to my cat why the deploy can&apos;t
                wait.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
