"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2 } from "lucide-react";

export const INPUT =
  "w-full rounded-lg border border-[rgba(255,250,240,0.16)] bg-[#161310] px-3 py-2.5 text-sm text-[#F6F0E2] outline-none transition-colors placeholder:text-[rgba(255,250,240,0.3)] focus:border-[#C96F4A]";

const LABEL = "mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.55)]";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: (id: string) => ReactNode;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={LABEL}>
        {label}
      </label>
      {children(id)}
      {hint && <p className="mt-1 text-[11px] leading-snug text-[rgba(255,250,240,0.4)]">{hint}</p>}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  hint,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  placeholder?: string;
  type?: string;
  inputMode?: "text" | "email" | "tel" | "url";
  maxLength?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <input
          id={id}
          type={type}
          inputMode={inputMode}
          value={value}
          maxLength={maxLength}
          placeholder={placeholder}
          autoComplete="off"
          onChange={(e) => onChange(e.target.value)}
          className={INPUT}
        />
      )}
    </Field>
  );
}

export function AreaField({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => <textarea id={id} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className={`${INPUT} resize-y`} />}
    </Field>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  hint,
}: {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (v: T) => void;
  hint?: string;
}) {
  return (
    <Field label={label} hint={hint}>
      {(id) => (
        <select id={id} value={value} onChange={(e) => onChange(e.target.value as T)} className={INPUT}>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}
    </Field>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 accent-[#C96F4A]"
        />
        <span className="text-sm text-[#F6F0E2]">{label}</span>
      </label>
      {hint && <p className="mt-1 pl-8 text-[11px] leading-snug text-[rgba(255,250,240,0.4)]">{hint}</p>}
    </div>
  );
}

/** Comma separated list (technologies, tags, skill items). Keeps what you are typing, saves the clean list. */
export function TagsField({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
}) {
  const [raw, setRaw] = useState(value.join(", "));
  return (
    <Field label={label} hint={hint ?? "Separate with commas"}>
      {(id) => (
        <input
          id={id}
          value={raw}
          autoComplete="off"
          onChange={(e) => {
            setRaw(e.target.value);
            onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            );
          }}
          onBlur={() => setRaw(value.join(", "))}
          className={INPUT}
        />
      )}
    </Field>
  );
}

/** One item per line (internship highlights). */
export function LinesField({
  label,
  value,
  onChange,
  hint,
  rows = 6,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  hint?: string;
  rows?: number;
}) {
  const [raw, setRaw] = useState(value.join("\n"));
  return (
    <Field label={label} hint={hint ?? "One point per line"}>
      {(id) => (
        <textarea
          id={id}
          rows={rows}
          value={raw}
          onChange={(e) => {
            setRaw(e.target.value);
            onChange(
              e.target.value
                .split("\n")
                .map((s) => s.trim())
                .filter(Boolean)
            );
          }}
          onBlur={() => setRaw(value.join("\n"))}
          className={`${INPUT} resize-y`}
        />
      )}
    </Field>
  );
}

/** Shrinks a photo in the browser first (phone photos are huge), then uploads it. Returns the public URL. */
async function shrinkImage(file: File, maxSide = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("This browser cannot process images");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not compress the image"))), "image/jpeg", 0.86)
  );
}

export async function uploadPhoto(file: File): Promise<string> {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error("Choose a JPG, PNG or WebP image");
  const blob = await shrinkImage(file);
  const form = new FormData();
  form.append("file", blob, "photo.jpg");
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? `Upload failed (${res.status})`);
  return data.url;
}

