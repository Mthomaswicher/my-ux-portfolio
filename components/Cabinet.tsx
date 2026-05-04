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
import { cycleAccent } from "@/lib/accentEgg";
import { haptic } from "@/lib/haptic";

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
  // Coarse pointer (touch) or narrow viewport (mobile) forces Easy mode and
  // hides the difficulty toggle drag-into-the-console is too finicky on
  // touch and there's no room for the console anyway.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    setIsMobile(mq.matches);
    const sync = () => setIsMobile(mq.matches);
    mq.addEventListener("change", sync);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "easy" || stored === "hard") setMode(stored);
    } catch {
      /* ignore */
    }
    setHydrated(true);
    return () => mq.removeEventListener("change", sync);
  }, []);

  function handleChange(m: Difficulty) {
    setMode(m);
    try {
      localStorage.setItem(STORAGE_KEY, m);
    } catch {
      /* ignore */
    }
  }

  // On mobile/touch, ignore the saved Hard preference and stay in Easy mode.
  const effectiveMode = isMobile ? "easy" : mode;

  return (
    <>
      {!isMobile && (
        <DifficultySelector mode={mode} onChange={handleChange} />
      )}

      {/* Render the same DOM until hydration so server + client match.
          After hydration, switch to the hard cabinet if that's the saved pref. */}
      {hydrated && effectiveMode === "hard" ? <HardCabinet /> : <EasyGrid />}
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

// Width of one cartridge card + the gap between cards in the carousel,
// used by the prev/next buttons to scroll exactly one slot at a time.
const CAROUSEL_CARD_WIDTH = 440;
const CAROUSEL_GAP = 20;

function HardCabinet() {
  const router = useRouter();
  const { play } = useSound();
  const consoleRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
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

  // Inflate the hit zone around the console so the drop is forgiving the
  // pointer doesn't have to land precisely on the console rectangle.
  // Generous padding here — the visible halo matches the hit area, but
  // we keep an extra cushion beyond it so a near-miss still counts.
  const HIT_PADDING_X = 220;
  const HIT_PADDING_Y = 160;
  function pointInConsole(x: number, y: number) {
    const c = consoleRef.current;
    if (!c) return false;
    const r = c.getBoundingClientRect();
    return (
      x >= r.left - HIT_PADDING_X &&
      x <= r.right + HIT_PADDING_X &&
      y >= r.top - HIT_PADDING_Y &&
      y <= r.bottom + HIT_PADDING_Y
    );
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
    haptic("kerchunk");
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

      {/* Horizontal carousel. Cartridges sit in a row; users can scroll the
          rail with the trackpad or the ◀/▶ buttons. Each card stays fully
          draggable up to the console — touch-none + setPointerCapture
          inside the drag handlers prevent the rail's horizontal scroll
          from intercepting an in-progress drag. */}
      <div className="relative">
        <button
          type="button"
          onClick={() =>
            scrollerRef.current?.scrollBy({
              left: -(CAROUSEL_CARD_WIDTH + CAROUSEL_GAP),
              behavior: "smooth",
            })
          }
          aria-label="Scroll cartridges left"
          className="hidden sm:inline-flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center font-pixel text-[12px] tracking-widest border border-ink-ghost bg-bg-deep/95 backdrop-blur-sm text-ink-mute hover:text-glow-cyan hover:border-neon-cyan/60 focus-visible:text-glow-cyan focus-visible:border-neon-cyan/60 transition-colors"
        >
          ◀
        </button>
        <button
          type="button"
          onClick={() =>
            scrollerRef.current?.scrollBy({
              left: CAROUSEL_CARD_WIDTH + CAROUSEL_GAP,
              behavior: "smooth",
            })
          }
          aria-label="Scroll cartridges right"
          className="hidden sm:inline-flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center font-pixel text-[12px] tracking-widest border border-ink-ghost bg-bg-deep/95 backdrop-blur-sm text-ink-mute hover:text-glow-cyan hover:border-neon-cyan/60 focus-visible:text-glow-cyan focus-visible:border-neon-cyan/60 transition-colors"
        >
          ▶
        </button>

        <div
          ref={scrollerRef}
          className="overflow-x-auto overflow-y-visible -mx-2 px-2 pb-3 scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          <div className="flex gap-5 items-start">
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
                  className={`${cardClasses(p)} text-left shrink-0 touch-none cursor-pointer md:cursor-grab md:active:cursor-grabbing transition-opacity duration-200 ${
                    dimmed ? "opacity-30 pointer-events-none" : "opacity-100"
                  }`}
                  style={{
                    ...cardStyleFor(p),
                    width: CAROUSEL_CARD_WIDTH,
                    scrollSnapAlign: "start",
                  }}
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
        </div>
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

/* ─── Console — styled to look like an NES front-loader ─────────────── */

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
  // The slotted cartridge animation lands inside the cart slot, which is
  // offset to the right of the console's center in the NES layout. Anchor
  // useFromOffset to the slot itself so the spring feels like it's coming
  // from where the user dropped.
  const slotRef = useRef<HTMLDivElement>(null);
  const start = useFromOffset(slotRef, from);
  const { play } = useSound();

  // Easter egg: tap the red POWER LED four times in roughly two seconds
  // and the accent color cycles (same payoff as the keyboard Konami
  // code). Times are stored in a ref so re-renders don't reset progress.
  const tapsRef = useRef<number[]>([]);
  const [ledFlash, setLedFlash] = useState(0);
  function onLedTap() {
    const now = Date.now();
    tapsRef.current = [
      ...tapsRef.current.filter((t) => now - t < 2000),
      now,
    ];
    setLedFlash((n) => n + 1);
    play("pop");
    if (tapsRef.current.length >= 4) {
      tapsRef.current = [];
      cycleAccent();
      play("oneUp");
    }
  }

  return (
    <div
      className="relative mb-10 mx-auto"
      style={{ maxWidth: 480 }}
    >
      {/* Forgiving drop-zone halo around the whole console — the visible
          dashed border tells the user how big the actual drop target is.
          Sized to roughly match HIT_PADDING_{X,Y} in HardCabinet. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -left-[180px] -right-[180px] -top-[140px] -bottom-[140px] transition-opacity duration-200 ${
          active && !inserting ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className={`absolute inset-0 transition-colors duration-200 ${
            highlight
              ? "border-2 border-dashed border-neon-magenta/70 shadow-[0_0_30px_rgba(255,43,214,0.25)]"
              : "border-2 border-dashed border-ink-ghost"
          }`}
          style={{ borderRadius: 12 }}
        />
      </div>

      {/* NES BODY — two-tone gray plastic with a black top stripe */}
      <div
        ref={innerRef}
        role="region"
        aria-label="Console: drop a cartridge here to load a case study"
        className="relative transition-shadow duration-200"
        style={{
          background:
            "linear-gradient(180deg, #d6d6db 0%, #b6b6bd 55%, #9d9da6 100%)",
          border: "2px solid #1c1c24",
          borderRadius: "5px 5px 7px 7px",
          boxShadow: highlight
            ? [
                "inset 0 1px 0 rgba(255,255,255,0.55)",
                "inset 0 -2px 0 rgba(0,0,0,0.3)",
                "0 6px 0 -2px rgba(0,0,0,0.6)",
                "0 0 0 2px rgba(255,43,214,0.55)",
                "0 0 28px rgba(255,43,214,0.4)",
              ].join(", ")
            : [
                "inset 0 1px 0 rgba(255,255,255,0.55)",
                "inset 0 -2px 0 rgba(0,0,0,0.3)",
                "0 6px 0 -2px rgba(0,0,0,0.6)",
              ].join(", "),
        }}
      >
        {/* Top trim — black bar with the "ENTERTAINMENT SYSTEM" name plate */}
        <div
          className="flex items-center justify-between px-3 py-1.5"
          style={{
            background: "linear-gradient(180deg, #1a1a22 0%, #0a0a12 100%)",
            borderBottom: "1px solid #000",
            boxShadow: "inset 0 -1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <span
            className="font-pixel text-[8px] tracking-[0.32em]"
            style={{ color: "#e8e8f0" }}
          >
            ★ MTW ★
          </span>
          <span
            className="font-pixel text-[7px] tracking-[0.28em]"
            style={{ color: "#a8a8b4" }}
          >
            ENTERTAINMENT SYSTEM
          </span>
          <span
            className="font-mono text-[8px] uppercase tracking-widest tabular-nums"
            style={{ color: "#a8a8b4" }}
          >
            {inserting
              ? "LOADING…"
              : highlight
                ? "READY"
                : active
                  ? "AWAITING"
                  : "IDLE"}
          </span>
        </div>

        {/* Body row — power LED + buttons on the left, cartridge slot on the right */}
        <div className="flex items-stretch gap-3 p-3">
          {/* LEFT control column */}
          <div className="flex flex-col gap-2 shrink-0">
            {/* POWER LED + label. The LED is a button so the rhythm-tap
                Easter egg can land — four taps inside ~2s cycles the
                accent color. Otherwise it just looks like the NES LED. */}
            <button
              type="button"
              onClick={onLedTap}
              aria-label="Power indicator"
              title="Power"
              className="flex items-center gap-1.5 select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan rounded-sm"
              style={{
                // Tiny tactile press feedback without re-defining the
                // whole button look — we only want the LED to feel live.
                transform: ledFlash ? undefined : undefined,
              }}
            >
              <span
                key={ledFlash}
                className="block w-2.5 h-2.5 rounded-full motion-safe:animate-[ping_0.45s_ease-out]"
                style={{
                  background: active || inserting ? "#ff2b2b" : "#5a1010",
                  boxShadow:
                    active || inserting
                      ? "0 0 8px rgba(255,43,43,0.85), inset 0 0 2px rgba(255,255,255,0.55)"
                      : "inset 0 0 2px rgba(0,0,0,0.6)",
                  transition: "all 0.2s",
                  // The animate-ping above is only triggered while the
                  // span is freshly keyed — once mounted it sits idle.
                  // The `key` change on each tap restarts the animation.
                  animationIterationCount: 1,
                }}
                aria-hidden="true"
              />
              <span
                className="font-pixel text-[7px] tracking-widest"
                style={{ color: "#1a1a22" }}
              >
                POWER
              </span>
            </button>

            {/* POWER slider button */}
            <ConsoleButton label="POWER" variant="slider" />
            {/* RESET push button */}
            <ConsoleButton label="RESET" variant="push" />
          </div>

          {/* RIGHT — cartridge slot. This IS the visual drop target */}
          <div
            ref={slotRef}
            className="flex-1 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, #050508 0%, #0a0a12 100%)",
              border: "2px solid #15151c",
              borderRadius: 2,
              boxShadow: highlight
                ? "inset 0 0 26px rgba(255,43,214,0.5), inset 0 0 0 1px rgba(255,43,214,0.75)"
                : "inset 0 0 22px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.04)",
              transition: "box-shadow 0.2s ease-out",
              minHeight: 88,
            }}
          >
            {/* Slot lip — the hinged flap edge at the top */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{
                height: 8,
                background:
                  "linear-gradient(180deg, #2a2a32 0%, #14141c 100%)",
                borderBottom: "1px solid #050508",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 0 rgba(0,0,0,0.6)",
              }}
              aria-hidden="true"
            />

            {/* idle prompt */}
            {!inserting && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span
                  className={`font-pixel text-[10px] tracking-widest transition-colors ${
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
                    style={{
                      background: "rgba(255,43,214,0.9)",
                      mixBlendMode: "screen",
                    }}
                    initial={{ top: "-2%" }}
                    animate={{ top: "102%" }}
                    transition={{ delay: 0.5, duration: 0.5, ease: "linear" }}
                    aria-hidden="true"
                  />
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom trim — vents + model plate */}
        <div
          className="flex items-center justify-between gap-3 px-3 py-1.5"
          style={{
            background:
              "linear-gradient(180deg, #a4a4ac 0%, #82828b 100%)",
            borderTop: "1px solid #1c1c24",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)",
          }}
        >
          <span
            className="font-pixel text-[7px] tracking-widest"
            style={{ color: "#1a1a22" }}
          >
            MODEL MTW-1
          </span>
          <div className="flex gap-[3px]" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className="block"
                style={{
                  width: 6,
                  height: 4,
                  background: "#0d0d14",
                  boxShadow:
                    "inset 0 1px 0 rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
          <span
            className="font-pixel text-[7px] tracking-widest"
            style={{ color: "#1a1a22" }}
          >
            v0.1
          </span>
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

/** Small decorative button used for POWER and RESET on the NES face. */
function ConsoleButton({
  label,
  variant,
}: {
  label: string;
  variant: "slider" | "push";
}) {
  return (
    <div className="flex flex-col gap-0.5" aria-hidden="true">
      <span
        className="font-pixel text-[6px] tracking-widest"
        style={{ color: "#1a1a22" }}
      >
        {label}
      </span>
      <div
        className="relative"
        style={{
          width: 52,
          height: 14,
          background: "linear-gradient(180deg, #4a4a52 0%, #1c1c24 100%)",
          border: "1px solid #0a0a10",
          borderRadius: 2,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.25)",
        }}
      >
        {variant === "slider" ? (
          <span
            className="absolute"
            style={{
              top: 1,
              bottom: 1,
              left: 1,
              width: 22,
              background: "linear-gradient(180deg, #9a9aa4 0%, #5a5a62 100%)",
              border: "1px solid #1a1a22",
              borderRadius: 1,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.35)",
            }}
          />
        ) : (
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block"
            style={{
              width: 14,
              height: 6,
              background: "#a01818",
              border: "1px solid #050508",
              borderRadius: 1,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.25), 0 1px 0 rgba(0,0,0,0.5)",
            }}
          />
        )}
      </div>
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
