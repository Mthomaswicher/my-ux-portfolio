"use client";

import { useRef, useState } from "react";
import { useSound } from "./SoundProvider";
import { withBase } from "@/lib/path";

const HREF = withBase("/MTW_Resume_2026.pdf");
const FILENAME = "MTW_Resume_2026.pdf";

export default function ResumeDisk() {
  const { play } = useSound();
  const [transferring, setTransferring] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timerRef = useRef<number | null>(null);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (transferring) {
      e.preventDefault();
      return;
    }
    play("cartridge");
    setTransferring(true);
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setTransferring(false), 1400);
  }

  return (
    <section
      className="my-14"
      aria-labelledby="resume-heading"
    >
      <h2
        id="resume-heading"
        className="font-pixel text-[12px] tracking-widest text-glow-amber mb-4"
      >
        <span aria-hidden="true">▌</span>RESUME
      </h2>

      <a
        ref={linkRef}
        href={HREF}
        download={FILENAME}
        onClick={handleClick}
        onMouseEnter={() => play("hover")}
        onFocus={() => play("hover")}
        className="floppy group relative grid grid-cols-[80px_1fr_auto] sm:grid-cols-[120px_1fr_auto] items-stretch gap-0 outline-none"
        aria-label="Download Matthew's resume (PDF)"
      >
        {/* ─── Disk left half: metal shutter + label corner ─── */}
        <div className="relative bg-[#0d0d18] border-r border-ink-ghost overflow-hidden">
          {/* metal shutter (top of floppy) */}
          <div
            className="absolute left-3 top-3 right-3 h-[34px] rounded-sm"
            style={{
              background:
                "linear-gradient(180deg, #c8c8d6 0%, #92929e 50%, #6a6a78 100%)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.6)",
            }}
            aria-hidden="true"
          >
            {/* shutter slot */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-3/5 h-[5px] bg-[#0a0a14]" />
          </div>

          {/* read/write LED */}
          <div className="absolute right-3 bottom-3 flex items-center gap-1.5" aria-hidden="true">
            <span
              className={`block w-2 h-2 rounded-full transition-all ${
                transferring
                  ? "bg-neon-amber shadow-neon-amber motion-safe:animate-pulse"
                  : "bg-neon-lime shadow-neon-lime"
              }`}
            />
            <span className="font-pixel text-[7px] tracking-widest text-ink-mute">
              {transferring ? "RW" : "OK"}
            </span>
          </div>

          {/* hub circle */}
          <div
            className="absolute left-1/2 top-[60%] -translate-x-1/2 w-12 h-12 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, #2a2a3c 0%, #0d0d18 70%)",
              boxShadow: "inset 0 0 0 2px #1c1c2c, inset 0 0 6px rgba(0,0,0,0.7)",
            }}
            aria-hidden="true"
          />
        </div>

        {/* ─── Center label sticker ─── */}
        <div
          className="relative bg-[#f4ecd6] text-[#1a1a14] px-3 sm:px-4 py-3 overflow-hidden min-w-0"
          style={{
            boxShadow:
              "inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 -8px 0 rgba(0,0,0,0.04)",
          }}
        >
          {/* ruled lines (notebook label) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent 0 17px, rgba(20,20,30,0.10) 17px 18px)",
            }}
            aria-hidden="true"
          />
          <div className="relative">
            <div className="font-pixel text-[8px] sm:text-[9px] tracking-widest text-[#8a4f12]">
              ▶ DISK 01 / RESUME.PDF
            </div>
            <div className="font-display text-[20px] sm:text-[26px] leading-tight mt-1 break-words">
              MATTHEW THOMAS-WICHER
            </div>
            <div className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 text-[#3a3a30]">
              SR. PRODUCT DESIGNER · 2026
            </div>
            <div className="font-mono text-[11px] mt-3 text-[#5a5a48]">
              <span className="font-pixel text-[9px] tracking-widest text-[#8a4f12]">
                ▸ PRESS&nbsp;
              </span>
              <span className="inline-block px-1.5 py-0.5 mx-0.5 bg-[#1a1a14] text-[#f4ecd6] font-pixel text-[9px] tracking-widest rounded-sm align-middle">
                A
              </span>
              <span className="font-pixel text-[9px] tracking-widest text-[#8a4f12]">
                &nbsp;TO DOWNLOAD
              </span>
            </div>
          </div>

          {/* transfer shimmer on click */}
          {transferring && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,211,238,0.45) 50%, transparent)",
                animation: "floppy-shimmer 1.4s ease-out 1",
              }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* ─── Right edge: write-protect notch + arrow ─── */}
        <div className="relative bg-[#0d0d18] border-l border-ink-ghost flex flex-col items-center justify-between py-3 px-3">
          <div
            className="w-2 h-2 bg-bg-void"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.06)" }}
            aria-hidden="true"
          />
          <div
            className={`font-pixel text-[10px] tracking-widest transition-colors ${
              transferring ? "text-glow-amber" : "text-ink-mute group-hover:text-glow-cyan"
            }`}
          >
            {transferring ? "↓↓↓" : "GET"}
          </div>
          <div className="font-pixel text-[7px] tracking-widest text-ink-mute" aria-hidden="true">
            91K · PDF
          </div>
        </div>

        {/* hover lift + accent border */}
        <style jsx>{`
          .floppy {
            border: 1px solid rgba(34, 211, 238, 0.25);
            background: #0a0a14;
            border-radius: 4px;
            transform: rotate(-1.5deg);
            transition:
              transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
              box-shadow 0.32s cubic-bezier(0.2, 0.8, 0.2, 1),
              border-color 0.2s;
            will-change: transform;
            box-shadow: 0 6px 0 -2px rgba(0, 0, 0, 0.6);
          }
          .floppy:hover,
          .floppy:focus-visible {
            transform: rotate(0deg) translateY(-3px);
            border-color: rgba(34, 211, 238, 0.7);
            box-shadow:
              0 0 0 1px rgba(34, 211, 238, 0.5),
              0 0 24px rgba(34, 211, 238, 0.25),
              0 10px 0 -2px rgba(0, 0, 0, 0.7);
          }
          @media (prefers-reduced-motion: reduce) {
            .floppy,
            .floppy:hover,
            .floppy:focus-visible {
              transform: none;
            }
          }
          @keyframes floppy-shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </a>
    </section>
  );
}
