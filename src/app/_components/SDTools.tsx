"use client";

import { motion } from "framer-motion";
import SDSection from "./SDSection";

const groups = [
  {
    label: "Design",
    tools: ["Figma", "Framer", "Photoshop", "Illustrator"],
  },
  {
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Nest.js", "Express", "PostgreSQL", "MongoDB", "Zod"],
  },
  {
    label: "Tooling",
    tools: ["Git", "Docker", "Linux", "Postman", "Vercel"],
  },
];

export default function SDTools() {
  return (
    <SDSection
      id="stack"
      num="04"
      title="Tools & Stack"
      intro="The tools I reach for every day."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--line)]">
        {groups.map((g, i) => (
          <motion.div
            key={g.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="bg-[var(--ink)] p-7 flex flex-col gap-5"
          >
            <span className="sd-eyebrow text-[var(--amber)]">{g.label}</span>
            <ul className="flex flex-col gap-3">
              {g.tools.map((t) => (
                <li
                  key={t}
                  className="sd-mono text-sm text-[var(--muted2)] flex items-center gap-2.5"
                >
                  <span className="w-1 h-1 rounded-full bg-[var(--amber)]" />
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SDSection>
  );
}
