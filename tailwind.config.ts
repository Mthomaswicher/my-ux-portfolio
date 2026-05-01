import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // All theme tokens are driven by CSS variables (RGB tuples) defined
        // in app/globals.css under :root and [data-theme="light"]. The
        // <alpha-value> placeholder lets Tailwind opacity modifiers
        // (bg-bg-void/80, etc.) keep working.
        bg: {
          void: "rgb(var(--bg-void) / <alpha-value>)",
          deep: "rgb(var(--bg-deep) / <alpha-value>)",
          panel: "rgb(var(--bg-panel) / <alpha-value>)",
          ridge: "rgb(var(--bg-ridge) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          dim: "rgb(var(--ink-dim) / <alpha-value>)",
          mute: "rgb(var(--ink-mute) / <alpha-value>)",
          ghost: "rgb(var(--ink-ghost) / <alpha-value>)",
        },
        neon: {
          magenta: "rgb(var(--neon-magenta) / <alpha-value>)",
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          lime: "rgb(var(--neon-lime) / <alpha-value>)",
          amber: "rgb(var(--neon-amber) / <alpha-value>)",
          rose: "rgb(var(--neon-rose) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      boxShadow: {
        "neon-magenta":
          "0 0 0 1px rgb(var(--neon-magenta)), 0 0 12px rgb(var(--neon-magenta) / 0.45)",
        "neon-cyan":
          "0 0 0 1px rgb(var(--neon-cyan)), 0 0 12px rgb(var(--neon-cyan) / 0.45)",
        "neon-lime":
          "0 0 0 1px rgb(var(--neon-lime)), 0 0 12px rgb(var(--neon-lime) / 0.45)",
        "neon-amber":
          "0 0 0 1px rgb(var(--neon-amber)), 0 0 12px rgb(var(--neon-amber) / 0.45)",
        "inset-glow": "inset 0 0 24px rgb(var(--neon-cyan) / 0.08)",
      },
      animation: {
        blink: "blink 1.05s steps(2, start) infinite",
        flicker: "flicker 6s linear infinite",
        scan: "scan 8s linear infinite",
        boot: "boot 1.6s steps(8) 1 forwards",
        walk: "walk 0.5s steps(2) infinite",
        slowpan: "slowpan 30s linear infinite alternate",
        shake: "shake 0.4s ease-in-out",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.985" },
          "52%": { opacity: "0.93" },
          "54%": { opacity: "1" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        boot: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        walk: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-1px)" },
        },
        slowpan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
