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
const OPO = "/images/case-studies/oportun-homepage-widgets";
const WEB3 = "/images/case-studies/web3-remittances";

export const projects: Project[] = [
  {
    no: "01",
    title: "IDP Release Plugin",
    org: "Capital One · Internal Developer Platform",
    status: "SHIPPED",
    blurb:
      "Streamlining release workflows so engineers can track deployments, approvals, and statuses without context-switching.",
    role: "UI/UX Designer",
    team: "2 designers · multiple eng + product partners",
    timeframe: "32 weeks · Finance",
    tools: "Figma · Lucid · Confluence · Jira",
    href: "/work/idp-release-plugin",
    accent: "cyan",
    hero: `${IDP}/03-new-experience.png`,
    tilt: -2.0,
    tags: ["#release", "#dev-platform"],
    mascot: "⚙",
    screens: [
      `${IDP}/03-new-experience.png`,
      `${IDP}/22-final.png`,
      `${IDP}/16-concept-3a.webp`,
      `${IDP}/09-flow-vs-mvp.png`,
    ],
  },
  {
    no: "02",
    title: "Oportun Homepage Widgets",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    blurb:
      "Reframed the home screen from feature ads to actionable financial insights, with a 37% lift in auto-pay setup.",
    role: "UI/UX Designer",
    team: "Design · Loans, Savings, Credit PODs",
    timeframe: "32 weeks · Finance",
    tools: "Figma · A/B testing · Heuristic eval",
    href: "/work/oportun-homepage-widgets",
    accent: "magenta",
    hero: `${OPO}/01-hero.png`,
    tilt: 2.2,
    tags: ["#fintech", "#onboarding"],
    mascot: "$",
    screens: [`${OPO}/01-hero.png`, `${OPO}/03-process.png`],
  },
  {
    no: "03",
    title: "Demex Climate Center",
    org: "The Demex Group",
    status: "SHIPPED",
    blurb:
      "Founding product design + engineering for a climate-risk web app that turned dense weather data into something insurers and businesses could actually use.",
    role: "Founding Product Designer · Full-Stack Engineer",
    team: "Design + eng founding team · cross-functional w/ data science",
    timeframe: "Climate-fintech startup",
    tools: "Figma · React · UserTesting",
    href: "/work/demex-climate-center",
    accent: "lime",
    hero: "/images/case-studies/demex-climate-center/05.png",
    tilt: -2.6,
    tags: ["#climate-risk", "#dataviz"],
    mascot: "△",
    screens: [
      "/images/case-studies/demex-climate-center/05.png",
      "/images/case-studies/demex-climate-center/08.png",
      "/images/case-studies/demex-climate-center/01.png",
    ],
  },
  {
    no: "04",
    title: "Web3 Powered Remittances",
    org: "Oportun · Hackathon",
    status: "WON",
    blurb:
      "Won Most Creative Idea at the Oportun hackathon. A Stellar-rail remittance flow that cut fees and delivery time for members sending money home.",
    role: "Product Designer",
    team: "Design + engineering hackathon team",
    timeframe: "Hackathon · Most Creative Idea winner",
    tools: "Figma · Stellar Network · Strategy",
    href: "/work/web3-powered-remittances",
    accent: "amber",
    hero: `${WEB3}/01.png`,
    tilt: 1.8,
    tags: ["#web3", "#fintech"],
    mascot: "✦",
    screens: [
      `${WEB3}/01.png`,
      `${WEB3}/08.png`,
      `${WEB3}/02.png`,
    ],
  },
];
