"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Site pet that roams the bottom of the viewport. A small dark robot with
 * a pink cone hat, eyes that track the cursor, and a speech bubble that
 * pops occasionally. Inspired by Megan Yap's site mascot and the
 * roaming-pet idea from derDere/site-pet.
 *
 * Skipped on touch / small screens (coarse pointers can't see the
 * cursor-tracking eyes anyway, and the pet competes with stacked content
 * on phones).
 */

const PHRASES = [
  "hi.",
  "matt is open to work.",
  "try the konami code.",
  "press M to toggle sound.",
  "8 stages on the journey page.",
  "drag a cartridge into the console.",
  "this site has a light mode now.",
  "1UP hidden on /experience",
  "the cog is real.",
  "patch notes coming soon.",
  "thx for hanging out.",
];

const FOOT_DOWN = 44;
const FOOT_UP = 41;

export default function RoamPet() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [x, setX] = useState(-80);
  const [target, setTarget] = useState(200);
  const [dir, setDir] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(true);
  const [stride, setStride] = useState(0); // 0 or 1, alternates while walking
  const [bubble, setBubble] = useState<string | null>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const mouseRef = useRef({ x: 0, y: 0 });

  // Initialize on mount; bail on touch/small/reduced-motion devices.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || small || coarse) return;
    const t = window.setTimeout(() => {
      setX(-60);
      setTarget(160 + Math.random() * (window.innerWidth - 320));
      setEnabled(true);
    }, 1500);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  // Walk loop: step toward target, slow down + idle on arrival, then pick a new target.
  useEffect(() => {
    if (!enabled) return;
    const tick = window.setInterval(() => {
      setX((curr) => {
        const dist = target - curr;
        if (Math.abs(dist) < 1.5) {
          setWalking(false);
          return curr;
        }
        const speed = 1.6;
        const step = Math.sign(dist) * speed;
        setDir(step >= 0 ? 1 : -1);
        setWalking(true);
        return curr + step;
      });
    }, 30);
    return () => window.clearInterval(tick);
  }, [enabled, target]);

  // Stride animation (foot up / foot down) while walking.
  useEffect(() => {
    if (!enabled || !walking) return;
    const id = window.setInterval(() => {
      setStride((s) => 1 - s);
    }, 220);
    return () => window.clearInterval(id);
  }, [enabled, walking]);

  // After idling for a bit, pick a new target somewhere across the viewport.
  useEffect(() => {
    if (!enabled || walking) return;
    const dwellMs = 1800 + Math.random() * 2400;
    const id = window.setTimeout(() => {
      const maxX = window.innerWidth - 80;
      // Bias the next target so the pet generally sweeps across, not just
      // ping-ponging in the same neighborhood.
      const next = Math.random() * maxX;
      setTarget(next);
    }, dwellMs);
    return () => window.clearTimeout(id);
  }, [enabled, walking, x]);

  // Speech bubble: small chance per idle window.
  useEffect(() => {
    if (!enabled || walking) return;
    if (Math.random() > 0.45) return;
    const id = window.setTimeout(() => {
      setBubble(PHRASES[Math.floor(Math.random() * PHRASES.length)]);
      window.setTimeout(() => setBubble(null), 3400);
    }, 600);
    return () => window.clearTimeout(id);
  }, [enabled, walking]);

  // Eyes track the cursor when idle; locked forward while walking.
  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      if (walking) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }
      const petCx = x + 20;
      const petCy = window.innerHeight - 56 + 25;
      const dx = mouseRef.current.x - petCx;
      const dy = mouseRef.current.y - petCy;
      const len = Math.hypot(dx, dy) || 1;
      const ox = Math.max(-1.2, Math.min(1.2, (dx / len) * 1.2));
      const oy = Math.max(-1.2, Math.min(1.2, (dy / len) * 1.2));
      setEyeOffset({ x: ox, y: oy });
    }, 100);
    return () => window.clearInterval(id);
  }, [enabled, walking, x]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-2 z-40 select-none"
      style={{
        left: `${x}px`,
        transform: `scaleX(${dir})`,
        transition: "transform 0.18s ease-out",
      }}
    >
      <div className="relative">
        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              // Bubble counter-flips when the body is mirrored so the text
              // reads left-to-right regardless of walk direction.
              className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-mono"
              style={{
                background: "#1a1a22",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
                transform: `scaleX(${dir})`,
              }}
            >
              {bubble}
              <span
                aria-hidden="true"
                className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0"
                style={{
                  borderLeft: "5px solid transparent",
                  borderRight: "5px solid transparent",
                  borderTop: "5px solid #1a1a22",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <Robot
          eyeOffset={eyeOffset}
          stride={stride}
          walking={walking}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function Robot({
  eyeOffset,
  stride,
  walking,
}: {
  eyeOffset: { x: number; y: number };
  stride: 0 | 1 | number;
  walking: boolean;
}) {
  const leftY = walking
    ? stride === 0
      ? FOOT_UP
      : FOOT_DOWN
    : FOOT_DOWN;
  const rightY = walking
    ? stride === 0
      ? FOOT_DOWN
      : FOOT_UP
    : FOOT_DOWN;
  return (
    <svg
      viewBox="0 0 40 56"
      width="44"
      height="62"
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
      }}
    >
      {/* tip pom-pom */}
      <circle cx="20" cy="3" r="2" fill="#ffd6e2" />
      {/* cone hat */}
      <polygon points="20,5 27.5,18 12.5,18" fill="#ec4899" />
      {/* hat band */}
      <rect x="12.5" y="17" width="15" height="2.5" rx="1" fill="#9d174d" />

      {/* body */}
      <rect
        x="8"
        y="19"
        width="24"
        height="26"
        rx="4"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
      {/* top sheen */}
      <rect x="9" y="20" width="22" height="3" rx="2" fill="#1f1f2c" />
      {/* belly screen */}
      <rect
        x="11.5"
        y="32"
        width="17"
        height="6"
        rx="1.5"
        fill="#0a0a14"
        stroke="#2a2a35"
        strokeWidth="0.6"
      />
      <rect x="13" y="34" width="2" height="2" fill="#a3e635" />
      <rect x="16" y="34" width="2" height="2" fill="#22d3ee" />
      <rect x="19" y="34" width="2" height="2" fill="#ff2bd6" />
      <rect x="22" y="34" width="2" height="2" fill="#fbbf24" />

      {/* eye sockets */}
      <rect
        x={11 + eyeOffset.x}
        y={24 + eyeOffset.y}
        width="6"
        height="5"
        rx="1"
        fill="#FFFFFF"
      />
      <rect
        x={23 + eyeOffset.x}
        y={24 + eyeOffset.y}
        width="6"
        height="5"
        rx="1"
        fill="#FFFFFF"
      />
      {/* pupils */}
      <rect
        x={13 + eyeOffset.x * 1.3}
        y={25 + eyeOffset.y * 1.3}
        width="2"
        height="3"
        fill="#0a0a14"
      />
      <rect
        x={25 + eyeOffset.x * 1.3}
        y={25 + eyeOffset.y * 1.3}
        width="2"
        height="3"
        fill="#0a0a14"
      />

      {/* feet */}
      <rect
        x="10"
        y={leftY}
        width="6"
        height="6"
        rx="1.5"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
      <rect
        x="24"
        y={rightY}
        width="6"
        height="6"
        rx="1.5"
        fill="#101015"
        stroke="#2a2a35"
        strokeWidth="1"
      />
    </svg>
  );
}
