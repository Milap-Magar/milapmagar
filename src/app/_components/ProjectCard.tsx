"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github, Maximize2 } from "lucide-react";
import type { Project } from "@/types";
import Modal from "./Modal";

const chip = "rounded-md border border-line bg-paper-2/60 px-2 py-0.5 text-xs text-fg-2";

/* The card is at most ~440px wide on desktop and half the viewport on tablets; telling
   next/image that (plus quality 90) is what keeps the screenshot sharp on 2× screens. */
const CARD_SIZES = "(min-width: 1280px) 440px, (min-width: 1024px) calc(100vw - 480px), (min-width: 640px) 50vw, 100vw";

export default function ProjectCard({
  project,
  tapeLeft,
  priority,
}: {
  project: Project;
  tapeLeft?: boolean;
  /** Preload the screenshot — use for the first card or two above the fold. */
  priority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const cta = project.kind === "api" ? "Open the API" : "Visit site";
  const aspect = project.imageAspect ?? 16 / 10;

  return (
    <article className="card group relative p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-[1.45rem] leading-tight text-fg">
          <a href={project.url} target="_blank" rel="noreferrer" className="hover:text-accent">
            {project.title}
          </a>
        </h3>
        <span className="flex items-center gap-2 pt-1">
          {project.comingSoon && (
            <span className="rounded-full border border-dashed border-accent px-2 py-0.5 text-xs italic text-accent">
              still cooking
            </span>
          )}
          {project.year && <span className="text-xs italic text-fg-3">{project.year}</span>}
        </span>
      </div>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-2">{project.tagline}</p>

      {/* The screenshot: click to see it full size. */}
      <div className="relative mt-5">
        <span className={`tape -top-2.5 ${tapeLeft ? "-left-3 -rotate-[24deg]" : "-right-3 rotate-[22deg]"}`} />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View ${project.title} screenshot full size`}
          className="relative block w-full cursor-zoom-in overflow-hidden rounded-md border border-line-strong bg-paper-2 p-1.5 text-left outline-none focus-visible:border-accent"
        >
          <Image
            src={project.image}
            alt={`${project.title} — screenshot`}
            width={1600}
            height={1000}
            quality={90}
            sizes={CARD_SIZES}
            priority={priority}
            className="aspect-[16/10] w-full rounded-[3px] object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.015]"
          />
          <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1 rounded-md border border-line-strong bg-card/95 px-2 py-1 text-xs text-fg-2 opacity-0 shadow-[2px_2px_0_var(--line)] transition-opacity group-hover:opacity-100">
            <Maximize2 className="h-3 w-3" /> full size
          </span>
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className={chip}>
            {s}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl border border-line-strong font-display text-lg text-fg-2 transition-colors hover:border-accent hover:bg-paper-2 hover:text-accent"
        >
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} source on GitHub`}
            title="Source on GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line-strong text-fg-3 transition-colors hover:border-accent hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={project.title} className="sm:max-w-[min(96vw,1440px)]">
        <div className="overflow-hidden rounded-lg border border-line-strong bg-paper-2 p-1.5">
          {/* The original file, untouched by the optimizer — this is the "as clear as it gets" view. */}
          <Image
            src={project.image}
            alt={`${project.title} — full-size screenshot`}
            width={1600}
            height={Math.round(1600 / aspect)}
            unoptimized
            className="max-h-[70dvh] w-full rounded-[3px] object-contain"
            style={{ aspectRatio: aspect }}
          />
        </div>
        {project.description && <p className="mt-4 text-[0.95rem] leading-relaxed text-fg-2">{project.description}</p>}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="flex h-10 items-center gap-1.5 rounded-xl bg-accent px-4 font-display text-lg text-on-accent shadow-[3px_4px_0_#e3c6ae] transition-all hover:bg-accent-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            {cta} <ArrowUpRight className="h-4 w-4" />
          </a>
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 items-center gap-1.5 rounded-xl border border-line-strong px-4 font-display text-lg text-fg-2 hover:border-accent hover:text-accent"
            >
              <Github className="h-4 w-4" /> Source
            </a>
          )}
          <span className="ml-auto text-xs italic text-fg-3">
            {project.role ?? "Design · Build"}
            {project.year ? ` · ${project.year}` : ""}
          </span>
        </div>
      </Modal>
    </article>
  );
}
