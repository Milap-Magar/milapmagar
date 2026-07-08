"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Theatrical page-load reveal (line-reveal pattern):
 *  1. A thin green line draws itself vertically from the center of a dark
 *     stage while a progress counter runs 0 → 100.
 *  2. The stage splits at the line and both curtain halves slide apart
 *     horizontally, carrying each half of the wordmark with them.
 */
export default function SDLoader() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const finished = useRef(false);

  const progress = useMotionValue(0);
  const spring = useSpring(progress, { stiffness: 110, damping: 24 });
  const lineScale = useTransform(spring, [0, 100], [0, 1]);
  const counter = useTransform(spring, (v) =>
    String(Math.min(100, Math.round(v))).padStart(3, "0"),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    document.documentElement.style.overflow = "hidden";

    // Stuttered ramp so the load feels "real" rather than linear.
    const controls = animate(progress, [0, 34, 61, 100], {
      duration: 1.9,
      times: [0, 0.3, 0.62, 1],
      ease: "easeInOut",
      onComplete: () => {
        // Let the spring catch up to 100 before the curtains part.
        window.setTimeout(() => setOpen(true), 350);
      },
    });

    return () => {
      controls.stop();
      document.documentElement.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finish = () => {
    if (finished.current) return;
    finished.current = true;
    document.documentElement.style.overflow = "";
    setDone(true);
  };

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100]"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* left curtain */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-[#1b1b1d]"
            initial={{ x: 0 }}
            animate={open ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 1.05, ease: EASE }}
          >
            <span className="sd-serif absolute top-1/2 right-7 -translate-y-1/2 text-[#f4f4f5] text-[clamp(1.6rem,5vw,3.2rem)] font-bold tracking-tight select-none">
              MILAP
            </span>
          </motion.div>

          {/* right curtain */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-[#1b1b1d]"
            initial={{ x: 0 }}
            animate={open ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 1.05, ease: EASE }}
            onAnimationComplete={() => {
              if (open) finish();
            }}
          >
            <span className="sd-serif absolute top-1/2 left-7 -translate-y-1/2 text-[#f4f4f5] text-[clamp(1.6rem,5vw,3.2rem)] font-bold italic tracking-tight select-none">
              MAGAR
            </span>
          </motion.div>

          {/* the vertical reveal line — grows from center, splits the stage */}
          <motion.span
            className="absolute inset-y-0 left-1/2 w-[2px] -ml-px bg-[#3ecf8e]"
            style={{
              scaleY: lineScale,
              transformOrigin: "center",
              boxShadow:
                "0 0 24px rgba(62,207,142,0.65), 0 0 60px rgba(62,207,142,0.35)",
            }}
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
          />

          {/* eyebrow + counter */}
          <motion.div
            className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-3"
            animate={open ? { opacity: 0, y: 8 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="sd-mono text-[0.62rem] uppercase tracking-[0.28em] text-[#85858d] select-none">
              Portfolio — Designed &amp; Coded by Milx
            </span>
            <span className="sd-mono flex items-baseline gap-1 text-[#3ecf8e] select-none">
              <motion.span className="text-lg tabular-nums">
                {counter}
              </motion.span>
              <span className="text-[0.7rem]">%</span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
