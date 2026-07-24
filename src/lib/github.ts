const GITHUB_USERNAME = "kartikshukla2301-eng";
const GITHUB_API = "https://api.github.com";

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
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

export interface GitHubData {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: LanguageStat[];
  totalStars: number;
  totalForks: number;
}

// ── Fetchers ───────────────────────────────────────────

export async function fetchProfile(): Promise<GitHubProfile> {
  return fetchJSON<GitHubProfile>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}`,
    3600
  );
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchJSON<GitHubRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`,
    1800
  );

  return repos
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
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

export async function fetchLanguages(
  repos: GitHubRepo[]
): Promise<LanguageStat[]> {
  const langMap = new Map<string, number>();

  const results = await Promise.allSettled(
    repos.slice(0, 30).map((repo) =>
      fetchJSON<Record<string, number>>(
        `${GITHUB_API}/repos/${GITHUB_USERNAME}/${repo.name}/languages`,
        3600
      )
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

  return Array.from(langMap.entries())
    .map(([name, bytes]) => ({
      name,
      bytes,
      percentage: total > 0 ? Math.round((bytes / total) * 100) : 0,
      color: LANGUAGE_COLORS[name] || null,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 12);
}

export async function fetchGitHubData(): Promise<GitHubData> {
  const [profile, repos] = await Promise.all([
    fetchProfile(),
    fetchRepos(),
  ]);

  const languages = await fetchLanguages(repos);

  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

  return { profile, repos, languages, totalStars, totalForks };
}
