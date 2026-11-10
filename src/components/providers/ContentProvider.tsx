"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteContent } from "@/lib/content/schema";

const ContentContext = createContext<SiteContent | null>(null);

/** Gives every section the content (read once on the server, from the database or the defaults). */
export function ContentProvider({ content, children }: { content: SiteContent; children: ReactNode }) {
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  const content = useContext(ContentContext);
  if (!content) throw new Error("useContent must be used inside <ContentProvider>");
  return content;
}
