"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const ACCENT_HEX = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
} as const;

type Accent = keyof typeof ACCENT_HEX;

export default function HoloDisplay({
  screens,
  alt,
  accent = "cyan",
  fit = "cover",
  cycleMs = 4500,
  showCounter = false,
  interactive = true,
  priority = false,
}: {
  screens: string[];
  alt: string;
  accent?: Accent;
  fit?: "cover" | "contain";
  cycleMs?: number;
  showCounter?: boolean;
  interactive?: boolean;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const accentHex = ACCENT_HEX[accent];

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (screens.length < 2 || reduced || hovered) return;
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % screens.length),
      cycleMs,
    );
    return () => window.clearInterval(id);
  }, [screens.length, cycleMs, reduced, hovered]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 24,
  });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-15, 15]), {
    stiffness: 200,
    damping: 24,
  });

  function onMove(e: React.PointerEvent) {
    if (!interactive || reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    setHovered(false);
    mx.set(0);
    my.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onLeave}
      className="relative w-full h-full"
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX: rotX,
          rotateY: rotY,
          transformStyle: "preserve-3d",
          transformPerspective: 1200,
        }}
        animate={reduced ? undefined : { y: [-2, 4, -2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full h-full"
      >
        <div className="absolute inset-0 bg-bg-deep overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={idx}
              initial={{ opacity: 0, rotateY: -28, scale: 0.96 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: 28, scale: 0.96 }}
              transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0"
              style={{ transformOrigin: "center center" }}
            >
              <Image
                src={screens[idx]}
                alt={alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                className={
                  fit === "contain"
                    ? "object-contain"
                    : "object-cover"
                }
                priority={priority && idx === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* scoped scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 3px)",
              opacity: 0.45,
            }}
          />

          {/* inner edge glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 48px ${accentHex}40, inset 0 0 0 1px ${accentHex}66`,
            }}
          />

          {/* moving sweep highlight */}
          <motion.div
            className="absolute -inset-x-[20%] inset-y-0 pointer-events-none"
            style={{
              background: `linear-gradient(115deg, transparent 35%, ${accentHex}28 50%, transparent 65%)`,
            }}
            animate={reduced ? undefined : { x: ["-30%", "30%"] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />

          {/* faint vertical jitter band */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{ background: `${accentHex}55`, mixBlendMode: "screen" }}
            animate={reduced ? undefined : { top: ["-2%", "102%"] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* underglow */}
      <div
        className="absolute -bottom-3 left-[8%] right-[8%] h-6 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${accentHex}80, transparent 70%)`,
          filter: "blur(14px)",
          opacity: 0.55,
        }}
      />

      {showCounter && screens.length > 1 && (
        <div
          className="absolute bottom-2 right-2 z-10 font-mono text-[10px] tracking-widest pointer-events-none uppercase px-1.5 py-0.5 bg-bg-void/70 backdrop-blur-sm"
          style={{ color: accentHex }}
        >
          {String(idx + 1).padStart(2, "0")} / {String(screens.length).padStart(2, "0")}
        </div>
      )}
    </div>
  );
}
