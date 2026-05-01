"use client";

import { useEffect, useState } from "react";

type Dot = { x: number; y: number; t: number };

export default function CursorTrail() {
  const [dots, setDots] = useState<Dot[]>([]);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let last = 0;
    function onMove(e: PointerEvent) {
      const now = performance.now();
      if (now - last < 28) return;
      last = now;
      setDots((d) => {
        const next = [...d, { x: e.clientX, y: e.clientY, t: now }];
        return next.slice(-10);
      });
    }
    function gc() {
      const now = performance.now();
      setDots((d) => d.filter((p) => now - p.t < 600));
    }
    window.addEventListener("pointermove", onMove);
    const id = window.setInterval(gc, 120);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.clearInterval(id);
    };
  }, [enabled]);

  if (!enabled) return null;

  const now = performance.now();
  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {dots.map((d) => {
        const age = now - d.t;
        const opacity = Math.max(0, 1 - age / 600);
        const size = 4 + opacity * 4;
        return (
          <span
            key={d.t}
            style={{
              position: "absolute",
              left: d.x - size / 2,
              top: d.y - size / 2,
              width: size,
              height: size,
              background: "var(--accent, #22d3ee)",
              opacity: opacity * 0.7,
              boxShadow: "0 0 8px var(--accent, #22d3ee)",
              borderRadius: 0,
            }}
          />
        );
      })}
    </div>
  );
}
