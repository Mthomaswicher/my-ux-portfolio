"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[MTW.ARCADE] runtime error", error);
    }
  }, [error]);

  return (
    <main id="main" className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12">
      <div className="w-full max-w-2xl" role="alert" aria-live="assertive">
        <div
          className="font-pixel text-[12px] sm:text-[18px] tracking-widest text-glow-amber mb-6"
          aria-hidden="true"
        >
          ░ ░ ░ SYSTEM FAULT ░ ░ ░
        </div>

        <h1 className="font-display text-[48px] sm:text-[96px] leading-none text-glow-magenta mb-3">
          Crash.
        </h1>
        <p className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-cyan mb-6">
          SOMETHING JAMMED THE GAME CABINET.
        </p>

        <div className="cartridge p-4 mb-8 font-mono text-[12px] text-ink-dim max-w-lg">
          <div className="text-ink-mute uppercase tracking-widest text-[10px] mb-1">
            ERROR
          </div>
          <div className="break-words">{error.message || "Unknown failure."}</div>
          {error.digest && (
            <div className="text-ink-mute mt-3 text-[10px]">DIGEST: {error.digest}</div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={reset}
            className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow"
          >
            [ TRY AGAIN ]
          </button>
          <Link
            href="/home"
            className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-ink hover:text-glow-magenta hover:shadow-neon-magenta transition-shadow"
          >
            [ BACK TO GAME CABINET ]
          </Link>
        </div>
      </div>
    </main>
  );
}
