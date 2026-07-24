"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Award, ExternalLink, ChevronDown, ChevronUp, X, Download, Eye } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="relative py-32 px-4">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          description="Industry-verified skills and professional development."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    if (lightboxOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
      };
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleEsc);
        document.body.style.overflow = "";
      };
    }
  }, [lightboxOpen, closeLightbox]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="premium-card glass group relative overflow-hidden rounded-2xl transition-all duration-500"
      >
        {/* Certificate image preview */}
        {cert.imageFile && (
          <div
            className="relative h-40 w-full cursor-pointer overflow-hidden"
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={cert.imageFile}
              alt={`${cert.title} certificate`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[rgba(3,3,3,0.8)] via-[rgba(3,3,3,0.2)] to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[rgba(0,0,0,0.5)] px-4 py-2 text-xs font-medium text-white backdrop-blur-sm">
                <Eye size={14} />
                View Certificate
              </div>
            </div>
          </div>
        )}

        {/* Accent top (when no image) */}
        {!cert.imageFile && (
          <div className="h-1 w-full bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-violet" />
        )}

        <div className="p-6">
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-amber/10 text-accent-amber">
              <Award size={20} />
            </div>
            <div className="min-w-0">
              <h3
                className="text-base font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cert.title}
              </h3>
              <p className="mt-0.5 text-xs text-white/40">{cert.issuer}</p>
            </div>
          </div>

          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs text-white/30">{cert.date}</span>
            <div className="flex items-center gap-2">
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-accent-cyan transition-colors hover:text-accent-cyan/80"
                >
                  <ExternalLink size={12} />
                  Verify
                </a>
              )}
              {cert.image && (
                <a
                  href={cert.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-white/40 transition-colors hover:text-white/70"
                >
                  <Download size={12} />
                  PDF
                </a>
              )}
            </div>
          </div>

          {cert.location && (
            <p className="mb-3 text-xs text-white/30 italic">{cert.location}</p>
          )}

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-center gap-1 rounded-lg border border-white/5 bg-white/5 py-1.5 text-xs text-white/40 transition-all duration-300 hover:bg-white/10 hover:text-white/60"
            aria-expanded={expanded}
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Collapse" : "Details"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-lg border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-xs leading-relaxed text-white/50">
                    {cert.title} — issued by {cert.issuer} on {cert.date}. Validated
                    through official verification channels.
                    {cert.credentialUrl && (
                      <>
                        {" "}
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-cyan underline underline-offset-2"
                        >
                          View credential
                        </a>
                        .
                      </>
                    )}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && cert.imageFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cert-lightbox"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[rgba(0,0,0,0.5)] text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                aria-label="Close lightbox"
              >
                <X size={18} />
              </button>
              <Image
                src={cert.imageFile}
                alt={`${cert.title} certificate`}
                width={900}
                height={600}
                className="max-h-[80vh] rounded-xl object-contain shadow-[0_0_60px_rgba(124,92,255,0.15)]"
                sizes="90vw"
              />
              <div className="mt-4 text-center">
                <p className="text-sm font-medium text-white">{cert.title}</p>
                <p className="text-xs text-white/40">{cert.issuer} — {cert.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
