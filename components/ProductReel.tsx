"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const ACCENT_HEX = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
} as const;

type Accent = keyof typeof ACCENT_HEX;

export default function ProductReel({
  screens,
  alt,
  accent = "cyan",
  cycleMs = 3200,
  paused = false,
}: {
  screens: string[];
  alt: string;
  accent?: Accent;
  cycleMs?: number;
  paused?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [hoverPause, setHoverPause] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const accentHex = ACCENT_HEX[accent];

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause cycling when the card (closest focusable ancestor) is hovered or focused. WCAG 2.2.2
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const target =
      (el.closest("a, button, [tabindex]") as HTMLElement | null) ?? el;
    const enter = () => setHoverPause(true);
    const leave = () => setHoverPause(false);
    target.addEventListener("mouseenter", enter);
    target.addEventListener("mouseleave", leave);
    target.addEventListener("focusin", enter);
    target.addEventListener("focusout", leave);
    return () => {
      target.removeEventListener("mouseenter", enter);
      target.removeEventListener("mouseleave", leave);
      target.removeEventListener("focusin", enter);
      target.removeEventListener("focusout", leave);
    };
  }, []);

  useEffect(() => {
    if (screens.length < 2 || reduced || paused || hoverPause) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % screens.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [screens.length, cycleMs, reduced, paused, hoverPause]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-bg-deep"
      role="img"
      aria-label={alt}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={screens[idx]}
            alt={alt}
            fill
            sizes="(max-width: 640px) 95vw, (max-width: 1024px) 50vw, 640px"
            className="object-cover"
            priority={idx === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* dot indicators */}
      {screens.length > 1 && (
        <div className="absolute bottom-2 left-2 flex gap-1.5 pointer-events-none">
          {screens.map((_, i) => (
            <span
              key={i}
              className="block w-2 h-2 sm:w-2.5 sm:h-2.5"
              style={{
                background: i === idx ? accentHex : "#3a3a55",
                boxShadow: i === idx ? `0 0 6px ${accentHex}` : "none",
                transition: "background 0.3s, box-shadow 0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
