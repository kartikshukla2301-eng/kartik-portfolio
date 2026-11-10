"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Download, ExternalLink, LogOut, Save } from "lucide-react";
import {
  CertificationsTab,
  ExperienceTab,
  ProfileTab,
  ProjectsTab,
  SkillsTab,
  TimelineTab,
} from "@/components/admin/tabs";
import { parseContent, type SiteContent } from "@/lib/content/schema";

const TABS = [
  { id: "profile", label: "Profile and contact" },
  { id: "experience", label: "Internships" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "skills", label: "Skills" },
  { id: "timeline", label: "Timeline" },
] as const;
type TabId = (typeof TABS)[number]["id"];

const SETUP_SQL = `create table if not exists site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);
alter table site_content enable row level security;
insert into storage.buckets (id, name, public)
  values ('portfolio', 'portfolio', true)
  on conflict (id) do nothing;`;

/** "experiences.2.company: Required" -> "Internships #3 > company: Required" */
function friendly(issue: string): string {
  const names: Record<string, string> = {
    profile: "Profile",
    experiences: "Internships",
    projects: "Projects",
    secondaryProjects: "Experiments",
    certifications: "Certificates",
    skills: "Skills",
    timeline: "Timeline",
  };
  const [path, ...rest] = issue.split(": ");
  const parts = path.split(".");
  const head = names[parts[0]] ?? parts[0];
  const index = /^\d+$/.test(parts[1] ?? "") ? ` #${Number(parts[1]) + 1}` : "";
  const field = parts.slice(index ? 2 : 1).join(" > ");
  return `${head}${index}${field ? ` > ${field}` : ""}: ${rest.join(": ")}`;
}