export function ImageField({
  label,
  value,
  onChange,
  hint,
  canUpload,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
  canUpload: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handle(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadPhoto(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <span className={LABEL}>{label}</span>
      <div className="flex items-start gap-3">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-20 shrink-0 rounded-lg border border-[rgba(255,250,240,0.16)] object-cover" />
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg border border-dashed border-[rgba(255,250,240,0.2)] text-[rgba(255,250,240,0.3)]">
            <ImagePlus size={20} />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or /images/photo.jpg"
            className={INPUT}
            aria-label={`${label} link`}
          />
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={!canUpload || busy}
              onClick={() => inputRef.current?.click()}
              className="rounded-lg border border-[#C96F4A]/50 bg-[#C96F4A]/15 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[#FFD6A1] transition-colors hover:bg-[#C96F4A]/25 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? "Uploading..." : "Upload photo"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="font-mono text-[11px] uppercase tracking-wider text-[rgba(255,250,240,0.5)] hover:text-white"
              >
                Remove
              </button>
            )}
            <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => handle(e.target.files?.[0])} />
          </div>
          {!canUpload && <p className="text-[11px] text-[#FFD6A1]/80">Uploading needs the database to be connected (see the setup box above).</p>}
          {error && <p role="alert" className="text-[11px] text-red-400">{error}</p>}
        </div>
      </div>
      {hint && <p className="mt-1 text-[11px] leading-snug text-[rgba(255,250,240,0.4)]">{hint}</p>}
    </div>
  );
}

/** Generic editable list: add (on top), reorder, delete. Each item renders its own fields. */
export function ItemList<T extends { id: string }>({
  items,
  onChange,
  create,
  addLabel,
  itemTitle,
  render,
  emptyText,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  addLabel: string;
  itemTitle: (item: T, index: number) => string;
  render: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  emptyText: string;
}) {
  const [open, setOpen] = useState<string | null>(null);

  const update = (id: string, patch: Partial<T>) => onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = items.slice();
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => {
          const item = create();
          onChange([item, ...items]);
          setOpen(item.id);
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[#C96F4A]/60 bg-[#C96F4A]/10 px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#FFD6A1] transition-colors hover:bg-[#C96F4A]/20 sm:w-auto"
      >
        <Plus size={14} /> {addLabel}
      </button>

      {items.length === 0 && <p className="text-sm text-[rgba(255,250,240,0.5)]">{emptyText}</p>}

      {items.map((item, index) => {
        const isOpen = open === item.id;
        return (
          <div key={item.id} className="rounded-xl border border-[rgba(255,250,240,0.14)] bg-[#12100D]">
            <div className="flex items-center gap-2 p-3">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className="min-w-0 flex-1 text-left"
              >
                <span className="font-mono text-[10px] text-[#C96F4A]">{String(index + 1).padStart(2, "0")}</span>
                <span className="ml-2 truncate text-sm font-medium text-[#F6F0E2]">{itemTitle(item, index) || "Untitled"}</span>
              </button>
              <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up" className="rounded-md p-2 text-[rgba(255,250,240,0.6)] hover:bg-white/5 hover:text-white disabled:opacity-25">
                <ArrowUp size={15} />
              </button>
              <button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1} aria-label="Move down" className="rounded-md p-2 text-[rgba(255,250,240,0.6)] hover:bg-white/5 hover:text-white disabled:opacity-25">
                <ArrowDown size={15} />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Delete "${itemTitle(item, index) || "this item"}"? You can still undo by reloading before you save.`)) {
                    onChange(items.filter((it) => it.id !== item.id));
                  }
                }}
                aria-label="Delete"
                className="rounded-md p-2 text-red-400/80 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 size={15} />
              </button>
            </div>
            {isOpen && (
              <div className="grid gap-4 border-t border-[rgba(255,250,240,0.1)] p-4 sm:grid-cols-2">
                {render(item, (patch) => update(item.id, patch))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Section({ title, children, description }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-[rgba(255,250,240,0.12)] bg-[#12100D]/70 p-4 sm:p-6">
      <h2 className="font-display text-2xl uppercase tracking-wide text-[#F6F0E2]">{title}</h2>
      {description && <p className="mt-1 text-xs text-[rgba(255,250,240,0.5)]">{description}</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  );
}

export function Wide({ children }: { children: ReactNode }) {
  return <div className="sm:col-span-2">{children}</div>;
}
