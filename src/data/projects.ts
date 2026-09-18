import type { Project } from "@/types";

export const projects: Project[] = [
  {
    title: "Chatblix",
    tagline:
      "A unified inbox for WhatsApp, Instagram, Messenger, Telegram & TikTok — with AI that replies in your voice.",
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind"],
    url: "https://chatblix.com",
    accent: "#1d4ed8",
    image: "/Project-Showcase/chatblix.png",
  },
  {
    title: "PixSift",
    tagline:
      "Photo discovery on the Pixabay API — Google sign-in, saved collections, and ranking for Discover and Most Popular.",
    stack: ["Next.js", "NextAuth", "MongoDB", "Pixabay API", "Algorithms"],
    url: "https://pixsift.vercel.app/",
    accent: "#c4b5fd",
    commingSoon: false,
    image: "/Project-Showcase/pixsift.png",
  },
  {
    title: "Shreejana Dry Fruits",
    tagline: "E-commerce platform for a home-packing udhyog.",
    stack: ["React", "Nest.js", "MongoDB", "Tailwind", "Zoho"],
    url: "https://shreejanadryfruits.com",
    accent: "#fa9a9b",
    image: "/Project-Showcase/shreejana.png",
  },
  {
    title: "Sharky Payment",
    tagline: "Online payments and secure, authenticated transactions.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://shark-payment.vercel.app",
    accent: "#86efac",
    commingSoon: true,
    image: "/Project-Showcase/sharky.png",
  },
  {
    title: "Vault",
    tagline: "Private cloud storage system with granular access.",
    stack: ["Next.js", "Appwrite", "Tailwind", "TypeScript"],
    url: "https://my-vault-inc.vercel.app/landing",
    accent: "#c4b5fd",
    image: "/Project-Showcase/vault.png",
  },
];
