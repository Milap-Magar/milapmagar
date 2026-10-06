"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { profile } from "@/data/profile";
import type { GithubData } from "@/lib/github";
import Sidebar from "./Sidebar";
import ShareDialog from "./ShareDialog";
import ChatDialog from "./ChatDialog";

/** Sidebar + scrolling main column + the share/chat dialogs. Every page renders inside it. */
export default function Shell({ github, children }: { github: GithubData; children: React.ReactNode }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const main = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // On desktop the column scrolls, not the window — so reset it ourselves on navigation.
  // On phones the sidebar sits above the content, so a nav tap jumps straight to the page itself.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const el = main.current;
    if (!el) return;
    el.scrollTo({ top: 0 });
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [pathname]);

  return (
    /* On desktop the card column scrolls all the way to the viewport's right edge;
       --gutter keeps the content itself inside the same 1360px frame. */
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:grid lg:h-dvh lg:max-w-none lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-10 lg:overflow-hidden lg:pr-0 lg:pl-(--gutter) lg:[--gutter:max(2.5rem,calc((100vw_-_1360px)/2_+_2.5rem))]">
      <div className="pt-8 lg:pt-0">
        <Sidebar onShare={() => setShareOpen(true)} onChat={() => setChatOpen(true)} projectCount={profile.shipped} />
      </div>

      <main ref={main} className="scroll-quiet mt-10 scroll-mt-4 pb-10 lg:mt-0 lg:h-dvh lg:overflow-y-auto lg:py-8 lg:pr-(--gutter)">
        {children}
      </main>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} days={github.days} />
      <ChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
