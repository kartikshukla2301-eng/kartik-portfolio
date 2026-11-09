"use client";

export function CyberGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Precision Dot Matrix Grid */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(rgba(124, 92, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
          backgroundPosition: "0 0",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0, 0, 0, 0.9) 0%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 50% 40%, rgba(0, 0, 0, 0.9) 0%, transparent 85%)",
        }}
      />

      {/* Cybernetic Accent Guide Lines */}
      <div className="absolute left-8 md:left-16 inset-y-0 w-px bg-gradient-to-b from-transparent via-accent-violet/10 to-transparent" />
      <div className="absolute right-8 md:right-16 inset-y-0 w-px bg-gradient-to-b from-transparent via-accent-cyan/10 to-transparent" />

      {/* Top Horizon Ambient Glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent-violet/30 to-transparent" />
    </div>
  );
}
