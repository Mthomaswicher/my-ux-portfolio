"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

export default function Cabinet() {
  const [mode, setMode] = useState<Difficulty>("easy");
  const [hydrated, setHydrated] = useState(false);
  // Coarse pointer (touch) or narrow viewport (mobile) forces Easy mode and
  // hides the difficulty toggle. Hard mode's carousel needs space and a
  // precise pointer to feel right.
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

/* ─── Hard mode — game cabinet carousel ──────────────────────────────────
   The interactive arcade-cabinet view: a CRT marquee at the top showing
   whichever cartridge is currently centered in the rack below. Spin the
   rack with the side carts, the ◀/▶ keys, or the chevron buttons. Press
   the START button (or click the centered cart) to load the case study.
─────────────────────────────────────────────────────────────────────── */

function HardCabinet() {
  const router = useRouter();
  const { play } = useSound();
  const [activeIndex, setActiveIndex] = useState(0);
  const [inserting, setInserting] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeProject = projects[activeIndex];
  const accent = ACCENT_HEX[activeProject.accent] ?? ACCENT_HEX.cyan;

  const focus = useCallback(
    (i: number) => {
      if (inserting) return;
      const next = ((i % projects.length) + projects.length) % projects.length;
      if (next === activeIndex) return;
      setActiveIndex(next);
      play("pop");
    },
    [activeIndex, inserting, play],
  );

  const launch = useCallback(
    (p: Project) => {
      if (inserting) return;
      if (p.external) {
        window.open(p.href, "_blank", "noopener,noreferrer");
        return;
      }
      setInserting(p);
      play("cartridge");
      window.setTimeout(() => play("power"), 320);
      window.setTimeout(() => router.push(p.href), 1500);
    },
    [inserting, play, router],
  );

  // ←/→ to spin the rack. Only fires when focus is somewhere in this
  // section so keyboard users on other parts of the page aren't hijacked.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const root = containerRef.current;
      if (!root) return;
      const active = document.activeElement;
      if (!root.contains(active)) return;
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
  }, [activeIndex, focus]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="cartridges-heading"
      aria-roledescription="carousel"
    >
      <div className="flex items-baseline justify-between gap-3 mb-6">
        <h2
          id="cartridges-heading"
          className="font-pixel text-[11px] sm:text-[12px] tracking-widest text-glow-magenta"
        >
          <span aria-hidden="true">▌</span>NOW SHOWING
        </h2>
        <span className="font-mono text-[10px] sm:text-[11px] text-ink-mute tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      <CabinetDisplay
        project={activeProject}
        accent={accent}
        inserting={!!inserting}
        onLaunch={() => launch(activeProject)}
      />

      <CartridgeRack
        projects={projects}
        activeIndex={activeIndex}
        insertingNo={inserting?.no ?? null}
        onFocus={focus}
        onLaunch={launch}
      />

      <div className="mt-5 flex items-center justify-center gap-3">
        <SpinButton
          direction="prev"
          onClick={() => focus(activeIndex - 1)}
          disabled={!!inserting}
        />
        <p
          className="font-mono text-[10px] sm:text-[11px] text-ink-mute uppercase tracking-widest"
          id="cabinet-help"
        >
          ◀ / ▶ to spin · Click the centered cart to launch
        </p>
        <SpinButton
          direction="next"
          onClick={() => focus(activeIndex + 1)}
          disabled={!!inserting}
        />
      </div>
    </section>
  );
}

/* ─── Cabinet display (CRT marquee) ─────────────────────────────────── */

