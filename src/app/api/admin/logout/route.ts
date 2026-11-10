import type { NextRequest } from "next/server";
import { isSameOrigin, json } from "@/lib/admin/guard";
import { ADMIN_COOKIE } from "@/lib/site";

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: "Bad origin" }, 403);

  const response = json({ ok: true });
  response.headers.append(
    "Set-Cookie",
    `${ADMIN_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`
  );
  return response;
}
