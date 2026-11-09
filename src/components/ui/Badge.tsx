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
    default: "bg-white/5 text-white/80 border-white/10",
    accent: "bg-accent-violet/15 text-accent-violet border-accent-violet/30",
    outline: "bg-transparent text-white/60 border-white/15",
  };

  return (
    <motion.span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-cyan opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-cyan" />
        </span>
      )}
      {children}
    </motion.span>
  );
}
