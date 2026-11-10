"use client";

import { useEffect, useRef } from "react";
import { Calendar, CheckCircle2, MapPin, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { experiences } from "@/lib/data";

const quarterDomains = [
  "HEALTHCARE INFORMATION SYSTEMS",
  "CLINICAL ONCOLOGY WORKFLOWS",
  "IOT & TELEMETRY PROTOCOLS",
  "DISTRIBUTED WEB AUTOMATION",
];

const quarterDisplayTitles = [
  "PRISTYN CARE",
  "ONCARE CANCER",
  "INFOSYS MAKERS LAB",
  "DEVELOPERS ARENA",
];

function PristynCareVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      {/* Background Court Grid & Radial Spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.22)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Futuristic Hospital Information System (HIS) UI Graphic */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#C96F4A] select-none"
      >
        {/* Central Core HIS Hub */}
        <rect x="150" y="30" width="160" height="60" rx="8" fill="#14110E" stroke="#C96F4A" strokeWidth="1.5" />
        <text x="230" y="55" textAnchor="middle" fill="#FFD6A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
          PRISTYN_HIS_CORE
        </text>
        <text x="230" y="73" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="9" fontFamily="monospace">
          AUTH GATEWAY • LEVEL 4
        </text>

        {/* Left Sub-node: All Hospitals Reporting */}
        <rect x="25" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="87" y="152" textAnchor="middle" fill="#F6F0E2" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          ALL_HOSPITALS_DB
        </text>
        <text x="87" y="169" textAnchor="middle" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          60-DAY RANGE LOCK
        </text>

        {/* Middle Sub-node: Expense Management */}
        <rect x="168" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="230" y="152" textAnchor="middle" fill="#FFD6A1" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          EXPENSE_AUDIT
        </text>
        <text x="230" y="169" textAnchor="middle" fill="#4ADE80" fontSize="8" fontFamily="monospace">
          15/15 SECURITY PASS
        </text>

        {/* Right Sub-node: Org Admin & MRD */}
        <rect x="310" y="130" width="125" height="55" rx="6" fill="#100E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="372" y="152" textAnchor="middle" fill="#F6F0E2" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          MRD & IT ASSETS
        </text>
        <text x="372" y="169" textAnchor="middle" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          3 PRs PRODUCTION
        </text>

        {/* Circuit Interconnectors */}
        <path d="M230 90 L230 110 L87 110 L87 130" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d="M230 90 L230 130" stroke="#C96F4A" strokeWidth="1.5" />
        <path d="M230 90 L230 110 L372 110 L372 130" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Glowing Pulsing Status Nodes */}
        <circle cx="230" cy="90" r="3" fill="#FFD6A1" />
        <circle cx="87" cy="130" r="3" fill="#C96F4A" />
        <circle cx="230" cy="130" r="3.5" fill="#4ADE80" />
        <circle cx="372" cy="130" r="3" fill="#C96F4A" />
      </svg>

      {/* Live HUD Badge */}
      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        HIS ENGINE // PRODUCTION
      </div>
    </div>
  );
}

function OnCareVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,161,0.18)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Clinical Oncology Workflows Schematic */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#FFD6A1] select-none"
      >
        {/* Oncology Care Pipeline Track */}
        <rect x="30" y="35" width="400" height="50" rx="8" fill="#14110E" stroke="rgba(255,250,240,0.15)" strokeWidth="1" />
        <text x="45" y="58" fill="#C96F4A" fontSize="10" fontFamily="monospace" fontWeight="bold">
          AEDOS HEALTH // ONCOLOGY CORE
        </text>
        <text x="45" y="73" fill="rgba(255,250,240,0.6)" fontSize="8.5" fontFamily="monospace">
          CLINICAL SCHEDULING • PO PIPELINE • CMS SYNCHRONIZATION
        </text>

        {/* Active Module Blocks */}
        <rect x="30" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="90" y="140" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="600">
          RAISE_PO_MODULE
        </text>
        <text x="90" y="158" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="7.5" fontFamily="monospace">
          PURCHASE ORDERS
        </text>

        <rect x="170" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="230" y="140" textAnchor="middle" fill="#F6F0E2" fontSize="9" fontFamily="monospace" fontWeight="600">
          APPOINTMENTS
        </text>
        <text x="230" y="158" textAnchor="middle" fill="#4ADE80" fontSize="7.5" fontFamily="monospace">
          DATE SELECTOR
        </text>

        <rect x="310" y="115" width="120" height="65" rx="6" fill="#110E0C" stroke="#C96F4A" strokeWidth="1.2" />
        <text x="370" y="140" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="600">
          DYNAMIC_CMS
        </text>
        <text x="370" y="158" textAnchor="middle" fill="#C96F4A" fontSize="7.5" fontFamily="monospace">
          STATIC GEN FLOWS
        </text>

        {/* Pulse Flow Waveform */}
        <path
          d="M90 100 Q160 80 230 100 T370 100"
          stroke="#C96F4A"
          strokeWidth="1.5"
          fill="none"
          strokeDasharray="4 2"
        />
        <circle cx="90" cy="115" r="3" fill="#C96F4A" />
        <circle cx="230" cy="115" r="3" fill="#FFD6A1" />
        <circle cx="370" cy="115" r="3" fill="#4ADE80" />
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-ping" />
        ACTIVE RESIDENCY // GURGAON
      </div>
    </div>
  );
}

function InfosysLabVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,111,74,0.2)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* IoT Microcontroller & HuskyLens AI Radar */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#C96F4A] select-none"
      >
        {/* ESP32 Microcontroller Core */}
        <rect x="40" y="40" width="160" height="130" rx="6" fill="#13100D" stroke="#C96F4A" strokeWidth="1.5" />
        <text x="120" y="70" textAnchor="middle" fill="#FFD6A1" fontSize="11" fontFamily="monospace" fontWeight="bold">
          ESP32-WROOM
        </text>
        <text x="120" y="88" textAnchor="middle" fill="rgba(255,250,240,0.6)" fontSize="8.5" fontFamily="monospace">
          2.4GHz WiFi / BLE 4.2
        </text>

        {/* Pinout array */}
        <line x1="40" y1="110" x2="25" y2="110" stroke="#FFD6A1" strokeWidth="1.5" />
        <line x1="40" y1="125" x2="25" y2="125" stroke="#FFD6A1" strokeWidth="1.5" />
        <line x1="40" y1="140" x2="25" y2="140" stroke="#FFD6A1" strokeWidth="1.5" />

        <rect x="70" y="115" width="100" height="35" rx="4" fill="#0C0A08" stroke="rgba(255,250,240,0.2)" strokeWidth="1" />
        <text x="120" y="136" textAnchor="middle" fill="#4ADE80" fontSize="8" fontFamily="monospace">
          STA/AP TELEMETRY
        </text>

        {/* HuskyLens Vision AI Reticle Target */}
        <circle cx="340" cy="105" r="55" stroke="rgba(255,250,240,0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="340" cy="105" r="35" stroke="#C96F4A" strokeWidth="1.2" />
        <circle cx="340" cy="105" r="3" fill="#FFD6A1" />

        {/* Reticle brackets */}
        <path d="M315 80 L315 90 M315 80 L325 80" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M365 80 L365 90 M365 80 L355 80" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M315 130 L315 120 M315 130 L325 130" stroke="#FFD6A1" strokeWidth="1.5" />
        <path d="M365 130 L365 120 M365 130 L355 130" stroke="#FFD6A1" strokeWidth="1.5" />

        <text x="340" y="180" textAnchor="middle" fill="#FFD6A1" fontSize="9" fontFamily="monospace" fontWeight="bold">
          HUSKYLENS_AI // SERVO LOCK
        </text>
        <text x="340" y="195" textAnchor="middle" fill="#C96F4A" fontSize="7.5" fontFamily="monospace">
          FACE RECOGNITION CONF: 98.4%
        </text>

        {/* Bus Connection */}
        <path d="M200 105 L285 105" stroke="#C96F4A" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        MAKER LAB // HARDWARE IOT
      </div>
    </div>
  );
}

