"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const WELCOME_TEXT =
  "Hello! I am Kartik Shukla. Welcome to my portfolio. I'm a Full Stack Developer and AI Engineer. Feel free to explore my production experience, healthcare projects, and verified credentials. Let's build something amazing together.";

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
            className="fixed bottom-4 left-4 z-50 flex items-center gap-2 font-mono sm:bottom-6 sm:left-6"
          >
            <div className="flex items-center gap-2 rounded-full border border-[#C96F4A]/40 bg-[#12100D]/95 px-4 py-2 backdrop-blur-xl shadow-2xl shadow-black">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    className="w-0.5 rounded-full bg-[#C96F4A]"
                    animate={{ height: [3, 14, 3] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-[rgba(255,250,240,0.85)] uppercase tracking-wider">
                VOICE INTRO...
              </span>
            </div>
            <button
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D]/95 text-[rgba(255,250,240,0.7)] shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-[#C96F4A] hover:text-[#C96F4A] cursor-pointer"
              aria-label="Mute voice"
            >
              <VolumeX size={15} />
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
            className="fixed bottom-4 left-4 z-50 flex h-11 w-11 sm:bottom-6 sm:left-6 items-center justify-center rounded-full border border-[rgba(255,250,240,0.16)] bg-[#12100D]/90 text-[rgba(255,250,240,0.7)] shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-[#C96F4A] hover:text-[#FFD6A1] hover:scale-105 cursor-pointer"
            aria-label="Replay welcome voice"
            title="Replay Audio Greeting"
          >
            <Volume2 size={17} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
