import type { Metadata } from "next";
import { Press_Start_2P, VT323, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CrtOverlays from "@/components/CrtOverlays";
import KonamiCode from "@/components/KonamiCode";
import PixelPet from "@/components/PixelPet";
import CursorTrail from "@/components/CursorTrail";
import { SoundProvider } from "@/components/SoundProvider";

const display = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matthew Thomas-Wicher · MTW.ARCADE",
  description:
    "Sr. Product Designer in Washington, D.C. Building thoughtful, data-informed software in highly regulated environments.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Matthew Thomas-Wicher · MTW.ARCADE",
    description:
      "Sr. Product Designer in Washington, D.C. Currently designing at Capital One.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${pixel.variable} ${mono.variable}`}>
      <body className="bg-bg-void text-ink antialiased">
        <SoundProvider>
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <CrtOverlays />
          <CursorTrail />
          <PixelPet />
          <KonamiCode />
          {children}
        </SoundProvider>
      </body>
    </html>
  );
}
