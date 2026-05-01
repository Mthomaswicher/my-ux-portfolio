"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useSound } from "./SoundProvider";

export default function JourneyArrival() {
  const reduce = useReducedMotion();
  const { play } = useSound();

  return (
    <section className="relative my-24 md:my-32 text-center">
      {/* End-of-trail glow */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 mx-auto h-[160px] w-full max-w-md pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,43,214,0.35), transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      <div
        className="relative font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
        aria-hidden="true"
      >
        ░ PRESENT DAY · 2026 ░
      </div>

      <h2 className="relative font-display text-[clamp(2.75rem,11vw,5rem)] sm:text-[72px] md:text-[96px] leading-[0.95] text-glow-cyan mb-5">
        You made it
        <br />
        to <span className="text-glow-magenta">today</span>.
      </h2>

      <p className="relative font-mono text-[14.5px] leading-relaxed text-ink-dim max-w-xl mx-auto mb-10">
        The journey isn&apos;t over — there&apos;s a current quest, and a next stage
        already loading. Pick where you want to go from here.
      </p>

      <div className="relative flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/home"
          onClick={() => play("select")}
          onMouseEnter={() => play("hover")}
          className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow"
        >
          <span aria-hidden="true">[ </span>SEE THE WORK<span aria-hidden="true"> ]</span>
        </Link>
        <Link
          href="/about"
          onClick={() => play("select")}
          onMouseEnter={() => play("hover")}
          className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-ink hover:text-glow-magenta hover:shadow-neon-magenta transition-shadow"
        >
          <span aria-hidden="true">[ </span>WHO IS PLAYER 1<span aria-hidden="true"> ]</span>
        </Link>
      </div>

      <motion.div
        aria-hidden="true"
        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="relative mt-10 font-pixel text-[10px] tracking-widest text-ink-mute"
      >
        ★ THANKS FOR PLAYING ALONG ★
      </motion.div>
    </section>
  );
}
