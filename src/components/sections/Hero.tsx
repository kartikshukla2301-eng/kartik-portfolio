"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, Mail, MapPin, Cpu, Activity } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { siteConfig, tagCloud } from "@/lib/data";
import { parseGoogleDriveUrl } from "@/lib/drive";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const stats = [
  {
    num: "04",
    label: "Professional Internships",
    detail: "Pristyn Care, OnCare, Infosys, TDA",
  },
  {
    num: "04",
    label: "Featured Projects",
    detail: "DevLeveler, AI CSV & Intelligent Agents",
  },
  {
    num: "06",
    label: "Verified Credentials",
    detail: "AWS, MongoDB, Python, Softpro",
  },
  {
    num: "7.9",
    label: "Academic CGPA",
    detail: "B.Tech CSE (2023–2027)",
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 30]);

  const parsedResume = parseGoogleDriveUrl(siteConfig.resumeUrl);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-4 pt-28 pb-8 bg-[#0B0A08]"
    >
      {/* 3D Warm Copper Scene */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <HeroScene />
      </div>

      {/* Infinity Socks Court Floor Ambient Lighting */}
      <div className="court-floor-glow absolute inset-0 z-0" />

      {/* Giant Edge-to-Edge Condensed Architectural Background Typography */}
      <div className="hero-giant-bg" aria-hidden="true">
        KARTIK SHUKLA
      </div>

      {/* Main Editorial Stage */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-2 sm:px-4 my-auto">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          
          {/* ================================================================
              LEFT COLUMN: Editorial Narrative, Identity & Action Triggers
              ================================================================ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: contentY }}
            className="flex flex-col text-left lg:col-span-5"
          >
            {/* Monospace Protocol Pill */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D]/90 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#C96F4A] backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
              <span>{"[00 // PROTOCOL]"} AVAILABLE FOR FULL-TIME & INTERNSHIPS</span>
            </div>

            {/* Display Name with Color-Fill Reveal */}
            <div className="mb-2 overflow-hidden">
              <ColorFillText
                as="h1"
                dataFill="ghost"
                className="font-display text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F6F0E2] leading-[0.92]"
              >
                {siteConfig.name}
              </ColorFillText>
            </div>

            {/* Sub-Headline / Role */}
            <div className="mb-5">
              <ColorFillText
                as="p"
                dataFill="ghost"
                delay={0.2}
                className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#C96F4A]"
              >
                FULL STACK DEVELOPER {"//"} AI SYSTEMS ARCHITECT
              </ColorFillText>
            </div>

            {/* Narrative Editorial Copy */}
            <p className="mb-8 max-w-lg text-sm sm:text-base leading-relaxed text-[rgba(255,250,240,0.7)] font-sans">
              {siteConfig.heroDescription}
            </p>

            {/* Infinity Socks Action Buttons */}
            <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wider">
              {/* Primary Action: Explore Projects */}
              <InfinityButton href="#projects" variant="terra" withArrow>
                Explore Projects
              </InfinityButton>

              {/* Primary Action 2: View Resume */}
              {parsedResume.isValid && parsedResume.viewUrl ? (
                <InfinityButton href={parsedResume.viewUrl} variant="ghost" withArrow target="_blank">
                  Verified Resume
                </InfinityButton>
              ) : (
                <InfinityButton href="#certifications" variant="ghost" withArrow>
                  Credentials Vault
                </InfinityButton>
              )}

              {/* Tertiary Action: Contact */}
              <InfinityButton href="#contact" variant="ghost" withArrow={false}>
                Initiate Contact
              </InfinityButton>
            </div>

            {/* Social HUD Row */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[rgba(255,250,240,0.55)]">
              <div className="flex items-center gap-2">
                {[
                  { icon: GithubIcon, href: siteConfig.github, label: "GitHub" },
                  { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D] text-[rgba(255,250,240,0.7)] transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1] hover:scale-105"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>

              <div className="h-3 w-px bg-[rgba(255,250,240,0.2)]" />

              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#C96F4A]" />
                <span className="tracking-wider">LUCKNOW / NCR, INDIA</span>
              </div>
            </div>
          </motion.div>

          {/* ================================================================
              CENTER COLUMN: Grounded Editorial Portrait & Court Depth Floor
              ================================================================ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: portraitY, scale: portraitScale }}
            className="relative flex flex-col items-center justify-center lg:col-span-3"
          >
            {/* Court Floor Perspective Glow Strip beneath the portrait */}
            <div className="hero-floor-strip" aria-hidden="true" />

            <div className="group relative">
              {/* Monospace Top Coordinates HUD */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-[#C96F4A]/80">
                {"[00 // ARCHITECTURE FRAME]"}
              </div>

              {/* Main portrait container with court hairline framing */}
              <div className="relative h-56 w-48 sm:h-64 sm:w-56 md:h-72 md:w-64 overflow-hidden rounded-2xl border-2 border-[rgba(255,250,240,0.22)] shadow-[0_24px_55px_rgba(0,0,0,0.85),0_0_35px_rgba(201,111,74,0.2)]">
                <Image
                  src={siteConfig.portrait.src}
                  alt={siteConfig.portrait.alt}
                  width={siteConfig.portrait.width}
                  height={siteConfig.portrait.height}
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                {/* Warm court floor reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08]/70 via-transparent to-[rgba(255,214,161,0.08)] pointer-events-none" />
              </div>

              {/* Floating copper accent pins */}
              <motion.div
                animate={{ y: [-3, 3, -3], x: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-2 top-6 h-2.5 w-2.5 rounded-full bg-[#FFD6A1] shadow-[0_0_12px_rgba(255,214,161,0.85)]"
              />
              <motion.div
                animate={{ y: [2, -4, 2], x: [1, -3, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-2.5 bottom-12 h-2 w-2 rounded-full bg-[#C96F4A] shadow-[0_0_12px_rgba(201,111,74,0.85)]"
              />

              {/* Monospace Bottom Status HUD */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-[rgba(255,250,240,0.5)]">
                {"[STATUS: ACTIVE CSE 2023–27]"}
              </div>
            </div>
          </motion.div>

          {/* ================================================================
              RIGHT COLUMN: Floating 3D Perspective Telemetry Card (DevLeveler)
              ================================================================ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 text-left lg:col-span-4"
          >
            {/* Architectural Telemetry Card */}
            <div className="hero__prod-card p-5 sm:p-6">
              {/* HUD Header Row */}
              <div className="mb-3 flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] pb-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(255,250,240,0.6)]">
                <span className="flex items-center gap-1.5 text-[#C96F4A]">
                  <Activity size={12} className="animate-pulse" />
                  {"[01 // FLAGSHIP ARCHITECTURE]"}
                </span>
                <span className="text-[#FFD6A1]">99.2% EVAL SCORE</span>
              </div>

              {/* Project Title & Badge */}
              <div className="mb-2">
                <div className="font-display text-2xl font-black uppercase tracking-tight text-[#F6F0E2]">
                  DEVLEVELER
                </div>
                <div className="font-mono text-[11px] font-medium tracking-wide uppercase text-[#C96F4A]">
                  AI DEVELOPER PORTFOLIO BENCHMARKING ENGINE
                </div>
              </div>

              {/* Brief Spec Description */}
              <p className="mb-4 text-xs leading-relaxed text-[rgba(255,250,240,0.65)] font-sans">
                Real-time AST parsing, automated ATS scoring, and interactive radar skill visualization built with Next.js 16 and Turbopack.
              </p>

              {/* Telemetry Micro Grid */}
              <div className="mb-5 grid grid-cols-2 gap-2 font-mono text-[10px] uppercase tracking-wider text-[rgba(255,250,240,0.55)]">
                <div className="rounded border border-[rgba(255,250,240,0.08)] bg-[#12100D] p-2">
                  <span className="block text-[8px] text-[#C96F4A]">CORE FRAMEWORK</span>
                  <span className="font-bold text-[#F6F0E2]">NEXT.JS 16 // TURBO</span>
                </div>
                <div className="rounded border border-[rgba(255,250,240,0.08)] bg-[#12100D] p-2">
                  <span className="block text-[8px] text-[#C96F4A]">EVALUATION ENGINE</span>
                  <span className="font-bold text-[#F6F0E2]">AST + RADAR EVALS</span>
                </div>
              </div>

              {/* Direct Card Action */}
              <div className="flex items-center justify-between">
                <InfinityButton href="#projects" variant="ghost" withArrow>
                  Inspect DevLeveler
                </InfinityButton>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[rgba(255,250,240,0.4)]">
                  LIVE PROD
                </span>
              </div>
            </div>

            {/* Quick Architecture Stack Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#C96F4A] mr-1 flex items-center gap-1">
                <Cpu size={10} />
                STACK:
              </span>
              {tagCloud.slice(0, 6).map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px] py-0 px-2 bg-[#12100D]/80">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* ================================================================
          BOTTOM TELEMETRY STATS STRIP: Hairline Grids & Monospace Counts
          ================================================================ */}
      <div className="relative z-10 w-full mt-10">
        <div className="w-full border-t border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-xl">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-y md:divide-y-0 divide-[rgba(255,250,240,0.1)] md:grid-cols-4 font-mono">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.num}
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.08 }}
                className="flex flex-col items-center p-4 sm:p-5 text-center transition-colors duration-300 hover:bg-[#161310]"
              >
                <span className="mb-0.5 font-display text-2xl font-black text-[#FFD6A1]">
                  {stat.num}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[rgba(255,250,240,0.9)]">
                  {stat.label}
                </span>
                <span className="text-[11px] text-[rgba(255,250,240,0.45)] mt-0.5">
                  {stat.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-6 flex flex-col items-center gap-1 font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,250,240,0.4)]"
        >
          <span>SCROLL DOWN</span>
          <ArrowDown size={12} className="animate-bounce text-[#C96F4A]" />
        </motion.div>
      </div>
    </section>
  );
}
