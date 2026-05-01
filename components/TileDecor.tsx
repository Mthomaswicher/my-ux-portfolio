"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

const ACCENT_HEX: Record<Project["accent"], string> = {
  cyan: "#22d3ee",
  magenta: "#ff2bd6",
  lime: "#a3e635",
  amber: "#fbbf24",
  rose: "#fb7185",
};

/**
 * Decorative overlay that sits on top of a project tile's screenshot
 * area. Adds floating tag chips, a small mascot glyph, and a few
 * accent-colored sparkles so each tile reads more like a designed
 * graphic than a plain screenshot.
 */
export default function TileDecor({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const accent = ACCENT_HEX[project.accent] ?? ACCENT_HEX.cyan;
  const tags = project.tags ?? [];
  const mascot = project.mascot;

  // Static-but-pleasant scatter — no random so SSR matches client.
  const sparkles = [
    { left: "12%", top: "18%", glyph: "✦", size: 11 },
    { left: "82%", top: "62%", glyph: "✶", size: 10 },
    { left: "8%", top: "78%", glyph: "●", size: 6 },
    { left: "60%", top: "12%", glyph: "▲", size: 8 },
    { left: "92%", top: "22%", glyph: "◆", size: 7 },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none z-10"
      aria-hidden="true"
    >
      {/* Tag chips, top-right */}
      {tags.length > 0 && (
        <div className="absolute top-2.5 right-2.5 flex flex-wrap gap-1.5 justify-end max-w-[60%]">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              className="font-mono text-[10px] tracking-widest px-2 py-1 rounded-full border backdrop-blur-sm"
              style={{
                borderColor: `${accent}66`,
                color: "#fff",
                background: "rgba(10,10,20,0.55)",
                boxShadow: `0 0 0 1px ${accent}33, 0 0 8px ${accent}22`,
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      )}

      {/* Mascot glyph, bottom-left, peeks + bobs */}
      {mascot && (
        <motion.span
          className="absolute font-pixel select-none"
          style={{
            left: 12,
            bottom: 10,
            color: accent,
            fontSize: 22,
            textShadow: `0 0 8px ${accent}, 0 0 18px ${accent}66`,
            background: "rgba(10,10,20,0.45)",
            padding: "4px 8px",
            borderRadius: 4,
            border: `1px solid ${accent}55`,
          }}
          animate={
            reduce
              ? undefined
              : { y: [0, -3, 0], rotate: [0, -3, 0, 3, 0] }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {mascot}
        </motion.span>
      )}

      {/* Sparkle field */}
      {sparkles.map((s, i) => (
        <motion.span
          key={i}
          className="absolute font-pixel"
          style={{
            left: s.left,
            top: s.top,
            color: accent,
            fontSize: s.size,
            textShadow: `0 0 6px ${accent}`,
            opacity: 0.55,
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.35, 0.85, 0.35], scale: [1, 1.15, 1] }
          }
          transition={{
            duration: 2.6 + i * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        >
          {s.glyph}
        </motion.span>
      ))}

      {/* Soft accent vignette pulled from the corner where the mascot lives */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 88%, ${accent}24, transparent 55%)`,
        }}
      />
    </div>
  );
}
