"use client";

import { motion } from "framer-motion";
import { type ReactNode, useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "translate(0px, 0px)";
    }
  };

  const createRipple = useCallback((e: React.MouseEvent) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    createRipple(e);
    onClick?.();
  };

  const baseClass =
    variant === "primary"
      ? "bg-accent-violet text-white hover:shadow-[0_0_30px_rgba(124,92,255,0.4)]"
      : "glass text-white glass-hover";

  const Tag = href ? "a" : "button";
  const extraProps = href ? { href } : { onClick: handleClick };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Tag
        ref={ref as never}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`ripple-container relative inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-medium text-sm transition-all duration-300 ${baseClass} ${className}`}
        {...extraProps}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
