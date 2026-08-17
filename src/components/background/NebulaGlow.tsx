"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function NebulaGlow() {
  const reducedMotion = useReducedMotion();
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const update = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(update);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Deep Ambient Nebula Orbs */}
      <div className="absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.12)_0%,transparent_70%)] blur-[120px] animate-float" />
      <div className="absolute top-1/3 -right-32 h-[550px] w-[550px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.08)_0%,transparent_70%)] blur-[130px] animate-float" style={{ animationDelay: "2s", animationDuration: "6s" }} />
      <div className="absolute -bottom-40 left-1/3 h-[650px] w-[650px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.09)_0%,transparent_70%)] blur-[140px] animate-float" style={{ animationDelay: "4s", animationDuration: "7s" }} />
      <div className="absolute top-2/3 left-10 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,184,107,0.04)_0%,transparent_70%)] blur-[100px]" />

      {/* Interactive Cursor Spotlight Glow */}
      {!reducedMotion && (
        <div
          ref={spotlightRef}
          className="absolute left-0 top-0 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.08)_0%,rgba(34,211,238,0.03)_35%,transparent_70%)] blur-[80px] will-change-transform"
        />
      )}
    </div>
  );
}
