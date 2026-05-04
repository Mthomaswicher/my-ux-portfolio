"use client";

import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/projects";
import { BSIDE_NOTES } from "@/lib/bsideNotes";
import { useSound } from "./SoundProvider";
import { haptic } from "@/lib/haptic";

const LONG_PRESS_MS = 500;
const TAP_TOLERANCE_PX = 8;
const SUPPRESS_CLICK_MS = 1200;
const AUTO_DISMISS_MS = 4500;

/**
 * Mobile Easter egg: long-press a cartridge in the Easy-mode grid for
 * ~500ms and a B-SIDE NOTES tooltip pops with a developer-commentary
 * line about that case study (lib/bsideNotes.ts). Regular taps still
 * navigate as expected.
 *
 * How it stays out of the way:
 *   - Touch + pen pointers only — never fires on a desktop mouse.
 *   - Cancels on any pointer movement past 8px (so a scroll that
 *     starts on a cartridge isn't treated as a long press).
 *   - Suppresses the synthesized click that follows a successful long
 *     press for 1.2s (capture-phase) so the press doesn't accidentally
 *     navigate to the case study.
 *   - Auto-dismisses after ~4.5s, or when the user taps anywhere
 *     outside the tooltip.
 */
export default function LongPressNotes() {
  const [note, setNote] = useState<{ no: string; x: number; y: number } | null>(
    null,
  );
  const downRef = useRef<{ no: string; x: number; y: number } | null>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const dismissTimerRef = useRef<number | undefined>(undefined);
  const suppressClickUntilRef = useRef(0);
  const { play } = useSound();

  useEffect(() => {
    function findCart(
      target: EventTarget | null,
    ): { el: HTMLElement; no: string } | null {
      let node = target as HTMLElement | null;
      while (node) {
        const no = node.dataset?.cartNo;
        if (no) return { el: node, no };
        node = node.parentElement;
      }
      return null;
    }

    function clearPendingPress() {
      downRef.current = null;
      window.clearTimeout(timerRef.current);
    }

    function onDown(e: PointerEvent) {
      if (e.pointerType !== "touch" && e.pointerType !== "pen") return;
      const cart = findCart(e.target);
      if (!cart) return;
      downRef.current = { no: cart.no, x: e.clientX, y: e.clientY };
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const d = downRef.current;
        if (!d) return;
        setNote({ no: d.no, x: d.x, y: d.y });
        suppressClickUntilRef.current = performance.now() + SUPPRESS_CLICK_MS;
        play("pop");
        haptic("tap");
        downRef.current = null;
        window.clearTimeout(dismissTimerRef.current);
        dismissTimerRef.current = window.setTimeout(
          () => setNote(null),
          AUTO_DISMISS_MS,
        );
      }, LONG_PRESS_MS);
    }

    function onMove(e: PointerEvent) {
      const d = downRef.current;
      if (!d) return;
      if (
        Math.hypot(e.clientX - d.x, e.clientY - d.y) > TAP_TOLERANCE_PX
      ) {
        clearPendingPress();
      }
    }

    function onUp() {
      clearPendingPress();
    }

    function onClickCapture(e: MouseEvent) {
      if (performance.now() < suppressClickUntilRef.current) {
        e.stopPropagation();
        e.preventDefault();
      }
    }

    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", onUp, { passive: true });
    window.addEventListener("click", onClickCapture, true);

    return () => {
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.removeEventListener("click", onClickCapture, true);
      window.clearTimeout(timerRef.current);
      window.clearTimeout(dismissTimerRef.current);
    };
  }, [play]);

  // Dismiss on any tap outside the open tooltip. The 50ms delay before
  // attaching avoids the press-up that opened the tooltip from
  // immediately closing it.
  useEffect(() => {
    if (!note) return;
    function onAnyDown(e: PointerEvent) {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.("[data-bside-tip]")) return;
      setNote(null);
    }
    const id = window.setTimeout(() => {
      window.addEventListener("pointerdown", onAnyDown, { passive: true });
    }, 50);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pointerdown", onAnyDown);
    };
  }, [note]);

  if (!note) return null;
  const project = projects.find((p) => p.no === note.no);
  if (!project) return null;
  const text =
    BSIDE_NOTES[note.no] ?? "No notes for this one yet.";

  // Position near the press point but always on-screen.
  const W = 280;
  const H = 110;
  const left = Math.max(
    12,
    Math.min(note.x - W / 2, window.innerWidth - W - 12),
  );
  const top = Math.max(
    12,
    Math.min(note.y + 18, window.innerHeight - H - 12),
  );

  return (
    <div
      data-bside-tip
      role="tooltip"
      className="fixed z-[100] cartridge px-3 py-2 motion-safe:animate-flicker"
      style={{ left, top, width: W }}
      onClick={() => setNote(null)}
    >
      <div className="font-pixel text-[8px] tracking-widest text-glow-magenta mb-1">
        ▶ B-SIDE · {project.title}
      </div>
      <p className="font-mono text-[12px] text-ink leading-relaxed">{text}</p>
    </div>
  );
}
