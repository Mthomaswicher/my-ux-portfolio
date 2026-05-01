"use client";

import { useSound } from "./SoundProvider";

/**
 * Mounted as a fixed pill in the layout so it's always visible. On mobile it
 * sits at the top-left corner (the burger menu lives at top-right) and shows
 * an icon-only chip. On desktop it sits at the top-right with the full
 * "SOUND ON / SOUND OFF" label since the sidebar takes the left side.
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
      className={`fixed top-[max(0.75rem,env(safe-area-inset-top))] left-3 md:left-auto md:right-3 z-50 inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 font-pixel text-[10px] tracking-widest uppercase border bg-bg-deep/95 backdrop-blur-sm transition-all ${
        enabled
          ? "border-neon-lime/70 text-glow-lime shadow-neon-lime"
          : "border-ink-ghost text-ink-mute hover:text-ink hover:border-neon-cyan/60"
      }`}
    >
      <span aria-hidden="true" className="text-[16px] md:text-[11px] leading-none">
        {enabled ? "♪" : "·"}
      </span>
      {/* Full label only on desktop where there's space; mobile is icon-only */}
      <span className="hidden md:inline">{enabled ? "SOUND ON" : "SOUND OFF"}</span>
      <span className="sr-only">{enabled ? "Sound on" : "Sound off"}, press M to toggle</span>
    </button>
  );
}
