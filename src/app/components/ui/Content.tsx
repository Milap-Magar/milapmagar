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
import { Projects } from "./Projects";

const Content = () => {
  const timelineData = [
    {
      type: "folder",
      title: "Education/",
      icon: <GraduationCap className="w-5 h-5" />,
      items: [
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
          period: "Jan 2024 - July 2024 ",
          location: "Sankhamul, Kathmandu",
          details: [
            "Improving the UI & UX of Femicam's desktop application based on ReactJs, Tailwindcss & Material UI",
            "Implementing the responsive designs of FIGMA into React components for the desktop as well as mobile devices.",
          ],
          icon: <Code className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "GauSahar.com.np",
          subtitle: "Freelance Web Developer (Remote)",
          period: "Aug 2025 - Sept 2025",
          details: [
            "Figma design integration into code nextjs + ts",
            "Integration of framer-motion and vanilla.js",
            "Create responsive design for desktop, tablet and mobile devices upto (360 * 667)px",
            "Customized seller and customer end of endpoints. (/seller) && (/customer)",
          ],
          icon: <Globe className="w-4 h-4" />,
        },
        {
          type: "file",
          title: "TD Crop - Assistant Tech",
          subtitle: "Mid level Front-end Developer (remote)",
          period: "Jan 2025 - Present",
          details: [
            "Bootstrapped the project from scratch with React (TypeScript), React Router v7, Tailwind CSS v4, and a scalable folder architecture.",
            "Implemented global state with Zustand and optimized server-state handling using TanStack Query for efficient data fetching, caching, and mutations.",
            "Integrated TanStack Table with advanced features (sorting, filtering, pagination) and customized UI using Tailwind CSS and Lucide React icons.",
            "Developed responsive UI components with Tailwind v4 and added smooth animations using Framer Motion.",
            "Translated Figma designs into pixel-perfect UIs while extending and creating additional design elements beyond the original designer’s input.",
            "Built and maintained both User-facing system (dashboard, checkout flow, profile management, etc.) and Admin section (analytics, user management, role permissions).",
            "Payment Gateway integration done of Stripe, Esewa and Khalti.",
            "Created reusable component libraries (buttons, modals, forms, tables) to ensure consistency across User and Admin systems.",
            "Applied TypeScript for type-safety, implemented code-splitting with React Router v7, and improved rendering performance with memoization strategies.",
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
          skills: [
            "JavaScript",
            "HTML",
            "CSS",
            "TypeScript",
            "Java",
            "SQL",
            "C",
          ],
        },
        {
          type: "folder",
          title: "Technologies/",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: [
            "React.js",
            "Next.js",
            "Tailwind CSS",
            "Material UI",
            "Nest.js",
            "Bootstrap",
            "Zod",
            "Node.js",
            "Express.js",
            "MongoDB",
          ],
        },
        {
          type: "folder",
          title: "Tools/",
          icon: <FolderOpen className="w-4 h-4" />,
          skills: [
            "VS Code",
            "MySQL",
            "Git",
            "Git-Bash",
            "Figma",
            "Apollo Studio",
            "Postman",
            "MailMug",
          ],
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
                <div className="ml-6 relative">
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

        {/* Projects Section */}
        <Projects />

        <div className="h-[20vh]"></div>
      </div>
    </div>
  );
};

export default Content;
