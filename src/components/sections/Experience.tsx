"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { experiences } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="relative py-32 px-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <SectionHeading
          eyebrow="Experience"
          title="Professional Experience"
          description="Production software engineering, healthcare systems, and practical IoT development."
        />

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.company + exp.period}
              initial={{ opacity: 0, y: 35 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="premium-card glass relative overflow-hidden rounded-2xl p-7 md:p-9 transition-all duration-300"
            >
              {/* Accent vertical line */}
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-accent-violet via-accent-cyan to-transparent" />

              {/* Header */}
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {exp.role}
                    </h3>
                    {exp.isOngoing && (
                      <Badge variant="accent" pulse className="text-[10px]">
                        Ongoing
                      </Badge>
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 font-semibold text-accent-violet">
                      <Building2 size={15} />
                      <span>{exp.company}</span>
                    </div>
                    {exp.legalName && (
                      <span className="text-xs text-[var(--secondary-text)]">
                        ({exp.legalName})
                      </span>
                    )}
                    {exp.mode && (
                      <div className="flex items-center gap-1 text-xs text-[var(--secondary-text)]">
                        <MapPin size={13} />
                        <span>{exp.mode}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[var(--secondary-text)] font-medium shrink-0">
                  <Calendar size={14} className="text-accent-cyan" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Technologies used */}
              {exp.technologies && exp.technologies.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-bg)] px-2.5 py-1 text-[11px] font-medium text-[var(--secondary-text)] transition-colors hover:text-accent-violet"
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
                    initial={{ opacity: 0, x: -15 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                    className="flex items-start gap-3 group"
                  >
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0 text-accent-cyan transition-transform duration-200 group-hover:scale-110"
                    />
                    <p className="text-sm leading-relaxed text-[var(--secondary-text)]">
                      {highlight}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
