"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Instagram, Facebook } from "lucide-react";

const socials = [
  { Icon: Github, href: "https://github.com/Milap-Magar", label: "GitHub" },
  {
    Icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    Icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    Icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
];

export default function SDFooter() {
  return (
    <footer
      id="contact"
      className="border-t border-[var(--line)] mt-10"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col items-start gap-8"
        >
          <span className="sd-eyebrow">Let&apos;s talk</span>
          <h2
            className="sd-serif font-black text-[var(--white)] max-w-3xl"
            style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)", lineHeight: 1.02 }}
          >
            Ready to build something{" "}
            <span className="italic sd-amber">great</span>?
          </h2>

          <a
            href="mailto:info@milapmagar.com.np"
            className="sd-serif text-xl sm:text-3xl text-[var(--muted2)] hover:text-[var(--amber)] transition-colors underline underline-offset-8 decoration-[var(--faint)] hover:decoration-[var(--amber)] inline-flex items-center gap-2"
          >
            info@milapmagar.com.np
            <ArrowUpRight className="w-6 h-6" strokeWidth={1.5} />
          </a>

          <div className="flex items-center gap-5 mt-4">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-[var(--muted)] hover:text-[var(--amber)] transition-colors"
              >
                <Icon className="w-5 h-5" strokeWidth={1.5} />
              </a>
            ))}
          </div>
        </motion.div>

        <div className="mt-20 pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="sd-mono text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Milap Magar. All rights reserved.
          </span>
          <span className="sd-mono text-xs text-[var(--muted)]">
            Designed &amp; coded by Milx
          </span>
        </div>
      </div>

      {/* Giant gradient wordmark — sits below everything, bleeding off the edge */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] as const }}
          className="sd-bigname translate-y-[14%]"
          aria-hidden="true"
        >
          MILAP
        </motion.div>
      </div>
    </footer>
  );
}
