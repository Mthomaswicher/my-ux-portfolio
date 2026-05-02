"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Robot from "./Robot";
import { useMode, type Mode } from "./ModeProvider";
import { useSound } from "./SoundProvider";

type Props = {
  active: boolean;
  destination?: string;
};

const DESTINATION_DEFAULT = "/home";

/**
 * Stage coordinates inside the SVG-style logical space (800 x 500). The
 * scene auto-fits to the container via CSS — we lay everything out in this
 * fixed coordinate space so animation math is simple.
 */
const STAGE_W = 800;
const STAGE_H = 500;
const FORK = { x: STAGE_W / 2, y: 380 };
const BASIC_END = { x: 110, y: 110 };
const SCENIC_END = { x: STAGE_W - 110, y: 110 };

function endFor(mode: Mode) {
  return mode === "basic" ? BASIC_END : SCENIC_END;
}

/** Walk waypoints — a curve looks more "walking down a path"
 * than a straight line. */
function pathFor(mode: Mode) {
  const end = endFor(mode);
  const mid = {
    x: (FORK.x + end.x) / 2 + (mode === "basic" ? -10 : 10),
    y: (FORK.y + end.y) / 2 + 40,
  };
  return [FORK, mid, end];
}

export default function PathChooser({ active, destination = DESTINATION_DEFAULT }: Props) {
  const router = useRouter();
  const { setMode } = useMode();
  const { play } = useSound();
  const reduced = useReducedMotion();

  const [hovered, setHovered] = useState<Mode | null>(null);
  const [chosen, setChosen] = useState<Mode | null>(null);
  const [walkProgress, setWalkProgress] = useState(0); // 0..1 along the chosen path
  const [stride, setStride] = useState<0 | 1>(0);
  const [closing, setClosing] = useState(false);

  // Idle eye-look at the hovered destination.
  const eyeOffset = (() => {
    if (chosen) return { x: 0, y: 0 };
    if (hovered === "basic") return { x: -1.2, y: -0.6 };
    if (hovered === "scenic") return { x: 1.2, y: -0.6 };
    return { x: 0, y: 0 };
  })();

  // Stride loop while walking.
  useEffect(() => {
    if (!chosen || closing) return;
    const id = window.setInterval(() => setStride((s) => (s === 0 ? 1 : 0)), 180);
    return () => window.clearInterval(id);
  }, [chosen, closing]);

  // Walk animation: tween walkProgress 0 → 1 over ~1.4s, then trigger the
  // close animation, then route.
  useEffect(() => {
    if (!chosen) return;
    const dur = reduced ? 1 : 1400;
    const t0 = performance.now();
    let raf = 0;
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      // Ease-in-out so the walk doesn't pop at the boundaries.
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setWalkProgress(eased);
      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setClosing(true);
        window.setTimeout(() => router.push(destination), reduced ? 0 : 620);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [chosen, destination, reduced, router]);

  // Prefetch the destination so the close-cut transition stays seamless.
  useEffect(() => {
    if (!active) return;
    router.prefetch(destination);
  }, [active, destination, router]);

  function choose(mode: Mode) {
    if (chosen) return;
    setMode(mode);
    setChosen(mode);
    play(mode === "scenic" ? "insertCoin" : "select");
  }

  // Position of robot in stage space — at fork until chosen, then animates.
  const robotPos = (() => {
    if (!chosen) return FORK;
    const [a, b, c] = pathFor(chosen);
    // Quadratic-bezier lerp through three points.
    const p = walkProgress;
    const x = (1 - p) * (1 - p) * a.x + 2 * (1 - p) * p * b.x + p * p * c.x;
    const y = (1 - p) * (1 - p) * a.y + 2 * (1 - p) * p * b.y + p * p * c.y;
    return { x, y };
  })();

  const robotFacing: 1 | -1 = chosen === "basic" ? -1 : 1;

  return (
    <div
      className={`transition-opacity duration-700 ${active ? "opacity-100" : "opacity-0"}`}
      aria-hidden={!active}
      // @ts-expect-error inert is valid HTML; TS lib types may lag
      inert={!active ? "" : undefined}
    >
      <div className="mb-5">
        <div
          className="font-pixel text-[10px] sm:text-[11px] tracking-[0.3em] text-glow-magenta mb-2"
          aria-hidden="true"
        >
          ░ FORK IN THE ROAD ░
        </div>
        <h2 className="font-pixel text-[16px] sm:text-[20px] leading-tight tracking-widest text-glow-cyan mb-1">
          CHOOSE YOUR PATH
        </h2>
        <p className="font-mono text-[12px] sm:text-[13px] text-ink-dim max-w-lg leading-relaxed">
          Two ways in, same work. Pick a path; the pet walks down.
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden border border-ink-ghost/40 aspect-[4/3] sm:aspect-[8/5]"
        style={{
          background:
            "linear-gradient(180deg, rgb(var(--bg-deep)) 0%, rgb(var(--bg-void)) 70%)",
        }}
        role="radiogroup"
        aria-label="Choose viewing experience"
      >
        <Stars />
        <Path
          mode="basic"
          start={FORK}
          end={BASIC_END}
          lit={hovered === "basic" || chosen === "basic"}
          progress={chosen === "basic" ? walkProgress : 0}
        />
        <Path
          mode="scenic"
          start={FORK}
          end={SCENIC_END}
          lit={hovered === "scenic" || chosen === "scenic"}
          progress={chosen === "scenic" ? walkProgress : 0}
        />

        <Destination
          mode="basic"
          pos={BASIC_END}
          hovered={hovered === "basic"}
          chosen={chosen === "basic"}
          disabled={chosen !== null && chosen !== "basic"}
          onHover={(h) => setHovered(h ? "basic" : null)}
          onSelect={() => choose("basic")}
        />
        <Destination
          mode="scenic"
          pos={SCENIC_END}
          hovered={hovered === "scenic"}
          chosen={chosen === "scenic"}
          disabled={chosen !== null && chosen !== "scenic"}
          onHover={(h) => setHovered(h ? "scenic" : null)}
          onSelect={() => choose("scenic")}
        />

        {/* Robot. We position via percentage so it scales with the stage. */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${(robotPos.x / STAGE_W) * 100}%`,
            top: `${(robotPos.y / STAGE_H) * 100}%`,
            transform: `translate(-50%, -100%)`,
            transition: chosen ? "none" : "left 0.3s ease, top 0.3s ease",
            zIndex: 5,
            width: `clamp(40px, 6vw, 56px)`,
          }}
        >
          <Robot
            facing={robotFacing}
            eyeOffset={eyeOffset}
            stride={stride}
            walking={chosen !== null && !closing}
            style={{ width: "100%", height: "auto" }}
          />
        </div>

      </div>

      {/* Full-viewport wipe: rendered as a sibling so it can cover the boot
          screen + chrome, not just the stage rectangle. */}
      <AnimatePresence>
        {closing && chosen && !reduced && <ClosingFlash mode={chosen} />}
      </AnimatePresence>

      <p className="mt-4 font-mono text-[11px] sm:text-[12px] text-ink-mute">
        <span aria-hidden="true">↹</span>{" "}
        <span className="uppercase tracking-widest">Tab</span> to switch ·{" "}
        <span aria-hidden="true">⏎</span>{" "}
        <span className="uppercase tracking-widest">Enter</span> to select
      </p>
    </div>
  );
}

/* ─── Stars (a flourish across the whole stage) ─── */

function Stars() {
  // Deterministic seeds so SSR + client agree.
  const stars = [
    { x: 6, y: 14, s: 1, d: 0 },
    { x: 13, y: 28, s: 1, d: 0.5 },
    { x: 22, y: 8, s: 2, d: 0.2 },
    { x: 32, y: 20, s: 1, d: 0.7 },
    { x: 47, y: 12, s: 1, d: 0.1 },
    { x: 58, y: 26, s: 2, d: 0.3 },
    { x: 70, y: 9, s: 1, d: 0.4 },
    { x: 78, y: 22, s: 1, d: 0.8 },
    { x: 88, y: 16, s: 2, d: 0.6 },
    { x: 94, y: 32, s: 1, d: 0.2 },
  ];
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute block bg-ink-mute/60 animate-pulse"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            animationDelay: `${s.d}s`,
            animationDuration: "2.4s",
          }}
        />
      ))}
    </div>
  );
}

/* ─── A single path drawn as a tapered quad (faked perspective) ─── */

function Path({
  mode,
  start,
  end,
  lit,
  progress,
}: {
  mode: Mode;
  start: { x: number; y: number };
  end: { x: number; y: number };
  lit: boolean;
  progress: number;
}) {
  // Tapered: wide near the camera (start), narrow at the destination (far).
  const startW = 130;
  const endW = 28;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy);
  const nx = -dy / len; // normal
  const ny = dx / len;

  const p1 = { x: start.x + (nx * startW) / 2, y: start.y + (ny * startW) / 2 };
  const p2 = { x: start.x - (nx * startW) / 2, y: start.y - (ny * startW) / 2 };
  const p3 = { x: end.x - (nx * endW) / 2, y: end.y - (ny * endW) / 2 };
  const p4 = { x: end.x + (nx * endW) / 2, y: end.y + (ny * endW) / 2 };

  const polygon = `${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y} ${p4.x},${p4.y}`;

  const isScenic = mode === "scenic";

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`pathfill-${mode}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          gradientUnits="userSpaceOnUse"
        >
          {isScenic ? (
            <>
              <stop offset="0%" stopColor="#1a0a2a" stopOpacity={lit ? 0.95 : 0.7} />
              <stop offset="100%" stopColor="#0a0a14" stopOpacity={lit ? 0.95 : 0.7} />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#d8d3c4" stopOpacity={lit ? 0.95 : 0.65} />
              <stop offset="100%" stopColor="#bdb6a3" stopOpacity={lit ? 0.95 : 0.65} />
            </>
          )}
        </linearGradient>

        {isScenic && (
          <pattern id="scenicPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <rect width="14" height="14" fill="transparent" />
            <rect width="6" height="6" x="0" y="0" fill="#22d3ee" opacity="0.18" />
            <rect width="6" height="6" x="7" y="7" fill="#ff2bd6" opacity="0.18" />
          </pattern>
        )}
      </defs>

      <polygon
        points={polygon}
        fill={`url(#pathfill-${mode})`}
        stroke={isScenic ? "rgba(34,211,238,0.55)" : "rgba(120,108,82,0.6)"}
        strokeWidth={lit ? 1.4 : 1}
        style={{ transition: "stroke-width 0.2s" }}
      />

      {isScenic && (
        <polygon
          points={polygon}
          fill="url(#scenicPattern)"
          opacity={lit ? 0.9 : 0.55}
          style={{ transition: "opacity 0.2s" }}
        />
      )}

      {!isScenic && (
        <line
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="rgba(255,255,255,0.45)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
      )}

      {progress > 0 && (
        <line
          x1={start.x}
          y1={start.y}
          x2={start.x + (end.x - start.x) * progress}
          y2={start.y + (end.y - start.y) * progress}
          stroke={isScenic ? "rgba(255,43,214,0.85)" : "rgba(40,28,12,0.85)"}
          strokeWidth={isScenic ? 4 : 3}
          strokeLinecap="round"
          style={{
            filter: isScenic
              ? "drop-shadow(0 0 6px rgba(255,43,214,0.9)) drop-shadow(0 0 14px rgba(255,43,214,0.45))"
              : "none",
          }}
        />
      )}
    </svg>
  );
}

/* ─── Destination marker (the clickable target at end of each path) ─── */

function Destination({
  mode,
  pos,
  hovered,
  chosen,
  disabled,
  onHover,
  onSelect,
}: {
  mode: Mode;
  pos: { x: number; y: number };
  hovered: boolean;
  chosen: boolean;
  disabled: boolean;
  onHover: (h: boolean) => void;
  onSelect: () => void;
}) {
  const isScenic = mode === "scenic";
  const xPct = (pos.x / STAGE_W) * 100;
  const yPct = (pos.y / STAGE_H) * 100;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={chosen}
      aria-label={
        isScenic
          ? "Scenic route: full video-game experience"
          : "Basic: clean portfolio layout"
      }
      disabled={disabled}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      onClick={onSelect}
      className={`absolute flex flex-col items-center gap-1.5 sm:gap-2 group disabled:cursor-default ${
        chosen ? "z-10" : ""
      }`}
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: `translate(-50%, -50%) scale(${hovered || chosen ? 1.05 : 1})`,
        transition: "transform 0.25s ease",
      }}
    >
      {isScenic ? (
        <ScenicMarker lit={hovered || chosen} />
      ) : (
        <BasicMarker lit={hovered || chosen} />
      )}
      <div
        className={`text-center ${
          isScenic
            ? "font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-cyan group-hover:text-glow-magenta whitespace-nowrap"
            : "text-[12px] sm:text-[15px] text-ink whitespace-nowrap"
        }`}
        style={
          isScenic
            ? undefined
            : { fontFamily: "var(--font-garamond)", fontWeight: 500, letterSpacing: "0.02em" }
        }
      >
        {isScenic ? (
          <>
            <span className="sm:hidden">SCENIC</span>
            <span className="hidden sm:inline">SCENIC ROUTE</span>
          </>
        ) : (
          "Basic"
        )}
      </div>
      <div
        className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-mono text-ink-mute group-hover:text-ink"
      >
        {isScenic ? "Press ▶" : "Read →"}
      </div>
    </button>
  );
}

