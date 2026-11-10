import type { NextRequest } from "next/server";
import { IMAGE_MIME, sniffImage } from "@/lib/admin/image";
import { json, rejectUnlessAdmin } from "@/lib/admin/guard";
import { StoreError, uploadImage } from "@/lib/content/store";

// Vercel functions accept ~4.5 MB bodies; the panel shrinks photos in the browser before sending.
const MAX_BYTES = 4_000_000;

export async function POST(request: NextRequest) {
  const denied = rejectUnlessAdmin(request, { mutating: true });
  if (denied) return denied;

  let file: FormDataEntryValue | null;
  try {
    file = (await request.formData()).get("file");
  } catch {
    return json({ error: "Invalid upload" }, 400);
  }
  if (!(file instanceof File)) return json({ error: "No file received" }, 400);
  if (file.size === 0) return json({ error: "The file is empty" }, 400);
  if (file.size > MAX_BYTES) return json({ error: "Image is larger than 4 MB" }, 413);

  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = sniffImage(bytes); // trust the bytes, not the file name or declared type
  if (!kind) return json({ error: "Only JPG, PNG or WebP images are allowed" }, 415);

  try {
    const url = await uploadImage(bytes, IMAGE_MIME[kind], kind === "jpeg" ? "jpg" : kind);
    return json({ ok: true, url });
  } catch (err) {
    console.error("Image upload failed:", err);
    const status = err instanceof StoreError ? err.status : 500;
    return json({ error: err instanceof StoreError ? err.message : "Upload failed" }, status);
  }
}
