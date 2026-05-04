/**
 * Accent-cycle Easter egg. The Konami code, the NES power-LED rhythm
 * tap, and any future trigger all funnel through cycleAccent() so they
 * share a single counter and surface the same on-screen toast.
 *
 * Calling cycleAccent():
 *   - advances the internal accent index
 *   - sets the --accent CSS variable on <html>
 *   - dispatches a "mtw:accent-cycle" CustomEvent so AccentToast can
 *     render the "+1UP · ACCENT: …" message
 *   - returns the new accent so the caller can play a sound or react
 */

export const ACCENTS = [
  { name: "CYAN", value: "#22d3ee" },
  { name: "MAGENTA", value: "#ff2bd6" },
  { name: "LIME", value: "#a3e635" },
  { name: "AMBER", value: "#fbbf24" },
  { name: "ROSE", value: "#fb7185" },
] as const;

export type Accent = (typeof ACCENTS)[number];

export const ACCENT_CYCLE_EVENT = "mtw:accent-cycle";

let currentIdx = 0;

export function cycleAccent(): Accent {
  currentIdx = (currentIdx + 1) % ACCENTS.length;
  const next = ACCENTS[currentIdx];
  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty("--accent", next.value);
    window.dispatchEvent(
      new CustomEvent<Accent>(ACCENT_CYCLE_EVENT, { detail: next }),
    );
  }
  return next;
}
