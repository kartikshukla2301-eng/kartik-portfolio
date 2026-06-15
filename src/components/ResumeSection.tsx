"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Briefcase, GraduationCap, Target, CheckCircle2, ArrowUpRight } from "lucide-react";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Badge } from "./ui/Badge";

export const ResumeSection: React.FC = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    // Simulate a brief loading state for UX premium feel
    setTimeout(() => {
      setDownloading(false);
      const link = document.createElement("a");
      link.href = "/resume.pdf";
      link.download = "Kartik_Shukla_Resume.pdf";
      link.click();
    }, 1200);
  };

  return (
    <section id="resume" className="relative py-24 bg-dark-bg overflow-hidden print:bg-white print:text-black print:p-0">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent print:hidden" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Section Title */}
        <div className="flex flex-col mb-16 print:hidden">
          <h2 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            07 . Overview
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Recruiter Dashboard
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Visual Resume Preview Card */}
          <div className="lg:col-span-5 flex flex-col justify-between print:w-full print:block">
            <Card
              className="relative overflow-hidden border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-5 min-[360px]:p-6 md:p-8 flex flex-col justify-between h-full shadow-2xl print:border-none print:bg-white print:text-black print:shadow-none print:p-0"
              hoverable={false}
            >
              {/* Decorative print border header */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-secondary print:hidden" />
              
              <div>
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-xl font-bold text-white print:text-black">Kartik Shukla</h4>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mt-1">
                      AI Engineer & Full Stack Developer
                    </p>
                  </div>
                  <FileText className="w-6 h-6 text-white/30 print:text-black/40" />
                </div>

                {/* Info List */}
                <div className="space-y-4 text-sm mb-8">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-secondary shrink-0 mt-0.5 print:text-black/60" />
                    <div>
                      <span className="text-white/40 block text-xs print:text-black/60">Education</span>
                      <span className="text-white/80 font-medium print:text-black">B.Tech Computer Science & Engineering</span>
                      <span className="text-white/50 block text-xs print:text-black/60">Graduation Year: 2027</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary shrink-0 mt-0.5 print:text-black/60" />
                    <div>
                      <span className="text-white/40 block text-xs print:text-black/60">Career Objective</span>
                      <span className="text-white/80 font-medium print:text-black leading-relaxed">
                        Building high-performance AI integration layers and client interfaces that bridge neural networks with modular application systems.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-5 h-5 text-secondary shrink-0 mt-0.5 print:text-black/60" />
                    <div>
                      <span className="text-white/40 block text-xs print:text-black/60">Core Focus</span>
                      <span className="text-white/80 font-medium print:text-black">
                        AI Agentic Workflows & Scalable MERN Stack Apps
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills summary print view */}
              <div className="mt-auto">
                <span className="text-xs text-white/40 block mb-2 print:text-black/60">Key Stack</span>
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "React", "Node.js", "Python", "MongoDB", "OpenAI APIs", "AWS"].map((s) => (
                    <Badge key={s} variant="outline" className="text-[10px] py-0.5 px-2 border-white/10 text-white/70 print:border-black/20 print:text-black">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>

            </Card>
          </div>

          {/* Right Column: Interactive KPIs and Download */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 print:hidden">
            
            {/* Objective & Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="border border-white/5 bg-white/[0.01] p-4 min-[360px]:p-5" hoverable={false}>
                <span className="text-xs text-white/40 block mb-1">Status</span>
                <span className="text-base font-bold text-white block mb-2">B.Tech CSE Student</span>
                <span className="text-xs text-white/50">Completing academic degrees & shipping open source tools.</span>
              </Card>

              <Card className="border border-white/5 bg-white/[0.01] p-4 min-[360px]:p-5" hoverable={false}>
                <span className="text-xs text-white/40 block mb-1">Timeline Target</span>
                <span className="text-base font-bold text-white block mb-2">Graduation 2027</span>
                <span className="text-xs text-white/50">Industry-ready candidate looking for growth trajectories.</span>
              </Card>
            </div>

            {/* Quick Metrics Dashboard Bar */}
            <div className="glass-panel border-white/5 rounded-2xl p-4 sm:p-6 grid grid-cols-3 gap-2 sm:gap-4 text-center">
              <div>
                <span className="text-3xl font-extrabold text-primary font-mono block mb-1">3</span>
                <span className="text-[10px] min-[360px]:text-xs font-semibold text-white/60">Featured Projects</span>
              </div>
              <div className="border-l border-r border-white/5">
                <span className="text-3xl font-extrabold text-secondary font-mono block mb-1">4</span>
                <span className="text-[10px] min-[360px]:text-xs font-semibold text-white/60">Certifications</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white font-mono block mb-1">16+</span>
                <span className="text-[10px] min-[360px]:text-xs font-semibold text-white/60">Tech Badges</span>
              </div>
            </div>

            {/* Premium Download Actions */}
            <Card className="border border-white/5 bg-white/[0.01] p-4 min-[360px]:p-6 flex flex-col sm:flex-row items-center justify-between gap-6" hoverable={false}>
              <div className="text-center sm:text-left">
                <h4 className="text-base font-bold text-white mb-1">Ready for the full dossier?</h4>
                <p className="text-xs text-white/50">Download the standard 1-page PDF for your recruitment files.</p>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleDownload}
                disabled={downloading}
                className="w-full sm:w-auto gap-2"
              >
                {downloading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" /> Download Resume PDF
                  </>
                )}
              </Button>
            </Card>

          </div>

        </div>

      </div>
    </section>
  );
};
