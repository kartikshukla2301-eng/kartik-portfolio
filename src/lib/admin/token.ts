import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12 hours
const MIN_PASSWORD_LENGTH = 10;
const MIN_SECRET_LENGTH = 32;

export interface AdminConfig {
  password: string;
  secret: string;
}

/** Reads the admin env vars. Returns what is missing so the panel can explain it. */
export function readAdminConfig(env: Record<string, string | undefined> = process.env): {
  config: AdminConfig | null;
  problems: string[];
} {
  const password = env.ADMIN_PASSWORD ?? "";
  const secret = env.ADMIN_SESSION_SECRET ?? "";
  const problems: string[] = [];
  if (password.length < MIN_PASSWORD_LENGTH) problems.push(`ADMIN_PASSWORD (at least ${MIN_PASSWORD_LENGTH} characters)`);
  if (secret.length < MIN_SECRET_LENGTH) problems.push(`ADMIN_SESSION_SECRET (at least ${MIN_SECRET_LENGTH} characters)`);
  return { config: problems.length ? null : { password, secret }, problems };
}

function sign(secret: string, payload: string): string {
  return createHmac("sha256", secret).update(payload).digest("hex");
}

/** Session token: "<expiry ms>.<hmac>". Stateless, so it survives serverless cold starts. */
export function createSessionToken(secret: string, now = Date.now(), ttlMs = SESSION_TTL_MS): string {
  const expires = now + ttlMs;
  return `${expires}.${sign(secret, `admin.${expires}`)}`;
}

export function verifySessionToken(token: string | undefined | null, secret: string, now = Date.now()): boolean {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot < 1) return false;

  const expiresRaw = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!/^\d{10,16}$/.test(expiresRaw)) return false;
  if (Number(expiresRaw) <= now) return false;

  const expected = Buffer.from(sign(secret, `admin.${expiresRaw}`));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Constant-time password check (both sides hashed first so lengths always match). */
export function passwordMatches(input: string, expected: string): boolean {
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
