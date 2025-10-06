"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const navLinks = [
    { name: "/me", href: "#intro" },
    { name: "/experience", href: "#experience" },
    { name: "/projects", href: "#projects" },
    { name: "/contact", href: "#contact" },
  ];

  const leftLinks = navLinks.slice(0, 2);
  const rightLinks = navLinks.slice(2);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-30 flex justify-center transition-all duration-300`}
    >
      <div
        className={`flex items-center justify-center px-6 gap-12 transition-all duration-300
  ${
    scrolled
      ? "max-w-7xl bg-[#fa9a9b]/80 rounded-s-full rounded-e-full mt-2 h-16"
      : "w-full bg-[#fa9a9b] h-16"
  }`}
      >
        {/* Left side links */}
        <ul className="hidden sm:flex space-x-8 font-sans text-lg font-medium text-black">
          {leftLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-white transition duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Center Logo */}
        <Link href="/" className="flex justify-center items-center px-4">
          <figure>
            <Image
              src="/mm.png"
              alt="Logo"
              width={70}
              height={50}
              className="rounded-full"
            />
          </figure>
        </Link>

        {/* Right side links */}
        <ul className="hidden sm:flex space-x-8 font-sans text-lg font-medium text-black">
          {rightLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-white transition duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
