"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PathChooser from "./PathChooser";
import { useMode } from "./ModeProvider";
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
  const { hasChosen, reset } = useMode();
  const router = useRouter();
  const searchParams = useSearchParams();
  const restart = searchParams?.get("restart") === "1";

  // Returning visitors who already picked a path skip the picker entirely —
  // the boot screen is meant to be a first-time gateway, not a paywall.
  // Exception: when the URL carries ?restart=1 we drop the saved choice and
  // let the picker run again.
  useEffect(() => {
    if (restart) {
      reset();
      return;
    }
    if (hasChosen) router.replace("/home");
  }, [hasChosen, restart, reset, router]);

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
          className={`transition-opacity duration-700 mb-10 ${
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
            className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-magenta"
            aria-hidden="true"
          >
            ░ A PORTFOLIO BY MATTHEW THOMAS-WICHER ░
          </div>
          <div className="sr-only">A portfolio by Matthew Thomas-Wicher.</div>
        </div>

        <PathChooser active={done} destination="/home" />
      </div>
    </main>
  );
}
