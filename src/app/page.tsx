"use client";

import Image from "next/image";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import {
  Contact,
  Content,
  Footer,
  Navbar,
  ProjectsShowcase,
} from "./components";

const socialLinks = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/Milap.Magar2022",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/milaapeeey/",
    label: "Instagram",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/milap-magar-21427a229/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/Milap-Magar",
    label: "GitHub",
  },
];

export default function Home() {
  return (
    <main className="w-full min-h-screen relative bg-[#fa9a9b]">
      {/* Header */}
      <Navbar />

      {/* HERO Section */}
      <section
        id="intro"
        className="relative w-full h-[90vh] sticky top-0 z-0 overflow-hidden"
      >
        {/* Cat image — centered, sits below the Navbar strip */}
        <div className="absolute inset-0 pt-16 flex items-center justify-center">
          <Image
            src="/cat.png"
            alt="Cat Image"
            width={1024}
            height={1536}
            quality={100}
            priority
            className="max-h-[90vh] w-auto object-contain rounded-2xl"
          />
        </div>

        {/* Overlay content */}
        <div className="absolute inset-x-0 top-[28%] z-10 px-4 flex flex-col items-center text-center">
          {/* Social Icons */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-black shadow-md transition-all duration-200 hover:scale-110"
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl text-black font-[--font-tangerine] drop-shadow-lg">
            Hie, This is Milap
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl text-gray-800 mt-2 font-[--font-tangerine] drop-shadow">
            A Full-stack developer
          </h2>
        </div>
      </section>

      {/* Horizontal-scroll project showcase */}
      <ProjectsShowcase />

      {/* Content Section (middle) */}
      <Content />

      {/* Contact */}
      <Contact />

      <Footer />
    </main>
  );
}
