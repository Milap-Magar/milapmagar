"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Project = {
  title: string;
  tagline: string;
  stack: string[];
  url: string;
  accent: string;
};

const projects: Project[] = [
  {
    title: "Mini-Hub",
    tagline:
      "Github style local code storage and code-base management application",
    stack: ["Next.js", "Node.js", "Express.js", "Supabase", "TypeScript"],
    url: "https://milap-magar.github.io/apps/minihub",
    accent: "#7dd3fc",
  },
  {
    title: "Shreejana Dry Fruits",
    tagline: "E-commerce platform for a home-packing udhyog.",
    stack: ["React", "Nest.js", "MongoDB", "Tailwind", "Zoho"],
    url: "https://shreejanadryfruits.com",
    accent: "#fa9a9b",
  },
  {
    title: "Sharky Payment ",
    tagline: "Online payment and authentic transaction",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://shark-payment.vercel.app",
    accent: "#86efac",
  },
  {
    title: "Vault",
    tagline: "Private cloud storage system with granular access.",
    stack: ["Next.js", "Appwrite", "Tailwind", "TypeScript"],
    url: "my-vault-inc.vercel.app/landing",
    accent: "#c4b5fd",
  },
];

const ProjectsShowcase = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        if (!track) return;

        const getDistance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -getDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => `+=${getDistance()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (progressRef.current) {
                const idx = Math.min(
                  projects.length,
                  Math.max(1, Math.ceil(self.progress * projects.length) || 1),
                );
                progressRef.current.textContent = `0${idx} / 0${projects.length}`;
              }
            },
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Featured projects showcase"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* Pinned meta bar (desktop) */}
      <div className="hidden md:flex absolute top-6 left-0 right-0 z-20 items-center justify-between px-10 pointer-events-none">
        <span className="font-mono text-xs tracking-[0.2em] uppercase text-gray-500">
          / Selected Work
        </span>
        <span
          ref={progressRef}
          className="font-mono text-xs tracking-[0.2em] text-gray-500"
        >
          01 / 0{projects.length}
        </span>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row md:h-screen md:w-max"
      >
        {projects.map((project, i) => (
          <article
            key={project.title}
            className="relative w-screen min-h-screen md:h-screen flex-shrink-0 flex items-center justify-center px-6 md:px-20 py-20 md:py-0"
            style={{
              background: `linear-gradient(135deg, ${project.accent}26 0%, #ffffff 70%)`,
            }}
          >
            <div className="relative z-10 w-full max-w-6xl grid md:grid-cols-12 gap-10 md:gap-14 items-center">
              {/* Mock browser preview */}
              <div className="md:col-span-7 order-2 md:order-1">
                <div
                  className="relative aspect-[16/10] rounded-xl shadow-2xl overflow-hidden border border-black/5"
                  style={{ backgroundColor: project.accent }}
                >
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black/20 backdrop-blur-sm flex items-center px-3 gap-1.5 z-10">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/70" />
                    <span className="ml-4 font-mono text-[10px] text-white/90 truncate">
                      {project.url}
                    </span>
                  </div>
                  <div className="absolute inset-0 pt-8 flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="font-mono text-8xl md:text-9xl font-black opacity-30 leading-none">
                        0{i + 1}
                      </div>
                      <p className="mt-2 font-mono text-[10px] md:text-xs opacity-80 tracking-[0.25em] uppercase">
                        Screenshot placeholder
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info column */}
              <div className="md:col-span-5 order-1 md:order-2 text-left">
                <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-gray-500">
                  Project 0{i + 1} / 0{projects.length}
                </span>
                <h3 className="mt-3 font-mono text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                  {project.title}
                </h3>
                <p className="mt-4 text-base md:text-lg text-gray-600 leading-relaxed">
                  {project.tagline}
                </p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 font-mono text-xs text-red-500"
                >
                  → {project.url}
                </a>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/80 backdrop-blur border border-gray-200 rounded-full text-xs font-mono text-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Index watermark */}
            <span className="hidden md:block absolute bottom-4 right-8 font-mono text-[10rem] font-black text-black/[0.04] leading-none select-none pointer-events-none">
              {String(i + 1).padStart(2, "0")}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
