"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import DifficultySelector, { type Difficulty } from "./DifficultySelector";
import ProjectCard, {
  ProjectCardBody,
  cardClasses,
  cardStyleFor,
} from "./ProjectCard";
import CartridgeSprite from "./CartridgeSprite";
import { useSound } from "./SoundProvider";

const STORAGE_KEY = "mtw.difficulty";

type DragState =
  | { phase: "idle" }
  | {
      phase: "dragging";
      project: Project;
      pointerId: number;
      x: number;
      y: number;
      offsetX: number;
      offsetY: number;
      grabRect: DOMRect;
    }
  | {
      phase: "inserting";
      project: Project;
      from: { x: number; y: number };
    };

export default function Cabinet() {
  const [mode, setMode] = useState<Difficulty>("easy");
  const [hydrated, setHydrated] = useState(false);

  // Read preference once on mount; default Easy until then
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "easy" || stored === "hard") setMode(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  function handleChange(m: Difficulty) {
    setMode(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }

  return (
    <>
      <DifficultySelector mode={mode} onChange={handleChange} />

      {/* Render the same DOM until hydration so server + client match.
          After hydration, switch to the hard cabinet if that's the saved pref. */}
      {hydrated && mode === "hard" ? (
        <HardCabinet />
      ) : (
        <EasyGrid />
      )}
    </>
  );
}

/* ─── Easy mode ───────────────────────────────────────────────────────── */

function EasyGrid() {
  return (
    <section aria-labelledby="cartridges-heading">
      <div className="flex items-baseline justify-between gap-3 mb-6">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>SELECT YOUR GAME
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute whitespace-nowrap">
          {projects.length} CARTRIDGES
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.no} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ─── Hard mode ───────────────────────────────────────────────────────── */

function HardCabinet() {
  const router = useRouter();
  const { play } = useSound();
  const consoleRef = useRef<HTMLDivElement>(null);
  const [drag, setDrag] = useState<DragState>({ phase: "idle" });
  const [overConsole, setOverConsole] = useState(false);

  function pointInConsole(x: number, y: number) {
    const c = consoleRef.current;
    if (!c) return false;
    const r = c.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function startDrag(p: Project, e: React.PointerEvent<HTMLElement>) {
    if (p.external) return; // external links never drag
    // Touch users get the click-to-insert path so vertical scrolling
    // through the cabinet always works. Drag stays on mouse/pen.
    if (e.pointerType === "touch") return;
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    setDrag({
      phase: "dragging",
      project: p,
      pointerId: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      grabRect: rect,
    });
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    play("pop");
  }

  function move(e: React.PointerEvent) {
    if (drag.phase !== "dragging") return;
    setDrag({ ...drag, x: e.clientX, y: e.clientY });
    const isOver = pointInConsole(e.clientX, e.clientY);
    if (isOver !== overConsole) {
      setOverConsole(isOver);
      if (isOver) play("hover");
    }
  }

  function endDrag(e: React.PointerEvent, p?: Project) {
    if (drag.phase === "dragging") {
      const isOver = pointInConsole(e.clientX, e.clientY);
      setOverConsole(false);
      if (isOver) {
        triggerInsert(drag.project, { x: e.clientX, y: e.clientY });
      } else {
        setDrag({ phase: "idle" });
      }
      return;
    }
    // Touch tap fallback. iOS Safari sometimes drops the synthetic `click`
    // on a <div role="button"> that also has pointer-event handlers, so we
    // trigger insert directly from pointerup. clickInsert is idempotent
    // because it early-returns when drag.phase isn't "idle".
    if (e.type === "pointerup" && e.pointerType === "touch" && p) {
      clickInsert(p, e.currentTarget as HTMLElement);
    }
  }

  function triggerInsert(p: Project, from: { x: number; y: number }) {
    setDrag({ phase: "inserting", project: p, from });
    play("cartridge");
    // power-up after the cartridge is seated
    window.setTimeout(() => play("power"), 320);
    // navigate after the full sequence
    window.setTimeout(() => {
      router.push(p.href);
    }, 1500);
  }

  // Click-to-insert (also covers keyboard Enter)
  function clickInsert(p: Project, target: HTMLElement) {
    if (drag.phase !== "idle") return;
    if (p.external) return;
    const rect = target.getBoundingClientRect();
    triggerInsert(p, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  return (
    <section aria-labelledby="cartridges-heading">
      <Console
        innerRef={consoleRef}
        active={drag.phase === "dragging" || drag.phase === "inserting"}
        highlight={overConsole}
        inserting={drag.phase === "inserting"}
        slottedProject={drag.phase === "inserting" ? drag.project : null}
        from={drag.phase === "inserting" ? drag.from : null}
      />

      <div className="flex items-baseline justify-between gap-3 mb-6">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>AVAILABLE CARTRIDGES
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute whitespace-nowrap">
          {projects.length} CARTRIDGES<span className="hidden md:inline"> · DRAG OR CLICK</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((p) => {
          const isBeingDragged =
            drag.phase === "dragging" && drag.project.no === p.no;
          const isInserting =
            drag.phase === "inserting" && drag.project.no === p.no;
          const dimmed = isBeingDragged || isInserting;
          const isExternal = !!p.external;

          return (
            <div
              key={p.no}
              role="button"
              tabIndex={0}
              aria-label={`${p.title} — ${isExternal ? "external link" : "load this cartridge"}`}
              aria-describedby="cabinet-help"
              className={`${cardClasses(p)} touch-pan-y cursor-pointer md:cursor-grab md:active:cursor-grabbing transition-opacity duration-200 ${
                dimmed ? "opacity-30 pointer-events-none" : "opacity-100"
              }`}
              style={cardStyleFor(p)}
              onPointerDown={(e) => startDrag(p, e)}
              onPointerMove={move}
              onPointerUp={(e) => endDrag(e, p)}
              onPointerCancel={(e) => endDrag(e, p)}
              onClick={(e) => clickInsert(p, e.currentTarget)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  clickInsert(p, e.currentTarget);
                }
              }}
            >
              <ProjectCardBody project={p} />
            </div>
          );
        })}
      </div>

      <p
        id="cabinet-help"
        className="mt-6 font-mono text-[11px] text-ink-mute uppercase tracking-widest"
      >
        <span className="md:hidden">Tip — Tap a cartridge to auto-load.</span>
        <span className="hidden md:inline">Tip — Press Enter or click to auto-load. Drag for the full kerchunk.</span>
      </p>

      {/* Floating drag ghost */}
      {drag.phase === "dragging" && (
        <div
          className="pointer-events-none fixed z-50"
          style={{
            left: drag.x - drag.offsetX,
            top: drag.y - drag.offsetY,
            width: 240,
            transform: `rotate(${overConsole ? 0 : -4}deg)`,
            transition: "transform 0.2s ease-out",
          }}
          aria-hidden="true"
        >
          <CartridgeSprite project={drag.project} />
        </div>
      )}
    </section>
  );
}

/* ─── Console ─────────────────────────────────────────────────────────── */

function Console({
  innerRef,
  active,
  highlight,
  inserting,
  slottedProject,
  from,
}: {
  innerRef: React.RefObject<HTMLDivElement>;
  active: boolean;
  highlight: boolean;
  inserting: boolean;
  slottedProject: Project | null;
  from: { x: number; y: number } | null;
}) {
  // Compute the spring start offset so the cartridge animates from the drop point
  const start = useFromOffset(innerRef, from);

  return (
    <div className="relative mb-10 mx-auto max-w-md">
      <div
        ref={innerRef}
        className={`relative cartridge p-4 transition-all duration-200 ${
          highlight
            ? "shadow-neon-magenta border-neon-magenta"
            : ""
        }`}
        aria-label="Console — drop a cartridge here to load a case study"
        role="region"
      >
        {/* power LED + label */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                inserting ? "bg-neon-lime shadow-neon-lime animate-pulse" : "bg-neon-magenta shadow-neon-magenta"
              }`}
              aria-hidden="true"
            />
            <span className="font-pixel text-[10px] tracking-widest text-glow-magenta">
              MTW · CONSOLE
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
            {inserting ? "LOADING…" : highlight ? "READY" : active ? "AWAITING" : "IDLE"}
          </span>
        </div>

        {/* slot */}
        <div
          className="relative h-[80px] bg-bg-void border border-ink-ghost overflow-hidden"
          style={{
            boxShadow: highlight
              ? "inset 0 0 24px rgba(255,43,214,0.45), inset 0 0 0 1px rgba(255,43,214,0.7)"
              : "inset 0 0 18px rgba(0,0,0,0.7)",
            transition: "box-shadow 0.2s ease-out",
          }}
        >
          {/* slot lip */}
          <div
            className="absolute top-0 left-0 right-0 h-[6px] bg-bg-deep border-b border-ink-ghost"
            aria-hidden="true"
          />

          {/* idle copy */}
          {!inserting && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className={`font-pixel text-[11px] tracking-widest transition-colors ${
                  highlight ? "text-glow-magenta" : "text-ink-mute"
                }`}
              >
                {highlight ? "▼ DROP TO LOAD" : "INSERT CARTRIDGE"}
              </span>
            </div>
          )}

          {/* slotted cartridge animation */}
          <AnimatePresence>
            {inserting && slottedProject && (
              <motion.div
                key="slotted"
                className="absolute z-10"
                initial={{
                  x: start.x,
                  y: start.y,
                  scale: 1,
                  rotate: 0,
                  opacity: 0.95,
                }}
                animate={{
                  x: 0,
                  y: 12,
                  scale: 0.85,
                  rotate: 0,
                  opacity: 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 22,
                  mass: 0.7,
                }}
                style={{
                  left: "50%",
                  top: 0,
                  transformOrigin: "center top",
                  marginLeft: -120, // half of CartridgeSprite width
                }}
                aria-hidden="true"
              >
                <CartridgeSprite project={slottedProject} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* power-up flash + scanline jitter when inserting */}
          <AnimatePresence>
            {inserting && (
              <>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(255,43,214,0.2)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.7, 0, 0.5, 0] }}
                  transition={{ delay: 0.5, duration: 0.9 }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute left-0 right-0 h-[2px] pointer-events-none"
                  style={{ background: "rgba(255,43,214,0.9)", mixBlendMode: "screen" }}
                  initial={{ top: "-2%" }}
                  animate={{ top: "102%" }}
                  transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
                  aria-hidden="true"
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {/* base trim — controls and detail */}
        <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-ink-mute">
          <span>● MTW-1</span>
          <span>v0.1</span>
        </div>
      </div>

      {/* arrow hint */}
      {active && !inserting && (
        <div
          className="absolute -bottom-6 left-0 right-0 text-center font-pixel text-[10px] tracking-widest text-glow-magenta animate-pulse"
          aria-hidden="true"
        >
          ▼ ▼ ▼
        </div>
      )}
    </div>
  );
}

/**
 * Compute the (x, y) offset from the console centre that the cartridge
 * should animate from, so the spring feels like it's coming from where the
 * pointer dropped.
 */
function useFromOffset(
  ref: React.RefObject<HTMLDivElement>,
  from: { x: number; y: number } | null,
) {
  if (!from || !ref.current) return { x: 0, y: -160 };
  const r = ref.current.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + 12;
  return { x: from.x - cx, y: from.y - cy };
}
