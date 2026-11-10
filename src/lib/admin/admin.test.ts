import { describe, expect, it } from "vitest";
import { sniffImage } from "./image";
import { createLimiter } from "./rate-limit";
import { createSessionToken, passwordMatches, readAdminConfig, verifySessionToken } from "./token";

const SECRET = "s".repeat(40);

describe("session token", () => {
  it("verifies a fresh token", () => {
    const token = createSessionToken(SECRET);
    expect(verifySessionToken(token, SECRET)).toBe(true);
  });

  it("rejects an expired token", () => {
    const now = 1_800_000_000_000; // a realistic 13-digit epoch in ms
    const token = createSessionToken(SECRET, now, 60_000);
    expect(verifySessionToken(token, SECRET, now + 59_999)).toBe(true);
    expect(verifySessionToken(token, SECRET, now + 60_000)).toBe(false);
  });

  it("rejects a token signed with another secret", () => {
    const token = createSessionToken("x".repeat(40));
    expect(verifySessionToken(token, SECRET)).toBe(false);
  });

  it("rejects a tampered expiry (cannot extend your own session)", () => {
    const token = createSessionToken(SECRET, Date.now(), 60_000);
    const sig = token.split(".")[1];
    const forged = `${Date.now() + 10 * 365 * 24 * 3600 * 1000}.${sig}`;
    expect(verifySessionToken(forged, SECRET)).toBe(false);
  });

  it("rejects garbage", () => {
    for (const bad of ["", "abc", ".", "123.", "99999999999999.zzz", undefined, null]) {
      expect(verifySessionToken(bad as string | undefined | null, SECRET), String(bad)).toBe(false);
    }
  });
});

describe("password check", () => {
  it("matches only the exact password", () => {
    expect(passwordMatches("correct horse battery", "correct horse battery")).toBe(true);
    expect(passwordMatches("correct horse batter", "correct horse battery")).toBe(false);
    expect(passwordMatches("", "correct horse battery")).toBe(false);
  });
});

describe("admin config", () => {
  it("lists what is missing", () => {
    const { config, problems } = readAdminConfig({});
    expect(config).toBeNull();
    expect(problems).toHaveLength(2);
  });

  it("rejects a short password or secret", () => {
    expect(readAdminConfig({ ADMIN_PASSWORD: "short", ADMIN_SESSION_SECRET: SECRET }).config).toBeNull();
    expect(readAdminConfig({ ADMIN_PASSWORD: "a-long-enough-pass", ADMIN_SESSION_SECRET: "short" }).config).toBeNull();
  });

  it("accepts good values", () => {
    const { config } = readAdminConfig({ ADMIN_PASSWORD: "a-long-enough-pass", ADMIN_SESSION_SECRET: SECRET });
    expect(config).not.toBeNull();
  });
});

describe("login rate limiter", () => {
  it("blocks after the maximum failed attempts and recovers after the window", () => {
    const limiter = createLimiter({ max: 3, windowMs: 1000 });
    const t0 = 10_000;
    expect(limiter.peek("ip", t0).allowed).toBe(true);
    limiter.fail("ip", t0);
    limiter.fail("ip", t0 + 10);
    expect(limiter.peek("ip", t0 + 20).allowed).toBe(true);
    limiter.fail("ip", t0 + 20);

    const blocked = limiter.peek("ip", t0 + 30);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);

    expect(limiter.peek("ip", t0 + 1001).allowed).toBe(true);
  });

  it("tracks addresses separately and reset clears one", () => {
    const limiter = createLimiter({ max: 1, windowMs: 1000 });
    limiter.fail("a", 0);
    expect(limiter.peek("a", 1).allowed).toBe(false);
    expect(limiter.peek("b", 1).allowed).toBe(true);
    limiter.reset("a");
    expect(limiter.peek("a", 2).allowed).toBe(true);
  });
});

describe("image sniffing", () => {
  it("recognises the real formats by their first bytes", () => {
    expect(sniffImage(Uint8Array.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]))).toBe("jpeg");
    expect(sniffImage(Uint8Array.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0]))).toBe("png");
    expect(sniffImage(Uint8Array.from([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]))).toBe("webp");
  });

  it("rejects scripts, SVG and HTML even if named .jpg", () => {
    const enc = (s: string) => new TextEncoder().encode(s);
    expect(sniffImage(enc("<svg xmlns='http://www.w3.org/2000/svg'></svg>"))).toBeNull();
    expect(sniffImage(enc("<html><script>alert(1)</script>"))).toBeNull();
    expect(sniffImage(enc("GIF89a"))).toBeNull();
    expect(sniffImage(new Uint8Array())).toBeNull();
  });
});
