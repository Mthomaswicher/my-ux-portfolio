"use client";

import Link from "next/link";
import { useMode } from "./ModeProvider";

const PIXEL_MARK = `
   ▄▄▄▄▄▄▄▄▄▄▄
  █  ▄     ▄  █
  █ ▀▀▀▄ ▄▀▀▀ █
  █   █▀ ▀█   █
  █   ▀█▄█▀   █
  █  M  ·  W  █
   ▀▀▀▀▀▀▀▀▀▀▀
`;

export default function Footer() {
  const { mode } = useMode();
  if (mode === "basic") return <BasicFooter />;
  return <ScenicFooter />;
}

function ScenicFooter() {
  return (
    <footer className="mt-20 sm:mt-24 border-t border-ink-ghost">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 py-10 sm:py-12 grid gap-8 md:gap-10 md:grid-cols-[auto_1fr_auto]">
        <pre
          className="hidden sm:block font-mono text-[10px] leading-tight text-glow-magenta whitespace-pre overflow-x-auto"
          aria-hidden="true"
        >
          {PIXEL_MARK}
        </pre>

        <div className="space-y-3 self-center">
          <div className="font-pixel text-[12px] tracking-widest text-glow-cyan">
            THANKS FOR PLAYING.
          </div>
          <p className="font-mono text-[13px] text-ink-dim max-w-md leading-relaxed">
            Built in Washington, D.C. A small love letter to late-night arcades, design
            systems, and the people who actually read the patch notes.
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] text-ink-mute">
            <a href="mailto:mthomaswicher@gmail.com" className="inline-flex items-center min-h-[44px] py-2 hover:text-glow-cyan">
              EMAIL
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://linkedin.com/in/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 hover:text-glow-cyan"
            >
              LINKEDIN
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://github.com/Mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 hover:text-glow-cyan"
            >
              GITHUB
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="https://dribbble.com/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center min-h-[44px] py-2 hover:text-glow-cyan"
            >
              DRIBBBLE
            </a>
          </div>
        </div>

        <div className="self-end flex md:flex-col gap-4 md:gap-2">
          <Link
            href="/"
            className="inline-flex items-center min-h-[44px] py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-magenta"
          >
            <span aria-hidden="true">↩&nbsp;</span>INSERT COIN
          </Link>
          <Link
            href="/guestbook"
            className="inline-flex items-center min-h-[44px] py-2 font-pixel text-[10px] tracking-widest text-ink-mute hover:text-glow-amber"
          >
            <span aria-hidden="true">✦&nbsp;</span>HIGH SCORES
          </Link>
        </div>
      </div>
    </footer>
  );
}

function BasicFooter() {
  return (
    <footer className="mt-20 sm:mt-24 border-t border-ink-ghost">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 py-10 sm:py-12 grid gap-8 sm:grid-cols-[1fr_auto] items-end">
        <div className="space-y-3">
          <p
            className="text-[16px] leading-relaxed text-ink-dim max-w-md"
            style={{ fontFamily: "var(--font-garamond)" }}
          >
            Built in Washington, D.C.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] font-mono text-ink">
            <a
              href="mailto:mthomaswicher@gmail.com"
              className="py-1 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="py-1 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="py-1 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              GitHub
            </a>
            <a
              href="https://dribbble.com/mthomaswicher"
              target="_blank"
              rel="noreferrer"
              className="py-1 underline-offset-4 hover:underline hover:text-ink-mute"
            >
              Dribbble
            </a>
          </div>
          <p className="text-[12px] text-ink-mute font-mono">
            © {new Date().getFullYear()} Matthew Thomas-Wicher
          </p>
        </div>
      </div>
    </footer>
  );
}
