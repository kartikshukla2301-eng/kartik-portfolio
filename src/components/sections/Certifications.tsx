"use client";

import Image from "next/image";
import { Download, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { ShowCard } from "@/components/ui/ShowCard";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { useContent } from "@/components/providers/ContentProvider";
import { parseGoogleDriveUrl } from "@/lib/drive";

export function Certifications() {
  const { profile, certifications } = useContent();
  const resume = parseGoogleDriveUrl(profile.resumeUrl);

  return (
    <section id="certifications" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Verified certificates and resume"
          description="Documents open from Google Drive, so this site stays light. A certificate without a document link simply has no button."
        />

        <ShowCard className="mb-10">
          <div className="flex flex-col gap-6 p-6 sm:p-9 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#C96F4A]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4ADE80]" />
                Primary document
              </p>
              <SplitReveal
                as="h3"
                by="words"
                className="font-display text-[clamp(2.2rem,5vw,4rem)] uppercase leading-[0.92] text-[#F6F0E2]"
              >
                {`Resume - ${profile.name}`}
              </SplitReveal>
              <p className="mt-3 text-sm leading-relaxed text-[rgba(255,250,240,0.7)]">
                Full stack developer and AI engineer. Healthcare information systems, clinical workflows, IoT and AI
                applications.
              </p>
            </div>

            {resume.isValid && (
              <div className="flex flex-wrap items-center gap-3">
                {resume.viewUrl && (
                  <InfinityButton href={resume.viewUrl} variant="terra" withArrow target="_blank">
                    View resume
                  </InfinityButton>
                )}
                {resume.downloadUrl && (
                  <InfinityButton href={resume.downloadUrl} variant="ghost" withArrow={false} target="_blank">
                    <span className="flex items-center gap-1.5">
                      <Download size={14} />
                      Download
                    </span>
                  </InfinityButton>
                )}
              </div>
            )}
          </div>
        </ShowCard>

        <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
          {certifications.map((cert, i) => {
            const doc = parseGoogleDriveUrl(cert.driveUrl);
            const thumb = cert.image || null;

            return (
              <ShowCard
                key={cert.id}
                delay={(i % 2) * 0.08}
                label={`${String(i + 1).padStart(2, "0")} / ${String(certifications.length).padStart(2, "0")}`}
              >
                <div className="relative h-52 w-full overflow-hidden border-b border-[rgba(255,250,240,0.1)] bg-[#080706] sm:h-60">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={`${cert.title} certificate`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top opacity-90 transition-all duration-500 group-hover:opacity-100"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,111,74,0.28),transparent_60%)] p-6">
                      <span className="font-display text-[clamp(3.5rem,9vw,6rem)] uppercase leading-[0.85] text-transparent [-webkit-text-stroke:1px_rgba(246,240,226,0.5)]">
                        Python
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0A08] via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#C96F4A]/30 bg-[#120F0D]/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#FFD6A1] backdrop-blur-md">
                    <ShieldCheck size={11} className="text-[#4ADE80]" />
                    {cert.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C96F4A]">
                    {cert.category}
                  </p>
                  <h3 className="mt-2 font-display text-[clamp(1.8rem,3.2vw,2.5rem)] uppercase leading-[0.95] text-[#F6F0E2]">
                    {cert.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-[rgba(255,250,240,0.6)]">
                    {cert.issuer}
                    {cert.location ? ` / ${cert.location}` : ""}
                  </p>

                  {(doc.isValid || cert.credentialUrl) && (
                    <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
                      {cert.credentialUrl && (
                        <InfinityButton
                          href={cert.credentialUrl}
                          variant="ghost"
                          withArrow
                          target="_blank"
                          className="text-xs"
                        >
                          Verify badge
                        </InfinityButton>
                      )}
                      {doc.isValid && doc.viewUrl && (
                        <InfinityButton href={doc.viewUrl} variant="terra" withArrow target="_blank" className="text-xs">
                          View document
                        </InfinityButton>
                      )}
                    </div>
                  )}
                </div>
              </ShowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
