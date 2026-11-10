"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap, ScrollTrigger, motionDisabled } from "@/lib/gsap";
import { staggeredProgress } from "@/lib/motion";

export interface StairLine {
  text: string;
  tone?: "cream" | "terra";
}

interface StairHeadingProps {
  lines: StairLine[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  /**
   * "scrub": the fill follows the scroll position (default).
   * "play": a timed fill that starts once when the heading enters view; use inside pinned/horizontal layouts
   * where the scroll position says nothing about where the heading is.
   */
  mode?: "scrub" | "play";
}

/**
 * Staircase heading: every line is indented a little further than the previous one and
 * fills with colour from left to right as the heading scrolls through the viewport.
 */
export function StairHeading({ lines, as: Tag = "h2", className, mode = "scrub" }: StairHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fills = Array.from(root.querySelectorAll<HTMLElement>(".cf-line"));

    if (motionDisabled()) {
      fills.forEach((f) => f.style.setProperty("--p", "100"));
      return;
    }

    const paint = (overall: number) => {
      fills.forEach((f, i) => {
        const p = staggeredProgress(overall, i, fills.length);
        f.style.setProperty("--p", String(Math.round(p * 100)));
      });
    };

    if (mode === "play") {
      const state = { p: 0 };
      let tween: gsap.core.Tween | null = null;
      const trigger = ScrollTrigger.create({
        trigger: root,
        start: "top 85%",
        once: true,
        onEnter: () => {
          tween = gsap.to(state, {
            p: 1,
            duration: 2,
            ease: "power2.out",
            onUpdate: () => paint(state.p),
          });
        },
      });
      return () => {
        trigger.kill();
        tween?.kill();
      };
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: "top 88%",
      end: "bottom 45%",
      scrub: 0.6,
      onUpdate: (self) => paint(self.progress),
    });

    return () => trigger.kill();
  }, [lines, mode]);

  return (
    <Tag ref={ref} className={`stair font-display uppercase ${className ?? ""}`.trim()}>
      {lines.map((line, i) => (
        <span key={line.text} className="stair__line" style={{ "--i": i } as CSSProperties}>
          <span
            className="cf-line cf-line--inline"
            data-fill="dim"
            style={
              {
                "--p": 0,
                "--final": line.tone === "terra" ? "var(--terra)" : "var(--cream)",
                "--edge": "var(--gold-glow)",
              } as CSSProperties
            }
          >
            {line.text}
          </span>
        </span>
      ))}
    </Tag>
  );
}
