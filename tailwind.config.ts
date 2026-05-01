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
        bg: {
          void: "#05050a",
          deep: "#0a0a14",
          panel: "#0e0e1c",
          ridge: "#16162a",
        },
        ink: {
          DEFAULT: "#e8e8f0",
          dim: "#a8a8c0",
          mute: "#8d8db0",
          ghost: "#2a2a40",
        },
        neon: {
          magenta: "#ff2bd6",
          cyan: "#22d3ee",
          lime: "#a3e635",
          amber: "#fbbf24",
          rose: "#fb7185",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "monospace"],
        mono: ["var(--font-mono)", "monospace"],
        pixel: ["var(--font-pixel)", "monospace"],
      },
      boxShadow: {
        "neon-magenta": "0 0 0 1px #ff2bd6, 0 0 12px rgba(255,43,214,0.45)",
        "neon-cyan": "0 0 0 1px #22d3ee, 0 0 12px rgba(34,211,238,0.45)",
        "neon-lime": "0 0 0 1px #a3e635, 0 0 12px rgba(163,230,53,0.45)",
        "neon-amber": "0 0 0 1px #fbbf24, 0 0 12px rgba(251,191,36,0.45)",
        "inset-glow": "inset 0 0 24px rgba(34,211,238,0.08)",
      },
      animation: {
        blink: "blink 1.05s steps(2, start) infinite",
        flicker: "flicker 6s linear infinite",
        scan: "scan 8s linear infinite",
        boot: "boot 1.6s steps(8) 1 forwards",
        walk: "walk 0.5s steps(2) infinite",
        slowpan: "slowpan 30s linear infinite alternate",
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
      },
    },
  },
  plugins: [],
};

export default config;
