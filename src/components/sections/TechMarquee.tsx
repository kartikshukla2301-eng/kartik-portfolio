"use client";

import { useMemo } from "react";
import { useContent } from "@/components/providers/ContentProvider";

function Row({ items, ariaHidden }: { items: string[]; ariaHidden?: boolean }) {
  return (
    <ul className="marquee__row" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <li key={item} className="marquee__item">
          {item}
          <span className="marquee__sep" aria-hidden="true">
            /
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Infinite technology strip. Pure CSS animation, paused on hover, static with reduced motion. */
export function TechMarquee() {
  const { skills } = useContent();

  // One flat, de-duplicated list from the skills data so the strip never drifts from the Skills section.
  const tech = useMemo(
    () =>
      Array.from(
        new Set(
          skills
            .filter((s) => s.category !== "IoT" && s.category !== "Security")
            .flatMap((s) => s.items)
            .filter((item) => item.length <= 18)
        )
      ).slice(0, 26),
    [skills]
  );

  if (tech.length === 0) return null;

  return (
    <section
      aria-label="Technologies I work with"
      className="marquee relative border-y border-[rgba(255,250,240,0.1)] bg-[#0B0A08] py-6 sm:py-8"
    >
      <p className="mb-3 px-4 text-center font-mono text-[10px] uppercase tracking-[0.28em] text-[#C96F4A] sm:mb-4">
        Built with
      </p>
      <div className="marquee__viewport">
        <div className="marquee__track">
          <Row items={tech} />
          <Row items={tech} ariaHidden />
        </div>
      </div>
    </section>
  );
}
