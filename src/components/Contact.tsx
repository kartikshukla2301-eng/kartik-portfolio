"use client";

import React from "react";
import { motion as m } from "framer-motion";
import { Mail, Send, ArrowRight } from "lucide-react";

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

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

export const Contact: React.FC = () => {

  return (
    <section id="contact" className="relative pt-24 pb-12 bg-dark-bg overflow-hidden">
      {/* Background divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      {/* Ambient background glows */}
      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 min-[360px]:px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col mb-16">
          <h2 className="text-xs font-bold text-secondary uppercase tracking-widest mb-3">
            08 . Collaboration
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Get In Touch
          </h3>
          <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-secondary mt-4 rounded-full" />
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mb-24">
          
          {/* Left Column: Direct Call to Action */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">
                Let's Build Something Amazing
              </h4>
              <p className="text-sm text-white/50 leading-relaxed mb-6">
                I am actively seeking B.Tech internship opportunities, collaborative open-source ventures, and full-stack software engineer roles. Have a project or role in mind? Reach out!
              </p>
              
              {/* Direct Mail Card */}
              <Card className="border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] p-4 min-[360px]:p-5 w-fit flex items-center gap-4 mb-8" hoverable={false}>
                <div className="p-3 rounded-xl border border-secondary/20 bg-secondary/5 text-secondary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    Direct Email
                  </span>
                  <a
                    href="mailto:kartikshukla2301@gmail.com"
                    className="text-sm font-semibold text-white hover:text-secondary block mt-0.5"
                  >
                    kartikshukla2301@gmail.com
                  </a>
                </div>
              </Card>
            </div>

            {/* Social Channels row */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/kartikshukla2301-eng"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white text-white/50 transition-all"
                aria-label="GitHub Link"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kartik-shukla-cse"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white text-white/50 transition-all"
                aria-label="LinkedIn Link"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/_ig_kartikk"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/5 hover:text-white text-white/50 transition-all"
                aria-label="Instagram Link"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7">
            <Card
              className="border border-white/10 bg-white/[0.01] hover:bg-white/[0.02] p-5 min-[360px]:p-6 md:p-8 h-full"
              hoverable={false}
            >
              <m.form
                action="https://formspree.io/f/mjgdjjon"
                method="POST"
                className="space-y-6 flex flex-col justify-between h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <input
                  type="hidden"
                  name="_subject"
                  value="New Portfolio Contact Message"
                />

                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-white/60 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-primary/50 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-white/60 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="yourname@domain.com"
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-secondary/50 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-secondary/30 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col">
                    <label className="text-xs font-semibold text-white/60 mb-2">Message</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project or vacancy..."
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 focus:border-primary/50 text-white placeholder-white/20 text-sm focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                    />
                  </div>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-full gap-2 py-3 justify-center text-sm font-semibold mt-4"
                >
                  Send Message <Send className="w-4 h-4 text-secondary" />
                </Button>
              </m.form>
            </Card>
          </div>

        </div>

        {/* Footer block */}
        <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-xs text-white/45 leading-relaxed">
            <p>© {new Date().getFullYear()} Kartik Shukla. All Rights Reserved.</p>
            <p className="mt-1">
              Built with Next.js, Framer Motion, and Tailwind CSS.
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-white/50 select-none">
            <a href="#home" className="hover:text-white transition-colors duration-150">Home</a>
            <a href="#about" className="hover:text-white transition-colors duration-150">About</a>
            <a href="#projects" className="hover:text-white transition-colors duration-150">Projects</a>
            <a href="#resume" className="hover:text-white transition-colors duration-150">Resume</a>
          </div>
        </footer>

      </div>
    </section>
  );
};