function CabinetDisplay({
  project,
  accent,
  inserting,
  onLaunch,
}: {
  project: Project;
  accent: string;
  inserting: boolean;
  onLaunch: () => void;
}) {
  const hero = project.hero ?? project.screens?.[0];
  const isExternal = !!project.external;

  return (
    <div className="relative mb-8 mx-auto max-w-3xl">
      {/* Side speakers — purely decorative, hidden on smaller md screens to
          avoid crowding. They visually anchor the cabinet metaphor. */}
      <div
        className="hidden lg:block absolute top-0 bottom-0 -left-10 w-8 cartridge"
        aria-hidden="true"
      >
        <SpeakerGrille />
      </div>
      <div
        className="hidden lg:block absolute top-0 bottom-0 -right-10 w-8 cartridge"
        aria-hidden="true"
      >
        <SpeakerGrille />
      </div>

      <div
        className="relative cartridge p-3 sm:p-4"
        style={{
          borderRadius: "12px 12px 4px 4px",
        }}
      >
        {/* Marquee strip: power LED + status */}
        <div
          className="flex items-center justify-between mb-3 px-2 py-1.5 bg-bg-void border border-ink-ghost"
          style={{ boxShadow: `inset 0 0 12px ${accent}22` }}
        >
          <div className="flex items-center gap-2">
            <span
              className={`inline-block w-2 h-2 rounded-full ${
                inserting
                  ? "bg-neon-lime shadow-neon-lime animate-pulse"
                  : "bg-neon-magenta shadow-neon-magenta"
              }`}
              aria-hidden="true"
            />
            <span className="font-pixel text-[10px] tracking-widest text-glow-magenta">
              MTW · CABINET
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-widest text-ink-mute uppercase tabular-nums">
            {inserting ? "LOADING…" : "STANDBY"}
          </span>
        </div>

        {/* CRT screen */}
        <div
          className="relative aspect-[16/9] overflow-hidden bg-bg-void"
          style={{
            border: `1px solid ${accent}55`,
            boxShadow: `inset 0 0 32px ${accent}33, 0 0 0 1px ${accent}22, 0 0 24px ${accent}11`,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={project.no}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="absolute inset-0"
            >
              {hero && (
                <Image
                  src={hero}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-cover"
                  priority
                />
              )}
              {/* Inner edge glow tied to the project accent */}
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
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.32) 0px, rgba(0,0,0,0.32) 1px, transparent 1px, transparent 3px)",
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

          {/* Title overlay */}
          <div
            className="absolute left-4 right-4 bottom-4 pointer-events-none"
            style={{
              textShadow: `0 0 12px ${accent}aa, 0 2px 0 rgba(0,0,0,0.6)`,
            }}
          >
            <div
              className="font-pixel text-[10px] tracking-widest mb-1"
              style={{ color: accent }}
            >
              NO. {project.no} · {project.status}
            </div>
            <div
              className="font-display text-[28px] sm:text-[36px] md:text-[44px] leading-none"
              style={{ color: accent }}
            >
              {project.title}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-ink mt-1">
              {project.org}
            </div>
          </div>

          {/* Power-up flash on insert */}
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

        {/* Below screen: blurb + start button */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 md:gap-6 items-end px-1">
          <div className="space-y-2">
            <p className="font-mono text-[12.5px] sm:text-[13px] text-ink-dim leading-relaxed">
              {project.blurb}
            </p>
            <dl className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] text-ink-mute uppercase tracking-widest">
              <div className="flex items-baseline gap-1.5">
                <dt>Role</dt>
                <dd className="text-ink-dim">{project.role}</dd>
              </div>
              <div className="flex items-baseline gap-1.5">
                <dt>When</dt>
                <dd className="text-ink-dim">{project.timeframe}</dd>
              </div>
            </dl>
          </div>
          <button
            type="button"
            onClick={onLaunch}
            disabled={inserting}
            className="font-pixel text-[12px] tracking-widest px-5 py-3 border-2 transition-all whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              color: inserting ? "#a3e635" : accent,
              borderColor: inserting ? "#a3e63588" : `${accent}cc`,
              background: inserting
                ? "rgba(163, 230, 53, 0.08)"
                : `linear-gradient(180deg, ${accent}18 0%, transparent 100%)`,
              boxShadow: inserting
                ? "0 0 0 1px #a3e63566, 0 0 18px #a3e63555, inset 0 0 12px #a3e63522"
                : `0 0 0 1px ${accent}66, 0 0 14px ${accent}33, inset 0 0 8px ${accent}22`,
            }}
            aria-label={`${
              isExternal ? "Open" : "Launch"
            } ${project.title}${isExternal ? " in a new tab" : ""}`}
          >
            {inserting ? (
              "▶ LOADING…"
            ) : isExternal ? (
              <>
                <span aria-hidden="true">[ </span>VISIT ↗<span aria-hidden="true"> ]</span>
              </>
            ) : (
              <>
                <span aria-hidden="true">[ </span>▶ PRESS START<span aria-hidden="true"> ]</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom shadow / cabinet base */}
      <div
        className="mx-auto mt-1 h-2 w-[92%]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)",
          borderRadius: "0 0 8px 8px",
          filter: "blur(2px)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

function SpeakerGrille() {
  return (
    <div className="absolute inset-1 grid grid-rows-[repeat(20,1fr)] gap-[2px] p-1.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <span
          key={i}
          className="block w-full bg-ink-ghost"
          style={{ opacity: 0.6 }}
        />
      ))}
    </div>
  );
}

