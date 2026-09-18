import Image from "next/image";
import { ArrowUpRight, ExternalLink, Layers, Mail } from "lucide-react";
import { craftSplit, EMAIL, GITHUB_USER, journey, now, quote, socials, toolbox } from "@/data/profile";
import type { GithubData } from "@/lib/github";
import type { Project } from "@/types";
import { Avatar, ContributionGrid, Squiggle } from "../shared";
import { FacebookIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "../BrandIcons";

const outlineBtn =
  "flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-line-strong font-display text-lg text-fg-2 transition-colors hover:border-accent hover:bg-paper-2 hover:text-accent";

const chip = "rounded-md border border-line bg-paper-2/60 px-2 py-0.5 text-xs text-fg-2";

const title = "font-display text-[1.45rem] leading-tight text-fg";

export function ProjectCard({ project, tapeLeft }: { project: Project; tapeLeft?: boolean }) {
  return (
    <a href={project.url} target="_blank" rel="noreferrer" className="card group block p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className={title}>{project.title}</h3>
        <span className="flex items-center gap-2 pt-1">
          {project.commingSoon && (
            <span className="rounded-full border border-dashed border-accent px-2 py-0.5 text-xs italic text-accent">
              still cooking
            </span>
          )}
          <ArrowUpRight className="h-5 w-5 text-fg-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
        </span>
      </div>
      <p className="mt-1.5 text-[0.95rem] leading-relaxed text-fg-2">{project.tagline}</p>
      <div className="relative mt-5">
        <span className={`tape -top-2.5 ${tapeLeft ? "-left-3 -rotate-[24deg]" : "-right-3 rotate-[22deg]"}`} />
        <div className="overflow-hidden rounded-md border border-line-strong bg-paper-2 p-1.5">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1200}
            height={750}
            className="aspect-[16/10] w-full rounded-[3px] object-cover object-top saturate-[0.85] sepia-[0.08] transition-[filter] duration-500 group-hover:saturate-100 group-hover:sepia-0"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span key={s} className={chip}>
            {s}
          </span>
        ))}
      </div>
    </a>
  );
}

export function GithubCard({ github }: { github: GithubData }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <GithubIcon className="h-9 w-9 text-fg" />
        <span className="text-sm italic text-fg-2">@{GITHUB_USER}</span>
      </div>
      <div className="mt-5">
        <ContributionGrid days={github.days} />
      </div>
      <p className="ruled mt-4 rounded-lg border border-line bg-paper-2/50 px-4 py-2 text-[0.95rem] leading-8 text-fg-2">
        <b className="font-display text-lg font-normal text-fg">{github.total.toLocaleString()}</b> commits, PRs and
        issues this past year
        {github.repos != null && (
          <>
            {" "}across <b className="font-display text-lg font-normal text-fg">{github.repos}</b> public repos
          </>
        )}
        . Mostly TypeScript, often after midnight.
      </p>
      <a href={socials.github} target="_blank" rel="noreferrer" className={`${outlineBtn} mt-4`}>
        Poke around my GitHub
      </a>
    </div>
  );
}

const NETWORK = [
  { label: "GitHub", href: socials.github, Icon: GithubIcon },
  { label: "LinkedIn", href: socials.linkedin, Icon: LinkedinIcon },
  { label: "Instagram", href: socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: socials.facebook, Icon: FacebookIcon },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail },
  { label: "Chatblix", href: "https://chatblix.com", Icon: Layers },
];
const COLS = [17, 50, 83];
const PILLS = ["bg-butter", "bg-blush", "bg-sage"];

