"use client";

import { useEffect, useRef } from "react";
import { Building2, Calendar, CheckCircle2, MapPin } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { experiences } from "@/lib/data";

const quarterDomains = [
  "HEALTHCARE INFORMATION SYSTEMS",
  "CLINICAL ONCOLOGY WORKFLOWS",
  "IOT & TELEMETRY PROTOCOLS",
  "DISTRIBUTED WEB AUTOMATION",
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const panels = containerRef.current?.querySelectorAll(".qq__panel");
    if (!panels) return;

    panels.forEach((panel) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          panel.classList.add("is-in", "is-live");
        },
        onLeaveBack: () => {
          panel.classList.remove("is-live");
        },
      });
    });

    const container = containerRef.current;
    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (container && container.contains(t.trigger as Node)) {
          t.kill();
        }
      });
    };
  }, []);

  return (
    <section id="experience" ref={containerRef} className="qq relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full">
        <div className="mb-14">
          <SectionHeading
            eyebrow="The Four Quarters"
            title="Professional Residencies & Production Engineering"
            description="Four chronological stages of intensive engineering delivered across venture-backed healthcare platforms, clinical treatment pipelines, enterprise IoT labs, and production full-stack systems."
          />

          <div className="mt-4">
            <ColorFillText
              as="h2"
              dataFill="dim"
              scrub
              className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F6F0E2]"
            >
              ONE DEVELOPER. FOUR QUARTERS OF HIGH-IMPACT EXECUTION.
            </ColorFillText>
          </div>
        </div>

        {/* The Four Quarters: Balanced 2x2 Grid occupying available desktop width */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {experiences.map((exp, idx) => {
            const quarterIndex = `0${idx + 1} / 04`;
            const domain = quarterDomains[idx] || "ENGINEERING SYSTEMS";

            return (
              <article
                key={exp.company + exp.period}
                className="qq__panel relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.12)] bg-[#0C0A08] p-6 sm:p-8 transition-all duration-500 hover:border-[#C96F4A]/60 hover:shadow-[0_16px_45px_rgba(0,0,0,0.85),0_0_30px_rgba(201,111,74,0.16)]"
              >
                {/* Panel Gradient Shade */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#13100D] via-[#0C0A08] to-[#15120F] opacity-95 pointer-events-none" />

                {/* Left Burnt Terracotta Accent Strip */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#C96F4A] via-[#FFD6A1] to-transparent" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Infinity Socks HUD Row */}
                    <div className="qq__hudrow flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] pb-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-[rgba(255,250,240,0.5)]">
                      <span className="flex items-center gap-2 truncate pr-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] shrink-0" />
                        <b className="text-[#C96F4A] uppercase truncate">{`[0${idx + 1} // ${domain}]`}</b>
                      </span>
                      <span className="text-[#FFD6A1] font-bold shrink-0">{quarterIndex}</span>
                    </div>

                    {/* Role & Company Headline */}
                    <div className="my-5">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3
                          className="qq__name text-xl sm:text-2xl font-bold tracking-tight text-[#F6F0E2]"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {exp.role}
                        </h3>
                        {exp.isOngoing && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C96F4A]/15 border border-[#C96F4A]/40 px-2.5 py-0.5 font-mono text-[10px] tracking-widest text-[#FFD6A1]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
                            ACTIVE
                          </span>
                        )}
                      </div>

                      {/* Company & Legal Info */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
                        <div className="flex items-center gap-1.5 font-semibold text-[#FFD6A1]">
                          <Building2 size={14} className="text-[#C96F4A] shrink-0" />
                          <span>{exp.company}</span>
                        </div>
                        {exp.legalName && (
                          <span className="font-mono text-xs text-[rgba(255,250,240,0.45)]">
                            [{exp.legalName}]
                          </span>
                        )}
                      </div>

                      {/* Period & Mode Meta Row */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-xs text-[rgba(255,250,240,0.55)]">
                        <div className="flex items-center gap-1 bg-[#14110E] px-2.5 py-0.5 rounded border border-[rgba(255,250,240,0.08)]">
                          <Calendar size={11} className="text-[#C96F4A]" />
                          <span>{exp.period}</span>
                        </div>
                        {exp.mode && (
                          <div className="flex items-center gap-1 bg-[#14110E] px-2.5 py-0.5 rounded border border-[rgba(255,250,240,0.08)]">
                            <MapPin size={11} className="text-[#C96F4A]" />
                            <span>{exp.mode}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Technologies Chips */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-[rgba(255,250,240,0.09)] bg-[#14110E] px-2.5 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.7)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights Claim */}
                  <div className="qq__claim space-y-2.5 pt-4 border-t border-[rgba(255,250,240,0.08)]">
                    {exp.highlights.slice(0, 4).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={13}
                          className="mt-1 shrink-0 text-[#C96F4A]"
                        />
                        <p className="text-xs sm:text-[13px] leading-relaxed text-[rgba(255,250,240,0.75)] font-sans">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
