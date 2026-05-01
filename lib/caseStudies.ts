export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "img"; src: string; alt: string; caption?: string }
  | { kind: "imgGrid"; items: Array<{ src: string; alt: string; caption?: string }> }
  | { kind: "video"; src: string; poster?: string; caption?: string; alt: string }
  | { kind: "quote"; text: string; speaker?: string }
  | { kind: "features"; items: Array<{ title: string; body: string }> }
  | { kind: "callout"; tone: "plus" | "minus" | "note"; text: string };

export type CaseStudySection = {
  id: string;
  no: string;
  title: string;
  body: Block[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  org: string;
  status: "SHIPPED" | "IN PROGRESS" | "WON" | "RESEARCH";
  tagline: string;
  hero?: string;
  heroScreens?: string[];
  role: string;
  team: string;
  timeframe: string;
  tools: string;
  accent: "magenta" | "cyan" | "lime" | "amber" | "rose";
  /** Optional brand re-skin applied to the case-study header + accent
   *  tokens within the article scope (e.g. "oportun" pulls in the green
   *  palette + logo). */
  brand?: "oportun";
  sections: CaseStudySection[];
  results?: Array<{ stat: string; label: string; sub?: string }>;
};

const IDP = "/images/case-studies/idp-release-plugin";
const OPO = "/images/case-studies/oportun-homepage-widgets";

export const caseStudies: CaseStudy[] = [
  {
    slug: "idp-release-plugin",
    title: "IDP Release Plugin",
    org: "Capital One · Internal Developer Platform",
    status: "SHIPPED",
    tagline:
      "Streamlining release workflows, ensuring developers can quickly track deployments, approvals, and release statuses with ease.",
    hero: `${IDP}/03-new-experience.png`,
    heroScreens: [
      `${IDP}/03-new-experience.png`,
      `${IDP}/22-final.png`,
      `${IDP}/16-concept-3a.webp`,
      `${IDP}/17-concept-3b.webp`,
      `${IDP}/09-flow-vs-mvp.png`,
    ],
    role: "UI/UX Designer",
    team: "2 designers · multi product + engineering partners",
    timeframe: "32 weeks",
    tools: "Figma · Lucid · Confluence · Jira",
    accent: "cyan",
    sections: [
      {
        id: "problem",
        no: "01",
        title: "Problem",
        body: [
          {
            kind: "p",
            text: "For engineers across our enterprise, managing releases is often unpredictable, fragmented, and inefficient. The current release management experience lacks the integration, visibility, and automation needed to support a seamless development workflow. At best, teams navigate a mix of disconnected tools and ad-hoc processes; at worst, they face delays, uncertainty, and unnecessary friction that slow down innovation.",
          },
        ],
      },
      {
        id: "goal",
        no: "02",
        title: "Goal",
        body: [
          {
            kind: "p",
            text: "Our challenge was to transform release management into a cohesive, intuitive experience that not only streamlines the process but also lays the foundation for a fully integrated development environment. By embedding robust release management practices into our IDE/IDP initiative, we are creating a platform that empowers developers with stability, efficiency, and confidence in every release.",
          },
          { kind: "h", text: "Approve releases with ease" },
          {
            kind: "p",
            text: "Answer required audit/cyber requirements and approve your release without friction.",
          },
          {
            kind: "video",
            src: `${IDP}/v01-approve.mp4`,
            alt: "Demo: a developer answers audit questions and approves a release inline.",
            caption: "Single-pass approval flow demo.",
          },
          { kind: "h", text: "Action releases with confidence" },
          {
            kind: "p",
            text: "Use the PAR activity trail to track Artemis activity and make a decision with confidence.",
          },
          {
            kind: "video",
            src: `${IDP}/v02-action.mp4`,
            alt: "Demo: PAR activity trail and Artemis status update in the release page.",
            caption: "PAR activity trail demo.",
          },
          { kind: "h", text: "Communicate with asset owners" },
          {
            kind: "p",
            text: "Communicate directly with release owners to gain context on the release.",
          },
          {
            kind: "video",
            src: `${IDP}/v03-comms.mp4`,
            alt: "Demo: open a Slack thread to the release submitter from inside the plugin.",
            caption: "Starting a Slack thread to the release submitter.",
          },
        ],
      },
      {
        id: "background",
        no: "03",
        title: "Background & hypothesis",
        body: [
          {
            kind: "p",
            text: "Over the years, we have witnessed sustained growth in tools and processes that support the Software Development Lifecycle (SDLC). While that growth may be great, it has created an ecosystem of disconnected, yet required tooling and platforms that force developers to constantly context shift throughout their work day.",
          },
          {
            kind: "p",
            text: "At the end of the day, we believe our developers want to maintain flow state and limit the cognitive load in orchestrating processes over disconnected tools.",
          },
          {
            kind: "h",
            text: "Why did this effort start?",
          },
          {
            kind: "p",
            text: "At the start of 2024, one of the core initiatives our CEO had set was to improve the developer experience as a whole and start treating internal developers the same way we treat external customers. In March of the same year, the Developer Experience team (DevX) began socializing the IDP, or Internal Developer Platform, which would give developers a one-stop shop for their development needs.",
          },
          {
            kind: "p",
            text: "The key goal: \"Automate everything but the creative problem solving in developing software.\" In the target state, developers spend the majority of their time in two primary screens, the IDE and the IDP.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${IDP}/02-previous.png`,
                alt: "Previous release experience screenshot",
                caption: "Previous Release Experience",
              },
              {
                src: `${IDP}/03-new-experience.png`,
                alt: "New release experience screenshot",
                caption: "New Release Experience",
              },
            ],
          },
          {
            kind: "img",
            src: `${IDP}/04-sdlc.png`,
            alt: "SDLC tooling diagram",
            caption:
              "The IDP serves to connect and consolidate tooling interfaces into a seamless experience across the SDLC.",
          },
          {
            kind: "p",
            text: "About 7 months of planning and execution later, the IDP platform was stood up with mostly out-of-the-box features. After much deliberation, planning, and a build-vs-buy analysis, leadership decided to prioritize the Release Plugin. The ability for developers to ship code is paramount to the developer workflow, which makes it critical for an end-to-end IDP experience. Working with our product partners, we landed on an MVP definition for the capabilities and features the plugin should have at release.",
          },
        ],
      },
      {
        id: "current-state",
        no: "04",
        title: "Understanding the current state",
        body: [
          {
            kind: "p",
            text: "To kick off this work stream we wanted to do some sense-making between the IDP Ideal, MVP, and current One Pipeline experiences for our three user types: ICs, Approvers, and Escalators.",
          },
          {
            kind: "h",
            text: "Where do we start?",
          },
          {
            kind: "p",
            text: "We needed to understand how all of the systems worked, so we had our product and engineering partners walk us through the experiences for each primary persona.",
          },
          {
            kind: "img",
            src: `${IDP}/05-zoom.png`,
            alt: "Zoom call with Product and Engineering partners",
            caption: "Zoom call with product and engineering partners.",
          },
          {
            kind: "p",
            text: "Over 2–3 days, we were able to better understand the OPL UI current state with regards to the release process.",
          },
          {
            kind: "img",
            src: `${IDP}/06-screenshots.png`,
            alt: "Refined deliverable from screenshots",
            caption:
              "We then refined the screenshots into a more digestible deliverable to help socialize with our partners.",
          },
          {
            kind: "img",
            src: `${IDP}/08-flow-opl.png`,
            alt: "Current State Release Flow: One Pipeline Users",
            caption: "Current state release flow for One Pipeline users.",
          },
          {
            kind: "img",
            src: `${IDP}/09-flow-vs-mvp.png`,
            alt: "Current state vs MVP release flow",
            caption: "Current state release flow vs. MVP for OPL users.",
          },
          {
            kind: "p",
            text: "To help ensure we were aware of any edge cases and designing for the ideal experience, I created a detailed wireflow depicting what goes on at each step.",
          },
          {
            kind: "img",
            src: `${IDP}/11-lofi-wireflow.png`,
            alt: "Lo-fi wireflow",
            caption: "Lo-fi wireflow.",
          },
        ],
      },
      {
        id: "jtbd",
        no: "05",
        title: "Jobs-to-be-done validation",
        body: [
          {
            kind: "p",
            text: "We conducted eight 30-minute Jobs-to-be-Done interviews with developers to validate if we were on the right path with the flows we and our engineering and product partners had worked on.",
          },
          {
            kind: "h",
            text: "JTBDs validated",
          },
          {
            kind: "list",
            items: [
              "Initiate Release: PROD release after a developer merges, pre-prod environment deployments, scheduling or deferring for later, and deploying specific versions",
              "Approve Release: PAR Approver approves with one click, notifications go out to approvers and the team, and escalation is available when needed",
              "Track Release: viewing deployment status across QA, Staging, Prod, and E/W regions, status notifications, and self-service deployment errors with clear next actions",
              "Roll Back / Roll Forward: selecting a previous stable build, auto-rollback on failure, verification via testing, and feature flags on main that enable roll-forward",
              "Audit / Review Release: release activity logged in an accessible table, with data captured to meet audit requirements",
            ],
          },
        ],
      },
      {
        id: "ideation",
        no: "06",
        title: "Ideation",
        body: [
          {
            kind: "p",
            text: "While some of these directions were out of scope for the beta release, our product and engineering partners were receptive to the designs and could see them being prioritized in the next PI.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${IDP}/12-ideation-a.png`,
                alt: "Ideation concept A",
                caption: "Ideation A",
              },
              {
                src: `${IDP}/13-ideation-b.png`,
                alt: "Ideation concept B",
                caption: "Ideation B",
              },
              {
                src: `${IDP}/14-ideation-c.png`,
                alt: "Ideation concept C",
                caption: "Ideation C",
              },
            ],
          },
        ],
      },
      {
        id: "concepts",
        no: "07",
        title: "Designing for the ideal state",
        body: [
          {
            kind: "h",
            text: "Concept 1",
          },
          {
            kind: "list",
            items: [
              "Explored audit questions behind a modal, with CTAs sitting high on the page so users can't miss them",
              "Release metadata is present, in front of the user",
              "Release Workflow component is visible, but further down the page",
            ],
          },
          {
            kind: "img",
            src: `${IDP}/15-concept-1.png`,
            alt: "Concept 1 layout",
          },
          {
            kind: "h",
            text: "Concept 2",
          },
          {
            kind: "p",
            text: "Our product team informed us the audit questions had to live on the page at all times. So I explored how that might look on the UI, placing a release tracker component within the leftmost column of the layout, plus secondary metadata in that same column.",
          },
          {
            kind: "h",
            text: "Concept 3: usability and concept testing",
          },
          {
            kind: "p",
            text: "After refinement with our product partners, we landed on the following concept. We used a 9:3 layout, with primary actions and content in the middle and secondary metadata in an adjacent smaller column.",
          },
          {
            kind: "video",
            src: `${IDP}/v04-concept3.mp4`,
            alt: "Demo: walking through Concept 3 with release activity at top, audit questions in the body, and a sidebar with secondary metadata.",
            caption: "Walkthrough of Concept 3 usability and concept testing.",
          },
          {
            kind: "img",
            src: `${IDP}/16-concept-3a.webp`,
            alt: "Concept 3 release activity at top",
            caption:
              "Release activity at the top of the page so users are aware of where they are in the releases process.",
          },
          {
            kind: "img",
            src: `${IDP}/17-concept-3b.webp`,
            alt: "Concept 3 clearer modals",
            caption:
              "Clearer, individual modals for each CTA with contextual information so users are well-equipped when approving or canceling a release.",
          },
          {
            kind: "img",
            src: `${IDP}/18-concept-3c.webp`,
            alt: "Concept 3 resiliency questions",
            caption:
              "Resiliency material change questions added per audit requirements. The questions needed to be in front of the user, behind no interactions.",
          },
          {
            kind: "img",
            src: `${IDP}/19-concept-3d.webp`,
            alt: "Concept 3 PAR activity",
            caption:
              "Release activity and PAR activity further down the page, giving approvers more context on what the release is all about.",
          },
        ],
      },
      {
        id: "feedback",
        no: "08",
        title: "Usability feedback",
        body: [
          {
            kind: "p",
            text: "Usability testing was successful, but users identified opportunities to improve clarity and context across touchpoints.",
          },
          {
            kind: "img",
            src: `${IDP}/20-quotes.webp`,
            alt: "User quote pull-out",
          },
          {
            kind: "quote",
            text: "There were times where I was not sure if I completed a step…and there's no easy way to track that in the system.",
          },
          {
            kind: "quote",
            text: "A Slack link is definitely going to help because I am going to check in with my team. 'Hey what's this all about?' rather than go through extra steps.",
          },
          {
            kind: "quote",
            text: "I wish the fields would just auto-fill based on what I've done before. I shouldn't have to manually enter things over and over.",
          },
          {
            kind: "img",
            src: `${IDP}/21-callouts.webp`,
            alt: "Clear callouts annotated on the design",
            caption: "Clear callouts for improvement.",
          },
        ],
      },
      {
        id: "improvements",
        no: "09",
        title: "Improvements based on feedback",
        body: [
          {
            kind: "h",
            text: "Better contextual information",
          },
          {
            kind: "list",
            items: [
              "Users expressed the need for systems that adapt to their workflows and provide contextually relevant information",
              "Alerts at the top of the page contextual to the user's role (PAR Approver, ESC Approver, Dev), putting CTAs front and center",
              "PAR activity and release information now higher up, with detailed justification providing transparency and accountability",
            ],
          },
          {
            kind: "img",
            src: `${IDP}/22-final.png`,
            alt: "Final design with contextual alerts and PAR activity",
          },
          {
            kind: "h",
            text: "Consistent communication channels",
          },
          {
            kind: "p",
            text: "Users were relying on external tools like Slack and email to supplement the IDP's lack of communication features. Developers spend a lot of time in Slack for communicating and troubleshooting, so I added buttons that allow approvers to immediately start up conversations with the release submitter.",
          },
          {
            kind: "h",
            text: "Bulk-approve multiple releases",
          },
          {
            kind: "p",
            text: "Users frequently operate on \"autopilot\" due to the repetitive nature of release approvals. I designed a feature where PAR approvers can quickly approve multiple releases without friction.",
          },
          {
            kind: "video",
            src: `${IDP}/v05-bulk.mp4`,
            alt: "Demo: selecting multiple pending releases and approving them in a single action.",
            caption: "Bulk approve demo.",
          },
        ],
      },
      {
        id: "mobile",
        no: "10",
        title: "Expanding to mobile",
        body: [
          {
            kind: "p",
            text: "While this was out of scope for the beta release, our product and engineering partners were receptive to the designs and could see them being prioritized and implemented during the next PI.",
          },
          {
            kind: "video",
            src: `${IDP}/v06-mobile.mp4`,
            alt: "Demo: approving a release from a mobile device, from push notification to one-tap action.",
            caption: "On-the-go approvals demo.",
          },
          {
            kind: "img",
            src: `${IDP}/23-mobile.webp`,
            alt: "Mobile concept",
            caption: "Mobile concept stills.",
          },
        ],
      },
      {
        id: "measuring",
        no: "11",
        title: "Measuring success",
        body: [
          {
            kind: "p",
            text: "To determine if our work was impactful, we needed a way to track how well our design changes were affecting users, while also confirming we were helping the business succeed.",
          },
          {
            kind: "p",
            text: "The primary OKR our business partners are trying to meet with this initiative: reduce time spent in deployment by 7%.",
          },
          {
            kind: "p",
            text: "For user metrics, we used our established Google HEART framework (HAT in our case) as the foundation. Our internal user-tracking software wasn't integrated into the IDP for the closed beta, so we were limited on what we could collect, and we relied on UMUX-lite, NPS, and surveys.",
          },
          {
            kind: "list",
            items: [
              "NPS gathers overall user satisfaction and qualitative feedback",
              "UMUX-lite gathers data on overall usability and task effectiveness, or how well the product is meeting user expectations",
            ],
          },
          {
            kind: "img",
            src: `${IDP}/24-metrics.png`,
            alt: "Measurement framework",
          },
        ],
      },
      {
        id: "reflection",
        no: "12",
        title: "Reflection: not everything makes the MVP",
        body: [
          {
            kind: "h",
            text: "Prioritize high-leverage items",
          },
          {
            kind: "p",
            text: "There was a lot of work to be done, but it was important to prioritize what the enterprise needed rather than lower-impact features.",
          },
          {
            kind: "h",
            text: "It's okay to be flexible",
          },
          {
            kind: "p",
            text: "There were numerous pivots, including what I like to call \"fire-drill designs,\" that shortened or lengthened timelines based on shifting needs and constraints.",
          },
          {
            kind: "h",
            text: "Talk to users throughout the process",
          },
          {
            kind: "p",
            text: "Many people believe you only talk to your users at the start, but constant developer feedback let us tackle real problems we wouldn't have otherwise found.",
          },
          {
            kind: "h",
            text: "Scalability is ideal",
          },
          {
            kind: "p",
            text: "We were able to contribute a few components back to the IDP design system, enabling other development teams to build with less overhead.",
          },
        ],
      },
    ],
    results: [
      { stat: "55", label: "3-Month NPS Score", sub: "3,600 respondents" },
      { stat: "71", label: "UMUX-Lite Score", sub: "2,750 respondents" },
      { stat: "2%", label: "Decrease in time from release to deployment" },
    ],
  },

  {
    slug: "oportun-homepage-widgets",
    title: "Oportun Homepage Widgets",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    tagline:
      "Presenting users with timely and pertinent information about their financial accounts, so they can swiftly take action when managing their finances.",
    hero: `${OPO}/01-hero.png`,
    heroScreens: [`${OPO}/01-hero.png`, `${OPO}/03-process.png`],
    role: "UI/UX Designer",
    team: "Design · Loans, Savings, Credit PODs",
    timeframe: "32 weeks",
    tools: "Figma · A/B testing · Heuristic eval",
    accent: "lime",
    brand: "oportun",
    sections: [
      {
        id: "problem",
        no: "01",
        title: "Problem",
        body: [
          {
            kind: "p",
            text: "Earlier in the year, the Oportun app went through an enormous redesign. Oportun acquired Digit and the name of the app changed. Alongside the rebrand was also a redesign of the app and our product offerings.",
          },
          {
            kind: "p",
            text: "Our business goals were to bring back our retention rate and member-lifetime rate to what those numbers were historically, and to improve new 30–90 day retention.",
          },
        ],
      },
      {
        id: "goals",
        no: "02",
        title: "Goals",
        body: [
          {
            kind: "list",
            items: [
              "Move away from \"feature ads\" toward contextual prompts that help users learn and adopt new features",
              "Increase baseline metrics for SAVE, Loan, and Credit Card products",
              "Create real space for financial insights",
              "Establish a baseline future iterations could build on",
            ],
          },
        ],
      },
      {
        id: "what-we-knew",
        no: "03",
        title: "What we knew",
        body: [
          {
            kind: "p",
            text: "For the first 10 years that Digit was a service before the 2021 Oportun acquisition, they were a company that helped users save by linking their bank accounts and saving for future goals. That was the mental model our users had grown accustomed to. Post-acquisition, the app was rebranded as a savings account that came with a $5 subscription fee.",
          },
          {
            kind: "p",
            text: "The data showed a high level of churn that our users had been experiencing for some time. We started to see a large disparity in our referral numbers as well as our app store ratings.",
          },
          {
            kind: "p",
            text: "A heuristic evaluation of the app showed where we needed to fill the gaps. We had a lack of showing users system status, and we had some of our most important actions buried within sub-pages.",
          },
        ],
      },
      {
        id: "challenges",
        no: "04",
        title: "Challenges & opportunities",
        body: [
          {
            kind: "h",
            text: "Resistance from executive leadership",
          },
          {
            kind: "p",
            text: "After being named the leading savings app of 2023 by Bankrate and several other platforms, executive leadership believed there was no need for alteration. We had to show them, not tell them, what the data was saying.",
          },
          {
            kind: "h",
            text: "Uniformity across product teams",
          },
          {
            kind: "p",
            text: "The product area was wholly owned by the stakeholders, not the designers, and they ultimately had final say on whether or not a feature would be shipped. Buy-in had to be earned across multiple PODs, not won once at the top.",
          },
        ],
      },
      {
        id: "hypotheses",
        no: "05",
        title: "Hypotheses",
        body: [
          {
            kind: "list",
            items: [
              "Introducing product actions to the app would increase savings, loan-payoff rate, and other core product actions, while rebuilding trust with long-term members",
              "Increasing and improving our just-in-time system statuses would help us retain new members because they would now be able to see success sooner",
              "By moving core actions to the homepage, we could begin to build it into a financial insights hub we could then use to activate users into new product offerings",
            ],
          },
          {
            kind: "img",
            src: `${OPO}/02-hypothesis.png`,
            alt: "Hypothesis visualization",
          },
        ],
      },
      {
        id: "process",
        no: "06",
        title: "My process",
        body: [
          {
            kind: "p",
            text: "To begin, we started off with a pretty straightforward A/B test. After meeting with the Loans team stakeholders, my team and I were able to convince them to funnel a percentage of their web traffic directly to a page where users could pay their loans, set up auto-pay, and see relevant loan information.",
          },
          {
            kind: "h",
            text: "The test was a quick win",
          },
          {
            kind: "p",
            text: "We saw that users were 2–3× more likely to set up auto-pay or pay their bill on time when given the action directly versus only the information.",
          },
          {
            kind: "h",
            text: "Getting project buy-in",
          },
          {
            kind: "p",
            text: "A large portion of the project was selling and re-selling this work across the company to a wide range of stakeholders. By collaborating with designers, devs, and PMs, we were quickly able to grow a coalition of product members advocating for the launch.",
          },
          {
            kind: "img",
            src: `${OPO}/03-process.png`,
            alt: "Final widget designs in context",
            caption: "Final widget designs in context.",
          },
        ],
      },
    ],
    results: [
      { stat: "90%", label: "Reduced time for users to set up bill pay" },
      { stat: "37%", label: "Increase in users who set up auto-pay" },
      { stat: "16%", label: "Increase in loans paid on-time" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
