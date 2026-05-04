"use client";

import { useEffect, useState } from "react";
import { ACCENT_CYCLE_EVENT, type Accent } from "@/lib/accentEgg";

/**
 * Renders the "+1UP · ACCENT: …" toast whenever any Easter-egg trigger
 * (Konami code, NES power-LED rhythm tap, etc.) calls cycleAccent().
 * Mounted once inside ArcadeChrome so every trigger shares the same
 * single floating toast slot — no chance of stacking duplicates.
 */
export default function AccentToast() {
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    let timer: number | undefined;
    function onCycle(e: Event) {
      const accent = (e as CustomEvent<Accent>).detail;
      setToast(`1UP · ACCENT: ${accent.name}`);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setToast(null), 2400);
    }
    window.addEventListener(ACCENT_CYCLE_EVENT, onCycle);
    return () => {
      window.removeEventListener(ACCENT_CYCLE_EVENT, onCycle);
      window.clearTimeout(timer);
    };
  }, []);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-3 md:right-6 left-3 md:left-auto z-50 cartridge px-3 md:px-4 py-2 font-pixel text-[10px] tracking-widest text-glow-magenta motion-safe:animate-flicker text-center md:text-left max-w-[calc(100vw-1.5rem)] md:max-w-none"
      role="status"
      aria-live="polite"
    >
      {toast}
    </div>
  );
}
