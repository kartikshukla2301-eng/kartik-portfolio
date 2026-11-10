import { cookies } from "next/headers";
import { AdminEditor } from "@/components/admin/AdminEditor";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { readAdminConfig, verifySessionToken } from "@/lib/admin/token";
import { getContentFresh, getSupabaseConfig } from "@/lib/content/store";
import { ADMIN_COOKIE } from "@/lib/site";

// Reads the login cookie, so this page is always rendered per request.
export default async function AdminPage() {
  const { config, problems } = readAdminConfig();
  if (!config) return <AdminLogin problems={problems} />;

  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!verifySessionToken(token, config.secret)) return <AdminLogin problems={[]} />;

  const { content, source } = await getContentFresh();
  return <AdminEditor initial={content} source={source} databaseConfigured={getSupabaseConfig() !== null} />;
}
