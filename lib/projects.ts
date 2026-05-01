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
};

const IDP = "/images/case-studies/idp-release-plugin";
const OPO = "/images/case-studies/oportun-homepage-widgets";

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
    screens: [`${OPO}/01-hero.png`, `${OPO}/03-process.png`],
  },
];
