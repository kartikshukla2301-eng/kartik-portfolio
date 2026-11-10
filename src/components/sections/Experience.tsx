"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import { StairHeading } from "@/components/motion/StairHeading";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { InfinityButton } from "@/components/ui/InfinityButton";
import {
  DevelopersArenaVisual,
  GenericVisual,
  InfosysLabVisual,
  OnCareVisual,
  PristynCareVisual,
} from "@/components/sections/experience-visuals";
import { useContent } from "@/components/providers/ContentProvider";
import { gsap } from "@/lib/gsap";
import { chapterLabel, clamp, countWord, experienceHeadline } from "@/lib/motion";
import type { Experience as ExperienceItem } from "@/lib/content/schema";

/** Hand-drawn schematics for the original four; anything the admin adds gets a generated one. */
function renderVisual(exp: ExperienceItem) {
  switch (exp.visual) {
    case "pristyn":
      return <PristynCareVisual />;
    case "oncare":
      return <OnCareVisual />;
    case "infosys":
      return <InfosysLabVisual />;
    case "arena":
      return <DevelopersArenaVisual />;
    default:
      return <GenericVisual company={exp.company} role={exp.role} tags={exp.technologies} />;
  }
}

// Cards are deliberately different sizes and heights, so the row reads as a scene, not a table.
const CARD_LAYOUT = [
  { w: "clamp(22rem, 31vw, 36rem)", y: "0vh" },
  { w: "clamp(21rem, 28vw, 32rem)", y: "7vh" },
  { w: "clamp(22rem, 32vw, 37rem)", y: "-5vh" },
  { w: "clamp(21rem, 29vw, 33rem)", y: "5vh" },
];

export function Experience() {
  const { experiences } = useContent();
  const total = experiences.length;
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const counter = counterRef.current;
    const label = labelRef.current;
    const bar = barRef.current;
    if (!root || !stage || !track || !counter || !label || !bar) return;

    const cards = gsap.utils.toArray<HTMLElement>(".quarter-card", track);
    const total = cards.length;
    const setIndex = (i: number) => {
      counter.textContent = chapterLabel(i, total);
      label.textContent = experiences[i]?.domain ?? "";
    };
    setIndex(0);

    const mm = gsap.matchMedia();

    // Desktop: the stage is pinned and the row of cards travels sideways with the scroll.
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const travel = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => `+=${distance() * 1.05}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            bar.style.transform = `scaleX(${self.progress})`;
            setIndex(clamp(Math.round(self.progress * (total - 1)), 0, total - 1));
          },
        },
      });

      cards.forEach((card) => {
        const visual = card.querySelector<HTMLElement>(".quarter-card__visual");
        // Cards grow slightly as they approach the middle of the screen.
        gsap.fromTo(
          card,
          { scale: 0.93, opacity: 0.55 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: travel,
              start: "left 92%",
              end: "left 45%",
              scrub: true,
            },
          }
        );
        // The illustration inside each card moves a little slower than the card itself.
        if (visual) {
          gsap.fromTo(
            visual,
            { xPercent: -7 },
            {
              xPercent: 7,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: travel,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
      });
    });

    // Tablet / phone / reduced motion: a normal vertical stack with a simple reveal.
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      bar.style.transform = "scaleX(1)";
      counter.textContent = `${String(total).padStart(2, "0")} items`;
      label.textContent = "Internships";
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      cards.forEach((card) => {
        gsap.from(card, {
          y: 48,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%", once: true },
        });
      });
    });

    return () => mm.revert();
  }, [experiences]);

  return (
    <section id="experience" ref={rootRef} className="relative bg-[#12100D]">
      <div ref={stageRef} className="quarters-stage">
        {/* Counter shown while the section is pinned */}
        <div className="quarters-hud" aria-hidden="true">
          <span ref={counterRef} className="font-display text-3xl leading-none text-[#C96F4A] sm:text-4xl">
            {chapterLabel(0, total)}
          </span>
          <span ref={labelRef} className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.55)]">
            {experiences[0]?.domain}
          </span>
          <div className="quarters-hud__bar">
            <div ref={barRef} className="quarters-hud__fill" />
          </div>
        </div>

        <div ref={trackRef} className="quarters-track">
          {/* Opening statement */}
          <div className="quarters-intro">
            <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-[#C96F4A]">
              [ Professional experience ]
            </p>
            <StairHeading
              mode="play"
              lines={[
                { text: "One developer.", tone: "cream" },
                { text: experienceHeadline(total), tone: "terra" },
                { text: "Real delivery.", tone: "cream" },
              ]}
              className="text-[clamp(3.25rem,9.5vw,9rem)]"
            />
            <p className="mt-6 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-[rgba(255,250,240,0.5)]">
              {countWord(total)} {total === 1 ? "internship" : "internships"}.
              <br />
              Production code, real users.
            </p>
          </div>

          {experiences.map((exp, i) => {
            const layout = CARD_LAYOUT[i % CARD_LAYOUT.length];
            const domain = exp.domain;
            const title = exp.displayTitle || exp.company;
            return (
              <article
                key={exp.company + exp.period}
                className="quarter-card group"
                style={{ "--card-w": layout.w, "--card-y": layout.y } as CSSProperties}
              >
                <div className="quarter-card__media">
                  <div className="quarter-card__visual">
                    {renderVisual(exp)}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-transparent" />
                  <span className="absolute right-3 top-3 rounded-full border border-[rgba(255,250,240,0.18)] bg-[#120F0D]/85 px-2.5 py-1 font-mono text-[10px] tracking-widest text-[#FFD6A1] backdrop-blur-md">
                    {chapterLabel(i, total)}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C96F4A]">{domain}</p>

                  <SplitReveal
                    as="h3"
                    by="words"
                    className="mt-2 font-display text-[clamp(2.4rem,4.2vw,3.6rem)] uppercase leading-[0.92] text-[#F6F0E2] transition-colors duration-300 group-hover:text-[#FFD6A1]"
                  >
                    {title}
                  </SplitReveal>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-[rgba(255,250,240,0.6)]">
                    <span className="font-semibold text-[#FFD6A1]">{exp.role}</span>
                    <span className="flex items-center gap-1">
                      <Calendar size={11} className="text-[#C96F4A]" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={11} className="text-[#C96F4A]" />
                      {exp.mode}
                    </span>
                    {exp.isOngoing && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C96F4A]/40 bg-[#C96F4A]/15 px-2 py-0.5 text-[10px] uppercase tracking-widest text-[#FFD6A1]">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C96F4A]" />
                        Ongoing
                      </span>
                    )}
                  </div>

                  <ul className="mt-4 space-y-2.5">
                    {exp.highlights.slice(0, 2).map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[rgba(255,250,240,0.75)]">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#C96F4A]" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-[rgba(255,250,240,0.1)] bg-[#14110E] px-2 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.7)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.4)]">
                      {exp.company}
                    </span>
                    <InfinityButton href="#projects" variant="ghost" withArrow className="text-[10px]">
                      Projects
                    </InfinityButton>
                  </div>
                </div>
              </article>
            );
          })}

          <div className="quarters-end" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
