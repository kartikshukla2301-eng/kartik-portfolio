"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Star, GitFork, Code2, Calendar, MapPin, ExternalLink, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { ShowCard } from "@/components/ui/ShowCard";
import { CountUp } from "@/components/motion/CountUp";
import type { ContributionCalendar, ContributionDay, GitHubData, LanguageStat } from "@/lib/github";

type LoadState = { status: "loading" } | { status: "ready"; data: GitHubData } | { status: "unavailable" };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const CELL = 12;
const GAP = 3;
const LANG_COLORS = ["#C96F4A", "#FFD6A1", "#EDE4D2", "#8B7D6B", "#5C5245", "#3A342C"];

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function levelColor(level: number): string {
  switch (level) {
    case 1:
      return "rgba(201, 111, 74, 0.4)";
    case 2:
      return "#C96F4A";
    case 3:
      return "#FFD6A1";
    case 4:
      return "#FFF5EA";
    default:
      return "#15120F";
  }
}

// ── Contribution heatmap (real data only) ──────────────────────────────

function Heatmap({ calendar }: { calendar: ContributionCalendar }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ day: ContributionDay; x: number; y: number } | null>(null);

  // Columns are weeks starting on Sunday; the first week is padded so rows line up with weekdays.
  const weeks = useMemo(() => {
    const cols: (ContributionDay | null)[][] = [];
    let current: (ContributionDay | null)[] = [];
    const firstWeekday = new Date(`${calendar.days[0].date}T00:00:00`).getDay();
    for (let i = 0; i < firstWeekday; i++) current.push(null);
    for (const day of calendar.days) {
      current.push(day);
      if (current.length === 7) {
        cols.push(current);
        current = [];
      }
    }
    if (current.length) cols.push(current);
    return cols;
  }, [calendar.days]);

  const monthLabels = useMemo(() => {
    const labels: { text: string; col: number }[] = [];
    let last = -1;
    weeks.forEach((week, col) => {
      const first = week.find(Boolean);
      if (!first) return;
      const month = new Date(`${first.date}T00:00:00`).getMonth();
      if (month !== last) {
        labels.push({ text: MONTHS[month], col });
        last = month;
      }
    });
    return labels;
  }, [weeks]);

  // On narrow screens start scrolled to the most recent weeks.
  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [weeks]);

  const step = CELL + GAP;

  return (
    <div className="relative">
      <div ref={scrollerRef} className="overflow-x-auto pb-2">
        <div className="w-max">
          <div className="relative mb-2 h-4 font-mono text-[10px] text-[rgba(255,250,240,0.45)]" aria-hidden="true">
            {monthLabels.map((m) => (
              <span key={`${m.text}-${m.col}`} className="absolute" style={{ left: m.col * step }}>
                {m.text}
              </span>
            ))}
          </div>
          <div className="flex" style={{ gap: GAP }} role="img" aria-label={`${calendar.totalContributions} contributions in the last year`}>
            {weeks.map((week, col) => (
              <div key={col} className="flex flex-col" style={{ gap: GAP }}>
                {week.map((day, row) =>
                  day ? (
                    <div
                      key={day.date}
                      onPointerEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHovered({ day, x: rect.left + rect.width / 2, y: rect.top - 8 });
                      }}
                      onPointerLeave={() => setHovered(null)}
                      className="rounded-[2px] border border-[rgba(255,250,240,0.04)] transition-transform hover:z-20 hover:scale-125"
                      style={{ width: CELL, height: CELL, backgroundColor: levelColor(day.level) }}
                    />
                  ) : (
                    <div key={`pad-${row}`} style={{ width: CELL, height: CELL }} />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {hovered && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded border border-[rgba(255,250,240,0.18)] bg-[#12100D]/95 px-2.5 py-1 font-mono text-[10px] text-[#F6F0E2] shadow-xl backdrop-blur-md"
          style={{ left: hovered.x, top: hovered.y }}
        >
          <span className="font-bold text-[#FFD6A1]">
            {hovered.day.count} {hovered.day.count === 1 ? "contribution" : "contributions"}
          </span>{" "}
          <span className="text-[rgba(255,250,240,0.6)]">on {hovered.day.date}</span>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(255,250,240,0.08)] pt-3 font-mono text-[10px] text-[rgba(255,250,240,0.5)]">
        <span className="text-[#C96F4A]">
          <CountUp value={calendar.totalContributions} duration={2} /> contributions in the last year
        </span>
        <span className="flex items-center gap-1.5">
          Less
          {[0, 1, 2, 3, 4].map((lvl) => (
            <span
              key={lvl}
              className="h-2.5 w-2.5 rounded-[2px] border border-[rgba(255,250,240,0.08)]"
              style={{ backgroundColor: levelColor(lvl) }}
            />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

function Languages({ languages }: { languages: LanguageStat[] }) {
  const top = languages.slice(0, 6);
  const total = top.reduce((s, l) => s + l.percentage, 0) || 1;
  return (
    <div className="space-y-3">
      <div className="flex h-2 w-full overflow-hidden rounded-full border border-[rgba(255,250,240,0.08)] bg-[#14110E]">
        {top.map((lang, i) => (
          <div
            key={lang.name}
            style={{ width: `${(lang.percentage / total) * 100}%`, backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }}
            title={`${lang.name}: ${lang.percentage}%`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-xs sm:grid-cols-3">
        {top.map((lang, i) => (
          <div
            key={lang.name}
            className="flex items-center justify-between rounded border border-[rgba(255,250,240,0.06)] bg-[#12100E] px-2.5 py-1"
          >
            <span className="flex items-center gap-1.5 truncate text-[rgba(255,250,240,0.8)]">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: LANG_COLORS[i % LANG_COLORS.length] }} />
              <span className="truncate">{lang.name}</span>
            </span>
            <span className="shrink-0 text-[10px] font-bold text-[#FFD6A1]">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Section ────────────────────────────────────────────────────────────

export function GitHubSection() {
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/github", { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as GitHubData;
        if (!json?.profile || !json?.repos) throw new Error("bad payload");
        setState({ status: "ready", data: json });
      } catch (err) {
        if ((err as Error).name !== "AbortError") setState({ status: "unavailable" });
      }
    })();
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Open source"
          title="Code, in the open"
          description="Live numbers from the GitHub API: commits, repositories and languages. Nothing on this card is hand-typed."
        />

        {state.status === "loading" && (
          <div className="grid gap-5" aria-busy="true">
            <div className="h-32 animate-pulse rounded-2xl bg-[rgba(255,250,240,0.04)]" />
            <div className="h-56 animate-pulse rounded-2xl bg-[rgba(255,250,240,0.04)]" />
          </div>
        )}

        {state.status === "unavailable" && (
          <ShowCard>
            <div className="flex flex-col items-start gap-4 p-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-sm text-[rgba(255,250,240,0.7)]">
                GitHub data is unavailable right now (rate limit or network). The repositories are all on GitHub.
              </p>
              <InfinityButton href="https://github.com/kartikshukla2301-eng" variant="ghost" withArrow target="_blank">
                Open GitHub
              </InfinityButton>
            </div>
          </ShowCard>
        )}

        {state.status === "ready" && <Loaded data={state.data} />}
      </div>
    </section>
  );
}

function Loaded({ data }: { data: GitHubData }) {
  const { profile, repos, languages, totalStars, totalForks, contributions } = data;
  const topRepos = repos.slice(0, 6);

  const tiles = [
    { icon: Calendar, label: "Yearly commits", value: contributions?.totalContributions ?? null },
    { icon: Code2, label: "Public repos", value: profile.public_repos },
    { icon: Star, label: "Stars", value: totalStars },
    { icon: GitFork, label: "Forks", value: totalForks },
  ];

  return (
    <>
      <div className="mb-6 grid gap-5 lg:grid-cols-12">
        <ShowCard className="lg:col-span-5">
          <div className="flex flex-col items-center gap-5 p-6 sm:flex-row">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#C96F4A]/50">
              <Image src={profile.avatar_url} alt={profile.login} width={64} height={64} className="h-full w-full object-cover" unoptimized />
            </div>
            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="font-display text-2xl uppercase leading-none text-[#F6F0E2]">{profile.name || profile.login}</p>
              <p className="mt-1 font-mono text-xs text-[#C96F4A]">@{profile.login}</p>
              {profile.bio && <p className="mt-2 line-clamp-2 text-xs text-[rgba(255,250,240,0.65)]">{profile.bio}</p>}
              {profile.location && (
                <p className="mt-2 flex items-center justify-center gap-1 font-mono text-[11px] text-[rgba(255,250,240,0.45)] sm:justify-start">
                  <MapPin size={11} className="text-[#C96F4A]" />
                  {profile.location}
                </p>
              )}
            </div>
            <InfinityButton href={profile.html_url} variant="ghost" withArrow target="_blank">
              Follow
            </InfinityButton>
          </div>
        </ShowCard>

        <div className="grid grid-cols-2 gap-3 font-mono sm:grid-cols-4 lg:col-span-7">
          {tiles.map((tile, i) => (
            <ShowCard key={tile.label} delay={i * 0.05}>
              <div className="flex h-full flex-col justify-between p-4">
                <tile.icon size={14} className="mb-3 text-[#C96F4A]" />
                <div className="font-display text-4xl leading-none text-[#F6F0E2]">
                  {tile.value === null ? "-" : <CountUp value={tile.value} />}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wider text-[rgba(255,250,240,0.5)]">{tile.label}</div>
              </div>
            </ShowCard>
          ))}
        </div>
      </div>

      {contributions && (
        <ShowCard className="mb-6">
          <div className="p-6 sm:p-8">
            <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-[#C96F4A]">[ 01 // Contributions ]</h3>
            <Heatmap calendar={contributions} />
          </div>
        </ShowCard>
      )}

      <div className="mb-6 grid gap-5 lg:grid-cols-12">
        {languages.length > 0 && (
          <ShowCard className="lg:col-span-7">
            <div className="p-6 sm:p-7">
              <h3 className="mb-4 font-mono text-xs font-bold uppercase tracking-widest text-[#C96F4A]">[ 02 // Languages ]</h3>
              <Languages languages={languages} />
            </div>
          </ShowCard>
        )}

        <ShowCard className={languages.length > 0 ? "lg:col-span-5" : "lg:col-span-12"}>
          <div className="flex h-full flex-col justify-between p-6 sm:p-7">
            <div>
              <p className="mb-3 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[#C96F4A]">
                <Terminal size={12} className="text-[#FFD6A1]" />
                [ 03 // In progress ]
              </p>
              <h3 className="font-display text-3xl uppercase leading-none text-[#F6F0E2]">Developer-AI</h3>
              <p className="mt-2 text-xs leading-relaxed text-[rgba(255,250,240,0.65)]">
                Terminal-first companion for developer workflows: documentation generation and automated defect patching.
              </p>
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-[rgba(255,250,240,0.08)] pt-4">
              <span className="font-mono text-[10px] text-[rgba(255,250,240,0.45)]">PYTHON // CLI</span>
              <a
                href="https://github.com/kartikshukla2301-eng/Developer-AI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FFD6A1] hover:underline"
              >
                Repository <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </ShowCard>
      </div>

      <div>
        <h3 className="mb-5 font-mono text-xs font-bold uppercase tracking-widest text-[#C96F4A]">[ 04 // Top repositories ]</h3>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topRepos.map((repo, i) => (
            <ShowCard key={repo.id} delay={(i % 3) * 0.06}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex h-full flex-col justify-between p-5">
                <div>
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 truncate font-mono text-xs font-bold text-[#F6F0E2] transition-colors group-hover:text-[#FFD6A1]">
                      <GithubIcon size={14} className="shrink-0 text-[#C96F4A]" />
                      <span className="truncate">{repo.name}</span>
                    </span>
                    <ExternalLink size={12} className="shrink-0 text-[rgba(255,250,240,0.35)] transition-colors group-hover:text-[#FFD6A1]" />
                  </div>
                  <p className="mb-4 line-clamp-2 text-xs leading-relaxed text-[rgba(255,250,240,0.6)]">
                    {repo.description || "Public repository on GitHub."}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-[rgba(255,250,240,0.06)] pt-3 font-mono text-[10px] text-[rgba(255,250,240,0.5)]">
                  {repo.language ? (
                    <span className="flex items-center gap-1.5 text-[#FFD6A1]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
                      {repo.language}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Star size={10} className="text-[#C96F4A]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={10} className="text-[#C96F4A]" />
                      {repo.forks_count}
                    </span>
                    <span className="text-[9px] text-[rgba(255,250,240,0.35)]">{timeAgo(repo.pushed_at)}</span>
                  </span>
                </div>
              </a>
            </ShowCard>
          ))}
        </div>
      </div>
    </>
  );
}
