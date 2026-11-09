"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ColorFillText } from "@/components/ui/ColorFillText";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 px-4">
      <div className="mx-auto max-w-5xl" ref={ref}>
        <div className="mb-14">
          <SectionHeading
            eyebrow="Initiate Transmission"
            title="Let's Build Something Extraordinary"
            description="Available for Full Stack Developer, Software Engineer, and AI Application roles. Inquiries for production platforms and enterprise contracts welcomed."
          />

          <div className="mt-4">
            <p className="font-mono text-xs tracking-widest uppercase text-[#C96F4A] mb-2 font-bold">
              CAREER COMMENCE // 2026
            </p>
            <ColorFillText
              as="h2"
              dataFill="ghost"
              className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#F6F0E2]"
            >
              GET IN TOUCH.
            </ColorFillText>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-24">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          {/* Direct Contact & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between gap-6"
          >
            <div className="court-card rounded-2xl p-7 sm:p-9 border border-[rgba(255,250,240,0.14)] bg-[#12100D]/95 backdrop-blur-md">
              <div className="mb-4 flex items-center justify-between border-b border-[rgba(255,250,240,0.08)] pb-3">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[#C96F4A]">
                  COMMUNICATION CHANNEL
                </span>
                <span className="font-mono text-[10px] text-[rgba(255,250,240,0.4)]">
                  DIRECT ACCESS
                </span>
              </div>

              <h3
                className="mb-3 text-xl sm:text-2xl font-bold text-[#F6F0E2]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Direct Communication
              </h3>
              <p className="text-xs sm:text-sm text-[rgba(255,250,240,0.6)] leading-relaxed mb-6 font-sans">
                Direct transmission line for executive discussions, senior technical hiring, or immediate architectural collaboration.
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group mb-6 flex items-center gap-3.5 p-3 rounded-xl border border-[rgba(255,250,240,0.1)] bg-[#161310] transition-colors hover:border-[#C96F4A]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C96F4A]/15 border border-[#C96F4A]/30 text-[#FFD6A1]">
                  <Mail size={16} />
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-[10px] text-[rgba(255,250,240,0.4)] uppercase">
                    PRIMARY INBOX
                  </div>
                  <div className="font-mono text-xs font-semibold text-[#FFD6A1] truncate group-hover:text-[#F6F0E2]">
                    {siteConfig.email}
                  </div>
                </div>
              </a>

              <div className="mb-6 flex items-center gap-3.5 p-3 rounded-xl border border-[rgba(255,250,240,0.08)] bg-[#161310]/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C96F4A]/10 text-[#C96F4A]">
                  <MapPin size={16} />
                </div>
                <div className="font-mono text-xs text-[rgba(255,250,240,0.65)]">
                  <div>LUCKNOW / NCR, INDIA</div>
                  <div className="text-[10px] text-[#C96F4A]">OPEN TO REMOTE & RELOCATION WORLDWIDE</div>
                </div>
              </div>

              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#C96F4A] mb-3">
                  NETWORK NODES
                </p>
                <div className="flex gap-2.5">
                  {[
                    { icon: GithubIcon, href: siteConfig.github, label: "GitHub" },
                    { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                    { icon: InstagramIcon, href: siteConfig.instagram, label: "Instagram" },
                  ].map(({ icon: Icon, href, label }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(255,250,240,0.12)] bg-[#161310] text-[rgba(255,250,240,0.7)] transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1] hover:scale-105"
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-[rgba(255,250,240,0.1)] bg-[#12100D]/80">
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFD6A1] mb-1">
                <CheckCircle size={14} className="text-[#C96F4A]" />
                <span>RESPONSE PROTOCOL // 24-HOUR GUARANTEE</span>
              </div>
              <p className="font-mono text-xs text-[rgba(255,250,240,0.5)]">
                All developer opportunities, recruiters, and engineering inquiries receive personal review within one business day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0D%0A%0D%0AFrom: ${formState.name} (${formState.email})`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="court-card rounded-2xl p-7 sm:p-9 space-y-5 border border-[rgba(255,250,240,0.14)] bg-[#12100D]/95 backdrop-blur-md"
    >
      <div className="mb-2 flex items-center justify-between border-b border-[rgba(255,250,240,0.08)] pb-3 font-mono text-[10px] text-[#C96F4A] tracking-widest uppercase">
        <span>TRANSMISSION ENVELOPE</span>
        <span>SYS.MAIL</span>
      </div>

      {[
        { name: "name", label: "YOUR FULL NAME", type: "text" },
        { name: "email", label: "YOUR EMAIL ADDRESS", type: "email" },
      ].map((field) => (
        <div key={field.name} className="relative">
          <input
            type={field.type}
            name={field.name}
            value={formState[field.name as keyof typeof formState]}
            onChange={handleChange}
            onFocus={() => setFocused(field.name)}
            onBlur={() => setFocused(null)}
            required
            className="peer w-full rounded-xl border border-[rgba(255,250,240,0.12)] bg-[#161310] px-4 pt-6 pb-2.5 font-mono text-sm text-[#F6F0E2] outline-none transition-all duration-300 focus:border-[#C96F4A] focus:bg-[#161310]/90"
          />
          <label
            className={`pointer-events-none absolute left-4 font-mono transition-all duration-300 tracking-wider ${
              focused === field.name || formState[field.name as keyof typeof formState]
                ? "top-1.5 text-[9px] text-[#C96F4A]"
                : "top-4 text-xs text-[rgba(255,250,240,0.4)]"
            }`}
          >
            {field.label}
          </label>
        </div>
      ))}

      <div className="relative">
        <textarea
          name="message"
          value={formState.message}
          onChange={handleChange}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          required
          rows={4}
          className="peer w-full resize-none rounded-xl border border-[rgba(255,250,240,0.12)] bg-[#161310] px-4 pt-6 pb-2.5 font-mono text-sm text-[#F6F0E2] outline-none transition-all duration-300 focus:border-[#C96F4A] focus:bg-[#161310]/90"
        />
        <label
          className={`pointer-events-none absolute left-4 font-mono transition-all duration-300 tracking-wider ${
            focused === "message" || formState.message
              ? "top-1.5 text-[9px] text-[#C96F4A]"
              : "top-4 text-xs text-[rgba(255,250,240,0.4)]"
          }`}
        >
          PROJECT / INQUIRY DETAILS
        </label>
      </div>

      <div className="pt-2">
        <InfinityButton
          type="submit"
          variant="terra"
          withArrow
          className="w-full justify-center"
        >
          SEND TRANSMISSION
        </InfinityButton>
      </div>
    </form>
  );
}
