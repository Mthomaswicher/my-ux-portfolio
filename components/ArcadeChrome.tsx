"use client";

import AccentToast from "./AccentToast";
import CrtOverlays from "./CrtOverlays";
import KonamiCode from "./KonamiCode";
import LongPressNotes from "./LongPressNotes";
import RoamPet from "./RoamPet";
import SwipeKonami from "./SwipeKonami";
import { useMode } from "./ModeProvider";

/**
 * The visual flourishes that only run in scenic mode. In basic mode,
 * everything in this component is suppressed so the page renders as a
 * plain document.
 */
export default function ArcadeChrome() {
  const { mode } = useMode();
  if (mode !== "scenic") return null;
  return (
    <>
      <CrtOverlays />
      <RoamPet />
      <KonamiCode />
      <SwipeKonami />
      <LongPressNotes />
      <AccentToast />
    </>
  );
}
