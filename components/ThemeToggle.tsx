"use client";

import { useTheme } from "./ThemeProvider";

type Props = { variant?: "floating" | "inline" };

/**
 * Day/night toggle. Mirrors the SoundToggle layout: hidden on mobile in
 * the floating variant (so visitors see it inside the sidebar instead),
 * fixed top-right on desktop. Sits to the LEFT of the SoundToggle.
 */
export default function ThemeToggle({ variant = "floating" }: Props) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const baseChip =
    "inline-flex items-center justify-center gap-2 min-h-[44px] min-w-[44px] px-3 py-2 font-pixel text-[10px] tracking-widest uppercase border bg-bg-deep/95 backdrop-blur-sm transition-all";
  const stateChip = isDark
    ? "border-ink-ghost text-ink-mute hover:text-ink hover:border-neon-cyan/60"
    : "border-neon-amber/70 text-glow-amber shadow-neon-amber";

  // Bottom-right corner so it never overlaps the SoundToggle at top-right.
  const positional =
    variant === "floating"
      ? "hidden md:inline-flex fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-3 z-50"
      : "";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={!isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light theme" : "Dark theme"}
      className={`${positional} ${baseChip} ${stateChip}`}
    >
      <span aria-hidden="true" className="text-[14px] md:text-[12px] leading-none">
        {isDark ? "☼" : "☾"}
      </span>
      <span className="hidden md:inline">{isDark ? "LIGHT" : "DARK"}</span>
    </button>
  );
}
