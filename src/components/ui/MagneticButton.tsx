"use client";

import { motion } from "framer-motion";
import { type ReactNode, useRef, useCallback } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "secondary";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
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
      ? "btn-infinity"
      : "btn-infinity-secondary";

  const Tag = href ? "a" : "button";
  const extraProps = href
    ? {
        href,
        target: target || (href.startsWith("http") ? "_blank" : undefined),
        rel: rel || (href.startsWith("http") ? "noopener noreferrer" : undefined),
      }
    : { onClick: handleClick };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Tag
        ref={ref as never}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`ripple-container ${baseClass} ${className}`}
        {...extraProps}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
