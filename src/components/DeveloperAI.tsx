"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Brain, ShieldAlert, Cpu, Sparkles, Code, Check } from "lucide-react";
import { Card } from "./ui/Card";
import { Badge } from "./ui/Badge";

const ROADMAP_STEPS = [
  { phase: "Phase 1", title: "Model Fine-Tuning", date: "Q2 2026", status: "completed" },
  { phase: "Phase 2", title: "Shell Agent & CLI", date: "Q3 2026", status: "active" },
  { phase: "Phase 3", title: "Private Alpha Invite", date: "Q4 2026", status: "upcoming" },
  { phase: "Phase 4", title: "Production Deploy", date: "Q1 2027", status: "upcoming" },
];

const MOCK_CONSOLE_LINES = [
  "npm install -g @developer-ai/cli",
  "developer-ai init --key=kshukla_sec_9912",
  "🤖 [system] Loading neural network weight models...",
  "⚙️ [agent] Listening to filesystem events in real-time...",
  "✓ [debugger] Auto-patch system modules configured.",
  "✨ [agent] Autonomous assistant ready. Type /help to begin.",
];

export const DeveloperAI: React.FC = () => {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [currentLineIdx, setCurrentLineIdx] = useState(0);

  // Animate the console lines typing out in a loop
  useEffect(() => {
    if (currentLineIdx < MOCK_CONSOLE_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, MOCK_CONSOLE_LINES[currentLineIdx]]);
        setCurrentLineIdx((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      // Loop resetting after 8 seconds
      const timer = setTimeout(() => {
        setVisibleLines([]);
        setCurrentLineIdx(0);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [currentLineIdx]);

  return (
    <section id="developer-ai" className="relative py-24 bg-dark-bg overflow-hidden">
      {/* Glow rings */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col items-start mb-16">
          <Badge variant="active" className="mb-3">Active Development</Badge>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white flex items-center gap-2">
            Currently Building: <span className="text-gradient-purple-cyan font-mono">Developer AI</span>
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Product Info & Progress */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-lg text-white/90 font-medium leading-relaxed mb-4">
                An AI-powered terminal-first agent designed to streamline developer workflows, automate documentation, and patch code defects autonomously.
              </p>
              <p className="text-sm text-white/50 leading-relaxed mb-8">
                Developer AI sits directly in your CLI workspace, matching errors with contextual solutions and writing type-safe documentations on git commits.
              </p>

              {/* Progress bar */}
              <div className="glass-panel border-white/5 p-5 rounded-2xl mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">
                    Core Engine Compilation
                  </span>
                  <span className="text-sm font-bold text-primary font-mono">68%</span>
                </div>
                {/* Loader bar */}
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "68%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </div>
            </div>

            {/* Modules Grid list */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 text-primary mt-0.5">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">CLI Companion</h5>
                  <p className="text-[10px] text-white/40 mt-0.5">Shell operations</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">AI Debugger</h5>
                  <p className="text-[10px] text-white/40 mt-0.5">Automatic patcher</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulated Terminal CLI Shell */}
          <div className="lg:col-span-7">
            <div className="w-full h-full min-h-[300px] flex flex-col rounded-2xl border border-white/10 bg-[#070709] overflow-hidden shadow-2xl shadow-black/80 font-mono text-xs min-[360px]:text-sm text-left">
              {/* Terminal header bar */}
              <div className="w-full bg-[#111114] px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
                </div>
                <span className="text-xs text-white/40 font-semibold select-none">developer-ai@kartikshukla: ~</span>
                <span className="w-12" />
              </div>

              {/* Console logs */}
              <div className="p-6 flex-1 flex flex-col gap-2.5 overflow-y-auto select-none bg-black/40">
                {visibleLines.map((line, idx) => (
                  <div
                    key={idx}
                    className={`leading-relaxed ${
                      line.startsWith("🤖")
                        ? "text-purple-300"
                        : line.startsWith("✓") || line.startsWith("✨")
                        ? "text-cyan-300"
                        : line.startsWith("npm") || line.startsWith("developer-ai")
                        ? "text-white/80"
                        : "text-white/60"
                    }`}
                  >
                    {line.startsWith("npm") || line.startsWith("developer-ai") ? (
                      <span className="text-primary mr-2 select-none">$</span>
                    ) : null}
                    {line}
                  </div>
                ))}

                {/* Bouncing cursor */}
                <div className="flex items-center gap-1">
                  <span className="text-primary select-none">$</span>
                  <span className="w-2.5 h-4 bg-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Roadmap tracker */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/5">
          {ROADMAP_STEPS.map((step) => (
            <Card
              key={step.phase}
              className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-5 flex flex-col justify-between"
              hoverable={false}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    {step.phase}
                  </span>
                  
                  {step.status === "completed" ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Check className="w-3 h-3" />
                    </div>
                  ) : step.status === "active" ? (
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                  )}
                </div>

                <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
              </div>

              <span className="text-[10px] font-semibold font-mono text-white/50 block mt-4">
                {step.date}
              </span>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
