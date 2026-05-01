"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import SignatureCanvas, { SignatureCanvasHandle } from "./SignatureCanvas";
import { useSound } from "./SoundProvider";
import { normalizeTag, randomTag } from "@/lib/visitorTags";
import { getPublicClient } from "@/lib/supabase";

const COLORS: Array<{ key: "magenta" | "cyan" | "lime" | "amber"; hex: string; label: string }> = [
  { key: "magenta", hex: "#ff2bd6", label: "MAGENTA" },
  { key: "cyan", hex: "#22d3ee", label: "CYAN" },
  { key: "lime", hex: "#a3e635", label: "LIME" },
  { key: "amber", hex: "#fbbf24", label: "AMBER" },
];

export default function SignFlow() {
  const router = useRouter();
  const ref = useRef<SignatureCanvasHandle | null>(null);
  const [name, setName] = useState("");
  const [tag, setTag] = useState(randomTag());
  const [color, setColor] = useState<"magenta" | "cyan" | "lime" | "amber">("cyan");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { play } = useSound();

  const nameId = useId();
  const tagId = useId();
  const tagHelpId = useId();
  const colorGroupId = useId();
  const errorId = useId();

  async function submit() {
    if (!ref.current || ref.current.isEmpty()) {
      setError("Please draw your signature on the cartridge before submitting.");
      play("error");
      return;
    }
    setSubmitting(true);
    setError(null);

    const signature_png = ref.current.toDataURL();
    const payload = {
      name: name.trim(),
      tag: normalizeTag(tag) || randomTag(),
      color,
      signature_png,
    };

    const client = getPublicClient();

    if (!client) {
      // No Supabase configured. write to localStorage and continue
      const local = JSON.parse(localStorage.getItem("mtw.guestbook") || "[]");
      const entry = {
        id: Date.now(),
        tag: payload.tag,
        name: payload.name || null,
        color: payload.color,
        signature_png: payload.signature_png,
        card_number: local.length + 1,
        created_at: new Date().toISOString(),
      };
      localStorage.setItem("mtw.guestbook", JSON.stringify([entry, ...local]));
      play("save");
      router.push("/guestbook?welcome=1&local=1");
      setSubmitting(false);
      return;
    }

    try {
      const { error: insertErr } = await client
        .from("guestbook_entries")
        .insert({
          tag: payload.tag,
          name: payload.name || null,
          color: payload.color,
          signature_png: payload.signature_png,
        });
      if (insertErr) throw insertErr;
      play("save");
      router.push("/guestbook?welcome=1");
    } catch (e: any) {
      setError(e?.message || "Network error.");
      play("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main" className="min-h-[100dvh] px-5 sm:px-6 pt-6 pb-10">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-block py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan"
        >
          <span aria-hidden="true">← </span>BACK TO BOOT
        </Link>

        <header className="mt-6 sm:mt-8 mb-8 sm:mb-10">
          <div
            className="font-pixel text-[10px] tracking-widest text-glow-magenta mb-3"
            aria-hidden="true"
          >
            ░ NEW PLAYER REGISTRATION ░
          </div>
          <h1 className="font-display text-[clamp(2.5rem,11vw,3.5rem)] sm:text-[64px] md:text-[88px] leading-[1.05] sm:leading-none text-glow-cyan">
            Sign in.<span className="caret" aria-hidden="true" />
          </h1>
          <p className="font-mono text-[14.5px] text-ink-dim mt-4 max-w-xl leading-relaxed">
            Welcome, visitor. Pick a tag, pick a color, scribble your mark on the
            cartridge. You&apos;ll show up on the high-score wall.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!submitting) submit();
          }}
          noValidate
        >
          <section className="grid gap-5 sm:gap-6 md:grid-cols-[1fr_auto] mb-8">
            <div>
              <label
                htmlFor={nameId}
                className="block font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-2"
              >
                Display name (optional)
              </label>
              <input
                id={nameId}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Matt T-W"
                maxLength={40}
                autoComplete="nickname"
                className="w-full bg-bg-deep border border-ink-ghost px-3 py-3 md:py-2.5 font-mono text-[16px] md:text-[14px] text-ink placeholder:text-ink-mute focus:outline-none focus:border-neon-cyan focus-visible:ring-2 focus-visible:ring-neon-cyan focus-visible:ring-offset-0"
              />
            </div>

            <div>
              <label
                htmlFor={tagId}
                className="block font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-2"
              >
                3-letter tag
              </label>
              <div className="flex items-center gap-3">
                <input
                  id={tagId}
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value.toUpperCase().slice(0, 3))}
                  maxLength={3}
                  pattern="[A-Z0-9]{3}"
                  inputMode="text"
                  aria-describedby={tagHelpId}
                  className="w-24 bg-bg-deep border border-ink-ghost px-3 py-3 md:py-2.5 font-pixel text-[16px] md:text-[14px] text-glow-cyan tracking-widest text-center focus:outline-none focus:border-neon-cyan"
                />
                <button
                  type="button"
                  onClick={() => {
                    setTag(randomTag());
                    play("roll");
                  }}
                  className="px-3 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-magenta focus-visible:text-glow-magenta"
                  aria-label="Roll a new random tag"
                >
                  <span aria-hidden="true">⟳ </span>ROLL
                </button>
              </div>
              <div
                id={tagHelpId}
                className="mt-1 font-mono text-[10px] text-ink-mute uppercase tracking-widest"
              >
                3 letters/numbers, like an arcade high score.
              </div>
            </div>
          </section>

          <fieldset className="mb-6 border-0 p-0 m-0" aria-labelledby={colorGroupId}>
            <legend
              id={colorGroupId}
              className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-3"
            >
              Card color
            </legend>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Card color">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  role="radio"
                  aria-checked={color === c.key}
                  onClick={() => {
                    setColor(c.key);
                    play("pop");
                  }}
                  className={`px-4 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest border transition-shadow ${
                    color === c.key
                      ? "border-transparent shadow-[0_0_0_1px_var(--col),0_0_12px_var(--col)]"
                      : "border-ink-ghost text-ink-dim hover:text-ink"
                  }`}
                  style={
                    {
                      color: color === c.key ? c.hex : undefined,
                      ["--col" as any]: c.hex,
                    } as React.CSSProperties
                  }
                >
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>

          <section className="mb-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-3">
              Sign the cartridge
            </div>
            <SignatureCanvas ref={ref} color={color} />
            <div className="mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => {
                  ref.current?.clear();
                  play("back");
                }}
                className="-ml-2 px-2 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-amber focus-visible:text-glow-amber"
                aria-label="Clear signature canvas"
              >
                <span aria-hidden="true">⌫ </span>CLEAR
              </button>
              <span className="font-mono text-[10.5px] text-ink-mute uppercase tracking-widest">
                CARD: {color}
              </span>
            </div>
          </section>

          {/* Error live region. announces to AT */}
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className={error ? "mb-4 cartridge p-3 font-mono text-[12px] text-glow-magenta" : "sr-only"}
          >
            {error ? (
              <>
                <span aria-hidden="true">⚠ </span>
                {error}
              </>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              disabled={submitting}
              aria-describedby={error ? errorId : undefined}
              className="cartridge px-6 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "SAVING…" : (
                <>
                  <span aria-hidden="true">[ </span>ENTER<span aria-hidden="true"> → ]</span>
                </>
              )}
            </button>
            <Link
              href="/home"
              className="py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-magenta"
            >
              SKIP, TAKE ME TO THE WORK
            </Link>
          </div>

          <div className="mt-12 font-mono text-[11px] text-ink-mute leading-relaxed">
            Your card appears on the high-score wall once it&apos;s saved. No emails. No
            tracking. Just a mark.
          </div>
        </form>
      </div>
    </main>
  );
}
