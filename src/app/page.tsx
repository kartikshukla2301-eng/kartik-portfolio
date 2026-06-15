import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Certifications } from "@/components/Certifications";
import { Timeline } from "@/components/Timeline";
import { GitHubActivity } from "@/components/GitHubActivity";
import { DeveloperAI } from "@/components/DeveloperAI";
import { ResumeSection } from "@/components/ResumeSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      {/* Sticky Global Header Navbar */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="flex-grow">
        
        {/* Landing Hero Screen */}
        <Hero />

        {/* Career Statistics Dashboard Card grid */}
        <Stats />

        {/* Mindset & Value Statement */}
        <About />

        {/* Technical stack capabilities */}
        <Skills />

        {/* Project Showcases */}
        <Projects />

        {/* Certifications showcase list */}
        <Certifications />

        {/* Career timeline checkpoints */}
        <Timeline />

        {/* Github code commits SVG activity grid */}
        <GitHubActivity />

        {/* Developer AI coming soon teaser */}
        <DeveloperAI />

        {/* Resume snapshot recruiter page */}
        <ResumeSection />

        {/* Contact message board and minimal footer */}
        <Contact />

      </main>
    </>
  );
}
