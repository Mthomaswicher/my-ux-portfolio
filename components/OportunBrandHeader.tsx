import Image from "next/image";
import HoloDisplay from "./HoloDisplay";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Oportun-branded case-study header. Replaces the standard arcade header
 * for studies that opt in via brand: "oportun".
 *
 * - Uses Oportun's actual brand palette (#00C859 lime + #6CDB8B mint
 *   highlight, black text on a soft cream surface).
 * - Drops the Oportun mark above the title with the company name and a
 *   "Originally designed at" eyebrow so the visual reference is explicit.
 * - Keeps the metadata block + hero reel from the standard header so the
 *   layout still threads into the rest of the page.
 */
export default function OportunBrandHeader({ study }: { study: CaseStudy }) {
  const heroScreens = study.heroScreens ?? (study.hero ? [study.hero] : []);
  return (
    <header className="mb-10 md:mb-12">
      <div
        className="relative overflow-hidden p-6 sm:p-8 md:p-10"
        style={{
          background:
            "linear-gradient(180deg, #F4FBF1 0%, #E8F7E0 100%)",
          color: "#0A1A0A",
          border: "1px solid rgba(0,200,89,0.25)",
          borderRadius: 4,
          boxShadow: "0 12px 40px rgba(0,200,89,0.18)",
        }}
      >
        {/* soft brand wash */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(108,219,139,0.55), rgba(0,200,89,0) 70%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/images/case-studies/oportun-homepage-widgets/oportun-mark.svg"
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              style={{ color: "#0A1A0A" }}
              unoptimized
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#00871D" }}
            >
              Originally designed at Oportun
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
              style={{
                background: "#00871D",
                color: "#FFFFFF",
                borderRadius: 999,
                letterSpacing: "0.18em",
              }}
            >
              {study.status}
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "#1F4D2A" }}
            >
              {study.org}
            </span>
          </div>

          <h1
            className="leading-[1.05] mb-4 sm:mb-5"
            style={{
              fontFamily:
                "var(--font-garamond), Georgia, ui-serif, serif",
              fontSize: "clamp(2.5rem, 9vw, 4.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "#0A1A0A",
            }}
          >
            {study.title}
          </h1>
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: "#2B4632" }}
          >
            {study.tagline}
          </p>

          <dl
            className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-md"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,200,89,0.22)",
            }}
          >
            {[
              { label: "Role", value: study.role },
              { label: "Team", value: study.team },
              { label: "When", value: study.timeframe },
              { label: "Tools", value: study.tools },
            ].map((row) => (
              <div key={row.label}>
                <dt
                  className="font-mono text-[10px] uppercase tracking-widest mb-1"
                  style={{ color: "#00871D" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="text-[12.5px] leading-snug break-words"
                  style={{ color: "#1F2C1F" }}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {heroScreens.length > 0 && (
        <div className="mt-8">
          <div
            className="p-1 relative aspect-[16/9]"
            style={{
              background: "#0A1A0A",
              border: "1px solid rgba(0,200,89,0.35)",
              boxShadow: "0 0 0 1px rgba(0,200,89,0.18), 0 0 28px rgba(0,200,89,0.18)",
            }}
          >
            <HoloDisplay
              screens={heroScreens}
              alt={`${study.title} screens`}
              accent="lime"
              fit="cover"
              showCounter
              priority
            />
          </div>
        </div>
      )}
    </header>
  );
}
