"use client";

import { useEffect, useRef, type ElementType, type PointerEvent, type ReactNode } from "react";
import { gsap, motionDisabled } from "@/lib/gsap";

interface ShowCardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay (seconds) for the entrance, used to stagger cards in a grid. */
  delay?: number;
  /** Small mono label printed on the card frame, e.g. "01 / 04". */
  label?: string;
  id?: string;
}

/**
 * The shared card presentation: scrolls in once, then follows the pointer with a soft light
 * (mouse only, so touch screens are not left with a stuck hover state), and lifts on hover.
 * Corner brackets and the optional label frame the card like a viewfinder.
 */
export function ShowCard({ children, as: Tag = "div", className = "", delay = 0, label, id }: ShowCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || motionDisabled()) return;
    // gsap.context().revert() restores the inline styles gsap.from() set. A bare tween.kill() would
    // leave the card at opacity 0, and React StrictMode's second effect run would then animate 0 -> 0.
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 44,
        opacity: 0,
        duration: 0.85,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 92%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [delay]);

  const handleMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <Tag ref={ref} id={id} onPointerMove={handleMove} className={`show-card group ${className}`.trim()}>
      <span className="show-card__glow" aria-hidden="true" />
      <span className="show-card__corner show-card__corner--tl" aria-hidden="true" />
      <span className="show-card__corner show-card__corner--br" aria-hidden="true" />
      {label && (
        <span className="show-card__label" aria-hidden="true">
          {label}
        </span>
      )}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </Tag>
  );
}
