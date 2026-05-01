"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function JourneyHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative mb-20 md:mb-28">
      <div
        className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
        aria-hidden="true"
      >
        ░ DEPARTURE · 2018 ░
      </div>

      <h1 className="font-display text-[clamp(3rem,12vw,5.5rem)] sm:text-[80px] md:text-[112px] leading-[0.95] text-glow-magenta mb-6">
        The road
        <br />
        so far.
        <span className="caret" aria-hidden="true" />
      </h1>

      <p className="font-mono text-[14.5px] sm:text-[15.5px] leading-relaxed text-ink-dim max-w-xl mb-8">
        Scroll down to walk it. Each checkpoint is a year, a city, a thing I shipped,
        and the lesson that came with it. Some of them have a soundtrack.
      </p>

      <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-md">
        <Stat label="Years" value="9+" accent="#22d3ee" />
        <Stat label="Cities" value="3" accent="#a3e635" />
        <Stat label="Stages" value="05" accent="#fbbf24" />
      </div>

      {/* Animated "begin" prompt that nudges the user to scroll */}
      <motion.div
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        className="mt-10 inline-flex items-center gap-2 font-pixel text-[10px] tracking-widest text-glow-cyan"
        aria-hidden="true"
      >
        <span>SCROLL TO BEGIN</span>
        <span>↓</span>
      </motion.div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
      className="cartridge p-3 text-center"
      style={{ boxShadow: `inset 0 0 0 1px ${accent}33` }}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
        {label}
      </div>
      <div
        className="font-display text-[36px] leading-none mt-1"
        style={{ color: accent, textShadow: `0 0 8px ${accent}88` }}
      >
        {value}
      </div>
    </div>
  );
}
