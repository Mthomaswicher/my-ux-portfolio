"use client";

import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import JourneyHero from "@/components/JourneyHero";
import JourneyTimeline from "@/components/JourneyTimeline";
import JourneyArrival from "@/components/JourneyArrival";
import BasicExperience from "@/components/BasicExperience";
import { useMode } from "@/components/ModeProvider";

export default function ExperienceView() {
  const { mode } = useMode();

  if (mode === "basic") return <BasicExperience />;

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <JourneyHero />
          <JourneyTimeline />
          <JourneyArrival />
          <Footer />
        </div>
      </main>
    </div>
  );
}
