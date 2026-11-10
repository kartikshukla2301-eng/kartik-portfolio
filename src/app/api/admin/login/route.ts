import type { NextRequest } from "next/server";
import { clientIp, isSameOrigin, json } from "@/lib/admin/guard";
import { createLimiter } from "@/lib/admin/rate-limit";
import { SESSION_TTL_MS, createSessionToken, passwordMatches, readAdminConfig } from "@/lib/admin/token";
import { ADMIN_COOKIE } from "@/lib/site";

// 5 wrong passwords per 15 minutes per IP.
const limiter = createLimiter({ max: 5, windowMs: 15 * 60 * 1000 });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: "Bad origin" }, 403);

  const { config, problems } = readAdminConfig();
  if (!config) return json({ error: "Admin is not configured", problems }, 503);

  const ip = clientIp(request);
  const status = limiter.peek(ip);
  if (!status.allowed) {
    return json({ error: `Too many attempts. Try again in ${Math.ceil(status.retryAfterSec / 60)} min.` }, 429, {
      "Retry-After": String(status.retryAfterSec),
    });
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password === "string") password = body.password.slice(0, 200);
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  if (!passwordMatches(password, config.password)) {
    limiter.fail(ip);
    await sleep(500); // slows scripted guessing
    return json({ error: "Wrong password" }, 401);
  }

  limiter.reset(ip);
  const response = json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    [
      `${ADMIN_COOKIE}=${createSessionToken(config.secret)}`,
      "Path=/",
      `Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`,
      "HttpOnly",
      "SameSite=Strict",
      ...(process.env.NODE_ENV === "production" ? ["Secure"] : []),
    ].join("; ")
  );
  return response;
}
