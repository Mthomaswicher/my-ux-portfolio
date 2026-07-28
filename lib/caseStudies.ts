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
      "Shipping code meant checking five tools to answer one question. This put tracking, approvals, and status in one place.",
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
            text: "Releasing code here was unpredictable. There was no single place to see what was happening, so teams stitched together a handful of tools and a lot of tribal knowledge. On a good day that was annoying. On a bad day a release stalled and nobody could say why.",
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
            text: "Make releasing something a developer can do in one place, and build it so the rest of the platform can grow around it later.",
          },
          { kind: "h", text: "Approving a release" },
          {
            kind: "p",
            text: "Answer the audit and cyber questions and approve, without leaving the page.",
          },
          {
            kind: "video",
            src: `${IDP}/v01-approve.mp4`,
            alt: "Demo: a developer answers audit questions and approves a release inline.",
            caption: "Single-pass approval flow demo.",
          },
          { kind: "h", text: "Knowing what you are approving" },
          {
            kind: "p",
            text: "The PAR activity trail shows what Artemis did, so approvers are not guessing.",
          },
          {
            kind: "video",
            src: `${IDP}/v02-action.mp4`,
            alt: "Demo: PAR activity trail and Artemis status update in the release page.",
            caption: "PAR activity trail demo.",
          },
          { kind: "h", text: "Asking the owner a question" },
          {
            kind: "p",
            text: "Ask whoever submitted the release what it actually is, without leaving the page.",
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
            text: "Every year the SDLC picks up more tools. Each one makes sense on its own. Together they mean a developer spends the day switching windows instead of working.",
          },
          {
            kind: "p",
            text: "Developers want to stay in flow. Nobody enjoys being the glue between six systems.",
          },
          {
            kind: "h",
            text: "Why did this effort start?",
          },
          {
            kind: "p",
            text: "In early 2024 our CEO made developer experience a company priority: treat internal developers the way we treat customers. That March the DevX team started pitching the IDP, an internal developer platform meant to be the one place developers go.",
          },
          {
            kind: "p",
            text: "The key goal: \"Automate everything but the creative problem solving in developing software.\" The target state was two screens, the IDE and the IDP, and not much else.",
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
              "The IDP pulls the scattered tooling interfaces into one place across the SDLC.",
          },
          {
            kind: "p",
            text: "Seven months later the platform existed, mostly out of the box. After a build-vs-buy analysis, leadership picked the Release Plugin as the first real thing to build. Shipping code is the part of the job you cannot skip, so it was the obvious place to start. We worked with product to pin down what the MVP had to cover.",
          },
        ],
      },
      {
        id: "current-state",
        no: "04",
        title: "Working out what already existed",
        body: [
          {
            kind: "p",
            text: "First we had to reconcile three things that did not match: the ideal IDP experience, the MVP, and what One Pipeline actually did. Three user types too: ICs, approvers, and escalators.",
          },
          {
            kind: "h",
            text: "Where do we start?",
          },
          {
            kind: "p",
            text: "Nobody on design knew how these systems really worked, so we had product and engineering walk us through each persona's path.",
          },
          {
            kind: "img",
            src: `${IDP}/05-zoom.png`,
            alt: "Zoom call with Product and Engineering partners",
            caption: "Zoom call with product and engineering partners.",
          },
          {
            kind: "p",
            text: "Two or three days of that and we finally understood what the One Pipeline UI was doing.",
          },
          {
            kind: "img",
            src: `${IDP}/06-screenshots.png`,
            alt: "Refined deliverable from screenshots",
            caption:
              "Then we cleaned the screenshots into something we could actually walk partners through.",
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
            text: "I drew a detailed wireflow of every step, mostly to force the edge cases into the open.",
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
            text: "We ran eight 30-minute jobs-to-be-done interviews with developers to check whether the flows we had drawn matched what they actually needed.",
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
            text: "Some of this was out of scope for beta, but product and engineering liked it enough to put it on the list for the next PI.",
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
              "Audit questions behind a modal, CTAs high on the page so nobody misses them",
              "Release metadata visible, not buried",
              "Release workflow component visible, but further down",
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
            text: "Product came back and said the audit questions had to sit on the page at all times, no modal. So I moved the release tracker and secondary metadata into the left column and worked out how that reads.",
          },
          {
            kind: "h",
            text: "Concept 3: usability and concept testing",
          },
          {
            kind: "p",
            text: "This is where we landed. A 9:3 layout: primary actions and content in the middle, secondary metadata in the narrow column beside it.",
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
              "Release activity at the top so you know where you are.",
          },
          {
            kind: "img",
            src: `${IDP}/17-concept-3b.webp`,
            alt: "Concept 3 clearer modals",
            caption:
              "A separate modal per CTA, each carrying the context you need before approving or canceling.",
          },
          {
            kind: "img",
            src: `${IDP}/18-concept-3c.webp`,
            alt: "Concept 3 resiliency questions",
            caption:
              "Resiliency material change questions, required by audit. They had to be visible without clicking anything.",
          },
          {
            kind: "img",
            src: `${IDP}/19-concept-3d.webp`,
            alt: "Concept 3 PAR activity",
            caption:
              "Release and PAR activity further down, so approvers can see what is actually in the release.",
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
            text: "Testing went well. People finished the tasks. They also told us plenty about where the screens left them guessing.",
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
            text: "More context, in the right place",
          },
          {
            kind: "list",
            items: [
              "People wanted the system to adapt to their workflow instead of the reverse",
              "Alerts at the top change with your role, whether you are a PAR approver, ESC approver, or dev. Your action is the first thing you see",
              "PAR activity and release info moved up, with the justification attached so there is a record",
            ],
          },
          {
            kind: "img",
            src: `${IDP}/22-final.png`,
            alt: "Final design with contextual alerts and PAR activity",
          },
          {
            kind: "h",
            text: "Stop making people leave to ask a question",
          },
          {
            kind: "p",
            text: "People were leaving the tool to ask questions in Slack and email. Developers already live in Slack, so I added buttons that open a thread with whoever submitted the release.",
          },
          {
            kind: "h",
            text: "Bulk-approve multiple releases",
          },
          {
            kind: "p",
            text: "Approving releases is repetitive enough that people do it on autopilot. So I let PAR approvers clear several at once.",
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
            text: "Out of scope for beta, but well received. Product and engineering want it in the next PI.",
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
            text: "We needed to know whether any of this worked, for users and for the business.",
          },
          {
            kind: "p",
            text: "The business OKR: cut time spent in deployment by 7%.",
          },
          {
            kind: "p",
            text: "For user metrics we used the HEART framework, HAT in our case. Our internal tracking was not wired into the IDP during closed beta, so we were stuck with UMUX-Lite, NPS, and surveys.",
          },
          {
            kind: "list",
            items: [
              "NPS for overall satisfaction and open-ended feedback",
              "UMUX-Lite for usability and whether people actually finished the task",
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
            text: "Build the thing the enterprise needs",
          },
          {
            kind: "p",
            text: "There was more work than time. We built what the enterprise needed and let the rest wait.",
          },
          {
            kind: "h",
            text: "It's okay to be flexible",
          },
          {
            kind: "p",
            text: "Plenty of pivots, including a few genuine fire drills. Timelines moved in both directions.",
          },
          {
            kind: "h",
            text: "Talk to users throughout the process",
          },
          {
            kind: "p",
            text: "A lot of people treat research as a kickoff activity. Talking to developers the whole way through is how we found the problems that mattered.",
          },
          {
            kind: "h",
            text: "Leave things better than you found them",
          },
          {
            kind: "p",
            text: "We pushed a few components back into the IDP design system, so the next team gets them for free.",
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
      "The home screen was advertising features. It should have been telling members what to do about their money.",
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
            text: "Oportun had bought Digit, renamed the app, and redesigned it along with the product lineup. All in the same year.",
          },
          {
            kind: "p",
            text: "The business wanted retention and member lifetime back where they used to be, plus better 30 to 90 day retention on new members.",
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
              "Stop running feature ads. Show people something useful at the moment it matters",
              "Move the baseline numbers on SAVE, Loans, and Credit Card",
              "Make actual room for financial insights",
              "Leave something the next team can build on",
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
            text: "For ten years before the 2021 acquisition, Digit was a savings app. You linked your bank account and it saved for you. That is the app people thought they had. After the acquisition it became a savings account with a $5 monthly fee.",
          },
          {
            kind: "p",
            text: "Churn had been high for a while. Referrals and app store ratings were both sliding.",
          },
          {
            kind: "p",
            text: "A heuristic eval turned up the obvious stuff. We rarely told people what the system was doing, and our most important actions were buried two pages deep.",
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
            text: "Bankrate and a few others named us the leading savings app of 2023, so leadership did not see a problem. Telling them was not going to work. We had to show them the data.",
          },
          {
            kind: "h",
            text: "Uniformity across product teams",
          },
          {
            kind: "p",
            text: "Stakeholders owned the product area, not design, and they had final say on what shipped. So buy-in meant winning over several PODs one at a time instead of getting a single yes at the top.",
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
              "Putting real actions on the home screen would lift savings and loan payoff, and start rebuilding trust with long-time members",
              "Better just-in-time status would keep new members around, because they would see progress sooner",
              "Moving core actions to the home screen would turn it into an insights hub we could grow other products from",
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
            text: "We started with a plain A/B test. The Loans team agreed to send a slice of web traffic straight to a page where you could pay your loan, turn on auto-pay, and see your loan details.",
          },
          {
            kind: "h",
            text: "The test was a quick win",
          },
          {
            kind: "p",
            text: "People were two to three times more likely to set up auto-pay or pay on time when we gave them the action instead of just the information.",
          },
          {
            kind: "h",
            text: "Getting project buy-in",
          },
          {
            kind: "p",
            text: "Most of this project was selling the work, over and over, to different rooms. Designers, devs, and PMs came along one at a time until there were enough of us pushing for launch.",
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
      "Credit card servicing added to a live lending app used by 2M+ members. Two products that agreed on nothing, one design system, and a March 2023 deadline nobody could move.",
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
            text: "Oportun had bought Digit, a savings app with about ten years of goodwill behind it, and the two products were being merged into one app. That put over 2 million members in the same place with completely different ideas about what it was for.",
          },
          {
            kind: "p",
            text: "The credit card was the newest product, and servicing it meant building on infrastructure designed for personal loans. Payment cadences, status states, disclosures: none of it carried over cleanly, and none of it matched how members thought about their money.",
          },
          {
            kind: "callout",
            tone: "minus",
            text: "Missing the deadline would have been bad. Shipping two conflicting mental models to 2M+ members would have been worse, and much harder to undo.",
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
            text: "I owned the whole credit card servicing experience: account overview, payment flows, auto-pay enrollment, transaction history, and every payment status state, on iOS and Android. It had to look like it belonged in the app, survive a compliance review, and be ready for the March 2023 launch.",
          },
          {
            kind: "p",
            text: "The hard part was not the number of screens. It was a question nobody had answered: how much of the loan servicing infrastructure would carry over, how much would stretch, and how much would snap.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "Two weeks for discovery. Every architecture question had to be settled before I drew a single real screen.",
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
            text: "Two weeks meant no research for its own sake. Every method had to answer a specific question about what to build or what to leave alone.",
          },
          {
            kind: "h",
            text: "Competitive benchmarking",
          },
          {
            kind: "p",
            text: "I went through the major consumer credit card apps to see how they handled payment status, scheduling, and funding source setup. Not for inspiration. To find out what members already expect.",
          },
          {
            kind: "h",
            text: "User research across both legacy user bases",
          },
          {
            kind: "p",
            text: "I ran interviews and usability tests with members from both sides, legacy Digit savers and legacy Oportun borrowers now sharing one app. The same three problems came up session after session. People could not tell where they stood on a payment. The date rules in scheduling confused them into dropping out. And nobody knew when a newly added bank account would actually work.",
          },
          {
            kind: "h",
            text: "Agent manual review",
          },
          {
            kind: "p",
            text: "Reading the support docs against our usability findings turned up problems members never said out loud but were clearly calling about. This was the most useful thing I did. The status labels were technically correct and still confusing, because they had been written for legal precision, not for someone trying to work out whether they owed money.",
          },
          {
            kind: "img",
            src: `${OCS}/09-flow-architecture.png`,
            alt: "End-to-end credit card servicing flow architecture",
            caption: "Flow architecture, mapped before any screens: app home through the credit card tab, payments, transaction history, auto-pay. This is where loan and credit infrastructure actually split.",
          },
          {
            kind: "h",
            text: "Flow architecture",
          },
          {
            kind: "p",
            text: "Before drawing anything real I mapped the whole servicing flow: account setup, payments, status, auto-pay, transaction history. That map is what drew the line between shared loan infrastructure and credit-specific work. Get it wrong and everything after it inherits the mistake.",
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
            text: "The decision that mattered most was not a design decision. It was architectural, it had to happen before any visual work, and it meant arguing against a direction that already had momentum.",
          },
          {
            kind: "h",
            text: "The pull toward a parallel system",
          },
          {
            kind: "p",
            text: "The easy answer was a separate credit design system: its own components, its own patterns, sitting next to the existing one. It looked fast. It looked contained. Some stakeholders were already leaning that way.",
          },
          {
            kind: "h",
            text: "Making the case against it",
          },
          {
            kind: "p",
            text: "A second system would have piled up debt and inconsistencies members feel for years. Two component libraries built for the same job drift apart no matter how carefully you manage them. I took the friction data from members already confused by the rebrand to product and engineering leads, and argued that the last thing this app needed was another seam.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "We extended the existing design system instead of forking it. Credit components were built on top of what was there, not beside it. Less ambiguity for the next person, and no new fault line.",
          },
          {
            kind: "p",
            text: "Getting alignment took a lot of conversations outside the sprint team. What finally landed was the math: extending cost slightly more up front and saved on every feature after it.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/10-sketches-payment.png`,
                alt: "Early hand-drawn wireframes for payment flow layout variations",
                caption: "Payment flow sketches, working out status hierarchy and action placement before any system decisions were locked.",
              },
              {
                src: `${OCS}/11-sketches-overview.png`,
                alt: "Early wireframes for credit card account overview and navigation",
                caption: "Account overview sketches, figuring out how the credit card tab could extend the existing navigation without splintering it.",
              },
            ],
          },
        ],
      },
      {
        id: "status",
        no: "05",
        title: "Designing for trust",
        body: [
          {
            kind: "p",
            text: "Credit card servicing is one of the highest-trust screens in a financial app. People open it because they need to pay something, and they want one question answered: where do I stand. Answering that plainly without bending the regulatory language was the whole problem.",
          },
          {
            kind: "h",
            text: "Making the status card the anchor",
          },
          {
            kind: "p",
            text: "I pinned the status card to the top of the credit card view instead of showing it only when something was wrong. People should see where they stand every time they open the app, not just when the system decides it is worth mentioning.",
          },
          {
            kind: "p",
            text: "The card had to hold three states: upcoming, due, and auto-pay active. Each has its own urgency and its own required legal wording. The hard part was making them readable at a glance without using color to carry the meaning, since color alone does not meet accessibility requirements.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/03-status-upcoming.png`,
                alt: "Status card: Upcoming payment state",
                caption: "Upcoming payment. Informational, no alarm.",
              },
              {
                src: `${OCS}/04-status-due.png`,
                alt: "Status card: Payment due state",
                caption: "Payment due. Urgency comes from the label and badge, not color alone.",
              },
              {
                src: `${OCS}/05-status-autopay.png`,
                alt: "Status card: Auto pay enabled state",
                caption: "Auto pay on. Nothing to do.",
              },
            ],
          },
          {
            kind: "p",
            text: "I built the hierarchy out of type weight, spacing, and a small amount of badge color. The badges still carry the required legal label, but the layout around them makes the meaning obvious. The same screen passes compliance and still reads in the two seconds someone actually gives it.",
          },
          {
            kind: "img",
            src: `${OCS}/02-account-overview.png`,
            alt: "Full credit card account overview screen with status card, auto-pay nudge, pay CTA, and recent activity",
            caption: "The full account overview. Status card at the top, a standing auto-pay nudge, the Pay button, and recent activity below.",
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
            text: "Auto-pay is the most useful thing a credit card member can turn on. No late fees, no credit score damage, one less thing to remember. So enrollment mattered. Research showed people dropping out of the existing flow, and the reason was simple: the setup steps arrived at the wrong moment without enough context.",
          },
          {
            kind: "h",
            text: "Folding in the funding source",
          },
          {
            kind: "p",
            text: "The old flow sent you to a settings page to add a bank account before you could start enrolling. That detour killed the intent right when it was highest. I moved funding source setup inside enrollment, so someone who has never linked an account can finish in one pass.",
          },
          {
            kind: "h",
            text: "Keeping dates inside the billing cycle",
          },
          {
            kind: "p",
            text: "People were picking auto-pay dates outside their billing cycle without knowing it, so payments bounced or hit the wrong statement. The fix was a calendar that only offers valid dates, with the disclosure written on the page instead of behind a tooltip nobody taps.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/06-autopay-amount.png`,
                alt: "Auto-pay: select amount screen",
                caption: "Step 1, pick an amount. Three options, with the billing disclosures right there instead of behind a link.",
              },
              {
                src: `${OCS}/07-autopay-date.png`,
                alt: "Auto-pay: select date with billing-cycle-constrained calendar",
                caption: "Step 2, pick a date. The calendar only offers valid billing-cycle dates, due date highlighted.",
              },
            ],
          },
          {
            kind: "img",
            src: `${OCS}/08-autopay-confirm.png`,
            alt: "Auto-pay: review and confirm with full regulatory disclosure",
            caption: "Step 3, review and confirm. The full ACH authorization language sits above the final button, not tucked away.",
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
            text: "The usual approach is to design one platform, ship it, then adapt the second. It sounds efficient. What happens instead is drift, because the second platform inherits decisions made around the first one's quirks.",
          },
          {
            kind: "p",
            text: "On a regulated payment product that drift is a compliance problem, not just a design one. Payment status has to behave identically on iOS and Android, because the law does not care which phone you bought. So I designed both at once.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "Designing both platforms side by side killed regulatory drift before it started. Every payment state, disclosure, and confirmation was specified once, together, instead of patched to match later.",
          },
          {
            kind: "h",
            text: "Phased delivery",
          },
          {
            kind: "p",
            text: "We shipped in order of member impact and regulatory risk. Phase 1 was account overview, payment flows, and status hierarchy: the highest traffic and the most compliance exposure. Phase 2 added auto-pay enrollment, secure payment, and transaction detail on top.",
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
      "First designer at a climate-risk startup, writing front-end code too. We had piles of weather data and nobody outside the analyst team could read it.",
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
              text: "Demex is a climate-risk startup building for insurers and businesses hit by severe but non-catastrophic weather. I was the founding product designer: strategy, research, interaction, visual design, and prototyping for our first public product. I wrote front-end code alongside the founding engineers too.",
            },
            {
              kind: "p",
              text: "We had a mountain of climate and risk data that nobody outside our own analysts could read. The Climate Center was our attempt to make it legible and comparable for the people actually losing money to weather.",
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
              text: "Three things had to be true for this to be worth building: people could use the data, the problem was real, and the goal was specific.",
            },
            {
              kind: "features",
              items: [
                {
                  title: "Our users",
                  body: "Business owners and insurers needed to act on data we already had. Before the Climate Center it was close to unreadable.",
                },
                {
                  title: "The statistics",
                  body: "Non-catastrophic weather events in the U.S. are up over 500% since 1980 and have cost more than $9.3B since 2002. Profitable businesses were getting hit with no way to defend against it.",
                },
                {
                  title: "Our goal",
                  body: "Put a usable web app on top of the data so clients could poke at it themselves and see how weather hits their business.",
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
              text: "I ran moderated and unmoderated studies with about 50 business owners on UserTesting.com, looking for gaps in their insurance experience and what climate data they actually wanted. Three findings shaped the product:",
            },
            {
              kind: "features",
              items: [
                {
                  title: "Business disruption",
                  body: "78% reported real operational disruption from unpredictable weather: lost productivity, higher costs.",
                },
                {
                  title: "Vulnerability",
                  body: "In farming communities, 65% lose crop every year to weather they did not see coming. Average loss: 15% of annual yield.",
                },
                {
                  title: "Insurance gaps",
                  body: "63% said their policy did not actually cover the weather damage they got, which left them exposed.",
                },
              ],
            },
            {
              kind: "callout",
              tone: "note",
              text: "So the job was turning a flood of climate signals into a few numbers a non-analyst could trust at a glance.",
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
              text: "I sketched the home and search-results screens early to lock the hierarchy: one climate index up top, trend, variability, and risk scores beside it, then historical observations and a comparison view below.",
            },
            {
              kind: "imgGrid",
              items: [
                {
                  src: `${DCC}/06.png`,
                  alt: "Wireframe of the Demex Climate Center home page",
                  caption: "Home. Climate Index, search, and a short primer on parametrics.",
                },
                {
                  src: `${DCC}/07.png`,
                  alt: "Wireframe of the search results / detail view",
                  caption: "Search results. DVI score, historical band, comparative geo views.",
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
              text: "Once the thing worked end to end I ran moderated tests with five users to see whether the navigation and the index itself were landing.",
            },
            {
              kind: "quote",
              text: "4 out of 5 users said they wanted a way to look at this data in relation to other areas.",
              speaker: "round-1 testing readout",
            },
            {
              kind: "p",
              text: "That one line reshaped the next sprint. We built a comparative geographic view: a 5×5 trend and variability matrix plotting locations against historical data, so someone looking at Seoul or London or their own zip code can see how it ranks.",
            },
            {
              kind: "img",
              src: `${DCC}/08.png`,
              alt: "London climate trend and variability scatter chart",
              caption: "Climate trend against variability. Every dot is a location plotted on its own historical baseline.",
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
              text: "Business goals versus what users need",
            },
            {
              kind: "p",
              text: "At a startup you will get pushback any time a design contradicts what a stakeholder wants. Those conversations go better with research behind you, and better still when the research shaped the brief everyone already agreed to.",
            },
            {
              kind: "h",
              text: "Five users is enough to start",
            },
            {
              kind: "p",
              text: "The five-user round caught the comparative-data gap that 50 survey responses missed. Different study sizes answer different questions. The small deep one is where the product actually improved.",
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
      "A remittance flow on the Stellar network, so members could send money home faster and cheaper than Western Union or PayPal. Won Most Creative Idea at the Oportun hackathon.",
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
            text: "Oportun exists to serve people traditional banks skip. A big share of those members send money abroad every month, and their options are either slow or expensive. For the hackathon we tried to build a remittance flow on web3 rails that was neither.",
          },
          {
            kind: "p",
            text: "It won Most Creative Idea. The flow looks like the rest of the Oportun app, but crypto does the settlement underneath, so the money lands in seconds for a fraction of the fee.",
          },
          {
            kind: "img",
            src: `${WEB3}/02.png`,
            alt: "Three-up section showing Our Users, The Statistics, and Our Goal",
            caption: "Who sends money, how big the market is, and what we were trying to do about it.",
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
            text: "Remittance is a lifeline for millions of households, and the rails are a generation behind the rest of fintech. Western Union still runs on cash and storefronts. Wires are slow and opaque. PayPal is fast but takes 5 to 11% per transfer, and often the person receiving the money does not have an account.",
          },
          {
            kind: "img",
            src: `${WEB3}/05.png`,
            alt: "Two-up callout: P2P Can be Slow and No Better Option",
            caption: "The same two complaints, over and over. You could have it fast or cheap, not both.",
          },
          {
            kind: "quote",
            text: "I always get nervous when it takes longer and sometimes I don't get a notification. The time it takes is most stressful.",
            speaker: "Luis, Oportun member since 2017",
          },
          {
            kind: "p",
            text: "Luis was not unusual. Across the research, members were already shopping around because nothing served them well.",
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
            text: "We interviewed and surveyed 30+ Oportun members who send money internationally: what they do now, what annoys them, what they wish existed. Three things came through loud.",
          },
          {
            kind: "list",
            items: [
              "Speed is the biggest source of anxiety. People watch the clock between sending and confirmation.",
              "Fees that look small add up fast when you send two or three times a month.",
              "Nobody wants the drive to a Western Union counter or the cash in hand.",
            ],
          },
          {
            kind: "img",
            src: `${WEB3}/04.png`,
            alt: "Quote from Francisco about Western Union friction",
            caption: "Francisco said what a lot of people said. The trip and the cash were as much of a barrier as the fee.",
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
            text: "We boiled the research down to three user stories and built against them.",
          },
          {
            kind: "features",
            items: [
              {
                title: "Instant delivery",
                body: "I want the money to land in seconds so I am not sitting there wondering whether it went through.",
              },
              {
                title: "Home-based",
                body: "I want to send from my phone instead of driving somewhere with cash in my pocket.",
              },
              {
                title: "Cost efficient",
                body: "I want the fee small enough to ignore, so the money goes to my family and not a middleman.",
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
            text: "The idea was to treat crypto as plumbing instead of a product. Members never see a token, a wallet seed, or a block explorer. We picked Stellar for speed, low fees, and its anchor model: regulated partners on each end handling the on-ramp and off-ramp in local currency.",
          },
          {
            kind: "img",
            src: `${WEB3}/08.png`,
            alt: "Diagram of the anchor pathway: Financial Institution Member to Stellar Network to Remittance Recipient via FinClusive and Biccos anchors",
            caption: "The anchor pathway. Sender deposits US$ through a U.S. anchor, the value crosses Stellar in seconds, and a local anchor pays out MX$.",
          },
          {
            kind: "p",
            text: "Bringing engineering in early is what made the design work. We mapped which steps had to be on chain, which could stay in the existing Oportun stack, and where compliance and KYC landed. By prototype time the flow was feasible and scoped to something we could actually build in a hackathon.",
          },
        ],
      },
      {
        id: "solution",
        no: "06",
        title: "What we proposed",
        body: [
          {
            kind: "p",
            text: "The product sits on the Oportun home dashboard next to savings, bills, and goals. You tap in, pick a recipient and an amount, and confirm. Underneath, the U.S. anchor converts to a Stellar asset, settles, and the destination anchor pays out in local currency.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${WEB3}/01.png`,
                alt: "Mobile mockup of the Oportun home dashboard with savings and bills cards",
                caption: "Where the remittance flow sits, next to savings and bills.",
              },
              {
                src: `${WEB3}/07.jpg`,
                alt: "Oportun mobile splash screen on a device frame",
                caption: "Inside the Oportun app people already have. No separate crypto wallet.",
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
            text: "The best part of this project was that design and engineering scoped it together from the first whiteboard. Stellar, the anchor model, and where the MVP stopped all got decided in the same room. That is why the judges believed it could ship.",
          },
          {
            kind: "h",
            text: "Use crypto as plumbing, not the product",
          },
          {
            kind: "p",
            text: "Hiding the chain was the whole trick. Members get the Oportun app they already know, the back end gets Stellar's speed and cost, and nobody has to learn what an anchor is to send money home.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "Won Most Creative Idea for reframing remittances around what members actually asked for: faster, cheaper, from their phone.",
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
