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
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
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
          eyebrow="Credentials"
          title="Document Library & Certifications"
          description="Verified professional credentials, certifications, and technical documentation hosted on Google Drive."
        />

        {/* Featured Resume Access Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="premium-card glass mb-10 overflow-hidden rounded-2xl p-6 sm:p-8 border border-[var(--borders)] shadow-sm bg-gradient-to-br from-white to-[#EEF2F8]"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-violet/10 text-accent-violet shadow-sm">
                <FileCheck2 size={28} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-violet">
                    Official Document
                  </span>
                  <Badge variant="accent" className="text-[10px]">
                    <Sparkles size={10} className="mr-0.5" />
                    Latest
                  </Badge>
                </div>
                <h3
                  className="text-xl font-bold tracking-tight text-[var(--foreground)] sm:text-2xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Latest Resume – {siteConfig.name}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[var(--secondary-text)]">
                  Full Stack Developer | AI Engineer • Updated with healthcare systems, production internships & AI platforms
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
                className="flex items-center gap-2 rounded-xl bg-accent-violet px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-accent-violet/90 hover:shadow-md cursor-pointer"
              >
                <Eye size={15} />
                View Resume
              </button>

              {parsedResume.isValid && parsedResume.downloadUrl && (
                <a
                  href={parsedResume.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-[var(--borders)] bg-white px-5 py-2.5 text-xs font-semibold text-[var(--foreground)] transition-all hover:bg-[#F8FAFC] shadow-xs"
                >
                  <Download size={15} />
                  Download PDF
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08 }}
      className="premium-card glass group flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 hover:shadow-md hover:border-accent-violet/30"
    >
      <div>
        <div className="mb-4 flex items-start gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet transition-colors group-hover:bg-accent-violet group-hover:text-white">
            <FileText size={20} />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold tracking-wider uppercase text-accent-violet">
              Verified Credential
            </span>
            <h4
              className="mt-0.5 text-base font-bold leading-snug text-[var(--foreground)]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {cert.title}
            </h4>
            <p className="mt-1 text-xs font-medium text-[var(--secondary-text)]">
              {cert.issuer}
            </p>
          </div>
        </div>

        {cert.location && (
          <p className="mb-3 text-[11px] text-[var(--secondary-text)] italic">
            {cert.location}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t border-[var(--borders)] flex flex-wrap items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 text-xs text-[var(--secondary-text)]">
          <CheckCircle size={13} className="text-emerald-500" />
          {cert.year}
        </span>

        <div className="flex items-center gap-2">
          {cert.credentialUrl && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent-cyan transition-colors hover:text-accent-cyan/80"
            >
              <ExternalLink size={12} />
              Verify
            </a>
          )}

          <button
            onClick={() =>
              onOpenDoc(cert.title, driveUrl, cert.issuer, cert.year, cert.credentialUrl)
            }
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--secondary-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-all hover:bg-accent-violet hover:text-white cursor-pointer"
          >
            <Eye size={13} />
            View Document
          </button>
        </div>
      </div>
    </motion.div>
  );
}
