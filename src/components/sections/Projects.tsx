"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { projects, secondaryProjects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Work"
          title="Featured Projects"
          description="AI-powered products and full-stack applications I've built from concept to deployment."
        />

        {/* Featured Projects */}
        <div className="mb-12 space-y-8">
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
          <h3
            className="mb-6 text-lg font-semibold text-white/80"
            style={{ fontFamily: "var(--font-display)" }}
          >
            More Projects
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="premium-card glass group cursor-default rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.06]"
              >
                <h4 className="mb-2 text-sm font-semibold text-white">
                  {project.title}
                </h4>
                <p className="mb-3 text-xs leading-relaxed text-white/40">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-[10px]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.div>
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
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      className="premium-card glass group relative overflow-hidden rounded-2xl p-8 transition-all duration-500"
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(124, 92, 255, 0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Project number & title */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <span className="mb-3 block font-display text-[10px] font-bold tracking-[0.2em] text-accent-violet/50 uppercase">
              Project {String(index + 1).padStart(2, "0")}
            </span>
            <h3
              className="text-2xl font-bold tracking-tight text-white transition-all group-hover:text-gradient sm:text-[1.65rem]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {project.title}
            </h3>
          </div>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-white/15 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-violet"
          />
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-[1.7] text-white/45">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mb-7 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <motion.a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-xs font-medium text-white/60 transition-all duration-300 hover:border-accent-violet/30 hover:bg-white/[0.06] hover:text-accent-violet"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <GithubIcon width={14} height={14} />
            Code
          </motion.a>
          {project.live && (
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-accent-violet px-5 py-2.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(124,92,255,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(124,92,255,0.35)]"
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
