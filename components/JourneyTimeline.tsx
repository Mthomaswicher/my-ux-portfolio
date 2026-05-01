"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { CAREER_STAGES, BONUS_TRACK, type CareerStage } from "@/lib/career";
import { useSound } from "./SoundProvider";

const ACCENT_HEX = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
} as const;

const ACCENT_TEXT = {
  cyan: "text-glow-cyan",
  magenta: "text-glow-magenta",
  lime: "text-glow-lime",
  amber: "text-glow-amber",
  rose: "text-glow-magenta",
} as const;

const BONUS_KEY = "mtw.experience.1up";

export default function JourneyTimeline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { play } = useSound();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Background layers move slower than the foreground so they read as parallax.
  const bgGridY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgIconsY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);

  // SCORE counter ticks up as you cross stages (stage_index * 1000 + scroll bonus).
  const [activeIdx, setActiveIdx] = useState(0);
  const [bonusUnlocked, setBonusUnlocked] = useState(false);
  const [oneUpClicked, setOneUpClicked] = useState(false);
  const [showOneUpToast, setShowOneUpToast] = useState(false);

  // Restore unlock state from a previous visit.
  useEffect(() => {
    try {
      if (localStorage.getItem(BONUS_KEY) === "1") setBonusUnlocked(true);
    } catch {
      /* ignore */
    }
  }, []);

  function unlockBonus() {
    if (oneUpClicked) return;
    setOneUpClicked(true);
    setBonusUnlocked(true);
    setShowOneUpToast(true);
    play("oneUp");
    try {
      localStorage.setItem(BONUS_KEY, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setShowOneUpToast(false), 2400);
  }

  return (
    <div ref={wrapRef} className="relative">
      {/* ────── Parallax backdrop layers ────── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="absolute -inset-[10%]"
          style={{
            y: reduce ? 0 : bgGridY,
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ y: reduce ? 0 : bgIconsY }}
        >
          <FloatingGlyphs />
        </motion.div>
      </div>

      {/* ────── Sticky stage indicator (left rail) ────── */}
      <div className="hidden md:block absolute top-0 left-0 h-full w-[120px]">
        <div className="sticky top-1/2 -translate-y-1/2 px-2">
          <StageIndicator
            current={activeIdx}
            total={CAREER_STAGES.length}
            scoreBoost={bonusUnlocked ? 1 : 0}
          />
        </div>
      </div>

      {/* ────── The 1UP easter egg ────── */}
      <OneUpEgg
        onCollect={unlockBonus}
        collected={oneUpClicked || bonusUnlocked}
      />

      {/* ────── Animated trail line (the road you're traveling) ────── */}
      <Trail scrollYProgress={scrollYProgress} />

      {/* ────── Stages ────── */}
      <ol className="relative z-10 list-none p-0 m-0 md:pl-[120px] space-y-24 md:space-y-32 py-16">
        {CAREER_STAGES.map((s, i) => (
          <StageCardItem
            key={s.no}
            stage={s}
            index={i}
            onEnter={() => setActiveIdx(i)}
          />
        ))}

        {/* Bonus track, revealed when 1UP is collected */}
        <AnimatePresence>
          {bonusUnlocked && (
            <motion.li
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative"
            >
              <BonusTrack />
            </motion.li>
          )}
        </AnimatePresence>
      </ol>

      {/* ────── 1UP toast ────── */}
      <AnimatePresence>
        {showOneUpToast && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-glow-lime shadow-neon-lime"
          >
            ★ 1UP! BONUS LEVEL UNLOCKED
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────── */

/**
 * The road. A vertical line down the middle (desktop) / left edge (mobile)
 * that visually fills as the user scrolls, showing the literal "road traveled."
 */
function Trail({
  scrollYProgress,
}: {
  scrollYProgress: import("framer-motion").MotionValue<number>;
}) {
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div
      aria-hidden="true"
      className="absolute top-0 bottom-0 left-[150px] hidden md:block w-[2px] z-0"
    >
      {/* Faint full-length spine */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(34,211,238,0.18) 6%, rgba(255,43,214,0.18) 50%, rgba(163,230,53,0.18) 94%, transparent)",
        }}
      />
      {/* Bright traveled portion that grows with scroll */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{
          height: fillHeight,
          background:
            "linear-gradient(180deg, #22d3ee, #ff2bd6 50%, #a3e635)",
          boxShadow:
            "0 0 12px rgba(34,211,238,0.6), 0 0 20px rgba(255,43,214,0.4)",
        }}
      />
    </div>
  );
}

