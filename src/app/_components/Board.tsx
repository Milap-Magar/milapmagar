"use client";

import { useEffect, useState, type ReactElement } from "react";
import { motion } from "framer-motion";

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

/** Two hand-pinned masonry columns of cards; collapses to one interleaved column on narrow screens. */
export default function Board({ left, right }: { left: ReactElement[]; right: ReactElement[] }) {
  const twoCols = useTwoColumns();
  // single column: interleave so the mix stays varied
  const single = Array.from({ length: Math.max(left.length, right.length) }).flatMap((_, i) =>
    [left[i], right[i]].filter(Boolean),
  );
  const columns = twoCols ? [left, right] : [single];

  return (
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
  );
}
