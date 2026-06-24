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
