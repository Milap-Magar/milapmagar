"use client";

import {
  Contact,
  Content,
  Footer,
  Navbar,
  ProjectsShowcase,
} from "./components";
import HeroSection from "./components/ui/HeroSection"; // ← your new premium hero

export default function Home() {
  return (
    <main
      className="w-full min-h-screen relative"
      style={{ background: "#09090b" }}
    >
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Horizontal-scroll project showcase ────────────────────────────── */}
      <ProjectsShowcase />

      {/* ── Content Section (about / middle) ──────────────────────────────── */}
      <Content />

      {/* ── Contact ────────────────────────────────────────────────────────── */}
      <Contact />

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <Footer />
    </main>
  );
}
