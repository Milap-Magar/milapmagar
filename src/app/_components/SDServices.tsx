"use client";

import { motion } from "framer-motion";
import { Code2, Server, Figma, GitBranch } from "lucide-react";
import SDSection from "./SDSection";

const services = [
  {
    Icon: Code2,
    title: "Frontend Development",
    body: "Responsive, accessible interfaces in React, Next.js & TypeScript — clean components that are easy to build on.",
  },
  {
    Icon: Server,
    title: "Full-Stack Features",
    body: "Complete features end to end — REST APIs, auth, and databases with Node.js, Nest.js, and SQL / NoSQL.",
  },
  {
    Icon: Figma,
    title: "Figma to Code",
    body: "Pixel-accurate builds from your designs, with smooth motion using Tailwind CSS and Framer Motion.",
  },
  {
    Icon: GitBranch,
    title: "Team-Ready Delivery",
    body: "Readable, maintainable code with Git, pull-request reviews, and a focus on shipping in small, steady steps.",
  },
];

export default function SDServices() {
  return (
    <SDSection
      id="services"
      num="01"
      title="What I Do"
      intro="A mid-level developer who designs and builds web apps, front to back."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="sd-card p-6 flex flex-col gap-4"
          >
            <span className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--accent-soft)] text-[var(--amber)]">
              <s.Icon className="w-5 h-5" strokeWidth={1.6} />
            </span>
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
