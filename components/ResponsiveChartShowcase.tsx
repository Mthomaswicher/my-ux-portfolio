"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Live demo of the responsive Submissions chart from Figma. The chart
 * adapts to its container width via three breakpoints (xs/sm/lg). The
 * surrounding wrapper is resizable via a slider AND a draggable handle on
 * the right edge so visitors can stretch and shrink it to see the chart
 * re-layout in real time.
 */

const SERIES: Array<{
  name: string;
  color: string;
  dashed?: boolean;
  values: number[];
}> = [
  {
    name: "Purchases",
    color: "#0E1B3F",
    values: [38, 46, 52, 58, 62, 78, 94, 108, 118],
  },
  {
    name: "Conforming Subs",
    color: "#3246D3",
    values: [56, 72, 84, 95, 105, 122, 138, 156, 168],
  },
  {
    name: "All Subs",
    color: "#7A98E8",
    dashed: true,
    values: [70, 92, 108, 124, 138, 158, 175, 192, 205],
  },
];

const X_LABELS = [
  "1/1",
  "1/15",
  "2/5",
  "2/26",
  "3/5",
  "3/26",
  "4/2",
  "4/30",
  "5/7",
];

const Y_TICKS = [50, 100, 150, 200];

const MIN_WIDTH = 280;
const MAX_WIDTH = 880;

export default function ResponsiveChartShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  // Container width the user is "designing" against (drag/slider controlled)
  const [containerWidth, setContainerWidth] = useState(720);
  // Actual chart width measured by ResizeObserver — drives the breakpoint
  // since the container can also be capped by the parent column.
  const [measured, setMeasured] = useState(720);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setMeasured(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  function startResize(e: React.PointerEvent) {
    e.preventDefault();
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startWidthRef.current = containerWidth;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }
  function moveResize(e: React.PointerEvent) {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    const next = Math.max(
      MIN_WIDTH,
      Math.min(MAX_WIDTH, startWidthRef.current + delta),
    );
    setContainerWidth(next);
  }
  function endResize() {
    draggingRef.current = false;
  }

  const tier = breakpointFor(measured);

  return (
    <div className="space-y-5">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-[12px] text-ink-dim">
        <label className="flex items-center gap-3 flex-1">
          <span className="text-ink-mute uppercase tracking-widest text-[10px]">
            Width
          </span>
          <input
            type="range"
            min={MIN_WIDTH}
            max={MAX_WIDTH}
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="flex-1 accent-neon-cyan"
            aria-label="Resize chart container"
          />
          <span className="font-mono text-[12px] text-glow-cyan tabular-nums">
            {Math.round(measured)}px
          </span>
        </label>
        <div className="flex items-center gap-2 text-ink-mute uppercase tracking-widest text-[10px]">
          <span>Breakpoint</span>
          <span
            className={`px-2 py-0.5 font-pixel ${
              tier === "lg"
                ? "text-glow-lime"
                : tier === "sm"
                  ? "text-glow-amber"
                  : "text-glow-magenta"
            }`}
            style={{ background: "#0a0a18" }}
          >
            {tier.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Resizable container */}
      <div
        className="relative mx-auto"
        style={{ width: `min(100%, ${containerWidth}px)` }}
      >
        <div
          ref={wrapRef}
          className="relative bg-white rounded-[10px] overflow-hidden"
          style={{
            boxShadow: "0 8px 24px rgba(14,27,63,0.12)",
            border: "1px solid #DEE5EB",
          }}
        >
          <Chart width={measured} tier={tier} />
        </div>

        {/* Draggable right-edge handle (desktop / fine-pointer) */}
        <button
          type="button"
          aria-label="Drag to resize chart"
          onPointerDown={startResize}
          onPointerMove={moveResize}
          onPointerUp={endResize}
          onPointerCancel={endResize}
          className="hidden md:flex absolute right-[-12px] top-1/2 -translate-y-1/2 w-6 h-16 items-center justify-center cursor-ew-resize touch-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
          style={{ background: "transparent" }}
        >
          <span
            aria-hidden="true"
            className="block w-1 h-12 rounded-full"
            style={{
              background: "#22d3ee",
              boxShadow: "0 0 8px rgba(34,211,238,0.6)",
            }}
          />
        </button>
      </div>

      <p className="font-mono text-[12px] text-ink-mute leading-relaxed text-center">
        Drag the cyan handle on the right edge — or use the slider — to shrink
        and grow the chart. Watch the axis density, label rotation, and legend
        collapse as it crosses 720px and 440px.
      </p>
    </div>
  );
}

/* ───────────────────────────────────────────────────────────────────────── */

type Tier = "xs" | "sm" | "lg";

function breakpointFor(width: number): Tier {
  // Below 440px the full legend labels ("Conforming Subs") don't fit
  // even as a chip-stack — fall back to abbreviated chips.
  if (width < 440) return "xs";
  // The full top-right legend only fits cleanly past ~720px; below that
  // the chip-stack with full labels reads better than crowding the title row.
  if (width < 720) return "sm";
  return "lg";
}

