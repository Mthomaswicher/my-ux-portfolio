"use client";

import Link from "next/link";
import { useMode } from "@/components/ModeProvider";

export default function NotFoundView() {
  const { mode } = useMode();
  if (mode === "basic") return <BasicNotFound />;
  return <ScenicNotFound />;
}

function BasicNotFound() {
  return (
    <main
      id="main"
      className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12"
    >
      <div className="w-full max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 font-mono">
          404
        </div>
        <h1
          className="text-[clamp(2rem,7vw,3.5rem)] leading-[1.05] text-ink mb-4"
          style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
        >
          Page not found.
        </h1>
        <p
          className="text-[clamp(1rem,2vw,1.2rem)] leading-[1.55] text-ink-dim max-w-2xl mb-8"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          The link you followed points to a page that doesn&apos;t exist.
          Maybe the URL is mistyped, maybe it moved. Either way, try one of
          these:
        </p>

        <nav
          aria-label="Recovery"
          className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] font-mono"
        >
          <Link
            href="/home"
            className="py-2 text-ink underline-offset-4 hover:underline hover:text-ink-mute"
          >
            ← All work
          </Link>
          <Link
            href="/about"
            className="py-2 text-ink underline-offset-4 hover:underline hover:text-ink-mute"
          >
            About
          </Link>
          <Link
            href="/guestbook"
            className="py-2 text-ink underline-offset-4 hover:underline hover:text-ink-mute"
          >
            Guestbook
          </Link>
        </nav>
      </div>
    </main>
  );
}

function ScenicNotFound() {
  return (
    <main
      id="main"
      className="min-h-[100dvh] flex items-center justify-center px-5 sm:px-6 py-10 sm:py-12"
    >
      <div className="w-full max-w-2xl">
        <div
          className="font-pixel text-[12px] sm:text-[18px] tracking-widest text-glow-magenta mb-6"
          aria-hidden="true"
        >
          ░ ░ ░ GAME OVER ░ ░ ░
        </div>

        <h1 className="font-display text-[64px] sm:text-[120px] leading-none text-glow-cyan mb-2">
          404
        </h1>
        <p className="font-pixel text-[10px] sm:text-[12px] tracking-widest text-glow-amber mb-8">
          THIS CARTRIDGE ISN&apos;T IN THE GAME CABINET.
        </p>

        <p className="font-mono text-[14px] text-ink-dim leading-relaxed mb-8 max-w-lg">
          The link you followed points to a screen that doesn&apos;t exist.
          Maybe the URL is mistyped, maybe it moved, maybe a player ripped the
          label off. Either way, try one of these:
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/home"
            className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow"
          >
            [ GAME CABINET ]
          </Link>
          <Link
            href="/"
            className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-ink hover:text-glow-magenta hover:shadow-neon-magenta transition-shadow"
          >
            [ INSERT COIN ]
          </Link>
          <Link
            href="/guestbook"
            className="cartridge px-5 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-ink hover:text-glow-amber hover:shadow-neon-amber transition-shadow"
          >
            [ HIGH SCORES ]
          </Link>
        </div>

        <div className="mt-12 font-mono text-[11px] uppercase tracking-widest text-ink-mute">
          ERROR CODE: NO_SUCH_CARTRIDGE
        </div>
      </div>
    </main>
  );
}
