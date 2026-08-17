"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const WELCOME_TEXT =
  "Hello! I am Kartik Shukla. Welcome to my portfolio. I'm an AI Engineer and Full Stack Developer. Feel free to explore my projects and experience. Let's build something amazing together.";

// Global singleton state for all instances
type Listener = (state: { isSpeaking: boolean; hasPlayed: boolean; isMuted: boolean }) => void;
const listeners = new Set<Listener>();

let globalSpeaking = false;
let globalPlayed = false;
let globalMuted = false;

function notify() {
  listeners.forEach((l) =>
    l({ isSpeaking: globalSpeaking, hasPlayed: globalPlayed, isMuted: globalMuted })
  );
}

export function useWelcomeVoice() {
  const [state, setState] = useState(() => ({
    isSpeaking: globalSpeaking,
    hasPlayed: globalPlayed,
    isMuted: globalMuted,
  }));

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const listener: Listener = (newState) => setState(newState);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      globalSpeaking = false;
      notify();
    }
  }, []);

  const speak = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis || globalMuted) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(WELCOME_TEXT);
    utteranceRef.current = utterance;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.name.includes("Google") &&
        v.lang.startsWith("en") &&
        v.name.toLowerCase().includes("male")
    );
    const englishMale =
      preferred ||
      voices.find(
        (v) =>
          v.lang.startsWith("en") &&
          (v.name.toLowerCase().includes("male") ||
            v.name.includes("Daniel") ||
            v.name.includes("James"))
      );
    const english =
      englishMale || voices.find((v) => v.lang.startsWith("en"));

    if (english) utterance.voice = english;

    utterance.onstart = () => {
      globalSpeaking = true;
      notify();
    };
    utterance.onend = () => {
      globalSpeaking = false;
      globalPlayed = true;
      notify();
    };
    utterance.onerror = () => {
      globalSpeaking = false;
      notify();
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleMute = useCallback(() => {
    if (globalSpeaking) stop();
    globalMuted = !globalMuted;
    notify();
  }, [stop]);

  const replay = useCallback(() => {
    globalPlayed = false;
    notify();
    setTimeout(() => speak(), 100);
  }, [speak]);

  return {
    speak,
    stop,
    isSpeaking: state.isSpeaking,
    hasPlayed: state.hasPlayed,
    isMuted: state.isMuted,
    toggleMute,
    replay,
  };
}

export function WelcomeVoiceControls() {
  const { isSpeaking, hasPlayed, isMuted, toggleMute, replay } =
    useWelcomeVoice();

  return (
    <>
      {/* Floating sound control while speaking */}
      <AnimatePresence>
        {!isMuted && isSpeaking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            <div className="flex items-center gap-1 rounded-full border border-accent-violet/30 bg-[rgba(10,10,10,0.85)] px-3.5 py-1.5 backdrop-blur-xl shadow-[0_0_20px_rgba(124,92,255,0.2)]">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full bg-accent-violet"
                    animate={{ height: [4, 12, 4] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="ml-1.5 text-[11px] font-medium text-white/80">Speaking...</span>
            </div>
            <button
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,10,0.85)] text-white/70 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent-violet/30 hover:text-white cursor-pointer"
              aria-label="Mute voice"
            >
              <VolumeX size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replay button after speaking finishes */}
      <AnimatePresence>
        {hasPlayed && !isSpeaking && !isMuted && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.5 }}
            onClick={replay}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,10,0.85)] text-white/70 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent-violet/40 hover:text-accent-violet hover:shadow-[0_0_20px_rgba(124,92,255,0.2)] cursor-pointer"
            aria-label="Replay welcome voice"
            title="Replay Welcome Greeting"
          >
            <Volume2 size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
