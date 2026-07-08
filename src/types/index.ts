/** A featured project rendered in the work showcase. */
export interface Project {
  title: string;
  tagline: string;
  stack: string[];
  url: string;
  accent: string;
  commingSoon?: boolean;
  image: string;
}

/** One chapter of a long-form case study (Problem → Approach → Build → Outcome). */
export interface CaseChapter {
  label: string;
  heading: string;
  body: string[];
}

/** A long-form case study rendered on /case-study. */
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

/** A journal entry rendered (and read in place) on /blog. */
export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  body: string[];
  featured?: boolean;
}
