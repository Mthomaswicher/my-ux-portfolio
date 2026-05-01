"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";

const ACCENT_HEX = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
} as const;

/**
 * Compact cartridge visual — used for the floating drag ghost and the
 * "slotted into console" state. Designed at ~240×88 with the hero on the
 * left and label text on the right, like an actual game cartridge.
 */
export default function CartridgeSprite({
  project,
  width = 240,
}: {
  project: Project;
  width?: number;
}) {
  const accent = ACCENT_HEX[project.accent] ?? ACCENT_HEX.cyan;
  const screen = project.hero || project.screens?.[0];

  return (
    <div
      className="relative select-none"
      style={{
        width,
        background: "#0a0a18",
        border: `2px solid ${accent}`,
        boxShadow: `0 0 0 1px ${accent}55, 0 0 18px ${accent}55, inset 0 0 12px ${accent}22`,
      }}
    >
      {/* connector pins along the bottom */}
      <div
        className="absolute -bottom-[6px] left-2 right-2 h-[6px] flex gap-[3px]"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 bg-ink-mute"
            style={{ background: i % 2 === 0 ? "#9595b6" : "#5a5a78" }}
          />
        ))}
      </div>

      <div className="flex items-stretch p-1.5 gap-2">
        <div
          className="relative flex-shrink-0 bg-bg-void overflow-hidden"
          style={{ width: 80, height: 60, borderRadius: 0 }}
        >
          {screen && (
            <Image
              src={screen}
              alt=""
              fill
              sizes="80px"
              className="object-cover"
            />
          )}
          {/* scanlines */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.4) 0px, rgba(0,0,0,0.4) 1px, transparent 1px, transparent 2px)",
              opacity: 0.5,
            }}
          />
        </div>
        <div className="flex flex-col justify-between min-w-0 py-0.5">
          <div className="font-pixel text-[7px] tracking-widest text-ink-mute">
            NO. {project.no}
          </div>
          <div
            className="font-display text-[16px] leading-none truncate"
            style={{ color: accent }}
          >
            {project.title}
          </div>
          <div className="font-mono text-[7px] uppercase tracking-widest text-ink-mute truncate">
            {project.org}
          </div>
        </div>
      </div>
    </div>
  );
}
