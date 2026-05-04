/**
 * Tiny wrapper around navigator.vibrate that adds the prefers-reduced-
 * motion guard and silently no-ops on devices without the API. Each
 * named pattern mirrors an arcade moment so taps feel tactile on phones
 * without being noisy.
 */

type Pattern = "tap" | "select" | "kerchunk" | "save" | "error";

const PATTERNS: Record<Pattern, number | number[]> = {
  // Quick blip — used for hover/tap-style confirmations.
  tap: 8,
  // Two-stage chirp for path picks and cartridge launches.
  select: [12, 28, 18],
  // Heavy thunk + power-up rumble for cartridge insert.
  kerchunk: [22, 60, 16, 30, 22],
  // Success three-note for guestbook submit.
  save: [12, 40, 12, 40, 18],
  // Buzz for invalid action.
  error: [40, 60, 40],
};

export function haptic(pattern: Pattern) {
  if (typeof window === "undefined") return;
  if (typeof navigator === "undefined") return;
  // Respect the OS-level "reduce motion" preference — subtle vibration
  // is still motion to a vestibular-disorder user.
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
      return;
  } catch {
    /* ignore */
  }
  const nav = navigator as Navigator & {
    vibrate?: (p: number | number[]) => boolean;
  };
  if (typeof nav.vibrate !== "function") return;
  try {
    nav.vibrate(PATTERNS[pattern]);
  } catch {
    /* ignore */
  }
}
