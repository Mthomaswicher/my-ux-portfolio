export type Accent = "cyan" | "magenta" | "lime" | "amber" | "rose";

export type CareerStage = {
  no: string;
  role: string;
  company: string;
  location: string;
  period: string;
  accent: Accent;
  headline: string;
  win: { label: string; value: string };
  bullets: string[];
  tools: string;
};

export const CAREER_STAGES: CareerStage[] = [
  {
    no: "01",
    role: "Senior Litigation Paralegal",
    company: "Hollingsworth LLP",
    location: "Washington, D.C.",
    period: "Jun 2018 – Jul 2019",
    accent: "amber",
    headline: "PRE-GAME",
    win: { label: "Foundation", value: "Synthesis under fire" },
    bullets: [
      "Managed Monsanto Roundup litigation trial prep autonomously through the preliminary phase.",
      "Honed pattern recognition and complex-system synthesis, which became the analytical backbone for design work.",
    ],
    tools: "Discovery · Synthesis · Trial Prep",
  },
  {
    no: "02",
    role: "UX Engineer",
    company: "The Demex Group",
    location: "Remote",
    period: "Apr 2020 – Oct 2021",
    accent: "lime",
    headline: "FIRST POWER-UP",
    win: { label: "Built", value: "“North Star” system" },
    bullets: [
      "Sole designer and full-stack engineer in a fast-moving climate-fintech startup.",
      "Owned marketing and product design from concept to launch in an ambiguous environment.",
      "Built the “North Star” design system end-to-end and shipped React components.",
    ],
    tools: "React · Figma · Design Tokens",
  },
  {
    no: "03",
    role: "Product Designer",
    company: "Oportun",
    location: "Remote",
    period: "Oct 2021 – May 2023",
    accent: "magenta",
    headline: "FINTECH RUN",
    win: { label: "Retention", value: "+20%" },
    bullets: [
      "Reframed sign-up and onboarding across banking, savings, investing, and budgeting, hitting +20% retention.",
      "Built the member insights area: +5% retention, +15% weekly active members.",
      "A/B testing and data insights tuned for complex financial lifecycles.",
    ],
    tools: "Figma · A/B Testing · Lifecycle",
  },
  {
    no: "04",
    role: "Senior Product Designer",
    company: "Berkeley Research Group",
    location: "Remote",
    period: "May 2023 – Jan 2025",
    accent: "cyan",
    headline: "SYSTEMS MODE",
    win: { label: "Delivery", value: "+25% velocity" },
    bullets: [
      "Designed and shipped a legislative policy tracker that drove +13% login frequency.",
      "Refactored design libraries into a 3-tier token system, accelerating front-end delivery ~25%.",
      "Translated complex business rules into reusable, scalable components.",
    ],
    tools: "Tokens · Component Lib · Research",
  },
  {
    no: "05",
    role: "Senior Product Designer",
    company: "Capital One",
    location: "McLean, VA · Hybrid",
    period: "Feb 2025 – Present",
    accent: "magenta",
    headline: "BOSS LEVEL",
    win: { label: "Adoption", value: "25% → 75%" },
    bullets: [
      "Spearheaded user research for GitHub Copilot Agent Mode, which directly led to GA approval.",
      "Led design strategy for DevNav Hub: 25% → 75% release adoption (+9% CSAT).",
      "Designed Voice of the Engineer 2025 viz for 12,000+ associates and execs.",
      "Release engagement initiative reached 6,000+ users with a 3.6% opt-out rate.",
    ],
    tools: "Strategy · Research · DataViz",
  },
];

export type BonusItem = {
  year: string;
  title: string;
  org: string;
  body: string;
};

export const BONUS_TRACK: BonusItem[] = [
  {
    year: "2014",
    title: "B.A., Political Science",
    org: "Flagler College · St. Augustine, FL",
    body: "Where the analytical thinking habit started.",
  },
  {
    year: "2017",
    title: "Full-Stack Engineering Cert",
    org: "General Assembly · Washington, D.C.",
    body: "First crossing into the engineering side.",
  },
  {
    year: "2020",
    title: "UX/UI Design Certificate",
    org: "Flatiron School · Chicago, IL",
    body: "Made design official.",
  },
  {
    year: "2024",
    title: "Hackonomics Winner",
    org: "Flatiron Alumni",
    body: "Led product, design, and engineering to victory in 19 days. AI-powered personal finance app.",
  },
  {
    year: "2025",
    title: "Pro Bono Team Lead",
    org: "Capital One Social Impact",
    body: "Led a cross-functional team optimizing onboarding for Carver Federal Savings Bank.",
  },
];
