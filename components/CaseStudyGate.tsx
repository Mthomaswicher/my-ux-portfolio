"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSound } from "./SoundProvider";

type Props = {
  enabled?: boolean;
  slug: string;
  password: string;
  hint?: string;
  children: React.ReactNode;
};

/**
 * Client-side password gate for a case study. Casual gate only — the gated
 * content still ships in the static HTML, so a determined viewer can read it
 * via view-source. This is good enough for "please don't share publicly."
 *
 * On correct password, the unlock is persisted in localStorage under
 * `mtw.gate.<slug>` so the visitor doesn't re-prompt on subsequent visits.
 */
export default function CaseStudyGate({
  enabled = true,
  slug,
  password,
  hint,
  children,
}: Props) {
  const [hydrated, setHydrated] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { play } = useSound();

  useEffect(() => {
    setHydrated(true);
    if (!enabled) return;
    try {
      if (localStorage.getItem(`mtw.gate.${slug}`) === "1") setUnlocked(true);
    } catch {
      /* ignore */
    }
  }, [enabled, slug]);

  // If gating is off entirely, behave as a passthrough.
  if (!enabled) return <>{children}</>;

  // Avoid a hydration flash: render nothing until we know the unlock state.
  if (!hydrated) {
    return (
      <div className="mx-auto max-w-md px-5 sm:px-6 py-20 text-center">
        <div className="font-pixel text-[10px] tracking-widest text-ink-mute">
          LOADING…
        </div>
      </div>
    );
  }

  if (unlocked) return <>{children}</>;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === password.toLowerCase()) {
      play("oneUp");
      setUnlocked(true);
      setError(false);
      try {
        localStorage.setItem(`mtw.gate.${slug}`, "1");
      } catch {
        /* ignore */
      }
      return;
    }
    play("error");
    setError(true);
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
    inputRef.current?.select();
  }

  return (
    <div className="mx-auto max-w-xl px-5 sm:px-6 py-12 sm:py-20">
      <div
        className={`cartridge p-6 sm:p-8 text-center ${
          shake ? "motion-safe:animate-shake" : ""
        }`}
      >
        <div
          className="font-pixel text-[10px] tracking-widest text-glow-magenta mb-4"
          aria-hidden="true"
        >
          ░ ACCESS LOCKED ░
        </div>
        <h2 className="font-display text-[clamp(2rem,8vw,2.5rem)] sm:text-[44px] leading-[1.05] sm:leading-none text-glow-cyan mb-3">
          Members only.
        </h2>
        <p className="font-mono text-[13.5px] sm:text-[14px] text-ink-dim leading-relaxed max-w-sm mx-auto mb-7">
          This case study covers internal Capital One work. Drop the password
          to keep going.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-stretch gap-3 max-w-xs mx-auto"
        >
          <label htmlFor="cs-password" className="sr-only">
            Password
          </label>
          <input
            id="cs-password"
            ref={inputRef}
            type="password"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (error) setError(false);
            }}
            placeholder="PASSWORD"
            autoFocus
            autoComplete="off"
            spellCheck={false}
            aria-invalid={error || undefined}
            aria-describedby={error ? "cs-password-error" : undefined}
            className="bg-bg-deep border border-ink-ghost px-3 py-3 font-pixel text-[14px] text-glow-cyan tracking-widest text-center focus:outline-none focus:border-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan"
          />
          <button
            type="submit"
            onMouseEnter={() => play("hover")}
            className="cartridge px-5 py-3 font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan focus-visible:shadow-neon-cyan transition-shadow"
          >
            <span aria-hidden="true">[ </span>UNLOCK<span aria-hidden="true"> ]</span>
          </button>
          <div
            id="cs-password-error"
            role="alert"
            aria-live="polite"
            className={
              error
                ? "font-mono text-[12px] text-glow-magenta mt-1"
                : "sr-only"
            }
          >
            {error ? (
              <>
                <span aria-hidden="true">⚠ </span>Wrong password. Try again.
              </>
            ) : null}
          </div>
        </form>

        {hint && (
          <p className="mt-6 font-mono text-[11px] text-ink-mute leading-relaxed">
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
