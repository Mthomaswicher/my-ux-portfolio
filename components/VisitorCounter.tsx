"use client";

import { useEffect, useState } from "react";
import { tickVisitorCounter } from "@/lib/visitorCounter";

/**
 * Tiny fixed chip in the bottom-left corner that surfaces the
 * site-wide session count. One row per browser session, so the same
 * visitor in a new tab is counted again — that matches "different
 * session" in the spec.
 *
 * Renders nothing until Supabase responds, and renders nothing if
 * Supabase isn't configured or the site_sessions table doesn't exist.
 * Bottom-left is the only corner currently free of other UI (sound
 * toggle = top-right, theme toggle = bottom-right desktop, menu
 * button = top-right mobile, Konami toast = bottom on takeover only).
 */
export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    tickVisitorCounter().then((c) => {
      if (cancelled) return;
      if (typeof c === "number") setCount(c);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  return (
    <div
      className="fixed bottom-[max(0.5rem,env(safe-area-inset-bottom))] left-3 z-40 px-2 py-1 select-none pointer-events-none border border-ink-ghost/70 bg-bg-deep/85 backdrop-blur-sm font-pixel text-[8px] tracking-[0.18em] uppercase text-ink-mute"
      role="status"
      aria-label={`Total sessions: ${count.toLocaleString()}`}
    >
      <span aria-hidden="true" className="text-glow-cyan mr-1">
        ★
      </span>
      <span aria-hidden="true">SESSIONS · </span>
      <span className="tabular-nums text-ink">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
