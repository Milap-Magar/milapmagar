"use client";

import { useEffect, useState } from "react";
import { Briefcase, Clock, Mail, MapPin, MessageCircle, Share2 } from "lucide-react";
import { EMAIL, profile, socials } from "@/data/profile";
import { Avatar, Squiggle, TAG_TONES } from "./shared";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

/** Live local time in Kathmandu, rendered client-side only to avoid hydration drift. */
function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 15_000);
    return () => window.clearInterval(id);
  }, []);
  if (!now) return <span className="text-fg-3">—</span>;
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: profile.timeZone,
  }).format(now);
  const hour = Number(new Intl.DateTimeFormat("en-GB", { hour: "numeric", timeZone: profile.timeZone }).format(now));
  const mood = hour < 6 ? "probably asleep" : hour < 10 ? "morning chiya" : hour < 19 ? "at the desk" : "late-night shipping";
  return (
    <span>
      {time} here <span className="italic text-fg-3">· {mood}</span>
    </span>
  );
}

const TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"];

export default function Sidebar({
  onShare,
  onChat,
  projectCount,
}: {
  onShare: () => void;
  onChat: () => void;
  projectCount: number;
}) {
  const details = [
    { icon: Briefcase, content: profile.role },
    {
      icon: Mail,
      content: (
        <a href={`mailto:${EMAIL}`} className="underline decoration-line-strong underline-offset-4 hover:decoration-accent">
          {EMAIL}
        </a>
      ),
    },
    { icon: MapPin, content: profile.location },
    { icon: Clock, content: <LocalTime /> },
  ];

  return (
    <aside className="scroll-quiet flex flex-col lg:h-dvh lg:overflow-y-auto lg:py-8 lg:pr-2">
      <div className="flex items-start justify-between">
        <div className="relative">
          <Avatar size={150} className="max-sm:!h-36 max-sm:!w-36" />
          {/* shipped-count stamp, pressed on a little crooked */}
          <span
            title={`${projectCount} products shipped`}
            className="absolute -bottom-1 -right-2 flex h-16 w-16 rotate-[-12deg] flex-col items-center justify-center rounded-full border-2 border-dashed border-accent bg-card text-accent"
          >
            <span className="font-display text-2xl leading-none">{projectCount}</span>
            <span className="text-[0.6rem] uppercase tracking-[0.12em]">shipped</span>
          </span>
        </div>
        <button
          type="button"
          onClick={onShare}
          className="mt-2 flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-sm text-fg-2 transition-colors hover:border-accent hover:text-accent"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>
      </div>

      <p className="mt-4 italic text-fg-3">hi, I&apos;m</p>
      <h1 className="relative w-fit font-display text-[2.7rem] leading-[1.05] text-fg">
        {profile.name}
        <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
      </h1>

      <ul className="mt-5 space-y-1 text-[0.95rem] text-fg-2">
        {details.map(({ icon: Icon, content }, i) => (
          <li key={i} className="flex items-center gap-3">
            <Icon className="h-4 w-4 shrink-0 text-fg-3" strokeWidth={1.6} />
            <span className="truncate">{content}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onChat}
        className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent font-display text-xl text-on-accent shadow-[3px_4px_0_#e3c6ae] transition-all hover:bg-accent-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
        Chat
      </button>
      <p className="mt-1.5 pl-1 text-sm italic text-fg-3">↳ I usually reply within a day.</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {profile.tags.map((t, i) => (
          <span
            key={t.label}
            className={`rounded-md px-3 py-1 text-sm ${TAG_TONES[t.tone]} ${TILTS[i % TILTS.length]} transition-transform hover:rotate-0`}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3 text-[0.95rem] leading-relaxed text-fg-2">
        <p className="font-display text-[1.25rem] leading-snug text-fg">{profile.tagline}</p>
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <p className="mt-4 text-sm italic text-fg-3">made by hand in Kathmandu · {new Date().getFullYear()}</p>

      <div className="mt-6 flex w-fit items-center gap-1 rounded-xl border border-line-strong bg-card p-1 lg:mt-auto">
        <a
          href={`mailto:${EMAIL}`}
          className="rounded-lg bg-paper-2 px-3.5 py-1.5 font-display text-lg text-fg transition-colors hover:bg-butter"
        >
          Hire me
        </a>
        {[
          { href: socials.github, label: "GitHub", Icon: GithubIcon },
          { href: socials.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
          { href: socials.instagram, label: "Instagram", Icon: InstagramIcon },
        ].map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="rounded-lg p-2 text-fg-3 transition-colors hover:bg-paper-2 hover:text-accent"
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </aside>
  );
}
