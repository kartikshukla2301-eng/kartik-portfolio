"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { siteConfig } from "@/lib/data";

interface PageLoaderProps {
  onEnter: () => void;
}

export function PageLoader({ onEnter }: PageLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [motionPaused, setMotionPaused] = useState(false);

  const name = siteConfig.name.toUpperCase();
  const nameChars = name.split("");

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 600);
  }, [exiting, onEnter]);

  // Smooth progress counter from 0 to 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 8) + 4;
        return next > 100 ? 100 : next;
      });
    }, 55);

    return () => clearInterval(interval);
  }, []);

  // Motion pause handler (mirrors Infinity Socks data-motion-toggle)
  const toggleMotion = () => {
    setMotionPaused((prev) => {
      const next = !prev;
      if (next) {
        document.body.classList.add("is-motion-paused");
      } else {
        document.body.classList.remove("is-motion-paused");
      }
      return next;
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="infinity-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={
            exiting
              ? { opacity: 0, scale: 1.02, filter: "blur(10px)" }
              : { opacity: 1, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="fixed inset-0 z-[200] flex flex-col justify-between overflow-hidden bg-[#0B0A08] p-6 sm:p-10 text-[rgba(255,250,240,0.85)] font-mono selection:bg-[#C96F4A]"
        >
          {/* Subtle warm court background glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(201,111,74,0.08)_0%,transparent_65%)]" />

          {/* Top Bar: Brand + Controls */}
          <div className="relative z-10 flex items-center justify-between text-xs tracking-wider uppercase">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#C96F4A]">KS™</span>
              <span className="text-[rgba(255,250,240,0.35)]">/</span>
              <span className="text-[rgba(255,250,240,0.6)]">DEVELOPER ATELIER</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                type="button"
                onClick={toggleMotion}
                className="transition-colors hover:text-[#C96F4A] cursor-pointer"
                aria-pressed={motionPaused}
              >
                [{motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}]
              </button>

              <button
                type="button"
                onClick={handleEnter}
                className="font-bold text-[#FFD6A1] transition-colors hover:text-white cursor-pointer"
                aria-label="Skip loader"
              >
                [ SKIP ]
              </button>
            </div>
          </div>

          {/* Center Stage: Title + Progress HUD */}
          <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
            {/* Monospace Subtitle Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,250,240,0.14)] bg-[#12100D] px-3.5 py-1 text-[10px] tracking-[0.2em] text-[#C96F4A]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
              FULL STACK DEVELOPER // AI ENGINEER
            </motion.div>

            {/* Giant Editorial Title */}
            <div className="overflow-hidden mb-6">
              <h1
                className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[rgba(255,250,240,0.95)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {nameChars.map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.1 + i * 0.03,
                      ease: [0.2, 0.8, 0.2, 1],
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Loading Indicator & Percentage */}
            <div className="w-full max-w-md">
              <div className="mb-2 flex items-center justify-between text-xs text-[rgba(255,250,240,0.45)]">
                <span>INITIALIZING HARDWOOD SYSTEMS</span>
                <span className="font-bold text-[#FFD6A1]">{progress}%</span>
              </div>

              {/* Progress bar line */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-[rgba(255,250,240,0.08)]">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#C96F4A] via-[#FFD6A1] to-[#C96F4A]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Enter Button (Enabled when loading finishes or available) */}
            <div className="mt-8">
              <motion.button
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: progress >= 60 ? 1 : 0.4, y: 0 }}
                onClick={handleEnter}
                className="btn-infinity text-xs font-semibold uppercase tracking-wider"
              >
                Enter Portfolio &rarr;
              </motion.button>
            </div>
          </div>

          {/* Bottom Bar: Coordinates + Status */}
          <div className="relative z-10 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-[11px] text-[rgba(255,250,240,0.4)]">
            <div>
              <span>AKTU CSE // 2023–2027</span>
              <span className="mx-2 text-[rgba(255,250,240,0.2)]">•</span>
              <span>CGPA: 7.9/10</span>
            </div>

            <div className="text-right">
              <span>LAT 26.8467° N, LONG 80.9462° E</span>
              <span className="mx-2 text-[rgba(255,250,240,0.2)]">•</span>
              <span className="text-[#C96F4A]">STATUS: READY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
