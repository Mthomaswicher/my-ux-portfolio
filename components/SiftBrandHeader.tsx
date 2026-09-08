import Image from "next/image";
import SiftHeroSift from "./SiftHeroSift";
import type { CaseStudy } from "@/lib/caseStudies";

/**
 * Sift-branded case-study header, set in the product's own system
 * (DESIGN-V3 "Instrument"):
 *   - #F8F8FA  paper, the reading surface
 *   - #101014  cold near-black ink
 *   - #5B5B66  muted ink
 *   - #E4E4E7  hairline rule
 *   - #C2181D  ember, used exactly once (the status chip)
 * Light on purpose: the app is light, and the header should read as a
 * piece of the product rather than a poster about it.
 */
export default function SiftBrandHeader({ study }: { study: CaseStudy }) {
  return (
    <header className="mb-10 md:mb-12">
      <div
        className="relative overflow-hidden p-6 sm:p-8 md:p-10"
        style={{
          background: "#F8F8FA",
          color: "#101014",
          border: "1px solid #E4E4E7",
          borderRadius: 8,
          boxShadow: "0 16px 48px rgba(16,16,20,0.10)",
        }}
      >
        <div className="relative">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/images/case-studies/sift/lockup-ink.svg"
              alt=""
              aria-hidden="true"
              width={99}
              height={35}
              className="h-8 w-auto"
              unoptimized
            />
            <span
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "#5B5B66" }}
            >
              {study.org}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span
              className="font-mono text-[10px] uppercase px-2.5 py-1"
              style={{
                background: "#C2181D",
                color: "#FFFFFF",
                borderRadius: 6,
                letterSpacing: "0.18em",
              }}
            >
              {study.status}
            </span>
            <a
              href="https://apps.apple.com/app/sift-recipe-capture/id6802734386"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase px-2.5 py-1.5 hover:opacity-70 transition-opacity"
              style={{
                border: "1px solid #71717A",
                color: "#101014",
                borderRadius: 6,
                letterSpacing: "0.14em",
              }}
            >
              Free on the App Store ↗
            </a>
            <a
              href="https://siftapp.me"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] uppercase px-2.5 py-1.5 hover:opacity-70 transition-opacity"
              style={{
                border: "1px solid #71717A",
                color: "#101014",
                borderRadius: 6,
                letterSpacing: "0.14em",
              }}
            >
              siftapp.me ↗
            </a>
          </div>

          <h1
            className="leading-[1.02] mb-4 sm:mb-5"
            style={{
              fontFamily:
                "var(--font-roboto), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
              fontSize: "clamp(2.5rem, 9vw, 4.25rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#101014",
            }}
          >
            {study.title}
          </h1>
          <p
            className="text-[15px] sm:text-[17px] leading-relaxed max-w-2xl"
            style={{ color: "#5B5B66" }}
          >
            {study.tagline}
          </p>

          <dl
            className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 sm:p-5"
            style={{
              background: "#FFFFFF",
              border: "1px solid #E4E4E7",
              borderRadius: 8,
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
                  style={{ color: "#6E6E7A" }}
                >
                  {row.label}
                </dt>
                <dd
                  className="text-[12.5px] leading-snug break-words"
                  style={{ color: "#101014" }}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-8">
        <SiftHeroSift />
      </div>
    </header>
  );
}
