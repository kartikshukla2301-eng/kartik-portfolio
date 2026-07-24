"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const WELCOME_TEXT =
  "Hello! I am Kartik Shukla. Welcome to my portfolio. I'm an AI Engineer and Full Stack Developer. Feel free to explore my projects and experience. Let's build something amazing together.";

const SESSION_KEY = "portfolio-voice-played";

export function useWelcomeVoice() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const played = sessionStorage.getItem(SESSION_KEY);
    if (played) setHasPlayed(true);
  }, []);

  useEffect(() => {
    const stop = () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
    window.addEventListener("beforeunload", stop);
    return () => {
      window.removeEventListener("beforeunload", stop);
      stop();
    };
  }, []);

  const speak = useCallback(() => {
    if (!window.speechSynthesis || hasPlayed) return;

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

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setHasPlayed(true);
      sessionStorage.setItem(SESSION_KEY, "true");
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [hasPlayed]);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    if (isSpeaking) stop();
    setIsMuted((p) => !p);
  }, [isSpeaking, stop]);

  const replay = useCallback(() => {
    setHasPlayed(false);
    setTimeout(() => speak(), 100);
  }, [speak]);

  return {
    speak,
    stop,
    isSpeaking,
    hasPlayed,
    isMuted,
    toggleMute,
    replay,
  };
}

export function WelcomeVoiceControls() {
  const { isSpeaking, hasPlayed, isMuted, toggleMute, replay } =
    useWelcomeVoice();

  if (hasPlayed && !isSpeaking && isMuted) return null;

  return (
    <>
      {/* Floating sound control while speaking */}
      <AnimatePresence>
        {hasPlayed && !isMuted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
          >
            {isSpeaking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 rounded-full border border-accent-violet/20 bg-[rgba(10,10,10,0.8)] px-3 py-1.5 backdrop-blur-xl"
              >
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
                <span className="ml-1 text-[10px] text-white/50">Speaking...</span>
              </motion.div>
            )}
            <button
              onClick={toggleMute}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,10,0.8)] text-white/50 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent-violet/30 hover:text-white"
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
            transition={{ delay: 1 }}
            onClick={replay}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,10,10,0.8)] text-white/50 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent-violet/30 hover:text-white"
            aria-label="Replay welcome voice"
          >
            <Volume2 size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
