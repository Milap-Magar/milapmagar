import { getGithubData } from "@/lib/github";
import Shell from "../_components/Shell";

export const revalidate = 21600;

/** Every page shares the sidebar; the GitHub data feeds the share card (and the home board). */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const github = await getGithubData();
  return <Shell github={github}>{children}</Shell>;
}