function ScenicMarker({ lit }: { lit: boolean }) {
  return (
    <div
      className="relative"
      style={{
        width: "clamp(54px, 9vw, 80px)",
        aspectRatio: "1 / 1.1",
      }}
    >
      <div
        className="absolute inset-0 border-2"
        style={{
          background: "linear-gradient(180deg, #1a1a26 0%, #0a0a14 100%)",
          borderColor: lit ? "rgba(255,43,214,0.85)" : "rgba(34,211,238,0.55)",
          boxShadow: lit
            ? "0 0 18px rgba(255,43,214,0.55), inset 0 0 14px rgba(34,211,238,0.18)"
            : "inset 0 0 8px rgba(34,211,238,0.12)",
          transition: "all 0.25s",
        }}
      />
      <div
        className="absolute"
        style={{
          inset: "14% 14% 28% 14%",
          background: lit
            ? "radial-gradient(80% 80% at 50% 40%, rgba(34,211,238,0.55), rgba(255,43,214,0.22) 60%, #05050a 100%)"
            : "radial-gradient(80% 80% at 50% 40%, rgba(34,211,238,0.18), #05050a 80%)",
          transition: "all 0.25s",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 3px)",
            mixBlendMode: "multiply",
            opacity: 0.7,
          }}
        />
      </div>
      <div
        className="absolute"
        style={{
          left: "30%",
          right: "30%",
          bottom: "-8%",
          height: "14%",
          background: "#1a1a26",
          borderTop: "2px solid rgba(34,211,238,0.5)",
        }}
      />
    </div>
  );
}

