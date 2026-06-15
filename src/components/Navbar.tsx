"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/Button";

const NAV_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certifications", href: "#certifications" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll detection for glass background toggle
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -50% 0px", // Focus on the middle of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveSection(targetId);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? "glass-navbar py-4 shadow-2xl shadow-black/30"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-xl font-bold tracking-tight text-white flex items-center gap-2 group"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <span className="bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent group-hover:to-secondary transition-all duration-300">
            Kartik Shukla
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const itemId = item.href.replace("#", "");
              const isActive = activeSection === itemId;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-medium tracking-wide transition-all duration-300 relative py-1 ${
                      isActive ? "text-white" : "text-white/60 hover:text-white/90"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary to-secondary rounded-full" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <a href="/resume.pdf" download="Kartik_Shukla_Resume.pdf">
            <Button variant="outline" size="sm" className="gap-1 bg-white/5 border-white/10 hover:border-primary/30">
              Resume <ArrowUpRight className="w-4 h-4 text-primary" />
            </Button>
          </a>
        </nav>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white/80 hover:text-white focus:outline-none p-1.5 glass-panel rounded-lg"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel-heavy py-6 px-6 border-b border-white/10 shadow-3xl animate-in fade-in slide-in-from-top-4 duration-300">
          <ul className="flex flex-col gap-4 mb-6">
            {NAV_ITEMS.map((item) => {
              const itemId = item.href.replace("#", "");
              const isActive = activeSection === itemId;
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`block py-2 text-lg font-medium border-l-2 pl-4 transition-all duration-200 ${
                      isActive
                        ? "border-primary text-white bg-primary/5"
                        : "border-transparent text-white/60 hover:text-white/90"
                    }`}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
          <a href="/resume.pdf" download="Kartik_Shukla_Resume.pdf" className="block w-full">
            <Button variant="primary" size="md" className="w-full gap-2 justify-center">
              Download Resume <ArrowUpRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      )}
    </header>
  );
};
