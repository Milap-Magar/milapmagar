"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import SDThemeToggle from "./SDThemeToggle";

const links = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Stack", href: "#stack" },
];

export default function SDNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sd-nav fixed top-0 left-0 right-0 z-50 ${
        scrolled || open ? "sd-nav--scrolled" : ""
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 sm:px-10 h-16 flex items-center justify-between">
        {/* Logo / wordmark */}
        <a href="#top" className="flex flex-col leading-none">
          <span className="sd-serif text-lg font-bold text-[var(--white)]">
            Milap Magar
          </span>
          <span className="sd-mono text-[0.6rem] text-[var(--muted)] tracking-[0.18em]">
            Designer · Developer
          </span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="sd-nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <SDThemeToggle />

          <a
            href="#contact"
            className="hidden sm:inline-flex sd-btn-primary !px-5 !py-2.5 text-[0.72rem]"
          >
            Book a call
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="sd-menu-trigger md:hidden sd-icon-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="w-4 h-4" strokeWidth={1.8} />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.8} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="sd-mobile-panel md:hidden px-6 pb-6 pt-2">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="sd-nav-link py-3 border-b border-[var(--line)]"
              >
                {l.label}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="sd-btn-primary mt-5 w-full justify-center"
          >
            Book a call
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </a>
        </div>
      )}
    </header>
  );
}
