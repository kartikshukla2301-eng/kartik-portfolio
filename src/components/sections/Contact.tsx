"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InfinityButton } from "@/components/ui/InfinityButton";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { useContent } from "@/components/providers/ContentProvider";
import { buildMailto } from "@/lib/mail";

const FIELD =
  "w-full rounded-xl border border-[rgba(33,26,18,0.2)] bg-[rgba(255,255,255,0.55)] px-4 py-3.5 font-mono text-sm text-[#211A12] outline-none transition-colors placeholder:text-[rgba(33,26,18,0.4)] focus:border-[#C96F4A] focus:bg-white";

export function Contact() {
  const { profile } = useContent();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.location.href = buildMailto(profile.email, form.name.trim(), form.email.trim(), form.message.trim());
  };

  return (
    <section id="contact" className="light-section relative px-4 py-20 sm:px-6 sm:py-28">
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          tone="light"
          eyebrow="Contact"
          title="Get in touch"
          description="Open to full stack, software engineering and AI application roles, internships and freelance work. Replies usually within a day."
        />

        <SplitReveal
          as="p"
          by="chars"
          className="mb-12 font-display text-[clamp(3.5rem,12vw,9rem)] uppercase leading-[0.85] text-[#211A12] sm:mb-16"
        >
          Say hello.
        </SplitReveal>

        <div className="grid gap-8 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-[rgba(33,26,18,0.14)] bg-[rgba(255,255,255,0.4)] p-6 backdrop-blur-sm sm:p-9"
          >
            <p className="border-b border-[rgba(33,26,18,0.12)] pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#B4603E]">
              Send a message
            </p>

            <div>
              <label htmlFor="c-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(33,26,18,0.6)]">
                Name
              </label>
              <input id="c-name" name="name" type="text" required autoComplete="name" value={form.name} onChange={handleChange} placeholder="Your name" className={FIELD} />
            </div>

            <div>
              <label htmlFor="c-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(33,26,18,0.6)]">
                Email
              </label>
              <input id="c-email" name="email" type="email" required autoComplete="email" inputMode="email" value={form.email} onChange={handleChange} placeholder="you@company.com" className={FIELD} />
            </div>

            <div>
              <label htmlFor="c-message" className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-[rgba(33,26,18,0.6)]">
                Message
              </label>
              <textarea id="c-message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="What are you building?" className={`${FIELD} resize-none`} />
            </div>

            <InfinityButton type="submit" variant="ink" withArrow className="w-full">
              Send message
            </InfinityButton>
            <p className="font-mono text-[10px] text-[rgba(33,26,18,0.5)]">Opens your email app with the message filled in.</p>
          </form>

          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-[rgba(33,26,18,0.14)] bg-[rgba(255,255,255,0.4)] p-6 backdrop-blur-sm sm:p-9">
              <p className="mb-4 border-b border-[rgba(33,26,18,0.12)] pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#B4603E]">
                Direct
              </p>

              <a
                href={`mailto:${profile.email}`}
                className="group mb-4 flex items-center gap-3.5 rounded-xl border border-[rgba(33,26,18,0.14)] bg-[rgba(255,255,255,0.5)] p-3 transition-colors hover:border-[#C96F4A]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C96F4A]/15 text-[#B4603E]">
                  <Mail size={16} />
                </span>
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase text-[rgba(33,26,18,0.5)]">Email</span>
                  <span className="block truncate font-mono text-xs font-semibold text-[#211A12]">{profile.email}</span>
                </span>
              </a>

              <div className="mb-6 flex items-center gap-3.5 rounded-xl border border-[rgba(33,26,18,0.1)] p-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C96F4A]/10 text-[#B4603E]">
                  <MapPin size={16} />
                </span>
                <span className="font-mono text-xs text-[rgba(33,26,18,0.75)]">
                  {profile.location}
                  <span className="block text-[10px] text-[#B4603E]">Open to remote and relocation</span>
                </span>
              </div>

              {profile.showPhone && profile.phone && (
                <a
                  href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                  className="group mb-6 flex items-center gap-3.5 rounded-xl border border-[rgba(33,26,18,0.14)] bg-[rgba(255,255,255,0.5)] p-3 transition-colors hover:border-[#C96F4A]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C96F4A]/15 text-[#B4603E]">
                    <Phone size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase text-[rgba(33,26,18,0.5)]">Phone</span>
                    <span className="block truncate font-mono text-xs font-semibold text-[#211A12]">{profile.phone}</span>
                  </span>
                </a>
              )}

              <div className="flex gap-2.5">
                {[
                  { icon: GithubIcon, href: profile.github, label: "GitHub" },
                  { icon: LinkedinIcon, href: profile.linkedin, label: "LinkedIn" },
                  { icon: InstagramIcon, href: profile.instagram, label: "Instagram" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(33,26,18,0.16)] bg-[rgba(255,255,255,0.5)] text-[#211A12] transition-colors hover:border-[#C96F4A] hover:text-[#B4603E]"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
