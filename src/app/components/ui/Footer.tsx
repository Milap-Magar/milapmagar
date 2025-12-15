"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail } from "lucide-react";
import React from "react";

const Footer = () => {
  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Project", href: "#project" },
    { label: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.3 },
    },
  };

  return (
    <footer className="relative bg-black text-white py-12 px-4 z-50">
      <motion.div
        className="max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.div className="text-center mb-8" variants={itemVariants}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Milap<span className="text-[#fa9a9b]">.</span>
          </h2>
        </motion.div>

        {/* Navigation Links */}
        <motion.nav
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mb-10"
          variants={itemVariants}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              className="text-sm md:text-base text-gray-300 hover:text-white transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.nav>

        {/* Social Icons and Language Selector */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-4 md:gap-6 mb-8"
          variants={itemVariants}
        >
          {/* Social Icons */}
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors duration-300"
                variants={iconVariants}
                whileHover="hover"
                whileTap={{ scale: 0.9 }}
              >
                <Icon size={20} />
              </motion.a>
            );
          })}

          {/* Language Button */}
          <motion.button
            className="px-6 py-2 border-2 border-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            English
          </motion.button>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm"
          variants={itemVariants}
        >
          <p>Copyright © Milap Magar</p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
