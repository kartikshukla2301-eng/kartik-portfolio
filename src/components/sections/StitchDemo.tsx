"use client";

import { useEffect, useId, useRef, useState } from "react";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { gsap, motionDisabled } from "@/lib/gsap";
import { deriveInitials } from "@/lib/motion";

const DEFAULT_INITIALS = "KS";
const PATCH_W = 400;

/**
 * Interactive demo: type your name and your initials are "stitched" onto a woven patch.
 * A clip-path wipes across the stitched outline while a needle dot rides its leading edge.
 */
export function StitchDemo() {
  const [name, setName] = useState("");
  const initials = deriveInitials(name, DEFAULT_INITIALS);
  const showingDefault = initials === DEFAULT_INITIALS && name.trim() === "";

  const clipId = useId().replace(/:/g, "");
  const clipRectRef = useRef<SVGRectElement>(null);
  const needleRef = useRef<SVGCircleElement>(null);

  // Re-stitch whenever the initials change.
  useEffect(() => {
    const rect = clipRectRef.current;
    const needle = needleRef.current;
    if (!rect || !needle) return;

    if (motionDisabled()) {
      rect.setAttribute("width", String(PATCH_W));
      needle.setAttribute("opacity", "0");
      return;
    }

    const state = { x: 0 };
    const tween = gsap.fromTo(
      state,
      { x: 0 },
      {
        x: PATCH_W,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          rect.setAttribute("width", String(state.x));
          needle.setAttribute("cx", String(state.x));
          needle.setAttribute("cy", String(130 + Math.sin(state.x / 14) * 7));
          needle.setAttribute("opacity", state.x >= PATCH_W - 1 ? "0" : "1");
        },
      }
    );
    return () => {
      tween.kill();
    };
  }, [initials]);

  return (
    <section id="stitch" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.26em] text-[#C96F4A]">[ Try it ]</p>
          <SplitReveal
            as="h2"
            by="chars"
            className="font-display text-[clamp(4.5rem,15vw,11rem)] uppercase leading-[0.85] text-[#C96F4A]"
          >
            Stitched.
          </SplitReveal>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-[rgba(255,250,240,0.65)] sm:text-base">
            Details matter in code and in craft. Type your name and see it reduced to two stitched initials, the way
            a small, careful detail should be.
          </p>

          <label htmlFor="stitch-name" className="mt-8 block font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(255,250,240,0.5)]">
            Your name
          </label>
          <input
            id="stitch-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 40))}
            placeholder="Type your name"
            maxLength={40}
            autoComplete="off"
            autoCapitalize="words"
            spellCheck={false}
            enterKeyHint="done"
            className="mt-2 w-full max-w-md rounded-xl border border-[rgba(255,250,240,0.16)] bg-[#161310] px-4 py-3.5 font-mono text-base text-[#F6F0E2] outline-none transition-colors placeholder:text-[rgba(255,250,240,0.3)] focus:border-[#C96F4A]"
          />
          <p className="mt-3 font-mono text-[11px] text-[rgba(255,250,240,0.45)]" aria-live="polite">
            {showingDefault ? "Showing mine. Type yours." : `Stitched initials: ${initials}`}
          </p>
        </div>

        <div className="mx-auto w-full max-w-md">
          <svg
            viewBox={`0 0 ${PATCH_W} 260`}
            className="h-auto w-full drop-shadow-[0_24px_40px_rgba(0,0,0,0.6)]"
            role="img"
            aria-label={`Patch with the initials ${initials} stitched on it`}
          >
            <defs>
              <clipPath id={clipId}>
                <rect ref={clipRectRef} x="0" y="0" width={PATCH_W} height="260" />
              </clipPath>
              <pattern id={`${clipId}-weave`} width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#1b1611" />
                <path d="M0 0L6 6M6 0L0 6" stroke="rgba(255,250,240,0.04)" strokeWidth="1" />
              </pattern>
            </defs>

            <rect x="10" y="10" width="380" height="240" rx="20" fill={`url(#${clipId}-weave)`} stroke="rgba(201,111,74,0.7)" strokeWidth="1.5" />

            <g clipPath={`url(#${clipId})`}>
              <rect
                x="24"
                y="24"
                width="352"
                height="212"
                rx="12"
                fill="none"
                stroke="#F6F0E2"
                strokeOpacity="0.6"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              <text
                x="200"
                y="172"
                textAnchor="middle"
                fontFamily="var(--font-display)"
                fontSize={initials.length > 1 ? 150 : 190}
                letterSpacing="6"
                fill="rgba(246,240,226,0.1)"
                stroke="#F6F0E2"
                strokeWidth="2.5"
                strokeDasharray="7 5"
                strokeLinecap="round"
              >
                {initials}
              </text>
            </g>
            <circle ref={needleRef} r="4" cx="0" cy="130" fill="#FFD6A1" opacity="0" />

            <text x="200" y="224" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" letterSpacing="3" fill="rgba(255,250,240,0.4)">
              STITCHED BY YOU
            </text>
          </svg>
        </div>
      </div>
    </section>
  );
}
