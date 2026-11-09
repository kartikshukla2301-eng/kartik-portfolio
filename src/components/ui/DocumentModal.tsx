"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download, FileText, AlertCircle } from "lucide-react";
import { ParsedDriveUrl } from "@/lib/drive";

interface DocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  issuer?: string;
  year?: string;
  parsed: ParsedDriveUrl;
  verifyUrl?: string;
}

export function DocumentModal({
  isOpen,
  onClose,
  title,
  issuer,
  year,
  parsed,
  verifyUrl,
}: DocumentModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-[#0B0A08]/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-[#12100D] border border-[rgba(255,250,240,0.16)] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with monospace HUD specs */}
            <div className="flex items-center justify-between border-b border-[rgba(255,250,240,0.1)] px-6 py-4 bg-[#0B0A08]/60">
              <div className="flex items-center gap-3.5 min-w-0 pr-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C96F4A]/15 border border-[#C96F4A]/30 text-[#FFD6A1]">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#C96F4A] uppercase">
                    <span>CREDENTIAL DOSSIER</span>
                    <span>{"//"}</span>
                    <span>VERIFIED</span>
                  </div>
                  <h3
                    className="text-base font-bold text-[#F6F0E2] truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h3>
                  <p className="font-mono text-xs text-[rgba(255,250,240,0.45)] truncate">
                    {issuer} {year ? `• ${year}` : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {parsed.isValid && parsed.viewUrl && (
                  <a
                    href={parsed.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[rgba(255,250,240,0.14)] bg-[#161310] px-3.5 py-1.5 font-mono text-xs font-semibold text-[rgba(255,250,240,0.8)] transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1]"
                  >
                    <ExternalLink size={13} />
                    FULL DOCUMENT
                  </a>
                )}
                {parsed.isValid && parsed.downloadUrl && (
                  <a
                    href={parsed.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#C96F4A] px-3.5 py-1.5 font-mono text-xs font-bold text-[#0B0A08] transition-colors hover:bg-[#B4603E]"
                  >
                    <Download size={13} />
                    DOWNLOAD PDF
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[rgba(255,250,240,0.12)] text-[rgba(255,250,240,0.5)] transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1]"
                  aria-label="Close document modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-1 overflow-auto bg-[#0B0A08] p-4 sm:p-6 min-h-[50vh] flex items-center justify-center">
              {parsed.isValid && parsed.previewUrl ? (
                <iframe
                  src={parsed.previewUrl}
                  title={`${title} Preview`}
                  className="h-[70vh] w-full rounded-xl border border-[rgba(255,250,240,0.12)] bg-[#12100D] shadow-inner"
                  allow="autoplay"
                />
              ) : (
                <div className="max-w-md text-center p-8 rounded-2xl border border-[rgba(255,250,240,0.14)] bg-[#12100D]">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C96F4A]/15 border border-[#C96F4A]/30 text-[#FFD6A1]">
                    <AlertCircle size={26} />
                  </div>
                  <h4 className="text-base font-bold text-[#F6F0E2] mb-2" style={{ fontFamily: "var(--font-display)" }}>
                    Verified Repository Document
                  </h4>
                  <p className="text-xs leading-relaxed text-[rgba(255,250,240,0.55)] mb-6 font-sans">
                    This official certificate is stored in Kartik Shukla&apos;s verified Google Drive repository. Direct PDF access is active.
                  </p>
                  {verifyUrl && (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#C96F4A] px-5 py-2.5 font-mono text-xs font-bold text-[#0B0A08] transition-colors hover:bg-[#B4603E]"
                    >
                      <ExternalLink size={14} />
                      VERIFY ON ISSUER SITE
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Footer for mobile */}
            <div className="sm:hidden flex items-center justify-between border-t border-[rgba(255,250,240,0.1)] px-4 py-3 bg-[#12100D]">
              {parsed.isValid && parsed.viewUrl ? (
                <a
                  href={parsed.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#FFD6A1]"
                >
                  <ExternalLink size={13} />
                  OPEN PDF
                </a>
              ) : (
                <span className="font-mono text-xs text-[rgba(255,250,240,0.4)]">OFFICIAL ARCHIVE</span>
              )}
              <button
                onClick={onClose}
                className="rounded-lg border border-[rgba(255,250,240,0.12)] px-3 py-1 font-mono text-xs text-[rgba(255,250,240,0.7)]"
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
