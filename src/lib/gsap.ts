import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register once, on the client only. Import gsap / ScrollTrigger / SplitText from here.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

export const EASE_OUT = "power3.out";
export const EASE_EXPO = "expo.out";

/** True when the user asked the OS for reduced motion or toggled "pause motion" on the page. */
export function motionDisabled(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.body.classList.contains("is-motion-paused")
  );
}
