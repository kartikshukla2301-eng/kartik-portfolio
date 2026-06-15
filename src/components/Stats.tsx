"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Sparkles, Code2, Award, Zap } from "lucide-react";

const STATS_ITEMS = [
  {
    value: "01",
    label: "AI Engineer Journey",
    sub: "B.Tech CSE (2023-2027)",
    icon: Sparkles,
    color: "purple" as const,
  },
  {
    value: "03",
    label: "Featured Projects",
    sub: "AI & Full Stack Apps",
    icon: Code2,
    color: "cyan" as const,
  },
  {
    value: "04",
    label: "Professional Certifications",
    sub: "AWS, MongoDB, Claude Code",
    icon: Award,
    color: "purple" as const,
  },
  {
    value: "24/7",
    label: "Learning & Building",
    sub: "Always Shipping",
    icon: Zap,
    color: "cyan" as const,
  },
];

const FOCUS_ITEMS = [
  "AI Engineering",
  "Full Stack Development",
  "Open Source Learning",
  "Building Developer AI",
  "Problem Solving",
];

export const Stats: React.FC = () => {
  return (
    <section className="relative py-12 bg-dark-bg overflow-hidden">
      {/* Background divider line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS_ITEMS.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  glowColor={stat.color}
                  className="relative group overflow-hidden border border-white/5 bg-white/[0.02] flex flex-col items-start"
                >
                  {/* Decorative glowing background mesh inside card */}
                  <div
                    className={`absolute -right-8 -bottom-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${
                      stat.color === "purple" ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                  
                  {/* Card Icon */}
                  <div
                    className={`p-3 rounded-xl mb-4 border ${
                      stat.color === "purple"
                        ? "border-primary/20 bg-primary/5 text-primary"
                        : "border-secondary/20 bg-secondary/5 text-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Value */}
                  <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-2 font-mono">
                    {stat.value}
                  </span>

                  {/* Labels */}
                  <h3 className="text-base font-semibold text-white/90 mb-1">
                    {stat.label}
                  </h3>
                  <p className="text-xs text-white/50">{stat.sub}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Current Focus Strip */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel border-white/5 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/60">
              Currently Focused On
            </h4>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {FOCUS_ITEMS.map((focus, index) => (
              <motion.span
                key={focus}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`px-3 py-1.5 min-[360px]:px-4 min-[360px]:py-2 rounded-xl text-xs min-[360px]:text-sm font-medium border transition-all duration-300 ${
                  index % 2 === 0
                    ? "border-primary/20 bg-primary/5 text-purple-300 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                    : "border-secondary/20 bg-secondary/5 text-cyan-300 hover:border-secondary/40 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                }`}
              >
                {focus}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
