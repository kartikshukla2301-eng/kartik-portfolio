"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { ShowCard } from "@/components/ui/ShowCard";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CountUp } from "@/components/motion/CountUp";
import { useContent } from "@/components/providers/ContentProvider";

export function Projects() {
  const { projects, secondaryProjects } = useContent();
  return (
    <section id="projects" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Products I built and shipped"
          description="AI-powered tools, data pipelines and full stack platforms. Each one is live, with source where it is public."
        />

        <div className="mb-20 grid gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ShowCard key={project.id} label={`${String(i + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`}>
              <div className="grid gap-6 p-6 sm:p-9 lg:grid-cols-[auto_1fr] lg:gap-12">
                <div className="flex items-start justify-between gap-4 lg:block">
                  <div className="font-display text-[clamp(4.5rem,12vw,9rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(246,240,226,0.45)]">
                    <CountUp value={i + 1} pad={2} duration={1} />
                  </div>
                  {project.status && (
                    <span className="mt-0 inline-block rounded-full border border-[#C96F4A]/40 bg-[#C96F4A]/12 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#FFD6A1] lg:mt-4">
                      {project.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-col">
                  <SplitReveal
                    as="h3"
                    by="words"
                    className="font-display text-[clamp(2.4rem,5.2vw,4.5rem)] uppercase leading-[0.92] text-[#F6F0E2]"
                  >
                    {project.title}
                  </SplitReveal>

                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[rgba(255,250,240,0.7)] sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-[rgba(255,250,240,0.1)] bg-[#161310] px-3 py-1 font-mono text-[11px] text-[rgba(255,250,240,0.75)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3 border-t border-[rgba(255,250,240,0.08)] pt-6">
                    {project.live && (
                      <InfinityButton href={project.live} variant="terra" withArrow target="_blank">
                        Live demo
                      </InfinityButton>
                    )}
                    {project.repo ? (
                      <InfinityButton href={project.repo} variant="ghost" withArrow={false} target="_blank">
                        <span className="flex items-center gap-2">
                          <GithubIcon size={14} />
                          Source
                        </span>
                      </InfinityButton>
                    ) : (
                      <span className="flex items-center gap-2 font-mono text-xs text-[rgba(255,250,240,0.45)]">
                        <Lock size={12} className="text-[#C96F4A]" />
                        Private repository
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </ShowCard>
          ))}
        </div>

        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-[rgba(255,250,240,0.1)] pb-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#C96F4A]">[ Labs ]</p>
            <h3 className="mt-1 font-display text-3xl uppercase text-[#F6F0E2] sm:text-4xl">More experiments</h3>
          </div>
          <span className="font-mono text-xs text-[rgba(255,250,240,0.45)]">Embedded systems, chatbots, agents</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondaryProjects.map((project, i) => (
            <ShowCard key={project.id} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-[#C96F4A]">
                      {`LAB ${String(i + 1).padStart(2, "0")} //`}
                    </span>
                    {project.isPrivate ? (
                      <span className="flex items-center gap-1 rounded border border-[#C96F4A]/25 bg-[#C96F4A]/10 px-2 py-0.5 font-mono text-[10px] text-[#FFD6A1]">
                        <Lock size={10} />
                        Private
                      </span>
                    ) : project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Source code for ${project.title}`}
                        className="text-[rgba(255,250,240,0.5)] transition-colors hover:text-[#FFD6A1]"
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    ) : null}
                  </div>
                  <h4 className="mb-2 font-display text-2xl uppercase leading-none text-[#F6F0E2]">{project.title}</h4>
                  <p className="mb-4 text-xs leading-relaxed text-[rgba(255,250,240,0.6)]">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 border-t border-[rgba(255,250,240,0.08)] pt-3">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-[rgba(255,250,240,0.08)] bg-[#161310] px-2 py-0.5 font-mono text-[10px] text-[rgba(255,250,240,0.65)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ShowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
