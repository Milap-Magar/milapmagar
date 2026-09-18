export const EMAIL = "info@milapmagar.com.np";
export const GITHUB_USER = "Milap-Magar";

export const profile = {
  name: "Milap Magar",
  handle: "milapmagar",
  /** Drop the photo in /public and set the path here, e.g. "/milap.jpg". */
  avatar: "/milap.png" as string | null,
  role: "Designer & Full-Stack Developer",
  company: "Chatblix",
  location: "Kathmandu, Nepal",
  timeZone: "Asia/Kathmandu",
  tagline: '"Just a developer who - solves problems"',
  bio: [
    "Lately that's been Chatblix — one inbox for WhatsApp, Instagram, Messenger, Telegram and TikTok, with AI that replies in your voice.",
  ],
  tags: [
    { label: "Product Designer", tone: "butter" },
    { label: "Full-Stack", tone: "blush" },
    { label: "Java", tone: "sage" },
    { label: "Design Systems", tone: "sky" },
  ] as const,
};

/** Short, current, first-person. Edit freely — it's the most "human" card on the page. */
export const now = [
  "Building PixSift — photo discovery on the Pixabay API, with Google sign-in and collections.",
  "Tidying up Chatblix's onboarding.",
  "Open to freelance and full-time product work.",
];

export const socials = {
  github: "https://github.com/Milap-Magar",
  linkedin: "https://www.linkedin.com/in/milap-magar-21427a229/",
  instagram: "https://www.instagram.com/milaapeeey/",
  facebook: "https://www.facebook.com/Milap.Magar2022",
};

/** Milestones for the career chart — `level` is the relative height (0–1). */
export const journey = [
  { year: "2022", label: "First lines", level: 0.2 },
  { year: "2023", label: "Shreejana", level: 0.45 },
  { year: "2024", label: "Vault", level: 0.35 },
  { year: "2025", label: "Chatblix", level: 0.85 },
  { year: "Now", label: "PixSift", level: 0.95 },
];

/** How the work splits — used by the "Where my hours go" card. Sums to 100. */
export const craftSplit = [
  { label: "Design", value: 30, color: "#efd9a0" },
  { label: "Frontend", value: 45, color: "#e8c3ad" },
  { label: "Backend", value: 25, color: "#cfd6ad" },
];

export const toolbox = [
  "Figma", "React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Node.js", "Java", "PostgreSQL", "MongoDB", "Supabase", "Docker",
];

export const quote =
  "Good software is a conversation — design asks the question, engineering answers it, and the user shouldn't notice either.";
