import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Squiggle } from "./_components/shared";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="card relative w-full max-w-md rotate-[-0.8deg] p-7 text-center sm:p-9">
        <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden="true" />
        <p className="font-display text-7xl leading-none text-accent">404</p>
        <h1 className="relative mx-auto mt-3 w-fit font-display text-[1.9rem] text-fg">
          Nothing pinned here.
          <Squiggle className="absolute -bottom-2 left-0 h-3 w-full text-accent" />
        </h1>
        <p className="mt-5 text-[0.95rem] italic text-fg-2">
          That page moved, or never existed. The board itself is one click away.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Link
            href="/"
            className="flex h-11 items-center gap-2 rounded-xl bg-accent px-4 font-display text-lg text-on-accent shadow-[3px_4px_0_#e3c6ae] transition-all hover:bg-accent-hover active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          {[
            ["/projects", "Projects"],
            ["/blog", "Blog"],
            ["/experience", "Experience"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="flex h-11 items-center rounded-xl border border-line-strong px-4 font-display text-lg text-fg-2 transition-colors hover:border-accent hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
