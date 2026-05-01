import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import GuestbookGallery from "@/components/GuestbookGallery";

export const metadata = {
  title: "High Scores · MTW.ARCADE",
};

export default function GuestbookPage() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <div
            className="font-pixel text-[10px] tracking-widest text-ink-mute mb-3"
            aria-hidden="true"
          >
            ░ HALL OF FAME ░
          </div>
          <h1 className="font-display text-[clamp(2rem,9vw,3rem)] sm:text-[64px] md:text-[88px] leading-[1.05] sm:leading-none text-glow-amber mb-4">
            High Scores
            <span className="caret" aria-hidden="true" />
          </h1>
          <p className="font-mono text-[15px] text-ink-dim mb-10 max-w-xl leading-relaxed">
            Visitors who left a mark. Each card is hand-drawn by a real human on the way
            in. No filter, no edit, no delete.
          </p>

          <GuestbookGallery />

          <Footer />
        </div>
      </main>
    </div>
  );
}
