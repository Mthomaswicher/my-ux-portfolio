"use client";

import { useEffect, useState } from "react";
import ModeText from "./ModeText";
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

  // The visible label swaps via CSS, but ARIA state can't — and emitting
  // the real value on the server would disagree with a basic-mode client
  // and fail hydration, which drops the whole root to client rendering.
  // So describe the control generically until after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={() => {
        play(isScenic ? "select" : "insertCoin");
        toggle();
      }}
      aria-pressed={mounted ? !isScenic : undefined}
      aria-label={
        mounted
          ? isScenic
            ? "Switch to basic mode"
            : "Switch to scenic route"
          : "Switch display mode"
      }
      title={mounted ? (isScenic ? "Basic mode" : "Scenic route") : undefined}
      className="mode-toggle inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 border border-ink-ghost text-ink-mute hover:text-ink bg-bg-deep/95 backdrop-blur-sm transition-all font-pixel text-[10px] tracking-widest uppercase hover:border-neon-cyan/60"
    >
      <ModeText
        scenic={
          <>
            <span aria-hidden="true" className="text-[14px] md:text-[12px] leading-none">
              ▦
            </span>
            <span>BASIC</span>
          </>
        }
        basic={<span>Scenic route</span>}
      />
    </button>
  );
}
