"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download, CheckCircle2, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { certifications, siteConfig } from "@/lib/data";

const credentialMeta: Record<
  string,
  {
    image: string;
    pdf: string;
    category: string;
    displayTitle: string;
    description: string;
  }
> = {
  mongodb: {
    image: "/certificates/mongo.jpeg",
    pdf: "/certificates/mongodb.pdf",
    category: "NOSQL & DISTRIBUTED DATA",
    displayTitle: "MONGODB ATLAS ARCHITECTURE",
    description: "Core concepts, document modeling, sharding, indexes, and aggregation framework verified via Credly.",
  },
  awsGenAI: {
    image: "/certificates/genai.jpeg",
    pdf: "/certificates/genai-aws.pdf",
    category: "CLOUD & FOUNDATIONAL MODELS",
    displayTitle: "AWS GENERATIVE AI FOUNDATIONS",
    description: "Cloud foundation model architectures, prompt engineering, fine-tuning, and enterprise deployment on AWS.",
  },
  claudeCode: {
    image: "/certificates/claude.jpeg",
    pdf: "/certificates/claude-code.pdf",
    category: "AGENTIC AI & LLM WORKFLOWS",
    displayTitle: "CLAUDE CODE AGENTIC SYSTEMS",
    description: "Agentic AI workflows, tool integration, context engineering, and autonomous software delivery pipelines.",
  },
  softpro: {
    image: "/certificates/softpro.jpeg",
    pdf: "/certificates/softpro.pdf",
    category: "FULL STACK ENTERPRISE SYSTEMS",
    displayTitle: "FULL STACK WEB DEVELOPMENT",
    description: "State-level technical workshop organized with AKTU covering enterprise full-stack web engineering.",
  },
};

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="certifications" className="qq relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl w-full" ref={ref}>
        {/* Section Header */}
        <div className="mb-14">
          <SectionHeading
            eyebrow="Accreditation & Credentials"
            title="Verified Document Archive & Cloud Repositories"
            description="Direct access to verified certifications, university credentials, and primary technical documentation stored in the cloud repository."
          />

          <div className="mt-4">
            <ColorFillText
              as="h2"
              dataFill="ghost"
              className="font-display text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F6F0E2]"
            >
              VERIFIED // CREDENTIAL ARCHIVE
            </ColorFillText>
          </div>
        </div>

        {/* Featured Panoramic Resume Dossier Card */}
        <div className="qq__panel group relative mb-14 overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.14)] bg-[#0C0A08] p-8 sm:p-10 transition-all duration-500 hover:border-[#C96F4A]/60 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(201,111,74,0.18)]">
          {/* Burnt Terracotta Accent Strip */}
          <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#C96F4A] via-[#FFD6A1] to-transparent" />

          {/* Background Ambient Spotlight */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(201,111,74,0.12)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-3xl">
              {/* Hairline HUD Kicker */}
              <div className="flex items-center gap-2 mb-3 font-mono text-[11px] tracking-widest text-[#C96F4A] uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                <span>PRIMARY DOSSIER</span>
                <span>{"//"}</span>
                <span className="text-[#FFD6A1]">2026 OFFICIAL EDITION</span>
              </div>

              {/* Oversized Condensed Title */}
              <h3
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                LATEST RESUME — {siteConfig.name}
              </h3>

              <p className="mt-2 text-sm sm:text-base leading-relaxed text-[rgba(255,250,240,0.7)] font-sans max-w-2xl">
                Full Stack Developer & AI Engineer • Production healthcare systems (HIS), clinical oncology pipelines, enterprise IoT Maker Labs, and scalable AI applications.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-xs text-[rgba(255,250,240,0.5)]">
                <span className="rounded border border-[rgba(255,250,240,0.1)] bg-[#14110E] px-2.5 py-1 text-[#FFD6A1]">
                  FORMAT: PDF (308 KB)
                </span>
                <span className="rounded border border-[rgba(255,250,240,0.1)] bg-[#14110E] px-2.5 py-1">
                  STATUS: VERIFIED
                </span>
                <span className="rounded border border-[rgba(255,250,240,0.1)] bg-[#14110E] px-2.5 py-1">
                  LAST UPDATED: 2026
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <InfinityButton
                href="/Kartik_Resume.pdf"
                target="_blank"
                variant="terra"
                withArrow
              >
                VIEW RESUME
              </InfinityButton>

              <InfinityButton
                href="/Kartik_Resume.pdf"
                variant="ghost"
                withArrow={false}
                target="_blank"
              >
                <span className="flex items-center gap-1.5">
                  <Download size={14} />
                  <span>DOWNLOAD PDF</span>
                </span>
              </InfinityButton>
            </div>
          </div>
        </div>

        {/* The 4 Verified Credentials: 2x2 Balanced Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {certifications.slice(0, 4).map((cert, idx) => {
            const meta = credentialMeta[cert.driveKey] || {
              image: "/certificates/mongo.jpeg",
              pdf: "/certificates/mongodb.pdf",
              category: "VERIFIED CREDENTIAL",
              displayTitle: cert.title.toUpperCase(),
              description: cert.issuer,
            };
            const certIndex = `0${idx + 1} / 04`;

            return (
              <article
                key={cert.title}
                className="qq__panel group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.12)] bg-[#0C0A08] transition-all duration-500 hover:border-[#C96F4A]/70 hover:shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_35px_rgba(201,111,74,0.18)]"
              >
                {/* 1. Cinematic Certificate Image Showcase */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden border-b border-[rgba(255,250,240,0.1)] bg-[#080706]">
                  {/* Real Certificate Image with smooth hover scale */}
                  <div className="relative w-full h-full transform transition-transform duration-700 ease-out group-hover:scale-105">
                    <Image
                      src={meta.image}
                      alt={cert.title}
                      fill
                      className="object-cover object-top filter brightness-90 contrast-105 group-hover:brightness-100 transition-all duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>

                  {/* Dark court vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-[#0C0A08]/30 to-transparent pointer-events-none" />

                  {/* Top-Left Live HUD Badge */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full bg-[#120F0D]/90 border border-[#C96F4A]/30 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
                    <ShieldCheck size={11} className="text-[#4ADE80]" />
                    <span>ACCREDITED // {cert.year}</span>
                  </div>

                  {/* Top-Right Quarter/Index Pill */}
                  <div className="absolute top-4 right-4 z-20 font-mono text-[10px] tracking-widest text-[#FFD6A1] bg-[#120F0D]/90 border border-[rgba(255,250,240,0.15)] px-3 py-1 rounded-full backdrop-blur-md">
                    {certIndex}
                  </div>
                </div>

                {/* 2. Overlaid Editorial Typography & Metadata */}
                <div className="relative z-10 flex flex-col justify-between flex-1 p-6 sm:p-8">
                  <div>
                    {/* Hairline Infinity Socks HUD Row */}
                    <div className="qq__hudrow flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] pb-3 font-mono text-[10px] sm:text-[11px] tracking-widest text-[rgba(255,250,240,0.5)]">
                      <span className="flex items-center gap-2 truncate pr-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] shrink-0" />
                        <b className="text-[#C96F4A] uppercase truncate">{`[0${idx + 1} // ${meta.category}]`}</b>
                      </span>
                      <span className="text-[#FFD6A1] font-bold shrink-0">{cert.year}</span>
                    </div>

                    {/* Oversized Condensed Display Title */}
                    <div className="mt-4 mb-3">
                      <h3
                        className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {meta.displayTitle}
                      </h3>

                      {/* Issuer & Location */}
                      <p className="mt-1.5 font-mono text-xs text-[rgba(255,250,240,0.6)]">
                        {cert.issuer} {cert.location ? `• ${cert.location}` : ""}
                      </p>
                    </div>

                    {/* Credential Scope Description */}
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[rgba(255,250,240,0.75)] font-sans">
                      {meta.description}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-6 pt-4 border-t border-[rgba(255,250,240,0.08)] flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[rgba(255,250,240,0.4)] flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-[#4ADE80]" />
                      VERIFIED CREDENTIAL
                    </span>

                    <div className="flex items-center gap-2">
                      {cert.credentialUrl && (
                        <InfinityButton
                          href={cert.credentialUrl}
                          variant="ghost"
                          withArrow
                          target="_blank"
                          className="text-xs"
                        >
                          VERIFY BADGE
                        </InfinityButton>
                      )}

                      <InfinityButton
                        href={meta.pdf}
                        variant="terra"
                        withArrow
                        target="_blank"
                        className="text-xs"
                      >
                        VIEW DOC
                      </InfinityButton>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
