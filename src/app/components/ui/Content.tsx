"use client";

import { motion } from "framer-motion";
import {
  FolderOpen,
  File,
  Code,
  Globe,
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
} from "lucide-react";
import React from "react";

const Content = () => {
  const timelineData = [
    {
      type: "folder",
      title: "Education/",
      icon: <GraduationCap className="w-5 h-5" />,
      items: [
        {
          type: "file",
          title: "Adarsha Vidya Ashram (AVM)",
          subtitle: "Higher Levels : +2",
          period: "2020 - 2022",
          icon: <File className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "Patan Multiple Campus",
          subtitle: "BCA - Bachelor in Computer Application",
          period: "Feb 2022 - present",
          icon: <File className="w-4 h-4" />,
        },
      ],
    },
    {
      type: "folder",
      title: "Experience/",
      icon: <Briefcase className="w-5 h-5" />,
      items: [
        {
          type: "file",
          title: "Doersoft Technologies",
          subtitle: "Front-end Developer (Intern)",
          period: "Jan 2024 - July 2024",
          location: "Sankhamul, Kathmandu",
          details: [
            "Engineered high-performance user interfaces for desktop applications using React.js, Tailwind CSS, and Material UI, significantly enhancing UX/UI consistency.",
            "Translated complex Figma wireframes into pixel-perfect, responsive React components, ensuring seamless cross-platform compatibility across desktop and mobile devices.",
          ],
          icon: <Code className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "Park Ventures",
          subtitle: "Back-end Developer (Intern)",
          period: "Aug 2024 - Jan 2025", // Corrected logical date flow
          location: "Baneshowr, Kathmandu",
          details: [
            "Collaborated on full-cycle web development, focusing on scalable architecture and seamless frontend-backend integration.",
            "Transformed high-fidelity Figma designs into dynamic, reusable React components, optimizing code quality and maintainability for mobile-first responsiveness.",
          ],
          icon: <Code className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "Confidential", // Fixed typo "Confiential"
          subtitle: "Freelance Web Developer (Remote)",
          period: "Aug 2025 - Sept 2025",
          details: [
            "Executed full-stack development using Next.js and TypeScript, converting static Figma prototypes into interactive, type-safe web applications.",
            "Enhanced user engagement by integrating Framer Motion for complex animations and optimized Vanilla JS for lightweight interactions.",
            "Implemented mobile-first responsive design strategies, ensuring pixel-perfect rendering across all viewports (360px+).",
            "Developed and optimized custom API endpoints (/seller, /customer) to streamline data flow between client interfaces and server-side logic.",
          ],
          icon: <Globe className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "TD Crop - Assistant Tech",
          subtitle: "Mid-level Front-end Developer (Remote)",
          period: "Jan 2025 - Present",
          details: [
            "Architected a scalable enterprise-grade frontend from scratch using React (TypeScript), React Router v7, and Tailwind CSS v4, establishing a modular folder structure.",
            "Orchestrated global state management using Zustand and implemented TanStack Query for optimized server-state caching, data fetching, and real-time synchronization.",
            "Engineered data-intensive dashboards integrating TanStack Table with advanced sorting, filtering, and pagination, styled with custom Tailwind CSS and Lucide React icons.",
            "Delivered highly responsive UI components utilizing Tailwind v4 features and enhanced micro-interactions with Framer Motion.",
            "Bridged the design-development gap by translating Figma mockups into pixel-perfect code while extending UI/UX capabilities beyond original specifications.",
            "Developed comprehensive User and Admin portals, featuring secure Role-Based Access Control (RBAC), analytics visualization, and profile management.",
            "Integrated multi-provider Payment Gateways (Stripe, Esewa, Khalti) to facilitate secure and seamless transaction flows.",
            "Built a robust, reusable component library (Atomic Design principles) to standardize UI elements across the application ecosystem.",
            "Maximized application performance through TypeScript type-safety, code-splitting via React Router v7, and advanced memoization techniques.",
          ],
          icon: <Code className="w-4 h-4" />,
        },
      ],
    },
    {
      type: "folder",
      title: "Skills/",
      icon: <Code className="w-5 h-5" />,
      items: [
        {
          type: "folder",
          title: "Languages/",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: ["HTML", "CSS", "JavaScript", "TypeScript", "SQL"],
        },
        {
          type: "folder",
          title: "Frontend Technologies / Frameworks",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: [
            "React.js",
            "Next.js",
            "Daisy UI",
            "Tailwind CSS",
            "Bootstrap UI",
            "Zustand",
            "@tanstack/Query",
            "@tanstack/react-query",
            "@tanstack/react-table",
            "Material UI",
            "Nest.js",
            "Zod",
            "Node.js",
            "Express.js",
            "MongoDB",
          ],
        },
        {
          type: "folder",
          title: "Backend Technologies / Frameworks",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: [
            "Nest.js",
            "Node.js",
            "Express.js",
            "Jwt-Token",
            "Docker",
            "Zod",
          ],
        },
        {
          type: "folder",
          title: "Database",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: ["MySql.db", "Mongo.db"],
        },
        {
          type: "folder",
          title: "Tools/",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: [
            "Linux",
            "VS Code",
            "MySQL",
            "Figma",
            "Apollo Studio",
            "Postman",
            "MailMug",
          ],
        },
        {
          type: "folder",
          title: "Extra Tools Used/",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: ["Trello", "Git", "Github"],
        },
      ],
    },
  ];

  return (
    <div className="text-center mt-[-10vh] px-4 relative z-20 bg-white min-h-[150vh] shadow-2xl rounded-t-3xl">
      <div className="pt-16 pb-12 max-w-4xl mx-auto">
        {/* Custom Intro */}
        <div className="w-full items-center justify-center flex mb-4">
          <h1 className="text-2xl text-black font-[--font-tangerine] bg-slate-200 rounded-full w-12 p-[43px] h-12 flex items-center justify-center">
            /Me
          </h1>
        </div>
        <h2 className="text-4xl text-black font-[--font-tangerine]">
          Milap Ramauli Magar
        </h2>
        <h2 className="text-3xl text-gray-800 mt-4 font-[--font-tangerine]">
          A Fullstack developer
        </h2>

        {/* Japanese line */}
        <p className="mt-6 text-xl text-black font-[var(--font-noto-sans-jp)]">
          こんにちは、私はフルスタック開発者のミラップです。
        </p>

        {/* File System Timeline */}
        <div className="mt-16 text-left">
          <div className="relative">
            {/* Main vertical line */}
            <div className="absolute left-6 top-0 w-px bg-gray-300 h-full"></div>

            {timelineData.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: sectionIndex * 0.2 }}
                className="relative mb-8"
              >
                {/* Section folder */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white z-10 relative">
                    {section.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold text-gray-800 font-mono">
                    {section.title}
                  </h3>
                </div>

                {/* Section items */}
                <div className="ml-6 relative" id="experience">
                  {/* Horizontal connecting line */}
                  <div className="absolute left-0 top-0 w-6 h-px bg-gray-300"></div>

                  {section.items?.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: sectionIndex * 0.2 + itemIndex * 0.1 + 0.3,
                      }}
                      className="relative mb-6 ml-6"
                    >
                      {/* Vertical line for items */}
                      {itemIndex < section.items.length - 1 && (
                        <div className="absolute left-[-24px] top-8 w-px bg-gray-200 h-full"></div>
                      )}

                      {/* Item connector */}
                      <div className="absolute left-[-30px] top-2 w-6 h-px bg-gray-300"></div>
                      <div className="absolute left-[-36px] top-[-2px] w-2 h-2 bg-gray-400 rounded-full"></div>

                      <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border-l-4 border-blue-400">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center">
                            <div className="text-gray-600 mr-2">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800 font-mono">
                                {item.title}
                              </h4>
                              {"subtitle" in item && item.subtitle && (
                                <p className="text-sm text-gray-600">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            {"period" in item && item.period && (
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {item.period}
                              </div>
                            )}
                            {"location" in item && item.location && (
                              <div className="flex items-center mt-1">
                                <MapPin className="w-3 h-3 mr-1" />
                                {item.location}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Details */}
                        {"details" in item && item.details && (
                          <ul className="text-sm text-gray-600 mt-3 space-y-1">
                            {item.details.map((detail, detailIndex) => (
                              <li
                                key={detailIndex}
                                className="flex items-start"
                              >
                                <span className="text-gray-400 mr-2">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Skills */}
                        {"skills" in item && item.skills && (
                          <div className="mt-3">
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Content;
