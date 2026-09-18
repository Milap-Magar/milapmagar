import { GITHUB_USER } from "@/data/profile";

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GithubData {
  days: ContributionDay[];
  total: number;
  repos: number | null;
  followers: number | null;
}

const DAY = 86_400_000;

/* Deterministic stand-in so the card still renders if the APIs are down. */
function fallbackDays(): ContributionDay[] {
  const end = Date.now();
  return Array.from({ length: 365 }, (_, i) => {
    const n = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    const level = (n < 0.35 ? 0 : n < 0.65 ? 1 : n < 0.85 ? 2 : n < 0.95 ? 3 : 4) as ContributionDay["level"];
    return { date: new Date(end - (364 - i) * DAY).toISOString().slice(0, 10), count: level * 3, level };
  });
}

export async function getGithubData(): Promise<GithubData> {
  const revalidate = { next: { revalidate: 60 * 60 * 6 } };
  const [contrib, user] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, revalidate)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null),
    fetch(`https://api.github.com/users/${GITHUB_USER}`, revalidate)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null),
  ]);

  const days: ContributionDay[] = contrib?.contributions ?? fallbackDays();
  return {
    days,
    total: contrib?.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0),
    repos: user?.public_repos ?? null,
    followers: user?.followers ?? null,
  };
}
