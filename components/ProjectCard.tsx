import type { CSSProperties } from "react";
import type { Project } from "@/lib/projects";
import ProductReel from "./ProductReel";
import SfxLink from "./SfxLink";

const STATUS_STYLES: Record<Project["status"], string> = {
  SHIPPED: "text-glow-lime",
  "IN PROGRESS": "text-glow-amber",
  WON: "text-glow-magenta",
  RESEARCH: "text-glow-cyan",
};

const ACCENT_HEX: Record<Project["accent"], string> = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
};

const ACCENT_GLOW: Record<Project["accent"], string> = {
  cyan: "hover:shadow-neon-cyan",
  magenta: "hover:shadow-neon-magenta",
  lime: "hover:shadow-neon-lime",
  amber: "hover:shadow-neon-amber",
  rose: "hover:shadow-neon-magenta",
};

const ACCENT_TEXT: Record<Project["accent"], string> = {
  cyan: "text-glow-cyan",
  magenta: "text-glow-magenta",
  lime: "text-glow-lime",
  amber: "text-glow-amber",
  rose: "text-glow-magenta",
};

export function ProjectCardBody({ project }: { project: Project }) {
  const reelAccent =
    project.accent === "rose"
      ? "magenta"
      : (project.accent as "cyan" | "magenta" | "lime" | "amber");
  const accentHex = ACCENT_HEX[project.accent] ?? ACCENT_HEX.cyan;

  const screens =
    project.screens && project.screens.length > 0
      ? project.screens
      : project.hero
        ? [project.hero]
        : [];

  return (
    <div className="p-2 sm:p-3">
      {/* Cartridge shell */}
      <div
        className="relative"
        style={{
          background:
            "linear-gradient(180deg, #25253a 0%, #14141f 60%, #0a0a14 100%)",
          borderRadius: "14px 14px 4px 4px",
          padding: "10px 10px 0 10px",
          boxShadow: [
            `inset 0 1px 0 rgba(255,255,255,0.07)`,
            `inset 0 0 0 1px ${accentHex}26`,
            `0 6px 0 -2px rgba(0,0,0,0.5)`,
          ].join(", "),
        }}
      >
        {/* Top grip ribs (NES-style finger grip) */}
        <div className="flex flex-col gap-[3px] mb-3 px-1" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-[3px]"
              style={{
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(255,255,255,0.05) 100%)",
                borderRadius: 2,
              }}
            />
          ))}
        </div>

        {/* Label sticker */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#0a0a14",
            borderRadius: 2,
            boxShadow: [
              `inset 0 0 0 1px ${accentHex}55`,
              `0 0 0 2px rgba(0,0,0,0.55)`,
              `0 0 18px ${accentHex}1f`,
            ].join(", "),
          }}
        >
          {/* Label header — title bar */}
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{
              background: `linear-gradient(90deg, ${accentHex}33, ${accentHex}0d 60%, transparent)`,
              borderBottom: `1px solid ${accentHex}33`,
            }}
          >
            <span className="font-pixel text-[9px] tracking-widest text-ink-mute">
              NO. {project.no}
            </span>
            <span
              className={`font-pixel text-[9px] tracking-widest ${STATUS_STYLES[project.status]}`}
            >
              ★ {project.status}
            </span>
          </div>

          {/* Hero / interactive screen */}
          {screens.length > 0 && (
            <div className="relative bg-bg-void overflow-hidden aspect-[16/10]">
              <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                <ProductReel
                  screens={screens}
                  alt={project.title}
                  accent={reelAccent}
                />
              </div>
            </div>
          )}

          {/* Label footer — title block */}
          <div
            className="px-3 py-3"
            style={{ borderTop: `1px solid ${accentHex}33` }}
          >
            <h3
              className={`font-display text-[26px] sm:text-[30px] leading-none mb-1 ${ACCENT_TEXT[project.accent]}`}
            >
              {project.title}
            </h3>
            <div className="font-mono text-[10px] uppercase tracking-widest text-ink-mute">
              {project.org}
            </div>
          </div>
        </div>

        {/* Bottom connector pins */}
        <div
          className="flex gap-[2px] px-1 pt-2 pb-1"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="flex-1 h-[8px]"
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(180deg, #c8c8d6 0%, #6e6e88 100%)"
                    : "linear-gradient(180deg, #4a4a60 0%, #1a1a28 100%)",
                boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.5)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Below-cartridge metadata */}
      <div className="px-1 pt-4">
        <p className="font-mono text-[13px] leading-relaxed text-ink-dim mb-4 min-h-[3.6em]">
          {project.blurb}
        </p>

        <dl className="grid grid-cols-[78px_1fr] gap-y-1.5 font-mono text-[11.5px] text-ink-dim border-t border-ink-ghost pt-3">
          <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">
            Role
          </dt>
          <dd>{project.role}</dd>
          <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">
            Team
          </dt>
          <dd>{project.team}</dd>
          <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">
            When
          </dt>
          <dd>{project.timeframe}</dd>
          {project.tools && (
            <>
              <dt className="text-ink-mute uppercase tracking-widest text-[10px] pt-0.5">
                Tools
              </dt>
              <dd>{project.tools}</dd>
            </>
          )}
        </dl>

        <div className="mt-4 flex items-center gap-2 font-pixel text-[10px] tracking-widest text-ink-mute group-hover:text-glow-cyan transition-colors">
          {project.external ? "EXTERNAL ↗" : "PRESS START →"}
        </div>
      </div>
    </div>
  );
}

export const cardClasses = (project: Project) =>
  `tilt-card group block rounded-[6px] ${ACCENT_GLOW[project.accent]} transition-shadow`;

export const cardStyleFor = (project: Project): CSSProperties => ({
  ["--card-tilt" as string]: `${project.tilt ?? 0}deg`,
});

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <SfxLink
      href={project.href}
      external={project.external}
      hoverSfx="hover"
      clickSfx="select"
      className={cardClasses(project)}
      style={cardStyleFor(project)}
    >
      <ProjectCardBody project={project} />
    </SfxLink>
  );
}
