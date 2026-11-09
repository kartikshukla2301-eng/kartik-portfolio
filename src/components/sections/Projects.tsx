"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useCallback } from "react";
import { ExternalLink, ArrowUpRight, Lock, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects, secondaryProjects, ProjectItem, SecondaryProjectItem } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          description="AI-powered products, developer platforms, and full-stack applications engineered for performance and reliability."
        />

        {/* Featured Projects */}
        <div className="mb-14 space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Secondary Projects */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h3
              className="text-lg font-bold tracking-tight text-white/90"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Additional Engineering Work
            </h3>
            <span className="text-xs text-white/40">
              Embedded systems, chatbots & tooling
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <SecondaryProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      onMouseMove={handleMouseMove}
      className="premium-card glass group relative overflow-hidden rounded-2xl p-7 md:p-9 transition-all duration-300"
    >
      {/* Hover glow via CSS variable */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(124, 92, 255, 0.12), transparent 60%)",
        }}
      />

      <div className="relative z-10">
        {/* Project number, flagship status & title */}
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="font-display text-[11px] font-bold tracking-[0.2em] text-accent-violet uppercase">
                Project {String(index + 1).padStart(2, "0")}
              </span>
              {project.status && (
                <Badge variant="accent" pulse={project.status.includes("Flagship")} className="text-[10px]">
                  <Sparkles size={11} className="mr-0.5" />
                  {project.status}
                </Badge>
              )}
            </div>
            <h3
              className="text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-accent-cyan sm:text-[1.65rem]"
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
              className="text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-violet"
              aria-label={`Open ${project.title} live preview`}
            >
              <ArrowUpRight size={20} />
            </a>
          )}
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-[1.7] text-white/50">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-7 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {project.repo ? (
            <motion.a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-semibold text-white/80 transition-all duration-300 hover:border-accent-violet/40 hover:bg-white/[0.08] hover:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <GithubIcon width={14} height={14} />
              View Code
            </motion.a>
          ) : (
            <span className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-medium text-white/40">
              <Lock size={12} />
              Private Repository
            </span>
          )}

          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-accent-violet px-5 py-2.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(124,92,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,92,255,0.45)] hover:bg-accent-violet/90"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="premium-card glass group flex flex-col justify-between rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      <div>
        <div className="mb-2 flex items-start justify-between gap-2">
          <h4 className="text-sm font-bold tracking-tight text-white">
            {project.title}
          </h4>
          {project.isPrivate ? (
            <span
              className="flex items-center gap-1 rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-medium text-amber-400"
              title="Private Repository"
            >
              <Lock size={10} />
              Private
            </span>
          ) : project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repo for ${project.title}`}
              className="text-white/40 transition-colors hover:text-accent-violet"
            >
              <GithubIcon size={14} />
            </a>
          ) : null}
        </div>

        <p className="mb-4 text-xs leading-relaxed text-white/45">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.06]">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="outline" className="text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