export function NetworkCard() {
  const node = (n: (typeof NETWORK)[number], i: number, top: boolean) => (
    <a
      key={n.label}
      href={n.href}
      target={n.href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      className={`group absolute flex -translate-x-1/2 items-center gap-1.5 ${top ? "top-[6%] flex-col" : "bottom-[6%] flex-col-reverse"}`}
      style={{ left: `${COLS[i]}%` }}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-card text-fg-2 transition-all group-hover:-rotate-6 group-hover:border-accent group-hover:text-accent">
        <n.Icon className="h-5 w-5" />
      </span>
      <span className={`rounded px-1.5 py-0.5 text-xs text-fg-2 ${PILLS[i]}`}>{n.label}</span>
    </a>
  );

  return (
    <div className="card p-5">
      <h3 className={title}>Where to find me</h3>
      <div className="grid-paper relative mt-4 aspect-square w-full overflow-hidden rounded-md border border-line-strong">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <g stroke="#9b8468" strokeWidth="1.2" strokeDasharray="4 3" fill="none">
            {COLS.map((x) => (
              <g key={x}>
                <path d={`M${x} 29 Q ${(x + 50) / 2} ${x === 50 ? 32 : 36}, 50 37`} vectorEffect="non-scaling-stroke" />
                <path d={`M${x} 71 Q ${(x + 50) / 2} ${x === 50 ? 68 : 64}, 50 63`} vectorEffect="non-scaling-stroke" />
              </g>
            ))}
          </g>
        </svg>
        {NETWORK.slice(0, 3).map((n, i) => node(n, i, true))}
        {NETWORK.slice(3).map((n, i) => node(n, i, false))}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="rounded-full border-2 border-dashed border-accent bg-card p-1">
            <Avatar size={60} />
          </div>
        </div>
        <span className="absolute right-[63%] top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-lg text-fg">
          me
        </span>
      </div>
    </div>
  );
}

export function JourneyCard() {
  const W = 320;
  const H = 150;
  const pad = 26;
  const pts = journey.map((j, i) => ({
    ...j,
    x: pad + (i * (W - pad * 2)) / (journey.length - 1),
    y: H - 18 - j.level * (H - 52),
  }));
  // Catmull-Rom → cubic Bézier for a smooth line through every point
  const path = pts
    .map((p, i) => {
      if (i === 0) return `M${p.x},${p.y}`;
      const p0 = pts[i - 2] ?? pts[i - 1];
      const p1 = pts[i - 1];
      const p3 = pts[i + 1] ?? p;
      const c1 = [p1.x + (p.x - p0.x) / 6, p1.y + (p.y - p0.y) / 6];
      const c2 = [p.x - (p3.x - p1.x) / 6, p.y - (p3.y - p1.y) / 6];
      return `C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p.x},${p.y}`;
    })
    .join(" ");

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h3 className={title}>How I built projects</h3>
        <LinkedinIcon className="h-6 w-6 text-fg-3" />
      </div>
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="mt-3 w-full" role="img" aria-label="Career journey from 2022 to now">
        {pts.map((p) => (
          <line key={p.year} x1={p.x} x2={p.x} y1={10} y2={H} stroke="#e4d5b7" strokeDasharray="2 4" />
        ))}
        <path d={`${path} L${pts.at(-1)!.x},${H} L${pts[0].x},${H} Z`} fill="#efd9a0" fillOpacity="0.35" />
        <path d={path} fill="none" stroke="#b5623a" strokeWidth="2" strokeLinecap="round" />
        {pts.map((p) => (
          <g key={p.year}>
            <circle cx={p.x} cy={p.y} r="5" fill="#fbf5e8" stroke="#b5623a" strokeWidth="2" />
            <text
              x={p.x}
              y={p.y - 12}
              textAnchor="middle"
              fontSize="11"
              fontStyle="italic"
              fill="#6a5541"
              fontFamily="var(--font-lora)"
            >
              {p.label}
            </text>
            <text x={p.x} y={H + 18} textAnchor="middle" fontSize="12" fill="#9b8468" fontFamily="var(--font-amarante)">
              {p.year}
            </text>
          </g>
        ))}
      </svg>
      <a href={socials.linkedin} target="_blank" rel="noreferrer" className={`${outlineBtn} mt-4`}>
        <ExternalLink className="h-4 w-4" /> The formal version, on LinkedIn
      </a>
    </div>
  );
}

export function NowCard() {
  return (
    <div className="card p-5">
      <div className="flex items-baseline justify-between">
        <h3 className={title}>Now</h3>
        <span className="text-xs italic text-fg-3">updated by hand</span>
      </div>
      <ul className="mt-3 space-y-2.5">
        {now.map((n) => (
          <li key={n} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-fg-2">
            <span className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rotate-45 bg-accent" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ToolboxCard() {
  return (
    <div className="card p-5">
      <h3 className={title}>Things I reach for</h3>
      <p className="mt-1 text-sm italic text-fg-3">in no particular order, except Figma first.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {toolbox.map((t, i) => (
          <span
            key={t}
            className={`rounded-md border border-line-strong bg-card px-2.5 py-1 text-sm text-fg-2 ${
              i % 4 === 1 ? "rotate-1" : i % 4 === 3 ? "-rotate-1" : ""
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/** A sticky note, not a card. */
export function QuoteCard() {
  return (
    <figure className="relative mx-2 rotate-[1.2deg] bg-butter px-6 pb-6 pt-8 shadow-[2px_6px_0_rgba(158,125,70,0.18)]">
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 bg-[rgba(251,245,232,0.7)]" />
      <blockquote className="font-display text-[1.4rem] leading-snug text-[#4a3a1c]">“{quote}”</blockquote>
      <figcaption className="mt-5 text-right italic text-[#6f5a30]">— a note on my monitor</figcaption>
    </figure>
  );
}

export function CraftSplitCard() {
  return (
    <div className="card p-5">
      <h3 className={title}>Where my hours go</h3>
      <div className="mt-5 flex h-14 overflow-hidden rounded-md border border-line-strong">
        {craftSplit.map((c, i) => (
          <div
            key={c.label}
            className={`flex items-center justify-center ${i > 0 ? "border-l border-dashed border-line-strong" : ""}`}
            style={{ width: `${c.value}%`, background: c.color }}
          >
            <span className="font-display text-xl text-fg">{c.value}%</span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        {craftSplit.map((c) => (
          <span key={c.label} style={{ width: `${c.value}%` }} className="text-center text-sm italic text-fg-2">
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SignOffCard() {
  return (
    <div className="px-2 pb-4 pt-2 text-center">
      <p className="font-display text-2xl text-fg">That&apos;s most of it.</p>
      <Squiggle className="mx-auto mt-1 h-3 w-40 text-accent" />
      <p className="mt-3 text-[0.95rem] italic text-fg-2">
        Got something half-built or not yet started? <br />
        <a href={`mailto:${EMAIL}`} className="text-accent underline underline-offset-4">
          Tell me about it
        </a>
        . I read everything.
      </p>
    </div>
  );
}
