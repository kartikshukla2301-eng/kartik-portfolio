"use client";

import { useEffect, useRef, type ElementType } from "react";
import { gsap, SplitText, motionDisabled } from "@/lib/gsap";
import { isIntroPlaying, whenIntroDone } from "@/lib/intro";

type SplitBy = "chars" | "words" | "lines";

interface SplitRevealProps {
  children: string;
  as?: ElementType;
  by?: SplitBy;
  /** "view": plays when scrolled into view. "load": plays on mount (use for the hero). */
  trigger?: "view" | "load";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
}

/**
 * Text reveal: the text is split into masked lines and each char / word / line rises into place.
 * Splitting re-runs automatically on resize (autoSplit), so wrapping stays correct on mobile.
 * Without JS or with reduced motion the text is simply shown (see [data-split] in globals.css).
 */
export function SplitReveal({
  children,
  as: Tag = "div",
  by = "chars",
  trigger = "view",
  delay = 0,
  stagger,
  duration = 0.9,
  className,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (motionDisabled()) {
      el.dataset.split = "ready";
      return;
    }

    let cancelled = false;
    let split: SplitText | null = null;
    const ctx = gsap.context(() => {});

    document.fonts.ready.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        split = SplitText.create(el, {
          type: by === "chars" ? "chars,words,lines" : by === "words" ? "words,lines" : "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            el.dataset.split = "ready";
            const targets = by === "chars" ? self.chars : by === "words" ? self.words : self.lines;
            // Hero text waits for the intro loader to leave before it plays.
            const waitForIntro = trigger === "load" && isIntroPlaying();
            const tween = gsap.from(targets, {
              yPercent: 115,
              paused: waitForIntro,
              duration,
              delay,
              ease: "power3.out",
              stagger: stagger ?? (by === "chars" ? 0.03 : by === "words" ? 0.07 : 0.12),
              scrollTrigger:
                trigger === "view" ? { trigger: el, start: "top 88%", once: true } : undefined,
            });
            if (waitForIntro) whenIntroDone(() => tween.play());
            return tween;
          },
        });
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
    };
  }, [by, trigger, delay, stagger, duration, children]);

  return (
    <Tag ref={ref} data-split="pending" className={className}>
      {children}
    </Tag>
  );
}
