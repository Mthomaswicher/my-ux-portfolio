"use client";

import ArcadeHome from "@/components/ArcadeHome";
import BasicHome from "@/components/BasicHome";
import { useMode } from "@/components/ModeProvider";

export default function HomeView() {
  const { mode } = useMode();
  return mode === "basic" ? <BasicHome /> : <ArcadeHome />;
}
