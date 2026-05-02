"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import DifficultySelector, { type Difficulty } from "./DifficultySelector";
import ProjectCard from "./ProjectCard";
import CartridgeSprite from "./CartridgeSprite";
import { useSound } from "./SoundProvider";

const STORAGE_KEY = "mtw.difficulty";

const ACCENT_HEX: Record<Project["accent"], string> = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
};

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
  // hides the difficulty toggle. The cabinet/drag interactions need a
  // precise pointer and meaningful screen space.
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

  const effectiveMode = isMobile ? "easy" : mode;

  return (
    <>
      {!isMobile && (
        <DifficultySelector mode={mode} onChange={handleChange} />
      )}
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

/* ─── Hard mode — full arcade cabinet ──────────────────────────────────
   A single screen-fitting layout that looks like a real arcade machine:
     ┌────────────── MARQUEE ──────────────┐
     │  ░ ░  MTW · ARCADE  ░ ░             │
     ├──────────────── SCREEN ─────────────┤
     │  CRT showing now-playing project    │
     │  + drop target for cartridges       │
     ├──────────── CONTROL PANEL ──────────┤
     │  COIN  joystick  START  SELECT      │
     ├──────────────── TRAY ───────────────┤
     │  ◀  [cart][cart][CART][cart]  ▶    │
     └──────────────── BASE ───────────────┘
   The console + tray are visible at the same time so users can drag any
   cartridge straight up into the screen, no scrolling involved. The
   carousel translates to keep the active cart centered as more case
   studies are added.
─────────────────────────────────────────────────────────────────────── */

function HardCabinet() {
  const router = useRouter();
  const { play } = useSound();
  const [activeIndex, setActiveIndex] = useState(0);
  const [drag, setDrag] = useState<DragState>({ phase: "idle" });
  const [overConsole, setOverConsole] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  // pointerdown stages a "potential drag" so taps still fire click events.
  // Only after the pointer moves past a small threshold do we commit.
  const dragStartRef = useRef<{
    project: Project;
    pointerId: number;
    target: HTMLElement;
    x: number;
    y: number;
    rect: DOMRect;
  } | null>(null);
  const lastDragEndRef = useRef(0);

  const activeProject = projects[activeIndex];
  const accent = ACCENT_HEX[activeProject.accent] ?? ACCENT_HEX.cyan;

  // Inflate the hit zone around the screen so dropping is forgiving.
  const HIT_PADDING_X = 110;
  const HIT_PADDING_Y = 80;
  function pointInScreen(x: number, y: number) {
    const c = screenRef.current;
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
    if (p.external) return;
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
    if (drag.phase === "dragging") {
      e.preventDefault();
      setDrag({ ...drag, x: e.clientX, y: e.clientY });
      const isOver = pointInScreen(e.clientX, e.clientY);
      if (isOver !== overConsole) {
        setOverConsole(isOver);
        if (isOver) play("hover");
      }
      return;
    }

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
    const isOver = pointInScreen(e.clientX, e.clientY);
    setOverConsole(false);
    if (isOver) {
      triggerInsert(drag.project, { x: e.clientX, y: e.clientY });
    } else {
      setDrag({ phase: "idle" });
    }
  }

  const triggerInsert = useCallback(
    (p: Project, from: { x: number; y: number }) => {
      setDrag({ phase: "inserting", project: p, from });
      play("cartridge");
      window.setTimeout(() => play("power"), 320);
      window.setTimeout(() => router.push(p.href), 1500);
    },
    [play, router],
  );

  const focus = useCallback(
    (i: number) => {
      if (drag.phase !== "idle") return;
      const next = ((i % projects.length) + projects.length) % projects.length;
      if (next === activeIndex) return;
      setActiveIndex(next);
      play("pop");
    },
    [activeIndex, drag.phase, play],
  );

  function clickCart(p: Project, i: number, target: HTMLElement) {
    // If the user JUST finished a drag, suppress the synthesized click.
    if (Date.now() - lastDragEndRef.current < 250) return;
    if (drag.phase !== "idle") return;
    if (p.external) {
      window.open(p.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (i !== activeIndex) {
      focus(i);
      return;
    }
    // Active cart clicked: launch as if dropped on the screen
    const rect = target.getBoundingClientRect();
    triggerInsert(p, {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }

  // Keyboard nav: ←/→ spins the tray when focus is in the cabinet.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const root = containerRef.current;
      if (!root) return;
      if (!root.contains(document.activeElement)) return;
      if (drag.phase !== "idle") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focus(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focus(activeIndex + 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, drag.phase, focus]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="cartridges-heading"
      aria-roledescription="cabinet"
    >
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>NOW PLAYING
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <CabinetShell>
        <Marquee />
        <ScreenStage
          screenRef={screenRef}
          project={activeProject}
          accent={accent}
          dragging={drag.phase === "dragging"}
          highlight={overConsole}
          inserting={drag.phase === "inserting"}
          slottedProject={drag.phase === "inserting" ? drag.project : null}
          fromOffset={
            drag.phase === "inserting"
              ? offsetFromScreen(screenRef.current, drag.from)
              : null
          }
        />
        <ControlPanel
          accent={accent}
          inserting={drag.phase === "inserting"}
          onLaunch={() => {
            if (activeProject.external) {
              window.open(
                activeProject.href,
                "_blank",
                "noopener,noreferrer",
              );
              return;
            }
            const r = screenRef.current?.getBoundingClientRect();
            const from = r
              ? { x: r.left + r.width / 2, y: r.bottom + 60 }
              : { x: 0, y: 0 };
            if (drag.phase !== "idle") return;
            triggerInsert(activeProject, from);
          }}
          onPrev={() => focus(activeIndex - 1)}
          onNext={() => focus(activeIndex + 1)}
        />
        <Tray
          projects={projects}
          activeIndex={activeIndex}
          drag={drag}
          onPointerDown={startDrag}
          onPointerMove={move}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClick={clickCart}
        />
        <CabinetBase activeProject={activeProject} accent={accent} />
      </CabinetShell>

      <p className="mt-3 font-mono text-[10px] sm:text-[11px] text-ink-mute uppercase tracking-widest text-center">
        ◀ / ▶ to spin · Drag a cartridge into the screen, or hit START
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

function offsetFromScreen(
  el: HTMLDivElement | null,
  from: { x: number; y: number } | null,
) {
  if (!el || !from) return { x: 0, y: 200 };
  const r = el.getBoundingClientRect();
  return {
    x: from.x - (r.left + r.width / 2),
    y: from.y - (r.top + r.height / 2),
  };
}

/* ─── Cabinet shell ──────────────────────────────────────────────────── */

function CabinetShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto max-w-3xl"
      style={{
        // Dark plastic shell with inset highlights and a heavy bottom shadow
        // to suggest the cabinet is sitting on the ground.
        background: "linear-gradient(180deg, #16162a 0%, #08080f 100%)",
        border: "3px solid #1c1c2c",
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        boxShadow: [
          "inset 0 1px 0 rgba(255,255,255,0.06)",
          "inset 0 -2px 0 rgba(0,0,0,0.6)",
          "0 14px 0 -6px rgba(0,0,0,0.7)",
          "0 24px 60px rgba(0,0,0,0.45)",
        ].join(", "),
        padding: "14px 14px 12px",
      }}
    >
      {/* Side accent rails (pixel-art-y vertical stripes on the cabinet
          flanks). Only show on roomier viewports — they crowd the body
          on smaller desktops. */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-3 bottom-3 left-2 w-[4px]"
        style={{
          background:
            "repeating-linear-gradient(180deg, #ff2bd6 0 18px, #22d3ee 18px 36px)",
          opacity: 0.7,
          boxShadow: "0 0 8px rgba(255,43,214,0.45)",
        }}
      />
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-3 bottom-3 right-2 w-[4px]"
        style={{
          background:
            "repeating-linear-gradient(180deg, #22d3ee 0 18px, #ff2bd6 18px 36px)",
          opacity: 0.7,
          boxShadow: "0 0 8px rgba(34,211,238,0.45)",
        }}
      />
      {children}
    </div>
  );
}

/* ─── Marquee ────────────────────────────────────────────────────────── */

function Marquee() {
  return (
    <div
      className="relative mb-3 px-3 py-2 flex items-center justify-center"
      style={{
        background: "linear-gradient(180deg, #0c0c1a 0%, #050510 100%)",
        border: "1px solid rgba(255,43,214,0.4)",
        boxShadow:
          "inset 0 0 24px rgba(255,43,214,0.18), 0 0 14px rgba(255,43,214,0.18)",
      }}
    >
      {/* Tiny LED bulbs running along the top of the marquee */}
      <div
        aria-hidden="true"
        className="absolute -top-[3px] left-2 right-2 flex justify-between"
      >
        {Array.from({ length: 13 }).map((_, i) => (
          <span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{
              background: i % 2 === 0 ? "#ff2bd6" : "#22d3ee",
              boxShadow: `0 0 6px ${i % 2 === 0 ? "#ff2bd6" : "#22d3ee"}`,
            }}
          />
        ))}
      </div>
      <span
        className="font-pixel text-[12px] sm:text-[14px] tracking-[0.4em] text-glow-magenta"
        aria-hidden="true"
      >
        ★ MTW · ARCADE ★
      </span>
    </div>
  );
}

/* ─── Screen stage (CRT + drop zone + insert animation) ─────────────── */

const ScreenStage = forwardRef(function ScreenStage(
  {
    screenRef,
    project,
    accent,
    dragging,
    highlight,
    inserting,
    slottedProject,
    fromOffset,
  }: {
    screenRef: React.RefObject<HTMLDivElement>;
    project: Project;
    accent: string;
    dragging: boolean;
    highlight: boolean;
    inserting: boolean;
    slottedProject: Project | null;
    fromOffset: { x: number; y: number } | null;
  },
  _ref: React.Ref<HTMLDivElement>,
) {
  const hero = project.hero ?? project.screens?.[0];

  return (
    <div className="relative">
      {/* Forgiving drop-zone halo around the bezel — fades in while
          dragging so the user sees that the area around the screen counts
          as "over". Sized to match pointInScreen()'s padding. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -inset-x-24 -inset-y-12 transition-opacity duration-200 ${
          dragging ? "opacity-100" : "opacity-0"
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

      {/* Bezel — thick frame around the CRT */}
      <div
        ref={screenRef}
        className="relative mb-3"
        style={{
          background: "linear-gradient(180deg, #0a0a16 0%, #04040b 100%)",
          border: "8px solid #0d0d18",
          borderRadius: 8,
          boxShadow: [
            "inset 0 0 0 1px rgba(255,255,255,0.04)",
            "inset 0 0 24px rgba(0,0,0,0.7)",
            highlight
              ? `0 0 0 2px ${accent}, 0 0 28px ${accent}88`
              : `0 0 0 1px ${accent}33`,
          ].join(", "),
          transition: "box-shadow 0.2s ease-out",
        }}
        role="region"
        aria-label="Screen — drop a cartridge to load it"
      >
        {/* Status/mode strip above the picture */}
        <div className="flex items-center justify-between mb-2 px-1 font-mono text-[10px] uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                inserting
                  ? "bg-neon-lime shadow-neon-lime animate-pulse"
                  : dragging
                  ? "bg-neon-magenta shadow-neon-magenta animate-pulse"
                  : "bg-neon-cyan shadow-neon-cyan"
              }`}
              aria-hidden="true"
            />
            <span className="text-glow-magenta font-pixel text-[9px]">
              MTW · CONSOLE
            </span>
          </div>
          <span className="text-ink-mute tabular-nums">
            {inserting
              ? "LOADING…"
              : highlight
              ? "READY"
              : dragging
              ? "AWAITING"
              : "STANDBY"}
          </span>
        </div>

        {/* CRT picture */}
        <div
          className="relative overflow-hidden bg-bg-void"
          style={{
            aspectRatio: "16 / 9",
            border: `1px solid ${accent}55`,
            boxShadow: `inset 0 0 32px ${accent}33`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.no}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0"
            >
              {hero && (
                <Image
                  src={hero}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                  priority
                />
              )}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 60px ${accent}33, inset 0 -80px 80px ${accent}22`,
                }}
                aria-hidden="true"
              />
            </motion.div>
          </AnimatePresence>

          {/* Scanlines */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.34) 0px, rgba(0,0,0,0.34) 1px, transparent 1px, transparent 3px)",
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          {/* Drifting bright band */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] pointer-events-none"
            style={{
              background: `${accent}80`,
              mixBlendMode: "screen",
            }}
            animate={{ top: ["-2%", "102%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />

          {/* Title overlay (bottom-left of the picture) */}
          <div
            className="absolute left-3 right-3 bottom-3 pointer-events-none"
            style={{
              textShadow: `0 0 12px ${accent}aa, 0 2px 0 rgba(0,0,0,0.7)`,
            }}
          >
            <div
              className="font-pixel text-[9px] tracking-widest mb-1"
              style={{ color: accent }}
            >
              NO. {project.no} · {project.status}
            </div>
            <div
              className="font-display text-[26px] sm:text-[32px] md:text-[40px] leading-none"
              style={{ color: accent }}
            >
              {project.title}
            </div>
            <div className="font-mono text-[10.5px] uppercase tracking-widest text-ink mt-1">
              {project.org}
            </div>
          </div>

          {/* Drag-state overlay (centered prompt) */}
          {(dragging || (!hero && !inserting)) && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="px-3 py-1.5 font-pixel text-[11px] tracking-widest"
                style={{
                  color: highlight ? accent : "#a8a8c0",
                  background: "rgba(5,5,10,0.65)",
                  border: `1px solid ${highlight ? accent : "rgba(168,168,192,0.3)"}`,
                  textShadow: highlight
                    ? `0 0 10px ${accent}aa`
                    : undefined,
                }}
              >
                {highlight ? "▼ DROP TO LOAD" : "INSERT CARTRIDGE"}
              </div>
            </div>
          )}

          {/* Slotted cartridge animation when inserting */}
          <AnimatePresence>
            {inserting && slottedProject && fromOffset && (
              <motion.div
                key="slotted"
                className="absolute z-10"
                initial={{
                  x: fromOffset.x,
                  y: fromOffset.y,
                  scale: 1,
                  rotate: 0,
                  opacity: 0.95,
                }}
                animate={{
                  x: 0,
                  y: 0,
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
                  top: "50%",
                  marginLeft: -120,
                  marginTop: -40,
                }}
                aria-hidden="true"
              >
                <CartridgeSprite project={slottedProject} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Power-up flash + scanline jitter when inserting */}
          <AnimatePresence>
            {inserting && (
              <>
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: `${accent}55` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.85, 0, 0.55, 0] }}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  aria-hidden="true"
                />
                <motion.div
                  className="absolute left-0 right-0 h-[3px] pointer-events-none"
                  style={{ background: accent, mixBlendMode: "screen" }}
                  initial={{ top: "-2%" }}
                  animate={{ top: "102%" }}
                  transition={{ duration: 0.55, ease: "linear" }}
                  aria-hidden="true"
                />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});

/* ─── Control panel ─────────────────────────────────────────────────── */

function ControlPanel({
  accent,
  inserting,
  onLaunch,
  onPrev,
  onNext,
}: {
  accent: string;
  inserting: boolean;
  onLaunch: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div
      className="relative mb-3 px-3 py-2 flex items-center justify-between gap-2"
      style={{
        background: "linear-gradient(180deg, #2a2a3a 0%, #14141f 100%)",
        border: "1px solid #1c1c2c",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -2px 0 rgba(0,0,0,0.5)",
        // The slanted control panel feel — a slight 3D rake.
        transform: "perspective(800px) rotateX(2deg)",
      }}
    >
      {/* Coin slot (decorative) */}
      <div className="flex items-center gap-2">
        <div
          aria-hidden="true"
          className="relative w-6 h-9 border border-ink-ghost"
          style={{
            background: "linear-gradient(180deg, #14141f 0%, #050510 100%)",
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.7)",
          }}
        >
          <span
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block w-4 h-[2px]"
            style={{ background: "#0a0a14" }}
          />
        </div>
        <span className="font-pixel text-[8px] tracking-widest text-ink-mute uppercase">
          INSERT<br />COIN
        </span>
      </div>

      {/* Joystick + buttons cluster */}
      <div className="flex items-center gap-3">
        {/* Joystick stick */}
        <button
          type="button"
          onClick={onPrev}
          aria-label="Previous cartridge"
          className="relative w-8 h-8 rounded-full border border-ink-ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, #5a5a78, #1a1a26 70%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 0 rgba(0,0,0,0.55)",
          }}
          title="Previous cartridge"
        >
          <span className="sr-only">Previous</span>
          {/* Joystick "ball" indicator */}
          <span
            className="absolute -top-1 left-1/2 -translate-x-1/2 block w-1.5 h-1.5 rounded-full bg-neon-magenta"
            style={{ boxShadow: "0 0 5px rgba(255,43,214,0.7)" }}
            aria-hidden="true"
          />
        </button>

        {/* START button */}
        <button
          type="button"
          onClick={onLaunch}
          disabled={inserting}
          className="relative h-9 px-4 font-pixel text-[10px] tracking-widest border-2 disabled:opacity-60 disabled:cursor-not-allowed transition-transform active:translate-y-[1px]"
          style={{
            color: inserting ? "#a3e635" : "#0a0a14",
            background: inserting
              ? "rgba(163, 230, 53, 0.85)"
              : "linear-gradient(180deg, #ffe17a 0%, #ffae34 100%)",
            borderColor: inserting ? "#a3e63588" : "#3a2a08",
            borderRadius: 999,
            boxShadow: inserting
              ? "0 0 0 1px #a3e63566, 0 0 14px #a3e63566"
              : "inset 0 1px 0 rgba(255,255,255,0.5), 0 3px 0 rgba(58,42,8,0.9), 0 0 12px rgba(251,191,36,0.45)",
          }}
          aria-label="Launch active cartridge"
        >
          {inserting ? "LOADING…" : "▶ START"}
        </button>

        {/* SELECT (next) */}
        <button
          type="button"
          onClick={onNext}
          aria-label="Next cartridge"
          className="relative h-9 px-3 font-pixel text-[10px] tracking-widest border focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan transition-transform active:translate-y-[1px]"
          style={{
            color: "#e8e8f0",
            background: "linear-gradient(180deg, #25253a 0%, #0c0c18 100%)",
            borderColor: `${accent}88`,
            borderRadius: 6,
            boxShadow: `inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 0 rgba(0,0,0,0.5), 0 0 8px ${accent}44`,
          }}
        >
          SELECT ▶
        </button>
      </div>

      {/* Player indicator (decorative) */}
      <div className="flex items-center gap-2">
        <span className="font-pixel text-[8px] tracking-widest text-ink-mute">
          1P
        </span>
        <span
          className="block w-2 h-2 rounded-full bg-neon-cyan animate-pulse"
          style={{ boxShadow: "0 0 6px rgba(34,211,238,0.7)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

/* ─── Tray (horizontal carousel of draggable cartridges) ────────────── */

const CART_WIDTH = 240;
const CART_GAP = 16;

function Tray({
  projects,
  activeIndex,
  drag,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onClick,
}: {
  projects: Project[];
  activeIndex: number;
  drag: DragState;
  onPointerDown: (p: Project, e: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onPointerCancel: (e: React.PointerEvent) => void;
  onClick: (p: Project, i: number, target: HTMLElement) => void;
}) {
  // Translate the rail so the active cart stays centered in the tray
  // viewport. The rail itself is wider than the viewport once there are
  // more cartridges; this gives the same "spinning rack" feel without
  // the side carts shrinking or rotating into a 3D pile.
  const railOffset = useMemo(() => {
    const halfRail = ((projects.length - 1) * (CART_WIDTH + CART_GAP)) / 2;
    return halfRail - activeIndex * (CART_WIDTH + CART_GAP);
  }, [activeIndex, projects.length]);

  return (
    <div
      role="group"
      aria-label="Cartridge tray"
      className="relative mb-2"
      style={{
        background:
          "linear-gradient(180deg, #0a0a14 0%, #04040b 70%, #02020a 100%)",
        border: "1px solid #1c1c2c",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.6), inset 0 0 20px rgba(0,0,0,0.6)",
        padding: "14px 12px 18px",
      }}
    >
      {/* Slot lip — the dark line where the cartridges sit */}
      <div
        aria-hidden="true"
        className="absolute left-3 right-3 bottom-3 h-[3px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      <div
        className="relative overflow-hidden"
        style={{ height: 110 }}
      >
        {/* Soft fade on either side of the tray viewport so off-screen
            carts feel like they're disappearing into the cabinet. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-12 z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(2,2,8,0.95) 0%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-12 z-10"
          style={{
            background:
              "linear-gradient(270deg, rgba(2,2,8,0.95) 0%, transparent 100%)",
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/2 flex items-center"
          style={{ gap: CART_GAP, y: "-50%" }}
          animate={{ x: railOffset - CART_WIDTH / 2 }}
          transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.6 }}
        >
          {projects.map((p, i) => {
            const isActive = i === activeIndex;
            const isBeingDragged =
              drag.phase === "dragging" && drag.project.no === p.no;
            const isInserting =
              drag.phase === "inserting" && drag.project.no === p.no;
            const dimmed = isBeingDragged || isInserting;

            return (
              <button
                key={p.no}
                type="button"
                onPointerDown={(e) => onPointerDown(p, e)}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerCancel}
                onClick={(e) => onClick(p, i, e.currentTarget)}
                aria-label={`${p.title} ${
                  isActive ? "(now playing)" : "— bring to center"
                }`}
                aria-current={isActive ? "true" : undefined}
                tabIndex={isActive ? 0 : -1}
                className={`relative shrink-0 cursor-grab active:cursor-grabbing focus-visible:outline focus-visible:outline-2 focus-visible:outline-neon-cyan ${
                  dimmed ? "opacity-30 pointer-events-none" : ""
                }`}
                style={{
                  width: CART_WIDTH,
                  filter: isActive ? "saturate(1.15)" : "saturate(0.8) brightness(0.78)",
                  transition: "filter 0.4s",
                }}
              >
                <CartridgeSprite project={p} />
                {/* Active indicator: a glowing arrow above the cart */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 font-pixel text-[10px] text-glow-magenta tracking-widest"
                  >
                    ▼
                  </span>
                )}
                {/* Soft underglow for the active cart */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-[8%] right-[8%] h-2 -z-10 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${
                        ACCENT_HEX[p.accent]
                      }aa, transparent 70%)`,
                      filter: "blur(6px)",
                    }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

/* ─── Cabinet base (pixel detail strip) ─────────────────────────────── */

function CabinetBase({
  activeProject,
  accent,
}: {
  activeProject: Project;
  accent: string;
}) {
  return (
    <div
      className="flex items-center justify-between px-3 py-2 font-mono text-[9px] uppercase tracking-widest text-ink-mute"
      style={{
        background:
          "linear-gradient(180deg, #14141f 0%, #08080f 100%)",
        border: "1px solid #1c1c2c",
        borderTop: "none",
      }}
    >
      <span>● MTW-1 · v0.1</span>
      <span style={{ color: accent }}>
        ROM: {activeProject.no.padStart(2, "0")}
      </span>
      <span>1 PLAYER</span>
    </div>
  );
}
