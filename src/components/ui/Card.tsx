"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glowColor?: "purple" | "cyan" | "none";
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  hoverable = true,
  glowColor = "none",
  ...props
}) => {
  const glowClasses = {
    purple: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    cyan: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    none: "",
  };

  const cardContent = (
    <div
      className={`glass-panel rounded-2xl p-4 min-[360px]:p-6 transition-all duration-300 ${
        hoverable ? "hover:border-white/15 hover:bg-white/[0.04]" : ""
      } ${glowColor !== "none" ? glowClasses[glowColor] : ""} ${className}`}
      {...props}
    >
      {children}
    </div>
  );

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};
