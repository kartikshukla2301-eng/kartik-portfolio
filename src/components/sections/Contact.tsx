"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail } from "lucide-react";
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
          title="Let's Build Something Amazing"
          description="Actively seeking B.Tech internships, open-source collaboration, and full-stack roles."
        />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>

          {/* Direct Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center gap-6"
          >
            <div className="glass rounded-2xl p-6">
              <h3
                className="mb-4 text-lg font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Direct Contact
              </h3>

              <a
                href={`mailto:${siteConfig.email}`}
                className="mb-6 flex items-center gap-3 text-white/60 transition-colors hover:text-accent-violet"
              >
                <Mail size={16} />
                <span className="text-sm">{siteConfig.email}</span>
              </a>

              <div className="flex gap-3">
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
                    className="glass flex h-10 w-10 items-center justify-center rounded-full text-white/50 transition-all duration-300 hover:border-accent-violet/30 hover:text-accent-violet hover:shadow-[0_0_15px_rgba(124,92,255,0.15)]"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
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
    window.location.href = `mailto:${siteConfig.email}?subject=Portfolio Contact from ${formState.name}&body=${formState.message}`;
  };

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 space-y-5">
      {[
        { name: "name", label: "Name", type: "text" },
        { name: "email", label: "Email", type: "email" },
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
            className="peer w-full rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all duration-300 focus:border-accent-violet/40 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(124,92,255,0.08)]"
          />
          <label
            className={`pointer-events-none absolute left-4 transition-all duration-300 ${
              focused === field.name || formState[field.name as keyof typeof formState]
                ? "top-2 text-[10px] text-accent-violet"
                : "top-3.5 text-sm text-white/30"
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
          className="peer w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 pt-5 pb-2 text-sm text-white outline-none transition-all duration-300 focus:border-accent-violet/40 focus:bg-white/[0.07] focus:shadow-[0_0_15px_rgba(124,92,255,0.08)]"
        />
        <label
          className={`pointer-events-none absolute left-4 transition-all duration-300 ${
            focused === "message" || formState.message
              ? "top-2 text-[10px] text-accent-violet"
              : "top-3.5 text-sm text-white/30"
          }`}
        >
          Message
        </label>
      </div>

      <MagneticButton
        variant="primary"
        className="w-full justify-center"
      >
        <Send size={14} />
        Send Message
      </MagneticButton>
    </form>
  );
}
