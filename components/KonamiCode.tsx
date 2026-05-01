"use client";

import { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";

const SEQ = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const ACCENTS: Array<{ name: string; value: string }> = [
  { name: "CYAN", value: "#22d3ee" },
  { name: "MAGENTA", value: "#ff2bd6" },
  { name: "LIME", value: "#a3e635" },
  { name: "AMBER", value: "#fbbf24" },
  { name: "ROSE", value: "#fb7185" },
];

export default function KonamiCode() {
  const [hits, setHits] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [accentIdx, setAccentIdx] = useState(0);
  const { play } = useSound();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQ[hits.length];
      if (key === expected) {
        const next = [...hits, key];
        if (next.length === SEQ.length) {
          const ni = (accentIdx + 1) % ACCENTS.length;
          setAccentIdx(ni);
          document.documentElement.style.setProperty("--accent", ACCENTS[ni].value);
          setToast(`+1UP · ACCENT: ${ACCENTS[ni].name}`);
          play("oneUp");
          setHits([]);
          window.setTimeout(() => setToast(null), 2400);
        } else {
          play("pop");
          setHits(next);
        }
      } else if (hits.length > 0) {
        setHits([]);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hits, accentIdx, play]);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-6 right-6 z-50 cartridge px-4 py-2 font-pixel text-[10px] tracking-widest text-glow-magenta motion-safe:animate-flicker"
      role="status"
      aria-live="polite"
    >
      {toast}
    </div>
  );
}
