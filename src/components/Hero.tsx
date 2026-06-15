"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, Download } from "lucide-react";

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { Button } from "./ui/Button";
import { Avatar } from "./Avatar";

const TYPEWRITER_PHRASES = [
  "Building AI Products",
  "Creating Full Stack Applications",
  "Learning & Shipping Every Day",
  "Solving Real-World Problems",
];

export const Hero: React.FC = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const activePhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting characters
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length - 1));
        setTypingSpeed(40); // Delete faster
      }, typingSpeed);
    } else {
      // Typing characters
      timer = setTimeout(() => {
        setCurrentText(activePhrase.substring(0, currentText.length + 1));
        setTypingSpeed(80);
      }, typingSpeed);
    }

    // Phase transition rules
    if (!isDeleting && currentText === activePhrase) {
      // Pause at full phrase
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      // Move to next phrase
      setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex, typingSpeed]);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsEl = document.getElementById("projects");
    if (projectsEl) {
      const navHeight = 80;
      const elementPosition = projectsEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-pattern"
    >
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/10 w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/10 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center z-10">
        
        {/* Left Side: Copy */}
        <div className="col-span-1 lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border-white/10 mb-6 animate-fade-in">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
            </span>
            <span className="text-[10px] min-[360px]:text-xs font-semibold text-white/80 tracking-wider">
              Available for Internships & Projects
            </span>
          </div>

          {/* Name & Title */}
          <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4">
            Hi, I'm{" "}
            <span className="text-gradient-purple-cyan block sm:inline">
              Kartik Shukla
            </span>
          </h1>

          <h2 className="text-lg min-[360px]:text-2xl sm:text-3xl font-bold text-white/95 mb-6 min-h-[40px] flex items-center">
            <span className="border-r-2 border-primary pr-2 animate-pulse">
              {currentText || "\u00A0"}
            </span>
          </h2>

          <p className="text-lg text-white/60 max-w-xl mb-8 leading-relaxed">
            AI Engineer & Full Stack Developer. I build intelligent AI-powered
            products and design scalable, performance-driven web applications that
            solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
            <Button
              variant="primary"
              size="lg"
              className="gap-2"
              onClick={handleScrollToProjects}
            >
              View Projects <ArrowRight className="w-5 h-5" />
            </Button>
            <a href="/resume.pdf" download="Kartik_Shukla_Resume.pdf" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="gap-2 w-full justify-center">
                Download Resume <Download className="w-5 h-5 text-secondary" />
              </Button>
            </a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-6 text-white/50">
            <a
              href="https://github.com/kartikshukla2301-eng"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/kartik-shukla-cse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-6 h-6" />
            </a>
            <a
              href="mailto:kartikshukla2301@gmail.com"
              className="hover:text-white transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

        </div>

        {/* Right Side: Interactive Avatar */}
        <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end items-center">
          <Avatar />
        </div>

      </div>
    </section>
  );
};