function DevelopersArenaVisual() {
  return (
    <div className="relative w-full h-full bg-[#0A0907] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,214,161,0.18)_0%,rgba(10,9,7,0.95)_75%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,250,240,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,250,240,0.03)_1px,transparent_1px)] bg-[size:28px_28px]" />

      {/* Python Data Engineering & Docker Pipelines */}
      <svg
        viewBox="0 0 460 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full max-h-[220px] p-4 text-[#FFD6A1] select-none"
      >
        {/* Terminal Header */}
        <rect x="30" y="30" width="400" height="150" rx="8" fill="#120F0C" stroke="#C96F4A" strokeWidth="1.2" />
        <rect x="30" y="30" width="400" height="28" rx="8" fill="#191511" />
        <circle cx="48" cy="44" r="4" fill="#EF4444" />
        <circle cx="62" cy="44" r="4" fill="#F59E0B" />
        <circle cx="76" cy="44" r="4" fill="#10B981" />
        <text x="100" y="48" fill="rgba(255,250,240,0.5)" fontSize="9" fontFamily="monospace">
          python3 --evaluate task_suite.py
        </text>

        {/* Terminal Execution Stream */}
        <text x="48" y="82" fill="#FFD6A1" fontSize="9.5" fontFamily="monospace">
          [100% COMPLETE] 12/12 evaluated milestone tasks passed.
        </text>
        <text x="48" y="102" fill="rgba(255,250,240,0.7)" fontSize="9" fontFamily="monospace">
          &gt; Pandas AST Analysis • NumPy Math Kernels • Matplotlib Pipelines
        </text>
        <text x="48" y="122" fill="rgba(255,250,240,0.7)" fontSize="9" fontFamily="monospace">
          &gt; Flask Microservices • Docker Containerization • SQL Schemas
        </text>
        <text x="48" y="145" fill="#4ADE80" fontSize="10" fontFamily="monospace" fontWeight="bold">
          RESULT: GRADE A+ [OUTSTANDING PERFORMANCE // 108+ HRS]
        </text>

        {/* Bottom Status Ticker */}
        <line x1="30" y1="158" x2="430" y2="158" stroke="rgba(255,250,240,0.1)" strokeWidth="1" />
        <text x="48" y="172" fill="#C96F4A" fontSize="8" fontFamily="monospace">
          STATUS: VERIFIED RESIDENCY COMPLETION • ISSUED OCTOBER 2026
        </text>
      </svg>

      <div className="absolute top-3 left-4 flex items-center gap-2 rounded bg-[#120F0D]/90 border border-[#C96F4A]/30 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
        GRADE A+ // 108+ HRS LOGGED
      </div>
    </div>
  );
}

const visualComponents = [
  PristynCareVisual,
  OnCareVisual,
  InfosysLabVisual,
  DevelopersArenaVisual,
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
        {/* Section Header */}
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

        {/* The Four Quarters: Cinematic 2x2 Grid matching Infinity Socks Product Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {experiences.map((exp, idx) => {
            const quarterIndex = `0${idx + 1} / 04`;
            const domain = quarterDomains[idx] || "ENGINEERING SYSTEMS";
            const displayTitle = quarterDisplayTitles[idx] || exp.company.toUpperCase();
            const VisualComponent = visualComponents[idx] || PristynCareVisual;

            return (
              <article
                key={exp.company + exp.period}
                className="qq__panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.12)] bg-[#0C0A08] transition-all duration-500 hover:border-[#C96F4A]/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(201,111,74,0.18)]"
              >
                {/* 1. Cinematic Visual Showcase Container */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden border-b border-[rgba(255,250,240,0.1)] bg-[#080706]">
                  {/* Visual container with smooth hover zoom */}
                  <div className="w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                    <VisualComponent />
                  </div>

                  {/* Subtle dark gradient overlay at bottom for seamless transition */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/40 to-transparent pointer-events-none" />

                  {/* Top-Right Domain Pill */}
                  <div className="absolute top-4 right-4 z-20 font-mono text-[10px] tracking-widest text-[#FFD6A1] bg-[#120F0D]/90 border border-[rgba(255,250,240,0.15)] px-3 py-1 rounded-full backdrop-blur-md">
                    {quarterIndex}
                  </div>
                </div>

                {/* 2. Overlaid Editorial Typography & Metadata */}
                <div className="relative z-10 flex flex-col justify-between flex-1 p-6 sm:p-8">
                  <div>
                    {/* Hairline Infinity Socks HUD Row */}
                    <div className="qq__hudrow flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] pb-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-[rgba(255,250,240,0.5)]">
                      <span className="flex items-center gap-2 truncate pr-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] shrink-0" />
                        <b className="text-[#C96F4A] uppercase truncate">{`[0${idx + 1} // ${domain}]`}</b>
                      </span>
                      <span className="text-[#FFD6A1] font-bold shrink-0">{exp.company}</span>
                    </div>

                    {/* Oversized Condensed Display Title */}
                    <div className="mt-4 mb-3">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3
                          className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {displayTitle}
                        </h3>

                        {exp.isOngoing && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C96F4A]/15 border border-[#C96F4A]/40 px-3 py-1 font-mono text-[10px] tracking-widest text-[#FFD6A1]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-ping" />
                            ACTIVE RESIDENCY
                          </span>
                        )}
                      </div>

                      {/* Role & Mode Meta Strip */}
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-xs text-[rgba(255,250,240,0.7)]">
                        <span className="font-semibold text-[#FFD6A1]">{exp.role}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1 text-[rgba(255,250,240,0.55)]">
                          <Calendar size={12} className="text-[#C96F4A]" />
                          <span>{exp.period}</span>
                        </div>
                        {exp.mode && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1 text-[rgba(255,250,240,0.55)]">
                              <MapPin size={12} className="text-[#C96F4A]" />
                              <span>{exp.mode}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Technologies Chips */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="my-4 flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded border border-[rgba(255,250,240,0.09)] bg-[#14110E] px-2.5 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.7)] group-hover:border-[#C96F4A]/30 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights Claims */}
                  <div className="qq__claim space-y-2.5 pt-4 border-t border-[rgba(255,250,240,0.08)]">
                    {exp.highlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={14}
                          className="mt-0.5 shrink-0 text-[#C96F4A]"
                        />
                        <p className="text-xs sm:text-[13px] leading-relaxed text-[rgba(255,250,240,0.75)] font-sans">
                          {highlight}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-6 pt-4 border-t border-[rgba(255,250,240,0.08)] flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[rgba(255,250,240,0.4)] flex items-center gap-1.5">
                      <Sparkles size={11} className="text-[#C96F4A]" />
                      PRODUCTION VERIFIED
                    </span>

                    <InfinityButton
                      variant="ghost"
                      withArrow
                      onClick={() => {
                        const el = document.getElementById("projects");
                        el?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs"
                    >
                      INSPECT WORK
                    </InfinityButton>
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
