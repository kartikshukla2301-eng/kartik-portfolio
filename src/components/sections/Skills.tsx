"use client";

import { useEffect, useRef } from "react";
import { Monitor, Server, Sparkles, Terminal, Layers, Shield, Cloud, Database, Cpu } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShowCard } from "@/components/ui/ShowCard";
import { gsap, motionDisabled } from "@/lib/gsap";
import { useContent } from "@/components/providers/ContentProvider";

const ICONS = { Monitor, Server, Sparkles, Terminal, Layers, Shield, Cloud, Database, Cpu };

export function Skills() {
  const { skills } = useContent();
  const gridRef = useRef<HTMLDivElement>(null);

  // Chips pop in one after another inside each card the first time it scrolls into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || motionDisabled()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-skill-card]").forEach((card) => {
        gsap.from(card.querySelectorAll("[data-chip]"), {
          opacity: 0,
          y: 12,
          scale: 0.92,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.035,
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Tools I reach for"
          description="The technologies behind the products above, grouped by what they are used for."
        />

        <div ref={gridRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = ICONS[skill.icon as keyof typeof ICONS] ?? Terminal;
            return (
              <ShowCard key={skill.category} delay={(i % 3) * 0.08}>
                <div data-skill-card className="flex h-full flex-col p-6 sm:p-7">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C96F4A]/25 bg-[#C96F4A]/12 text-[#FFD6A1]">
                      <Icon size={19} />
                    </div>
                    <h3 className="font-display text-2xl uppercase leading-none text-[#F6F0E2]">{skill.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        data-chip
                        className="rounded-full border border-[rgba(255,250,240,0.12)] bg-[rgba(255,250,240,0.04)] px-3 py-1.5 font-mono text-[11px] text-[rgba(255,250,240,0.75)] transition-colors duration-200 hover:border-[#C96F4A]/50 hover:text-[#FFD6A1]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </ShowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
