"use client";

import { useEffect, useRef, useState } from "react";
import ModeText from "./ModeText";
import { useSound } from "./SoundProvider";

/**
 * Interactive recreation of the Quick Screenshot to Code plugin flow.
 *
 * Left pane is a FigJam-style canvas with a pasted "screenshot" (a small
 * pricing card in browser chrome, rendered in DOM so it stays sharp) and a
 * recreation of the plugin panel. Hitting Convert runs a staged pipeline
 * (read pixels, infer layout, write code) and types the generated code into
 * the editor pane on the right. Tabs switch the output framework.
 *
 * Everything here is a labelled recreation, not captured plugin UI. The
 * canvas keeps a hardcoded light palette in both themes, same precedent as
 * the stamped-component panel in RtLibraryShowcase.
 */

/* ─── Generated code, one snippet per framework tab ────────────────────── */

const FRAMEWORKS = [
  {
    id: "react",
    tab: "PricingCard.tsx",
    short: "REACT",
    chip: "React",
    lines: [
      `export function PricingCard() {`,
      `  return (`,
      `    <article className="w-72 rounded-xl border border-slate-200 bg-white p-6">`,
      `      <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">`,
      `        Starter`,
      `      </p>`,
      `      <p className="mt-2 flex items-baseline gap-1">`,
      `        <span className="text-4xl font-bold text-slate-900">$12</span>`,
      `        <span className="text-sm text-slate-500">/mo</span>`,
      `      </p>`,
      `      <ul className="mt-4 space-y-2 text-sm text-slate-600">`,
      `        <li>Unlimited projects</li>`,
      `        <li>Custom domains</li>`,
      `        <li>Email support</li>`,
      `      </ul>`,
      `      <button className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white">`,
      `        Start free trial`,
      `      </button>`,
      `    </article>`,
      `  );`,
      `}`,
    ],
  },
  {
    id: "vue",
    tab: "PricingCard.vue",
    short: "VUE",
    chip: "Vue",
    lines: [
      `<script setup>`,
      `const features = [`,
      `  "Unlimited projects",`,
      `  "Custom domains",`,
      `  "Email support",`,
      `];`,
      `</script>`,
      ``,
      `<template>`,
      `  <article class="card">`,
      `    <p class="eyebrow">Starter</p>`,
      `    <p class="price">$12 <span>/mo</span></p>`,
      `    <ul>`,
      `      <li v-for="f in features" :key="f">{{ f }}</li>`,
      `    </ul>`,
      `    <button class="cta">Start free trial</button>`,
      `  </article>`,
      `</template>`,
    ],
  },
  {
    id: "html",
    tab: "pricing.html",
    short: "HTML",
    chip: "HTML",
    lines: [
      `<article class="card">`,
      `  <p class="eyebrow">Starter</p>`,
      `  <p class="price">$12 <span>/mo</span></p>`,
      `  <ul class="features">`,
      `    <li>Unlimited projects</li>`,
      `    <li>Custom domains</li>`,
      `    <li>Email support</li>`,
      `  </ul>`,
      `  <button class="cta">Start free trial</button>`,
      `</article>`,
      ``,
      `<style>`,
      `  .card    { width: 288px; padding: 24px; background: #fff;`,
      `             border: 1px solid #e2e8f0; border-radius: 12px; }`,
      `  .eyebrow { color: #2563eb; font-size: 12px; font-weight: 600;`,
      `             letter-spacing: 0.1em; text-transform: uppercase; }`,
      `  .price   { color: #0f172a; font-size: 36px; font-weight: 700; }`,
      `  .cta     { width: 100%; padding: 10px 0; background: #2563eb;`,
      `             color: #fff; border: 0; border-radius: 8px; }`,
      `</style>`,
    ],
  },
] as const;

const SCAN_STEPS = [
  "READING PIXELS",
  "INFERRING LAYOUT",
  "MATCHING TYPE + COLOR",
  "WRITING CODE",
];

/* ─── Tiny syntax highlighter ──────────────────────────────────────────── */

