"use client";

import { useMode } from "./ModeProvider";
import { useSound } from "./SoundProvider";

type Props = { variant?: "floating" | "inline" };

/**
 * Sound on/off toggle.
 *
 * - `floating` (default): a fixed pill in the layout, top-right of the
 *   viewport. Hidden on mobile (the burger menu is there); the inline
 *   variant is exposed inside the sidebar for mobile users.
 * - `inline`: a regular button you can drop inside any container (used
 *   inside the sidebar so the toggle is reachable on mobile too).
 */
export default function SoundToggle({ variant = "floating" }: Props) {
  const { enabled, toggle } = useSound();
  const { mode } = useMode();
  // Sound is an arcade flourish — basic mode has no audio, so hide the chip.
  if (mode === "basic") return null;

  const baseChip =
    "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 font-pixel text-[10px] tracking-widest uppercase border bg-bg-deep/95 backdrop-blur-sm transition-all";
  const stateChip = enabled
    ? "border-neon-lime/70 text-glow-lime shadow-neon-lime"
    : "border-ink-ghost text-ink-mute hover:text-ink hover:border-neon-cyan/60";

  const positional =
    variant === "floating"
      ? "hidden md:inline-flex fixed top-[max(0.75rem,env(safe-area-inset-top))] right-3 z-50"
      : "";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute arcade sound effects" : "Enable arcade sound effects"}
      title={`${enabled ? "Sound on" : "Sound off"} (press M to toggle)`}
      className={`${positional} ${baseChip} ${stateChip}`}
    >
      <span aria-hidden="true" className="text-[14px] md:text-[11px] leading-none">
        {enabled ? "♪" : "·"}
      </span>
      <span>{enabled ? "SOUND ON" : "SOUND OFF"}</span>
      <span className="sr-only" aria-live="polite">
        {enabled ? "Sound on" : "Sound off"}. Press M to toggle.
      </span>
    </button>
  );
}
