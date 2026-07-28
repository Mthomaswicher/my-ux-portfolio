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
    role: "Litigation Project Assistant",
    company: "WilmerHale",
    location: "Washington, D.C.",
    period: "2014 – 2018",
    accent: "amber",
    headline: "PROLOGUE",
    win: { label: "Practice", value: "International Antitrust" },
    bullets: [],
    tools: "Discovery · Document Review · Antitrust",
  },
  {
    no: "02",
    role: "Full-Stack Engineering",
    company: "General Assembly",
    location: "Washington, D.C.",
    period: "2017",
    accent: "cyan",
    headline: "ORIGIN STORY",
    win: { label: "First class", value: "Engineering" },
    bullets: [
      "Full-stack program: HTML, CSS, JavaScript, Ruby on Rails.",
      "First time I shipped anything end to end. It stuck.",
    ],
    tools: "HTML · CSS · JavaScript · Rails",
  },
  {
    no: "03",
    role: "Senior Litigation Paralegal",
    company: "Hollingsworth LLP",
    location: "Washington, D.C.",
    period: "Jun 2018 – Jul 2019",
    accent: "amber",
    headline: "PRE-GAME",
    win: { label: "Foundation", value: "Synthesis under fire" },
    bullets: [
      "Ran trial prep on the Monsanto Roundup litigation through the preliminary phase, mostly on my own.",
      "Spent two years finding patterns in documents nobody wanted to read. Turns out that is most of design research.",
    ],
    tools: "Discovery · Synthesis · Trial Prep",
  },
  {
    no: "04",
    role: "UX/UI Bootcamp",
    company: "Flatiron School",
    location: "Chicago, IL",
    period: "2019",
    accent: "rose",
    headline: "SKILL TREE",
    win: { label: "Pivot", value: "Law to Design" },
    bullets: [
      "Daily critique, weekly sprints, a capstone that shipped.",
      "This is where I stopped being a paralegal.",
    ],
    tools: "Sketch · InVision · Wireframing",
  },
  {
    no: "05",
    role: "UX Engineer",
    company: "The Demex Group",
    location: "Remote",
    period: "Apr 2020 – Oct 2021",
    accent: "lime",
    headline: "FIRST POWER-UP",
    win: { label: "Built", value: "“North Star” system" },
    bullets: [
      "Only designer at a climate-fintech startup. I also wrote the front-end code.",
      "Owned product and marketing design start to finish. Nobody handed me a brief.",
      "Built the “North Star” design system and shipped the React components myself.",
    ],
    tools: "React · Figma · Design Tokens",
  },
  {
    no: "06",
    role: "Product Designer",
    company: "Oportun",
    location: "Remote",
    period: "Oct 2021 – May 2023",
    accent: "magenta",
    headline: "FINTECH RUN",
    win: { label: "Retention", value: "20%" },
    bullets: [
      "Rebuilt sign-up and onboarding across banking, savings, investing, and budgeting. Retention hit 20%.",
      "Built the member insights area: 5% retention, 15% weekly active members.",
      "A lot of A/B tests. Money products have long feedback loops, so you learn to wait.",
    ],
    tools: "Figma · A/B Testing · Lifecycle",
  },
  {
    no: "07",
    role: "Senior Product Designer",
    company: "Berkeley Research Group",
    location: "Remote",
    period: "May 2023 – Jan 2025",
    accent: "cyan",
    headline: "SYSTEMS MODE",
    win: { label: "Delivery", value: "25% velocity" },
    bullets: [
      "Shipped a legislative policy tracker. Login frequency went up 13%.",
      "Tore the design library apart and rebuilt it as a 3-tier token system. Front-end delivery got about 25% faster.",
      "Most of the job was turning dense business rules into components engineers could reuse.",
    ],
    tools: "Tokens · Component Lib · Research",
  },
  {
    no: "08",
    role: "Senior Product Designer",
    company: "Capital One",
    location: "McLean, VA · Hybrid",
    period: "Feb 2025 – Present",
    accent: "magenta",
    headline: "BOSS LEVEL",
    win: { label: "Adoption", value: "25% → 75%" },
    bullets: [
      "Ran the user research on GitHub Copilot Agent Mode. It went to GA on the back of it.",
      "Led design for DevNav Hub. Release adoption went from 25% to 75%, CSAT up 9%.",
      "Built the Voice of the Engineer 2025 data viz, read by 12,000 associates and execs.",
      "Release engagement work reached 6,000 users. 3.6% opted out.",
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
    body: "Four years of reading arguments closely. It stuck.",
  },
  {
    year: "2017",
    title: "Full-Stack Engineering Cert",
    org: "General Assembly · Washington, D.C.",
    body: "The first time code stopped being someone else\u2019s job.",
  },
  {
    year: "2020",
    title: "UX/UI Design Certificate",
    org: "Flatiron School · Chicago, IL",
    body: "Made the career change official.",
  },
  {
    year: "2024",
    title: "Hackonomics Winner",
    org: "Flatiron Alumni",
    body: "An AI personal finance app, built in 19 days. I led design and engineering. We won.",
  },
  {
    year: "2025",
    title: "Pro Bono Team Lead",
    org: "Capital One Social Impact",
    body: "Rebuilt onboarding for Carver Federal Savings Bank with a pro bono team.",
  },
];
