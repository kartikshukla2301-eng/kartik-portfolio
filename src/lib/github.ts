const GITHUB_USERNAME = "kartikshukla2301-eng";
const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "portfolio-site",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchJSON<T>(url: string, revalidate = 3600): Promise<T> {
  const res = await fetch(url, {
    headers: getHeaders(),
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// ── Types ──────────────────────────────────────────────

export interface GitHubProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
  company: string | null;
  blog: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  topics: string[];
  fork: boolean;
}

export interface LanguageStat {
  name: string;
  bytes: number;
  percentage: number;
  color: string | null;
}

export interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export interface ContributionCalendar {
  totalContributions: number;
  days: ContributionDay[];
}

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: LanguageStat[];
  totalStars: number;
  totalForks: number;
  /** null when the contribution calendar service could not be reached. */
  contributions: ContributionCalendar | null;
}

// ── Fetchers ───────────────────────────────────────────
// There is intentionally no made-up fallback data: if GitHub cannot be reached the API route
// answers 502 and the UI shows an "unavailable" state instead of invented numbers.

export async function fetchProfile(): Promise<GitHubProfile> {
  return fetchJSON<GitHubProfile>(`${GITHUB_API}/users/${GITHUB_USERNAME}`, 3600);
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchJSON<GitHubRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=30&type=owner&sort=pushed`,
    1800
  );

  return repos.filter((r) => !r.fork).sort((a, b) => b.stargazers_count - a.stargazers_count);
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178C6",
  JavaScript: "#F7DF1E",
  Python: "#3572A5",
  HTML: "#E34C26",
  CSS: "#563D7C",
  "C++": "#F34B7D",
  C: "#555555",
  Java: "#B07219",
  Dart: "#00B4AB",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Shell: "#89E051",
  Arduino: "#BD7A2D",
  Dockerfile: "#384D54",
  "Jupyter Notebook": "#DA5B0B",
  "C#": "#178600",
  Ruby: "#701516",
  PHP: "#4F5D95",
};

export async function fetchLanguages(repos: GitHubRepo[]): Promise<LanguageStat[]> {
  const langMap = new Map<string, number>();

  // Only query languages for the top 6 repos to save rate limit
  const results = await Promise.allSettled(
    repos
      .slice(0, 6)
      .map((repo) =>
        fetchJSON<Record<string, number>>(`${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo.name}/languages`, 3600)
      )
  );

  for (const result of results) {
    if (result.status === "fulfilled") {
      for (const [lang, bytes] of Object.entries(result.value)) {
        langMap.set(lang, (langMap.get(lang) || 0) + bytes);
      }
    }
  }

  const total = Array.from(langMap.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return [];

  return Array.from(langMap.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: Math.round((bytes / total) * 100),
      color: LANGUAGE_COLORS[name] || null,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 8);
}

export async function fetchContributions(): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;

    const data = await res.json();
    const days: ContributionDay[] = (data.contributions || []).map(
      (c: { date: string; count: number; level: number }) => ({
        date: c.date,
        count: c.count,
        level: c.level,
      })
    );
    if (days.length === 0) return null;

    const total =
      typeof data.total?.lastYear === "number"
        ? data.total.lastYear
        : days.reduce((sum, d) => sum + d.count, 0);

    return { totalContributions: total, days };
  } catch (err) {
    console.warn("Failed to fetch contribution calendar:", err);
    return null;
  }
}

/** Throws when the GitHub REST API is unreachable or rate limited; the route turns that into a 502. */
export async function fetchGitHubData(): Promise<GitHubData> {
  const [profile, repos, contributions] = await Promise.all([fetchProfile(), fetchRepos(), fetchContributions()]);
  const languages = await fetchLanguages(repos);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return { profile, repos, languages, totalStars, totalForks, contributions };
}
