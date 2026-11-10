"use client";

import Image from "next/image";
import { Brain, Code2, Server, GraduationCap } from "lucide-react";
import { ShowCard } from "@/components/ui/ShowCard";
import { StairHeading } from "@/components/motion/StairHeading";
import { aboutCards } from "@/lib/data";
import { useContent } from "@/components/providers/ContentProvider";

const ICONS = { Brain, Code2, Server, GraduationCap };

export function About() {
  const { profile } = useContent();
  return (
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.26em] text-[#C96F4A]">[ About ]</p>
        <StairHeading
          lines={[
            { text: "Reliable systems.", tone: "cream" },
            { text: "Practical AI.", tone: "terra" },
            { text: "Healthcare grade.", tone: "cream" },
          ]}
          className="mb-12 text-[clamp(3rem,10vw,9rem)] sm:mb-16"
        />

        <div className="mb-14 grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
          <ShowCard className="mx-auto w-full max-w-xs md:mx-0 md:w-64">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={profile.portrait.thumb}
                alt={profile.portrait.alt}
                fill
                sizes="(max-width: 768px) 80vw, 256px"
                className="object-cover object-[50%_15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A08] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between border-t border-[rgba(255,250,240,0.14)] pt-2 font-mono text-[10px] tracking-widest text-[#FFD6A1]">
                <span>LUCKNOW / NCR</span>
                <span className="text-[rgba(255,250,240,0.6)]">B.TECH CSE</span>
              </div>
            </div>
          </ShowCard>

          <ShowCard delay={0.1}>
            <div className="flex h-full flex-col justify-between gap-6 p-7 sm:p-10">
              <p className="font-script text-2xl leading-snug text-[rgba(255,250,240,0.92)] sm:text-3xl">
                {profile.description}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[rgba(255,250,240,0.1)] pt-5 font-mono text-xs">
                <span className="font-semibold tracking-wider text-[#FFD6A1]">{profile.name.toUpperCase()}</span>
                <span className="text-[rgba(255,250,240,0.35)]">/</span>
                <span className="text-[rgba(255,250,240,0.6)]">
                  B.Tech CSE ({profile.education.period}) / CGPA {profile.education.cgpa}
                </span>
              </div>
            </div>
          </ShowCard>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((card, i) => {
            const Icon = ICONS[card.icon];
            return (
              <ShowCard key={card.title} delay={i * 0.08} label={`${String(i + 1).padStart(2, "0")} //`}>
                <div className="flex h-full flex-col p-6">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C96F4A]/25 bg-[#C96F4A]/12 text-[#FFD6A1]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mb-2 font-display text-2xl uppercase leading-none text-[#F6F0E2]">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-[rgba(255,250,240,0.6)]">{card.description}</p>
                </div>
              </ShowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
