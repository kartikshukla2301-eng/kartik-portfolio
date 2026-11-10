"use client";

import { useState, type FormEvent } from "react";
import { Lock } from "lucide-react";

export function AdminLogin({ problems }: { problems: string[] }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        window.location.reload();
        return;
      }
      setError(data.error ?? `Sign in failed (${res.status})`);
    } catch {
      setError("Network problem. Try again.");
    } finally {
      setBusy(false);
    }
  }

  if (problems.length > 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md items-center px-4">
        <div className="w-full rounded-2xl border border-[#FFD6A1]/40 bg-[#FFD6A1]/10 p-6 text-sm text-[#F6F0E2]">
          <p className="font-semibold text-[#FFD6A1]">Admin is not set up yet</p>
          <p className="mt-2 text-[13px] text-[rgba(255,250,240,0.8)]">Add these environment variables (Vercel settings and .env.local), then redeploy:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-[12px]">
            {problems.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-[rgba(255,250,240,0.55)]">See .env.example in the project for how to generate them.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm items-center px-4">
      <form onSubmit={submit} className="w-full rounded-2xl border border-[rgba(255,250,240,0.14)] bg-[#12100D] p-6">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[#C96F4A]/40 bg-[#C96F4A]/15 text-[#FFD6A1]">
          <Lock size={18} />
        </div>
        <h1 className="font-display text-4xl uppercase leading-none text-[#F6F0E2]">Admin</h1>
        <p className="mt-1 text-xs text-[rgba(255,250,240,0.5)]">Sign in to edit the portfolio.</p>

        <label htmlFor="admin-password" className="mb-1.5 mt-6 block font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.55)]">
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
          autoFocus
          className="w-full rounded-lg border border-[rgba(255,250,240,0.16)] bg-[#161310] px-3 py-3 text-sm text-[#F6F0E2] outline-none focus:border-[#C96F4A]"
        />
        {error && (
          <p role="alert" className="mt-3 text-xs text-red-400">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={busy}
          className="mt-5 w-full rounded-xl bg-[#C96F4A] px-4 py-3 font-mono text-xs font-bold uppercase tracking-wider text-[#F6F0E2] transition-colors hover:bg-[#B4603E] disabled:opacity-40"
        >
          {busy ? "Checking..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
