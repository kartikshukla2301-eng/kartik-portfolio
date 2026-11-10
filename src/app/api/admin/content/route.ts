import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
import { json, rejectUnlessAdmin } from "@/lib/admin/guard";
import { parseContent } from "@/lib/content/schema";
import { CONTENT_TAG, StoreError, getContentFresh, getSupabaseConfig, saveContent } from "@/lib/content/store";

const MAX_BODY_BYTES = 600_000;

export async function GET(request: NextRequest) {
  const denied = rejectUnlessAdmin(request, { mutating: false });
  if (denied) return denied;

  const { content, source } = await getContentFresh();
  return json({ content, source, databaseConfigured: getSupabaseConfig() !== null });
}

export async function PUT(request: NextRequest) {
  const denied = rejectUnlessAdmin(request, { mutating: true });
  if (denied) return denied;

  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return json({ error: "Content is too large" }, 413);

  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const parsed = parseContent(raw);
  if (!parsed.ok) return json({ error: "Some fields are not valid", details: parsed.errors.slice(0, 20) }, 422);

  try {
    await saveContent(parsed.data);
  } catch (err) {
    const status = err instanceof StoreError ? err.status : 500;
    console.error("Saving content failed:", err);
    return json({ error: err instanceof StoreError ? err.message : "Could not save" }, status);
  }

  // Mark every page that reads the content as stale: the next visit gets the new data.
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return json({ ok: true, content: parsed.data });
}
