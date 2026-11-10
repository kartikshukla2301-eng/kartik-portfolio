"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, motionDisabled } from "@/lib/gsap";

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

interface MotionContextValue {
  scrollTo: (target: string | number | HTMLElement, options?: ScrollToOptions) => void;
  stop: () => void;
  start: () => void;
}

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion(): MotionContextValue {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error("useMotion must be used inside <MotionProvider>");
  return ctx;
}

/**
 * The single scroll engine: Lenis drives the scroll position, GSAP's ticker drives Lenis,
 * and ScrollTrigger listens to Lenis. On touch devices Lenis keeps native scrolling.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (motionDisabled()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      autoRaf: false,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // "Pause motion" toggle: stop smoothing immediately when it is switched on.
    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("is-motion-paused")) lenis.stop();
      else lenis.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback<MotionContextValue["scrollTo"]>((target, options = {}) => {
    const { offset = 0, duration, immediate } = options;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset, duration, immediate });
      return;
    }
    // Native fallback (reduced motion, or before Lenis mounted).
    let top = 0;
    if (typeof target === "number") top = target;
    else {
      const el = typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
      if (!el) return;
      top = el.getBoundingClientRect().top + window.scrollY;
    }
    window.scrollTo({ top: top + offset, behavior: immediate || motionDisabled() ? "auto" : "smooth" });
  }, []);

  const value = useMemo<MotionContextValue>(
    () => ({
      scrollTo,
      stop: () => lenisRef.current?.stop(),
      start: () => lenisRef.current?.start(),
    }),
    [scrollTo]
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
