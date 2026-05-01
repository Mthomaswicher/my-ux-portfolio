"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSound } from "./SoundProvider";
import { getPublicClient } from "@/lib/supabase";

/**
 * Site pet that roams the bottom of the viewport. A small dark robot with
 * a pink cone hat, eyes that track the cursor, a speech bubble, AND
 * pickup-and-drop interaction.
 *
 * Skipped on touch / small screens (no cursor for the eye tracking, and
 * the pet would crash through stacked content on phones).
 */

const ROAM_PHRASES = [
  "Hey! Listen!",
  "It's dangerous to go alone.",
  "Press F to pay respects.",
  "↑ ↑ ↓ ↓ ← → ← → B A",
  "Stay awhile and listen.",
  "Would you kindly read the patch notes?",
  "All your cartridge are belong to us.",
  "Achievement unlocked: hover.",
  "Do a barrel roll.",
  "git gud.",
  "Finish him!",
  "The cake is a lie.",
  "Save game? [Y / N]",
  "Insert coin to continue.",
  "Boss approaches.",
  "1UP somewhere on /experience.",
  "Wololo.",
  "Touch grass.",
  "Side quest: hire matt.",
  "Buffering… 99%.",
  "Player 2 has joined.",
  "RTX off.",
  "no scope.",
  "GG no re.",
];

const PICKUP_PHRASES = [
  "Hey! Listen!",
  "Get over here!",
  "Stop poking me.",
  "Snake? Snake?! SNAAAAAKE!",
  "FALL DAMAGE incoming.",
  "Wololo?",
  "Where to, hero?",
  "Health: low. Mana: also low.",
  "TAUNT!",
  "I'm too young to die.",
  "PHYSICS engaged.",
];

const DROP_PHRASES = [
  "FATALITY.",
  "Achievement unlocked: gravity.",
  "+10 XP.",
  "GG.",
  "Mission complete.",
  "Saving… do not turn off.",
  "Press F.",
  "Crit.",
  "Phew.",
  "RESPAWN.",
];

const FOOT_DOWN = 44;
const FOOT_UP = 41;
const PET_W = 44;
const PET_H = 62;

const VISITOR_KEY = "mtw.visitorId";
const RANK_KEY = "mtw.pet.rank";

/** "you're the Nth person…" copy. Special-cases small ranks so the
 *  ordinal reads naturally in the bubble. */
function rankLine(n: number): string {
  if (n === 1) return "you're the first person to pick me up!";
  if (n === 2) return "you're the 2nd person to pick me up!";
  if (n === 3) return "you're the 3rd person to pick me up!";
  return `you're the ${n}th person to pick me up!`;
}

/** Make-or-fetch a stable per-browser id used to dedupe pickups. */
function getVisitorId(): string {
  let id = "";
  try {
    id = localStorage.getItem(VISITOR_KEY) ?? "";
  } catch {
    /* ignore */
  }
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `v_${Date.now().toString(36)}_${Math.random()
            .toString(36)
            .slice(2, 10)}`;
    try {
      localStorage.setItem(VISITOR_KEY, id);
    } catch {
      /* ignore */
    }
  }
  return id;
}

/** Insert this visitor (no-op if already present), then return the total
 *  unique-visitor count. Returns null if Supabase isn't configured or the
 *  network call fails — caller should fall back to a non-rank phrase. */
async function recordPickupGetRank(): Promise<number | null> {
  const client = getPublicClient();
  if (!client) return null;
  const visitor = getVisitorId();
  try {
    // Cached: we've already learned our rank. Skip the network call so the
    // bubble pops instantly on subsequent pickups.
    const cached = Number(localStorage.getItem(RANK_KEY) || "");
    if (Number.isFinite(cached) && cached > 0) return cached;
  } catch {
    /* ignore */
  }
  try {
    // Insert; if visitor already exists, the unique constraint makes this
    // a no-op so the count reflects truly unique pickers.
    const { error } = await client
      .from("pet_pokes")
      .upsert({ visitor_id: visitor }, { onConflict: "visitor_id" });
    if (error) return null;
    const { count, error: countErr } = await client
      .from("pet_pokes")
      .select("visitor_id", { count: "exact", head: true });
    if (countErr || count == null) return null;
    try {
      localStorage.setItem(RANK_KEY, String(count));
    } catch {
      /* ignore */
    }
    return count;
  } catch {
    return null;
  }
}

