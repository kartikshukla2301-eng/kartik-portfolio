"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { CountUp } from "@/components/motion/CountUp";
import { gsap, motionDisabled } from "@/lib/gsap";
import { isIntroPlaying, whenIntroDone } from "@/lib/intro";
import { useContent } from "@/components/providers/ContentProvider";
import { parseGoogleDriveUrl } from "@/lib/drive";


export function Hero() {
  const { profile, experiences, projects, certifications } = useContent();
  const flagship = projects.find((p) => p.live) ?? null;
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const parsedResume = parseGoogleDriveUrl(profile.resumeUrl);

  const stats = [
    { value: experiences.length, pad: 2, label: "Internships", detail: "Healthcare, IoT, Python" },
    { value: projects.length, pad: 2, label: "Flagship projects", detail: "AI and full stack" },
    { value: certifications.length, pad: 2, label: "Credentials", detail: "Cloud, data, AI" },
    { value: 7.9, decimals: 1, label: "CGPA", detail: "B.Tech CSE, 2023-27" },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const items = section.querySelectorAll<HTMLElement>("[data-hero-in]");

    if (motionDisabled()) {
      gsap.set(items, { clearProps: "all" });
      return;
    }

    const ctx = gsap.context(() => {
      const intro = gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.55,
        paused: isIntroPlaying(),
      });
      whenIntroDone(() => intro.play());

      // Portrait drifts slower than the page while the hero scrolls away.
      gsap.to(portraitRef.current, {
        yPercent: 12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[#0B0A08]"
    >
      {/* Atmosphere: warm floor glow, a soft beam, and the portrait fading into the dark */}
      <div className="court-floor-glow absolute inset-0 z-0" />
      <div className="hero__beam" aria-hidden="true" />
      <div ref={portraitRef} className="hero__portrait" aria-hidden="true">
        <Image
          src={profile.portrait.src}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover object-[50%_15%]"
        />
      </div>

      {/* Edge-to-edge display title */}
      <div className="relative z-10 px-4 pt-24 sm:px-6 sm:pt-28">
        <SplitReveal as="h1" trigger="load" by="chars" className="hero__title font-display uppercase">
          {profile.name}
        </SplitReveal>
      </div>

      <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-1 flex-col justify-end gap-8 px-4 pb-10 pt-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <SplitReveal
            as="p"
            trigger="load"
            by="words"
            delay={0.35}
            className="mb-4 font-display text-3xl uppercase leading-none tracking-wide text-[#C96F4A] sm:text-4xl lg:text-5xl"
          >
            Full Stack Developer // AI Engineer
          </SplitReveal>

          <p data-hero-in className="mb-7 max-w-md text-sm leading-relaxed text-[rgba(255,250,240,0.72)] sm:text-base">
            {profile.heroDescription}
          </p>

          <div data-hero-in className="mb-7 flex flex-wrap items-center gap-3">
            <InfinityButton href="#experience" variant="light" withArrow>
              See the work
            </InfinityButton>
            {parsedResume.isValid && parsedResume.viewUrl ? (
              <InfinityButton href={parsedResume.viewUrl} variant="ghost" withArrow target="_blank">
                Resume
              </InfinityButton>
            ) : (
              <InfinityButton href="#certifications" variant="ghost" withArrow>
                Credentials
              </InfinityButton>
            )}
          </div>

          <div
            data-hero-in
            className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[rgba(255,250,240,0.55)]"
          >
            <div className="flex items-center gap-2">
              {[
                { icon: GithubIcon, href: profile.github, label: "GitHub" },
                { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D] text-[rgba(255,250,240,0.7)] transition-colors duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1]"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
            <span className="flex items-center gap-1.5">
              <MapPin size={12} className="text-[#C96F4A]" />
              {profile.location}
            </span>
          </div>
        </div>

        <div data-hero-in className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(255,250,240,0.4)]">
            Details win projects.
          </p>
          {flagship && (
            <a
              href={flagship.live}
              target="_blank"
              rel="noopener noreferrer"
              className="group font-mono text-[11px] uppercase tracking-[0.16em] text-[#FFD6A1]"
            >
              <span className="text-[rgba(255,250,240,0.45)]">Now building / </span>
              <span className="border-b border-[#C96F4A]/60 pb-0.5 transition-colors group-hover:border-[#FFD6A1]">
                {flagship.title}
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Stats strip: counts up when it enters view */}
      <div className="relative z-20 w-full border-t border-[rgba(255,250,240,0.12)] bg-[#12100D]/85 backdrop-blur-xl">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-[rgba(255,250,240,0.1)] md:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-3 py-4 text-center sm:py-5 ${i > 1 ? "border-t border-[rgba(255,250,240,0.1)] md:border-t-0" : ""}`}
            >
              <dt className="order-2 mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[rgba(255,250,240,0.85)] sm:text-[11px]">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-4xl leading-none text-[#FFD6A1] sm:text-5xl">
                <CountUp value={stat.value} pad={stat.pad} decimals={stat.decimals} delay={i * 0.08} />
              </dd>
              <span className="order-3 mt-0.5 hidden font-mono text-[10px] text-[rgba(255,250,240,0.4)] sm:block">
                {stat.detail}
              </span>
            </div>
          ))}
        </dl>
        <div className="flex items-center justify-center gap-2 pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[rgba(255,250,240,0.4)]">
          <span>Scroll to explore</span>
          <ArrowDown size={11} className="animate-bounce text-[#C96F4A]" />
        </div>
      </div>
    </section>
  );
}
