"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  FileText,
  ExternalLink,
  Download,
  Eye,
  CheckCircle,
  FileCheck2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DocumentModal } from "@/components/ui/DocumentModal";
import { certifications, documentLinks, siteConfig, CertificationItem } from "@/lib/data";
import { parseGoogleDriveUrl } from "@/lib/drive";

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const [activeDoc, setActiveDoc] = useState<{
    isOpen: boolean;
    title: string;
    issuer?: string;
    year?: string;
    url: string;
    verifyUrl?: string;
  }>({
    isOpen: false,
    title: "",
    url: "",
  });

  const resumeDriveUrl = documentLinks.resume;
  const parsedResume = parseGoogleDriveUrl(resumeDriveUrl);

  const handleOpenDoc = (
    title: string,
    url: string,
    issuer?: string,
    year?: string,
    verifyUrl?: string
  ) => {
    setActiveDoc({
      isOpen: true,
      title,
      url,
      issuer,
      year,
      verifyUrl,
    });
  };

  const handleCloseDoc = () => {
    setActiveDoc((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <section id="certifications" className="relative py-32 px-4">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <SectionHeading
          eyebrow="Accreditation"
          title="Document Library & Verified Credentials"
          description="Direct access to verified certifications, university credentials, and primary technical documentation stored in the cloud repository."
        />

        {/* Featured Resume Access Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="court-card group mb-12 overflow-hidden rounded-2xl border border-[rgba(255,250,240,0.16)] bg-[#12100D]/95 backdrop-blur-md p-7 sm:p-9 transition-all duration-300 hover:border-[#C96F4A]/50"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C96F4A]/15 border border-[#C96F4A]/30 text-[#FFD6A1] shadow-[0_0_25px_rgba(201,111,74,0.25)]">
                <FileCheck2 size={26} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1 font-mono text-[11px] tracking-widest text-[#C96F4A] uppercase">
                  <span>PRIMARY CURRICULUM VITAE</span>
                  <span>{"//"}</span>
                  <span className="text-[#FFD6A1]">2026 EDITION</span>
                </div>
                <h3
                  className="text-xl sm:text-2xl font-bold tracking-tight text-[#F6F0E2]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Latest Resume – {siteConfig.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[rgba(255,250,240,0.6)] font-sans max-w-xl">
                  Full Stack Developer & AI Engineer • Complete dossier covering production healthcare systems, R&D Maker Labs, and scalable AI platforms.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() =>
                  handleOpenDoc(
                    `Latest Resume – ${siteConfig.name}`,
                    resumeDriveUrl,
                    "Official Curriculum Vitae",
                    "2026"
                  )
                }
                className="btn-infinity cursor-pointer"
              >
                <Eye size={15} />
                <span>VIEW RESUME</span>
                <span className="btn-infinity-arrow">→</span>
              </button>

              {parsedResume.isValid && parsedResume.downloadUrl && (
                <a
                  href={parsedResume.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-infinity-secondary"
                >
                  <Download size={15} />
                  <span>DOWNLOAD PDF</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <CredentialCard
              key={cert.title}
              cert={cert}
              index={i}
              onOpenDoc={handleOpenDoc}
            />
          ))}
        </div>
      </div>

      {/* Global Document Modal */}
      <DocumentModal
        isOpen={activeDoc.isOpen}
        onClose={handleCloseDoc}
        title={activeDoc.title}
        issuer={activeDoc.issuer}
        year={activeDoc.year}
        parsed={parseGoogleDriveUrl(activeDoc.url)}
        verifyUrl={activeDoc.verifyUrl}
      />
    </section>
  );
}

function CredentialCard({
  cert,
  index,
  onOpenDoc,
}: {
  cert: CertificationItem;
  index: number;
  onOpenDoc: (
    title: string,
    url: string,
    issuer?: string,
    year?: string,
    verifyUrl?: string
  ) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const driveUrl = documentLinks[cert.driveKey] || "";
  const indexStr = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="court-card group flex flex-col justify-between rounded-2xl p-6 sm:p-7 border border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-md transition-all duration-300 hover:border-[#C96F4A]/40"
    >
      <div>
        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C96F4A]/12 border border-[#C96F4A]/25 text-[#FFD6A1] transition-colors group-hover:bg-[#C96F4A] group-hover:text-[#0B0A08]">
            <FileText size={18} />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-[rgba(255,250,240,0.35)]">
            {`CERT ${indexStr} //`}
          </span>
        </div>

        <div className="min-w-0">
          <span className="font-mono text-[10px] tracking-widest uppercase text-[#C96F4A]">
            VERIFIED CREDENTIAL
          </span>
          <h4
            className="mt-1 text-base font-bold leading-snug text-[#F6F0E2] group-hover:text-[#FFD6A1] transition-colors"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {cert.title}
          </h4>
          <p className="mt-1 font-mono text-xs text-[rgba(255,250,240,0.5)]">
            {cert.issuer}
          </p>
        </div>

        {cert.location && (
          <p className="mt-2 font-mono text-[11px] text-[rgba(255,250,240,0.4)] italic">
            {cert.location}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-[rgba(255,250,240,0.08)] flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-mono text-xs text-[rgba(255,250,240,0.5)]">
          <CheckCircle size={13} className="text-[#C96F4A]" />
          {cert.year}
        </span>

        <div className="flex items-center gap-2">
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#FFD6A1] transition-colors hover:text-[#C96F4A]"
            >
              <ExternalLink size={12} />
              VERIFY
            </a>
          )}

          <button
            onClick={() =>
              onOpenDoc(cert.title, driveUrl, cert.issuer, cert.year, cert.credentialUrl)
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,250,240,0.14)] bg-[#161310] px-3 py-1.5 font-mono text-xs font-medium text-[rgba(255,250,240,0.8)] transition-all hover:border-[#C96F4A] hover:bg-[#C96F4A] hover:text-[#0B0A08] cursor-pointer"
          >
            <Eye size={12} />
            VIEW DOC
          </button>
        </div>
      </div>
    </motion.div>
  );
}
