"use client";

import { useEffect, useRef } from "react";

interface AdSenseBannerProps {
  slot?: string;
  format?: string;
  responsive?: boolean;
  className?: string;
}

export function AdSenseBanner({
  slot = "7237825718",
  format = "auto",
  responsive = true,
  className = "",
}: AdSenseBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    if (pushedRef.current) return;
    try {
      if (typeof window !== "undefined") {
        // @ts-expect-error adsbygoogle is loaded externally
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      }
    } catch (err) {
      console.error("AdSense unit error:", err);
    }
  }, []);

  return (
    <div className={`w-full max-w-5xl mx-auto px-4 py-4 overflow-hidden flex justify-center items-center ${className}`}>
      <ins
        ref={adRef}
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
