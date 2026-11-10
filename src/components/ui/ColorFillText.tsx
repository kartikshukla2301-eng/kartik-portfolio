"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ColorFillTextProps {
  children: ReactNode;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "div";
  dataFill?: "ghost" | "dim";
  scrub?: boolean;
  inline?: boolean;
  delay?: number;
  className?: string;
  edgeColor?: string;
  finalColor?: string;
}

export function ColorFillText({
  children,
  as: Component = "span",
  dataFill = "ghost",
  scrub = false,
  inline = false,
  delay = 0,
  className = "",
  edgeColor,
  finalColor,
}: ColorFillTextProps) {
  const lineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const el = lineRef.current;
    if (!el) return;

    if (edgeColor) el.style.setProperty("--edge", edgeColor);
    if (finalColor) el.style.setProperty("--final", finalColor);

    if (scrub) {
      // Scroll-linked scrub from 0% to 100%
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 40%",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = Math.round(self.progress * 100);
          el.style.setProperty("--p", `${progress}`);
        },
      });

      return () => st.kill();
    } else {
      // Once-in-view smooth ignition
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, {
            duration: 1.2,
            delay,
            ease: "power2.out",
            onUpdate: function () {
              const currentP = Math.round(this.progress() * 100);
              el.style.setProperty("--p", `${currentP}`);
            },
          });
        },
      });

      return () => st.kill();
    }
  }, [scrub, delay, edgeColor, finalColor]);

  const inlineClass = inline ? "cf-line--inline" : "";

  return (
    <Component
      data-fill={dataFill}
      className={`relative inline-block ${className}`.trim()}
    >
      <span
        ref={lineRef as React.RefObject<HTMLSpanElement | null>}
        className={`cf-line ${inlineClass}`}
        style={{ "--p": 0 } as React.CSSProperties}
      >
        {children}
      </span>
    </Component>
  );
}
