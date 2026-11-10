import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Timeline } from "@/components/sections/Timeline";
import { GitHubSection } from "@/components/sections/GitHub";
import { RecruiterDashboard } from "@/components/sections/RecruiterDashboard";
import { StitchDemo } from "@/components/sections/StitchDemo";
import { Contact } from "@/components/sections/Contact";
import { Intro } from "@/components/ui/Intro";
import { ChapterHud } from "@/components/ui/ChapterHud";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AdSenseBanner } from "@/components/ui/AdSenseBanner";
import { NebulaGlow } from "@/components/background/NebulaGlow";
import { NoiseOverlay } from "@/components/background/NoiseOverlay";

export default function Home() {
  return (
    <>
      <Intro />
      <CustomCursor />
      <ChapterHud />
      <NebulaGlow />
      <NoiseOverlay />

      <Navbar />
      <main className="relative z-10">
        <Hero />
        <TechMarquee />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <AdSenseBanner />
        <Certifications />
        <Timeline />
        <GitHubSection />
        <RecruiterDashboard />
        <StitchDemo />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
