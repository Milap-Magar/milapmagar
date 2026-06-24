"use client";

import { motion } from "framer-motion";
import SDSection from "./SDSection";

const steps = [
  {
    num: "01",
    title: "Discover",
    body: "We align on goals, scope, and users. I dig into the problem before touching a single pixel.",
  },
  {
    num: "02",
    title: "Design",
    body: "Flows, wireframes, then high-fidelity UI in Figma — reviewed together, iterated fast.",
  },
  {
    num: "03",
    title: "Build",
    body: "I turn the design into clean, type-safe React / Next.js with motion and accessibility baked in.",
  },
  {
    num: "04",
    title: "Launch",
    body: "Ship it, measure it, refine it. I stay on to make sure it performs in the real world.",
  },
];

export default function SDProcess() {
  return (
    <SDSection
      id="process"
      num="03"
      title="How I Work"
      intro="A proven process, not a mystery."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="flex flex-col gap-4 relative"
          >
            <span className="sd-serif text-5xl font-black text-[var(--faint)]">
              {s.num}
            </span>
            <span className="sd-accent-line w-10" />
            <h3 className="sd-serif text-xl font-bold text-[var(--white)]">
              {s.title}
            </h3>
            <p
              className="text-sm text-[var(--muted2)] leading-relaxed"
              style={{ fontFamily: "var(--font-geist), sans-serif" }}
            >
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </SDSection>
  );
}
