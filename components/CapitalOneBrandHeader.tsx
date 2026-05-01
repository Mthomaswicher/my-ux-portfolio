import Image from "next/image";
import HoloDisplay from "./HoloDisplay";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Capital One-branded case-study header.
 * Uses the company's actual palette:
 *   - #013D5B  primary navy (wordmark)
 *   - #CC2427  ribbon red (swoosh accent)
 *   - #0276B1  mid teal blue
 *   - #014E74  hover navy
 *   - #F4F4F4  neutral surface
 */
export default function CapitalOneBrandHeader({
  study,
}: {
  study: CaseStudy;
}) {
  const heroScreens = study.heroScreens ?? (study.hero ? [study.hero] : []);
  return (
    <header className="mb-10 md:mb-12">
      <div
        className="relative overflow-hidden p-6 sm:p-8 md:p-10"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F4F8FA 60%, #E8EFF3 100%)",
          color: "#0E1F2C",
          border: "1px solid rgba(1,61,91,0.18)",
          borderRadius: 4,
          boxShadow:
            "0 12px 40px rgba(1,61,91,0.18), 0 0 0 1px rgba(204,36,39,0.05)",
        }}
      >
        {/* red ribbon wash, mirroring the swoosh of the C1 mark */}
        <div
          aria-hidden="true"
          className="absolute -top-10 -right-10 w-[260px] h-[260px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(204,36,39,0.18), rgba(204,36,39,0) 65%)",
          }}
        />
        {/* navy wash anchoring the bottom-left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-12 -left-12 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(2,118,177,0.14), rgba(2,118,177,0) 65%)",
          }}
        />

        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/images/case-studies/idp-release-plugin/capital-one-mark.svg"
              alt=""
              aria-hidden="true"
              width={120}
              height={43}
              className="h-9 w-auto"
              unoptimized
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#013D5B" }}
            >
              Internal · Developer Platform
            </span>
          </div>

          <div className="flex flex-wrap items-baseline gap-3 mb-3">
            <span
              className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5"
              style={{
                background: "#CC2427",
                color: "#FFFFFF",
                borderRadius: 999,
                letterSpacing: "0.18em",
              }}
            >
              {study.status}
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "#3A5063" }}
            >
              {study.org}
            </span>
          </div>

          <h1
            className="leading-[1.05] mb-4 sm:mb-5"
            style={{
              fontFamily:
                "var(--font-roboto), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: "clamp(2.5rem, 9vw, 4.25rem)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: "#013D5B",
            }}
          >
            {study.title}
          </h1>
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: "#3A5063" }}
          >
            {study.tagline}
          </p>

          <dl
            className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5 rounded-md"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(1,61,91,0.16)",
              boxShadow: "0 2px 8px rgba(1,61,91,0.06)",
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
                  style={{ color: "#0276B1" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="text-[12.5px] leading-snug break-words"
                  style={{ color: "#1F2D38" }}
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
              background: "#0A1A28",
              border: "1px solid rgba(2,118,177,0.45)",
              boxShadow:
                "0 0 0 1px rgba(2,118,177,0.22), 0 0 28px rgba(2,118,177,0.22)",
            }}
          >
            <HoloDisplay
              screens={heroScreens}
              alt={`${study.title} screens`}
              accent="cyan"
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
