import type { Metadata, Viewport } from "next";
import {
  Press_Start_2P,
  VT323,
  JetBrains_Mono,
  Roboto,
  EB_Garamond,
} from "next/font/google";
import "./globals.css";
import ArcadeChrome from "@/components/ArcadeChrome";
import SoundToggle from "@/components/SoundToggle";
import ThemeToggle from "@/components/ThemeToggle";
import VisitorCounter from "@/components/VisitorCounter";
import { SoundProvider } from "@/components/SoundProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ModeProvider } from "@/components/ModeProvider";

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

// Runs before React hydrates — sets html[data-mode] from the saved choice
// so CSS can hide the wrong view on first paint. Kept tiny and string-only
// so it inlines cleanly in <head>.
const MODE_BOOTSTRAP = `try{var m=localStorage.getItem('mtw.mode');if(m==='basic'||m==='scenic'){document.documentElement.dataset.mode=m;}}catch(e){}`;

// Force the boot screen ("/") to always render in dark, regardless of the
// visitor's saved light/dark preference. On any other route we honor the
// stored choice. Runs sync in <head> before React hydrates so there's no
// FOUC between the SSR `data-theme="dark"` value and the user's pref.
const THEME_BOOTSTRAP = `try{var p=(location.pathname||'/').replace(/\\/index\\.html$/,'/');if(p==='/'||p===''){document.documentElement.dataset.theme='dark';}else{var t=localStorage.getItem('mtw.theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}}catch(e){document.documentElement.dataset.theme='dark';}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="scenic"
      data-theme="dark"
      suppressHydrationWarning
      className={`${display.variable} ${pixel.variable} ${mono.variable} ${roboto.variable} ${garamond.variable}`}
    >
      <body className="bg-bg-void text-ink antialiased">
        {/* Both scripts run before React hydrates: MODE_BOOTSTRAP picks the
            scenic/basic experience from localStorage, THEME_BOOTSTRAP locks
            the boot screen ("/") to dark and respects the saved preference
            elsewhere. Order matters only in that they don't race. */}
        <script dangerouslySetInnerHTML={{ __html: MODE_BOOTSTRAP }} />
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOTSTRAP }} />
        <ModeProvider>
          <ThemeProvider>
            <SoundProvider>
              <a href="#main" className="skip-link">
                Skip to main content
              </a>
              <ArcadeChrome />
              <ThemeToggle />
              <SoundToggle />
              <VisitorCounter />
              {children}
            </SoundProvider>
          </ThemeProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
