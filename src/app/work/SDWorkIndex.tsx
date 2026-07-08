"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
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

/** Index rows load bottom-up like film credits. */
const row = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.25 + i * 0.09, duration: 0.65, ease: EASE },
  }),
};

const PREVIEW_W = 340;
const PREVIEW_H = 224;

export default function SDWorkIndex() {
  const [active, setActive] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Cursor-following preview: raw pointer position smoothed by springs.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 180, damping: 22, mass: 0.6 });

  const handleMove = (e: React.MouseEvent) => {
    rawX.set(e.clientX - PREVIEW_W / 2);
    rawY.set(e.clientY - PREVIEW_H - 28);
  };

  const liveCount = projects.filter((p) => !p.commingSoon).length;

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <span className="sd-hero-grid" aria-hidden="true" />
        <div className="relative z-[1] mx-auto max-w-7xl px-6 sm:px-10 pt-36 pb-16 sm:pt-44 sm:pb-20">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3 mb-6"
          >
            <span className="sd-section-num">The Index</span>
            <span className="sd-accent-line w-12" />
            <span className="sd-eyebrow">
              {String(projects.length).padStart(2, "0")} projects ·{" "}
              {String(liveCount).padStart(2, "0")} live
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
            Everything I&apos;ve{" "}
            <span className="italic sd-amber">shipped</span>.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="show"
            className="mt-6 max-w-2xl text-[var(--muted2)] text-base sm:text-lg leading-relaxed"
          >
            The full index — SaaS products, e-commerce, payments, and storage.
            Run your cursor down the list; each row carries its own preview.
          </motion.p>
        </div>
      </section>

      {/* ── Credits list ──────────────────────────────────────────────── */}
      <section
        ref={listRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setActive(null)}
        className="mx-auto max-w-7xl px-6 sm:px-10 pb-24"
      >
        <div className="border-t border-[var(--line)]">
          {projects.map((p, i) => {
            const soon = Boolean(p.commingSoon);
            const Row = soon ? "div" : "a";
            return (
              <motion.div
                key={p.title}
                custom={i}
                variants={row}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
                onMouseEnter={() => setActive(i)}
                className="border-b border-[var(--line)]"
              >
                <Row
                  {...(!soon && {
                    href: p.url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className={`group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 sm:gap-x-8 py-7 sm:py-9 ${
                    soon ? "cursor-default" : "cursor-pointer"
                  }`}
                >
                  {/* accent line that draws in on hover */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-px bg-[var(--amber)] w-0 transition-all duration-500 ease-out group-hover:w-full"
                  />

                  <span className="sd-mono text-xs text-[var(--muted)] tabular-nums pt-1 self-start sm:self-center">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="flex flex-col gap-2.5 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h2
                        className="sd-serif font-bold text-[var(--white)] transition-transform duration-400 group-hover:translate-x-2"
                        style={{
                          fontSize: "clamp(1.7rem, 4.5vw, 3.2rem)",
                          lineHeight: 1.05,
                          transitionTimingFunction:
                            "cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                      >
                        {p.title.trim()}
                      </h2>
                      {soon && (
                        <span className="sd-mono text-[0.6rem] uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-[var(--accent-soft)] text-[var(--amber)]">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--muted2)] leading-relaxed max-w-xl">
                      {p.tagline}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {p.stack.map((s) => (
                        <span key={s} className="sd-chip">
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* mobile / touch preview — hover preview can't exist here */}
                    <div className="lg:hidden mt-3 rounded-xl overflow-hidden border border-[var(--line)]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image}
                        alt={p.title.trim()}
                        loading="lazy"
                        className="w-full h-44 object-cover object-top"
                      />
                    </div>
                  </div>

                  <span
                    className={`sd-icon-btn self-start sm:self-center ${
                      soon
                        ? "opacity-40"
                        : "group-hover:text-[var(--amber)] group-hover:border-[var(--amber)] group-hover:rotate-45"
                    } transition-transform duration-300`}
                  >
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                  </span>
                </Row>
              </motion.div>
            );
          })}
        </div>

        {/* floating preview — desktop pointers only */}
        <motion.div
          aria-hidden="true"
          style={{ x, y, width: PREVIEW_W, height: PREVIEW_H }}
          className="hidden lg:block fixed top-0 left-0 z-40 pointer-events-none"
        >
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-[var(--line)] shadow-2xl bg-[var(--ink2)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={projects[active].image}
                  alt=""
                  className="w-full h-full object-cover object-top"
                />
                <span className="absolute bottom-3 left-3 sd-mono text-[0.6rem] uppercase tracking-[0.16em] px-2.5 py-1 rounded-md bg-black/70 text-white backdrop-blur-sm">
                  {projects[active].commingSoon
                    ? "Coming soon"
                    : "View live site"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── CTA strip ─────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-20 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <p className="sd-serif text-2xl sm:text-3xl font-bold text-[var(--white)] max-w-md text-balance">
            Yours could be row{" "}
            <span className="italic sd-amber">
              {String(projects.length + 1).padStart(2, "0")}
            </span>
            .
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
