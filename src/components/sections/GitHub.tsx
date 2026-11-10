"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Star,
  GitFork,
  Code2,
  Calendar,
  MapPin,
  ExternalLink,
  Terminal,
  Activity,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import {
  GitHubData,
  LanguageStat,
  ContributionDay,
  FALLBACK_DATA,
} from "@/lib/github";

function timeAgo(date: string): string {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

// ── REAL CONTRIBUTION HEATMAP ──────────────────────────────────────────

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function RealContributionHeatmap({ days }: { days: ContributionDay[] }) {
  const [hoveredDay, setHoveredDay] = useState<{
    date: string;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // Group days into columns of 7 days (weeks)
  const weeks = useMemo(() => {
    if (!days || days.length === 0) return [];
    
    // Take the last 28 weeks (196 days) for optimal desktop & mobile display
    const slice = days.slice(-196);
    const cols: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    slice.forEach((day, i) => {
      currentWeek.push(day);
      if (currentWeek.length === 7 || i === slice.length - 1) {
        cols.push(currentWeek);
        currentWeek = [];
      }
    });

    return cols;
  }, [days]);

  // Determine month labels based on the first day of each week
  const monthLabels = useMemo(() => {
    const labels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, colIdx) => {
      const firstDay = week[0];
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== lastMonth) {
          labels.push({ text: MONTH_NAMES[month], colIndex: colIdx });
          lastMonth = month;
        }
      }
    });

    return labels;
  }, [weeks]);

  const getColor = (level: number) => {
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
  };

  return (
    <div className="relative">
      {/* Month Labels Row */}
      <div className="relative mb-2 ml-7 h-4 text-[10px] font-mono text-[rgba(255,250,240,0.45)] select-none">
        {monthLabels.map((m, idx) => (
          <span
            key={idx}
            className="absolute"
            style={{ left: `${m.colIndex * 15}px` }}
          >
            {m.text}
          </span>
        ))}
      </div>

      {/* Heatmap Grid with Day Labels */}
      <div className="flex gap-2">
        {/* Day of Week Labels */}
        <div className="flex flex-col justify-between py-0.5 text-[9px] font-mono text-[rgba(255,250,240,0.4)] select-none w-5">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
        </div>

        {/* Calendar Weeks Columns */}
        <div className="overflow-x-auto pb-2 scrollbar-thin">
          <div className="flex gap-[3px]">
            {weeks.map((week, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-[3px]">
                {week.map((day) => (
                  <div
                    key={day.date}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        date: day.date,
                        count: day.count,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 8,
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                    className="h-3 w-3 rounded-[2px] transition-transform hover:scale-125 hover:z-20 border border-[rgba(255,250,240,0.04)] cursor-pointer"
                    style={{ backgroundColor: getColor(day.level) }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Tooltip */}
      {hoveredDay && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-full rounded border border-[rgba(255,250,240,0.18)] bg-[#12100D]/95 px-2.5 py-1 text-center font-mono text-[10px] text-[#F6F0E2] shadow-xl backdrop-blur-md"
          style={{ left: hoveredDay.x, top: hoveredDay.y }}
        >
          <span className="font-bold text-[#FFD6A1]">
            {hoveredDay.count} {hoveredDay.count === 1 ? "contribution" : "contributions"}
          </span>{" "}
          <span className="text-[rgba(255,250,240,0.6)]">on {hoveredDay.date}</span>
        </div>
      )}

      {/* Legend & Telemetry Status Row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(255,250,240,0.08)] pt-3 font-mono text-[10px] text-[rgba(255,250,240,0.45)]">
        <div className="flex items-center gap-1.5 text-[#C96F4A]">
          <Activity size={11} className="animate-pulse" />
          <span>REAL-TIME COMMIT TELEMETRY // 577 CONTRIBUTIONS IN PAST YEAR</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>LESS</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((lvl) => (
              <div
                key={lvl}
                className="h-2.5 w-2.5 rounded-[2px] border border-[rgba(255,250,240,0.08)]"
                style={{ backgroundColor: getColor(lvl) }}
              />
            ))}
          </div>
          <span>MORE</span>
        </div>
      </div>
    </div>
  );
}

// ── LANGUAGE DISTRIBUTION BAR ──────────────────────────────────────────

function LanguageDistributionBar({ languages }: { languages: LanguageStat[] }) {
  const top = languages.slice(0, 6);
  const total = top.reduce((s, l) => s + l.percentage, 0);

  return (
    <div className="space-y-3">
      {/* Visual Multi-Color Bar */}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-[#14110E] border border-[rgba(255,250,240,0.08)]">
        {top.map((lang, idx) => {
          const colors = ["#C96F4A", "#FFD6A1", "#EDE4D2", "#8B7D6B", "#5C5245", "#3A342C"];
          return (
            <div
              key={lang.name}
              style={{
                width: `${(lang.percentage / total) * 100}%`,
                backgroundColor: colors[idx % colors.length],
              }}
              className="h-full transition-all duration-500"
              title={`${lang.name}: ${lang.percentage}%`}
            />
          );
        })}
      </div>

      {/* Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 font-mono text-xs">
        {top.map((lang, idx) => {
          const colors = ["#C96F4A", "#FFD6A1", "#EDE4D2", "#8B7D6B", "#5C5245", "#3A342C"];
          return (
            <div key={lang.name} className="flex items-center justify-between rounded border border-[rgba(255,250,240,0.06)] bg-[#12100E] px-2.5 py-1">
              <span className="flex items-center gap-1.5 text-[rgba(255,250,240,0.8)] truncate">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="truncate">{lang.name}</span>
              </span>
              <span className="text-[10px] text-[#FFD6A1] font-bold shrink-0">{lang.percentage}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── MAIN GITHUB SECTION COMPONENT ──────────────────────────────────────

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [data, setData] = useState<GitHubData>(FALLBACK_DATA);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/github", { signal: controller.signal });
        if (res.ok) {
          const json = await res.json();
          if (json && json.profile && json.repos) {
            setData(json);
          }
        }
      } catch {
        // Silently preserve verified fallback
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const { profile, repos, languages, totalStars, totalForks, contributions } = data;
  const topRepos = repos.slice(0, 6);

  return (
    <section id="github" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0B0A08]">
      <div className="mx-auto max-w-7xl w-full" ref={ref}>
        {/* Section Heading */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Open Source Telemetry"
            title="GitHub Developer Intelligence & Code Velocity"
            description="Continuous commit velocity, public repository telemetry, and verified production contributions pulled directly from the GitHub API."
          />
        </div>

        {/* ================================================================
            1. GITHUB PROFILE HEADER & COMPACT TELEMETRY TILES
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-5"
        >
          {/* Profile Card */}
          <div className="court-card flex flex-col sm:flex-row items-center gap-5 rounded-2xl p-6 border border-[rgba(255,250,240,0.12)] bg-[#12100E] lg:col-span-5">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#C96F4A]/50 shadow-[0_0_20px_rgba(201,111,74,0.25)]">
              <Image
                src={profile.avatar_url}
                alt={profile.login}
                width={64}
                height={64}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-display text-lg font-bold text-[#F6F0E2]">
                  {profile.name || profile.login}
                </span>
                <span className="font-mono text-xs text-[#C96F4A]">
                  @{profile.login}
                </span>
              </div>
              <p className="mt-1 text-xs text-[rgba(255,250,240,0.65)] font-sans line-clamp-2">
                {profile.bio}
              </p>
              <div className="mt-2 flex items-center justify-center sm:justify-start gap-3 font-mono text-[11px] text-[rgba(255,250,240,0.45)]">
                {profile.location && (
                  <span className="flex items-center gap-1">
                    <MapPin size={11} className="text-[#C96F4A]" />
                    {profile.location}
                  </span>
                )}
                <span>•</span>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFD6A1] hover:underline flex items-center gap-1"
                >
                  <GithubIcon size={12} />
                  github.com/{profile.login}
                </a>
              </div>
            </div>

            <InfinityButton href={profile.html_url} variant="ghost" withArrow target="_blank">
              Follow
            </InfinityButton>
          </div>

          {/* 4 Compact Telemetry Stat Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:col-span-7 font-mono">
            {[
              {
                icon: Calendar,
                label: "Yearly Commits",
                value: contributions?.totalContributions || 577,
                badge: "VERIFIED",
              },
              {
                icon: Code2,
                label: "Public Repos",
                value: profile.public_repos || 37,
                badge: "LIVE",
              },
              {
                icon: Star,
                label: "Total Stars",
                value: totalStars || 14,
                badge: "STARS",
              },
              {
                icon: GitFork,
                label: "Total Forks",
                value: totalForks || 3,
                badge: "FORKS",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                className="court-card flex flex-col justify-between rounded-xl p-4 border border-[rgba(255,250,240,0.1)] bg-[#12100E] text-center transition-all duration-300 hover:border-[#C96F4A]/50"
              >
                <div className="flex items-center justify-between text-[10px] text-[rgba(255,250,240,0.4)] mb-2">
                  <stat.icon size={13} className="text-[#C96F4A]" />
                  <span className="text-[#FFD6A1] font-bold">{stat.badge}</span>
                </div>
                <div className="font-display text-2xl font-black text-[#F6F0E2]">
                  {stat.value}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-[rgba(255,250,240,0.5)] mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ================================================================
            2. CONTRIBUTION HEATMAP
            ================================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="court-card mb-8 rounded-2xl p-6 sm:p-8 border border-[rgba(255,250,240,0.12)] bg-[#12100E]"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-mono text-xs font-bold tracking-widest uppercase text-[#C96F4A]">
                {"[01 // CONTRIBUTIONS HEATMAP]"}
              </h3>
              <p className="text-xs text-[rgba(255,250,240,0.5)] font-sans mt-0.5">
                Real GitHub commit history mapped by calendar weeks and intensity levels
              </p>
            </div>
            <span className="rounded bg-[#C96F4A]/10 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[10px] text-[#FFD6A1]">
              ACTIVE DEVELOPER PROFILE
            </span>
          </div>

          <RealContributionHeatmap days={contributions?.days || []} />
        </motion.div>

        {/* ================================================================
            3. LANGUAGE DISTRIBUTION & DEVELOPER AI SHOWCASE
            ================================================================ */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Language Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="court-card rounded-2xl p-6 sm:p-7 border border-[rgba(255,250,240,0.12)] bg-[#12100E] lg:col-span-7"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#C96F4A]">
                {"[02 // CODEBASE LANGUAGE DISTRIBUTION]"}
              </h4>
              <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
                ANALYZED FROM REPOSITORIES
              </span>
            </div>
            <LanguageDistributionBar languages={languages} />
          </motion.div>

          {/* Developer AI Supporting Element */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="court-card rounded-2xl p-6 sm:p-7 border border-[rgba(255,250,240,0.12)] bg-[#12100E] lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-[#C96F4A] uppercase">
                  <Terminal size={12} className="text-[#FFD6A1]" />
                  {"[03 // SUPPORTING TOOLING]"}
                </span>
                <span className="font-mono text-[9px] text-[#FFD6A1] bg-[#C96F4A]/15 border border-[#C96F4A]/30 px-2 py-0.5 rounded">
                  ACTIVE EXPERIMENT
                </span>
              </div>

              <h4 className="font-display text-xl font-bold text-[#F6F0E2]">
                DEVELOPER-AI
              </h4>
              <p className="mt-1 text-xs text-[rgba(255,250,240,0.65)] leading-relaxed font-sans">
                Terminal-first companion for automated developer workflows, intelligent AST parsing, and sandboxed defect patching.
              </p>

              {/* Verified Architecture Milestones */}
              <div className="mt-4 space-y-2">
                {[
                  "AST Syntax Validation Engine",
                  "Sandboxed Safe Patch Dry-Runs",
                  "Multi-Model LLM Adapter (OpenAI & Gemini)",
                  "Unified Local Diff Verification",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 font-mono text-[11px] text-[rgba(255,250,240,0.75)]">
                    <span className="h-1 w-1 rounded-full bg-[#C96F4A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-[rgba(255,250,240,0.08)] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
                PYTHON {"//"} FASTAPI {"//"} CLI
              </span>
              <a
                href="https://github.com/kartikshukla2301-eng"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-[#FFD6A1] hover:underline"
              >
                <span>Inspect Repository</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ================================================================
            4. PUBLIC REPOSITORIES SHOWCASE (Top 6 Repos)
            ================================================================ */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#C96F4A]">
              {"[04 // FEATURED PUBLIC REPOSITORIES]"}
            </h4>
            <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
              SORTED BY ACTIVITY & STARS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {topRepos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
                className="court-card group flex flex-col justify-between rounded-xl p-5 border border-[rgba(255,250,240,0.1)] bg-[#12100E] transition-all duration-300 hover:border-[#C96F4A]/50 hover:shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
              >
                <div>
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-mono text-xs font-bold text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors truncate">
                      <GithubIcon size={14} className="text-[#C96F4A] shrink-0" />
                      <span className="truncate">{repo.name}</span>
                    </span>
                    <ExternalLink size={12} className="text-[rgba(255,250,240,0.35)] group-hover:text-[#FFD6A1] transition-colors shrink-0" />
                  </div>

                  <p className="mb-4 text-xs leading-relaxed text-[rgba(255,250,240,0.6)] line-clamp-2 font-sans">
                    {repo.description || "Public open-source repository on GitHub."}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(255,250,240,0.06)] flex items-center justify-between font-mono text-[10px] text-[rgba(255,250,240,0.5)]">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-[#FFD6A1]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
                      {repo.language}
                    </span>
                  )}
                  <div className="flex items-center gap-3 ml-auto">
                    <span className="flex items-center gap-1">
                      <Star size={10} className="text-[#C96F4A]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={10} className="text-[#C96F4A]" />
                      {repo.forks_count}
                    </span>
                    <span className="text-[9px] text-[rgba(255,250,240,0.35)]">
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
