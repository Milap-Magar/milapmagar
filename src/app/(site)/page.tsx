import { getGithubData } from "@/lib/github";
import HomeBoard from "../_components/HomeBoard";

export const revalidate = 21600;

export default async function Home() {
  const github = await getGithubData();
  return <HomeBoard github={github} />;
}
