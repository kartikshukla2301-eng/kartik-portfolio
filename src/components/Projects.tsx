"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";
import Image from "next/image";

const PROJECTS_DATA = [
  {
    title: "AI Study Assistant",
    description:
      "An AI-powered learning platform that helps students generate comprehensive notes, study summaries, interactive quizzes, and personalized study paths.",
    image: "/images/study-project.png",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    github: "https://github.com/kartikshukla2301-eng/ai-study-assistant",
    live: "https://ai-study-assistant-eight-psi.vercel.app",
    color: "purple" as const,
  },
  {
    title: "HaiDrama Task Manager",
    description:
      "A modern, secure team productivity and task management application featuring dashboard metrics, authentication gateways, and real-time task pipelines.",
    image: "/images/project-task.png",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/kartikshukla2301-eng/Hairdrama-Task-Manager",
    live: "https://hairdrama-task-manager-coral.vercel.app",
    color: "cyan" as const,
  },
  {
    title: "Ultra AI Chatbot",
    description:
      "A conversational AI assistant utilizing state-of-the-art chat configurations. Features contextual memory, system prompt customizers, and low latency streaming.",
    image: "/images/project-chatbot.png",
    tech: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    github: "https://github.com/kartikshukla2301-eng/UltraAi-Chatbot",
    live: null, // No live URL specified in prompt
    color: "purple" as const,
  },
];

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
            03 . Selected Work
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Featured Projects
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, index) => {
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex"
              >
                <Card
                  glowColor={project.color}
                  className="flex flex-col justify-between h-full w-full overflow-hidden border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all p-0 group"
                  hoverable={false} // Custom hover container in card itself
                >
                  {/* Card Content wrapper since padding was reset */}
                  <div>
                    {/* Project Image Container */}
                    <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-white/5">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview screenshot`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Meta Container */}
                    <div className="p-4 min-[360px]:p-6 pb-4">
                      {/* Badge and Title */}
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-200">
                        {project.title}
                      </h4>
                      <p className="text-sm text-white/50 leading-relaxed mb-6">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges & Actions */}
                  <div className="p-4 min-[360px]:p-6 pt-0 mt-auto flex flex-col gap-4 min-[360px]:gap-5">
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="outline"
                          className="text-[10px] py-0.5 px-2 border-white/5 bg-white/[0.01]"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full gap-1.5 min-[360px]:gap-2 text-[10px] min-[360px]:text-xs px-2 min-[360px]:px-4 py-2 bg-white/5 hover:bg-white/10"
                        >
                          <GithubIcon className="w-4 h-4" /> Code
                        </Button>
                      </a>
                      
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button
                            variant={project.color === "purple" ? "primary" : "secondary"}
                            size="sm"
                            className="w-full gap-1.5 min-[360px]:gap-2 text-[10px] min-[360px]:text-xs px-2 min-[360px]:px-4 py-2"
                          >
                            <ExternalLink className="w-4 h-4" /> Live Demo
                          </Button>
                        </a>
                      )}
                    </div>
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
