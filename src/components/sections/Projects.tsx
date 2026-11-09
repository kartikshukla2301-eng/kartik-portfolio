"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { ExternalLink, ArrowUpRight, Lock, Sparkles, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, secondaryProjects, ProjectItem, SecondaryProjectItem } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Portfolio of Work"
          title="Flagship Software & AI Products"
          description="High-performance developer tooling, enterprise CSV processing pipelines, and autonomous AI agents architected for real-world reliability."
        />

        {/* Featured Projects Showcase */}
        <div className="mb-20 space-y-12">
          {projects.map((project, i) => (
            <ProjectShowcase key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Additional Engineering Work */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(255,250,240,0.1)] pb-4">
            <div>
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#C96F4A]">
                LABS // EXPERIMENTS & TOOLING
              </span>
              <h3
                className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#F6F0E2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Additional Engineering Work
              </h3>
            </div>
            <span className="font-mono text-xs text-[rgba(255,250,240,0.5)]">
              Embedded systems, chatbots & utility engines
            </span>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <SecondaryProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectShowcase({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const posX = ((e.clientX - rect.left) / rect.width) * 100;
    const posY = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mouse-x", `${posX}%`);
    ref.current.style.setProperty("--mouse-y", `${posY}%`);
  }, []);

  const specNumber = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      className="court-card group relative overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.14)] bg-[#12100D]/95 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/50"
    >
      {/* Dynamic cursor glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(201, 111, 74, 0.16), transparent 60%)",
        }}
      />

      {/* Infinity Socks top browser frame simulation */}
      <div className="flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] bg-[#0B0A08]/80 px-6 py-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#C96F4A]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFD6A1]/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-[rgba(255,250,240,0.2)]" />
          <span className="ml-3 tracking-widest text-[rgba(255,250,240,0.45)]">
            {`SPEC ${specNumber} // ${project.title.toUpperCase().replace(/\s+/g, "-")}.DEV`}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-[#FFD6A1]">
          <Terminal size={12} className="text-[#C96F4A]" />
          <span className="tracking-widest">DEPLOYED: PRODUCTION</span>
        </div>
      </div>

      <div className="p-8 sm:p-11 relative z-10">
        {/* Flagship status & title */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2.5 font-mono text-xs">
              <span className="tracking-widest text-[#C96F4A] uppercase font-semibold">
                FLAGSHIP {specNumber}
              </span>
              {project.status && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#C96F4A]/15 border border-[#C96F4A]/30 px-2.5 py-0.5 text-[10px] tracking-wider text-[#FFD6A1]">
                  <Sparkles size={10} />
                  {project.status}
                </span>
              )}
            </div>
            <h3
              className="text-2xl sm:text-4xl font-bold tracking-tight text-[#F6F0E2] transition-colors group-hover:text-[#FFD6A1]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
          </div>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] bg-[#161310] text-[rgba(255,250,240,0.6)] transition-all duration-300 group-hover:border-[#C96F4A] group-hover:text-[#FFD6A1] group-hover:scale-110"
              aria-label={`Open ${project.title} live preview`}
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="mb-8 text-sm sm:text-base leading-relaxed text-[rgba(255,250,240,0.7)] font-sans max-w-4xl">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[rgba(255,250,240,0.1)] bg-[#161310] px-3 py-1 font-mono text-[11px] text-[rgba(255,250,240,0.75)] transition-colors group-hover:border-[#C96F4A]/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center gap-4 border-t border-[rgba(255,250,240,0.08)] pt-6">
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-infinity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ExternalLink size={14} />
              <span>LAUNCH LIVE DEMO</span>
              <span className="btn-infinity-arrow">→</span>
            </motion.a>
          )}

          {project.repo ? (
            <motion.a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-infinity-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GithubIcon width={14} height={14} />
              <span>SOURCE REPO</span>
            </motion.a>
          ) : (
            <span className="flex items-center gap-2 rounded-full border border-[rgba(255,250,240,0.1)] bg-[#161310] px-4 py-2 font-mono text-xs text-[rgba(255,250,240,0.4)]">
              <Lock size={12} className="text-[#C96F4A]" />
              PROPRIETARY / ENTERPRISE
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function SecondaryProjectCard({
  project,
  index,
}: {
  project: SecondaryProjectItem;
  index: number;
}) {
  const indexStr = String(index + 1).padStart(2, "0");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="court-card group flex flex-col justify-between rounded-xl p-6 border border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/40 hover:-translate-y-1"
    >
      <div>
        <div className="mb-3 flex items-start justify-between gap-2">
          <span className="font-mono text-[10px] tracking-widest text-[#C96F4A]">
            {`LAB ${indexStr} //`}
          </span>
          {project.isPrivate ? (
            <span
              className="flex items-center gap-1 rounded bg-[#C96F4A]/10 border border-[#C96F4A]/25 px-2 py-0.5 font-mono text-[10px] text-[#FFD6A1]"
              title="Private Repository"
            >
              <Lock size={10} />
              RESTRICTED
            </span>
          ) : project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="text-[rgba(255,250,240,0.4)] transition-colors hover:text-[#FFD6A1]"
            >
              <GithubIcon size={14} />
            </a>
          ) : null}
        </div>

        <h4 className="mb-2 text-base font-bold tracking-tight text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors">
          {project.title}
        </h4>

        <p className="mb-4 text-xs leading-relaxed text-[rgba(255,250,240,0.6)] font-sans">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[rgba(255,250,240,0.08)]">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[rgba(255,250,240,0.08)] bg-[#161310] px-2 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.65)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
