"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--borders)] py-14 px-4 bg-white/60">
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
            <p className="mt-1 text-xs text-[var(--secondary-text)]">
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
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--borders)] bg-white text-[var(--secondary-text)] transition-all duration-300 hover:border-accent-violet hover:text-accent-violet hover:shadow-2xs"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-[var(--secondary-text)]">
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
                className="transition-colors hover:text-accent-violet"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack note */}
        <div className="mt-8 border-t border-[var(--borders)] pt-6 text-center">
          <p className="text-[11px] text-[var(--secondary-text)]">
            Built with Next.js 16, React 19, Framer Motion, Three.js, GSAP & Tailwind CSS • Premium Light Theme
          </p>
        </div>
      </div>
    </footer>
  );
}
