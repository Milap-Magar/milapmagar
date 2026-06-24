"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id?: string;
  num: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Shared section shell: numbered eyebrow header + animated reveal. */
export default function SDSection({ id, num, title, intro, children }: Props) {
  return (
    <section
      id={id}
      className="mx-auto max-w-7xl px-6 sm:px-10 py-20 sm:py-28"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        className="mb-12 sm:mb-16"
      >
        <div className="flex items-center gap-3 mb-5">
          <span className="sd-section-num">{num}</span>
          <span className="sd-accent-line w-12" />
          <span className="sd-eyebrow">{title}</span>
        </div>
        {intro && (
          <p
            className="sd-section-title max-w-3xl"
          >
            {intro}
          </p>
        )}
      </motion.div>
      {children}
    </section>
  );
}
