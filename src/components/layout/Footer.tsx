"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/data";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.04] py-14 px-4">
      {/* Subtle top gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-violet/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <p
              className="mb-1.5 text-sm font-bold tracking-tight text-gradient"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {siteConfig.name}
            </p>
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} All rights reserved.
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
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/25 transition-all duration-300 hover:text-accent-violet"
                whileHover={{ scale: 1.1, y: -2 }}
              >
                <Icon size={14} />
              </motion.a>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-5">
            {["Home", "About", "Projects", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-white/25 transition-colors duration-300 hover:text-white/50"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack note */}
        <div className="mt-10 border-t border-white/[0.04] pt-6 text-center">
          <p className="text-[10px] tracking-wider text-white/15">
            Built with Next.js 16, React 19, Framer Motion, Three.js & Tailwind CSS v4
          </p>
        </div>
      </div>
    </footer>
  );
}
