"use client";

import React from "react";
import { motion as m } from "framer-motion";
import { Calendar, School, Code, Layers, BrainCircuit, Rocket } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

const TIMELINE_DATA = [
  {
    year: "2023",
    title: "Started B.Tech CSE",
    description:
      "Entered B.Tech in Computer Science & Engineering. Formed a strong foundation in computational thinking, logic design, algorithms, and database structures.",
    icon: School,
    color: "purple" as const,
    highlights: ["Data Structures", "Algorithms", "C/C++ Programming"],
  },
  {
    year: "2024",
    title: "Explored Web Development",
    description:
      "Dived into client-side engineering. Mastered JavaScript, responsive layouts, modular CSS architectures, and React.js state management paradigms.",
    icon: Code,
    color: "cyan" as const,
    highlights: ["React.js", "Tailwind CSS", "UI/UX Design Systems"],
  },
  {
    year: "2025",
    title: "Built Full Stack Applications",
    description:
      "Architected complete end-to-end database-backed projects. Integrated user authentication gateways, REST services, document structures, and next-gen frameworks.",
    icon: Layers,
    color: "purple" as const,
    highlights: ["Next.js App Router", "Express & Node.js", "MongoDB Atlas"],
  },
  {
    year: "2026",
    title: "AI Engineering & Internship Journey",
    description:
      "Shifted focus to cognitive computing. Integrating large language models, setting up agentic workflows, prompt-chaining environments, and shipping custom tools.",
    icon: BrainCircuit,
    color: "cyan" as const,
    highlights: ["OpenAI API", "Agentic Pipelines", "Developer AI"],
  },
  {
    year: "2027",
    title: "Graduate & Industry Ready",
    description:
      "Finalizing research studies, shipping developer tools, and looking to join an elite tech team as a high-impact AI Engineer & Full Stack Architect.",
    icon: Rocket,
    color: "purple" as const,
    highlights: ["Enterprise Scalability", "System Design", "Product Engineering"],
  },
];

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 min-[360px]:px-6 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
            05 . Progression
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Development Timeline
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Timeline Core */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary-dark -translate-x-1/2 opacity-20 pointer-events-none" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.year}
                  className="flex flex-col md:flex-row items-stretch w-full relative"
                >
                  {/* Left Side (Desktop: displays on left for even, right for odd) */}
                  <div className="w-full md:w-1/2 flex items-center md:justify-end md:pr-12 pl-8 min-[360px]:pl-10 md:pl-0 order-2 md:order-1">
                    {!isEven && (
                      <m.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                      >
                        <Card
                          glowColor={item.color}
                          className="border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03]"
                          hoverable={true}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant={item.color}>{item.year}</Badge>
                            <h4 className="text-base font-bold text-white">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.highlights.map((h) => (
                              <Badge key={h} className="text-[10px]">
                                {h}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      </m.div>
                    )}
                  </div>

                  {/* Node (Center) */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 order-1 md:order-2">
                    <m.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center border-2 bg-dark-bg ${
                        item.color === "purple"
                          ? "border-primary text-primary shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                          : "border-secondary text-secondary shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </m.div>
                  </div>

                  {/* Right Side */}
                  <div className="w-full md:w-1/2 flex items-center md:pl-12 pl-8 min-[360px]:pl-10 order-3">
                    {isEven && (
                      <m.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                      >
                        <Card
                          glowColor={item.color}
                          className="border border-white/5 bg-white/[0.01] p-6 hover:bg-white/[0.03]"
                          hoverable={true}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant={item.color}>{item.year}</Badge>
                            <h4 className="text-base font-bold text-white">
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-sm text-white/50 leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.highlights.map((h) => (
                              <Badge key={h} className="text-[10px]">
                                {h}
                              </Badge>
                            ))}
                          </div>
                        </Card>
                      </m.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
