"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { Star, GitFork, Flame, Code2, Zap } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { githubStats, developerAI } from "@/lib/data";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function ContributionGraph() {
  const intensities = useMemo(
    () => Array.from({ length: 84 }, (_, i) => seededRandom(i + 1)),
    []
  );

  return (
    <>
      <div className="grid grid-cols-7 gap-1">
        {intensities.map((intensity, i) => (
          <div
            key={i}
            className="aspect-square rounded-[2px] transition-colors duration-300 hover:scale-125"
            style={{
              backgroundColor:
                intensity > 0.8
                  ? "rgba(124, 92, 255, 0.6)"
                  : intensity > 0.5
                  ? "rgba(124, 92, 255, 0.3)"
                  : intensity > 0.2
                  ? "rgba(124, 92, 255, 0.1)"
                  : "rgba(255, 255, 255, 0.03)",
            }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-white/30">
        <span>{githubStats.streakPeriod}</span>
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

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              {[
                {
                  icon: Code2,
                  value: githubStats.totalContributions.toLocaleString(),
                  label: "Contributions",
                },
                {
                  icon: Flame,
                  value: `${githubStats.longestStreak} days`,
                  label: "Longest Streak",
                },
                {
                  icon: Star,
                  value: githubStats.primaryLanguage,
                  label: "Primary Language",
                },
                {
                  icon: GitFork,
                  value: githubStats.secondaryLanguage,
                  label: "Secondary",
                },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
                  className="glass rounded-xl p-4 text-center transition-all duration-300 hover:bg-white/[0.06] hover:shadow-[0_0_20px_rgba(124,92,255,0.05)]"
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
              <ContributionGraph />
            </motion.div>

            {/* Repo cards */}
            <div className="grid gap-4 sm:grid-cols-3">
              {githubStats.repos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href={`https://github.com/kartikshukla2301-eng/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="premium-card glass group block rounded-xl p-4 transition-all duration-300 hover:bg-white/[0.06]"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <GithubIcon size={14} className="text-white/40" />
                    <span className="text-sm font-semibold text-white truncate">
                      {repo.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Star size={12} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork size={12} />
                      {repo.forks}
                    </span>
                    <Badge variant="outline" className="text-[9px]">
                      {repo.language}
                    </Badge>
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
