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

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onEnter();
    }, 750);
  }, [exiting, onEnter]);

  // Smooth progress counter from 0 to 100
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            handleEnter();
          }, 350);
          return 100;
        }
        const step = Math.floor(Math.random() * 6) + 3;
        const next = prev + step;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [handleEnter]);

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
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] overflow-hidden bg-[#0B0A08] text-[rgba(255,250,240,0.88)] font-mono selection:bg-[#C96F4A]"
        >
          {/* Staggered block curtain on exit */}
          <div className="loader-block-grid pointer-events-none" aria-hidden="true">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`loader-block-item ${exiting ? "is-exiting" : ""}`}
                style={{
                  transitionDelay: `${(i % 4) * 0.08 + Math.floor(i / 4) * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Background Ambient Court Glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,111,74,0.12)_0%,transparent_65%)]" />

          {/* Huge Architectural Digit in Background */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04] select-none" aria-hidden="true">
            <span
              className="text-[35vw] font-black uppercase text-white leading-none"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {progress}
            </span>
          </div>

          {/* Top Bar: Controls */}
          <div className="relative z-10 flex items-center justify-between p-6 sm:p-10 text-xs tracking-wider uppercase">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#C96F4A]" />
              <span className="font-bold text-[#FFD6A1]">KS™</span>
              <span className="text-[rgba(255,250,240,0.35)]">/</span>
              <span className="text-[rgba(255,250,240,0.6)]">DEVELOPER ATELIER</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <button
                type="button"
                onClick={toggleMotion}
                className="rounded-full border border-[rgba(255,250,240,0.14)] px-3 py-1 text-[rgba(255,250,240,0.6)] transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1] cursor-pointer"
                aria-pressed={motionPaused}
              >
                [{motionPaused ? "RESUME MOTION" : "PAUSE MOTION"}]
              </button>

              <button
                type="button"
                onClick={handleEnter}
                className="rounded-full border border-[rgba(255,250,240,0.2)] bg-[#12100D] px-4 py-1 font-bold text-[#FFD6A1] transition-all hover:border-[#C96F4A] hover:bg-[#C96F4A] hover:text-[#0B0A08] cursor-pointer"
                aria-label="Skip loader"
              >
                [ SKIP ]
              </button>
            </div>
          </div>

          {/* Center Title Display */}
          <div className="relative z-10 flex h-[60vh] flex-col items-center justify-center text-center px-4">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(255,250,240,0.14)] bg-[#12100D] px-4 py-1 text-[11px] tracking-[0.2em] text-[#C96F4A] uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
              <span>FULL STACK DEVELOPER & AI SYSTEMS ARCHITECT</span>
            </div>

            <h1
              className="text-4xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#F6F0E2]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.name}
            </h1>

            <p className="mt-4 max-w-xl text-xs sm:text-sm text-[rgba(255,250,240,0.6)] leading-relaxed">
              Tested on production healthcare platforms. Architected with high-throughput microservices and generative AI models.
            </p>
          </div>

          {/* Bottom Left Telemetry HUD matching Infinity Socks (.loader__ui) */}
          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-10 z-10 flex flex-col sm:flex-row items-baseline gap-4 sm:gap-6 text-xs text-[rgba(255,250,240,0.6)]">
            <div className="flex items-center gap-3">
              <span className="font-bold text-3xl sm:text-4xl text-[#FFFFFF] font-mono tracking-tight">
                {progress}%
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#C96F4A]">
                SYSTEMS BOOT
              </span>
            </div>

            {/* 1px Progress Bar matching Infinity Socks */}
            <div className="relative h-px w-36 sm:w-56 bg-[rgba(255,250,240,0.18)] self-center">
              <div
                className="absolute left-0 top-0 h-full bg-[#C96F4A] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-[10px] tracking-widest text-[rgba(255,250,240,0.4)] uppercase">
              IND // 28.61° N • TELEMETRY ACTIVE
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
