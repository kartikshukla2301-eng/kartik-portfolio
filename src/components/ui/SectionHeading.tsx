"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  gradient?: boolean;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  gradient = true,
  align = "center",
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`mb-14 sm:mb-18 ${align === "center" ? "text-center" : "text-left"}`}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,250,240,0.14)] bg-[#12100D] px-3.5 py-1 font-mono text-[10px] font-semibold tracking-[0.2em] text-[#C96F4A] uppercase"
        >
          <span className="h-1 w-1 rounded-full bg-[#C96F4A]" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`font-display text-3xl font-black uppercase tracking-tight sm:text-4xl md:text-5xl lg:text-6xl ${
          gradient ? "text-gradient" : "text-[rgba(255,250,240,0.95)]"
        }`}
        style={{ fontFamily: "var(--font-display)" }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(255,250,240,0.55)] sm:text-base font-normal"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
