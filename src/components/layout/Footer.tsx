"use client";

import { useState } from "react";
import { ArrowUp } from "lucide-react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { useMotion } from "@/components/providers/MotionProvider";
import { useContent } from "@/components/providers/ContentProvider";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { scrollTo } = useMotion();
  const { profile } = useContent();
  const [paused, setPaused] = useState(false);

  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    document.body.classList.toggle("is-motion-paused", next);
  };

  return (
    <footer className="relative overflow-hidden bg-[#0B0A08] px-4 pb-24 pt-20 sm:px-6 sm:pb-16 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C96F4A]/50 to-transparent" />
      <div className="court-floor-glow absolute inset-x-0 bottom-0 h-2/3" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl">
        <SplitReveal
          as="p"
          by="chars"
          className="font-display text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.85] text-[#F6F0E2]"
        >
          See you in
        </SplitReveal>
        <SplitReveal
          as="p"
          by="chars"
          delay={0.25}
          className="font-display text-[clamp(3.5rem,13vw,11rem)] uppercase leading-[0.85] text-[#C96F4A]"
        >
          Production.
        </SplitReveal>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[rgba(255,250,240,0.1)] pt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.55)]">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href, { offset: -72 });
              }}
              className="transition-colors hover:text-[#FFD6A1]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleMotion}
            aria-pressed={paused}
            className="cursor-pointer uppercase tracking-[0.16em] transition-colors hover:text-[#FFD6A1]"
          >
            {paused ? "Resume motion" : "Pause motion"}
          </button>
          <a href={`mailto:${profile.email}`} className="text-[#FFD6A1] transition-colors hover:text-white sm:ml-auto">
            {profile.email}
          </a>
          <button
            type="button"
            onClick={() => scrollTo(0)}
            aria-label="Back to top"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-[rgba(255,250,240,0.16)] text-[rgba(255,250,240,0.7)] transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1]"
          >
            <ArrowUp size={14} />
          </button>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.32)]">
          &copy; {new Date().getFullYear()} {profile.name} / Design inspired by theinfinitysocks.com
        </p>
      </div>
    </footer>
  );
}
