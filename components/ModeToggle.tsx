"use client";

import { useMode } from "./ModeProvider";
import { useSound } from "./SoundProvider";

/**
 * Switches between scenic (full arcade) and basic (clean portfolio) without
 * making the user revisit the boot screen. Lives inside the sidebar.
 */
export default function ModeToggle() {
  const { mode, toggle } = useMode();
  const { play } = useSound();
  const isScenic = mode === "scenic";

  return (
    <button
      type="button"
      onClick={() => {
        play(isScenic ? "select" : "insertCoin");
        toggle();
      }}
      aria-pressed={!isScenic}
      aria-label={isScenic ? "Switch to basic mode" : "Switch to scenic route"}
      title={isScenic ? "Basic mode" : "Scenic route"}
      className="inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 font-pixel text-[10px] tracking-widest uppercase border border-ink-ghost text-ink-mute hover:text-ink hover:border-neon-cyan/60 bg-bg-deep/95 backdrop-blur-sm transition-all"
    >
      <span aria-hidden="true" className="text-[14px] md:text-[12px] leading-none">
        {isScenic ? "▦" : "◈"}
      </span>
      <span>{isScenic ? "BASIC" : "SCENIC"}</span>
    </button>
  );
}
