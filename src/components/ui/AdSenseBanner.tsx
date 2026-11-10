"use client";

import { useEffect, useRef, useState } from "react";
import { readAdStatus, shouldShowAd } from "@/lib/adsense";

interface AdSenseBannerProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Ad slot that stays invisible (zero height) until AdSense reports it filled the slot.
 * With an ad blocker, no approved account, or no fill, the section simply does not appear.
 * The <ins> is kept laid out (not display:none) so AdSense can measure its width and request an ad.
 */
export function AdSenseBanner({
  slot = "7237825718",
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseBannerProps) {
  const insRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const ins = insRef.current;
    if (!ins) return;

    const sync = () => setVisible(shouldShowAd(readAdStatus(ins.getAttribute("data-ad-status"))));
    const observer = new MutationObserver(sync);
    observer.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
    sync();

    if (!pushedRef.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch (err) {
        console.warn("AdSense unit error:", err);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`mx-auto w-full max-w-5xl overflow-hidden px-4 transition-[max-height,padding] duration-500 ${
        visible ? "max-h-[420px] py-4" : "max-h-0 py-0"
      } ${className}`}
    >
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: "block", width: "100%", textAlign: "center" }}
        data-ad-client="ca-pub-3587427941344024"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
