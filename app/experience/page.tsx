import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import JourneyTimeline from "@/components/JourneyTimeline";
import JourneyHero from "@/components/JourneyHero";
import JourneyArrival from "@/components/JourneyArrival";

export const metadata = {
  title: "Journey · MTW.ARCADE",
  description:
    "A side-scrolling timeline of Matthew Thomas-Wicher's career, from litigation paralegal to senior product designer at Capital One.",
};

export default function ExperiencePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-12 md:py-16">
          <JourneyHero />
          <JourneyTimeline />
          <JourneyArrival />
          <Footer />
        </div>
      </main>
    </div>
  );
}
