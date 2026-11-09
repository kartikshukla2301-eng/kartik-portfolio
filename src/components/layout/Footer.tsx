"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[#E2E8F0] py-14 px-4 bg-transparent">
      {/* Top ambient glow line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4F46E5]/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p
              className="text-base font-bold tracking-tight text-gradient"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs text-[#64748B]">
              {siteConfig.primaryTitle} | {siteConfig.secondaryTitle} • &copy; {new Date().getFullYear()}
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2.5">
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
                className="glass flex h-9 w-9 items-center justify-center rounded-xl text-[#64748B] transition-all duration-300 hover:border-[#4F46E5]/40 hover:text-[#4F46E5] hover:shadow-[0_4px_12px_rgba(79,70,229,0.15)]"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-[#64748B]">
            {[
              { label: "Home", href: "#home" },
              { label: "About", href: "#about" },
              { label: "Experience", href: "#experience" },
              { label: "Projects", href: "#projects" },
              { label: "Credentials", href: "#certifications" },
              { label: "Contact", href: "#contact" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-[#0F172A]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack note */}
        <div className="mt-8 border-t border-[#E2E8F0] pt-6 text-center">
          <p className="text-[11px] text-[#94A3B8]">
            Built with Next.js 16, React 19, Framer Motion, Three.js, GSAP & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
