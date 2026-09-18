"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import type { GithubData } from "@/lib/github";
import Sidebar from "./Sidebar";
import ShareDialog from "./ShareDialog";
import ChatDialog from "./ChatDialog";
import {
  CraftSplitCard,
  GithubCard,
  JourneyCard,
  NetworkCard,
  NowCard,
  ProjectCard,
  QuoteCard,
  SignOffCard,
  ToolboxCard,
} from "./cards/Cards";

/* Cards sit a hair off-square, like things pinned to a board by hand.
   Deterministic per position so server and client agree. */
const TILTS = [-0.6, 0.4, -0.2, 0.7, -0.4, 0.3, 0, -0.7];

/* Two masonry columns when there's room for them beside (or under) the sidebar. */
const TWO_COLS = "(min-width: 640px) and (max-width: 1023px), (min-width: 1280px)";

function useTwoColumns() {
  const [two, setTwo] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(TWO_COLS);
    const sync = () => setTwo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return two;
}

export default function ProfilePage({ github }: { github: GithubData }) {
  const [shareOpen, setShareOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const twoCols = useTwoColumns();

  const [p0, p1, p2, p3, p4] = projects;
  const left = [
    <ProjectCard key="p0" project={p0} tapeLeft />,
    <GithubCard key="gh" github={github} />,
    <ProjectCard key="p2" project={p2} />,
    <JourneyCard key="journey" />,
    <ProjectCard key="p4" project={p4} tapeLeft />,
  ];
  const right = [
    <NowCard key="now" />,
    <ProjectCard key="p1" project={p1} />,
    <NetworkCard key="net" />,
    <QuoteCard key="quote" />,
    <ToolboxCard key="tools" />,
    <ProjectCard key="p3" project={p3} tapeLeft />,
    <CraftSplitCard key="split" />,
  ];
  // single column: interleave so the mix stays varied
  const single = Array.from({ length: Math.max(left.length, right.length) }).flatMap((_, i) =>
    [left[i], right[i]].filter(Boolean),
  );
  const columns = twoCols ? [left, right] : [single];

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:grid lg:h-dvh lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-10 lg:overflow-hidden lg:px-10">
      <div className="pt-8 lg:pt-0">
        <Sidebar onShare={() => setShareOpen(true)} onChat={() => setChatOpen(true)} projectCount={profile.shipped} />
      </div>

      <main className="scroll-quiet mt-10 pb-10 lg:mt-0 lg:h-dvh lg:overflow-y-auto lg:py-8">
        <div className="flex gap-7">
          {columns.map((col, c) => (
            <div key={c} className="flex min-w-0 flex-1 flex-col gap-7">
              {col.map((card, i) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 18, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: TILTS[(i * 3 + c) % TILTS.length] }}
                  whileHover={{ rotate: 0 }}
                  viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                  transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.06 + c * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  {card}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-12">
          <SignOffCard />
        </div>
      </main>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} days={github.days} />
      <ChatDialog open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
