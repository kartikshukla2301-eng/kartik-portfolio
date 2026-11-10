"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";
import { parseGoogleDriveUrl } from "@/lib/drive";
import { InfinityButton } from "@/components/ui/InfinityButton";

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
      {/* Desktop Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "w-[95%] max-w-4xl" : "w-[92%] max-w-5xl"
        }`}
      >
        <nav
          className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-300 border border-[rgba(255,250,240,0.14)] bg-[#12100D]/90 backdrop-blur-xl ${
            scrolled ? "shadow-2xl shadow-black/80 border-[#C96F4A]/30 py-2" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, "#home")}
            className="flex items-center gap-2 text-sm font-bold tracking-tight text-[rgba(255,250,240,0.95)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C96F4A] text-xs font-black text-white">
              KS
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-[rgba(255,250,240,0.7)]">
              Kartik Shukla
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex font-mono text-[11px] uppercase tracking-wider">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative rounded-full px-3 py-1.5 transition-all duration-200 ${
                    isActive
                      ? "text-white font-bold"
                      : "text-[rgba(255,250,240,0.5)] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavInfinity"
                      className="absolute inset-0 rounded-full bg-[rgba(201,111,74,0.18)] border border-[rgba(201,111,74,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* Action / Resume Button with Infinity Socks Arrow Conveyor (desktop) */}
          <div className="hidden sm:flex items-center gap-2">
            {parsedResume.isValid && parsedResume.viewUrl ? (
              <InfinityButton
                href={parsedResume.viewUrl}
                variant="terra"
                withArrow
                target="_blank"
                className="text-[10px]"
              >
                Resume
              </InfinityButton>
            ) : (
              <InfinityButton
                href="#certifications"
                variant="terra"
                withArrow
                className="text-[10px]"
              >
                Dossier
              </InfinityButton>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[rgba(255,250,240,0.7)] hover:bg-white/10 hover:text-white transition-colors lg:hidden cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
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
              className="absolute inset-0 bg-[#0B0A08]/85 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="absolute inset-y-0 right-0 w-full max-w-xs bg-[#12100D] border-l border-[rgba(255,250,240,0.14)] p-6 pt-24 shadow-2xl flex flex-col justify-between"
            >
              <nav className="flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
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
                      className={`rounded-xl px-4 py-3 transition-all duration-200 ${
                        isActive
                          ? "bg-[#C96F4A]/15 border border-[#C96F4A]/40 text-white font-bold"
                          : "text-[rgba(255,250,240,0.5)] hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-[rgba(255,250,240,0.12)]">
                {parsedResume.isValid && parsedResume.viewUrl ? (
                  <InfinityButton
                    href={parsedResume.viewUrl}
                    variant="terra"
                    withArrow
                    target="_blank"
                    className="w-full justify-center"
                  >
                    View Verified Resume
                  </InfinityButton>
                ) : (
                  <InfinityButton
                    href="#certifications"
                    variant="terra"
                    withArrow
                    className="w-full justify-center"
                  >
                    View Credentials
                  </InfinityButton>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
