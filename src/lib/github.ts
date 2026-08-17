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

// ── Fallback Snapshot (in case rate limit is hit without token) ───

export const FALLBACK_DATA: GitHubData = {
  profile: {
    login: "kartikshukla2301-eng",
    name: "Kartik Shukla",
    bio: "AI Engineer & Full Stack Developer | B.Tech CSE '27 | Building intelligent systems",
    avatar_url: "https://avatars.githubusercontent.com/u/153123847?v=4",
    html_url: "https://github.com/kartikshukla2301-eng",
    followers: 12,
    following: 15,
    public_repos: 18,
    location: "India",
    company: null,
    blog: "https://kartikshukla.dev",
  },
  repos: [
    {
      id: 1,
      name: "ai-study-assistant",
      full_name: "kartikshukla2301-eng/ai-study-assistant",
      html_url: "https://github.com/kartikshukla2301-eng/ai-study-assistant",
      description: "Full-stack AI learning platform with OCR-powered PDF intelligence and 10+ AI features.",
      homepage: "https://ai-study-assistant-eight-psi.vercel.app",
      stargazers_count: 5,
      forks_count: 2,
      language: "TypeScript",
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      topics: ["ai", "react", "nextjs", "openai", "study-tool"],
      fork: false,
    },
    {
      id: 2,
      name: "Hairdrama-Task-Manager",
      full_name: "kartikshukla2301-eng/Hairdrama-Task-Manager",
      html_url: "https://github.com/kartikshukla2301-eng/Hairdrama-Task-Manager",
      description: "Production-grade task & team management with Google OAuth 2.0 and Supabase/PostgreSQL.",
      homepage: "https://hairdrama-task-manager-coral.vercel.app",
      stargazers_count: 4,
      forks_count: 1,
      language: "TypeScript",
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      topics: ["nextjs", "supabase", "task-management"],
      fork: false,
    },
    {
      id: 3,
      name: "UltraAi-Chatbot",
      full_name: "kartikshukla2301-eng/UltraAi-Chatbot",
      html_url: "https://github.com/kartikshukla2301-eng/UltraAi-Chatbot",
      description: "Desktop conversational AI assistant with context-aware Gemini API integration.",
      homepage: null,
      stargazers_count: 3,
      forks_count: 0,
      language: "Python",
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      topics: ["python", "gemini-api", "ai-assistant"],
      fork: false,
    },
    {
      id: 4,
      name: "Developer-AI",
      full_name: "kartikshukla2301-eng/Developer-AI",
      html_url: "https://github.com/kartikshukla2301-eng",
      description: "AI-powered terminal-first companion for developer workflows and autonomous defect patching.",
      homepage: null,
      stargazers_count: 2,
      forks_count: 0,
      language: "Python",
      updated_at: new Date().toISOString(),
      pushed_at: new Date().toISOString(),
      topics: ["cli", "ai-agent", "developer-tools"],
      fork: false,
    },
  ],
  languages: [
    { name: "TypeScript", bytes: 145000, percentage: 48, color: "#3178C6" },
    { name: "Python", bytes: 85000, percentage: 28, color: "#3572A5" },
    { name: "JavaScript", bytes: 42000, percentage: 14, color: "#F7DF1E" },
    { name: "CSS", bytes: 18000, percentage: 6, color: "#563D7C" },
    { name: "HTML", bytes: 12000, percentage: 4, color: "#E34C26" },
  ],
  totalStars: 14,
  totalForks: 3,
};

// ── Fetchers ───────────────────────────────────────────

export async function fetchProfile(): Promise<GitHubProfile> {
  return fetchJSON<GitHubProfile>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}`,
    3600
  );
}

export async function fetchRepos(): Promise<GitHubRepo[]> {
  const repos = await fetchJSON<GitHubRepo[]>(
    `${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=30&type=owner&sort=pushed`,
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

  // Only query languages for top 6 repos to save rate limit
  const results = await Promise.allSettled(
    repos.slice(0, 6).map((repo) =>
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

  if (total === 0) {
    return FALLBACK_DATA.languages;
  }

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

export async function fetchGitHubData(): Promise<GitHubData> {
  try {
    const [profile, repos] = await Promise.all([
      fetchProfile(),
      fetchRepos(),
    ]);

    const languages = await fetchLanguages(repos);

    const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
    const totalForks = repos.reduce((sum, r) => sum + r.forks_count, 0);

    return { profile, repos, languages, totalStars, totalForks };
  } catch (error) {
    console.warn("Using fallback GitHub data due to API error or rate limit:", error);
    return FALLBACK_DATA;
  }
}
