import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import ModeText from "@/components/ModeText";
import JourneyHero from "@/components/JourneyHero";
import JourneyTimeline from "@/components/JourneyTimeline";
import JourneyArrival from "@/components/JourneyArrival";
import BasicExperience from "@/components/BasicExperience";

/**
 * The page shell (sidebar + main landmark) lives here so both experience
 * variants can ship in the HTML without duplicating `id="main"`. CSS picks
 * one at first paint — see the "Mode-gated content" note in globals.css.
 *
 * `relative` on <main> is needed by the basic variant's scroll progress
 * bar and is inert for the scenic one.
 */
export default function ExperienceView() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0 relative">
        <ModeText
          scenic={
            <div className="mx-auto max-w-5xl px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
              <JourneyHero />
              <JourneyTimeline />
              <JourneyArrival />
              <Footer />
            </div>
          }
          basic={<BasicExperience />}
        />
      </main>
    </div>
  );
}
