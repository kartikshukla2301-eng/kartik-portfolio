/** Pure helpers shared by motion components. No DOM access, so they are unit-testable. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export interface FormatCountOptions {
  decimals?: number;
  /** Left-pad the integer part with zeros to this many digits ("4" -> "04"). */
  pad?: number;
  prefix?: string;
  suffix?: string;
}

/** Format a number for the count-up display. Rounds, never shows NaN. */
export function formatCount(value: number, options: FormatCountOptions = {}): string {
  const { decimals = 0, pad = 0, prefix = "", suffix = "" } = options;
  const safe = Number.isFinite(value) ? value : 0;
  const fixed = Math.abs(safe).toFixed(Math.max(0, decimals));
  const [intPart, fracPart] = fixed.split(".");
  const padded = intPart.padStart(pad, "0");
  const sign = safe < 0 ? "-" : "";
  return `${prefix}${sign}${padded}${fracPart ? `.${fracPart}` : ""}${suffix}`;
}

/**
 * Turn whatever a visitor typed into at most 2 uppercase initials.
 * Two or more words give first + last initial ("anna maria lopez" -> "AL").
 * One word gives its first two letters ("kartik" -> "KA", "ks" -> "KS").
 * Only letters count (any script); digits, emoji and punctuation are dropped.
 * When nothing usable is typed, `fallback` is returned.
 */
export function deriveInitials(input: string, fallback = ""): string {
  const words = input
    .normalize("NFKC")
    .split(/[\s\-_.]+/)
    .map((w) => Array.from(w).filter((ch) => /\p{L}/u.test(ch)).join(""))
    .filter(Boolean);

  if (words.length === 0) return fallback;

  const firstLetters =
    words.length === 1
      ? Array.from(words[0]).slice(0, 2)
      : [Array.from(words[0])[0], Array.from(words[words.length - 1])[0]];

  // Upper-casing can expand a letter (German sharp s becomes "SS"), so cap the result at 2 characters.
  return Array.from(firstLetters.join("").toLocaleUpperCase("en-US")).slice(0, 2).join("");
}

/** 0..1 progress for line `index` of `count` lines when one overall progress drives a staggered fill. */
export function staggeredProgress(
  overall: number,
  index: number,
  count: number,
  overlap = 0.55
): number {
  if (count <= 1) return clamp(overall, 0, 1);
  const span = 1 / (1 + (count - 1) * (1 - overlap));
  const start = index * span * (1 - overlap);
  return clamp((overall - start) / span, 0, 1);
}

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

/** 4 -> "Four", 13 -> "13". Used so headings stay correct when the admin adds or removes items. */
export function countWord(n: number): string {
  return Number.isInteger(n) && n >= 0 && n < NUMBER_WORDS.length ? NUMBER_WORDS[n] : String(n);
}

/** Headline lines for the experience section, e.g. 4 -> "Four quarters.", 5 -> "Five chapters.". */
export function experienceHeadline(count: number): string {
  if (count === 4) return "Four quarters.";
  return `${countWord(count)} ${count === 1 ? "chapter" : "chapters"}.`;
}

/** Two-digit chapter index: (0, 7) -> "01 / 07". */
export function chapterLabel(index: number, total: number): string {
  const n = clamp(index + 1, 1, total);
  return `${String(n).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
}
