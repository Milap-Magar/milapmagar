"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import "../../navbar.css";

// ─── Nav links ────────────────────────────────────────────────────────────────
const navLinks = [
  { name: "/me", href: "#intro" },
  { name: "/experience", href: "#experience" },
  { name: "/projects", href: "#projects" },
  { name: "/contact", href: "#contact" },
];

const leftLinks = navLinks.slice(0, 2);
const rightLinks = navLinks.slice(2);

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  // Ref to track previous scroll position — used for hysteresis
  // (enter pill at 60px, exit pill at 20px — prevents jitter at the threshold)
  const lastScrollY = useRef(0);

  // ── Scroll detection with hysteresis ────────────────────────────────────
  useEffect(() => {
    const ENTER_THRESHOLD = 60; // scroll down past this → pill appears
    const EXIT_THRESHOLD = 20; // scroll back above this → pill dissolves

    const onScroll = () => {
      const y = window.scrollY;
      if (!scrolled && y > ENTER_THRESHOLD) setScrolled(true);
      if (scrolled && y < EXIT_THRESHOLD) setScrolled(false);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount so SSR hydration matches
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrolled]);

  // ── Active section via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveLink(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Body scroll lock when mobile menu is open ────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleDrawerLink = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className={`nav-header${scrolled ? " scrolled" : ""}`}
        role="banner"
      >
        <nav
          aria-label="Primary navigation"
          className={`nav-bar${scrolled ? " scrolled" : ""}`}
        >
          {/* Left links */}
          <ul className="nav-links" role="list">
            {leftLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link${activeLink === link.href ? " active" : ""}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Center logo */}
          <Link href="/" aria-label="Go to homepage" className="nav-logo">
            <Image
              src="/color-replaced.png"
              alt="Milap Magar"
              width={44}
              height={44}
              priority
              className="nav-logo-img"
            />
          </Link>

          {/* Right links */}
          <ul className="nav-links" role="list">
            {rightLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`nav-link${activeLink === link.href ? " active" : ""}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Hamburger */}
          <button
            className={`nav-hamburger${menuOpen ? " open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      <div
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`nav-drawer${menuOpen ? " open" : ""}`}
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-drawer-link"
            onClick={handleDrawerLink}
          >
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
