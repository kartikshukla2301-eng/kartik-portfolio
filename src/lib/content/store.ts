import { defaultContent } from "./defaults";
import { toPublicContent } from "./public";
import { parseContent, type SiteContent } from "./schema";

/**
 * Server-only data access. Talks to Supabase over its REST API with the service-role key
 * (never sent to the browser). If Supabase is not configured or unreachable, the site keeps
 * working from the built-in defaults.
 *
 * Supabase setup (run once in the SQL editor):
 *   create table if not exists site_content (
 *     id int primary key default 1 check (id = 1),
 *     data jsonb not null,
 *     updated_at timestamptz not null default now()
 *   );
 *   alter table site_content enable row level security;   -- no policies: only the service key can touch it
 *   insert into storage.buckets (id, name, public) values ('portfolio', 'portfolio', true)
 *     on conflict (id) do nothing;
 */

export const CONTENT_TAG = "site-content";
export const STORAGE_BUCKET = "portfolio";

export type ContentSource = "database" | "defaults";

export interface SupabaseConfig {
  url: string;
  key: string;
}

export class StoreError extends Error {
  constructor(message: string, readonly status = 502) {
    super(message);
    this.name = "StoreError";
  }
}

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  // https only; plain http is accepted for a local Supabase (CLI) on this machine.
  if (!url || !key || !/^(https:\/\/|http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$))/i.test(url)) return null;
  return { url, key };
}

/** Hostname for next/image remote patterns (the bucket serves uploaded photos). */
export function getSupabaseHostname(): string | null {
  const cfg = getSupabaseConfig();
  if (!cfg) return null;
  try {
    return new URL(cfg.url).hostname;
  } catch {
    return null;
  }
}

function authHeaders({ key }: SupabaseConfig): Record<string, string> {
  // New-style secret keys (sb_secret_...) are not JWTs and must not go in the Authorization header.
  const headers: Record<string, string> = { apikey: key };
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return headers;
}

async function readRow(cfg: SupabaseConfig, fresh: boolean): Promise<unknown | null> {
  const res = await fetch(`${cfg.url}/rest/v1/site_content?id=eq.1&select=data`, {
    headers: { ...authHeaders(cfg), Accept: "application/json" },
    ...(fresh ? { cache: "no-store" as const } : { next: { revalidate: 300, tags: [CONTENT_TAG] } }),
  });
  if (!res.ok) throw new StoreError(`Database read failed (${res.status})`);
  const rows = (await res.json()) as { data?: unknown }[];
  return rows[0]?.data ?? null;
}

async function load(fresh: boolean): Promise<{ content: SiteContent; source: ContentSource }> {
  const cfg = getSupabaseConfig();
  if (!cfg) return { content: defaultContent, source: "defaults" };

  try {
    const raw = await readRow(cfg, fresh);
    if (raw === null) return { content: defaultContent, source: "defaults" };
    const parsed = parseContent(raw);
    if (!parsed.ok) {
      console.error("Stored content failed validation, using defaults:", parsed.errors.slice(0, 5));
      return { content: defaultContent, source: "defaults" };
    }
    return { content: parsed.data, source: "database" };
  } catch (err) {
    console.error("Could not load content, using defaults:", err);
    return { content: defaultContent, source: "defaults" };
  }
}

/** Content for the public site (cached, refreshed after every admin save). Private fields are removed. */
export async function getContent(): Promise<SiteContent> {
  return toPublicContent((await load(false)).content);
}

/** Content for the admin panel: always read live from the database. */
export async function getContentFresh(): Promise<{ content: SiteContent; source: ContentSource }> {
  return load(true);
}

export async function saveContent(content: SiteContent): Promise<void> {
  const cfg = getSupabaseConfig();
  if (!cfg) throw new StoreError("Supabase is not configured on the server", 503);

  const res = await fetch(`${cfg.url}/rest/v1/site_content?on_conflict=id`, {
    method: "POST",
    headers: {
      ...authHeaders(cfg),
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify([{ id: 1, data: content, updated_at: new Date().toISOString() }]),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new StoreError(`Database write failed (${res.status}) ${detail}`.trim());
  }
}

export async function uploadImage(bytes: Uint8Array, contentType: string, ext: string): Promise<string> {
  const cfg = getSupabaseConfig();
  if (!cfg) throw new StoreError("Supabase is not configured on the server", 503);

  const name = `uploads/${Date.now()}-${globalThis.crypto.randomUUID().slice(0, 8)}.${ext}`;
  const res = await fetch(`${cfg.url}/storage/v1/object/${STORAGE_BUCKET}/${name}`, {
    method: "POST",
    headers: { ...authHeaders(cfg), "Content-Type": contentType, "x-upsert": "false", "Cache-Control": "31536000" },
    body: bytes as BodyInit,
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = (await res.text().catch(() => "")).slice(0, 200);
    throw new StoreError(`Image upload failed (${res.status}) ${detail}`.trim());
  }
  return `${cfg.url}/storage/v1/object/public/${STORAGE_BUCKET}/${name}`;
}
