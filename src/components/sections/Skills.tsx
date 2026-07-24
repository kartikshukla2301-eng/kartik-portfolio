"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Monitor,
  Server,
  Sparkles,
  Terminal,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skills } from "@/lib/data";

const iconMap = { Monitor, Server, Sparkles, Terminal };

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Capabilities"
          description="A curated set of technologies I use to build production-grade applications."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <SkillPanel icon={Icon} skill={skill} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillPanel({
  icon: Icon,
  skill,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  skill: (typeof skills)[number];
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      className="premium-card glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 0 40px rgba(124, 92, 255, 0.1)",
      }}
    >
      {/* Dynamic glow following cursor */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 92, 255, 0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-violet/10 text-accent-violet transition-all duration-300 group-hover:bg-accent-violet/20 group-hover:shadow-[0_0_15px_rgba(124,92,255,0.2)]">
            <Icon size={20} />
          </div>
          <h3
            className="text-lg font-semibold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {skill.category}
          </h3>
        </div>

        <div className="flex flex-wrap gap-2">
          {skill.items.map((item, j) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHovered
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0.7, scale: 1 }
              }
              transition={{ duration: 0.3, delay: j * 0.03 }}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-300 hover:border-accent-violet/30 hover:bg-accent-violet/10 hover:text-accent-violet hover:shadow-[0_0_10px_rgba(124,92,255,0.15)]"
            >
              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
