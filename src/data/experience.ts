import type { Experience } from "@/types";

/* Newest first. Dates are "YYYY-MM"; leave `to` out for the current role.
   Everything on /experience (and its structured data) is generated from this list. */
export const experience: Experience[] = [
  {
    slug: "chatblix",
    role: "Designer & Full-Stack Developer",
    company: "Chatblix",
    url: "https://chatblix.com",
    from: "2025-01",
    location: "Kathmandu, Nepal",
    type: "full-time",
    summary:
      "Designing and building a unified inbox that brings WhatsApp, Instagram, Messenger, Telegram and TikTok into one place, with an AI assistant that drafts replies in the owner's voice.",
    highlights: [
      "Own the product end to end: Figma design system, Next.js frontend, Node.js services and the PostgreSQL schema.",
      "Normalised five platforms' webhook formats into one idempotent message model so every feature ships once.",
      "Designed the triage-first inbox and onboarding flow non-technical shop owners run from a single tab.",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "Figma"],
  },
  {
    slug: "freelance",
    role: "Freelance Product Designer & Developer",
    company: "Independent",
    from: "2023-01",
    location: "Remote · Kathmandu, Nepal",
    type: "freelance",
    summary:
      "Design and full-stack builds for small businesses and my own products — from the first Figma frame to a deployed URL.",
    highlights: [
      "Shelfmallow + Java Book API: a React 19 library for students backed by a Spring Boot REST API with JWT auth.",
      "PixSift: photo discovery on the Pixabay API with Google sign-in, collections and ranked Discover feeds.",
      "Shreejana Dry Fruits: an e-commerce storefront and notebook-simple admin for a family home-packing udhyog.",
      "Vault: private cloud storage on Next.js and Appwrite with granular access control.",
    ],
    stack: ["React", "Next.js", "Java", "Spring Boot", "Nest.js", "MongoDB", "Appwrite"],
  },
];
