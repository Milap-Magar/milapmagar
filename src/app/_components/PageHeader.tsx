import { Squiggle } from "./shared";

/** The title block every subpage opens with — same hand-drawn underline as the name in the sidebar. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
}) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="italic text-fg-3">{eyebrow}</p>}
        <h1 className="relative w-fit font-display text-[2.4rem] leading-[1.05] text-fg sm:text-[2.7rem]">
          {title}
          <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
        </h1>
        {intro && <p className="mt-5 max-w-[60ch] text-[0.95rem] leading-relaxed text-fg-2">{intro}</p>}
      </div>
      {aside}
    </header>
  );
}
