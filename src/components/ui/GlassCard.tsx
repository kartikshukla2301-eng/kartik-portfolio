"use client";

import { motion } from "framer-motion";
import { type ReactNode, useRef, useCallback } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: string;
}

export function GlassCard({
  children,
  className = "",
  tilt = false,
  glow,
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tilt || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const posX = ((e.clientX - rect.left) / rect.width) * 100;
      const posY = ((e.clientY - rect.top) / rect.height) * 100;

      cardRef.current.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) scale3d(1.01, 1.01, 1.01)`;
      cardRef.current.style.setProperty("--mouse-x", `${posX}%`);
      cardRef.current.style.setProperty("--mouse-y", `${posY}%`);
    },
    [tilt]
  );

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
  }, []);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`premium-card glass relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${className}`}
      style={{
        boxShadow: glow || undefined,
        willChange: tilt ? "transform" : "auto",
      }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {/* Dynamic cursor glow via CSS variable */}
      {tilt && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 92, 255, 0.08), transparent 60%)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
