"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";
import { isIntroPlaying, markIntroDone } from "@/lib/intro";
import { LoaderSound, SOUND_STORAGE_KEY } from "@/lib/loader-sound";
import { formatCount } from "@/lib/motion";
import { useContent } from "@/components/providers/ContentProvider";

interface PageLoaderProps {
  /** Called once when the intro has finished (also when it is skipped). */
  onEnter: () => void;
}

/** "locked" = sound is wanted but the browser has not allowed audio yet (it needs a tap or key press first). */
type SoundMode = "on" | "off" | "locked";

const readSoundPref = (): boolean => {
  try {
    return localStorage.getItem(SOUND_STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
};

const writeSoundPref = (on: boolean) => {
  try {
    localStorage.setItem(SOUND_STORAGE_KEY, on ? "on" : "off");
  } catch {
    // storage blocked: the preference just will not be remembered
  }
};

/**
 * Intro loader. A huge counter counts 00 -> 100; the digits are a mask over a photograph
 * (CSS background-clip: text), the picture changes at stages, and at 100 the digits scale up until
 * the picture fills the screen and fades into the page.
 * A synthesised watch ticks faster as the counter climbs and stops with a double click on the zoom (see lib/loader-sound).
 * Browsers block audio until the visitor interacts, so the first visit shows "Tap for sound".
 * The markup is always server-rendered; CSS hides it when <html data-intro="done">.
 */
export function PageLoader({ onEnter }: PageLoaderProps) {
  const { profile } = useContent();
  const rootRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const exitingRef = useRef(false);

  const audioRef = useRef<AudioContext | null>(null);
  const soundRef = useRef<LoaderSound | null>(null);
  const progressRef = useRef(0);
  const wantsSoundRef = useRef(true);

  const [gone, setGone] = useState(false);
  const [paused, setPaused] = useState(false);
  const [soundMode, setSoundMode] = useState<SoundMode>("locked");

  const finish = useCallback(() => {
    markIntroDone();
    setGone(true);
    onEnter();
  }, [onEnter]);

  /** Start the audio once the browser allows it. Safe to call many times. */
  const startSound = useCallback(() => {
    if (!wantsSoundRef.current || soundRef.current || exitingRef.current) return;
    const Ctor =
      window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;

    const ctx = audioRef.current ?? new Ctor();
    audioRef.current = ctx;
    ctx
      .resume()
      .then(() => {
        if (ctx.state !== "running" || soundRef.current || !wantsSoundRef.current || exitingRef.current) return;
        const sound = new LoaderSound(ctx);
        sound.start(progressRef.current);
        soundRef.current = sound;
        setSoundMode("on");
      })
      .catch(() => {
        // still blocked: stay in the "tap for sound" state
      });
  }, []);

  /** muted = the visitor skipped, so no big ending, just a short fade. */
  const exit = useCallback(
    (muted = false) => {
      if (exitingRef.current) return;
      exitingRef.current = true;

      if (muted) soundRef.current?.fadeOut(0.25);
      else soundRef.current?.finish();
      // Close the audio context once the tail (boom + shimmer, ~3 s) has died away.
      window.setTimeout(
        () => {
          void audioRef.current?.close().catch(() => {});
          audioRef.current = null;
          soundRef.current = null;
        },
        muted ? 700 : 3300
      );

      const root = rootRef.current;
      const digits = digitsRef.current;
      if (!root || !digits) {
        finish();
        return;
      }
      timelineRef.current?.kill();
      gsap
        .timeline({ onComplete: finish })
        .to(digits, { scale: 22, duration: 1.15, ease: "power3.in" }, 0)
        .to(".loader__hud", { opacity: 0, duration: 0.3 }, 0)
        .to(root, { opacity: 0, duration: 0.55, ease: "power1.out" }, 0.7);
    },
    [finish]
  );

  useEffect(() => {
    // Returning visitor / ?noloader / reduced motion: nothing to play and no welcome voice.
    // The loader markup stays in the DOM but CSS hides it (html[data-intro="done"] .loader).
    if (!isIntroPlaying()) return;

    const digits = digitsRef.current;
    const percent = percentRef.current;
    const bar = barRef.current;
    if (!digits || !percent || !bar) return;

    wantsSoundRef.current = readSoundPref();
    // Show the right button state after mount (kept out of the effect body so it never causes a cascading render).
    const initTimer = window.setTimeout(() => {
      setSoundMode(!wantsSoundRef.current ? "off" : soundRef.current ? "on" : "locked");
    }, 0);

    const state = { v: 0 };
    const render = () => {
      progressRef.current = state.v;

      const n = Math.round(state.v);
      digits.textContent = formatCount(n, { pad: 2 });
      percent.textContent = formatCount(n, { pad: 2 });
      bar.style.transform = `scaleX(${state.v / 100})`;
      digits.dataset.stage = n < 20 ? "0" : n < 50 ? "1" : n < 80 ? "2" : "3";

      soundRef.current?.setProgress(state.v); // the watch ticks faster as the counter climbs
    };
    render();

    // Browsers only allow sound after a user gesture: the first tap / key press anywhere unlocks it
    // (the loader's own buttons handle themselves).
    const unlock = (e: Event) => {
      if ((e.target as Element | null)?.closest?.("[data-loader-control]")) return;
      startSound();
    };
    const gestures = ["pointerdown", "keydown", "touchstart"] as const;
    gestures.forEach((type) => window.addEventListener(type, unlock, { passive: true }));
    // If the visitor already interacted with this page (for example a reload), audio may start right away.
    if (navigator.userActivation?.hasBeenActive) startSound();

    // Uneven rhythm on purpose: quick start, a hold, a long middle, a slow finish.
    const tl = gsap.timeline({ onComplete: () => exit(false), delay: 0.35 });
    tl.to(state, { v: 20, duration: 0.9, ease: "power2.out", onUpdate: render })
      .to(state, { v: 20, duration: 0.4 })
      .to(state, { v: 76, duration: 1.2, ease: "power1.inOut", onUpdate: render })
      .to(state, { v: 97, duration: 0.8, ease: "power1.out", onUpdate: render })
      .to(state, { v: 100, duration: 0.35, ease: "none", onUpdate: render });
    timelineRef.current = tl;

    return () => {
      tl.kill();
      window.clearTimeout(initTimer);
      gestures.forEach((type) => window.removeEventListener(type, unlock));
      if (!exitingRef.current) {
        // Unmounted early (for example React StrictMode's dev re-run): silence and release the audio device.
        soundRef.current?.fadeOut(0.05);
        soundRef.current = null;
        void audioRef.current?.close().catch(() => {});
        audioRef.current = null;
      }
    };
  }, [exit, onEnter, startSound]);

  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    document.body.classList.toggle("is-motion-paused", next);
    if (next) {
      timelineRef.current?.pause();
      void audioRef.current?.suspend().catch(() => {});
    } else {
      timelineRef.current?.play();
      void audioRef.current?.resume().catch(() => {});
    }
  };

  const toggleSound = () => {
    if (soundMode === "on") {
      wantsSoundRef.current = false;
      writeSoundPref(false);
      soundRef.current?.fadeOut(0.2);
      soundRef.current = null;
      setSoundMode("off");
    } else {
      wantsSoundRef.current = true;
      writeSoundPref(true);
      setSoundMode("locked");
      startSound(); // this click is itself the gesture the browser wants
    }
  };

  if (gone) return null;

  const soundLabel = soundMode === "on" ? "Sound on" : soundMode === "off" ? "Sound off" : "Tap for sound";

  return (
    <div
      ref={rootRef}
      className="loader fixed inset-0 z-[200] overflow-hidden bg-[#0B0A08]"
      style={{ "--portrait": `url("${profile.portrait.src}")` } as CSSProperties}
      role="status"
      aria-label="Loading portfolio"
    >
      {/* Warm ambient glow behind the digits */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(201,111,74,0.16)_0%,transparent_62%)]" />

      <div className="loader__hud relative z-10 flex items-center justify-between p-5 sm:p-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.6)]">
        <span className="hidden sm:inline">{profile.name} / Portfolio</span>
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            data-loader-control
            onClick={toggleSound}
            aria-pressed={soundMode === "on"}
            aria-label={soundMode === "on" ? "Turn intro sound off" : "Turn intro sound on"}
            className={`cursor-pointer rounded-full border px-3 py-1.5 transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1] ${
              soundMode === "locked"
                ? "animate-pulse border-[#C96F4A]/70 text-[#FFD6A1]"
                : "border-[rgba(255,250,240,0.16)]"
            }`}
          >
            [ {soundLabel} ]
          </button>
          <button
            type="button"
            data-loader-control
            onClick={toggleMotion}
            aria-pressed={paused}
            className="cursor-pointer rounded-full border border-[rgba(255,250,240,0.16)] px-3 py-1.5 transition-colors hover:border-[#C96F4A] hover:text-[#FFD6A1]"
          >
            [ {paused ? "Resume" : "Pause"}
            <span className="hidden sm:inline"> motion</span> ]
          </button>
          <button
            type="button"
            data-loader-control
            onClick={() => exit(true)}
            className="cursor-pointer rounded-full border border-[rgba(255,250,240,0.22)] px-3 py-1.5 font-bold text-[#FFD6A1] transition-colors hover:border-[#C96F4A] hover:bg-[#C96F4A] hover:text-[#0B0A08]"
            aria-label="Skip intro"
          >
            [ Skip ]
          </button>
        </div>
      </div>

      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div ref={digitsRef} className="loader__digits" data-stage="0" aria-hidden="true">
          00
        </div>
      </div>

      <div className="loader__hud absolute bottom-5 left-5 right-5 z-10 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[rgba(255,250,240,0.6)] sm:bottom-8 sm:left-8 sm:right-8">
        <span className="font-bold text-[#FFD6A1]">KS&trade;</span>
        <span className="hidden sm:inline">Full Stack // AI Engineer</span>
        <div className="relative h-px w-28 bg-[rgba(255,250,240,0.18)] sm:w-48">
          <div ref={barRef} className="absolute inset-0 origin-left bg-[#C96F4A]" style={{ transform: "scaleX(0)" }} />
        </div>
        <span className="tabular-nums">
          <span ref={percentRef}>00</span>%
        </span>
      </div>
    </div>
  );
}
