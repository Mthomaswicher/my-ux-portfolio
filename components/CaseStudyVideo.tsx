"use client";

import { useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/path";

export default function CaseStudyVideo({
  src,
  poster,
  alt,
  caption,
}: {
  src: string;
  poster?: string;
  alt: string;
  caption?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Only auto-play when visible (saves CPU/battery)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (paused || reduced || !inView) {
      el.pause();
    } else {
      // play() returns a promise; ignore rejections (e.g. autoplay blocked)
      el.play().catch(() => {});
    }
  }, [paused, reduced, inView]);

  return (
    <figure className="my-2">
      <div className="cartridge p-1 bg-bg-deep relative group/video">
        <video
          ref={ref}
          src={withBase(src)}
          poster={poster ? withBase(poster) : undefined}
          loop
          muted
          playsInline
          preload="metadata"
          aria-label={alt}
          className="w-full h-auto block"
        />

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? "Play demo" : "Pause demo"}
          aria-pressed={paused}
          className="absolute top-2 right-2 cartridge px-2 py-1 font-pixel text-[9px] tracking-widest text-glow-cyan opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
        >
          {paused ? (
            <>
              <span aria-hidden="true">▶ </span>PLAY
            </>
          ) : (
            <>
              <span aria-hidden="true">⏸ </span>PAUSE
            </>
          )}
        </button>

        {reduced && !paused && (
          <div
            className="absolute inset-0 flex items-end p-3 pointer-events-none"
            aria-hidden="true"
          >
            <span className="font-pixel text-[9px] tracking-widest text-ink-mute bg-bg-void/80 px-2 py-1">
              MOTION DISABLED · TAP PLAY TO START
            </span>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="mt-2 font-mono text-[11.5px] text-ink-mute uppercase tracking-widest">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
