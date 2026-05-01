"use client";

import { useSound } from "./SoundProvider";

/**
 * Mounted as a fixed pill in the layout so it's always visible — never
 * hidden inside the off-canvas sidebar on mobile. Sits at the top-right
 * of the viewport, offset on mobile so it clears the burger-menu button
 * (which lives at right-3 on mobile only).
 */
export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute arcade sound effects" : "Enable arcade sound effects"}
      title={`${enabled ? "Sound on" : "Sound off"} (press M to toggle)`}
      className={`fixed top-[max(0.75rem,env(safe-area-inset-top))] right-[5.5rem] md:right-3 z-50 inline-flex items-center gap-2 px-3 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest uppercase border bg-bg-deep/95 backdrop-blur-sm transition-all ${
        enabled
          ? "border-neon-lime/70 text-glow-lime shadow-neon-lime"
          : "border-ink-ghost text-ink-mute hover:text-ink hover:border-neon-cyan/60"
      }`}
    >
      <span aria-hidden="true" className="text-[11px] leading-none">
        {enabled ? "♪" : "·"}
      </span>
      <span>{enabled ? "SOUND ON" : "SOUND OFF"}</span>
      <span className="sr-only">press M to toggle</span>
    </button>
  );
}
