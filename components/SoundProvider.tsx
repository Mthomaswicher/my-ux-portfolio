"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { arcade, SfxName } from "@/lib/arcadeAudio";

const STORAGE_KEY = "mtw.sound.enabled";

type SoundCtx = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  play: (name: SfxName) => void;
};

const SoundContext = createContext<SoundCtx | null>(null);

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Default ON. Browsers still won't actually play any audio until the
  // first user gesture; this just means we don't gate playback behind
  // an explicit opt-in.
  const [enabled, setEnabledState] = useState(true);

  useEffect(() => {
    arcade.setEnabled(true);
    // Honour an explicit opt-out from a previous visit.
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "0") {
        setEnabledState(false);
        arcade.setEnabled(false);
      }
    } catch {
      /* localStorage may be blocked */
    }
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    arcade.setEnabled(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!arcade.isEnabled());
    if (!arcade.isEnabled()) {
      // we're toggling OFF. no test sound
    } else {
      arcade.test();
    }
  }, [setEnabled]);

  const play = useCallback((name: SfxName) => {
    if (!arcade.isEnabled()) return;
    const fn = (arcade as any)[name];
    if (typeof fn === "function") fn.call(arcade);
  }, []);

  // Keyboard shortcut: M to toggle (skip when typing in inputs)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "m" && e.key !== "M") return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      toggle();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <SoundContext.Provider value={{ enabled, toggle, setEnabled, play }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    // Allow components to be rendered outside provider in tests / static export
    return {
      enabled: false,
      toggle: () => {},
      setEnabled: () => {},
      play: () => {},
    } as SoundCtx;
  }
  return ctx;
}
