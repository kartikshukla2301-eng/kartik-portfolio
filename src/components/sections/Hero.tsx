"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { ColorFillText } from "@/components/ui/ColorFillText";
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
    detail: "DevLeveler, AI CSV & Intelligent Agents",
  },
  {
    num: "06",
    label: "Verified Credentials",
    detail: "AWS, MongoDB, Python, Softpro",
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

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const portraitOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 35]);

  const parsedResume = parseGoogleDriveUrl(siteConfig.resumeUrl);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-12 bg-[#0B0A08]"
    >
      {/* 3D Warm Copper Scene */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Infinity Socks Court Floor Ambient Lighting */}
      <div className="court-floor-glow absolute inset-0 z-0" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* HUD Top Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D]/90 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#C96F4A] backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C96F4A] animate-pulse" />
          AVAILABLE FOR FULL-TIME ROLES & INTERNSHIPS
        </motion.div>

        {/* Portrait with Court Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          style={{ y: portraitY, scale: portraitScale, opacity: portraitOpacity }}
          className="mb-8 flex justify-center"
        >
          <div className="portrait-frame group relative">
            {/* Main image container */}
            <div className="relative h-36 w-36 overflow-hidden rounded-full sm:h-44 sm:w-44 md:h-52 md:w-52 border-2 border-[rgba(255,250,240,0.2)] shadow-[0_12px_45px_rgba(0,0,0,0.8),0_0_35px_rgba(201,111,74,0.25)]">
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

              {/* Warm court floor reflection overlay */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#0B0A08]/60 via-transparent to-[rgba(255,214,161,0.06)] pointer-events-none" />
            </div>

            {/* Floating copper accent dots */}
            <motion.div
              animate={{ y: [-3, 3, -3], x: [-2, 2, -2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-1 top-4 h-2.5 w-2.5 rounded-full bg-[#FFD6A1] shadow-[0_0_12px_rgba(255,214,161,0.8)]"
            />
            <motion.div
              animate={{ y: [2, -4, 2], x: [1, -3, 1] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -left-2 bottom-8 h-2 w-2 rounded-full bg-[#C96F4A] shadow-[0_0_12px_rgba(201,111,74,0.8)]"
            />
          </div>
        </motion.div>

        {/* Giant Headline with Color-Fill Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-5"
          style={{ y: contentY }}
        >
          <div className="overflow-hidden">
            <ColorFillText
              as="h1"
              dataFill="ghost"
              className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-[#F6F0E2]"
            >
              {siteConfig.name}
            </ColorFillText>
          </div>

          <div className="mt-4">
            <ColorFillText
              as="p"
              dataFill="ghost"
              delay={0.25}
              className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#C96F4A]"
            >
              FULL STACK DEVELOPER // AI SYSTEMS ARCHITECT
            </ColorFillText>
          </div>
        </motion.div>

        {/* Narrative Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mx-auto mb-9 max-w-xl text-sm sm:text-base leading-relaxed text-[rgba(255,250,240,0.65)] font-sans sm:max-w-2xl"
        >
          {siteConfig.heroDescription}
        </motion.p>

        {/* Infinity Socks Action Buttons (Sliding 15deg hover + 3-arrow conveyor) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs uppercase tracking-wider"
        >
          {/* Primary Action: Explore Projects */}
          <InfinityButton href="#projects" variant="terra" withArrow>
            Explore Projects
          </InfinityButton>

          {/* Primary Action 2: View Resume */}
          {parsedResume.isValid && parsedResume.viewUrl ? (
            <InfinityButton href={parsedResume.viewUrl} variant="ghost" withArrow target="_blank">
              Verified Resume
            </InfinityButton>
          ) : (
            <InfinityButton href="#certifications" variant="ghost" withArrow>
              Credentials Vault
            </InfinityButton>
          )}

          {/* Secondary Action: Contact */}
          <InfinityButton href="#contact" variant="ghost" withArrow={false}>
            Initiate Contact
          </InfinityButton>
        </motion.div>

        {/* Social Icons & HUD Metadata Row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[rgba(255,250,240,0.5)]"
        >
          <div className="flex items-center gap-2">
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,250,240,0.14)] bg-[#12100D] text-[rgba(255,250,240,0.6)] transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1] hover:scale-105"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={15} />
              </motion.a>
            ))}
          </div>

          <div className="hidden sm:inline-block h-3 w-px bg-[rgba(255,250,240,0.15)]" />

          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-[#C96F4A]" />
            <span>LUCKNOW / NCR, INDIA</span>
          </div>
        </motion.div>

        {/* Tag Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12 flex flex-wrap items-center justify-center gap-2"
        >
          {tagCloud.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </motion.div>
      </div>

      {/* Stats Counter Strip with Hairline Borders */}
      <div className="relative z-10 w-full border-t border-[rgba(255,250,240,0.12)] bg-[#12100D]/90 backdrop-blur-xl">
        <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-y md:divide-y-0 divide-[rgba(255,250,240,0.1)] md:grid-cols-4 font-mono">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.num}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.85 + i * 0.08 }}
              className="flex flex-col items-center p-5 text-center transition-colors duration-300 hover:bg-[#161310]"
            >
              <span className="mb-0.5 font-display text-2xl font-black text-[#FFD6A1]">
                {stat.num}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-[rgba(255,250,240,0.9)]">
                {stat.label}
              </span>
              <span className="text-[11px] text-[rgba(255,250,240,0.45)] mt-0.5">
                {stat.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-8 flex flex-col items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-[rgba(255,250,240,0.35)]"
      >
        <span>SCROLL DOWN</span>
        <ArrowDown size={13} className="animate-bounce text-[#C96F4A]" />
      </motion.div>
    </section>
  );
}
