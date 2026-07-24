"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";

const INTRO_SESSION_KEY = "portfolio-intro-seen";

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
      animationDelay: `${(seed % 5)}s`,
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
  const name = "Kartik Shukla";
  const nameChars = name.split("");
  const hasInitialized = useRef(false);

  // Check session on mount
  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    const seen = sessionStorage.getItem(INTRO_SESSION_KEY);
    if (seen) {
      setVisible(false);
      onEnter();
    }
  }, [onEnter]);

  const handleEnter = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      sessionStorage.setItem(INTRO_SESSION_KEY, "true");
      setVisible(false);
      onEnter();
    }, 800);
  }, [onEnter]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={exiting ? { opacity: 0, scale: 1.05, filter: "blur(20px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[#030303]"
        >
          {/* Aurora background */}
          <div className="intro-aurora absolute inset-0">
            <div className="intro-aurora-blob intro-aurora-blob-1" />
            <div className="intro-aurora-blob intro-aurora-blob-2" />
            <div className="intro-aurora-blob intro-aurora-blob-3" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 40 }).map((_, i) => (
              <FloatingParticle key={i} index={i} />
            ))}
          </div>

          {/* Noise overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />

          {/* Grid lines */}
          <div className="intro-grid pointer-events-none absolute inset-0" />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center gap-8 px-4">
            {/* Name — letter by letter */}
            <div className="overflow-hidden">
              <h1
                className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="intro-name-char inline-block"
                    initial={{ y: 80, opacity: 0, rotateX: -60 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.3 + i * 0.05,
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
              transition={{ duration: 0.6, delay: 0.3 + nameChars.length * 0.05 + 0.2 }}
              className="text-center"
            >
              <p className="text-lg text-white/50 sm:text-xl md:text-2xl">
                <span className="intro-role-line">AI Engineer</span>
                <span className="mx-3 text-accent-violet/40">&</span>
                <span className="intro-role-line">Full Stack Developer</span>
              </p>
            </motion.div>

            {/* Loading line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + nameChars.length * 0.05 + 0.6 }}
              className="w-56 overflow-hidden sm:w-64"
            >
              <div className="h-px w-full bg-white/[0.06]">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{
                    duration: 1.5,
                    delay: 0.3 + nameChars.length * 0.05 + 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="h-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet"
                />
              </div>
            </motion.div>

            {/* Enter button */}
            <motion.button
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + nameChars.length * 0.05 + 1.4,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={handleEnter}
              className="intro-enter-btn group relative overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-10 py-4 text-sm font-medium tracking-wide text-white/70 backdrop-blur-xl transition-all duration-500 hover:border-accent-violet/30 hover:bg-white/[0.06] hover:text-white hover:shadow-[0_0_40px_rgba(124,92,255,0.15)]"
            >
              {/* Button glow on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-accent-violet/0 via-accent-violet/5 to-accent-cyan/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-3">
                Enter Portfolio
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-accent-violet"
                >
                  &rarr;
                </motion.span>
              </span>
            </motion.button>
          </div>

          {/* Corner accents */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-6 left-6 text-[10px] tracking-wider text-white/15"
          >
            Portfolio 2026
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="absolute bottom-6 right-6 text-[10px] tracking-wider text-white/15"
          >
            kartikshukla.dev
          </motion.div>

          {/* Top-left decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="absolute left-0 top-12 h-px w-24 origin-left bg-gradient-to-r from-accent-violet/30 to-transparent"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="absolute left-12 top-0 h-24 w-px origin-top bg-gradient-to-b from-accent-violet/30 to-transparent"
          />

          {/* Bottom-right decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="absolute bottom-0 right-0 h-px w-24 origin-right bg-gradient-to-l from-accent-cyan/30 to-transparent"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
            className="absolute bottom-12 right-0 h-24 w-px origin-bottom bg-gradient-to-t from-accent-cyan/30 to-transparent"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
