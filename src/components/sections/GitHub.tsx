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
import { Badge } from "@/components/ui/Badge";
import { developerAI } from "@/lib/data";
import { GitHubSkeleton } from "@/components/ui/Skeleton";
import {
  GitHubData,
  GitHubRepo,
  LanguageStat,
  FALLBACK_DATA,
} from "@/lib/github";

// ── Color helpers ──────────────────────────────────────

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
            className="aspect-square rounded-[2px] transition-colors duration-300 hover:scale-125"
            style={{
              backgroundColor:
                intensity > 0.7
                  ? "rgba(124, 92, 255, 0.6)"
                  : intensity > 0.4
                  ? "rgba(124, 92, 255, 0.3)"
                  : intensity > 0.15
                  ? "rgba(124, 92, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.03)",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/30">
        <span>12 weeks ago</span>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0.03, 0.1, 0.3, 0.6].map((o) => (
              <div
                key={o}
                className="h-2.5 w-2.5 rounded-[2px]"
                style={{
                  backgroundColor: `rgba(124, 92, 255, ${o})`,
                }}
              />
            ))}
          </div>
          <span>More</span>
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
      {top.map((lang) => (
        <div key={lang.name}>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-white/60">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: lang.color || "#666" }}
              />
              {lang.name}
            </span>
            <span className="text-white/30">{lang.percentage}%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.04]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(lang.percentage / total) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: lang.color || "#666" }}
            />
          </div>
        </div>
      ))}
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
          eyebrow="Open Source"
          title="GitHub Activity"
          description="Consistent contributions and open-source projects."
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
              <div className="glass mb-4 flex items-center gap-4 rounded-xl p-4">
                <Image
                  src={profile.avatar_url}
                  alt={profile.login}
                  width={48}
                  height={48}
                  className="rounded-full ring-2 ring-white/10"
                  unoptimized
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">
                      {profile.name || profile.login}
                    </span>
                    {profile.location && (
                      <span className="flex items-center gap-1 text-[10px] text-white/30">
                        <MapPin size={10} />
                        {profile.location}
                      </span>
                    )}
                  </div>
                  {profile.bio && (
                    <p className="mt-0.5 text-xs text-white/40 truncate">
                      {profile.bio}
                    </p>
                  )}
                </div>
                <a
                  href={profile.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-medium text-white/50 transition-all duration-300 hover:border-accent-violet/30 hover:text-accent-violet"
                >
                  Follow
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
                    label: "Repos",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                    className="glass rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/[0.06]"
                  >
                    <stat.icon
                      size={16}
                      className="mx-auto mb-2 text-accent-violet"
                    />
                    <div className="text-lg font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-white/40">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contribution graph */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-xl p-6"
            >
              <h4 className="mb-3 text-sm font-semibold text-white/70">
                Contribution Activity
              </h4>
              <ContributionGraph repos={repos} />
            </motion.div>

            {/* Language stats */}
            {languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="glass rounded-xl p-6"
              >
                <h4 className="mb-4 text-sm font-semibold text-white/70">
                  Languages
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
                  className="premium-card glass group block rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <GithubIcon size={14} className="text-white/40" />
                    <span className="text-sm font-semibold text-white truncate">
                      {repo.name}
                    </span>
                    {repo.homepage && (
                      <ArrowUpRight
                        size={12}
                        className="ml-auto shrink-0 text-white/20 transition-colors group-hover:text-accent-cyan"
                      />
                    )}
                  </div>
                  {repo.description && (
                    <p className="mb-3 text-[11px] leading-relaxed text-white/35 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-3 text-[11px] text-white/35">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor:
                              languages.find((l) => l.name === repo.language)
                                ?.color || "#666",
                          }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star size={11} />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={11} />
                      {repo.forks_count}
                    </span>
                    <span className="ml-auto text-white/20">
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
            <div className="premium-card glass relative overflow-hidden rounded-2xl p-6 h-full">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-violet/10 via-transparent to-accent-cyan/10 opacity-50" />

              <div className="relative z-10">
                <div className="mb-4 flex items-center gap-2">
                  <Zap size={16} className="text-accent-amber" />
                  <span className="text-xs font-bold tracking-wider text-accent-amber uppercase">
                    Currently Building
                  </span>
                </div>

                <h3
                  className="mb-2 text-xl font-bold text-white"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {developerAI.name}
                </h3>
                <p className="mb-6 text-sm text-white/50">
                  {developerAI.description}
                </p>

                {/* Progress */}
                <div className="mb-6">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="text-white/60">Core Engine Compilation</span>
                    <span className="font-bold text-accent-violet">
                      {developerAI.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${developerAI.progress}%` }
                          : {}
                      }
                      transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan"
                    />
                  </div>
                </div>

                {/* Feature chips */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {developerAI.features.map((f) => (
                    <Badge key={f} variant="accent" className="text-[11px]">
                      {f}
                    </Badge>
                  ))}
                </div>

                {/* Roadmap */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white/60 tracking-wider uppercase">
                    Roadmap
                  </h4>
                  {developerAI.roadmap.map((phase, i) => (
                    <div key={phase.quarter} className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className={`h-2.5 w-2.5 rounded-full ${
                            i === 0 ? "bg-accent-violet" : "bg-white/10"
                          }`}
                        />
                        {i < developerAI.roadmap.length - 1 && (
                          <div className="absolute left-1/2 top-2.5 h-3 w-px -translate-x-1/2 bg-white/10" />
                        )}
                      </div>
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-xs text-white/60">
                          {phase.phase}
                        </span>
                        <span className="text-[10px] text-white/30">
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
