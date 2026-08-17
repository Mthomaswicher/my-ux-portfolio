export type Project = {
  no: string;
  title: string;
  org: string;
  status: "SHIPPED" | "IN PROGRESS" | "WON" | "RESEARCH";
  blurb: string;
  role: string;
  team: string;
  timeframe: string;
  tools?: string;
  href: string;
  external?: boolean;
  accent: "magenta" | "cyan" | "lime" | "amber" | "rose";
  hero?: string;
  screens?: string[];
  tilt?: number;
  /** 1–3 short tag pills floated over the tile (e.g. "#fintech"). */
  tags?: string[];
  /** Single emoji/pixel glyph that idles in the tile corner. */
  mascot?: string;
};

const IDP = "/images/case-studies/idp-release-plugin";
const TIGER = "/images/case-studies/claude-code-tiger-team";
const OPO = "/images/case-studies/oportun-homepage-widgets";
const OCS = "/images/case-studies/oportun-credit-servicing";

export const projects: Project[] = [
  {
    no: "01",
    title: "Claude Code Setup",
    org: "Capital One · DevX",
    status: "SHIPPED",
    blurb:
      "Claude Code only worked if you were an engineer. I led the tiger team that opened it to everyone else. 2,300+ people have since completed a build challenge.",
    role: "Sr. Product Designer, tiger team lead",
    team: "Lead plus 2 designers · PM, eng, One Access + senior leadership",
    timeframe: "3 weeks · March 2026",
    tools: "Claude Code · GitHub · Artifactory · VS Code",
    href: "/work/claude-code-tiger-team",
    accent: "cyan",
    hero: `${TIGER}/00-preview.svg`,
    tilt: 1.6,
    tags: ["Capital One", "DevX", "AI"],
    mascot: "◈",
    screens: [
      `${TIGER}/00-preview.svg`,
      `${TIGER}/07-site-overview.svg`,
      `${TIGER}/08-site-failed-check.svg`,
      `${TIGER}/06-one-click.svg`,
    ],
  },
  {
    no: "02",
    title: "IDP Release Plugin",
    org: "Capital One · DevX",
    status: "SHIPPED",
    blurb:
      "Shipping code at Capital One meant bouncing between five tools to answer one question. I put releases in one place.",
    role: "UI/UX Designer",
    team: "2 designers · multiple eng + product partners",
    timeframe: "32 weeks · Finance",
    tools: "Figma · Lucid · Confluence · Jira",
    href: "/work/idp-release-plugin",
    accent: "cyan",
    hero: `${IDP}/00-preview.svg`,
    tilt: -2.0,
    tags: ["Capital One", "DevX"],
    mascot: "⚙",
    screens: [
      `${IDP}/00-preview.svg`,
      `${IDP}/03-new-experience.webp`,
      `${IDP}/22-final.png`,
      `${IDP}/16-concept-3a.webp`,
    ],
  },
  {
    no: "03",
    title: "Oportun Homepage Widgets",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    blurb:
      "The home screen was advertising features instead of doing anything. We made it useful. Auto-pay setup went up 37%.",
    role: "UI/UX Designer",
    team: "Design · Loans, Savings, Credit PODs",
    timeframe: "32 weeks · Finance",
    tools: "Figma · A/B testing · Heuristic eval",
    href: "/work/oportun-homepage-widgets",
    accent: "magenta",
    hero: `${OPO}/00-preview.svg`,
    tilt: 2.2,
    tags: ["#fintech", "#onboarding"],
    mascot: "$",
    screens: [`${OPO}/00-preview.svg`, `${OPO}/01-hero.webp`, `${OPO}/03-process.webp`],
  },
  {
    no: "04",
    title: "Credit Card Servicing",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    blurb:
      "Credit card servicing bolted onto a lending app for 2M+ members. Two platforms, one design system, a March 2023 deadline that would not move.",
    role: "UI/UX Designer",
    team: "Design · Loans, Savings & Credit PODs",
    timeframe: "Jul 2022 sprint → Mar 2023 launch",
    tools: "Figma · iOS & Android · Usability Testing",
    href: "/work/oportun-credit-servicing",
    accent: "lime",
    hero: `${OCS}/00-preview.svg`,
    tilt: -1.5,
    tags: ["#fintech", "#credit", "#mobile"],
    mascot: "💳",
    screens: [
      `${OCS}/00-preview.svg`,
      `${OCS}/01-hero.webp`,
      `${OCS}/02-account-overview.webp`,
      `${OCS}/05-status-autopay.webp`,
    ],
  },
  {
    no: "05",
    title: "Demex Climate Center",
    org: "The Demex Group",
    status: "SHIPPED",
    blurb:
      "First designer at a climate startup, and I wrote the front end too. The job was making dense weather data usable by people buying insurance.",
    role: "Founding Product Designer · Full-Stack Engineer",
    team: "Design + eng founding team · cross-functional w/ data science",
    timeframe: "Climate-fintech startup",
    tools: "Figma · React · UserTesting",
    href: "/work/demex-climate-center",
    accent: "lime",
    hero: "/images/case-studies/demex-climate-center/00-preview.svg",
    tilt: -2.6,
    tags: ["#climate-risk", "#dataviz"],
    mascot: "△",
    screens: [
      "/images/case-studies/demex-climate-center/00-preview.svg",
      "/images/case-studies/demex-climate-center/05.webp",
      "/images/case-studies/demex-climate-center/08.webp",
      "/images/case-studies/demex-climate-center/01.webp",
    ],
  },
];
