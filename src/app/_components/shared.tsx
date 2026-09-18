import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { profile } from "@/data/profile";
import type { ContributionDay } from "@/lib/github";

/** Profile photo, or a dashed placeholder until `profile.avatar` is set. */
export function Avatar({ size, className = "" }: { size: number; className?: string }) {
  if (profile.avatar) {
    return (
      <Image
        src={profile.avatar}
        alt={profile.name}
        width={size}
        height={size}
        priority
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${profile.name} — photo coming soon`}
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-dashed border-line-strong bg-paper-2 text-fg-3 ${className}`}
      style={{ width: size, height: size }}
    >
      <ImagePlus style={{ width: size * 0.22, height: size * 0.22 }} strokeWidth={1.5} />
    </div>
  );
}

export const TAG_TONES = {
  butter: "bg-butter text-[#5e4613]",
  blush: "bg-blush text-[#6b3322]",
  sage: "bg-sage text-[#3f4a1e]",
  sky: "bg-sky text-[#2c4a47]",
} as const;

/** A wavy, slightly uneven underline — drawn, not ruled. */
export function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 14" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M3 9 C 28 3, 52 12, 80 7 S 132 3, 160 8 S 212 11, 237 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

const LEVELS = ["#ece1c8", "#dbd9a2", "#b9c27c", "#8f9f55", "#62763a"];
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** GitHub-style heatmap of the most recent `weeks` weeks, Sunday-aligned.
    Cells stretch to fill the width, capped at 1.6× `cell`. */
export function ContributionGrid({
  days,
  weeks = 22,
  cell = 10,
  gap = 3,
}: {
  days: ContributionDay[];
  weeks?: number;
  cell?: number;
  gap?: number;
}) {
  const recent = days.slice(-(weeks * 7));
  const lead = recent.length ? new Date(recent[0].date).getUTCDay() : 0;
  const padded: (ContributionDay | null)[] = [...Array(lead).fill(null), ...recent];
  const cols: (ContributionDay | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) cols.push(padded.slice(i, i + 7));

  // month label above the first column that starts a new month
  let lastMonth = -1;
  const labels = cols.map((col) => {
    const first = col.find(Boolean);
    if (!first) return "";
    const m = new Date(first.date).getUTCMonth();
    if (m === lastMonth) return "";
    lastMonth = m;
    return MONTHS[m];
  });

  return (
    <div className="w-full overflow-hidden">
      <div className="flex" style={{ gap }}>
        {cols.map((col, i) => (
          <div key={i} className="flex min-w-0 flex-1 flex-col" style={{ gap, maxWidth: cell * 1.6 }}>
            <span className="h-3 overflow-visible whitespace-nowrap text-[9px] leading-none text-fg-3">
              {labels[i]}
            </span>
            {col.map((d, j) => (
              <span
                key={j}
                title={d ? `${d.count} contributions on ${d.date}` : undefined}
                className="block aspect-square w-full rounded-[2px]"
                style={{ background: d ? LEVELS[d.level] : "transparent" }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
