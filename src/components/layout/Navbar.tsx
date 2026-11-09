"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X, FileText } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { parseGoogleDriveUrl } from "@/lib/drive";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const parsedResume = parseGoogleDriveUrl(siteConfig.resumeUrl);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const el = document.getElementById(targetId);
      if (!el) return;

      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });

      if (mobileOpen) setMobileOpen(false);
    },
    [mobileOpen]
  );

  return (
    <>
      {/* Desktop Nav */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "w-[95%] max-w-4xl" : "w-[92%] max-w-5xl"
        }`}
      >
        <nav
          className={`glass flex items-center justify-between rounded-full px-5 py-3 transition-all duration-300 ${
            scrolled ? "py-2.5 shadow-lg shadow-black/5 border-[#4F46E5]/20" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 text-sm font-bold text-[#0F172A]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-gradient font-black text-base">KS</span>
            <span className="hidden sm:inline font-semibold text-xs tracking-tight text-[#475569]">
              Kartik Shukla
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#0F172A]"
                      : "text-[#475569] hover:text-[#0F172A]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-full bg-[#4F46E5]/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action / Resume Button (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            {parsedResume.isValid && parsedResume.viewUrl ? (
              <a
                href={parsedResume.viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-4 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_0_15px_rgba(79,70,229,0.35)]"
              >
                <FileText size={13} />
                Resume
              </a>
            ) : (
              <a
                href="#certifications"
                onClick={(e) => handleNavClick(e, "#certifications")}
                className="flex items-center gap-1.5 rounded-full bg-[#4F46E5] px-4 py-1.5 text-xs font-semibold text-white transition-all duration-300 hover:bg-[#4338CA] hover:shadow-[0_0_15px_rgba(79,70,229,0.35)]"
              >
                <FileText size={13} />
                Credentials
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#475569] hover:bg-[#F1F5F9] hover:text-[#0F172A] transition-colors lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute inset-y-0 right-0 w-full max-w-xs bg-white/95 backdrop-blur-2xl border-l border-[#E2E8F0] p-6 pt-24 shadow-2xl flex flex-col justify-between"
            >
              <nav className="flex flex-col gap-1.5">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`rounded-xl px-4 py-2.5 text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-[#4F46E5]/10 text-[#4F46E5]"
                          : "text-[#475569] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                      }`}
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-[#E2E8F0]">
                {parsedResume.isValid && parsedResume.viewUrl ? (
                  <a
                    href={parsedResume.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] py-3 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] hover:bg-[#4338CA]"
                  >
                    <FileText size={15} />
                    View Resume
                  </a>
                ) : (
                  <a
                    href="#certifications"
                    onClick={(e) => handleNavClick(e, "#certifications")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#4F46E5] py-3 text-xs font-semibold text-white shadow-[0_4px_16px_rgba(79,70,229,0.3)] hover:bg-[#4338CA]"
                  >
                    <FileText size={15} />
                    View Credentials Library
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
