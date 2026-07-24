"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollTo = useCallback((targetId: string, offset = 80) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  return { scrollTo };
}
