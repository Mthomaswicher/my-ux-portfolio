"use client";

import { useMode } from "./ModeProvider";

/**
 * The guestbook page header. Splits "High Scores ░ HALL OF FAME ░"
 * arcade copy from a neutral "Guestbook" header so basic-mode
 * (Reading Room) visitors see editorial copy instead of game refs.
 */
export default function GuestbookHero() {
  const { mode } = useMode();
  const isBasic = mode === "basic";

  if (isBasic) {
    return (
      <header className="mb-10 md:mb-14">
        <div
          className="text-[11px] uppercase tracking-[0.18em] text-ink-mute mb-4 font-mono"
          aria-hidden="true"
        >
          Guestbook
        </div>
        <h1
          className="text-[clamp(1.625rem,6vw,3.25rem)] leading-[1.05] text-ink mb-5 break-words"
          style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
        >
          Visitors
        </h1>
        <p
          className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.55] text-ink-dim max-w-2xl"
          style={{ fontFamily: "var(--font-garamond)" }}
        >
          People who left a mark on their way through. Each card is hand-drawn
          by a real human. No filter, no edit, no delete.
        </p>
      </header>
    );
  }

  return (
    <header>
      <div
        className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
        aria-hidden="true"
      >
        ░ HALL OF FAME ░
      </div>
      <h1 className="font-display text-[clamp(2rem,9vw,3rem)] sm:text-[64px] md:text-[88px] leading-[1.05] sm:leading-none text-glow-amber mb-4">
        High Scores
        <span className="caret" aria-hidden="true" />
      </h1>
      <p className="font-mono text-[15px] text-ink-dim mb-10 max-w-xl leading-relaxed">
        Visitors who left a mark. Each card is hand-drawn by a real human on the way
        in. No filter, no edit, no delete.
      </p>
    </header>
  );
}
