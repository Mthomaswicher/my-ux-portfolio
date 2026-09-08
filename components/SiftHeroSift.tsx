"use client";

import { useCallback, useRef, useState } from "react";
import { withBase } from "@/lib/path";

/**
 * Interactive hero for the Sift case study: the hostile recipe page and the
 * sifted card fill the whole frame, split by a draggable edge. The handle is
 * the product's own three-grain mark in ember, and the microcopy invites the
 * one gesture the product is about. Pointer drag anywhere on the frame moves
 * the edge; a visually-hidden range input carries keyboard and screen-reader
 * use. Full-bleed on purpose: no ground behind the content, just the two
 * states of the same page.
 */
export default function SiftHeroSift() {
  const [pos, setPos] = useState(50);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const posFromClientX = useCallback((clientX: number) => {
    const el = frameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(96, Math.max(4, pct)));
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as Element).setPointerCapture?.(e.pointerId);
      posFromClientX(e.clientX);
    },
    [posFromClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      posFromClientX(e.clientX);
    },
    [posFromClientX],
  );

  const endDrag = useCallback(() => {
    dragging.current = false;
  }, []);

  const before = withBase("/images/case-studies/sift/hero-before.webp");
  const after = withBase("/images/case-studies/sift/hero-after.webp");

  const chip: React.CSSProperties = {
    color: "#101014",
    background: "rgba(248,248,250,0.88)",
    border: "1px solid #E4E4E7",
    borderRadius: 6,
    padding: "4px 10px",
  };

  return (
    <div
      ref={frameRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      data-sift-slider
      className="relative overflow-hidden select-none aspect-[720/1458] max-w-[460px] mx-auto touch-pan-y"
      style={{
        border: "1px solid #E4E4E7",
        borderRadius: 8,
        boxShadow: "0 12px 36px rgba(16,16,20,0.12)",
        cursor: "ew-resize",
        background: "#101014",
      }}
    >
      <img
        src={before}
        alt="A recipe blog with a banner and a life story above the recipe"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <img
        src={after}
        alt="The same recipe in Sift: title, source, photo, and a Cook this button"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />

      {/* the edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0"
        style={{
          left: `${pos}%`,
          width: 2,
          marginLeft: -1,
          background: "#FFFFFF",
          boxShadow: "0 0 0 1px rgba(16,16,20,0.35)",
        }}
      />
      {/* the three-grain handle, ember, riding the edge */}
      <div
        aria-hidden="true"
        data-sift-handle
        className="absolute"
        style={{
          left: `${pos}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 38,
          height: 74,
          borderRadius: 8,
          background: "#FFFFFF",
          border: "1px solid #71717A",
          boxShadow: "0 4px 14px rgba(16,16,20,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <span style={{ width: 10, height: 10, borderRadius: 10, background: "#C2181D" }} />
        <span style={{ width: 8, height: 8, borderRadius: 8, background: "#C2181D" }} />
        <span style={{ width: 6, height: 6, borderRadius: 6, background: "#C2181D" }} />
      </div>

      {/* microcopy chips, over the imagery */}
      <span
        aria-hidden="true"
        data-sift-label
        className="absolute left-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={chip}
      >
        The page
      </span>
      <span
        aria-hidden="true"
        data-sift-label
        className="absolute right-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={chip}
      >
        The recipe
      </span>
      <span
        aria-hidden="true"
        data-sift-hint
        className="absolute left-1/2 -translate-x-1/2 top-3 font-mono text-[10px] uppercase tracking-[0.18em]"
        style={chip}
      >
        Drag to sift
      </span>

      {/* keyboard + AT control */}
      <input
        type="range"
        min={4}
        max={96}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare the original recipe page with the sifted card"
        className="absolute inset-x-0 bottom-0 w-full opacity-0 h-8 cursor-ew-resize"
      />
    </div>
  );
}
