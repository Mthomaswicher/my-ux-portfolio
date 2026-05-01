"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export type SignatureCanvasHandle = {
  toDataURL: () => string;
  clear: () => void;
  isEmpty: () => boolean;
};

const COLOR_HEX: Record<string, string> = {
  magenta: "#ff2bd6",
  cyan: "#22d3ee",
  lime: "#a3e635",
  amber: "#fbbf24",
};

const SignatureCanvas = forwardRef<
  SignatureCanvasHandle,
  { color: string; onDirty?: () => void }
>(function SignatureCanvas({ color, onDirty }, ref) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [empty, setEmpty] = useState(true);

  useImperativeHandle(
    ref,
    () => ({
      toDataURL: () => {
        const c = canvasRef.current;
        if (!c) return "";
        return c.toDataURL("image/png");
      },
      clear: () => {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, c.width, c.height);
        paintBackground(ctx, c.width, c.height);
        setEmpty(true);
      },
      isEmpty: () => empty,
    }),
    [empty]
  );

  function paintBackground(ctx: CanvasRenderingContext2D, w: number, h: number) {
    ctx.fillStyle = "#08081a";
    ctx.fillRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = "rgba(255,255,255,0.04)";
    ctx.lineWidth = 1;
    const step = 16;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x + 0.5, 0);
      ctx.lineTo(x + 0.5, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y + 0.5);
      ctx.lineTo(w, y + 0.5);
      ctx.stroke();
    }
  }

  function ensureContext() {
    const c = canvasRef.current;
    if (!c) return null;
    const ctx = c.getContext("2d");
    if (!ctx) return null;
    if (c.dataset.painted !== "1") {
      paintBackground(ctx, c.width, c.height);
      c.dataset.painted = "1";
    }
    return ctx;
  }

  function pointer(e: React.PointerEvent<HTMLCanvasElement>) {
    const c = canvasRef.current!;
    const rect = c.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * c.width,
      y: ((e.clientY - rect.top) / rect.height) * c.height,
    };
  }

  function down(e: React.PointerEvent<HTMLCanvasElement>) {
    e.preventDefault();
    const ctx = ensureContext();
    if (!ctx) return;
    drawing.current = true;
    last.current = pointer(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = COLOR_HEX[color] || "#22d3ee";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = COLOR_HEX[color] || "#22d3ee";
    ctx.shadowBlur = 8;
    canvasRef.current?.setPointerCapture(e.pointerId);
  }

  function move(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = ensureContext();
    if (!ctx || !last.current) return;
    const p = pointer(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (empty) {
      setEmpty(false);
      onDirty?.();
    }
  }

  function up(e: React.PointerEvent<HTMLCanvasElement>) {
    drawing.current = false;
    last.current = null;
    canvasRef.current?.releasePointerCapture(e.pointerId);
  }

  return (
    <div className="relative w-full max-w-[600px]">
      <canvas
        ref={canvasRef}
        width={600}
        height={360}
        role="img"
        aria-label={
          empty
            ? "Empty signature canvas. Click and drag with your pointer to draw your mark."
            : "Signature canvas with your drawing. Use the Clear button to start over."
        }
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        className="block w-full aspect-[600/360] cartridge cursor-crosshair touch-none"
      />
      {empty && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="font-pixel text-[9px] sm:text-[10px] tracking-widest text-ink-mute">
            ░ DRAW YOUR MARK ░
          </div>
        </div>
      )}
    </div>
  );
});

export default SignatureCanvas;