/* ─── Cartridge rack (3D carousel) ──────────────────────────────────── */

function CartridgeRack({
  projects,
  activeIndex,
  insertingNo,
  onFocus,
  onLaunch,
}: {
  projects: Project[];
  activeIndex: number;
  insertingNo: string | null;
  onFocus: (i: number) => void;
  onLaunch: (p: Project) => void;
}) {
  const RACK_HEIGHT = 150;

  return (
    <div
      role="group"
      aria-label="Available cartridges"
      className="relative w-full mx-auto select-none"
      style={{
        height: RACK_HEIGHT,
        perspective: 1100,
      }}
    >
      {/* Rack shelf: a dark backplate that the carts sit in */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-full max-w-[820px] h-[110px] border border-ink-ghost"
        style={{
          background:
            "linear-gradient(180deg, #0a0a14 0%, #06060c 70%, #04040a 100%)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -2px 0 rgba(0,0,0,0.6), inset 0 0 24px rgba(0,0,0,0.6)",
        }}
      />
      {/* Slot lip (top edge of rack) */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 mt-[-55px] w-full max-w-[820px] h-[3px]"
        style={{ background: "rgba(255,255,255,0.06)" }}
      />

      {projects.map((p, i) => {
        const offset = i - activeIndex;
        const ax = Math.abs(offset);
        const isActive = offset === 0;
        const beingInserted = insertingNo === p.no;

        // 3D-ish staging: side carts shrink, dim, rotate Y, and slide out.
        const x = offset * 200;
        const scale = 1 - ax * 0.16;
        const rotateY = offset * -22;
        const opacity = ax > 2 ? 0 : 1 - ax * 0.28;
        const z = -ax * 80; // depth — inactive carts pushed back a touch
        const zIndex = 100 - ax;

        return (
          <motion.button
            key={p.no}
            type="button"
            onClick={() => (isActive ? onLaunch(p) : onFocus(i))}
            animate={{
              x,
              y: beingInserted ? -120 : 0,
              scale: beingInserted ? 0.6 : scale,
              rotateY,
              opacity: beingInserted ? 0 : opacity,
              z,
            }}
            transition={{
              type: "spring",
              stiffness: 240,
              damping: 28,
              mass: 0.6,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            style={{
              transformStyle: "preserve-3d",
              zIndex,
              filter: !isActive
                ? "saturate(0.7) brightness(0.7)"
                : "saturate(1.1)",
              transition: "filter 0.4s",
            }}
            aria-label={`${p.title}${isActive ? " — press to launch" : " — bring to center"}`}
            aria-current={isActive ? "true" : undefined}
            tabIndex={ax <= 2 ? 0 : -1}
          >
            <div className="relative">
              <CartridgeSprite project={p} />
              {/* Soft underglow on the active cart */}
              {isActive && (
                <div
                  className="absolute -bottom-3 left-[8%] right-[8%] h-3 -z-10 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${
                      ACCENT_HEX[p.accent]
                    }aa, transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                  aria-hidden="true"
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

/* ─── ◀/▶ rack spin buttons ─────────────────────────────────────────── */

function SpinButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled: boolean;
}) {
  const isPrev = direction === "prev";
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={isPrev ? "Previous cartridge" : "Next cartridge"}
      className="font-pixel text-[11px] tracking-widest w-9 h-9 inline-flex items-center justify-center border border-ink-ghost text-ink-mute hover:text-glow-cyan hover:border-neon-cyan/60 focus-visible:text-glow-cyan focus-visible:border-neon-cyan/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      style={{ background: "rgba(10,10,20,0.6)" }}
    >
      {isPrev ? "◀" : "▶"}
    </button>
  );
}
