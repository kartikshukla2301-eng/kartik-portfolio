"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, Calendar, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";

export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-32 px-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <SectionHeading
          eyebrow="Experience"
          title="Internship"
          description="Hands-on industry experience building real-world IoT solutions."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="premium-card glass relative overflow-hidden rounded-2xl p-8 md:p-10"
        >
          {/* Accent line */}
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-accent-violet via-accent-cyan to-transparent" />

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3
                className="text-xl font-bold text-white sm:text-2xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {experience.role}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-accent-violet">
                <Building2 size={14} />
                <span className="text-sm font-medium">{experience.company}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Calendar size={14} />
              <span>{experience.period}</span>
              <span className="rounded-full bg-accent-cyan/10 px-2 py-0.5 text-xs text-accent-cyan">
                {experience.duration}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {experience.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                className="flex items-start gap-3 group"
              >
                <CheckCircle2
                  size={16}
                  className="mt-0.5 shrink-0 text-accent-cyan transition-all duration-300 group-hover:text-accent-violet group-hover:drop-shadow-[0_0_6px_rgba(124,92,255,0.4)]"
                />
                <p className="text-sm leading-relaxed text-white/60">
                  {highlight}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
