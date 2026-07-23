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
   *  palette + logo, "capital-one" pulls in navy + ribbon red, "demex"
   *  pulls in electric purple + deep navy). */
  brand?: "oportun" | "capital-one" | "demex";
  sections: CaseStudySection[];
  results?: Array<{ stat: string; label: string; sub?: string }>;
};

const IDP = "/images/case-studies/idp-release-plugin";
const OPO = "/images/case-studies/oportun-homepage-widgets";
const OCS = "/images/case-studies/oportun-credit-servicing";
const DCC = "/images/case-studies/demex-climate-center";
const WEB3 = "/images/case-studies/web3-remittances";

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
    brand: "capital-one",
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

  /* ─── Oportun Credit Card Servicing ─────────────────────────────── */
  {
    slug: "oportun-credit-servicing",
    title: "Credit Card Servicing",
    org: "Oportun (post-Digit acquisition)",
    status: "SHIPPED",
    tagline:
      "Designing regulated credit card servicing into a live lending app for 2M+ members: unifying two incompatible product ecosystems under one design system before a hard March 2023 deadline.",
    hero: `${OCS}/01-hero.png`,
    heroScreens: [
      `${OCS}/01-hero.png`,
      `${OCS}/02-account-overview.png`,
      `${OCS}/09-flow-architecture.png`,
    ],
    role: "UI/UX Designer",
    team: "Design · Loans, Savings & Credit PODs · iOS & Android Eng",
    timeframe: "Jul 2022 sprint → Mar 2023 launch",
    tools: "Figma · iOS & Android · Benchmarking · Usability Testing",
    accent: "lime",
    brand: "oportun",
    sections: [
      {
        id: "situation",
        no: "01",
        title: "The situation",
        body: [
          {
            kind: "p",
            text: "Oportun had recently acquired Digit, a savings app with close to a decade of user trust, and the two products were mid-convergence: Digit's savings-first user base and Oportun's loans user base were being unified under a single Oportun app. Between them, well over 2 million members were now in the same app, holding two very different sets of expectations about what it was for.",
          },
          {
            kind: "p",
            text: "The credit card was the newest piece of the lineup, and servicing it meant building on top of infrastructure designed from the ground up around personal loans. None of it (payment cadences, status states, regulatory disclosures) mapped cleanly from loans to a credit card, and none of it matched how members already thought about their money.",
          },
          {
            kind: "callout",
            tone: "minus",
            text: "Missing the deadline would have been bad. Handing 2M+ members two incompatible mental models inside one app would have been worse, and much harder to walk back.",
          },
        ],
      },
      {
        id: "task",
        no: "02",
        title: "The task",
        body: [
          {
            kind: "p",
            text: "As UI/UX Designer, I owned the full credit card servicing experience end to end: account overview, payment flows, auto-pay enrollment, transaction history, and the various payment status states, across iOS and Android. It had to feel like it belonged in the existing Oportun app, hold up under regulatory scrutiny, and be ready for a unified launch in March 2023.",
          },
          {
            kind: "p",
            text: "The hard part wasn't the amount of surface area to design. It was a question nobody had answered yet: how much of the loan servicing infrastructure could actually carry over to a credit card, how much needed to stretch, and how much would just break under the attempt.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "Two weeks for discovery. Every architectural question had to be settled before a single high-fidelity pixel got drawn.",
          },
        ],
      },
      {
        id: "discovery",
        no: "03",
        title: "Getting smart, fast",
        body: [
          {
            kind: "p",
            text: "With only two weeks, there wasn't room for research that didn't directly shape a decision. Every method I used had to answer something specific about what to build, or what to leave alone.",
          },
          {
            kind: "h",
            text: "Competitive benchmarking",
          },
          {
            kind: "p",
            text: "To get a baseline for what a member already expects to find, I looked at how the leading consumer credit card apps handled the basics: payment status, scheduling flows, funding source setup. Less inspiration board, more reality check.",
          },
          {
            kind: "h",
            text: "User research across both legacy user bases",
          },
          {
            kind: "p",
            text: "Interviews and usability tests drew from members on both sides of the convergence, legacy Digit savers and legacy Oportun borrowers now sharing one app, and turned up three friction patterns that kept surfacing, session after session: anxiety over unclear payment status, drop-off in scheduling caused by confusing date constraints, and uncertainty about when a newly added funding source would actually be usable.",
          },
          {
            kind: "h",
            text: "Agent manual review",
          },
          {
            kind: "p",
            text: "Cross-referencing customer support documentation against our usability findings surfaced problems members never said out loud but were clearly driving call volume. This was the most useful step by far. Status labels that were technically correct were still confusing people, because the language had been written for legal precision, not for someone trying to figure out if they owed money.",
          },
          {
            kind: "img",
            src: `${OCS}/09-flow-architecture.png`,
            alt: "End-to-end credit card servicing flow architecture",
            caption: "Flow architecture, mapped before any screens were drawn: from app home through the credit card tab, payment flows, transaction history, and auto-pay enrollment. This is where the loan and credit infrastructure actually diverged.",
          },
          {
            kind: "h",
            text: "Flow architecture",
          },
          {
            kind: "p",
            text: "Before opening Figma at high fidelity, I mapped the entire servicing flow end to end: account setup, payments, status handling, auto-pay, transaction history. That map is what drew the line between what could stay shared loan infrastructure and what had to become credit-specific. Get that wrong early, and everything downstream inherits the mistake.",
          },
        ],
      },
      {
        id: "decision",
        no: "04",
        title: "The system decision",
        body: [
          {
            kind: "p",
            text: "The moment that mattered most on this project wasn't really a design choice. It was architectural, it had to happen before any visual design started, and it meant pushing back on a direction that already had momentum with stakeholders.",
          },
          {
            kind: "h",
            text: "The pull toward a parallel system",
          },
          {
            kind: "p",
            text: "The obvious answer to \"how do we add credit card servicing?\" was to spin up a credit-specific design system next to the existing one, its own components, its own patterns, separate from everything else. It looked fast. It looked contained. A few stakeholders were already leaning that way.",
          },
          {
            kind: "h",
            text: "Making the case against it",
          },
          {
            kind: "p",
            text: "A parallel system would have quietly piled up technical debt and inconsistencies members would feel for years. Two component systems built for the same purpose tend to drift apart no matter how carefully you manage them. I brought the friction data from members who were already confused by the rebrand and made the case, directly to product and engineering leads, that the last thing this product needed was one more seam for people to trip over.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "We extended the existing design system instead of forking it. Credit-specific components were built on top of what already existed, not next to it. Less ambiguity for whoever touched this next, and no new fault line for the platform to drift along.",
          },
          {
            kind: "p",
            text: "Getting product and engineering aligned took conversations well outside the sprint team. What tipped it, in the end, was showing that extension cost barely more up front and saved enormously on every feature that came after.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/10-sketches-payment.png`,
                alt: "Early hand-drawn wireframes for payment flow layout variations",
                caption: "Payment flow explorations: lo-fi sketches mapping status hierarchy and action placement before any system decisions were locked.",
              },
              {
                src: `${OCS}/11-sketches-overview.png`,
                alt: "Early wireframes for credit card account overview and navigation",
                caption: "Account overview explorations: working out how the credit card tab extended existing app navigation without fragmenting it.",
              },
            ],
          },
        ],
      },
      {
        id: "status",
        no: "05",
        title: "Designing for trust in a regulated surface",
        body: [
          {
            kind: "p",
            text: "Credit card servicing sits among the highest-trust surfaces in a financial app. Members show up because they need to pay something, and the one question on their mind is where do I stand. Answering that plainly, without cutting corners on regulatory accuracy, was the whole design problem.",
          },
          {
            kind: "h",
            text: "Making the status card the anchor",
          },
          {
            kind: "p",
            text: "I kept the status card pinned at the top of the credit card view instead of tucking it away as something that only appears when there's a problem. Members needed their payment position visible on every visit, not only when the system judged it worth surfacing. On a regulated payment surface, that constant visibility is basically the deal you're making with the user.",
          },
          {
            kind: "p",
            text: "That card had to hold three distinct states (upcoming, due, auto-pay active), each carrying its own urgency and its own required legal language. Making each one readable at a glance without leaning on color to do the work was the actual challenge; color alone doesn't meet accessibility requirements.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/03-status-upcoming.png`,
                alt: "Status card: Upcoming payment state",
                caption: "Upcoming payment: calm, informational, no urgency.",
              },
              {
                src: `${OCS}/04-status-due.png`,
                alt: "Status card: Payment due state",
                caption: "Payment due: urgency through label and badge, not color alone.",
              },
              {
                src: `${OCS}/05-status-autopay.png`,
                alt: "Status card: Auto pay enabled state",
                caption: "Auto pay enabled. Member can relax. Trust confirmed.",
              },
            ],
          },
          {
            kind: "p",
            text: "What I landed on used type weight, spacing, and a restrained touch of badge-level color to build the hierarchy. Each badge still carried the legally required label, but the surrounding layout made the human meaning obvious, so the same screen could pass a compliance review and still make sense to someone glancing at their phone for two seconds.",
          },
          {
            kind: "img",
            src: `${OCS}/02-account-overview.png`,
            alt: "Full credit card account overview screen with status card, auto-pay nudge, pay CTA, and recent activity",
            caption: "The full account overview: status card anchors the page with a persistent auto-pay enrollment nudge, a primary Pay CTA, and recent activity below.",
          },
        ],
      },
      {
        id: "autopay",
        no: "06",
        title: "The auto-pay enrollment flow",
        body: [
          {
            kind: "p",
            text: "Auto-pay is about the most valuable thing a credit card member can do. It kills late fees, protects credit scores, and takes a recurring worry off their plate. Getting people enrolled mattered. But the research showed real drop-off in the existing flow, and tracing it back led to a simple cause: setup steps were showing up at the wrong moment, without the context members needed.",
          },
          {
            kind: "h",
            text: "Folding in the funding source",
          },
          {
            kind: "p",
            text: "The old pattern sent members off to a separate settings section to add a funding source before they could even start enrolling in auto-pay. That detour killed momentum right when intent was highest. I rebuilt the flow so connecting a funding source happens inside auto-pay enrollment itself, so someone who's never linked a bank account can go start to finish without leaving the flow.",
          },
          {
            kind: "h",
            text: "Keeping dates inside the billing cycle",
          },
          {
            kind: "p",
            text: "Members were scheduling auto-pay for dates outside their billing cycle without realizing it, which meant payments got rejected or landed on the wrong statement. The fix was a calendar constrained to valid billing-cycle dates, with the disclosure written out inline instead of hidden behind a tooltip nobody was going to tap.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/06-autopay-amount.png`,
                alt: "Auto-pay: select amount screen",
                caption: "Step 1: select amount. Three clear options with billing disclosures surfaced in context, not behind a link.",
              },
              {
                src: `${OCS}/07-autopay-date.png`,
                alt: "Auto-pay: select date with billing-cycle-constrained calendar",
                caption: "Step 2: select date. Calendar constrained to valid billing-cycle dates with due date highlighted.",
              },
            ],
          },
          {
            kind: "img",
            src: `${OCS}/08-autopay-confirm.png`,
            alt: "Auto-pay: review and confirm with full regulatory disclosure",
            caption: "Step 3: review and confirm. Full ACH authorization language surfaced before the final action, satisfying regulatory requirements without hiding them.",
          },
        ],
      },
      {
        id: "parity",
        no: "07",
        title: "Building both platforms at once",
        body: [
          {
            kind: "p",
            text: "The usual approach to multi-platform design is to build for one platform, ship it, then adapt the second. It sounds efficient: design it once. What actually happens is drift: the second platform inherits decisions shaped by the first platform's quirks, not by what's actually right for it.",
          },
          {
            kind: "p",
            text: "For a regulated payment product, that drift is a compliance problem, not just a design one. Payment status has to behave the same way on iOS and Android. The law doesn't care which OS someone's on. I designed both platforms in parallel so every status state, every disclosure, every confirmation pattern matched by design, not by coincidence.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "Designing iOS and Android side by side ruled out regulatory drift before it could start. Every payment state, disclosure, and confirmation flow was specified once, together, not patched to match after the fact.",
          },
          {
            kind: "h",
            text: "Phased delivery",
          },
          {
            kind: "p",
            text: "Delivery order followed member impact and regulatory risk. Account overview, payment flows, and status hierarchy went out in Phase 1: the highest-traffic, most compliance-sensitive ground. Auto-pay enrollment, secure payment, and transaction detail followed in Phase 2, built on the foundation Phase 1 had already laid.",
          },
        ],
      },
    ],
    results: [
      {
        stat: "4.7★",
        label: "App Store rating",
        sub: "289K+ reviews post-launch",
      },
      {
        stat: "1M+",
        label: "Google Play downloads",
        sub: "Across both platforms at scale",
      },
      {
        stat: "Mar '23",
        label: "Unified launch shipped on time",
        sub: "Zero fragmentation regressions",
      },
    ],
  },

  /* ─── Demex Climate Center ───────────────────────────────────────── */
  {
    slug: "demex-climate-center",
    title: "Demex Climate Center",
    org: "The Demex Group",
    status: "SHIPPED",
    tagline:
      "Founding product design and full-stack engineering for a climate-risk web app, turning dense weather data into something insurers and businesses could actually act on.",
    hero: `${DCC}/05.png`,
    heroScreens: [`${DCC}/05.png`, `${DCC}/08.png`],
    role: "Founding Product Designer · Full-Stack Engineer",
    team: "Founding design + eng team, cross-functional with data science",
    timeframe: "First public-facing product launch",
    tools: "Figma · React · UserTesting · Strategy",
    accent: "lime",
    brand: "demex",
    sections: [
        {
          id: "overview",
          no: "01",
          title: "Overview",
          body: [
            {
              kind: "p",
              text: "The Demex Group is a design-driven climate-risk startup specializing in products for insurers and businesses exposed to extreme but non-catastrophic weather. As founding product designer, I owned product strategy, user research, interaction, visual design, and prototyping for our first public-facing product, and pulled my full-stack engineering background back out to ship the front-end alongside the founding eng team.",
            },
            {
              kind: "p",
              text: "We were sitting on a mountain of climate and risk data that nobody outside our analysts could actually parse. The Demex Climate Center is what we built to make that data legible, comparable, and useful to the people whose bottom line was getting pummeled by weather.",
            },
          ],
        },
        {
          id: "problem",
          no: "02",
          title: "Understanding the problem",
          body: [
            {
              kind: "p",
              text: "Three things had to be true for the product to matter: our users had to actually be able to use the data, the macro problem had to be real, and the goal had to be specific.",
            },
            {
              kind: "features",
              items: [
                {
                  title: "Our users",
                  body: "Business owners and insurers needed a way to act on the data we already had, to protect revenue against weather events. Pre-Climate-Center, the data wasn't easy to analyze.",
                },
                {
                  title: "The statistics",
                  body: "U.S. non-catastrophic weather events have risen over 500% since 1980, with more than $9.3B in economic losses since 2002. Profitable businesses needed a way to defend their bottom line.",
                },
                {
                  title: "Our goal",
                  body: "Build a user-friendly web app on top of the data we already had so clients could interact with it directly and learn how weather actually affects their business.",
                },
              ],
            },
          ],
        },
        {
          id: "research",
          no: "03",
          title: "User research",
          body: [
            {
              kind: "p",
              text: "I ran moderated and unmoderated studies with roughly 50 business owners through UserTesting.com to find the gaps in their existing insurance experience and pin down what climate data they actually wished they had. Three findings drove the eventual product surface:",
            },
            {
              kind: "features",
              items: [
                {
                  title: "Business disruption",
                  body: "78% of surveyed owners reported significant disruptions to operations from unpredictable weather, leading to reduced productivity and higher costs.",
                },
                {
                  title: "Vulnerability",
                  body: "In agricultural communities, 65% reported yearly losses from unanticipated weather events, with an average loss of 15% of their annual yield.",
                },
                {
                  title: "Insurance gaps",
                  body: "63% said their existing policies didn't adequately cover weather-related damages, leaving them financially exposed.",
                },
              ],
            },
            {
              kind: "callout",
              tone: "note",
              text: "Translation: we needed to turn a flood of climate signals into a small set of meaningful numbers a non-analyst could trust at a glance.",
            },
          ],
        },
        {
          id: "wireframing",
          no: "04",
          title: "Early wireframing",
          body: [
            {
              kind: "p",
              text: "I sketched out the home and search-results screens early to lock in the information hierarchy: a single climate index up top, the supporting trend / variability / risk scores beside it, then a deep-dive band of historical observations and a comparison view.",
            },
            {
              kind: "imgGrid",
              items: [
                {
                  src: `${DCC}/06.png`,
                  alt: "Wireframe of the Demex Climate Center home page",
                  caption: "Home: Climate Index, search, parametrics primer.",
                },
                {
                  src: `${DCC}/07.png`,
                  alt: "Wireframe of the search results / detail view",
                  caption: "Search results: DVI score, historical band, comparative geo views.",
                },
              ],
            },
          ],
        },
        {
          id: "iteration",
          no: "05",
          title: "Testing and iteration",
          body: [
            {
              kind: "p",
              text: "Once the platform was working end-to-end I ran a round of moderated tests with five real users (the Nielsen sweet spot) to gauge whether the navigation and the core read of the index were actually landing.",
            },
            {
              kind: "quote",
              text: "4 out of 5 users said they wanted a way to look at this data in relation to other areas.",
              speaker: "round-1 testing readout",
            },
            {
              kind: "p",
              text: "That single insight reshaped the next sprint. We added a comparative geographic view: a 5×5 climate-trend / variability matrix that plots locations against historical data, so a user looking at Seoul or London or their own zip code could see how their place ranks against the rest of the world.",
            },
            {
              kind: "img",
              src: `${DCC}/08.png`,
              alt: "London climate trend and variability scatter chart",
              caption: "Climate trend × variability matrix: every dot is a location plotted against its historical baseline.",
            },
          ],
        },
        {
          id: "takeaways",
          no: "06",
          title: "Key learnings",
          body: [
            {
              kind: "h",
              text: "Balancing business goals with UX",
            },
            {
              kind: "p",
              text: "In a startup it's not unusual to get pushback on a design that contradicts something a stakeholder wants. Those conversations go best when you have research lined up to advocate for users. Even better when the research already shaped the brief everyone signed off on.",
            },
            {
              kind: "h",
              text: "Five users is enough to start",
            },
            {
              kind: "p",
              text: "The five-user round caught the comparative-data gap that 50-user surveys hadn't surfaced. Different study sizes answer different questions; the smaller, deeper round was where the product actually got better.",
            },
          ],
        },
      ],
    results: [
      { stat: "12", label: "New clients onboarded in year one", sub: "First product launch" },
      { stat: "14%", label: "Increase in daily active users", sub: "Year-over-year" },
      { stat: "5/5", label: "Testing rounds where comparative views came up", sub: "Drove next sprint" },
    ],
  },

  /* ─── Web3 Powered Remittances (Oportun hackathon) ───────────────── */
  {
    slug: "web3-powered-remittances",
    title: "Web3 Powered Remittances",
    org: "Oportun · Hackathon",
    status: "WON",
    tagline:
      "Most Creative Idea winner at the Oportun hackathon. Re-imagined cross-border remittances on the Stellar network so members could send money home faster and cheaper than Western Union or PayPal.",
    hero: `${WEB3}/01.png`,
    heroScreens: [`${WEB3}/01.png`, `${WEB3}/08.png`, `${WEB3}/02.png`],
    role: "Product Designer",
    team: "Cross-functional design + engineering hackathon team",
    timeframe: "Oportun hackathon · Most Creative Idea winner",
    tools: "Figma · Stellar Network · Strategy · User research",
    accent: "amber",
    brand: "oportun",
    sections: [
      {
        id: "overview",
        no: "01",
        title: "Overview",
        body: [
          {
            kind: "p",
            text: "Oportun's mission is to deliver affordable, responsible financial services to people the legacy banking system has overlooked. A huge slice of that user base sends money abroad every month, and the existing options either move slow or charge a premium. For our hackathon, my team set out to design a remittance experience built on web3 rails that could close that gap.",
          },
          {
            kind: "p",
            text: "We won Most Creative Idea for the result: a flow that hands members a remittance product that feels native to the Oportun app, but uses crypto as a behind-the-scenes settlement layer so the money arrives in seconds for a fraction of the cost.",
          },
          {
            kind: "img",
            src: `${WEB3}/02.png`,
            alt: "Three-up section showing Our Users, The Statistics, and Our Goal",
            caption: "Framing the opportunity: who Oportun's remittance users are, the size of the market, and what we set out to do.",
          },
        ],
      },
      {
        id: "problem",
        no: "02",
        title: "Understanding the problem",
        body: [
          {
            kind: "p",
            text: "Remittance is a financial lifeline for millions of households, but the rails most members default to are stuck a generation behind the rest of fintech. Western Union still leans on physical cash and storefront pickup. Wire transfers are slow and opaque. PayPal is fast but charges 5–11% per transfer, and the recipient frequently does not have an account.",
          },
          {
            kind: "img",
            src: `${WEB3}/05.png`,
            alt: "Two-up callout: P2P Can be Slow and No Better Option",
            caption: "The two patterns we kept hearing from members: speed and cost forced an either/or trade.",
          },
          {
            kind: "quote",
            text: "I always get nervous when it takes longer and sometimes I don't get a notification. The time it takes is most stressful.",
            speaker: "Luis, Oportun member since 2017",
          },
          {
            kind: "p",
            text: "Luis was not alone. The pattern across our research was that members were already shopping for alternatives because no single product was actually serving them.",
          },
        ],
      },
      {
        id: "research",
        no: "03",
        title: "User research",
        body: [
          {
            kind: "p",
            text: "We ran interviews and surveys with 30+ Oportun members who send money internationally. The conversations covered current behavior, frustrations, and what an ideal flow would feel like. Three things became loud signals.",
          },
          {
            kind: "list",
            items: [
              "Speed of delivery is the single biggest source of anxiety. Members track every minute between send and confirmation.",
              "Fees that look small on the surface compound fast for people sending money two or three times a month.",
              "The trip to a Western Union storefront and the cash-in-hand step are pain points members are ready to leave behind.",
            ],
          },
          {
            kind: "img",
            src: `${WEB3}/04.png`,
            alt: "Quote from Francisco about Western Union friction",
            caption: "Francisco's quote was a recurring theme: the physical trip and cash handling were as much of a barrier as the fee.",
          },
        ],
      },
      {
        id: "stories",
        no: "04",
        title: "Key user stories",
        body: [
          {
            kind: "p",
            text: "From the research we boiled the opportunity down into three user stories that became the north star for everything we built next.",
          },
          {
            kind: "features",
            items: [
              {
                title: "Instant delivery",
                body: "As a remitter, I want my recipient to receive the funds in seconds so I do not have to worry about whether the transfer went through.",
              },
              {
                title: "Home-based",
                body: "As a remitter, I want to send from my phone without driving to a storefront or carrying cash so the experience fits into my day.",
              },
              {
                title: "Cost efficient",
                body: "As a remitter, I want the fee to feel negligible so my money goes to my family instead of an intermediary.",
              },
            ],
          },
        ],
      },
      {
        id: "engineering",
        no: "05",
        title: "Engineering considerations",
        body: [
          {
            kind: "p",
            text: "The creative leap was treating crypto as plumbing rather than a product. Members never see a token, a wallet seed, or a chain explorer. We chose the Stellar network for its speed, low transaction cost, and built-in anchor model: regulated partners on each side that handle the on-ramp and off-ramp in local currency.",
          },
          {
            kind: "img",
            src: `${WEB3}/08.png`,
            alt: "Diagram of the anchor pathway: Financial Institution Member to Stellar Network to Remittance Recipient via FinClusive and Biccos anchors",
            caption: "Anchor pathway: the sender deposits US$ through a U.S. anchor, value moves across Stellar in seconds, and the recipient receives MX$ from a local anchor.",
          },
          {
            kind: "p",
            text: "Pulling engineering into the conversation early was the move that unlocked the design. Together we mapped which steps had to live on chain, which could stay in the existing Oportun stack, and where compliance and KYC needed to land. By the time we built the prototype, the flow was both feasible and clearly scoped to a hackathon-sized MVP.",
          },
        ],
      },
      {
        id: "solution",
        no: "06",
        title: "The proposed experience",
        body: [
          {
            kind: "p",
            text: "We surfaced the new product as a first-class action inside the Oportun home dashboard, alongside savings, bills, and goals. Members tap into a familiar send-money flow, choose the recipient and amount, and confirm. Behind the scenes, the U.S. anchor converts to a Stellar asset, settles, and the destination anchor pays out in local currency.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${WEB3}/01.png`,
                alt: "Mobile mockup of the Oportun home dashboard with savings and bills cards",
                caption: "Dashboard surface where the remittance flow lives alongside savings and bills.",
              },
              {
                src: `${WEB3}/07.jpg`,
                alt: "Oportun mobile splash screen on a device frame",
                caption: "Native to the existing Oportun app, no separate crypto wallet to manage.",
              },
            ],
          },
        ],
      },
      {
        id: "takeaways",
        no: "07",
        title: "Key takeaways",
        body: [
          {
            kind: "h",
            text: "Bring engineering in on day one",
          },
          {
            kind: "p",
            text: "The strongest part of this project was that design and engineering scoped the idea together from the first whiteboard. Decisions about Stellar, the anchor model, and what a hackathon-sized MVP actually looked like came out of the same room. The result was a concept the judges believed could actually ship.",
          },
          {
            kind: "h",
            text: "Use crypto as plumbing, not the product",
          },
          {
            kind: "p",
            text: "The biggest unlock was hiding the chain. Members get a familiar Oportun experience, the back end gets the speed and cost profile of Stellar, and nobody has to learn what an anchor is to send money home.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "Won Most Creative Idea at the Oportun hackathon for re-framing remittances around what members actually wanted: faster, cheaper, and from their phone.",
          },
        ],
      },
    ],
    results: [
      { stat: "$5", label: "Saved per remittance transaction", sub: "vs. Western Union baseline" },
      { stat: "8,500", label: "New remittance users projected", sub: "First 3 months" },
      { stat: "WON", label: "Most Creative Idea", sub: "Oportun hackathon" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
