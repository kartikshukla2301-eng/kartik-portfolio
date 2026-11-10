"use client";

import { SplitReveal } from "@/components/motion/SplitReveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

/** Section opener: mono eyebrow, big condensed title that rises in line by line, optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";
  const light = tone === "light";

  return (
    <div className={`mb-10 sm:mb-14 ${centered ? "text-center" : "text-left"} ${className}`.trim()}>
      {eyebrow && (
        <p
          className={`mb-4 font-mono text-[11px] uppercase tracking-[0.26em] ${
            light ? "text-[#B4603E]" : "text-[#C96F4A]"
          }`}
        >
          [ {eyebrow} ]
        </p>
      )}
      <SplitReveal
        as="h2"
        by="lines"
        className={`font-display text-[clamp(2.75rem,8vw,6.5rem)] uppercase leading-[0.9] ${
          light ? "text-[#211A12]" : "text-[#F6F0E2]"
        }`}
      >
        {title}
      </SplitReveal>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-sm leading-relaxed sm:text-base ${centered ? "mx-auto" : ""} ${
            light ? "text-[rgba(33,26,18,0.7)]" : "text-[rgba(255,250,240,0.6)]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