export function AdminEditor({
  initial,
  source,
  databaseConfigured,
}: {
  initial: SiteContent;
  source: "database" | "defaults";
  databaseConfigured: boolean;
}) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [tab, setTab] = useState<TabId>("profile");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string; details?: string[] } | null>(null);
  const [copied, setCopied] = useState(false);

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const patch = (next: Partial<SiteContent>) => setContent((c) => ({ ...c, ...next }));

  async function save() {
    setMessage(null);
    const checked = parseContent(content);
    if (!checked.ok) {
      setMessage({ kind: "error", text: "Fix these fields first:", details: checked.errors.slice(0, 12).map(friendly) });
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checked.data),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; details?: string[]; content?: SiteContent };
      if (res.status === 401) {
        setMessage({ kind: "error", text: "Your session expired. Reload the page and sign in again (your edits are still on screen)." });
      } else if (!res.ok) {
        setMessage({ kind: "error", text: data.error ?? `Could not save (${res.status})`, details: data.details?.map(friendly) });
      } else {
        const saved = data.content ?? checked.data;
        setContent(saved);
        setSavedJson(JSON.stringify(saved));
        setMessage({ kind: "ok", text: "Saved. The website now shows the new content." });
      }
    } catch {
      setMessage({ kind: "error", text: "Network problem. Nothing was saved; try again." });
    } finally {
      setSaving(false);
    }
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  function exportJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `portfolio-content-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copySql() {
    await navigator.clipboard.writeText(SETUP_SQL).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 pb-32 pt-6 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#C96F4A]">Admin</p>
          <h1 className="font-display text-4xl uppercase leading-none text-[#F6F0E2] sm:text-5xl">Edit my portfolio</h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,250,240,0.16)] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[rgba(255,250,240,0.75)] hover:border-[#C96F4A] hover:text-[#FFD6A1]"
          >
            <ExternalLink size={13} /> View site
          </a>
          <button
            type="button"
            onClick={exportJson}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,250,240,0.16)] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[rgba(255,250,240,0.75)] hover:border-[#C96F4A] hover:text-[#FFD6A1]"
          >
            <Download size={13} /> Backup
          </button>
          <button
            type="button"
            onClick={signOut}
            className="flex items-center gap-1.5 rounded-lg border border-[rgba(255,250,240,0.16)] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[rgba(255,250,240,0.75)] hover:border-red-400/60 hover:text-red-300"
          >
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </header>

      {!databaseConfigured && (
        <div role="note" className="mb-6 rounded-2xl border border-[#FFD6A1]/40 bg-[#FFD6A1]/10 p-4 text-sm text-[#F6F0E2]">
          <p className="font-semibold text-[#FFD6A1]">Database not connected yet: you can edit, but Save is disabled.</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5 text-[13px] text-[rgba(255,250,240,0.8)]">
            <li>Create a free project at supabase.com.</li>
            <li>
              Open <b>SQL Editor</b>, paste this and run it:
              <button type="button" onClick={copySql} className="ml-2 inline-flex items-center gap-1 rounded border border-white/20 px-2 py-0.5 font-mono text-[10px] uppercase hover:bg-white/10">
                {copied ? <Check size={11} /> : <Copy size={11} />} {copied ? "Copied" : "Copy SQL"}
              </button>
              <pre className="mt-2 overflow-x-auto rounded-lg bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-[rgba(255,250,240,0.8)]">{SETUP_SQL}</pre>
            </li>
            <li>
              In <b>Project Settings &gt; API</b> copy the project URL and the <b>service_role</b> (secret) key.
            </li>
            <li>
              Add <code className="font-mono">SUPABASE_URL</code> and <code className="font-mono">SUPABASE_SERVICE_ROLE_KEY</code> to Vercel (and .env.local), then redeploy.
            </li>
          </ol>
        </div>
      )}

      {databaseConfigured && source === "defaults" && (
        <p className="mb-6 rounded-xl border border-[rgba(255,250,240,0.14)] bg-[#12100D] p-3 text-xs text-[rgba(255,250,240,0.65)]">
          Showing the built-in content. Your first <b>Save</b> stores everything in the database; after that the website reads from there.
        </p>
      )}

      <nav aria-label="Sections" className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-current={tab === t.id ? "page" : undefined}
            className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
              tab === t.id
                ? "border-[#C96F4A] bg-[#C96F4A]/20 text-[#FFD6A1]"
                : "border-[rgba(255,250,240,0.16)] text-[rgba(255,250,240,0.65)] hover:border-[#C96F4A]/60"
            }`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {tab === "profile" && (
        <ProfileTab profile={content.profile} onChange={(profile) => patch({ profile })} canUpload={databaseConfigured} />
      )}
      {tab === "experience" && <ExperienceTab items={content.experiences} onChange={(experiences) => patch({ experiences })} />}
      {tab === "projects" && (
        <ProjectsTab
          projects={content.projects}
          secondary={content.secondaryProjects}
          onProjects={(projects) => patch({ projects })}
          onSecondary={(secondaryProjects) => patch({ secondaryProjects })}
        />
      )}
      {tab === "certificates" && (
        <CertificationsTab items={content.certifications} onChange={(certifications) => patch({ certifications })} canUpload={databaseConfigured} />
      )}
      {tab === "skills" && <SkillsTab items={content.skills} onChange={(skills) => patch({ skills })} />}
      {tab === "timeline" && <TimelineTab items={content.timeline} onChange={(timeline) => patch({ timeline })} />}

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(255,250,240,0.14)] bg-[#0B0A08]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0 text-xs" aria-live="polite">
            {message ? (
              <div className={message.kind === "ok" ? "text-[#4ADE80]" : "text-red-400"}>
                <p className="font-medium">{message.text}</p>
                {message.details && (
                  <ul className="mt-1 max-h-24 list-disc space-y-0.5 overflow-y-auto pl-4 text-[11px]">
                    {message.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <span className={dirty ? "text-[#FFD6A1]" : "text-[rgba(255,250,240,0.45)]"}>
                {dirty ? "You have unsaved changes" : "All changes saved"}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={save}
            disabled={saving || !dirty || !databaseConfigured}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#C96F4A] px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F6F0E2] transition-colors hover:bg-[#B4603E] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Save size={15} /> {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
