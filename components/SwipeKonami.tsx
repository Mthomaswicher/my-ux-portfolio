"use client";

import { useEffect, useRef } from "react";
import { cycleAccent } from "@/lib/accentEgg";
import { useSound } from "./SoundProvider";

/**
 * Mobile equivalent of the keyboard Konami code. Swipe up · up · down ·
 * down · left · right · left · right anywhere on the page, then tap
 * twice — the accent color cycles and the +1UP toast pops. Listens
 * passively to pointer events; never preventDefault, so normal scroll
 * and taps keep working.
 *
 * Heuristics (deliberately strict so day-to-day touches don't trigger
 * the sequence by accident):
 *   - Touch pointers only.
 *   - A "swipe" requires ≥40px of travel inside 600ms with one axis
 *     at least 1.4× the other.
 *   - A "tap" is <10px of travel inside 300ms.
 *   - The 8-direction sequence has to land in order with no off-pattern
 *     swipes in between (mistakes reset progress). Off-pattern *taps*
 *     are ignored unless the swipe sequence is already complete and
 *     we're waiting for the two confirmation taps.
 *   - The whole thing has to complete within ~10s of the first swipe.
 */

type Dir = "U" | "D" | "L" | "R";
const SEQ: Dir[] = ["U", "U", "D", "D", "L", "R", "L", "R"];

const MIN_SWIPE = 40;
const MAX_SWIPE_MS = 600;
const MAX_TAP_PX = 10;
const MAX_TAP_MS = 300;
const SEQ_TIMEOUT_MS = 10_000;
const TAP_RESET_MS = 900;

export default function SwipeKonami() {
  const { play } = useSound();

  useEffect(() => {
    const start = { x: 0, y: 0, t: 0, valid: false };
    let hits: Dir[] = [];
    let seqStartedAt = 0;
    let pendingTaps = 0;
    let tapResetTimer: number | undefined;
    let seqResetTimer: number | undefined;

    function clearProgress() {
      hits = [];
      pendingTaps = 0;
      seqStartedAt = 0;
      window.clearTimeout(seqResetTimer);
      window.clearTimeout(tapResetTimer);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType !== "touch") return;
      start.x = e.clientX;
      start.y = e.clientY;
      start.t = performance.now();
      start.valid = true;
    }

    function onUp(e: PointerEvent) {
      if (e.pointerType !== "touch" || !start.valid) return;
      start.valid = false;
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      const dist = Math.hypot(dx, dy);
      const dt = performance.now() - start.t;

      // Tap path
      if (dist < MAX_TAP_PX && dt < MAX_TAP_MS) {
        if (hits.length < SEQ.length) return; // taps only count once swipes are done
        pendingTaps += 1;
        window.clearTimeout(tapResetTimer);
        tapResetTimer = window.setTimeout(() => {
          pendingTaps = 0;
        }, TAP_RESET_MS);
        if (pendingTaps >= 2) {
          cycleAccent();
          play("oneUp");
          clearProgress();
        }
        return;
      }

      // Swipe path
      if (dist < MIN_SWIPE || dt > MAX_SWIPE_MS) return;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      // Require a clear dominant axis so a diagonal flick doesn't count
      const horizontal = ax > ay * 1.4;
      const vertical = ay > ax * 1.4;
      if (!horizontal && !vertical) return;
      const dir: Dir = horizontal ? (dx > 0 ? "R" : "L") : dy > 0 ? "D" : "U";

      const expected = SEQ[hits.length];
      if (dir !== expected) {
        // First swipe of a fresh attempt? Re-seed from this swipe.
        if (dir === SEQ[0]) {
          hits = [dir];
          seqStartedAt = performance.now();
        } else {
          clearProgress();
        }
        return;
      }

      hits.push(dir);
      if (hits.length === 1) seqStartedAt = performance.now();
      play("pop");

      // Cap the whole sequence to 10s so dropped/abandoned attempts don't
      // sit forever waiting for the final flick.
      window.clearTimeout(seqResetTimer);
      seqResetTimer = window.setTimeout(() => {
        clearProgress();
      }, SEQ_TIMEOUT_MS - (performance.now() - seqStartedAt));
    }

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.clearTimeout(seqResetTimer);
      window.clearTimeout(tapResetTimer);
    };
  }, [play]);

  return null;
}
