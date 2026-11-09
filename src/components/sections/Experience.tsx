"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experiences } from "@/lib/data";

const quarterLabels = [
  "STAGE 01 // ACTIVE RESIDENCY",
  "STAGE 02 // CLINICAL HEALTHCARE",
  "STAGE 03 // IOT & MAKER LAB",
  "STAGE 04 // FULL-STACK FOUNDATION",
];

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-32 px-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <SectionHeading
          eyebrow="Career Timeline"
          title="Professional Residencies & Engineering Roles"
          description="High-impact engineering delivered across venture-backed healthcare platforms, clinical treatment pipelines, enterprise R&D maker labs, and production full-stack systems."
        />

        <div className="space-y-8">
          {experiences.map((exp, idx) => {
            const quarterTag = quarterLabels[idx] || `STAGE 0${idx + 1} // ARCHITECTURE`;
            return (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, y: 35 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="court-card group relative overflow-hidden rounded-2xl p-7 sm:p-10 border border-[rgba(255,250,240,0.14)] bg-[#12100D]/90 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/40"
              >
                {/* Infinity Socks left copper accent strip */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#C96F4A] via-[#FFD6A1] to-transparent" />

                {/* Quarter Header Stamp */}
                <div className="mb-4 flex items-center justify-between border-b border-[rgba(255,250,240,0.08)] pb-3 font-mono text-[11px] tracking-widest text-[#C96F4A]">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
                    {quarterTag}
                  </span>
                  <span className="text-[rgba(255,250,240,0.4)]">
                    TENURE // {idx + 1} OF {experiences.length}
                  </span>
                </div>

                {/* Role and Meta */}
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3
                        className="text-xl sm:text-2xl font-bold tracking-tight text-[#F6F0E2]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {exp.role}
                      </h3>
                      {exp.isOngoing && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C96F4A]/15 border border-[#C96F4A]/40 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-[#FFD6A1]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 font-semibold text-[#FFD6A1]">
                        <Building2 size={15} className="text-[#C96F4A]" />
                        <span>{exp.company}</span>
                      </div>
                      {exp.legalName && (
                        <span className="font-mono text-xs text-[rgba(255,250,240,0.45)]">
                          [{exp.legalName}]
                        </span>
                      )}
                      {exp.mode && (
                        <div className="flex items-center gap-1 font-mono text-xs text-[rgba(255,250,240,0.55)]">
                          <MapPin size={13} className="text-[#C96F4A]" />
                          <span>{exp.mode}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs font-medium text-[rgba(255,250,240,0.6)] shrink-0 bg-[#161310] border border-[rgba(255,250,240,0.1)] px-3 py-1.5 rounded-lg">
                    <Calendar size={13} className="text-[#C96F4A]" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Technologies used */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[rgba(255,250,240,0.1)] bg-[#161310]/80 px-2.5 py-1 font-mono text-[11px] text-[rgba(255,250,240,0.7)] transition-colors group-hover:border-[#C96F4A]/30 hover:text-[#FFD6A1]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Highlights */}
                <div className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-1 shrink-0 text-[#C96F4A] transition-transform duration-200 group-hover/item:scale-125"
                      />
                      <p className="text-sm leading-relaxed text-[rgba(255,250,240,0.72)] font-sans">
                        {highlight}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
