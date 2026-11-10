import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Single-page site: hash fragments are not separate URLs, so only the root is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
