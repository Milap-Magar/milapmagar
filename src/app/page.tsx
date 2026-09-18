import { getGithubData } from "@/lib/github";
import ProfilePage from "./_components/ProfilePage";

export const revalidate = 21600;

export default async function Home() {
  const github = await getGithubData();
  return <ProfilePage github={github} />;
}
