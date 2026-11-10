"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { chapterLabel, formatCount } from "@/lib/motion";

export const CHAPTERS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Credentials" },
  { id: "github", label: "Open source" },
  { id: "contact", label: "Contact" },
] as const;

const TICKS = 24;

/**
 * Fixed scroll HUD (bottom-right): scroll progress as a two-digit counter, the current chapter
 * name, "n / 07" and a tick ruler. It is decoration, so it is hidden from assistive tech.
 */
export function ChapterHud() {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const idxRef = useRef<HTMLSpanElement>(null);
  const ticksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const num = numRef.current;
    const name = nameRef.current;
    const idx = idxRef.current;
    const ticks = ticksRef.current;
    if (!root || !num || !name || !idx || !ticks) return;

    const tickEls = Array.from(ticks.children) as HTMLElement[];
    const setChapter = (i: number) => {
      name.textContent = CHAPTERS[i].label;
      idx.textContent = chapterLabel(i, CHAPTERS.length);
      root.dataset.light = CHAPTERS[i].id === "contact" ? "true" : "false";
    };
    setChapter(0);

    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const p = self.progress;
          num.textContent = formatCount(Math.round(p * 100), { pad: 2 });
          const lit = Math.round(p * TICKS);
          tickEls.forEach((t, i) => t.classList.toggle("is-lit", i < lit));
        },
      })
    );

    CHAPTERS.forEach((chapter, i) => {
      const el = document.getElementById(chapter.id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => {
            if (self.isActive) setChapter(i);
          },
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={rootRef} className="chapter-hud" aria-hidden="true" data-light="false">
      <div className="chapter-hud__row">
        <span ref={numRef} className="chapter-hud__num">
          00
        </span>
        <span className="chapter-hud__meta">
          <span ref={nameRef} className="chapter-hud__name">
            Home
          </span>
          <span ref={idxRef} className="chapter-hud__idx">
            01 / 07
          </span>
        </span>
      </div>
      <div ref={ticksRef} className="chapter-hud__ticks">
        {Array.from({ length: TICKS }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
    </div>
  );
}
