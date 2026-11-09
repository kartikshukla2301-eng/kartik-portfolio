"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/data";

export function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="relative py-32 px-4">
      <div className="mx-auto max-w-4xl" ref={ref}>
        <SectionHeading
          eyebrow="Get in Touch"
          title="Let's Build Something Great"
          description="Open to Full Stack Developer, Web Developer and Software Development Engineer opportunities."
        />

        <div className="grid gap-8 md:grid-cols-2 mb-20">
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
            <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10">
              <h3
                className="mb-3 text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Direct Communication
              </h3>
              <p className="text-xs text-white/60 leading-relaxed mb-6">
                Feel free to reach out directly via email for job opportunities, project inquiries, or technical collaboration.
              </p>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mb-6 flex items-center gap-3 text-sm font-semibold text-accent-violet transition-colors hover:underline"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-violet/10 text-accent-violet">
                  <Mail size={16} />
                </div>
                <span>{siteConfig.email}</span>
              </a>

              <div className="mb-6 flex items-center gap-3 text-xs text-white/60">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-cyan/10 text-accent-cyan">
                  <MapPin size={16} />
                </div>
                <span>Lucknow / NCR, India • Open to Remote & Relocation</span>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                  Social & Developer Profiles
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
                      className="glass flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all duration-300 hover:border-accent-violet hover:text-white hover:bg-white/10"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon size={16} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2 text-xs font-bold text-accent-violet mb-1">
                <CheckCircle size={14} className="text-emerald-500" />
                Response Guarantee
              </div>
              <p className="text-xs text-white/50">
                I typically review and reply to professional correspondence within 24 hours.
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

  // Preserved existing mailto submission backend logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0D%0A%0D%0AFrom: ${formState.name} (${formState.email})`;
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5 border border-white/10">
      {[
        { name: "name", label: "Your Full Name", type: "text" },
        { name: "email", label: "Your Email Address", type: "email" },
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
            className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all duration-300 focus:border-accent-violet/50 focus:bg-white/[0.07]"
          />
          <label
            className={`pointer-events-none absolute left-4 transition-all duration-300 font-medium ${
              focused === field.name || formState[field.name as keyof typeof formState]
                ? "top-1.5 text-[10px] text-accent-violet"
                : "top-3.5 text-xs text-white/40"
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
          className="peer w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all duration-300 focus:border-accent-violet/50 focus:bg-white/[0.07]"
        />
        <label
          className={`pointer-events-none absolute left-4 transition-all duration-300 font-medium ${
            focused === "message" || formState.message
              ? "top-1.5 text-[10px] text-accent-violet"
              : "top-3.5 text-xs text-white/40"
          }`}
        >
          Your Message
        </label>
      </div>

      <MagneticButton
        variant="primary"
        className="w-full justify-center shadow-lg shadow-accent-violet/20 cursor-pointer"
      >
        <Send size={14} />
        Send Message
      </MagneticButton>
    </form>
  );
}
