"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Timeline } from "@/components/sections/Timeline";
import { GitHubSection } from "@/components/sections/GitHub";
import { RecruiterDashboard } from "@/components/sections/RecruiterDashboard";
import { Contact } from "@/components/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { useWelcomeVoice, WelcomeVoiceControls } from "@/components/ui/WelcomeVoice";
import { PageLoader } from "@/components/ui/PageLoader";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { NebulaGlow } from "@/components/background/NebulaGlow";
import { NoiseOverlay } from "@/components/background/NoiseOverlay";
import { AdSenseBanner } from "@/components/ui/AdSenseBanner";

const LenisProvider = dynamic(
  () => import("@/components/providers/LenisProvider").then((m) => m.LenisProvider),
  { ssr: false }
);

export default function Home() {
  const { speak } = useWelcomeVoice();
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sec = params.get("section");
      if (sec) {
        setTargetSection(sec);
      }
    }
  }, []);

  const handleIntroEnter = useCallback(() => {
    // Small delay so the transition finishes before voice starts
    setTimeout(() => speak(), 400);
  }, [speak]);

  if (targetSection === "experience") {
    return (
      <main className="min-h-screen bg-[#0B0A08] py-16 px-4 sm:px-6 lg:px-8">
        <Experience />
      </main>
    );
  }

  if (targetSection === "github") {
    return (
      <main className="min-h-screen bg-[#0B0A08] py-16 px-4 sm:px-6 lg:px-8">
        <GitHubSection />
      </main>
    );
  }

  return (
    <LenisProvider>
      {/* Cinematic intro screen */}
      <PageLoader onEnter={handleIntroEnter} />

      {/* Scroll progress bar */}
      <ScrollProgress />

      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Welcome voice controls (mute/replay) */}
      <WelcomeVoiceControls />

      {/* Premium Infinity Socks Court Background */}
      <NebulaGlow />
      <NoiseOverlay />

      {/* Content */}
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <SectionReveal id="about" direction="up" glow>
          <About />
        </SectionReveal>
        <SectionReveal id="skills" direction="left">
          <Skills />
        </SectionReveal>
        <SectionReveal id="experience" direction="right">
          <Experience />
        </SectionReveal>
        <SectionReveal id="projects" direction="up" glow>
          <Projects />
        </SectionReveal>
        <AdSenseBanner slot="7237825718" />
        <SectionReveal id="certifications" direction="scale">
          <Certifications />
        </SectionReveal>
        <SectionReveal id="timeline" direction="left" parallax>
          <Timeline />
        </SectionReveal>
        <SectionReveal direction="right">
          <GitHubSection />
        </SectionReveal>
        <SectionReveal direction="up" glow>
          <RecruiterDashboard />
        </SectionReveal>
        <AdSenseBanner slot="7237825718" />
        <SectionReveal id="contact" direction="up">
          <Contact />
        </SectionReveal>
      </main>
    </LenisProvider>
  );
}
