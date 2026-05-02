import { Suspense } from "react";
import BootSequence from "@/components/BootSequence";

export const metadata = {
  title: "INSERT COIN · MTW.ARCADE",
};

export default function BootPage() {
  // BootSequence reads useSearchParams; static export needs it inside a
  // Suspense boundary or prerender bails out.
  return (
    <Suspense fallback={null}>
      <BootSequence />
    </Suspense>
  );
}
