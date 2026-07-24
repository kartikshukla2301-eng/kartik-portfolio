"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, Mail, ExternalLink, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { siteConfig, tagCloud } from "@/lib/data";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const stats = [
  {
    num: "01",
    label: "AI Engineer Journey",
    detail: "B.Tech CSE 2023–2027",
  },
  {
    num: "03",
    label: "Featured Projects",
    detail: "AI & Full Stack Apps",
  },
  {
    num: "04",
    label: "Professional Certifications",
    detail: "AWS, MongoDB, Claude Code",
  },
  {
    num: "24/7",
    label: "Learning & Building",
    detail: "Always Shipping",
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

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="mb-10 flex justify-center"
        >
          <div className="portrait-frame group relative">
            {/* Outer glow rings */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[rgba(124,92,255,0.15)] via-[rgba(34,211,238,0.1)] to-[rgba(124,92,255,0.15)] opacity-0 blur-xl transition-all duration-700 group-hover:opacity-100" />
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-accent-violet/40 via-accent-cyan/30 to-accent-violet/40 opacity-60" />

            {/* Main image container */}
            <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48 md:h-56 md:w-56">
              {/* Glassmorphism ring */}
              <div className="absolute inset-0 rounded-full border-2 border-white/10 shadow-[0_0_40px_rgba(124,92,255,0.2),0_0_80px_rgba(34,211,238,0.1)]" />

              {/* Portrait image */}
              <Image
                src={siteConfig.portrait.src}
                alt={siteConfig.portrait.alt}
                width={siteConfig.portrait.width}
                height={siteConfig.portrait.height}
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />

              {/* Cinematic lighting overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[rgba(3,3,3,0.4)] via-transparent to-[rgba(124,92,255,0.05)]" />

              {/* Soft inner glow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_30px_rgba(124,92,255,0.15)]" />
            </div>

            {/* Floating accent dots */}
            <motion.div
              animate={{ y: [-3, 3, -3], x: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 top-4 h-2 w-2 rounded-full bg-accent-cyan/60 shadow-[0_0_10px_rgba(34,211,238,0.4)]"
            />
            <motion.div
              animate={{ y: [2, -4, 2], x: [1, -3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 bottom-8 h-1.5 w-1.5 rounded-full bg-accent-violet/60 shadow-[0_0_10px_rgba(124,92,255,0.4)]"
            />
            <motion.div
              animate={{ y: [-2, 3, -2] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute right-6 -bottom-1 h-1 w-1 rounded-full bg-accent-amber/50 shadow-[0_0_8px_rgba(255,184,107,0.3)]"
            />
          </div>
        </motion.div>

        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Badge variant="accent" pulse>
            Available for Internships & Projects
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6"
          style={{ y: contentY }}
        >
          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-gradient">
              <AnimatedText text="Hi, I'm" delay={0.4} />
            </span>
            <br />
            <span className="text-white">
              <AnimatedText text="Kartik Shukla" delay={0.7} />
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-lg text-[rgba(255,255,255,0.6)] sm:text-xl"
        >
          AI Engineer & Full Stack Developer — I build intelligent AI-powered
          products and design scalable, performance-driven web applications that
          solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton href="#projects" variant="primary">
            <ExternalLink size={16} />
            View Projects
          </MagneticButton>
          <MagneticButton href={siteConfig.resumeUrl} variant="secondary">
            <Download size={16} />
            Download Resume
          </MagneticButton>
        </motion.div>

        {/* Social Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16 flex items-center justify-center gap-4"
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
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-[rgba(255,255,255,0.6)] transition-all duration-300 hover:border-accent-violet/30 hover:text-accent-violet hover:shadow-[0_0_20px_rgba(124,92,255,0.2)]"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16 flex flex-wrap items-center justify-center gap-2"
        >
          {tagCloud.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 w-full border-t border-white/5">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.0 + i * 0.1 }}
              className="flex flex-col items-center px-4 py-6 text-center transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <span className="mb-1 font-display text-sm font-bold tracking-widest text-accent-violet">
                {stat.num}
              </span>
              <span className="text-sm font-medium text-white/80">
                {stat.label}
              </span>
              <span className="text-xs text-[rgba(255,255,255,0.4)]">{stat.detail}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-[rgba(255,255,255,0.3)]"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
