"use client";

import { useEffect, useRef } from "react";

/**
 * Pointer-tracked lighting for a project tile.
 *
 * Why hover/focus rather than always-on: the tile already carries constant
 * motion from the screen reel, so a second ambient layer would compete with
 * it and with the cover art (Nielsen #8, aesthetic and minimalist design).
 * Gating it behind intent keeps the grid calm and makes the response feel
 * like a reward rather than noise.
 *
 * Cost is deliberately low. The listener only writes two CSS custom
 * properties and the compositor does the rest, so there is no per-tile
 * animation frame loop. It binds to the card rather than to this overlay,
 * because the overlay has to stay `pointer-events: none` to avoid stealing
 * clicks from the link wrapping it. Touch devices never activate it (see the
 * `hover: hover` guard in globals.css), which is why the reel stays the
 * primary "this is alive" signal.
 */
export default function TileSheen({ accentHex }: { accentHex: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip entirely where there is no real pointer, so touch devices pay
    // nothing and we never leave a stale highlight behind after a tap.
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const card = el.closest<HTMLElement>("[data-tile]") ?? el.parentElement;
    if (!card) return;

    let frame = 0;
    function onMove(e: PointerEvent) {
      if (frame) return; // coalesce to one write per frame
      frame = requestAnimationFrame(() => {
        frame = 0;
        const target = ref.current;
        if (!target) return;
        const r = target.getBoundingClientRect();
        if (!r.width || !r.height) return;
        target.style.setProperty(
          "--mx",
          `${((e.clientX - r.left) / r.width) * 100}%`,
        );
        target.style.setProperty(
          "--my",
          `${((e.clientY - r.top) / r.height) * 100}%`,
        );
      });
    }

    function onLeave() {
      const target = ref.current;
      if (!target) return;
      target.style.removeProperty("--mx");
      target.style.removeProperty("--my");
    }

    card.addEventListener("pointermove", onMove);
    card.addEventListener("pointerleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      card.removeEventListener("pointermove", onMove);
      card.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="tile-sheen absolute inset-0 z-[15] pointer-events-none"
      style={{ ["--tile-accent" as string]: accentHex }}
      aria-hidden="true"
    >
      {/* Follows the cursor. Reads as the cover catching the light. */}
      <span className="tile-sheen-spot" />
      {/* One diagonal pass across the art on enter. */}
      <span className="tile-sheen-sweep" />
      {/* Accent bleed from the edges, strongest nearest the pointer. */}
      <span className="tile-sheen-rim" />
      {/* Affordance, not decoration: says "this opens something". */}
      <svg
        className="tile-arrow"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </div>
  );
}
