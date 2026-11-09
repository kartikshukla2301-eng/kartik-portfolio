"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Brain, Code2, Server, GraduationCap } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutCards, siteConfig } from "@/lib/data";

const iconMap = {
  Brain,
  Code2,
  Server,
  GraduationCap,
};

export function About() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="relative py-32 px-4">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering Reliable Systems & Intelligent AI"
          description="Full Stack Developer and AI Engineer with hands-on experience building production-oriented healthcare systems, scalable web applications, REST APIs and AI-powered applications."
        />

        {/* Portrait + Quote Row */}
        <div className="mb-16 grid gap-8 md:grid-cols-[auto_1fr] md:items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-end"
          >
            <div className="portrait-frame group relative">
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[rgba(79,70,229,0.12)] to-[rgba(13,148,136,0.12)] opacity-0 blur-lg transition-all duration-500 group-hover:opacity-100" />
              <div className="relative h-60 w-48 overflow-hidden rounded-2xl sm:h-72 sm:w-56 border border-[#E2E8F0] shadow-xl">
                <Image
                  src={siteConfig.portrait.src}
                  alt={siteConfig.portrait.alt}
                  width={400}
                  height={500}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYI4Q/SFhSRFJiX0pcU/9oADAMBAAIRAxEAPwD9P//Z"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/10 via-transparent to-[rgba(79,70,229,0.05)]" />
              </div>
            </div>
          </motion.div>

          {/* Pull Quote / Summary */}
          <motion.div
            ref={quoteRef}
            initial={{ opacity: 0, y: 30 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="glass rounded-2xl p-8 text-center md:text-left"
          >
            <p className="text-base sm:text-lg italic leading-relaxed text-[#0F172A]">
              &ldquo;{siteConfig.description}&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3 justify-center md:justify-start">
              <span className="text-xs font-bold text-[#4F46E5]">
                {siteConfig.name}
              </span>
              <span className="text-xs text-[#64748B]">
                B.Tech CSE (2023–2027) • CGPA 7.9/10
              </span>
            </div>
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {aboutCards.map((card, i) => {
            const Icon = iconMap[card.icon];
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <GlassCard tilt className="h-full">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F46E5]/10 text-[#4F46E5]">
                    <Icon size={22} />
                  </div>
                  <h3
                    className="mb-2 text-base font-bold text-[#0F172A]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#475569]">
                    {card.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
