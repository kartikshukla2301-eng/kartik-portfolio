"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateScrollTrigger = () => {
      ScrollTrigger.update();
    };

    gsap.ticker.add(updateScrollTrigger);

    return () => {
      gsap.ticker.remove(updateScrollTrigger);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
