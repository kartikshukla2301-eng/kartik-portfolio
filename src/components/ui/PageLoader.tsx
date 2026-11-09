"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo } from "react";
import { siteConfig } from "@/lib/data";

interface PageLoaderProps {
  onEnter: () => void;
}

function FloatingParticle({ index }: { index: number }) {
  const style = useMemo(() => {
    const seed = index * 137.508;
    return {
      left: `${(seed * 7.3) % 100}%`,
      top: `${(seed * 11.7) % 100}%`,
      width: `${2 + (seed % 3)}px`,
      height: `${2 + (seed % 3)}px`,
      animationDelay: `${seed % 5}s`,
      animationDuration: `${6 + (seed % 8)}s`,
    };
  }, [index]);

  return (
    <div
      className="particle absolute rounded-full"
      style={style}
    />
  );
}

export function PageLoader({ onEnter }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const name = siteConfig.name;
  const nameChars = name.split("");

  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 700);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={
            exiting
              ? { opacity: 0, scale: 1.04, filter: "blur(14px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#FAFAFC]"
        >
          {/* Aurora background */}
          <div className="intro-aurora absolute inset-0 pointer-events-none">
            <div className="intro-aurora-blob intro-aurora-blob-1" />
            <div className="intro-aurora-blob intro-aurora-blob-2" />
            <div className="intro-aurora-blob intro-aurora-blob-3" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
              <FloatingParticle key={i} index={i} />
            ))}
          </div>

          {/* Grid lines */}
          <div className="intro-grid pointer-events-none absolute inset-0" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center">
            {/* Name — letter by letter */}
            <div className="overflow-hidden">
              <h1
                className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-[#0F172A]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="intro-name-char inline-block"
                    initial={{ y: 80, opacity: 0, rotateX: -60 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + i * 0.04,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + nameChars.length * 0.04 + 0.15,
              }}
              className="text-center"
            >
              <p className="text-base sm:text-lg md:text-xl font-medium text-[#475569]">
                <span className="font-semibold text-[#4F46E5]">Full Stack Developer</span>
                <span className="mx-3 text-[#CBD5E1]">&bull;</span>
                <span className="font-semibold text-[#0D9488]">AI Engineer</span>
              </p>
            </motion.div>

            {/* Loading line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 + nameChars.length * 0.04 + 0.35 }}
              className="w-56 overflow-hidden sm:w-64"
            >
              <div className="h-1 w-full rounded-full bg-[#E2E8F0]">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: 1.1,
                    delay: 0.15 + nameChars.length * 0.04 + 0.45,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet"
                />
              </div>
            </motion.div>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + nameChars.length * 0.04 + 0.85,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={handleEnter}
              className="intro-enter-btn group relative overflow-hidden rounded-full px-10 py-4 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-95 cursor-pointer text-[#0F172A]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Enter Portfolio
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[#0D9488] font-bold"
                >
                  &rarr;
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Corner accents */}
          <div className="absolute bottom-6 left-6 text-xs font-medium tracking-wider text-[#94A3B8]">
            Kartik Shukla &bull; Portfolio
          </div>
          <div className="absolute bottom-6 right-6 text-xs font-medium tracking-wider text-[#94A3B8]">
            AKTU CSE &bull; 2023–2027
          </div>

          {/* Top-left decorative line */}
          <div className="absolute left-0 top-12 h-px w-24 bg-gradient-to-r from-accent-violet/40 to-transparent" />
          <div className="absolute left-12 top-0 h-24 w-px bg-gradient-to-b from-accent-violet/40 to-transparent" />

          {/* Bottom-right decorative line */}
          <div className="absolute bottom-0 right-0 h-px w-24 bg-gradient-to-l from-accent-cyan/40 to-transparent" />
          <div className="absolute bottom-12 right-0 h-24 w-px bg-gradient-to-t from-accent-cyan/40 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
