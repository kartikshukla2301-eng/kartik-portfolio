"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let isTabVisible = !document.hidden;

    const resize = () => {
      // Downsample slightly for background blur efficiency (saves ~50% GPU fillrate)
      const scale = 0.5;
      canvas.width = Math.floor(window.innerWidth * scale);
      canvas.height = Math.floor(window.innerHeight * scale);
    };
    resize();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(draw);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const draw = () => {
      if (!isTabVisible) return;

      time += 0.002;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Gradient 1
      const g1 = ctx.createRadialGradient(
        w * (0.3 + Math.sin(time) * 0.08),
        h * (0.4 + Math.cos(time * 0.7) * 0.08),
        0,
        w * 0.3,
        h * 0.4,
        w * 0.45
      );
      g1.addColorStop(0, "rgba(124, 92, 255, 0.07)");
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      // Gradient 2
      const g2 = ctx.createRadialGradient(
        w * (0.7 + Math.cos(time * 0.8) * 0.08),
        h * (0.3 + Math.sin(time * 0.6) * 0.08),
        0,
        w * 0.7,
        h * 0.3,
        w * 0.35
      );
      g2.addColorStop(0, "rgba(34, 211, 238, 0.05)");
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimer);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-80"
      aria-hidden="true"
    />
  );
}
