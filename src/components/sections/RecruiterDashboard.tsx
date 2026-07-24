"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  Download,
  User,
  BookOpen,
  Target,
  Layers,
  Trophy,
  Briefcase,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/lib/data";

const quickStats = [
  { label: "Featured Projects", value: "3" },
  { label: "Certifications", value: "4" },
  { label: "Tech Badges", value: "16+" },
];

const stackChips = [
  "Next.js",
  "React",
  "Node.js",
  "Python",
  "MongoDB",
  "OpenAI APIs",
  "AWS",
];

export function RecruiterDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <SectionHeading
          eyebrow="For Recruiters"
          title="Quick Dossier"
          description="Everything you need at a glance."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="premium-card glass relative overflow-hidden rounded-2xl"
        >
          {/* Gradient border accent */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-violet/10 via-transparent to-accent-cyan/10 opacity-50" />

          <div className="relative z-10 p-8 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Left column */}
              <div className="space-y-6">
                {/* Portrait + Name */}
                <div className="flex items-start gap-4">
                  <div className="portrait-frame group relative shrink-0">
                    <div className="relative h-20 w-20 overflow-hidden rounded-xl">
                      <Image
                        src={siteConfig.portrait.src}
                        alt={siteConfig.portrait.alt}
                        width={160}
                        height={200}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                        className="h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(124,92,255,0.15)]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                      {siteConfig.name}
                    </h3>
                    <p className="text-sm text-white/40">AI Engineer & Full Stack Developer</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen size={16} className="mt-1 shrink-0 text-accent-cyan" />
                  <div>
                    <p className="text-sm font-medium text-white/70">Education</p>
                    <p className="text-sm text-white/40">B.Tech CSE, AKTU — Graduating 2027</p>
                    <p className="text-xs text-white/30">CGPA: 7.68</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-1 shrink-0 text-accent-amber" />
                  <div>
                    <p className="text-sm font-medium text-white/70">Career Objective</p>
                    <p className="text-sm leading-relaxed text-white/40">
                      Building high-performance AI integration layers and client interfaces bridging neural networks with modular application systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase size={16} className="mt-1 shrink-0 text-accent-violet" />
                  <div>
                    <p className="text-sm font-medium text-white/70">Core Focus</p>
                    <p className="text-sm text-white/40">AI Agentic Workflows & Scalable MERN Stack Apps</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Layers size={16} className="mt-1 shrink-0 text-accent-cyan" />
                  <div>
                    <p className="text-sm font-medium text-white/70">Key Stack</p>
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
                  <Trophy size={16} className="mt-1 shrink-0 text-accent-amber" />
                  <div>
                    <p className="text-sm font-medium text-white/70">Leadership</p>
                    <p className="text-sm text-white/40">
                      Social Media Head, IEEE Student Branch — led digital outreach and cross-functional promotion of technical events. Active IEEE Student Member.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col items-center justify-center gap-6">
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 w-full">
                  {quickStats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="glass rounded-xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                      <div className="text-[10px] text-white/40 mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Download resume */}
                <MagneticButton href={siteConfig.resumeUrl} variant="primary" className="w-full justify-center">
                  <Download size={16} />
                  Download Resume PDF
                </MagneticButton>

                {/* Social links */}
                <div className="flex gap-3 w-full">
                  {[
                    { label: "GitHub", href: siteConfig.github },
                    { label: "LinkedIn", href: siteConfig.linkedin },
                    { label: "Email", href: `mailto:${siteConfig.email}` },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass flex-1 rounded-lg py-2 text-center text-xs text-white/50 transition-all duration-300 hover:border-accent-violet/20 hover:text-accent-violet"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
