"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSound } from "./SoundProvider";

const LINES = [
  "MTW BIOS v0.1 · © 2026 mthomaswicher",
  "MEM TEST .... 65,536K OK",
  "DETECTING DESIGN SYSTEMS .... [OK]",
  "MOUNTING /portfolio .... [OK]",
  "LOADING CARTRIDGES .... 2 FOUND",
  "NETWORK STATUS: ONLINE",
  "READY.",
];

export default function BootSequence() {
  // Start with one line shown so first paint isn't blank
  const [shown, setShown] = useState(1);
  const [done, setDone] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    if (shown >= LINES.length) {
      const t = window.setTimeout(() => setDone(true), 220);
      return () => window.clearTimeout(t);
    }
    // Each new boot line gets a tiny blip. feels like a real BIOS
    play("pop");
    const id = window.setTimeout(() => setShown((s) => s + 1), 240);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);

  return (
    <main id="main" className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12">
      <div className="w-full max-w-2xl">
        <div
          className="font-mono text-[13px] leading-relaxed text-ink-dim space-y-1 mb-10"
          role="log"
          aria-live="polite"
          aria-atomic="false"
        >
          {LINES.slice(0, shown).map((line, i) => (
            <div key={i} className="opacity-90">
              <span className="text-ink-mute" aria-hidden="true">
                {">"}{" "}
              </span>
              {line}
            </div>
          ))}
          {shown < LINES.length && (
            <div className="opacity-90" aria-hidden="true">
              <span className="text-ink-mute">{">"} </span>
              <span className="caret" />
            </div>
          )}
        </div>

        <div
          className={`transition-opacity duration-700 ${
            done ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={!done}
          // @ts-expect-error inert is valid HTML; TS lib types may lag
          inert={!done ? "" : undefined}
        >
          <h1
            className="font-pixel text-[20px] sm:text-[28px] leading-tight tracking-widest text-glow-cyan mb-2"
          >
            MTW.ARCADE
          </h1>
          <div
            className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-magenta mb-8"
            aria-hidden="true"
          >
            ░ A PORTFOLIO BY MATTHEW THOMAS-WICHER ░
          </div>
          <div className="sr-only">A portfolio by Matthew Thomas-Wicher.</div>

          <p className="font-mono text-[14px] text-ink-dim mb-8 max-w-lg leading-relaxed">
            You found my game cabinet. Sign the guestbook on your way in, or skip the intro
            and head straight to the cartridges.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/sign"
              aria-label="Enter and sign the guestbook"
              onClick={() => play("insertCoin")}
              onMouseEnter={() => play("hover")}
              className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow"
            >
              <span aria-hidden="true">[ </span>ENTER<span aria-hidden="true"> ]</span>
            </Link>
            <Link
              href="/home"
              aria-label="Skip intro and go directly to work"
              onClick={() => play("select")}
              onMouseEnter={() => play("hover")}
              className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-ink hover:text-glow-magenta hover:shadow-neon-magenta transition-shadow"
            >
              <span aria-hidden="true">[ </span>SKIP INTRO<span aria-hidden="true"> ]</span>
            </Link>
          </div>

          <div
            className="mt-12 font-mono text-[11px] uppercase tracking-widest text-ink-mute"
            aria-hidden="true"
          >
            <span className="animate-pulse">▶</span> INSERT COIN TO CONTINUE
          </div>
        </div>
      </div>
    </main>
  );
}