export default function RoamPet() {
  const reduce = useReducedMotion();
  const { play } = useSound();
  const [enabled, setEnabled] = useState(false);
  const [x, setX] = useState(-80);
  // y = pixel offset from viewport top. We position the pet via top+left so
  // we can lift it freely while dragging.
  const [y, setY] = useState(0);
  const [target, setTarget] = useState(200);
  const [dir, setDir] = useState<1 | -1>(1);
  const [walking, setWalking] = useState(true);
  const [stride, setStride] = useState(0);
  const [bubble, setBubble] = useState<string | null>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [falling, setFalling] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const bubbleTimerRef = useRef<number | null>(null);
  // Cached global rank (1-based) once we've learned it from Supabase.
  const rankRef = useRef<number | null>(null);
  // Track whether the visitor has already heard the rank line this session
  // so we don't spam it on every single pickup.
  const rankShownRef = useRef(false);

  function floorY() {
    if (typeof window === "undefined") return 0;
    return window.innerHeight - PET_H - 8;
  }

  function flashBubble(text: string, ms = 2400) {
    if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    setBubble(text);
    bubbleTimerRef.current = window.setTimeout(() => setBubble(null), ms);
  }

  // Mount: gate on capability, position on the floor, listen for cursor.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || small || coarse) return;
    try {
      const cached = Number(localStorage.getItem(RANK_KEY) || "");
      if (Number.isFinite(cached) && cached > 0) rankRef.current = cached;
    } catch {
      /* ignore */
    }
    const ready = window.setTimeout(() => {
      setX(-60);
      setY(floorY());
      setTarget(160 + Math.random() * (window.innerWidth - 320));
      setEnabled(true);
    }, 1500);

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onResize = () => {
      if (!dragging) setY(floorY());
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);
    return () => {
      window.clearTimeout(ready);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      if (bubbleTimerRef.current) window.clearTimeout(bubbleTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  // Walk loop: step toward target while not held + not falling.
  useEffect(() => {
    if (!enabled || dragging || falling) return;
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
  }, [enabled, dragging, falling, target]);

  // Stride animation while walking.
  useEffect(() => {
    if (!enabled || !walking || dragging) return;
    const id = window.setInterval(() => {
      setStride((s) => 1 - s);
    }, 220);
    return () => window.clearInterval(id);
  }, [enabled, walking, dragging]);

  // After idling, pick a new target.
  useEffect(() => {
    if (!enabled || walking || dragging || falling) return;
    const dwell = 1800 + Math.random() * 2400;
    const id = window.setTimeout(() => {
      const maxX = window.innerWidth - 80;
      setTarget(Math.random() * maxX);
    }, dwell);
    return () => window.clearTimeout(id);
  }, [enabled, walking, dragging, falling, x]);

  // Bubble on idle (only when not held).
  useEffect(() => {
    if (!enabled || walking || dragging || falling) return;
    if (Math.random() > 0.45) return;
    const id = window.setTimeout(() => {
      flashBubble(
        ROAM_PHRASES[Math.floor(Math.random() * ROAM_PHRASES.length)],
        3400,
      );
    }, 600);
    return () => window.clearTimeout(id);
  }, [enabled, walking, dragging, falling]);

  // Eye tracking — runs always; while dragging, pet looks at the cursor too.
  useEffect(() => {
    if (!enabled) return;
    const id = window.setInterval(() => {
      if (walking && !dragging) {
        setEyeOffset({ x: 0, y: 0 });
        return;
      }
      const petCx = x + PET_W / 2;
      const petCy = y + PET_H / 2;
      const dx = mouseRef.current.x - petCx;
      const dy = mouseRef.current.y - petCy;
      const len = Math.hypot(dx, dy) || 1;
      setEyeOffset({
        x: Math.max(-1.2, Math.min(1.2, (dx / len) * 1.2)),
        y: Math.max(-1.2, Math.min(1.2, (dy / len) * 1.2)),
      });
    }, 80);
    return () => window.clearInterval(id);
  }, [enabled, walking, dragging, x, y]);

  /* ─── Pickup / drag / drop ────────────────────────────────────────── */

  function onPickup(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
    setWalking(false);
    play("pop");

    // First pickup of the session: try to fetch / register this visitor's
    // rank from Supabase. On every later pickup, just play a regular line.
    if (!rankShownRef.current) {
      rankShownRef.current = true;
      // If we already know the rank from a previous visit, show it now.
      if (rankRef.current && rankRef.current > 0) {
        flashBubble(rankLine(rankRef.current), 2800);
      } else {
        // Optimistic placeholder while we wait on the network.
        flashBubble(
          PICKUP_PHRASES[Math.floor(Math.random() * PICKUP_PHRASES.length)],
          1800,
        );
        recordPickupGetRank().then((rank) => {
          if (rank && rank > 0) {
            rankRef.current = rank;
            flashBubble(rankLine(rank), 2800);
          }
        });
      }
    } else {
      flashBubble(
        PICKUP_PHRASES[Math.floor(Math.random() * PICKUP_PHRASES.length)],
        1800,
      );
    }

    const rect = e.currentTarget.getBoundingClientRect();
    dragOffsetRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setX(e.clientX - dragOffsetRef.current.x);
    setY(e.clientY - dragOffsetRef.current.y);
  }

  function onDrop(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging) return;
    setDragging(false);
    play("select");
    flashBubble(
      DROP_PHRASES[Math.floor(Math.random() * DROP_PHRASES.length)],
      1500,
    );
    // Lock target to current x so the walker doesn't yank it sideways
    // while it's falling back to the floor.
    setTarget(x);
    // Fall to the floor over a few hundred ms, then resume roaming.
    setFalling(true);
    const startY = y;
    const endY = floorY();
    const dur = 320;
    const t0 = performance.now();
    const fall = () => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      // ease-in (gravity)
      const eased = t * t;
      setY(startY + (endY - startY) * eased);
      if (t < 1) {
        requestAnimationFrame(fall);
      } else {
        setY(endY);
        setFalling(false);
        // Pick a new wander target to nudge the pet away from where it landed.
        const maxX = window.innerWidth - 80;
        window.setTimeout(() => {
          setTarget(Math.random() * maxX);
        }, 600 + Math.random() * 1000);
      }
    };
    requestAnimationFrame(fall);
  }

  if (!enabled) return null;

  // While dragging, the pet tilts a little; when falling it springs back upright.
  const bodyRotate = dragging ? -10 * dir : 0;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none"
    >
      {/* Outer pet anchor — only positions; never mirrors. The bubble lives
          here so it always reads left-to-right regardless of walk direction. */}
      <div
        className="absolute"
        style={{
          left: x,
          top: y,
          width: PET_W,
          height: PET_H,
          touchAction: "none",
        }}
      >
        <AnimatePresence>
          {bubble && (
            <motion.div
              key={bubble}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-full mb-2 whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] font-mono"
              style={{
                left: "50%",
                translateX: "-50%",
                background: "#1a1a22",
                color: "#FFFFFF",
                boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
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

        {/* Inner body wrapper is the only thing that mirrors. */}
        <div
          role="button"
          tabIndex={-1}
          onPointerDown={onPickup}
          onPointerMove={onDragMove}
          onPointerUp={onDrop}
          onPointerCancel={onDrop}
          className="pointer-events-auto select-none absolute inset-0"
          style={{
            cursor: dragging ? "grabbing" : "grab",
            transform: `scaleX(${dir}) rotate(${bodyRotate}deg)`,
            transition: dragging ? "none" : "transform 0.18s ease-out",
            transformOrigin: "50% 80%",
          }}
        >
          <Robot
            eyeOffset={eyeOffset}
            stride={stride}
            walking={walking}
            dragging={dragging}
          />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────── */

function Robot({
  eyeOffset,
  stride,
  walking,
  dragging,
}: {
  eyeOffset: { x: number; y: number };
  stride: number;
  walking: boolean;
  dragging: boolean;
}) {
  // While airborne the feet dangle a couple px below their normal floor.
  const dangleOffset = dragging ? 3 : 0;
  const leftY =
    (walking && !dragging
      ? stride === 0
        ? FOOT_UP
        : FOOT_DOWN
      : FOOT_DOWN) + dangleOffset;
  const rightY =
    (walking && !dragging
      ? stride === 0
        ? FOOT_DOWN
        : FOOT_UP
      : FOOT_DOWN) + dangleOffset;
  return (
    <svg
      viewBox="0 0 40 56"
      width={PET_W}
      height={PET_H}
      style={{
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.45))",
      }}
    >
      {/* tip pom-pom */}
      <circle cx="20" cy="3" r="2" fill="#ffd6e2" />
      {/* cone hat */}
      <polygon points="20,5 27.5,18 12.5,18" fill="#ec4899" />
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
