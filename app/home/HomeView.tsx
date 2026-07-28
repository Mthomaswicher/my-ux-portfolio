import Sidebar from "@/components/Sidebar";
import ModeText from "@/components/ModeText";
import ArcadeHome from "@/components/ArcadeHome";
import BasicHome from "@/components/BasicHome";

/**
 * The page shell (sidebar + main landmark) lives here so both home
 * variants can ship in the HTML without duplicating `id="main"` or the
 * navigation landmark. CSS picks one at first paint, see the
 * "Mode-gated content" note in globals.css for why this isn't a JS branch.
 */
export default function HomeView() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <ModeText scenic={<ArcadeHome />} basic={<BasicHome />} />
      </main>
    </div>
  );
}
