"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Layers, Server, BrainCircuit, Wrench } from "lucide-react";

const SKILL_CATEGORIES = [
  {
    title: "Frontend Engineering",
    description: "Building responsive, state-driven, and highly animated interfaces.",
    icon: Layers,
    color: "purple" as const,
    skills: [
      { name: "Next.js 15+", rating: "expert" },
      { name: "React 19", rating: "expert" },
      { name: "TypeScript", rating: "advanced" },
      { name: "Tailwind CSS v4", rating: "expert" },
      { name: "JavaScript", rating: "expert" },
      { name: "HTML5 & CSS3", rating: "expert" },
    ],
  },
  {
    title: "Backend & Systems",
    description: "Developing robust APIs and designing performant database schemas.",
    icon: Server,
    color: "cyan" as const,
    skills: [
      { name: "Node.js", rating: "advanced" },
      { name: "Express.js", rating: "advanced" },
      { name: "MongoDB", rating: "advanced" },
      { name: "REST APIs", rating: "expert" },
      { name: "Document DBs", rating: "intermediate" },
    ],
  },
  {
    title: "Artificial Intelligence",
    description: "Integrating LLMs, prompt chaining, and building cognitive workflows.",
    icon: BrainCircuit,
    color: "purple" as const,
    skills: [
      { name: "Python", rating: "advanced" },
      { name: "OpenAI API", rating: "expert" },
      { name: "Prompt Engineering", rating: "expert" },
      { name: "AI Integrations", rating: "advanced" },
      { name: "Claude Assistant", rating: "expert" },
    ],
  },
  {
    title: "Developer Workspaces",
    description: "Utilizing modern cloud platforms, terminal scripts, and source control.",
    icon: Wrench,
    color: "cyan" as const,
    skills: [
      { name: "Git & GitHub", rating: "expert" },
      { name: "AWS", rating: "intermediate" },
      { name: "VS Code", rating: "expert" },
      { name: "Postman", rating: "advanced" },
      { name: "Terminal CLI", rating: "advanced" },
    ],
  },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            02 . Core Stack
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Technical Capabilities
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  glowColor={category.color}
                  className="h-full border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] p-5 min-[360px]:p-6 md:p-8 flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`p-2.5 rounded-lg border ${
                          category.color === "purple"
                            ? "border-primary/20 bg-primary/5 text-primary"
                            : "border-secondary/20 bg-secondary/5 text-secondary"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-lg font-bold text-white">
                        {category.title}
                      </h4>
                    </div>

                    <p className="text-sm text-white/50 mb-8">
                      {category.description}
                    </p>
                  </div>

                  {/* Skills Cloud */}
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className="cursor-default"
                      >
                        <Badge
                          variant={category.color}
                          className="px-3.5 py-1.5 text-xs font-medium border border-white/5 bg-white/[0.02]"
                        >
                          {skill.name}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
