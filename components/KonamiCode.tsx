"use client";

import { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";
import { cycleAccent } from "@/lib/accentEgg";

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

export default function KonamiCode() {
  const [hits, setHits] = useState<string[]>([]);
  const { play } = useSound();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = SEQ[hits.length];
      if (key === expected) {
        const next = [...hits, key];
        if (next.length === SEQ.length) {
          cycleAccent();
          play("oneUp");
          setHits([]);
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
  }, [hits, play]);

  // The toast is now rendered by <AccentToast />, which listens for the
  // CustomEvent that cycleAccent() dispatches.
  return null;
}
