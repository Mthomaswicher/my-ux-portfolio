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
import { SITE_URL } from "@/lib/site";

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

const SITE_TITLE = "Matthew Thomas-Wicher · Senior Product Designer Portfolio";

const DESCRIPTION =
  "Product designer with a full-stack engineering background. Seven years of SaaS and fintech, currently at Capital One on the Developer Experience team building enterprise platforms and AI products.";

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: "%s · Matthew Thomas-Wicher",
  },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  authors: [{ name: "Matthew Thomas-Wicher", url: SITE_URL }],
  creator: "Matthew Thomas-Wicher",
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: SITE_TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Matthew Thomas-Wicher",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Matthew Thomas-Wicher, Sr. Product Designer, Washington, D.C.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Runs before React hydrates, sets html[data-mode] from the saved choice
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
