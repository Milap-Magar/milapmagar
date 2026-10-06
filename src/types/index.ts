/** A shipped (or cooking) project, rendered as a card on the home board and /projects. */
export interface Project {
  /** URL-safe id; also used as the React key and in structured data. */
  slug: string;
  title: string;
  tagline: string;
  /** Longer copy for /projects and the screenshot lightbox. */
  description?: string;
  /** "web" opens a site, "api" opens a running backend — changes the call-to-action wording. */
  kind?: "web" | "api";
  year?: string;
  role?: string;
  stack: string[];
  url: string;
  /** Public source, if any. */
  repo?: string;
  accent: string;
  comingSoon?: boolean;
  /** Screenshot under /public — keep it ≥1200px wide so it stays sharp in the lightbox. */
  image: string;
  /** Natural aspect ratio of the screenshot, used by the lightbox. Defaults to 16/10. */
  imageAspect?: number;
}

/** One role on the /experience timeline. */
export interface Experience {
  slug: string;
  role: string;
  company: string;
  url?: string;
  /** "YYYY-MM"; leave `to` empty for the current role. */
  from: string;
  to?: string;
  location: string;
  type: "full-time" | "freelance" | "contract" | "internship" | "education";
  summary: string;
  highlights: string[];
  stack: string[];
}

/** One chapter of a long-form case study (Problem → Approach → Build → Outcome). */
export interface CaseChapter {
  label: string;
  heading: string;
  body: string[];
}

/** A long-form case study. */
export interface CaseStudy {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  stack: string[];
  url: string;
  image: string;
  live: boolean;
  stats: { value: number; suffix: string; label: string }[];
  chapters: CaseChapter[];
  pullQuote: string;
}

/** A journal entry listed on /blog and read at /blog/[slug]. */
export interface Post {
  slug: string;
  title: string;
  /** ISO date, "YYYY-MM-DD". */
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  /** One string per paragraph. */
  body: string[];
  featured?: boolean;
}
