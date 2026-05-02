"use client";

import { useSound } from "./SoundProvider";

export type Difficulty = "easy" | "hard";

export default function DifficultySelector({
  mode,
  onChange,
}: {
  mode: Difficulty;
  onChange: (m: Difficulty) => void;
}) {
  const { play } = useSound();

  function pick(m: Difficulty) {
    if (m === mode) return;
    onChange(m);
    play(m === "hard" ? "power" : "select");
  }

  return (
    <div
      className="cartridge p-3 mb-8 flex items-center gap-3 sm:gap-4 flex-wrap"
      role="group"
      aria-labelledby="difficulty-label"
    >
      <span
        id="difficulty-label"
        className="font-pixel text-[10px] tracking-widest text-ink-mute"
      >
        DIFFICULTY:
      </span>

      <div className="flex gap-2" role="radiogroup" aria-label="Difficulty">
        {(["easy", "hard"] as const).map((m) => {
          const active = m === mode;
          return (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => pick(m)}
              onMouseEnter={() => !active && play("hover")}
              className={`px-4 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest border transition-shadow focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:outline-none ${
                active
                  ? m === "hard"
                    ? "border-transparent text-glow-magenta shadow-neon-magenta"
                    : "border-transparent text-glow-cyan shadow-neon-cyan"
                  : "border-ink-ghost text-ink-dim hover:text-ink"
              }`}
            >
              {m === "easy" ? "[ EASY ]" : "[ HARD ]"}
            </button>
          );
        })}
      </div>

      <span className="font-mono text-[11px] text-ink-dim leading-snug basis-full sm:basis-auto">
        {mode === "easy" ? (
          <>Tap a cartridge to play.</>
        ) : (
          <>
            <span className="md:hidden">Tap a cartridge to auto-load.</span>
            <span className="hidden md:inline">
              Spin the tray with ◀/▶, drag a cartridge into the screen, or hit START.
            </span>
          </>
        )}
      </span>
    </div>
  );
}