function Chart({ width, tier }: { width: number; tier: Tier }) {
  // Chip-stack legend on xs/sm goes below the title, so the top padding
  // grows to fit a title row + legend row. lg keeps the legend top-right
  // on the same row as the title.
  const useStackedLegend = tier !== "lg";
  const padding = {
    top: tier === "xs" ? 64 : tier === "sm" ? 72 : 56,
    right: tier === "xs" ? 12 : 24,
    bottom: tier === "xs" ? 28 : 36,
    left: tier === "xs" ? 36 : tier === "sm" ? 44 : 56,
  };
  const height = tier === "xs" ? 220 : tier === "sm" ? 300 : 360;
  const innerW = Math.max(40, width - padding.left - padding.right);
  const innerH = height - padding.top - padding.bottom;
  const yMin = 0;
  const yMax = 220;

  function xFor(i: number) {
    if (X_LABELS.length <= 1) return padding.left;
    return padding.left + (i / (X_LABELS.length - 1)) * innerW;
  }
  function yFor(v: number) {
    return padding.top + (1 - (v - yMin) / (yMax - yMin)) * innerH;
  }

  // Decide which x-axis labels to show based on tier
  const visibleXIndices = (() => {
    if (tier === "lg") return X_LABELS.map((_, i) => i);
    if (tier === "sm") return X_LABELS.map((_, i) => i).filter((i) => i % 2 === 0);
    // xs: just first and last
    return [0, X_LABELS.length - 1];
  })();

  const visibleYTicks =
    tier === "xs" ? [50, 100, 150, 200] : tier === "sm" ? [50, 100, 150, 200] : Y_TICKS;

  return (
    <svg
      viewBox={`0 0 ${Math.max(width, MIN_WIDTH)} ${height}`}
      width="100%"
      height={height}
      role="img"
      aria-label="Submissions over time, three series: Purchases, Conforming Subs, All Subs"
      style={{
        fontFamily:
          "var(--font-roboto), -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <text
        x={padding.left}
        y={tier === "xs" ? 22 : tier === "sm" ? 26 : 32}
        fill="#0E1B3F"
        fontSize={tier === "xs" ? 16 : tier === "sm" ? 18 : 22}
        fontWeight={700}
        letterSpacing="-0.2"
      >
        Submissions
      </text>

      {/* Legend — top-right on lg, chip stack below title on xs/sm.
          Uses fixed slots and start-anchored text so the dot sits before
          the label, never inside it. Slot widths sized to fit the widest
          item ("Conforming Subs"). */}
      {!useStackedLegend ? (
        (() => {
          const slot = 130;
          const startX = width - padding.right - slot * SERIES.length;
          return (
            <g transform={`translate(${startX}, 32)`}>
              {SERIES.map((s, i) => (
                <g key={s.name} transform={`translate(${i * slot}, 0)`}>
                  <circle cx={4} cy={-4} r={4} fill={s.color} />
                  <text
                    x={14}
                    y={0}
                    fill="#0E1B3F"
                    fontSize={12}
                    fontWeight={500}
                  >
                    {s.name}
                  </text>
                </g>
              ))}
            </g>
          );
        })()
      ) : (
        <g transform={`translate(${padding.left}, ${tier === "xs" ? 42 : 50})`}>
          {SERIES.map((s, i) => {
            const slot = tier === "xs" ? 70 : 116;
            return (
              <g key={s.name} transform={`translate(${i * slot}, 0)`}>
                <circle cx={4} cy={-4} r={3} fill={s.color} />
                <text
                  x={12}
                  y={0}
                  fill="#0E1B3F"
                  fontSize={tier === "xs" ? 10 : 11}
                  fontWeight={500}
                >
                  {tier === "xs" ? abbreviate(s.name) : s.name}
                </text>
              </g>
            );
          })}
        </g>
      )}

      {/* Y-axis grid + labels */}
      {visibleYTicks.map((t) => {
        const y = yFor(t);
        return (
          <g key={t}>
            <line
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="#E8EDF3"
              strokeWidth={1}
            />
            <text
              x={padding.left - 8}
              y={y + 4}
              textAnchor="end"
              fill="#636366"
              fontSize={tier === "xs" ? 9 : tier === "sm" ? 10 : 11}
            >
              {tier === "lg" ? `$${t},000` : `$${t}K`}
            </text>
          </g>
        );
      })}

      {/* Series lines */}
      {SERIES.map((s) => {
        const d = s.values
          .map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`)
          .join(" ");
        return (
          <path
            key={s.name}
            d={d}
            fill="none"
            stroke={s.color}
            strokeWidth={tier === "xs" ? 2 : 2.5}
            strokeDasharray={s.dashed ? "6 5" : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}

      {/* X-axis labels */}
      {visibleXIndices.map((i) => (
        <text
          key={i}
          x={xFor(i)}
          y={height - 10}
          textAnchor="middle"
          fill="#636366"
          fontSize={tier === "xs" ? 9 : 11}
        >
          {X_LABELS[i]}
        </text>
      ))}
    </svg>
  );
}

function abbreviate(name: string): string {
  if (name === "Conforming Subs") return "Conf.";
  if (name === "All Subs") return "All";
  return name;
}
