"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const posX = ((e.clientX - rect.left) / rect.width) * 100;
    const posY = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty("--mouse-x", `${posX}%`);
    cardRef.current.style.setProperty("--mouse-y", `${posY}%`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className="premium-card glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-300"
      onMouseMove={handleMouseMove}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 0 30px rgba(124, 92, 255, 0.1)",
      }}
    >
      {/* Dynamic glow following cursor via CSS variable */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 92, 255, 0.08), transparent 60%)",
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
          {skill.items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:border-accent-violet/30 hover:bg-accent-violet/10 hover:text-accent-violet hover:shadow-[0_0_10px_rgba(124,92,255,0.15)]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
