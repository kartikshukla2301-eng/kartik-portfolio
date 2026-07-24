"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/data";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !lineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 0.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="resume" className="relative py-32 px-4">
      <div className="mx-auto max-w-4xl" ref={containerRef}>
        <SectionHeading
          eyebrow="Journey"
          title="Development Timeline"
          description="A trajectory from fundamentals to AI engineering."
        />

        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-px">
            <div
              ref={lineRef}
              className="w-full origin-top bg-gradient-to-b from-accent-violet via-accent-cyan to-accent-violet"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, i) => (
              <TimelineItem key={item.year} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timeline)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
    >
      {/* Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="absolute left-6 z-10 -translate-x-1/2 md:left-1/2"
      >
        <div className="h-3 w-3 rounded-full border-2 border-accent-violet bg-background">
          <div className="absolute inset-0 animate-ping rounded-full bg-accent-violet/30" />
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`ml-14 md:ml-0 ${
          isLeft
            ? "md:w-[calc(50%-2rem)] md:pr-12"
            : "md:w-[calc(50%-2rem)] md:pl-12 md:ml-auto"
        }`}
      >
        <div className="premium-card glass rounded-xl p-6 transition-all duration-300">
          <span className="mb-2 inline-block rounded-full bg-accent-violet/10 px-3 py-1 font-display text-xs font-bold text-accent-violet">
            {item.year}
          </span>
          <h3
            className="mb-1 text-lg font-bold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {item.title}
          </h3>
          <p className="text-sm text-white/50">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}
