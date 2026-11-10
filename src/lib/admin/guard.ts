import type { NextRequest } from "next/server";
import { ADMIN_COOKIE } from "@/lib/site";
import { readAdminConfig, verifySessionToken } from "./token";

export function json(body: unknown, status = 200, headers?: Record<string, string>): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

/**
 * CSRF defence for state-changing requests: the browser must say the request comes from this same site.
 * (The cookie is also SameSite=Strict; this is the second layer.)
 */
export function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

/** Returns a Response to send back when the request is not an authenticated, same-origin admin call; otherwise null. */
export function rejectUnlessAdmin(request: NextRequest, options: { mutating: boolean }): Response | null {
  if (options.mutating && !isSameOrigin(request)) return json({ error: "Bad origin" }, 403);

  const { config } = readAdminConfig();
  if (!config) return json({ error: "Admin is not configured on the server" }, 503);

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token, config.secret)) return json({ error: "Not signed in" }, 401);
  return null;
}