function BasicMarker({ lit }: { lit: boolean }) {
  return (
    <div
      className="relative"
      style={{
        width: "clamp(54px, 9vw, 80px)",
        aspectRatio: "1 / 1.25",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #fcfaf4 0%, #ece6d4 100%)",
          border: `1px solid ${lit ? "#1a1a22" : "rgba(26,26,34,0.45)"}`,
          boxShadow: lit
            ? "0 4px 12px rgba(0,0,0,0.45), inset 0 0 0 4px rgba(26,26,34,0.04)"
            : "0 2px 6px rgba(0,0,0,0.35)",
          transition: "all 0.25s",
        }}
      />
      <div className="absolute" style={{ inset: "16% 16% 16% 16%" }}>
        <div className="w-full h-[6%] mb-[10%]" style={{ background: "rgba(26,26,34,0.78)" }} />
        <div className="w-[80%] h-[4%] mb-[8%]" style={{ background: "rgba(26,26,34,0.35)" }} />
        <div className="w-[90%] h-[4%] mb-[8%]" style={{ background: "rgba(26,26,34,0.35)" }} />
        <div className="w-[70%] h-[4%] mb-[8%]" style={{ background: "rgba(26,26,34,0.35)" }} />
        <div className="w-[85%] h-[4%]" style={{ background: "rgba(26,26,34,0.35)" }} />
      </div>
    </div>
  );
}

/* ─── Closing flash: a full-viewport wipe to mask the route change ─── */

function ClosingFlash({ mode }: { mode: Mode }) {
  const isScenic = mode === "scenic";
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      aria-hidden
      style={{
        background: isScenic
          ? "radial-gradient(circle at 50% 50%, rgba(34,211,238,0.95) 0%, rgba(255,43,214,0.85) 40%, #05050a 100%)"
          : "linear-gradient(180deg, #faf8f2 0%, #f4f0e6 100%)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {isScenic ? (
          <span className="font-pixel text-[14px] tracking-[0.3em] text-glow-cyan">
            ▶ LOADING
          </span>
        ) : (
          <span
            className="text-[18px] text-ink"
            style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
          >
            Loading…
          </span>
        )}
      </div>
    </motion.div>
  );
}
