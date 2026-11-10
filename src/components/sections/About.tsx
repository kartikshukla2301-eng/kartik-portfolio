"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Brain, Code2, Server, GraduationCap, ArrowUpRight } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { aboutCards, siteConfig } from "@/lib/data";

const iconMap = {
  Brain,
  Code2,
  Server,
  GraduationCap,
};

export function About() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14">
          <SectionHeading
            eyebrow="Architectural Creed"
            title="Engineering Reliable Systems & Scalable AI"
            description="Full Stack Developer and AI Engineer building production-grade healthcare architectures, robust enterprise workflows, high-throughput REST APIs, and autonomous AI agents."
          />

          <div className="mt-4">
            <ColorFillText
              as="h2"
              dataFill="dim"
              scrub
              className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F6F0E2]"
            >
              TRUSTED IN MISSION-CRITICAL HEALTHCARE & ENTERPRISE CODEBASES.
            </ColorFillText>
          </div>
        </div>

        {/* Portrait + Editorial Pull-Quote Row */}
        <div className="mb-16 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          {/* Portrait with Infinity Socks warm atmospheric frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <div className="group relative">
              {/* Floor ambient glow */}
              <div className="absolute -inset-3 rounded-2xl bg-[#C96F4A]/15 opacity-60 blur-xl transition-all duration-700 group-hover:opacity-100 group-hover:bg-[#C96F4A]/25" />
              <div className="relative h-64 w-52 overflow-hidden rounded-2xl sm:h-72 sm:w-60 border border-[rgba(255,250,240,0.16)] bg-[#12100D] shadow-2xl">
                <Image
                  src={siteConfig.portrait.src}
                  alt={siteConfig.portrait.alt}
                  width={400}
                  height={500}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-[rgba(255,250,240,0.12)] pt-2 font-mono text-[10px] tracking-widest text-[#FFD6A1]">
                  <span>IND // 28.61° N</span>
                  <span className="text-[rgba(255,250,240,0.6)]">SYS.RDY</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pull Quote / Summary in Infinity Socks obsidian court card */}
          <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="court-card rounded-2xl p-8 sm:p-10 border border-[rgba(255,250,240,0.14)] bg-[#12100D]/90 backdrop-blur-md relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-28 w-28 bg-[#C96F4A]/10 blur-2xl pointer-events-none" />

            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-[#C96F4A]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
              <span>Core Discipline & Philosophy</span>
            </div>

            <p className="text-base sm:text-xl font-light leading-relaxed text-[rgba(255,250,240,0.92)]">
              &ldquo;{siteConfig.description}&rdquo;
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(255,250,240,0.1)] pt-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#FFD6A1]">
                  {siteConfig.name.toUpperCase()}
                </span>
                <span className="text-xs text-[rgba(255,250,240,0.4)]">/</span>
                <span className="font-mono text-xs text-[rgba(255,250,240,0.6)]">
                  B.Tech CSE (2023–2027) • CGPA 7.9/10
                </span>
              </div>
              <div className="font-mono text-[11px] tracking-wider text-[#C96F4A] flex items-center gap-1">
                <span>NEW DELHI, IN</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid: Core Pillars */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            const indexStr = String(i + 1).padStart(2, "0");
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard tilt className="h-full flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#C96F4A]/12 border border-[#C96F4A]/25 text-[#FFD6A1]">
                        <Icon size={20} />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-[rgba(255,250,240,0.35)]">
                        {`${indexStr} //`}
                      </span>
                    </div>
                    <h3
                      className="mb-2.5 text-base font-bold tracking-tight text-[#F6F0E2]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[rgba(255,250,240,0.58)] font-sans">
                      {card.description}
                    </p>
                  </div>
                  <div className="mt-5 border-t border-[rgba(255,250,240,0.08)] pt-3 flex items-center justify-between font-mono text-[10px] tracking-wider text-[#C96F4A]">
                    <span>STATUS: ACTIVE</span>
                    <span>100%</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
