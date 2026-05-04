import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import GuestbookGallery from "@/components/GuestbookGallery";
import GuestbookHero from "@/components/GuestbookHero";

export const metadata = {
  title: "High Scores · MTW.ARCADE",
};

export default function GuestbookPage() {
  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main id="main" className="flex-1 min-w-0">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 md:px-10 pt-20 md:pt-16 pb-12 md:pb-16">
          <GuestbookHero />

          <GuestbookGallery />

          <Footer />
        </div>
      </main>
    </div>
  );
}
