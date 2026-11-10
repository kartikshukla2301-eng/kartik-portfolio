"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, motionDisabled } from "@/lib/gsap";
import { formatCount, type FormatCountOptions } from "@/lib/motion";

interface CountUpProps extends FormatCountOptions {
  value: number;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` the first time it scrolls into view.
 * The server renders the final value, so the number is correct without JavaScript
 * and when motion is reduced.
 */
export function CountUp({
  value,
  duration = 1.6,
  delay = 0,
  className,
  decimals,
  pad,
  prefix,
  suffix,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;

    const fmt = { decimals, pad, prefix, suffix };
    const state = { v: 0 };
    el.textContent = formatCount(0, fmt);

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: () => {
        gsap.to(state, {
          v: value,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = formatCount(state.v, fmt);
          },
          onComplete: () => {
            el.textContent = formatCount(value, fmt);
          },
        });
      },
    });

    return () => {
      trigger.kill();
      el.textContent = formatCount(value, fmt);
    };
  }, [value, duration, delay, decimals, pad, prefix, suffix]);

  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`.trim()}>
      {formatCount(value, { decimals, pad, prefix, suffix })}
    </span>
  );
}
