import { motion } from "framer-motion";
import { MapPin, Calendar, FolderGit2, GlobeLock } from "lucide-react";
import React from "react";

type TimelineItem = {
  type: string;
  title: string;
  icon: React.ReactNode;
  skills?: string[];
  subtitle?: string;
  period?: string;
  location?: string;
  details?: string[];
};

type TimelineSection = {
  type: string;
  title: string;
  icon: React.ReactNode;
  items: TimelineItem[];
};

export const Projects: React.FC = () => {
  const timelineData: TimelineSection[] = [
    {
      type: "project",
      title: "Projects/",
      icon: <FolderGit2 className="w-5 h-5" />,
      items: [
        {
          type: "folder",
          title: "Shreejana Home Packing Udhyog / www.shreejanadryfruits.com",
          icon: <GlobeLock className="w-4 h-4" />,
          skills: [
            "React.js",
            "Nest.js",
            "Mongo.db",
            "Jwt-Token",
            "Tailwind CSS",
            "TypeScript",
            "Zoho Admin Host",
            "Zoho Mail",
            "Zoho CRM",
          ],
        },
        {
          type: "folder",
          title: "Guruko : An Online School Mobile App / www.guruko.com",
          icon: <GlobeLock className="w-4 h-4" />,
          skills: [
            "React.js",
            "ReactNative.js",
            "Nest.js",
            "Supabase",
            "Tailwind CSS",
            "TypeScript",
          ],
        },
        {
          type: "folder",
          title:
            "Gaau Sahar : Online Vegetables Delivery App / www.gausahar.com",
          icon: <GlobeLock className="w-4 h-4" />,
          skills: ["Next.js", "Tailwind CSS", "TypeScript"],
        },
        {
          type: "folder",
          title: "Vault : Cloud Storage System / www.vault.vercel.app",
          icon: <GlobeLock className="w-4 h-4" />,
          skills: ["Next.js", "Appwrite", "Tailwind CSS", "TypeScript"],
        },
        {
          type: "folder",
          title: "Complain Management System / www.complain.vercel.app",
          icon: <GlobeLock className="w-4 h-4" />,
          skills: [
            "React.js",
            "Node.js",
            "Express.js",
            "MySql2",
            "Tailwind CSS",
            "TypeScript",
          ],
        },
      ],
    },
  ];

  return (
    <div className="w-full mt-10" id="projects">
      {/* Header */}
      <div className="flex items-center justify-center">
        <h1 className="text-2xl text-black font-[--font-tangerine] bg-slate-200 rounded-full w-12 h-12 flex items-center justify-center p-[43px]">
          /Work
        </h1>
      </div>

      {/* Timeline */}
      <div className="mt-10 text-left relative">
        {/* Main vertical line */}
        <div className="absolute left-6 top-0 w-px bg-gray-300 h-full" />

        {timelineData.map((section, sectionIndex) => (
          <motion.div
            key={sectionIndex}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sectionIndex * 0.2 }}
            className="relative mb-8"
          >
            {/* Section Folder */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white z-10 relative">
                {section.icon}
              </div>
              <h3 className="ml-4 text-2xl font-bold text-gray-800 font-mono">
                {section.title}
              </h3>
            </div>

            {/* Section Items */}
            <div className="ml-6 relative">
              <div className="absolute left-0 top-0 w-6 h-px bg-gray-300" />

              {section.items.map((item, itemIndex) => (
                <motion.div
                  key={itemIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: sectionIndex * 0.2 + itemIndex * 0.1 + 0.3,
                  }}
                  className="relative mb-6 ml-6"
                >
                  {/* Vertical Line */}
                  {itemIndex < section.items.length - 1 && (
                    <div className="absolute left-[-24px] top-8 w-px bg-gray-200 h-full" />
                  )}

                  {/* Connector */}
                  <div className="absolute left-[-30px] top-2 w-6 h-px bg-gray-300" />
                  <div className="absolute left-[-36px] top-[-2px] w-2 h-2 bg-gray-400 rounded-full" />

                  {/* Item Card */}
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors border-l-4 border-blue-400">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center">
                        <div className="text-gray-600 mr-2">{item.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-800 font-mono">
                            {item.title}
                          </h4>
                          {item.subtitle && (
                            <p className="text-sm text-gray-600">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Optional Details */}
                      <div className="text-right text-sm text-gray-500">
                        {item.period && (
                          <div className="flex items-center justify-end">
                            <Calendar className="w-3 h-3 mr-1" />
                            {item.period}
                          </div>
                        )}
                        {item.location && (
                          <div className="flex items-center justify-end mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.location}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    {item.details && (
                      <ul className="text-sm text-gray-600 mt-3 space-y-1">
                        {item.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Skills */}
                    {item.skills && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-mono"
                          >
                            {skill}
                          </span>
                        ))}
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
  );
};
