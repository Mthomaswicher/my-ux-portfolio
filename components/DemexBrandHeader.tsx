import Image from "next/image";
import HoloDisplay from "./HoloDisplay";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Demex Group-branded case-study header. Pulls the company's actual
 * palette from thedemexgroup.com:
 *   - #501AFF  electric purple (primary)
 *   - #191993  deep navy (the "--blue" token; wordmark color)
 *   - #0050BD  royal blue
 *   - #1A1A23  near-black text
 *   - #FAFAFA  off-white surface
 * Sits on a dark navy → black surface so the electric purple lights up
 * the way it does on their site.
 */
export default function DemexBrandHeader({ study }: { study: CaseStudy }) {
  const heroScreens = study.heroScreens ?? (study.hero ? [study.hero] : []);
  return (
    <header className="mb-10 md:mb-12">
      <div
        className="relative overflow-hidden p-6 sm:p-8 md:p-10"
        style={{
          background:
            "linear-gradient(180deg, #0E0E1F 0%, #14143A 60%, #1A1A4D 100%)",
          color: "#F4F4FB",
          border: "1px solid rgba(80,26,255,0.35)",
          borderRadius: 4,
          boxShadow:
            "0 16px 48px rgba(80,26,255,0.18), 0 0 0 1px rgba(25,25,147,0.4)",
        }}
      >
        {/* electric purple wash, top-right */}
        <div
          aria-hidden="true"
          className="absolute -top-16 -right-16 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(80,26,255,0.45), rgba(80,26,255,0) 65%)",
            filter: "blur(2px)",
          }}
        />
        {/* navy wash, bottom-left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-20 -left-16 w-[340px] h-[340px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(25,25,147,0.55), rgba(25,25,147,0) 65%)",
          }}
        />
        {/* faint topo grid in the background, echoing the Climate Center map */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(80,26,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(80,26,255,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            opacity: 0.6,
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/images/case-studies/demex-climate-center/demex-mark.svg"
              alt=""
              aria-hidden="true"
              width={140}
              height={30}
              className="h-7 w-auto"
              style={{
                /* The wordmark fills with #191993; on dark we tint it
                   so it stays legible. The Image is loaded as-is and
                   we color-correct via filter for SSR safety. */
                filter: "brightness(2.4) saturate(1.4)",
              }}
              unoptimized
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#A89DFF" }}
            >
              The Demex Group · Climate-risk
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
              style={{
                background: "#501AFF",
                color: "#FFFFFF",
                borderRadius: 999,
                letterSpacing: "0.18em",
              }}
            >
              {study.status}
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "#A89DFF" }}
            >
              {study.org}
            </span>
          </div>

          <h1
            className="leading-[1.02] mb-4 sm:mb-5"
            style={{
              fontFamily:
                "'Neue Haas Grotesk Display Pro', var(--font-roboto), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: "clamp(2.5rem, 9vw, 4.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              color: "#FFFFFF",
            }}
          >
            {study.title}
          </h1>
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: "#C8C2F2" }}
          >
            {study.tagline}
          </p>

          <dl
            className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-md"
            style={{
              background: "rgba(10,10,28,0.55)",
              backdropFilter: "blur(6px)",
              border: "1px solid rgba(80,26,255,0.35)",
              boxShadow: "inset 0 0 0 1px rgba(25,25,147,0.25)",
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
                  style={{ color: "#A89DFF" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="text-[12.5px] leading-snug break-words"
                  style={{ color: "#E8E5FF" }}
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
              background: "#0A0A1C",
              border: "1px solid rgba(80,26,255,0.45)",
              boxShadow:
                "0 0 0 1px rgba(80,26,255,0.25), 0 0 36px rgba(80,26,255,0.28)",
            }}
          >
            <HoloDisplay
              screens={heroScreens}
              alt={`${study.title} screens`}
              accent="magenta"
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
