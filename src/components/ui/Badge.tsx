"use client";

import { motion } from "framer-motion";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent" | "outline";
  pulse?: boolean;
}

export function Badge({
  children,
  className = "",
  variant = "default",
  pulse = false,
}: BadgeProps) {
  const variants = {
    default: "bg-[#161310] text-[rgba(255,250,240,0.8)] border-[rgba(255,250,240,0.14)]",
    accent: "bg-[#C96F4A]/15 text-[#FFD6A1] border-[#C96F4A]/40",
    outline: "bg-transparent text-[rgba(255,250,240,0.6)] border-[rgba(255,250,240,0.14)]",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-mono font-medium tracking-wide ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.04 }}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C96F4A] opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C96F4A]" />
        </span>
      )}
      {children}
    </motion.span>
  );
}
