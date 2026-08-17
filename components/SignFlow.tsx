"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";
import SignatureCanvas, { SignatureCanvasHandle } from "./SignatureCanvas";
import ModeText from "./ModeText";
import { useSound } from "./SoundProvider";
import { haptic } from "@/lib/haptic";
import type { CSSVars } from "@/lib/cssVars";
import { normalizeTag, randomTag } from "@/lib/visitorTags";
import {
  getPublicClient,
  timeoutSignal,
  SUPABASE_WRITE_TIMEOUT_MS,
} from "@/lib/supabase";

const COLORS: Array<{ key: "magenta" | "cyan" | "lime" | "amber"; hex: string; label: string }> = [
  { key: "magenta", hex: "#ff2bd6", label: "MAGENTA" },
  { key: "cyan", hex: "#22d3ee", label: "CYAN" },
  { key: "lime", hex: "#a3e635", label: "LIME" },
  { key: "amber", hex: "#fbbf24", label: "AMBER" },
];

/** The swatch buttons drive their glow off --col rather than a class, so the
 *  colour can stay data. */
const swatchStyle = (hex: string): CSSVars => ({ "--col": hex });

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
    if (!ref.current) {
      setError("Signature canvas not ready, please retry.");
      play("error");
      haptic("error");
      return;
    }
    // Keyboard-only fallback: if no drawing, auto-render the typed name (or
    // tag) as a script signature so visitors who can't use a pointer still
    // have a path through this form.
    if (ref.current.isEmpty()) {
      const fallbackText = name.trim() || tag.trim() || "Player 1";
      ref.current.renderTyped(fallbackText);
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

    // Keep the signature on this device no matter what the backend does.
    // The guestbook page reads these and says so ("Couldn't reach the live
    // wall…"), which beats throwing away a drawing someone just made.
    function saveLocally() {
      try {
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
        return true;
      } catch {
        // Private browsing / quota, nothing more we can do here.
        return false;
      }
    }

    const client = getPublicClient();

    if (!client) {
      // No Supabase configured, local-only is the expected path.
      saveLocally();
      play("save");
      haptic("save");
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
        })
        .abortSignal(timeoutSignal(SUPABASE_WRITE_TIMEOUT_MS));
      if (insertErr) throw insertErr;
      play("save");
      haptic("save");
      router.push("/guestbook?welcome=1");
    } catch {
      // The live wall is unreachable (project down, RLS rejection, offline).
      // Don't lose the drawing and don't show a raw "TypeError: Failed to
      // fetch", save it here and let the guestbook explain the situation.
      if (saveLocally()) {
        play("save");
        haptic("save");
        router.push("/guestbook?welcome=1&local=1");
      } else {
        setError(
          "Couldn't save your signature. The guestbook is unreachable right now, so please try again later.",
        );
        play("error");
        haptic("error");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main" className="min-h-[100dvh] px-5 sm:px-6 pt-6 pb-10">
      <div className="mx-auto max-w-3xl">
        <ModeText
          scenic={
            <Link
              href="/"
              className="inline-block py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan"
            >
              <span aria-hidden="true">← </span>BACK TO BOOT
            </Link>
          }
          basic={
            <Link
              href="/"
              className="inline-block py-2 text-[13px] text-ink-dim hover:text-ink underline-offset-4 hover:underline"
            >
              <span aria-hidden="true">← </span>Back
            </Link>
          }
        />

        <header className="mt-6 sm:mt-8 mb-8 sm:mb-10">
          <ModeText
            scenic={
              <>
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
                  Pick a tag, pick a color, scribble something. You&apos;ll show up on the
                  wall with everyone else.
                </p>
              </>
            }
            basic={
              <>
                <h1
                  className="text-[clamp(1.625rem,6vw,3rem)] leading-[1.05] text-ink mb-4 break-words"
                  style={{ fontFamily: "var(--font-garamond)", fontWeight: 500 }}
                >
                  Sign the guestbook
                </h1>
                <p
                  className="text-[15px] sm:text-[16px] text-ink-dim mt-2 max-w-xl leading-relaxed"
                  style={{ fontFamily: "var(--font-garamond)" }}
                >
                  Pick a name, pick a pen, draw something. You&apos;ll show up in the
                  entries below.
                </p>
              </>
            }
          />
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
                placeholder="Enter name"
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
                <ModeText
                  scenic="3 letters/numbers, like an arcade high score."
                  basic="Three letters or numbers, your initials."
                />
              </div>
            </div>
          </section>

          <fieldset className="mb-6 border-0 p-0 m-0" aria-labelledby={colorGroupId}>
            <legend
              id={colorGroupId}
              className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-3"
            >
              <ModeText scenic="Card color" basic="Pen color" />
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
                      ? `border-transparent shadow-[0_0_0_1px_var(--col),0_0_12px_var(--col)] text-glow-${c.key}`
                      : "border-ink-ghost text-ink-dim hover:text-ink"
                  }`}
                  style={swatchStyle(c.hex)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </fieldset>

          <section className="mb-6">
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute mb-3">
              <ModeText scenic="Sign the cartridge" basic="Sign here" />
            </div>
            <SignatureCanvas ref={ref} color={color} />
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1">
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
                <button
                  type="button"
                  onClick={() => {
                    const fallback = name.trim() || tag.trim() || "Player 1";
                    ref.current?.renderTyped(fallback);
                    play("pop");
                  }}
                  className="px-2 py-2 min-h-[44px] font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-cyan focus-visible:text-glow-cyan"
                  aria-label="Use a typed signature instead of drawing"
                  title="No pointer? Type your name above and press this to auto-sign."
                >
                  <span aria-hidden="true">⌨ </span>USE TYPED
                </button>
              </div>
              <span className="font-mono text-[10.5px] text-ink-mute uppercase tracking-widest">
                <ModeText scenic="Card" basic="Pen" />: {color}
              </span>
            </div>
            <div className="mt-2 font-mono text-[10.5px] text-ink-mute leading-relaxed">
              Drawing optional, if you submit without a mark we&apos;ll render
              your typed name as a script signature.
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
              className="sign-submit cartridge px-6 py-3 min-h-[48px] font-pixel text-[12px] tracking-widest text-glow-cyan hover:shadow-neon-cyan transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ModeText
                scenic={
                  submitting ? (
                    "SAVING…"
                  ) : (
                    <>
                      <span aria-hidden="true">[ </span>ENTER
                      <span aria-hidden="true"> → ]</span>
                    </>
                  )
                }
                basic={submitting ? "Saving…" : "Sign"}
              />
            </button>
            <Link
              href="/home"
              className="sign-skip inline-flex items-center min-h-[44px] py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-magenta"
            >
              <ModeText
                scenic="SKIP, TAKE ME TO THE WORK"
                basic="Skip this, see the work"
              />
            </Link>
          </div>

          <div className="mt-12 font-mono text-[11px] text-ink-mute leading-relaxed">
            <ModeText
              scenic="Your card goes up once it saves. No emails, no tracking, nothing else."
              basic="Your entry goes up once it saves. No emails, no tracking, nothing else."
            />
          </div>
        </form>
      </div>
    </main>
  );
}
