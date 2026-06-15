"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Star, GitFork, Flame, Code, History } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

const STATS_CARDS = [
  { label: "Total Contributions", value: "1,482", sub: "Past 12 months", icon: History, color: "purple" },
  { label: "Longest Streak", value: "48 Days", sub: "April - May 2026", icon: Flame, color: "cyan" },
  { label: "Primary Language", value: "TypeScript", sub: "followed by Python", icon: Code, color: "purple" },
];

const HIGHLIGHT_REPOS = [
  {
    name: "ai-study-assistant",
    desc: "AI study planner and dynamic notes engine.",
    stars: 32,
    forks: 8,
    lang: "TypeScript",
  },
  {
    name: "Hairdrama-Task-Manager",
    desc: "Advanced team scheduler and task manager.",
    stars: 28,
    forks: 5,
    lang: "JavaScript",
  },
  {
    name: "UltraAi-Chatbot",
    desc: "Modern low-latency LLM chatbot dashboard.",
    stars: 19,
    forks: 3,
    lang: "TypeScript",
  },
];

export const GitHubActivity: React.FC = () => {
  // Generate a mock dataset for the 53 weeks x 7 days contribution grid
  const gridData = useMemo(() => {
    const data = [];
    // 53 columns (weeks), 7 rows (days)
    for (let w = 0; w < 53; w++) {
      const week = [];
      for (let d = 0; d < 7; d++) {
        // Create an organic looking pattern of commits (high in mid-week, low on weekends)
        const isWeekend = d === 0 || d === 6;
        const seed = Math.random();
        let activityLevel = 0; // 0: none, 1: low, 2: medium, 3: high

        if (isWeekend) {
          if (seed > 0.85) activityLevel = 1;
          else if (seed > 0.95) activityLevel = 2;
        } else {
          if (seed > 0.9) activityLevel = 3;
          else if (seed > 0.6) activityLevel = 2;
          else if (seed > 0.2) activityLevel = 1;
        }
        week.push(activityLevel);
      }
      data.push(week);
    }
    return data;
  }, []);

  // Map activity levels to color classes
  const getActivityColor = (level: number) => {
    switch (level) {
      case 3:
        return "fill-primary shadow-[0_0_8px_#a855f7]"; // High purple
      case 2:
        return "fill-primary/60"; // Medium purple
      case 1:
        return "fill-secondary/60"; // Low cyan
      case 0:
      default:
        return "fill-white/[0.04]"; // None
    }
  };

  return (
    <section id="github" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
            06 . Consistency
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-3">
            Open Source footprint <GithubIcon className="w-8 h-8 text-primary" />
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Side: SVG Contribution Grid */}
          <div className="lg:col-span-8 flex flex-col">
            <Card
              glowColor="purple"
              className="flex-1 border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-4 min-[360px]:p-6 flex flex-col justify-between"
              hoverable={false}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-semibold text-white/90">
                      kartikshukla2301-eng
                    </span>
                  </div>
                  <a
                    href="https://github.com/kartikshukla2301-eng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-secondary hover:underline flex items-center gap-1"
                  >
                    View Github Profile
                  </a>
                </div>

                {/* SVG Contribution Canvas Grid wrapper */}
                <div className="w-full overflow-x-auto pb-4 scrollbar-thin">
                  <svg
                    width="780"
                    height="110"
                    viewBox="0 0 780 110"
                    className="w-full h-auto min-w-[700px]"
                  >
                    {gridData.map((week, wIndex) => (
                      <g key={wIndex} transform={`translate(${wIndex * 14}, 0)`}>
                        {week.map((level, dIndex) => (
                          <rect
                            key={dIndex}
                            y={dIndex * 14}
                            width="10.5"
                            height="10.5"
                            rx="2"
                            className={`transition-colors duration-300 ${getActivityColor(
                              level
                            )}`}
                          />
                        ))}
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Grid Legend */}
              <div className="flex items-center justify-between text-xs text-white/40 pt-4 border-t border-white/5 mt-4">
                <span>Learn & Ship Every Day</span>
                <div className="flex items-center gap-1.5">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 bg-white/[0.04] rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-secondary/60 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-primary/60 rounded-sm" />
                  <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                  <span>More</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Side: Quick Stats insights */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {STATS_CARDS.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  glowColor={stat.color as any}
                  className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-4 min-[360px]:p-5 flex items-center gap-4"
                >
                  <div
                    className={`p-3 rounded-xl border ${
                      stat.color === "purple"
                        ? "border-primary/20 bg-primary/5 text-primary"
                        : "border-secondary/20 bg-secondary/5 text-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono text-white block">
                      {stat.value}
                    </span>
                    <span className="text-xs font-semibold text-white/80 block">
                      {stat.label}
                    </span>
                    <span className="text-[10px] text-white/40 block mt-0.5">
                      {stat.sub}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>

        </div>

        {/* Repository Highlights Spotlight Panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {HIGHLIGHT_REPOS.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card
                className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-4 min-[360px]:p-5 flex flex-col justify-between h-full group"
                hoverable={true}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors duration-200">
                      {repo.name}
                    </h4>
                    <Badge variant="outline" className="text-[9px] px-2 py-0.5">
                      Public
                    </Badge>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed mb-6">
                    {repo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 hover:text-white transition-colors duration-150">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> {repo.stars}
                    </span>
                    <span className="flex items-center gap-1 hover:text-white transition-colors duration-150">
                      <GitFork className="w-3.5 h-3.5 text-secondary" /> {repo.forks}
                    </span>
                  </div>
                  <span className="text-[10px] font-medium tracking-wider text-purple-300">
                    {repo.lang}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
