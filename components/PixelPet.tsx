"use client";

import { useEffect, useState } from "react";

const SPRITES = ["⌐■_■", "(•_•)", "(◣_◢)", "(>_<)", "(¬_¬)", "(o_o)", "(°ロ°)"];

export default function PixelPet() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -120, dir: 1 });
  const [face, setFace] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // The pet wanders the full viewport width — on phones it crashes
    // through stacked content. Skip it on small / coarse screens.
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || small || coarse) return;
    const ready = window.setTimeout(() => setEnabled(true), 4000);
    return () => window.clearTimeout(ready);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const tick = window.setInterval(() => {
      setPos((p) => {
        if (paused) return p;
        const next = p.x + p.dir * 2;
        if (next > window.innerWidth + 60) return { x: -60, dir: 1 };
        if (next < -120) return { x: window.innerWidth + 30, dir: -1 };
        return { ...p, x: next };
      });
    }, 70);

    const flicker = window.setInterval(() => {
      setFace((f) => (f + 1) % SPRITES.length);
    }, 1800);

    const pauser = window.setInterval(() => {
      setPaused((p) => !p);
    }, 7000);

    return () => {
      window.clearInterval(tick);
      window.clearInterval(flicker);
      window.clearInterval(pauser);
    };
  }, [enabled, paused]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-2 z-40 font-mono text-[14px] text-glow-lime select-none"
      style={{
        left: `${pos.x}px`,
        transform: pos.dir === -1 ? "scaleX(-1)" : "scaleX(1)",
        transition: "transform 0.2s",
      }}
    >
      {SPRITES[face]}
    </div>
  );
}
