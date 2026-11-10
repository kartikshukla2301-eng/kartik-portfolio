import { describe, expect, it } from "vitest";
import { chapterLabel, clamp, countWord, deriveInitials, experienceHeadline, formatCount, staggeredProgress } from "./motion";

describe("formatCount", () => {
  it("pads the integer part", () => {
    expect(formatCount(4, { pad: 2 })).toBe("04");
    expect(formatCount(12, { pad: 2 })).toBe("12");
    expect(formatCount(123, { pad: 2 })).toBe("123");
  });

  it("keeps requested decimals", () => {
    expect(formatCount(7.9, { decimals: 1 })).toBe("7.9");
    expect(formatCount(7, { decimals: 1 })).toBe("7.0");
  });

  it("rounds to the requested precision during a tween", () => {
    expect(formatCount(3.7)).toBe("4");
    expect(formatCount(0.4)).toBe("0");
  });

  it("applies prefix and suffix and keeps the sign", () => {
    expect(formatCount(585, { suffix: "+" })).toBe("585+");
    expect(formatCount(-3, { pad: 2, prefix: "$" })).toBe("$-03");
  });

  it("never prints NaN or Infinity", () => {
    expect(formatCount(Number.NaN, { pad: 2 })).toBe("00");
    expect(formatCount(Number.POSITIVE_INFINITY)).toBe("0");
  });
});

describe("deriveInitials", () => {
  it("uses first and last word for full names", () => {
    expect(deriveInitials("Kartik Shukla")).toBe("KS");
    expect(deriveInitials("anna maria lopez")).toBe("AL");
  });

  it("uses the first two letters of a single word", () => {
    expect(deriveInitials("kartik")).toBe("KA");
    expect(deriveInitials("ks")).toBe("KS");
    expect(deriveInitials("k")).toBe("K");
  });

  it("returns the fallback for empty or unusable input", () => {
    expect(deriveInitials("", "KS")).toBe("KS");
    expect(deriveInitials("   ", "KS")).toBe("KS");
    expect(deriveInitials("123 456", "KS")).toBe("KS");
    expect(deriveInitials("😀😀", "KS")).toBe("KS");
    expect(deriveInitials("")).toBe("");
  });

  it("ignores digits, emoji and punctuation inside names", () => {
    expect(deriveInitials("J. R. R. Tolkien")).toBe("JT");
    expect(deriveInitials("kartik99 shukla!!")).toBe("KS");
    expect(deriveInitials("mary-jane watson")).toBe("MW");
  });

  it("handles accented and non latin letters", () => {
    expect(deriveInitials("élodie bernard")).toBe("ÉB");
    expect(deriveInitials("कार्तिक शुक्ला").length).toBeGreaterThan(0);
  });

  it("never returns more than 2 characters", () => {
    expect(Array.from(deriveInitials("ßx")).length).toBeLessThanOrEqual(2);
    expect(Array.from(deriveInitials("a b c d e f")).length).toBe(2);
  });
});

describe("staggeredProgress", () => {
  it("is 0 for every line at the start and 1 for every line at the end", () => {
    for (let i = 0; i < 3; i++) {
      expect(staggeredProgress(0, i, 3)).toBe(0);
      expect(staggeredProgress(1, i, 3)).toBe(1);
    }
  });

  it("fills earlier lines before later ones", () => {
    const first = staggeredProgress(0.5, 0, 3);
    const last = staggeredProgress(0.5, 2, 3);
    expect(first).toBeGreaterThan(last);
  });

  it("behaves like plain progress for a single line", () => {
    expect(staggeredProgress(0.3, 0, 1)).toBeCloseTo(0.3);
    expect(staggeredProgress(2, 0, 1)).toBe(1);
  });

  it("stays within 0..1", () => {
    expect(staggeredProgress(-1, 1, 3)).toBe(0);
    expect(staggeredProgress(5, 1, 3)).toBe(1);
  });
});

describe("chapterLabel and clamp", () => {
  it("formats the chapter counter", () => {
    expect(chapterLabel(0, 7)).toBe("01 / 07");
    expect(chapterLabel(6, 7)).toBe("07 / 07");
  });

  it("clamps out of range chapter indexes", () => {
    expect(chapterLabel(-3, 7)).toBe("01 / 07");
    expect(chapterLabel(99, 7)).toBe("07 / 07");
  });

  it("clamps numbers", () => {
    expect(clamp(5, 0, 3)).toBe(3);
    expect(clamp(-1, 0, 3)).toBe(0);
    expect(clamp(2, 0, 3)).toBe(2);
  });
});

describe("headings that follow the number of internships", () => {
  it("spells small numbers and keeps the original wording for four", () => {
    expect(countWord(4)).toBe("Four");
    expect(countWord(0)).toBe("Zero");
    expect(countWord(13)).toBe("13");
    expect(experienceHeadline(4)).toBe("Four quarters.");
    expect(experienceHeadline(5)).toBe("Five chapters.");
    expect(experienceHeadline(1)).toBe("One chapter.");
    expect(experienceHeadline(14)).toBe("14 chapters.");
  });
});
