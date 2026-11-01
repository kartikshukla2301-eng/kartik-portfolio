"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  FileText,
  BookOpen,
  Target,
  Layers,
  Trophy,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { siteConfig, experiences, projects, certifications, recruiterStats } from "@/lib/data";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const parsedResume = parseGoogleDriveUrl(siteConfig.resumeUrl);

  const quickStats = [
    { label: "Production Internships", value: `${experiences.length}` },
    { label: "Featured Projects", value: `${projects.filter((p) => p.featured).length}` },
    { label: "Verified Credentials", value: `${certifications.length}` },
    { label: "DSA Problems Solved", value: recruiterStats.dsaSolved },
  ];

  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <SectionHeading
          eyebrow="For Recruiters"
          title="Quick Dossier"
          description="Key academic, internship, and technical qualifications summarized for hiring teams."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="premium-card glass relative overflow-hidden rounded-2xl border border-[var(--borders)] shadow-sm bg-white"
        >
          {/* Subtle gradient accent */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-violet/[0.04] via-transparent to-accent-cyan/[0.04]" />

          <div className="relative z-10 p-7 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                {/* Portrait + Name */}
                <div className="flex items-start gap-4">
                  <div className="portrait-frame group relative shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-[var(--borders)] shadow-sm">
                      <Image
                        src={siteConfig.portrait.src}
                        alt={siteConfig.portrait.alt}
                        width={160}
                        height={200}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                        className="h-full w-full object-cover object-top"
                      />
                    </div>
                  </div>
                  <div>
                    <h3
                      className="text-xl font-bold text-[var(--foreground)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {siteConfig.name}
                    </h3>
                    <p className="text-xs font-semibold text-accent-violet">
                      {siteConfig.primaryTitle} | {siteConfig.secondaryTitle}
                    </p>
                    <p className="mt-1 text-xs text-[var(--secondary-text)]">
                      {siteConfig.education.college}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="mt-1 shrink-0 text-accent-cyan" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Education</p>
                    <p className="text-xs text-[var(--secondary-text)]">
                      {siteConfig.education.degree} — {siteConfig.education.university}
                    </p>
                    <p className="text-xs font-medium text-accent-violet mt-0.5">
                      CGPA: {siteConfig.education.cgpa} • Graduating {siteConfig.education.expectedGraduation} (Expected)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="mt-1 shrink-0 text-accent-violet" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Verified Internships</p>
                    <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                      Pristyn Care (HIS Full Stack), OnCare Cancer Centre (Developer Intern), Infosys Makers Lab (IoT), The Developers Arena (Python).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-1 shrink-0 text-accent-amber" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Career Positioning</p>
                    <p className="text-xs leading-relaxed text-[var(--secondary-text)]">
                      Open to Full Stack Developer, Web Developer, and Software Development Engineer roles. Focused on building reliable web applications, clean REST APIs, and production AI integrations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers size={16} className="mt-1 shrink-0 text-accent-cyan" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Core Stack</p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {stackChips.map((chip) => (
                        <Badge key={chip} variant="outline" className="text-[10px]">
                          {chip}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Trophy size={16} className="mt-1 shrink-0 text-amber-500" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--foreground)]">Leadership & Extracurricular</p>
                    <p className="text-xs text-[var(--secondary-text)] leading-relaxed">
                      {recruiterStats.leadership} — led digital outreach and event branding. Active participant in coding communities.
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
                      className="glass rounded-xl p-4 text-center border border-[var(--borders)] bg-[#F8FAFC]"
                    >
                      <div className="text-xl sm:text-2xl font-bold text-accent-violet">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-[var(--secondary-text)] mt-1 font-medium">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Resume Action */}
                <div className="p-5 rounded-xl border border-[var(--borders)] bg-[var(--secondary-bg)] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent-violet">
                    <CheckCircle size={14} className="text-emerald-500" />
                    Verified Resume Available
                  </div>
                  <p className="text-xs text-[var(--secondary-text)]">
                    Access Kartik&apos;s latest resume with complete details of healthcare systems and AI platforms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href="#certifications"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-accent-violet px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-accent-violet/90 transition-all text-center"
                    >
                      <FileText size={14} />
                      View in Document Library
                    </a>
                    {parsedResume.isValid && parsedResume.downloadUrl && (
                      <a
                        href={parsedResume.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--borders)] bg-white px-4 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[#F8FAFC] transition-all"
                      >
                        PDF
                      </a>
                    )}
                  </div>
                </div>

                {/* Professional Links */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--secondary-text)] mb-2.5">
                    Profiles & Contact
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      { label: "GitHub", href: siteConfig.github },
                      { label: "LinkedIn", href: siteConfig.linkedin },
                      { label: "LeetCode", href: siteConfig.leetcode },
                      { label: "GeeksforGeeks", href: siteConfig.geeksforgeeks },
                      { label: "Email", href: `mailto:${siteConfig.email}` },
                      { label: "Instagram", href: siteConfig.instagram },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass rounded-lg py-2 px-3 text-center text-xs font-medium text-[var(--secondary-text)] transition-all hover:border-accent-violet/40 hover:text-accent-violet hover:bg-white shadow-2xs"
                      >
                        {link.label}
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
