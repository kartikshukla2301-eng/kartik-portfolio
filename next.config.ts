import type { NextConfig } from "next";

// Photos uploaded from the admin panel are served by Supabase Storage, so next/image must trust that host.
function supabasePattern() {
  try {
    if (!process.env.SUPABASE_URL) return [];
    const url = new URL(process.env.SUPABASE_URL);
    return [
      {
        protocol: url.protocol === "http:" ? ("http" as const) : ("https" as const),
        hostname: url.hostname,
        port: url.port,
        pathname: "/storage/v1/object/public/**",
      },
    ];
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabasePattern(),
    // Local Supabase runs on 127.0.0.1, which Next blocks for optimisation unless this is on.
    dangerouslyAllowLocalIP: process.env.NODE_ENV !== "production",
  },
  reactStrictMode: true,
};

export default nextConfig;
