"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<
    "default" | "hover" | "text" | "pointer"
  >("default");
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  const fastSpringX = useSpring(mouseX, { stiffness: 800, damping: 35 });
  const fastSpringY = useSpring(mouseY, { stiffness: 800, damping: 35 });

  useEffect(() => {
    if (reducedMotion || typeof window === "undefined") return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']")
      ) {
        setCursorState("pointer");
      } else if (
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("[contenteditable]")
      ) {
        setCursorState("text");
      } else if (target.closest(".glass") || target.closest(".premium-card") || target.closest(".court-card")) {
        setCursorState("hover");
      } else {
        setCursorState("default");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [reducedMotion, mouseX, mouseY]);

  if (reducedMotion) return null;

  const cursorSizes = {
    default: { w: 16, h: 16 },
    hover: { w: 48, h: 48 },
    text: { w: 4, h: 28 },
    pointer: { w: 40, h: 40 },
  };

  const cursorColors = {
    default: "rgba(201, 111, 74, 0.18)",
    hover: "rgba(201, 111, 74, 0.12)",
    text: "rgba(255, 214, 161, 0.8)",
    pointer: "rgba(201, 111, 74, 0.25)",
  };

  const borderColors = {
    default: "rgba(201, 111, 74, 0.45)",
    hover: "rgba(255, 214, 161, 0.6)",
    text: "transparent",
    pointer: "rgba(201, 111, 74, 0.8)",
  };

  const size = cursorSizes[cursorState];

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>

      {/* Outer cursor ring */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          x: springX,
          y: springY,
          width: size.w,
          height: size.h,
          backgroundColor: cursorColors[cursorState],
          borderWidth: cursorState === "text" ? 0 : 1.5,
          borderColor: borderColors[cursorState],
          borderRadius: cursorState === "text" ? "2px" : "50%",
          willChange: "transform",
        }}
        animate={{
          width: size.w,
          height: size.h,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden -translate-x-1/2 -translate-y-1/2 md:block"
        style={{
          x: fastSpringX,
          y: fastSpringY,
          willChange: "transform",
        }}
      >
        <div
          className="h-1.5 w-1.5 rounded-full bg-[#FFD6A1]"
          style={{
            opacity: cursorState === "text" ? 0 : 0.95,
          }}
        />
      </motion.div>
    </>
  );
}
