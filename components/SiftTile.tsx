"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { withBase } from "@/lib/path";

/**
 * Interactive home-grid tile for Sift, in the product's own system: paper
 * #F8F8FA, ink #101014, ember #C2181D on the mark and nowhere else. A 3D
 * phone wearing the shipped recipe page tilts toward the pointer, and the
 * three-grain mark sifts on a loop. Motion stops for prefers-reduced-motion.
 */
export default function SiftTile() {
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced) return;
      const el = phoneRef.current;
      if (!el) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transition = "transform 90ms linear";
      el.style.transform = `perspective(900px) rotateX(${(-ny * 14).toFixed(2)}deg) rotateY(${(nx * 18).toFixed(2)}deg) rotateZ(-3deg)`;
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.transition = "transform 450ms cubic-bezier(0.2, 0, 0, 1)";
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) rotateZ(-3deg)";
  }, []);

  const screen = withBase("/images/case-studies/sift/03-shipped-recipe.webp");
  const wordmark = withBase("/images/case-studies/sift/wordmark-ink.svg");

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#F8F8FA" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <style>{`
        @keyframes sift-grain-drop {
          0%, 62%, 100% { transform: translateY(0); }
          72% { transform: translateY(-9px); }
          84% { transform: translateY(1px); }
        }
        @keyframes sift-phone-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-7px); }
        }
        .sift-tile-grain { animation: sift-grain-drop 2.8s cubic-bezier(0.2, 0, 0, 1) infinite; }
        .sift-tile-float { animation: sift-phone-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .sift-tile-grain, .sift-tile-float { animation: none; }
        }
      `}</style>

      {/* the mark, sifting */}
      <div className="absolute left-[9%] top-[16%]" aria-hidden="true">
        <div className="relative" style={{ width: 74, height: 74 }}>
          <span
            className="sift-tile-grain absolute rounded-full"
            style={{ left: 0, top: 0, width: 17, height: 17, background: "#C2181D" }}
          />
          <span
            className="sift-tile-grain absolute rounded-full"
            style={{ left: 27, top: 27, width: 13, height: 13, background: "#C2181D", animationDelay: "0.18s" }}
          />
          <span
            className="sift-tile-grain absolute rounded-full"
            style={{ left: 51, top: 52, width: 10, height: 10, background: "#C2181D", animationDelay: "0.36s" }}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wordmark}
          alt=""
          draggable={false}
          className="mt-3 block"
          style={{ width: 92, height: "auto" }}
        />
        <div
          className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ color: "#6E6E7A" }}
        >
          Recipe capture
        </div>
      </div>

      {/* the 3D phone */}
      <div className="sift-tile-float absolute right-[7%] top-[8%] bottom-[-14%] w-[42%]">
        <div
          ref={phoneRef}
          className="relative h-full"
          style={{
            transform: "perspective(900px) rotateZ(-3deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: 22,
              border: "7px solid #101014",
              background: "#101014",
              boxShadow:
                "0 24px 48px rgba(16,16,20,0.28), 0 4px 12px rgba(16,16,20,0.18)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={screen}
              alt="The Sift recipe page on an iPhone"
              draggable={false}
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
      </div>

      {/* hairline frame, the product's rule */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ border: "1px solid #E4E4E7" }}
      />
    </div>
  );
}
