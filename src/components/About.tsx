"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Brain, Cpu, Terminal, Compass } from "lucide-react";

const MINDSET_ITEMS = [
  {
    title: "AI Enthusiast",
    description:
      "Deeply interested in agentic workflows, large language model integrations, and using AI tools to build products that were impossible to create a year ago.",
    icon: Brain,
    color: "purple" as const,
  },
  {
    title: "Full Stack Developer",
    description:
      "Comfortable moving across front-end rendering engines like Next.js down to API backends and document databases, writing type-safe code throughout the stack.",
    icon: Terminal,
    color: "cyan" as const,
  },
  {
    title: "Problem Solver",
    description:
      "Driven by challenges. I view code as a tool to solve real-world user pain points and optimize developer velocity, rather than just syntax on a screen.",
    icon: Cpu,
    color: "purple" as const,
  },
  {
    title: "Continuous Learner",
    description:
      "B.Tech CSE student graduating in 2027. I practice shipping every day, reading documentation, exploring frameworks, and staying on the cutting edge.",
    icon: Compass,
    color: "cyan" as const,
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Glow rings in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/5 to-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
            01 . Philosophy
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineering for the Next Era
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Mindset Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Core Statement */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.h4
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl font-bold leading-relaxed text-white/90 mb-6"
            >
              "The best way to predict the future is to build it. I build products that leverage intelligence to amplify human capability."
            </motion.h4>
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/60 leading-relaxed mb-6"
            >
              Technology is transitioning from static interfaces to dynamic, intelligent partners. My engineering approach balances solid software architectures with smart, contextual LLM agents.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/60 leading-relaxed"
            >
              By aligning modern frontend rendering, robust document structures, and prompt engineering protocols, I create software that delivers immediate recruiter and product value.
            </motion.p>
          </div>

          {/* Right Column - Mindset Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {MINDSET_ITEMS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Card
                    glowColor={item.color}
                    className="h-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all p-6 flex flex-col"
                  >
                    <div
                      className={`p-2.5 rounded-lg w-fit mb-4 border ${
                        item.color === "purple"
                          ? "border-primary/20 bg-primary/5 text-primary"
                          : "border-secondary/20 bg-secondary/5 text-secondary"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h5 className="text-lg font-bold text-white mb-2">
                      {item.title}
                    </h5>
                    <p className="text-sm text-white/50 leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
