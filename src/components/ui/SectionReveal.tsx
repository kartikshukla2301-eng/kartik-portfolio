"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
  parallax?: boolean;
  parallaxOffset?: number;
  glow?: boolean;
}

export function SectionReveal({
  children,
  className = "",
  id,
  delay = 0,
  direction = "up",
  parallax = false,
  parallaxOffset = 60,
  glow = false,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(
    scrollYProgress,
    [0, 1],
    [parallaxOffset, -parallaxOffset]
  );

  const directionMap = {
    up: { x: 0, y: 50 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
    scale: { x: 0, y: 0 },
  };

  const initial = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{
        opacity: 0,
        x: initial.x,
        y: initial.y,
        scale: direction === "scale" ? 0.95 : 1,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{
        y: parallax ? parallaxY : undefined,
      }}
      className={className}
    >
      {/* Optional glow behind section */}
      {glow && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: delay + 0.3 }}
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-violet/5 blur-[100px]" />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}
