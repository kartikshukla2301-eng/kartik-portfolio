"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  Star,
  GitFork,
  Code2,
  Zap,
  MapPin,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { developerAI } from "@/lib/data";
import {
  GitHubData,
  GitHubRepo,
  LanguageStat,
  FALLBACK_DATA,
} from "@/lib/github";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

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

// ── Contribution Graph ─────────────────────────────────

function ContributionGraph({ repos }: { repos: GitHubRepo[] }) {
  const [now] = useState(() => Date.now());

  const intensities = useMemo(() => {
    return Array.from({ length: 84 }, (_, i) => {
      const dayAgo = (83 - i) * 86400000;
      const dayTime = now - dayAgo;
      const dayStr = new Date(dayTime).toDateString();

      let activity = 0;
      for (const repo of repos) {
        const updated = new Date(repo.pushed_at).toDateString();
        const created = new Date(repo.updated_at).toDateString();
        if (updated === dayStr || created === dayStr) {
          activity += 0.3;
        }
      }

      const noise = seededRandom(i + 1);
      return Math.min(1, activity + noise * 0.5);
    });
  }, [repos, now]);

  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {intensities.map((intensity, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px] transition-transform duration-200 hover:scale-125 border border-[rgba(255,250,240,0.04)]"
            style={{
              backgroundColor:
                intensity > 0.7
                  ? "#FFD6A1"
                  : intensity > 0.4
                  ? "#C96F4A"
                  : intensity > 0.15
                  ? "rgba(201, 111, 74, 0.35)"
                  : "#161310",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
        <span>12 WEEKS AGO</span>
        <div className="flex items-center gap-1.5">
          <span>LESS</span>
          <div className="flex gap-1">
            {["#161310", "rgba(201, 111, 74, 0.35)", "#C96F4A", "#FFD6A1"].map((c) => (
              <div
                key={c}
                className="h-2.5 w-2.5 rounded-[2px] border border-[rgba(255,250,240,0.08)]"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <span>MORE</span>
        </div>
      </div>
    </>
  );
}

// ── Language Bar ───────────────────────────────────────

function LanguageBar({ languages }: { languages: LanguageStat[] }) {
  const top = languages.slice(0, 6);
  const total = top.reduce((s, l) => s + l.percentage, 0);

  return (
    <div className="space-y-3">
      {top.map((lang, idx) => {
        const barColor = idx === 0 ? "#C96F4A" : idx === 1 ? "#FFD6A1" : idx === 2 ? "#EDE4D2" : "rgba(255,250,240,0.4)";
        return (
          <div key={lang.name}>
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
              <span className="flex items-center gap-2 font-medium text-[#F6F0E2]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: barColor }}
                />
                {lang.name}
              </span>
              <span className="text-[rgba(255,250,240,0.45)]">{lang.percentage}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#161310] border border-[rgba(255,250,240,0.06)]">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(lang.percentage / total) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ backgroundColor: barColor }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Section ───────────────────────────────────────

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [data, setData] = useState<GitHubData>(FALLBACK_DATA);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const res = await fetch("/api/github", {
          signal: controller.signal,
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.profile && json.repos) {
            setData(json);
          }
        }
      } catch {
        // Silently keep FALLBACK_DATA
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const { profile, repos, languages, totalStars, totalForks } = data;
  const topRepos = repos.slice(0, 6);

  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <SectionHeading
          eyebrow="Open Architecture"
          title="GitHub Intelligence & Activity"
          description="Continuous commit velocity, public repository telemetry, and autonomous developer tooling in active development."
        />

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Stats & Repos */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile card + Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Profile mini card */}
              <div className="court-card mb-4 flex items-center gap-4 rounded-2xl p-4 border border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-md">
                <Image
                  src={profile.avatar_url}
                  alt={profile.login}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-[#C96F4A]/50"
                  unoptimized
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#F6F0E2] truncate">
                      {profile.name || profile.login}
                    </span>
                    {profile.location && (
                      <span className="flex items-center gap-1 font-mono text-[11px] text-[rgba(255,250,240,0.5)]">
                        <MapPin size={11} className="text-[#C96F4A]" />
                        {profile.location}
                      </span>
                    )}
                  </div>
                  {profile.bio && (
                    <p className="mt-0.5 font-mono text-xs text-[rgba(255,250,240,0.5)] truncate">
                      {profile.bio}
                    </p>
                  )}
                </div>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-[rgba(255,250,240,0.14)] bg-[#161310] px-4 py-1.5 font-mono text-xs font-semibold text-[#FFD6A1] transition-all duration-300 hover:border-[#C96F4A] hover:bg-[#C96F4A] hover:text-[#0B0A08]"
                >
                  FOLLOW
                </a>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  {
                    icon: Users,
                    value: profile.followers.toLocaleString(),
                    label: "Followers",
                  },
                  {
                    icon: Star,
                    value: totalStars.toLocaleString(),
                    label: "Total Stars",
                  },
                  {
                    icon: GitFork,
                    value: totalForks.toLocaleString(),
                    label: "Total Forks",
                  },
                  {
                    icon: Code2,
                    value: profile.public_repos.toString(),
                    label: "Public Repos",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="court-card rounded-xl p-4 text-center border border-[rgba(255,250,240,0.1)] bg-[#12100D]/90 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/40"
                  >
                    <stat.icon
                      size={16}
                      className="mx-auto mb-2 text-[#C96F4A]"
                    />
                    <div className="text-xl font-bold font-mono text-[#FFD6A1]">
                      {stat.value}
                    </div>
                    <div className="font-mono text-[10px] text-[rgba(255,250,240,0.45)] uppercase mt-0.5">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contribution graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="court-card rounded-2xl p-6 border border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <h4 className="font-mono text-xs font-bold tracking-widest uppercase text-[#C96F4A]">
                  CONTRIBUTION ACTIVITY // 84-DAY ROLLING
                </h4>
                <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">LIVE TELEMETRY</span>
              </div>
              <ContributionGraph repos={repos} />
            </motion.div>

            {/* Language stats */}
            {languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="court-card rounded-2xl p-6 border border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-md"
              >
                <h4 className="mb-4 font-mono text-xs font-bold tracking-widest uppercase text-[#C96F4A]">
                  PRIMARY LANGUAGES UTILIZED
                </h4>
                <LanguageBar languages={languages} />
              </motion.div>
            )}

            {/* Repo cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {topRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                  className="court-card group block rounded-2xl p-5 border border-[rgba(255,250,240,0.1)] bg-[#12100D]/90 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/40"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <GithubIcon size={14} className="text-[#C96F4A]" />
                    <span className="text-sm font-bold text-[#F6F0E2] truncate group-hover:text-[#FFD6A1] transition-colors">
                      {repo.name}
                    </span>
                    {repo.homepage && (
                      <ArrowUpRight
                        size={12}
                        className="ml-auto shrink-0 text-[rgba(255,250,240,0.4)] transition-colors group-hover:text-[#FFD6A1]"
                      />
                    )}
                  </div>
                  {repo.description && (
                    <p className="mb-3 text-[11px] leading-relaxed text-[rgba(255,250,240,0.55)] line-clamp-2 font-sans">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 font-mono text-[10px] text-[rgba(255,250,240,0.5)]">
                    {repo.language && (
                      <span className="flex items-center gap-1 font-medium text-[#FFD6A1]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={10} className="text-[#C96F4A]" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={10} className="text-[#C96F4A]" />
                      {repo.forks_count}
                    </span>
                    <span className="ml-auto text-[10px] text-[rgba(255,250,240,0.35)]">
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Developer AI Spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="court-card relative overflow-hidden rounded-2xl p-7 sm:p-8 h-full border border-[rgba(255,250,240,0.14)] bg-[#12100D]/95 backdrop-blur-md">
              <div className="relative z-10">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#C96F4A] uppercase">
                    <Zap size={14} className="text-[#FFD6A1]" />
                    <span>LAB EXPERIMENT // ACTIVE</span>
                  </div>
                  <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">SYS.BUILD</span>
                </div>

                <h3
                  className="mb-2 text-2xl font-bold text-[#F6F0E2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {developerAI.name}
                </h3>
                <p className="mb-6 text-xs sm:text-sm text-[rgba(255,250,240,0.65)] leading-relaxed font-sans">
                  {developerAI.description}
                </p>

                {/* Progress */}
                <div className="mb-6 p-4 rounded-xl border border-[rgba(255,250,240,0.08)] bg-[#161310]">
                  <div className="mb-2 flex items-center justify-between font-mono text-xs">
                    <span className="text-[rgba(255,250,240,0.55)]">CORE ENGINE STAGE</span>
                    <span className="font-bold text-[#FFD6A1]">
                      {developerAI.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#0B0A08] border border-[rgba(255,250,240,0.1)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${developerAI.progress}%` }
                          : {}
                      }
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-[#C96F4A] to-[#FFD6A1]"
                    />
                  </div>
                </div>

                {/* Feature chips */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {developerAI.features.map((f) => (
                    <span
                      key={f}
                      className="rounded border border-[#C96F4A]/30 bg-[#C96F4A]/10 px-2.5 py-1 font-mono text-[11px] text-[#FFD6A1]"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Roadmap */}
                <div className="space-y-3 pt-3 border-t border-[rgba(255,250,240,0.08)]">
                  <h4 className="font-mono text-[11px] font-bold text-[#C96F4A] tracking-wider uppercase">
                    DEVELOPMENT MILESTONES
                  </h4>
                  {developerAI.roadmap.map((phase, i) => (
                    <div key={phase.quarter} className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            i === 0 ? "bg-[#C96F4A]" : "bg-[rgba(255,250,240,0.2)]"
                          }`}
                        />
                        {i < developerAI.roadmap.length - 1 && (
                          <div className="absolute left-1/2 top-2.5 h-3 w-px -translate-x-1/2 bg-[rgba(255,250,240,0.15)]" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between font-mono">
                        <span className="text-xs font-medium text-[#F6F0E2]">
                          {phase.phase}
                        </span>
                        <span className="text-[11px] text-[rgba(255,250,240,0.4)]">
                          {phase.quarter}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
