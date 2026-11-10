"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, motionDisabled } from "@/lib/gsap";
import { useContent } from "@/components/providers/ContentProvider";

export function Timeline() {
  const { timeline } = useContent();
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return;

    if (motionDisabled()) {
      line.style.transform = "scaleY(1)";
      return;
    }

    const ctx = gsap.context(() => {
      // The line draws itself as you scroll through the list.
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 75%", end: "bottom 60%", scrub: 0.5 },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-tl-item]").forEach((item) => {
        gsap.from(item, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Journey"
          title="From fundamentals to production"
          description="Computer science basics first, then real systems in healthcare, IoT and AI."
        />

        <div ref={rootRef} className="relative">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-[rgba(255,250,240,0.1)] md:left-1/2">
            <div ref={lineRef} className="h-full w-full origin-top bg-[#C96F4A]" style={{ transform: "scaleY(0)" }} />
          </div>

          <ol className="space-y-12">
            {timeline.map((item, i) => {
              const left = i % 2 === 0;
              return (
                <li key={item.year + item.title} data-tl-item className="relative pl-12 md:pl-0">
                  <span className="absolute left-4 top-6 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-[#C96F4A] bg-[#0B0A08] md:left-1/2" />
                  <div className={`md:w-[calc(50%-2.5rem)] ${left ? "md:mr-auto md:pr-2" : "md:ml-auto md:pl-2"}`}>
                    <div className="show-card p-6">
                      <p className="font-display text-5xl leading-none text-[#C96F4A]">{item.year}</p>
                      <h3 className="mt-3 font-display text-2xl uppercase leading-none text-[#F6F0E2]">{item.title}</h3>
                      <p className="mt-2 text-xs leading-relaxed text-[rgba(255,250,240,0.65)]">{item.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
