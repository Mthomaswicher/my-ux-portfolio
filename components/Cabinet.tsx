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
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3 mb-6">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>SELECT YOUR GAME
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute">
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
  const [isCoarse, setIsCoarse] = useState(false);
  // pointerdown stages a "potential drag" so taps don't immediately enter
  // drag mode. Only after the pointer moves past a small threshold do we
  // commit to drag. that way a quick tap still fires a normal click.
  const dragStartRef = useRef<{
    project: Project;
    pointerId: number;
    target: HTMLElement;
    x: number;
    y: number;
    rect: DOMRect;
  } | null>(null);
  // Track when a drag just ended so the synthesized click that follows
  // pointerup doesn't double-trigger navigation.
  const lastDragEndRef = useRef(0);

  useEffect(() => {
    setIsCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  function pointInConsole(x: number, y: number) {
    const c = consoleRef.current;
    if (!c) return false;
    const r = c.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function startDrag(p: Project, e: React.PointerEvent<HTMLElement>) {
    if (p.external) return; // external links never drag
    // Stage a potential drag. Don't preventDefault yet. we want the
    // browser to fire `click` if this turns out to be a stationary tap.
    dragStartRef.current = {
      project: p,
      pointerId: e.pointerId,
      target: e.currentTarget,
      x: e.clientX,
      y: e.clientY,
      rect: e.currentTarget.getBoundingClientRect(),
    };
  }

  function move(e: React.PointerEvent) {
    // Already dragging. track the pointer.
    if (drag.phase === "dragging") {
      e.preventDefault();
      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      const isOver = pointInConsole(e.clientX, e.clientY);
      if (isOver !== overConsole) {
        setOverConsole(isOver);
        if (isOver) play("hover");
      }
      return;
    }

    // Movement past the threshold promotes the staged press into a drag.
    const start = dragStartRef.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (dx * dx + dy * dy > 64) {
      // 8px threshold
      e.preventDefault();
      setDrag({
        phase: "dragging",
        project: start.project,
        pointerId: start.pointerId,
        x: e.clientX,
        y: e.clientY,
        offsetX: start.x - start.rect.left,
        offsetY: start.y - start.rect.top,
        grabRect: start.rect,
      });
      try {
        start.target.setPointerCapture(start.pointerId);
      } catch {
        /* ignore */
      }
      play("pop");
      dragStartRef.current = null;
    }
  }

  function endDrag(e: React.PointerEvent) {
    dragStartRef.current = null;
    if (drag.phase !== "dragging") return;
    lastDragEndRef.current = Date.now();
    const isOver = pointInConsole(e.clientX, e.clientY);
    setOverConsole(false);
    if (isOver) {
      triggerInsert(drag.project, { x: e.clientX, y: e.clientY });
    } else {
      setDrag({ phase: "idle" });
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

  // Click-to-insert. On touch we navigate directly because the Console is
  // off-screen at the top of the page and a 1.5s animation feels broken.
  // On mouse/pen we play the full insert animation. Drag-then-drop-outside
  // also fires a click; we suppress it via lastDragEndRef.
  function clickInsert(p: Project, target: HTMLElement) {
    if (Date.now() - lastDragEndRef.current < 250) return;
    if (drag.phase !== "idle") return;
    if (p.external) return;
    if (isCoarse) {
      router.push(p.href);
      return;
    }
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

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-3 mb-6">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>AVAILABLE CARTRIDGES
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute">
          {projects.length} CARTRIDGES · DRAG OR TAP
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
            <button
              key={p.no}
              type="button"
              aria-label={`${p.title}: ${isExternal ? "external link" : "load this cartridge"}`}
              aria-describedby="cabinet-help"
              // touch-none keeps the browser from stealing the gesture
              // for vertical scroll once the user starts dragging. The
              // page is still scrollable through the gaps and side
              // padding around the cartridge grid.
              className={`${cardClasses(p)} text-left w-full touch-none cursor-pointer md:cursor-grab md:active:cursor-grabbing transition-opacity duration-200 ${
                dimmed ? "opacity-30 pointer-events-none" : "opacity-100"
              }`}
              style={cardStyleFor(p)}
              onPointerDown={(e) => startDrag(p, e)}
              onPointerMove={move}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onClick={(e) => clickInsert(p, e.currentTarget)}
            >
              <ProjectCardBody project={p} />
            </button>
          );
        })}
      </div>

      <p
        id="cabinet-help"
        className="mt-6 font-mono text-[11px] text-ink-mute uppercase tracking-widest"
      >
        <span className="md:hidden">Tip: Tap to auto-load. Drag a cartridge up to the console for the full kerchunk.</span>
        <span className="hidden md:inline">Tip: Press Enter or click to auto-load. Drag for the full kerchunk.</span>
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
        aria-label="Console: drop a cartridge here to load a case study"
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

        {/* base trim. controls and detail */}
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
