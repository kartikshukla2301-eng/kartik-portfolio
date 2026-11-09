"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { Mail, ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[rgba(255,250,240,0.1)] py-16 px-4 bg-[#0B0A08]">
      {/* Top ambient hairline copper glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C96F4A]/40 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Brand & Studio */}
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 font-mono text-xs tracking-widest text-[#FFD6A1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A]" />
              <span className="font-bold">KARTIK SHUKLA</span>
              <span className="text-[rgba(255,250,240,0.35)]">/</span>
              <span className="text-[rgba(255,250,240,0.6)]">ATELIER</span>
            </div>
            <p className="mt-1.5 font-mono text-xs text-[rgba(255,250,240,0.45)]">
              {siteConfig.primaryTitle} | {siteConfig.secondaryTitle} • &copy; {new Date().getFullYear()}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2">
            {[
              { icon: GithubIcon, href: siteConfig.github, label: "GitHub" },
              { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
              { icon: InstagramIcon, href: siteConfig.instagram, label: "Instagram" },
              { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,250,240,0.1)] bg-[#12100D] text-[rgba(255,250,240,0.6)] transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1]"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={14} />
              </motion.a>
            ))}

            <button
              onClick={scrollToTop}
              className="ml-2 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(255,250,240,0.14)] bg-[#161310] text-[rgba(255,250,240,0.7)] transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1] cursor-pointer"
              aria-label="Return to top"
              title="Return to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>

          {/* Quick Monospace Links */}
          <div className="flex flex-wrap justify-center gap-5 font-mono text-xs text-[rgba(255,250,240,0.5)]">
            {[
              { label: "INDEX", href: "#home" },
              { label: "ABOUT", href: "#about" },
              { label: "EXPERIENCE", href: "#experience" },
              { label: "PROJECTS", href: "#projects" },
              { label: "CREDENTIALS", href: "#certifications" },
              { label: "CONTACT", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="tracking-wider transition-colors hover:text-[#FFD6A1]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack telemetry */}
        <div className="mt-10 border-t border-[rgba(255,250,240,0.06)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[11px] text-[rgba(255,250,240,0.35)]">
          <div>
            COORDINATES // 28.6139° N, 77.2090° E • SYSTEM: NEXT.JS 16 TURBOPACK
          </div>
          <div>
            INSPIRED BY THE INFINITY SOCKS VISUAL ARCHITECTURE
          </div>
        </div>
      </div>
    </footer>
  );
}
