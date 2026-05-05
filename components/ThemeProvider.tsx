"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "dark" | "light";
type Ctx = {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "mtw.theme";

/**
 * Boot screen always renders in dark regardless of saved theme. Clients
 * coming back to / via internal Link nav should see the same dark
 * experience as a fresh load. The list mirrors the patterns the
 * THEME_BOOTSTRAP inline script in app/layout.tsx checks for.
 */
function isBootPath(pathname: string | null) {
  if (!pathname) return false;
  return pathname === "/" || pathname === "/index.html";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // SSR renders dark by default to match the server output. The mount
  // effect below restores any saved preference on the client.
  const [theme, setThemeState] = useState<Theme>("dark");
  const pathname = usePathname();
  const onBoot = isBootPath(pathname);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Apply theme to <html data-theme>: locked to dark on the boot screen,
  // user's saved/state theme everywhere else. The inline THEME_BOOTSTRAP
  // script handles the very first paint; this effect keeps the DOM in
  // sync as the visitor client-side navigates.
  useEffect(() => {
    document.documentElement.dataset.theme = onBoot ? "dark" : theme;
  }, [onBoot, theme]);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Ctx {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return {
      theme: "dark",
      toggle: () => {},
      setTheme: () => {},
    };
  }
  return ctx;
}
