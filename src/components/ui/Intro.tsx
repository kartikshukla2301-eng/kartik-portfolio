"use client";

import { useCallback } from "react";
import { PageLoader } from "@/components/ui/PageLoader";
import { useWelcomeVoice, WelcomeVoiceControls } from "@/components/ui/WelcomeVoice";

/** Intro loader + welcome voice. The voice only starts after the loader has played. */
export function Intro() {
  const { speak } = useWelcomeVoice();

  const handleEnter = useCallback(() => {
    // Small delay so the exit transition finishes before the voice starts.
    window.setTimeout(() => speak(), 400);
  }, [speak]);

  return (
    <>
      <PageLoader onEnter={handleEnter} />
      <WelcomeVoiceControls />
    </>
  );
}
