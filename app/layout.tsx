import type { Metadata, Viewport } from "next";
import {
  Press_Start_2P,
  VT323,
  JetBrains_Mono,
  Roboto,
  EB_Garamond,
} from "next/font/google";
import "./globals.css";
import CrtOverlays from "@/components/CrtOverlays";
import KonamiCode from "@/components/KonamiCode";
import RoamPet from "@/components/RoamPet";
import CursorTrail from "@/components/CursorTrail";
import SoundToggle from "@/components/SoundToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { SoundProvider } from "@/components/SoundProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

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

// Loaded specifically for the RT Library lab exhibit so the stamped
// components render in the system's real typefaces.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#05050a",
};

export const metadata: Metadata = {
  title: "Matthew Thomas-Wicher · MTW.ARCADE",
  description:
    "Sr. Product Designer in Washington, D.C. Building thoughtful, data-informed software in highly regulated environments.",
  metadataBase: new URL("http://localhost:3000"),
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "Matthew Thomas-Wicher · MTW.ARCADE",
    description:
      "Sr. Product Designer in Washington, D.C. Currently designing at Capital One.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${pixel.variable} ${mono.variable} ${roboto.variable} ${garamond.variable}`}
    >
      <body className="bg-bg-void text-ink antialiased">
        <ThemeProvider>
          <SoundProvider>
            <a href="#main" className="skip-link">
              Skip to main content
            </a>
            <CrtOverlays />
            <CursorTrail />
            <RoamPet />
            <KonamiCode />
            <ThemeToggle />
            <SoundToggle />
            {children}
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