/** Order matters: strings first so nothing inside them re-matches. */
const TOKEN_RE =
  /("[^"]*"|'[^']*')|(<\/?[A-Za-z][\w-]*|\/?>)|(\b(?:export|function|return|const|setup)\b)|([\w:@-]+(?==))/g;

function renderLine(line: string) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line))) {
    if (m.index > last) out.push(line.slice(last, m.index));
    const cls = m[1]
      ? "text-neon-amber"
      : m[2]
        ? "text-neon-cyan"
        : m[3]
          ? "text-neon-magenta"
          : "text-neon-lime";
    out.push(
      <span key={i++} className={cls}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

/* ─── The pasted "screenshot": pricing card inside browser chrome ──────── */

const WEB_FONT =
  "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

function PastedScreenshot() {
  return (
    <div className="relative inline-block" style={{ fontFamily: WEB_FONT }}>
      {/* Figma selection frame */}
      <span
        aria-hidden="true"
        className="absolute -top-5 left-0 text-[10px] font-medium"
        style={{ color: "#0D99FF" }}
      >
        Screenshot 1
      </span>
      <div
        className="relative"
        style={{ outline: "1.5px solid #0D99FF", outlineOffset: 2 }}
      >
        {[
          { top: -6, left: -6 },
          { top: -6, right: -6 },
          { bottom: -6, left: -6 },
          { bottom: -6, right: -6 },
        ].map((pos, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute z-10 block w-2 h-2"
            style={{
              ...pos,
              background: "#fff",
              border: "1.5px solid #0D99FF",
            }}
          />
        ))}

        {/* Browser chrome */}
        <div
          className="w-[240px] overflow-hidden rounded-md"
          style={{ boxShadow: "0 10px 24px rgba(15,23,42,0.18)" }}
        >
          <div
            className="flex items-center gap-1.5 px-2.5 py-1.5"
            style={{ background: "#F1F5F9" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ background: "#F87171" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "#FBBF24" }} />
            <span className="w-2 h-2 rounded-full" style={{ background: "#34D399" }} />
            <span
              className="ml-1.5 flex-1 rounded px-2 py-0.5 text-[9px]"
              style={{ background: "#fff", color: "#64748B" }}
            >
              acme.com/pricing
            </span>
          </div>

          {/* The page itself */}
          <div className="flex justify-center p-4" style={{ background: "#F8FAFC" }}>
            <div
              className="w-full rounded-xl p-4"
              style={{ background: "#fff", border: "1px solid #E2E8F0" }}
            >
              <p
                className="text-[9px] font-semibold uppercase"
                style={{ color: "#2563EB", letterSpacing: "0.12em" }}
              >
                Starter
              </p>
              <p className="mt-1 flex items-baseline gap-1">
                <span className="text-[22px] font-bold" style={{ color: "#0F172A" }}>
                  $12
                </span>
                <span className="text-[10px]" style={{ color: "#64748B" }}>
                  /mo
                </span>
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[10px]" style={{ color: "#475569" }}>
                {["Unlimited projects", "Custom domains", "Email support"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5">
                    <span style={{ color: "#2563EB" }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <div
                className="mt-3 w-full rounded-md py-1.5 text-center text-[10px] font-semibold"
                style={{ background: "#2563EB", color: "#fff" }}
              >
                Start free trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── FigJam multiplayer cursor ────────────────────────────────────────── */

function FigmaCursor() {
  return (
    <div aria-hidden="true" className="absolute bottom-7 right-5 sm:right-9 z-10">
      <svg width="18" height="20" viewBox="0 0 12 18">
        <path
          d="M0 0 L0 14 L4 11 L6.5 17 L8.8 16 L6.3 10.4 L11 10 Z"
          fill="#9747FF"
          stroke="#fff"
          strokeWidth="1"
        />
      </svg>
      <span
        className="ml-3 rounded-full rounded-tl-none px-1.5 py-0.5 text-[9px] font-medium"
        style={{ background: "#9747FF", color: "#fff", fontFamily: WEB_FONT }}
      >
        MTW
      </span>
    </div>
  );
}

/* ─── Main showcase ────────────────────────────────────────────────────── */

type Phase = "idle" | "scan" | "type" | "done";

export default function ScreenshotToCodeShowcase() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [scanStep, setScanStep] = useState(0);
  const [visLines, setVisLines] = useState(0);
  const [fw, setFw] = useState(0);
  const reduced = useRef(false);
  const { play } = useSound();

  const framework = FRAMEWORKS[fw];
  const busy = phase === "scan" || phase === "type";

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Staged pipeline in the plugin panel, then hand off to the typewriter.
  useEffect(() => {
    if (phase !== "scan") return;
    const t = setInterval(() => {
      setScanStep((s) => {
        if (s + 1 >= SCAN_STEPS.length) {
          clearInterval(t);
          setPhase("type");
          return s;
        }
        return s + 1;
      });
    }, 480);
    return () => clearInterval(t);
  }, [phase]);

  // Type the generated code out line by line.
  useEffect(() => {
    if (phase !== "type") return;
    const total = FRAMEWORKS[fw].lines.length;
    const t = setInterval(() => {
      setVisLines((n) => {
        if (n + 1 >= total) {
          clearInterval(t);
          setPhase("done");
          play("save");
          return total;
        }
        return n + 1;
      });
    }, 65);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, fw]);

  function convert() {
    if (busy) return;
    play("select");
    if (reduced.current) {
      setVisLines(framework.lines.length);
      setPhase("done");
      return;
    }
    setScanStep(0);
    setVisLines(0);
    setPhase("scan");
  }

  function pickFramework(i: number) {
    if (i === fw) return;
    play("click");
    setFw(i);
    if (phase === "done") setVisLines(FRAMEWORKS[i].lines.length);
    if (phase === "type") setVisLines(0);
  }

  const shownLines =
    phase === "done"
      ? framework.lines
      : framework.lines.slice(0, Math.min(visLines, framework.lines.length));

  return (
    <div>
      <div className="cartridge overflow-hidden bg-bg-deep">
        <div className="grid lg:grid-cols-[1fr_auto_1fr]">
          {/* ── FigJam canvas ── */}
          <div
            className="relative p-5 pt-9 sm:p-8 sm:pt-10"
            style={{
              background: "#FCFCFC",
              backgroundImage: "radial-gradient(#D9D9D9 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          >
            <div className="flex justify-center">
              <PastedScreenshot />
            </div>

            {/* Plugin panel recreation */}
            <div
              className="relative z-20 mx-auto mt-6 max-w-[250px] rounded-lg"
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                boxShadow: "0 12px 28px rgba(15,23,42,0.16)",
                fontFamily: WEB_FONT,
              }}
            >
              <div
                className="flex items-center justify-between px-3 py-2.5"
                style={{ borderBottom: "1px solid #F1F5F9" }}
              >
                <span className="text-[11px] font-semibold" style={{ color: "#1E293B" }}>
                  Quick Screenshot to Code
                </span>
                <span aria-hidden="true" className="text-[11px]" style={{ color: "#94A3B8" }}>
                  ✕
                </span>
              </div>
              <div className="p-3">
                <p className="mb-1.5 text-[10px]" style={{ color: "#64748B" }}>
                  Output framework
                </p>
                <div className="flex gap-1.5" role="tablist" aria-label="Output framework">
                  {FRAMEWORKS.map((f, i) => (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={i === fw}
                      onClick={() => pickFramework(i)}
                      className="flex-1 rounded-md px-2 py-1 text-[10px] font-medium transition-colors"
                      style={
                        i === fw
                          ? {
                              background: "#EFF6FF",
                              border: "1px solid #2563EB",
                              color: "#2563EB",
                            }
                          : {
                              background: "#fff",
                              border: "1px solid #E2E8F0",
                              color: "#475569",
                            }
                      }
                    >
                      {f.chip}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={convert}
                  disabled={busy}
                  className="mt-3 w-full rounded-md py-2 text-[12px] font-semibold transition-colors disabled:cursor-wait"
                  style={{
                    background: busy ? "#7CC4F8" : "#0D99FF",
                    color: "#fff",
                  }}
                >
                  {phase === "done" ? "Convert again" : busy ? "Converting…" : "Convert"}
                </button>
                {phase === "scan" && (
                  <div className="mt-2.5">
                    <div className="h-1 overflow-hidden rounded" style={{ background: "#E2E8F0" }}>
                      <div
                        className="h-full transition-all duration-300"
                        style={{
                          background: "#0D99FF",
                          width: `${((scanStep + 1) / SCAN_STEPS.length) * 100}%`,
                        }}
                      />
                    </div>
                    <p
                      className="mt-1.5 font-mono text-[9px] uppercase tracking-widest"
                      style={{ color: "#64748B" }}
                    >
                      {SCAN_STEPS[scanStep]}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <FigmaCursor />
          </div>

          {/* ── Arrow ── */}
          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-2 border-y border-ink-ghost py-2 lg:flex-col lg:border-y-0 lg:border-x lg:px-3"
          >
            <span className="font-display text-[28px] leading-none text-glow-lime lg:rotate-0 rotate-90">
              →
            </span>
            <span className="font-pixel text-[8px] tracking-widest text-ink-mute">
              CODE
            </span>
          </div>

          {/* ── Editor ── */}
          <div className="flex min-w-0 flex-col bg-bg-void">
            <div className="flex border-b border-ink-ghost bg-bg-deep" role="tablist" aria-label="Generated file">
              {FRAMEWORKS.map((f, i) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={i === fw}
                  onClick={() => pickFramework(i)}
                  className={`px-3 py-2 font-mono text-[11px] transition-colors ${
                    i === fw
                      ? "bg-bg-void text-glow-cyan shadow-[inset_0_-2px_0_rgb(var(--neon-cyan))]"
                      : "text-ink-mute hover:text-ink-dim"
                  }`}
                >
                  {f.tab}
                </button>
              ))}
            </div>

            <div
              className="min-h-[300px] flex-1 overflow-x-auto p-4 font-mono text-[11px] leading-[1.7]"
              role="region"
              aria-label={`Generated ${framework.chip} code`}
            >
              {phase === "idle" ? (
                <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 text-center">
                  <p className="font-pixel text-[9px] tracking-widest text-ink-mute">
                    <ModeText scenic="░ AWAITING INPUT ░" basic="Awaiting input" />
                  </p>
                  <p className="font-mono text-[11px] text-ink-mute">
                    Hit Convert on the plugin panel.
                  </p>
                </div>
              ) : (
                <div>
                  {shownLines.map((line, i) => (
                    <div key={i} className="flex whitespace-pre">
                      <span className="w-6 shrink-0 select-none pr-3 text-right text-ink-ghost">
                        {i + 1}
                      </span>
                      <span className="text-ink-dim">
                        {renderLine(line)}
                        {phase === "type" && i === shownLines.length - 1 && (
                          <span aria-hidden="true" className="animate-blink text-glow-cyan">
                            ▮
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {phase === "done" && (
              <div className="flex items-center justify-between border-t border-ink-ghost px-4 py-2 font-mono text-[10px]">
                <span className="text-glow-lime">
                  ✓ CONVERTED · {framework.lines.length} LINES · {framework.short}
                </span>
                <button
                  type="button"
                  onClick={convert}
                  className="text-ink-mute transition-colors hover:text-glow-cyan"
                >
                  RUN AGAIN ↺
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="mt-4 font-mono text-[12px] leading-relaxed text-ink-mute">
        Recreated flow, not captured plugin UI, rebuilt in DOM so it stays sharp
        at any size. The real thing runs inside FigJam: paste a screenshot of
        any page, pick a framework, hit Convert.
      </p>
    </div>
  );
}
