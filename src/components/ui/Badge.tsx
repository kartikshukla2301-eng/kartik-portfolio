import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "purple" | "cyan" | "outline" | "active";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "outline",
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border";

  const variants = {
    purple:
      "border-primary/20 bg-primary/5 text-primary-light text-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.05)]",
    cyan:
      "border-secondary/20 bg-secondary/5 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.05)]",
    outline: "border-white/10 bg-white/[0.02] text-white/70",
    active:
      "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 font-medium",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {variant === "active" && (
        <span className="relative flex h-2 w-2 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
      )}
      {children}
    </span>
  );
};
