"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  BookOpen,
  Target,
  Layers,
  Trophy,
  Briefcase,
  CheckCircle,
  Download,
  ArrowUpRight,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { useContent } from "@/components/providers/ContentProvider";
import { parseGoogleDriveUrl } from "@/lib/drive";

const stackChips = [
  "Next.js",
  "React 19",
  "Node.js",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "AWS",
];

export function RecruiterDashboard() {
  const { profile, experiences, projects, certifications } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const parsedResume = parseGoogleDriveUrl(profile.resumeUrl);

  const quickStats = [
    { label: "Production Internships", value: `${experiences.length}` },
    { label: "Featured Projects", value: `${projects.length}` },
    { label: "Verified Credentials", value: `${certifications.length}` },
    { label: "DSA Problems Solved", value: profile.dsaSolved },
  ];

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <SectionHeading
          eyebrow="Hiring Telemetry"
          title="Candidate Dossier & Fast Track"
          description="High-density engineering snapshot: verified internships, core systems stack, and direct resume access for talent acquisition teams."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="court-card relative overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.14)] bg-[#12100D]/95 backdrop-blur-md shadow-2xl"
        >
          {/* Subtle court floor glow */}
          <div className="absolute top-0 right-0 h-48 w-48 bg-[#C96F4A]/10 blur-3xl pointer-events-none" />

          {/* Monospace top bar */}
          <div className="flex items-center justify-between border-b border-[rgba(255,250,240,0.08)] bg-[#0B0A08]/70 px-6 py-3 font-mono text-[11px] text-[rgba(255,250,240,0.5)]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
              <span className="tracking-widest uppercase text-[#FFD6A1]">
                SPEC: KARTIK-SHUKLA // ATS-OPTIMIZED
              </span>
            </div>
            <span className="hidden sm:inline tracking-wider">
              STATUS: READY FOR INTERVIEW
            </span>
          </div>

          <div className="relative z-10 p-7 sm:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                {/* Portrait + Name */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-[rgba(255,250,240,0.16)] bg-[#161310] shadow-sm">
                      <Image
                        src={profile.portrait.thumb}
                        alt={profile.portrait.alt}
                        width={160}
                        height={200}
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[#F6F0E2]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {profile.name}
                    </h3>
                    <p className="font-mono text-xs font-semibold text-[#FFD6A1]">
                      {profile.primaryTitle} | {profile.secondaryTitle}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[rgba(255,250,240,0.5)]">
                      {profile.education.college}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="mt-1 shrink-0 text-[#C96F4A]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F6F0E2]">Education</p>
                    <p className="text-xs text-[rgba(255,250,240,0.6)]">
                      {profile.education.degree} — {profile.education.university}
                    </p>
                    <p className="font-mono text-xs text-[#FFD6A1] mt-0.5">
                      CGPA: {profile.education.cgpa} • Graduating {profile.education.expectedGraduation} (Expected)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="mt-1 shrink-0 text-[#C96F4A]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F6F0E2]">Verified Internships</p>
                    <p className="text-xs text-[rgba(255,250,240,0.6)] leading-relaxed">
                      {experiences.map((e) => `${e.company} (${e.role})`).join(", ")}.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-1 shrink-0 text-[#FFD6A1]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F6F0E2]">Career Positioning</p>
                    <p className="text-xs leading-relaxed text-[rgba(255,250,240,0.6)] font-sans">
                      Targeting Full Stack Developer, Software Engineer, and AI Applications roles. Strong foundations in distributed services, scalable REST APIs, and production LLM orchestration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers size={16} className="mt-1 shrink-0 text-[#C96F4A]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F6F0E2]">Core Production Stack</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {stackChips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded border border-[rgba(255,250,240,0.1)] bg-[#161310] px-2 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.7)]"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy size={16} className="mt-1 shrink-0 text-[#FFD6A1]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F6F0E2]">Leadership & Community</p>
                    <p className="text-xs text-[rgba(255,250,240,0.6)] leading-relaxed font-sans">
                      {profile.leadership}. Active open-source contributor and technical mentor.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col justify-between gap-6">
                {/* Quick stats grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  {quickStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 15 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                      className="rounded-xl border border-[rgba(255,250,240,0.1)] bg-[#161310] p-4 text-center transition-colors hover:border-[#C96F4A]/40"
                    >
                      <div className="text-2xl font-bold font-mono text-[#FFD6A1]">
                        {stat.value}
                      </div>
                      <div className="font-mono text-[11px] text-[rgba(255,250,240,0.5)] mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Resume Action */}
                <div className="p-6 rounded-xl border border-[rgba(255,250,240,0.12)] bg-[#161310]/80 space-y-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#C96F4A]">
                    <CheckCircle size={14} className="text-[#FFD6A1]" />
                    <span>VERIFIED RESUME // READY FOR REVIEW</span>
                  </div>
                  <p className="text-xs text-[rgba(255,250,240,0.6)] font-sans">
                    Access Kartik&apos;s latest PDF curriculum vitae with verified healthcare engineering metrics and production architecture summaries.
                  </p>
                  <div className="flex flex-wrap gap-2.5 pt-1">
                    <InfinityButton
                      href={parsedResume.isValid && parsedResume.viewUrl ? parsedResume.viewUrl : "#certifications"}
                      target={parsedResume.isValid && parsedResume.viewUrl ? "_blank" : undefined}
                      variant="terra"
                      withArrow
                      className="flex-1 justify-center"
                    >
                      OPEN RESUME (PDF)
                    </InfinityButton>
                    {parsedResume.isValid && parsedResume.downloadUrl && (
                      <InfinityButton
                        href={parsedResume.downloadUrl}
                        variant="ghost"
                        withArrow={false}
                        target="_blank"
                      >
                        <span className="flex items-center gap-1.5">
                          <Download size={14} />
                          <span>DOWNLOAD</span>
                        </span>
                      </InfinityButton>
                    )}
                  </div>
                </div>

                {/* Professional Links */}
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#C96F4A] mb-2.5">
                    EXTERNAL PROFILES & VERIFICATION
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: "GitHub", href: profile.github },
                      { label: "LinkedIn", href: profile.linkedin },
                      { label: "LeetCode", href: profile.leetcode },
                      { label: "GeeksforGeeks", href: profile.geeksforgeeks },
                      { label: "Email Direct", href: `mailto:${profile.email}` },
                      { label: "Instagram", href: profile.instagram },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between rounded-lg border border-[rgba(255,250,240,0.1)] bg-[#161310] py-2 px-3 font-mono text-xs text-[rgba(255,250,240,0.7)] transition-all hover:border-[#C96F4A] hover:text-[#FFD6A1]"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={11} className="text-[#C96F4A]" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}