function StageCardItem({
  stage,
  index,
  onEnter,
}: {
  stage: CareerStage;
  index: number;
  onEnter: () => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { amount: 0.4, margin: "-25% 0px -25% 0px" });
  const reduce = useReducedMotion();

  // Mouse-tilt for depth on hover (desktop only)
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const isLeft = index % 2 === 0;
  const accentHex = ACCENT_HEX[stage.accent];
  const { play } = useSound();

  useEffect(() => {
    if (inView) {
      onEnter();
      play("pop");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const initial = reduce ? {} : { opacity: 0, x: isLeft ? -60 : 60, y: 30 };
  const animate = inView
    ? { opacity: 1, x: 0, y: 0 }
    : reduce
      ? { opacity: 1 }
      : initial;

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 6, y: px * 8 });
  }

  return (
    <li ref={ref} className="relative">
      <div
        className={`grid gap-6 md:gap-10 ${
          isLeft ? "md:grid-cols-[1fr_auto]" : "md:grid-cols-[auto_1fr]"
        } items-center`}
      >
        {/* On odd rows the marker comes first to flip the layout */}
        {!isLeft && <StageMarker stage={stage} className="hidden md:block" />}

        <motion.div
          initial={initial}
          animate={animate}
          transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
          className={isLeft ? "md:order-1" : "md:order-2"}
        >
          <motion.div
            onPointerMove={handleMove}
            onPointerLeave={() => setTilt({ x: 0, y: 0 })}
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
            className="relative cartridge p-6 md:p-7"
          >
            {/* Accent corner glyph */}
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 w-7 h-7 flex items-center justify-center font-pixel text-[10px] tracking-widest"
              style={{
                background: "#0a0a18",
                color: accentHex,
                boxShadow: `0 0 0 1px ${accentHex}, 0 0 12px ${accentHex}88`,
              }}
            >
              ★
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-3">
              <span
                className="font-pixel text-[10px] tracking-widest"
                style={{ color: accentHex }}
              >
                STAGE {stage.no} · {stage.headline}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
                {stage.period}
              </span>
            </div>

            <h3
              className={`font-display text-[34px] sm:text-[40px] leading-none ${ACCENT_TEXT[stage.accent]} mb-1`}
            >
              {stage.company}
            </h3>
            <div className="font-mono text-[12px] uppercase tracking-widest text-ink-dim mb-4">
              {stage.role} · {stage.location}
            </div>

            {/* WIN stat block */}
            <div
              className="flex items-baseline gap-3 mb-5 px-3 py-2 border"
              style={{
                borderColor: `${accentHex}55`,
                background: `linear-gradient(90deg, ${accentHex}1a, transparent)`,
              }}
            >
              <span className="font-pixel text-[9px] tracking-widest text-ink-mute">
                {stage.win.label.toUpperCase()}
              </span>
              <span
                className="font-display text-[28px] leading-none"
                style={{ color: accentHex }}
              >
                {stage.win.value}
              </span>
            </div>

            <ul className="space-y-2 list-none pl-0 mb-4">
              {stage.bullets.map((b, i) => (
                <li
                  key={i}
                  className="font-mono text-[13.5px] leading-relaxed text-ink-dim flex gap-3"
                >
                  <span style={{ color: accentHex }} className="mt-0.5 shrink-0">
                    ▸
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="font-mono text-[10.5px] uppercase tracking-widest text-ink-mute">
              {stage.tools}
            </div>
          </motion.div>
        </motion.div>

        {isLeft && <StageMarker stage={stage} className="hidden md:block md:order-2" />}
      </div>
    </li>
  );
}

/* Pixel marker that sits opposite the card on desktop. */
function StageMarker({ stage, className }: { stage: CareerStage; className?: string }) {
  const accentHex = ACCENT_HEX[stage.accent];
  return (
    <div className={`relative ${className ?? ""}`}>
      <div className="relative w-[120px] h-[120px]" aria-hidden="true">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(closest-side, ${accentHex}28, transparent 70%)`,
            filter: "blur(2px)",
          }}
        />
        {/* Pixel diamond */}
        <div
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] rotate-45"
          style={{
            background: "#0a0a18",
            boxShadow: `0 0 0 2px ${accentHex}, 0 0 20px ${accentHex}aa`,
          }}
        />
        <div
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 font-pixel text-[14px] tracking-widest"
          style={{ color: accentHex }}
        >
          {stage.no}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────── */

function StageIndicator({
  current,
  total,
  scoreBoost,
}: {
  current: number;
  total: number;
  scoreBoost: number;
}) {
  const score = (current + 1) * 1000 + scoreBoost * 5000;
  return (
    <div className="cartridge p-3 w-[100px] font-mono">
      <div className="font-pixel text-[8px] tracking-widest text-ink-mute mb-1">
        STAGE
      </div>
      <div className="font-display text-[28px] leading-none text-glow-cyan">
        {String(current + 1).padStart(2, "0")}
        <span className="text-ink-mute text-[18px]">/{String(total).padStart(2, "0")}</span>
      </div>
      <div className="dash-divider my-2" aria-hidden="true" />
      <div className="font-pixel text-[8px] tracking-widest text-ink-mute mb-1">
        SCORE
      </div>
      <div className="font-display text-[20px] leading-none text-glow-amber">
        {score.toLocaleString()}
      </div>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────── */

function FloatingGlyphs() {
  // Decorative pixel glyphs scattered behind the timeline.
  // Drift on parallax via the parent y transform.
  const glyphs = [
    { left: "8%", top: "6%", glyph: "✦", color: "#ff2bd6", size: 22, opacity: 0.3 },
    { left: "78%", top: "12%", glyph: "▲", color: "#22d3ee", size: 18, opacity: 0.28 },
    { left: "20%", top: "28%", glyph: "●", color: "#fbbf24", size: 14, opacity: 0.32 },
    { left: "88%", top: "32%", glyph: "✶", color: "#a3e635", size: 24, opacity: 0.26 },
    { left: "12%", top: "55%", glyph: "◆", color: "#22d3ee", size: 20, opacity: 0.3 },
    { left: "82%", top: "62%", glyph: "✦", color: "#ff2bd6", size: 18, opacity: 0.28 },
    { left: "32%", top: "78%", glyph: "▼", color: "#fbbf24", size: 16, opacity: 0.3 },
    { left: "70%", top: "85%", glyph: "●", color: "#a3e635", size: 14, opacity: 0.32 },
    { left: "5%", top: "92%", glyph: "✶", color: "#22d3ee", size: 22, opacity: 0.26 },
  ];
  return (
    <>
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="absolute font-pixel"
          style={{
            left: g.left,
            top: g.top,
            color: g.color,
            fontSize: g.size,
            opacity: g.opacity,
            textShadow: `0 0 8px ${g.color}`,
          }}
        >
          {g.glyph}
        </span>
      ))}
    </>
  );
}

/* ───────────────────────────────────────────────────────────────────── */

function OneUpEgg({
  onCollect,
  collected,
}: {
  onCollect: () => void;
  collected: boolean;
}) {
  // Drifts gently between the 2nd and 3rd stages, visible if you're paying
  // attention but not screaming for the click.
  const reduce = useReducedMotion();
  if (collected) return null;

  return (
    <button
      type="button"
      onClick={onCollect}
      aria-label="A hidden 1UP. Click to collect."
      className="absolute z-20 font-pixel text-[10px] tracking-widest text-glow-lime hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-neon-lime transition-transform"
      style={{
        right: "6%",
        top: "38%",
        padding: "6px 10px",
        background: "#0a0a18",
        boxShadow: "0 0 0 1px #a3e635, 0 0 14px rgba(163,230,53,0.55)",
      }}
    >
      <motion.span
        className="block"
        animate={
          reduce
            ? undefined
            : { y: [0, -6, 0], rotate: [0, -4, 0, 4, 0] }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        1UP
      </motion.span>
    </button>
  );
}

/* ───────────────────────────────────────────────────────────────────── */

function BonusTrack() {
  return (
    <div className="relative">
      <div className="text-center mb-8">
        <div className="font-pixel text-[10px] tracking-widest text-glow-lime mb-2 motion-safe:animate-pulse">
          ★ BONUS LEVEL UNLOCKED ★
        </div>
        <h2 className="font-display text-[44px] sm:text-[56px] leading-none text-glow-amber">
          Off the beaten path.
        </h2>
        <p className="font-mono text-[13px] text-ink-dim mt-3 max-w-xl mx-auto leading-relaxed">
          Education and the moments outside the day job, the side quests that
          shaped the playthrough.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* center spine */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]"
          style={{
            background:
              "linear-gradient(180deg, transparent, #a3e63555 10%, #a3e63555 90%, transparent)",
          }}
        />
        <ul className="list-none p-0 m-0 space-y-6">
          {BONUS_TRACK.map((b, i) => {
            const left = i % 2 === 0;
            return (
              <li
                key={`${b.year}-${b.title}`}
                className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-4`}
              >
                <div className={left ? "text-right" : "col-start-3 text-left"}>
                  <div className="font-pixel text-[9px] tracking-widest text-glow-amber mb-1">
                    {b.year}
                  </div>
                  <div className="font-display text-[22px] leading-none text-glow-cyan">
                    {b.title}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink-mute mt-1">
                    {b.org}
                  </div>
                  <p className="font-mono text-[12.5px] text-ink-dim leading-relaxed mt-2 max-w-xs ml-auto md:ml-auto">
                    {b.body}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="col-start-2 w-3 h-3 rotate-45 bg-bg-deep"
                  style={{
                    boxShadow: "0 0 0 2px #a3e635, 0 0 10px rgba(163,230,53,0.7)",
                  }}
                />
                {left ? <span aria-hidden="true" /> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
