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
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative flex flex-col w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl bg-white border border-[#E2E8F0] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4 bg-[#F8FAFC]">
              <div className="flex items-center gap-3 min-w-0 pr-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet">
                  <FileText size={20} />
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-base font-bold text-[#0F172A] truncate"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {title}
                  </h3>
                  <p className="text-xs text-[#475569] truncate">
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
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  >
                    <ExternalLink size={13} />
                    Open Document
                  </a>
                )}
                {parsed.isValid && parsed.downloadUrl && (
                  <a
                    href={parsed.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-accent-violet px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-accent-violet/90"
                  >
                    <Download size={13} />
                    Download PDF
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] transition-colors hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                  aria-label="Close document modal"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Document Body */}
            <div className="flex-1 overflow-auto bg-[#F1F4F9] p-4 sm:p-6 min-h-[50vh] flex items-center justify-center">
              {parsed.isValid && parsed.previewUrl ? (
                <iframe
                  src={parsed.previewUrl}
                  title={`${title} Preview`}
                  className="h-[70vh] w-full rounded-xl border border-[#E2E8F0] bg-white shadow-inner"
                  allow="autoplay"
                />
              ) : (
                <div className="max-w-md text-center p-8 rounded-2xl glass border border-white/10">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400">
                    <AlertCircle size={28} />
                  </div>
                  <h4 className="text-base font-bold text-[#0F172A] mb-2">
                    Official Document Access
                  </h4>
                  <p className="text-xs leading-relaxed text-[#475569] mb-5">
                    This official certificate is stored in Kartik Shukla&apos;s verified Google Drive repository. The document link is being linked directly to the cloud store.
                  </p>
                  {verifyUrl && (
                    <a
                      href={verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-accent-violet px-4 py-2 text-xs font-semibold text-white shadow-[0_0_15px_rgba(124,92,255,0.3)] hover:bg-accent-violet/90"
                    >
                      <ExternalLink size={14} />
                      Verify on Issuer Website
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Footer with actions for mobile */}
            <div className="sm:hidden flex items-center justify-between border-t border-[#E2E8F0] px-4 py-3 bg-white">
              {parsed.isValid && parsed.viewUrl ? (
                <a
                  href={parsed.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#4F46E5]"
                >
                  <ExternalLink size={13} />
                  Open Document
                </a>
              ) : (
                <span className="text-xs text-[#94A3B8]">Official Credential</span>
              )}
              <button
                onClick={onClose}
                className="rounded-lg border border-[#E2E8F0] px-3 py-1 text-xs font-medium text-[#475569]"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
