"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, Mail, ExternalLink, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { siteConfig, tagCloud } from "@/lib/data";
import { parseGoogleDriveUrl } from "@/lib/drive";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const stats = [
  {
    num: "04",
    label: "Professional Internships",
    detail: "Pristyn Care, OnCare, Infosys, TDA",
  },
  {
    num: "04",
    label: "Featured Projects",
    detail: "DEVLEVELER, GROWEasy & AI Platforms",
  },
  {
    num: "06",
    label: "Verified Credentials",
    detail: "AWS, MongoDB, Python, Claude Code",
  },
  {
    num: "7.9",
    label: "Academic CGPA",
    detail: "B.Tech CSE (2023–2027)",
  },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const parsedResume = parseGoogleDriveUrl(siteConfig.resumeUrl);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-12"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="mb-6 flex justify-center sm:mb-8"
        >
          <div className="portrait-frame group relative">
            {/* Outer glow rings */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[rgba(124,92,255,0.15)] via-[rgba(34,211,238,0.1)] to-[rgba(124,92,255,0.15)] blur-2xl transition-all duration-700 group-hover:from-[rgba(124,92,255,0.25)] group-hover:via-[rgba(34,211,238,0.15)] group-hover:to-[rgba(124,92,255,0.25)]" />
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent-violet/40 via-accent-cyan/30 to-accent-violet/40 opacity-70" />

            {/* Main image container */}
            <div className="relative h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40 md:h-48 md:w-48 shadow-[0_0_40px_rgba(124,92,255,0.2)]">
              <div className="absolute inset-0 rounded-full border-2 border-white/10 shadow-[inset_0_0_20px_rgba(124,92,255,0.2)] z-10" />

              <Image
                src={siteConfig.portrait.src}
                alt={siteConfig.portrait.alt}
                width={siteConfig.portrait.width}
                height={siteConfig.portrait.height}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cinematic lighting overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[rgba(3,3,3,0.5)] via-transparent to-[rgba(124,92,255,0.08)] pointer-events-none" />
            </div>

            {/* Floating accent dots */}
            <motion.div
              animate={{ y: [-3, 3, -3], x: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 top-4 h-2.5 w-2.5 rounded-full bg-accent-cyan shadow-[0_0_10px_rgba(34,211,238,0.6)]"
            />
            <motion.div
              animate={{ y: [2, -4, 2], x: [1, -3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 bottom-8 h-2 w-2 rounded-full bg-accent-violet shadow-[0_0_10px_rgba(124,92,255,0.6)]"
            />
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-4 sm:mb-6"
        >
          <Badge variant="accent" pulse>
            Available for Internships & Full-Time Roles
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mb-4 sm:mb-5"
          style={{ y: contentY }}
        >
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-white">Hi, I&apos;m </span>
            <span className="text-gradient">
              <AnimatedText text="Kartik Shukla" delay={0.4} />
            </span>
          </h1>

          <p className="mt-3 text-lg font-bold sm:text-xl md:text-2xl text-accent-violet">
            {siteConfig.primaryTitle}{" "}
            <span className="text-white/40 font-normal">|</span>{" "}
            <span className="text-white/70 font-medium">
              {siteConfig.secondaryTitle}
            </span>
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mx-auto mb-8 max-w-xl text-sm sm:text-base leading-relaxed text-white/50 sm:mb-9 sm:max-w-2xl"
        >
          {siteConfig.heroDescription}
        </motion.p>

        {/* Primary & Secondary Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          {/* Primary Action 1: View Projects */}
          <MagneticButton href="#projects" variant="primary">
            <ExternalLink size={16} />
            View Projects
          </MagneticButton>

          {/* Primary Action 2: View Resume */}
          {parsedResume.isValid && parsedResume.viewUrl ? (
            <MagneticButton href={parsedResume.viewUrl} variant="secondary">
              <FileText size={16} />
              View Resume
            </MagneticButton>
          ) : (
            <MagneticButton href="#certifications" variant="secondary">
              <FileText size={16} />
              View Credentials
            </MagneticButton>
          )}

          {/* Secondary Action 1: Contact Me */}
          <MagneticButton href="#contact" variant="secondary">
            <Mail size={16} />
            Contact Me
          </MagneticButton>

          {/* Secondary Action 2: LinkedIn */}
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="glass flex h-11 items-center gap-2 rounded-full px-5 text-xs font-semibold text-white/80 transition-all duration-300 hover:border-accent-violet hover:text-white hover:shadow-[0_0_20px_rgba(124,92,255,0.2)]"
          >
            <LinkedinIcon size={15} />
            LinkedIn
          </a>
        </motion.div>

        {/* Social Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-10 flex items-center justify-center gap-3"
        >
          {[
            { icon: GithubIcon, href: siteConfig.github, label: "GitHub" },
            { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:border-accent-violet/40 hover:text-accent-violet hover:shadow-[0_0_15px_rgba(124,92,255,0.25)]"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {tagCloud.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 w-full border-t border-white/[0.06] bg-black/40 backdrop-blur-md">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y md:divide-y-0 divide-white/[0.06] md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.95 + i * 0.08 }}
              className="flex flex-col items-center p-5 text-center transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="mb-0.5 font-display text-base font-bold text-accent-violet">
                {stat.num}
              </span>
              <span className="text-xs font-bold text-white/90">
                {stat.label}
              </span>
              <span className="text-[11px] text-white/40 mt-0.5">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="mt-8 flex flex-col items-center gap-1.5 text-white/30"
      >
        <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll Down</span>
        <ArrowDown size={14} className="animate-bounce text-accent-violet" />
      </motion.div>
    </section>
  );
}
