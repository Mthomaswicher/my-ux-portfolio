"use client";

import { useSound } from "./SoundProvider";

export default function SoundToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute arcade sound effects" : "Enable arcade sound effects"}
      className={`group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest hover:text-glow-cyan focus-visible:text-glow-cyan transition-colors ${
        compact ? "text-ink-mute" : "text-ink-dim"
      }`}
      title={`${enabled ? "Sound on" : "Sound off"} — press M to toggle`}
    >
      <span aria-hidden="true" className="font-pixel text-[10px]">
        {enabled ? "♪" : "·"}
      </span>
      <span>SOUND</span>
      <span
        className={`font-pixel text-[10px] ${enabled ? "text-glow-lime" : "text-ink-mute"}`}
        aria-hidden="true"
      >
        {enabled ? "ON" : "OFF"}
      </span>
      <span className="sr-only">{enabled ? "currently on" : "currently off"}, press M to toggle</span>
    </button>
  );
}
