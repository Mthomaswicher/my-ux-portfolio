"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Mode = "scenic" | "basic";

type Ctx = {
  mode: Mode;
  hasChosen: boolean;
  setMode: (m: Mode) => void;
  toggle: () => void;
  reset: () => void;
};

const ModeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "mtw.mode";

function readStoredMode(): Mode | null {
  // localStorage is the source of truth for whether the user has actually
  // picked a path. The html[data-mode] attribute is set by the SSR default
  // and the bootstrap script for paint, so it can't be used to infer choice.
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "basic" || stored === "scenic") return stored;
  } catch {
    /* ignore */
  }
  return null;
}

export function ModeProvider({ children }: { children: React.ReactNode }) {
  // SSR returns scenic; first client render reads what the bootstrap script
  // wrote so the in-memory state matches the visible view from the start.
  const [mode, setModeState] = useState<Mode>(() => readStoredMode() ?? "scenic");
  const [hasChosen, setHasChosen] = useState<boolean>(() => readStoredMode() !== null);

  // Make sure the dataset attribute reflects state if anything got out of
  // sync (e.g. user cleared localStorage between paint and hydration).
  useEffect(() => {
    document.documentElement.dataset.mode = mode;
  }, [mode]);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    setHasChosen(true);
    document.documentElement.dataset.mode = m;
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setMode(mode === "scenic" ? "basic" : "scenic");
  }, [mode, setMode]);

  const reset = useCallback(() => {
    setHasChosen(false);
    setModeState("scenic");
    document.documentElement.dataset.mode = "scenic";
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <ModeContext.Provider value={{ mode, hasChosen, setMode, toggle, reset }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode(): Ctx {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    return {
      mode: "scenic",
      hasChosen: false,
      setMode: () => {},
      toggle: () => {},
      reset: () => {},
    };
  }
  return ctx;
}
