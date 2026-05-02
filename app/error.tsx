"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useMode } from "@/components/ModeProvider";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { mode } = useMode();
  const isBasic = mode === "basic";

  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error("[MTW] runtime error", error);
    }
  }, [error]);

  if (isBasic) {
    return (
      <main
        id="main"
        className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12"
      >
        <div className="w-full max-w-2xl" role="alert" aria-live="assertive">
          <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 font-mono">
            Error
          </div>
          <h1
            className="text-[clamp(2rem,7vw,3.5rem)] leading-[1.05] text-ink mb-4"
            style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
          >
            Something broke.
          </h1>
          <p
            className="text-[clamp(1rem,2vw,1.2rem)] leading-[1.55] text-ink-dim max-w-2xl mb-6"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            An unexpected error came up while loading this page. You can try
            again, or head back to the rest of the work.
          </p>

          <div className="border border-ink-ghost p-4 mb-8 max-w-lg">
            <div className="text-[10px] uppercase tracking-[0.18em] text-ink-mute mb-1 font-mono">
              Details
            </div>
            <div className="break-words text-[13px] font-mono text-ink-dim">
              {error.message || "Unknown failure."}
            </div>
            {error.digest && (
              <div className="text-[10px] font-mono text-ink-mute mt-3">
                Digest: {error.digest}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-mono">
            <button
              type="button"
              onClick={reset}
              className="py-2 text-ink underline-offset-4 hover:underline hover:text-ink-mute"
            >
              ↻ Try again
            </button>
            <Link
              href="/home"
              className="py-2 text-ink underline-offset-4 hover:underline hover:text-ink-mute"
            >
              ← All work
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      id="main"
      className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12"
    >
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
