"use client";

import { projects } from "@/data/projects";

export default function SDProjectCarousel() {
  // duplicate the list so the marquee can loop seamlessly (-50% translate)
  const loop = [...projects, ...projects];

  return (
    <section
      aria-label="Project preview marquee"
      className="sd-marquee relative w-full overflow-hidden py-6 border-y border-(--line)"
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[var(--ink)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[var(--ink)] to-transparent" />

      <div className="sd-marquee-track gap-5">
        {loop.map((p, i) => (
          <a
            key={`${p.title}-${i}`}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative shrink-0 w-[260px] sm:w-[300px] h-[220px] sm:h-[200px] rounded-xl overflow-hidden border border-(--line)"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              decoding="async"
              className="block w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-3 left-4 sd-mono text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {p.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
