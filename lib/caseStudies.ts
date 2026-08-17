export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "img"; src: string; alt: string; caption?: string; srcMobile?: string }
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
const TIGER = "/images/case-studies/claude-code-tiger-team";
const OPO = "/images/case-studies/oportun-homepage-widgets";
const OCS = "/images/case-studies/oportun-credit-servicing";
const DCC = "/images/case-studies/demex-climate-center";

export const caseStudies: CaseStudy[] = [
  {
    slug: "claude-code-tiger-team",
    title: "Claude Code Setup",
    org: "Capital One · DevX",
    status: "SHIPPED",
    tagline:
      "Claude Code showed up with one way in, and it only worked if you were an engineer. I led the tiger team that opened it to everyone else, and we shipped a setup site that walks you from no access to a running app without needing anyone's help.",
    hero: `${TIGER}/00-preview.svg`,
    heroScreens: [
      `${TIGER}/00-preview.svg`,
      `${TIGER}/07-site-overview.svg`,
      `${TIGER}/08-site-failed-check.svg`,
      `${TIGER}/06-one-click.svg`,
    ],
    role: "Sr. Product Designer, tiger team lead",
    team: "Lead plus 2 designers · working with PM, engineering, One Access and senior leadership",
    timeframe: "3 weeks, March 2026",
    tools: "Claude Code · GitHub · Artifactory · VS Code",
    accent: "cyan",
    brand: "capital-one",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "The setup site",
        body: [
          {
            kind: "p",
            text: "We shipped an onboarding module inside the internal developer experience platform. Seven tasks, in order, each gated on a validation that has to pass before the next one opens.",
          },
          {
            kind: "img",
            src: `${TIGER}/07-site-overview.svg`,
            srcMobile: `${TIGER}/07-site-overview-m.svg`,
            alt: "The setup site with a step list on the left and the current step on the right",
            caption:
              "Rebuilt here from the internal original, which I cannot show.",
          },
          {
            kind: "p",
            text: "Each task ends in a validation the platform runs against your machine and reports back on. Progress is never self-reported, which is the difference between this and the document it replaced.",
          },
          {
            kind: "p",
            text: "Failure states were the harder problem. In the document version a failed step meant posting in a support channel and losing a day, so every failure names the specific thing that is missing and carries its remediation inline.",
          },
          {
            kind: "img",
            src: `${TIGER}/08-site-failed-check.svg`,
            srcMobile: `${TIGER}/08-site-failed-check-m.svg`,
            alt: "A failed check on the setup site, with a plain-language explanation and the fix inline",
            caption:
              "The failure that cost us two days, with the fix on the page.",
          },
          {
            kind: "p",
            text: "The copy carries a lot of the work. Most people going through this have never heard of an entitlement and do not need to, so every task says what it gives you and what breaks if it is missing.",
          },
        ],
      },
      {
        id: "why",
        no: "02",
        title: "Why it existed",
        body: [
          {
            kind: "p",
            text: "Claude Code went live to the engineering org in March, with designers, PMs and the rest of the technology organization to follow. Access had not been tested outside engineering.",
          },
          {
            kind: "p",
            text: "Access at a bank is a chain of entitlements, and every link had been built around a job role none of us had. Two of us requested access on day one and were told we were not eligible. The error did not name the missing entitlement, and the request form did not offer a version we could ask for.",
          },
          {
            kind: "img",
            src: `${TIGER}/01-two-paths.svg`,
            srcMobile: `${TIGER}/01-two-paths-m.svg`,
            alt: "The engineer path clears in three steps. The designer path runs eight gates and ends blocked on four developer-only entitlements.",
            caption: "Same tool, same week, two very different distances.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "We assumed the hard part would be teaching people the tool. It was getting them through the door. Everyone who built that door already had the entitlements it asked for, so nobody had noticed.",
          },
          {
            kind: "p",
            text: "Three of us spent nine days finding every dead end. That was supposed to be the setup week before the real work, and it turned into the work.",
          },
        ],
      },
      {
        id: "changed",
        no: "03",
        title: "What changed",
        body: [
          {
            kind: "p",
            text: "The site fixed the experience. It did not fix the underlying chain, and a site that walks you politely through eight unnecessary requests is still eight unnecessary requests.",
          },
          {
            kind: "p",
            text: "So we took the whole map to the One Access team, who own entitlement provisioning. They had never seen it end to end from a non-engineer's side, because nobody had walked it and written it down. We built a one-click setup with them that requests everything at once, in the right order.",
          },
          {
            kind: "img",
            src: `${TIGER}/06-one-click.svg`,
            srcMobile: `${TIGER}/06-one-click-m.svg`,
            alt: "The eight-gate access chain collapsed into a single request",
            caption: "The first two steps of the site are now a button.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "We set out to write a guide. The better result was that most of it stopped being needed.",
          },
        ],
      },
      {
        id: "challenges",
        no: "04",
        title: "Proving people could use it",
        body: [
          {
            kind: "p",
            text: "Access is not competence. Someone can be fully provisioned and still have no idea what to do with a terminal, and we would have had no way of knowing. So we built a set of challenges, each one harder than the last, and shipped them alongside the onboarding.",
          },
          {
            kind: "img",
            src: `${TIGER}/09-challenges.svg`,
            srcMobile: `${TIGER}/09-challenges-m.svg`,
            alt: "Six challenges of increasing complexity, from running a scaffolded app locally through to deploying a prototype to an internal URL",
            caption: "Each one takes an afternoon. Each one needs the one before it.",
          },
          {
            kind: "p",
            text: "The ramp is the design. Challenge one is just proof your environment works. By challenge three you are pasting a high-fidelity frame into the terminal and asking for the front end, which is the one everybody wanted to try first and the one that would have put them off entirely if we had led with it.",
          },
          {
            kind: "p",
            text: "More than 2,300 people across the technology organization have completed at least one. Access counts would have told me nothing. Finishing a challenge takes an afternoon, so that number is people who built something.",
          },
        ],
      },
      {
        id: "measure",
        no: "05",
        title: "What I would still measure",
        body: [
          {
            kind: "p",
            text: "I can tell you what the work removed and how many people came through it. Eight separate access requests became one, and the two steps that ate the most time now happen before anyone opens the module.",
          },
          {
            kind: "p",
            text: "What I do not have is the shape of the drop-off. I know how many people started and I know the challenges got harder on purpose, but I never got completion rates per challenge, and that is the number that would have told us which step was too big a jump. The other one I would want is time from first request to first running app, since that is what the work shortened.",
          },
          {
            kind: "p",
            text: "The other thing I would do differently is start writing on day one instead of day four. The first three days of fixes got reconstructed from memory and Slack scrollback, and some of them are certainly missing.",
          },
        ],
      },
    ],
    results: [
      { stat: "2,300+", label: "Completed at least one challenge", sub: "Across the technology org" },
      { stat: "8 → 1", label: "Access requests for a non-engineer", sub: "After the One Access build" },
    ],
  },

  {
    slug: "idp-release-plugin",
    title: "IDP Release Plugin",
    org: "Capital One \u00b7 Internal Developer Platform",
    status: "SHIPPED",
    tagline:
      "Shipping code meant checking five tools to answer one question. I designed the release plugin that put it in one place, and it went out to 3,600 engineers.",
    hero: `${IDP}/00-preview.svg`,
    heroScreens: [
      `${IDP}/00-preview.svg`,
      `${IDP}/22-final.png`,
      `${IDP}/03-new-experience.webp`,
      `${IDP}/16-concept-3a.webp`,
    ],
    role: "Sr. Product Designer, owned release experience end to end",
    team: "2 designers \u00b7 product, engineering, audit and cyber partners",
    timeframe: "32 weeks",
    tools: "Figma \u00b7 Lucid \u00b7 Confluence \u00b7 Jira",
    accent: "cyan",
    brand: "capital-one",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "What shipped",
        body: [
          {
            kind: "p",
            text: "Capital One runs its own internal developer platform. I designed the release plugin, the part engineers use to ship code. Everything below is the real thing running, not a prototype.",
          },
          {
            kind: "p",
            text: "There were two designers on the plugin. I owned the release experience end to end, which meant the page itself, the approval flow, every status state, and the audit surface that legal and cyber had to sign off on.",
          },
          {
            kind: "h",
            text: "Approving a release",
          },
          {
            kind: "p",
            text: "The audit and cyber questions sit on the page. You answer them and approve without opening anything else.",
          },
          {
            kind: "video",
            src: `${IDP}/v01-approve.mp4`,
            alt: "A developer answers the audit questions and approves a release inline.",
            caption: "Approving without leaving the page.",
          },
          {
            kind: "h",
            text: "Knowing what you are approving",
          },
          {
            kind: "p",
            text: "Approvers were signing off on releases they could not see inside. The activity trail shows every step Artemis ran, so the decision stops being a guess.",
          },
          {
            kind: "video",
            src: `${IDP}/v02-action.mp4`,
            alt: "The PAR activity trail with an Artemis status update inside the release page.",
            caption: "The PAR activity trail.",
          },
          {
            kind: "h",
            text: "Asking the owner a question",
          },
          {
            kind: "p",
            text: "People kept leaving for Slack to ask what a release contained. Now the thread opens from the page, addressed to whoever submitted it.",
          },
          {
            kind: "video",
            src: `${IDP}/v03-comms.mp4`,
            alt: "Opening a Slack thread to the release submitter from inside the plugin.",
            caption: "Starting a thread with the submitter.",
          },
        ],
      },
      {
        id: "why",
        no: "02",
        title: "Why it needed to exist",
        body: [
          {
            kind: "p",
            text: "Releasing code meant stitching together a handful of tools and a lot of tribal knowledge. On a good day that was annoying. On a bad day a release stalled and nobody could say why.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${IDP}/02-previous.webp`,
                alt: "The previous release experience",
                caption: "Before.",
              },
              {
                src: `${IDP}/03-new-experience.webp`,
                alt: "The new release experience",
                caption: "After.",
              },
            ],
          },
          {
            kind: "h",
            text: "Where the MVP line got drawn",
          },
          {
            kind: "p",
            text: "Nobody on design knew how the existing system worked, so I spent the first two weeks having product and engineering walk me through it for each of the three people who touch a release. ICs, approvers, escalators.",
          },
          {
            kind: "p",
            text: "Mapping the current state against the ideal is what settled the argument about scope. It showed exactly how much of One Pipeline could carry over and how much had to be rebuilt, and that line became the MVP definition we took to leadership.",
          },
          {
            kind: "img",
            src: `${IDP}/09-flow-vs-mvp.png`,
            alt: "Current state release flow compared against the MVP scope",
            caption: "Current state against MVP. The gap between the two is the build.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "Two weeks of mapping up front bought a scope nobody reopened for the next seven months.",
          },
        ],
      },
      {
        id: "constraint",
        no: "03",
        title: "The constraint that reshaped the page",
        body: [
          {
            kind: "p",
            text: "My first layout put the audit questions behind a modal and kept the actions high on the page. Audit came back and said those questions have to be visible at all times, behind no interaction at all.",
          },
          {
            kind: "img",
            src: `${IDP}/15-concept-1.webp`,
            alt: "First concept with audit questions behind a modal",
            caption: "First concept. The modal was the whole idea, and it was the one thing I could not keep.",
          },
          {
            kind: "p",
            text: "That single rule reshaped the layout. Everything mandatory had to fit on one screen without pushing the primary action below the fold. I moved to a nine-three split with the work in the middle and the metadata beside it, and that is the structure that shipped.",
          },
          {
            kind: "video",
            src: `${IDP}/v04-concept3.mp4`,
            alt: "A walkthrough of the layout that shipped, with release activity at top, audit questions in the body, and a sidebar of secondary metadata.",
            caption: "Walking the layout that survived.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${IDP}/18-concept-3c.webp`,
                alt: "Resiliency material change questions surfaced on the page",
                caption: "The audit questions, on the page, behind nothing.",
              },
              {
                src: `${IDP}/17-concept-3b.webp`,
                alt: "Individual modals per CTA with contextual information",
                caption: "One modal per action, each carrying the context you need before you commit.",
              },
            ],
          },
        ],
      },
      {
        id: "testing",
        no: "04",
        title: "What testing changed",
        body: [
          {
            kind: "p",
            text: "People finished the tasks, so on paper the round was a pass. The useful part was what they said while doing it.",
          },
          {
            kind: "quote",
            text: "There were times where I was not sure if I completed a step\u2026and there's no easy way to track that in the system.",
          },
          {
            kind: "quote",
            text: "A Slack link is definitely going to help because I am going to check in with my team. 'Hey what's this all about?' rather than go through extra steps.",
          },
          {
            kind: "p",
            text: "Three changes came out of that round and all three shipped.",
          },
          {
            kind: "features",
            items: [
              {
                title: "Alerts that know your role",
                body: "The banner changes depending on whether you are a PAR approver, an ESC approver, or a dev, so your action is the first thing on the page instead of the fourth.",
              },
              {
                title: "Slack from the page",
                body: "Approvers were already leaving for Slack to ask questions. Instead of trying to keep them on the page, I put the link on it.",
              },
              {
                title: "Bulk approve",
                body: "Approving releases is repetitive enough that people were doing it on autopilot. Letting PAR approvers clear a batch matched how they were already working.",
              },
            ],
          },
          {
            kind: "video",
            src: `${IDP}/v05-bulk.mp4`,
            alt: "Selecting several pending releases and approving them in one action.",
            caption: "Bulk approve.",
          },
          {
            kind: "img",
            src: `${IDP}/22-final.png`,
            alt: "Final release page with role-aware alerts and PAR activity raised up the page",
            caption: "Where it ended up. Role-aware alert up top, PAR activity and justification raised so approvers stop hunting.",
          },
        ],
      },
      {
        id: "after",
        no: "05",
        title: "What outlasted the project",
        body: [
          {
            kind: "p",
            text: "A few of the components I built for this went back into the IDP design system, so the teams building the next plugin got them without asking. That is the part of this project with the longest tail.",
          },
          {
            kind: "h",
            text: "Proving it worked",
          },
          {
            kind: "p",
            text: "Our internal analytics were not wired into the IDP during the closed beta, so I could not lean on behavioral data. I built the measurement plan around UMUX-Lite, NPS and surveys instead. The beta read came back at 71 on UMUX-Lite across 2,750 respondents, with time from release to deployment down 2%. A year later that score had climbed to 82.7 and support tickets had dropped by more than a third.",
          },
          {
            kind: "img",
            src: `${IDP}/24-metrics.png`,
            alt: "Measurement framework built on the HEART model",
            caption: "The measurement plan, built around what we could collect.",
          },
          {
            kind: "h",
            text: "What did not make it",
          },
          {
            kind: "p",
            text: "Mobile approvals never made the beta. I designed the concept anyway because approvers kept telling me they were getting pinged away from their desk, and product wants it in a later increment.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "The clip below is concept work. It has not shipped.",
          },
          {
            kind: "video",
            src: `${IDP}/v06-mobile.mp4`,
            alt: "Concept work showing a release approved on mobile, from push notification to a single tap.",
            caption: "Concept only. Approving from a push notification.",
          },
        ],
      },
    ],
    results: [
      { stat: "39%", label: "Fewer support tickets" },
      { stat: "66 to 82.7", label: "UMUX-Lite, year over year" },
      { stat: "55", label: "3-month NPS", sub: "3,600 respondents" },
    ],
  },

  {
    slug: "oportun-homepage-widgets",
    title: "Oportun Homepage Widgets",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    tagline:
      "The home screen was advertising features while people churned. I replaced the ads with balances you could act on, and auto-pay setup went up 37%.",
    hero: `${OPO}/00-preview.svg`,
    heroScreens: [`${OPO}/00-preview.svg`, `${OPO}/01-hero.webp`, `${OPO}/03-process.webp`],
    role: "Sr. Product Designer, owned the widget system across three product teams",
    team: "Design \u00b7 Loans, Savings and Credit PODs",
    timeframe: "32 weeks",
    tools: "Figma \u00b7 A/B testing \u00b7 Heuristic eval",
    accent: "lime",
    brand: "oportun",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "What shipped",
        body: [
          {
            kind: "p",
            text: "The Oportun home screen used to tell you about features. Now it shows what you have and lets you do something about it without digging. Savings goals, loan balance, the payment that is due, all on the first screen with the action attached.",
          },
          {
            kind: "p",
            text: "I owned the widget system. Three product teams shipped on top of it, and I designed the components all three of them used.",
          },
          {
            kind: "img",
            src: `${OPO}/01-hero.webp`,
            alt: "Three Oportun app screens showing savings goals, goal selection, and the home screen with the savings widget",
            caption: "The home screen on the right is the one that changed. Balances up top, with the actions attached to them.",
          },
        ],
      },
      {
        id: "argument",
        no: "02",
        title: "Leadership did not think anything was wrong",
        body: [
          {
            kind: "p",
            text: "Bankrate had just named us the leading savings app of 2023. From where leadership sat, the product was working.",
          },
          {
            kind: "p",
            text: "The numbers underneath said otherwise. Churn had been high for a while, referrals were sliding, and app store ratings were going with them. Digit had spent ten years as a savings app that moved money into savings for you without being asked. After the acquisition it became a savings account with a five dollar monthly fee, and the home screen was still mostly advertising features.",
          },
          {
            kind: "img",
            src: `${OPO}/02-hypothesis.webp`,
            alt: "Oportun home screen with savings and loan balances at the top and a promotional card below encouraging the user to try investing",
            caption: "Real balances at the top, and directly underneath, a card asking you to go try investing. That gap is the whole problem.",
          },
          {
            kind: "p",
            text: "A heuristic pass turned up the unglamorous version of the same thing. We almost never told people what the system was doing, and the actions they came to perform were buried two screens deep.",
          },
        ],
      },
      {
        id: "test",
        no: "03",
        title: "The cheapest test I could get approved",
        body: [
          {
            kind: "p",
            text: "A deck was not going to move anyone who had just won an award. I needed a number, and it had to come off their own traffic.",
          },
          {
            kind: "p",
            text: "So I talked the Loans team into a small A/B test. Route a slice of web traffic to a page where you could pay the loan, turn on auto-pay and see the balance, instead of a page that only told you about them.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "People were two to three times more likely to set up auto-pay or pay on time when the page let them do it instead of describing it.",
          },
          {
            kind: "p",
            text: "That result is the entire reason the rest of this project happened. Once there was a number attached to one team's own traffic, the conversation stopped being about whether the home screen needed to change.",
          },
        ],
      },
      {
        id: "buyin",
        no: "04",
        title: "Getting it through three teams",
        body: [
          {
            kind: "p",
            text: "Design did not own this surface. Stakeholders did, and they had final say on what shipped. Savings, Loans and Credit each ran their own roadmap, so there was no single yes to go get.",
          },
          {
            kind: "p",
            text: "Most of my time on this went into selling it, one team at a time. What worked was bringing the A/B result and then showing each POD their own metric inside it, because a lift in auto-pay reads very differently to the Loans team than it does to Savings.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "The design took a few weeks. The coalition took months.",
          },
        ],
      },
      {
        id: "system",
        no: "05",
        title: "Built so three teams could use it",
        body: [
          {
            kind: "p",
            text: "Three teams needed the same widget to say different things. The obvious move was three one-off widgets, which would have drifted apart inside a quarter.",
          },
          {
            kind: "p",
            text: "I built one component instead, with the variants and states documented so a designer on any of the three teams could express their own case without coming back to me. Filled or outlined pills, primary, secondary and semantic color, pressed states, and warning styling for things like a bank connection that dropped.",
          },
          {
            kind: "img",
            src: `${OPO}/03-process.webp`,
            alt: "Component specification showing five savings widget variants above annotated Figma property panels for the pill carousel and pill components",
            caption: "The widget across its states, and the component behind it. The annotations are there so another designer can pick it up without asking me how it works.",
          },
          {
            kind: "p",
            text: "The screens shipped. The component is what the next three features got built on.",
          },
        ],
      },
    ],
    results: [
      { stat: "90%", label: "Less time to set up bill pay" },
      { stat: "37%", label: "More people setting up auto-pay" },
      { stat: "16%", label: "More loans paid on time" },
    ],
  },

  /* ─── Oportun Credit Card Servicing ─────────────── */
  {
    slug: "oportun-credit-servicing",
    title: "Credit Card Servicing",
    org: "Oportun (post-Digit acquisition)",
    status: "SHIPPED",
    tagline:
      "Two million members, two products that agreed on nothing, and a March 2023 date nobody could move. I designed credit card servicing into the app without forking the design system to do it.",
    hero: `${OCS}/00-preview.svg`,
    heroScreens: [`${OCS}/00-preview.svg`,
      `${OCS}/01-hero.webp`,
      `${OCS}/02-account-overview.webp`,
      `${OCS}/09-flow-architecture.webp`,
    ],
    role: "Sr. Product Designer, owned credit servicing end to end on iOS and Android",
    team: "Design \u00b7 Loans, Savings and Credit PODs \u00b7 iOS and Android engineering",
    timeframe: "Jul 2022 sprint to Mar 2023 launch",
    tools: "Figma \u00b7 iOS and Android \u00b7 Benchmarking \u00b7 Usability testing",
    accent: "lime",
    brand: "oportun",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "What shipped",
        body: [
          {
            kind: "p",
            text: "Credit card servicing, inside the app 2 million people were already using, on both iOS and Android, on the date it was due.",
          },
          {
            kind: "p",
            text: "I owned all of it. Account overview, payment flows, auto-pay enrollment, transaction history, and every payment status state, on both platforms.",
          },
          {
            kind: "img",
            src: `${OCS}/02-account-overview.webp`,
            alt: "Credit card account overview with status card, auto-pay enrollment prompt, primary pay button and recent activity",
            caption: "The account overview. Status at the top, one obvious action, activity underneath.",
          },
          {
            kind: "p",
            text: "Oportun had bought Digit, a savings app with about ten years of goodwill behind it, and the two products were being merged into one. That put a savings audience and a lending audience in the same app with completely different ideas about what it was for. The credit card was the newest thing in the lineup and none of the loan infrastructure underneath it fit.",
          },
        ],
      },
      {
        id: "decision",
        no: "02",
        title: "The call that had to happen before any design",
        body: [
          {
            kind: "p",
            text: "The fast answer was to build a separate credit design system next to the existing one. Its own components, its own patterns, nothing shared. It looked contained and it had support already.",
          },
          {
            kind: "p",
            text: "I pushed back. Two component libraries doing the same job stop matching each other within a couple of quarters, and members were already confused by the rebrand. The last thing they needed was a second set of patterns to learn inside the same app.",
          },
          {
            kind: "p",
            text: "What settled it was the cost. Extending the existing system was slightly more work up front and cheaper on every feature after it, and that was the version product and engineering could agree to.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "We extended the design system instead of forking it. Credit components were built on top of what already existed.",
          },
          {
            kind: "p",
            text: "That decision had to be made before anyone drew a real screen, so I spent the first two weeks mapping the whole servicing flow end to end. The map is what showed exactly where loan infrastructure could carry the credit card and where it could not.",
          },
          {
            kind: "img",
            src: `${OCS}/09-flow-architecture.webp`,
            alt: "End to end credit card servicing flow architecture from app home through payments, transaction history and auto-pay",
            caption: "The flow map, drawn before any screens. Everything that follows is downstream of where these lines split.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/11-sketches-overview.webp`,
                alt: "Early wireframes exploring how the credit card tab extends existing app navigation",
                caption: "Working out how the credit card tab could hang off the existing navigation.",
              },
              {
                src: `${OCS}/10-sketches-payment.webp`,
                alt: "Early hand drawn wireframes for payment flow layout variations",
                caption: "Payment layouts, sketched while the system question was still open.",
              },
            ],
          },
        ],
      },
      {
        id: "status",
        no: "03",
        title: "Answering where do I stand",
        body: [
          {
            kind: "p",
            text: "People open a credit card screen for one reason. They want to know whether they owe anything and when.",
          },
          {
            kind: "p",
            text: "Reading the support documentation against our usability sessions turned up the thing members never said out loud but were clearly calling in about. The status labels were accurate and still confusing. They had been written to satisfy legal, and legal is not the person squinting at a screen trying to work out whether they are late.",
          },
          {
            kind: "p",
            text: "So I pinned the status card to the top of the credit view instead of showing it only when something was wrong. It had to hold three states, each with its own urgency and its own required legal wording, and it had to be readable without using color to carry the meaning, since color on its own does not meet accessibility requirements.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/03-status-upcoming.webp`,
                alt: "Status card in the upcoming payment state",
                caption: "Upcoming. Informational, no alarm.",
              },
              {
                src: `${OCS}/04-status-due.webp`,
                alt: "Status card in the payment due state",
                caption: "Due. The urgency comes from the label and the badge.",
              },
              {
                src: `${OCS}/05-status-autopay.webp`,
                alt: "Status card in the auto pay enabled state",
                caption: "Auto pay on. Nothing to do.",
              },
            ],
          },
          {
            kind: "p",
            text: "The hierarchy is built from type weight, spacing and a small amount of badge color. Each badge still carries the legally required label, but the layout around it makes the meaning obvious, so the same screen clears compliance and still reads in the two seconds someone gives it.",
          },
        ],
      },
      {
        id: "autopay",
        no: "04",
        title: "Fixing the auto-pay drop-off",
        body: [
          {
            kind: "p",
            text: "Auto-pay is the most useful thing a cardholder can turn on. No late fees, no credit damage, nothing to remember. People were starting the old flow and not finishing it.",
          },
          {
            kind: "p",
            text: "Two things were causing it. Neither showed up in the data. Both came out of testing.",
          },
          {
            kind: "p",
            text: "The old flow sent you out to a settings page to add a bank account before you could enroll, which lost people at the exact moment they had decided to do it. I moved funding source setup inside enrollment so someone who has never linked an account can finish in one pass.",
          },
          {
            kind: "p",
            text: "The second one was harder to spot. People were picking payment dates outside their billing cycle without knowing it, so payments bounced or landed on the wrong statement. The calendar now only offers dates that work, and the disclosure sits on the page instead of behind a tooltip nobody taps.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/06-autopay-amount.webp`,
                alt: "Auto-pay enrollment, selecting a payment amount",
                caption: "Pick an amount, with the billing disclosures right there.",
              },
              {
                src: `${OCS}/07-autopay-date.webp`,
                alt: "Auto-pay enrollment, selecting a date from a calendar limited to valid billing cycle dates",
                caption: "Pick a date. Only the valid ones are selectable.",
              },
            ],
          },
          {
            kind: "img",
            src: `${OCS}/08-autopay-confirm.webp`,
            alt: "Auto-pay review and confirm screen with full ACH authorization language",
            caption: "Review and confirm. The full ACH authorization sits above the button, not behind a link.",
          },
        ],
      },
      {
        id: "parity",
        no: "05",
        title: "Both platforms at the same time",
        body: [
          {
            kind: "p",
            text: "The normal way to do this is design for one platform, ship it, then adapt the second. It sounds cheaper. What you get is a second platform carrying decisions that were made around the first one's quirks.",
          },
          {
            kind: "p",
            text: "On a regulated payment product that stops being a consistency preference and becomes a compliance problem. A payment status has to behave the same way on iOS and Android because the rules apply to both. So I designed them together and specified every status, disclosure and confirmation once for both.",
          },
          {
            kind: "p",
            text: "Delivery went out in the order of member impact and regulatory exposure. Account overview, payment flows and the status hierarchy first, then auto-pay enrollment, secure payment and transaction detail on top of them.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "Shipped on the March date with both platforms in step and no fragmentation regressions.",
          },
        ],
      },
    ],
    results: [
      {
        stat: "4.7\u2605",
        label: "App Store rating",
        sub: "289K+ reviews after launch",
      },
      {
        stat: "1M+",
        label: "Google Play downloads",
        sub: "Across both platforms",
      },
      {
        stat: "Mar '23",
        label: "Shipped on the date",
        sub: "No fragmentation regressions",
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
      "A climate risk startup with more data than anyone outside the analyst team could read. I designed the product that made it usable, and wrote the front end for it.",
    hero: `${DCC}/00-preview.svg`,
    heroScreens: [`${DCC}/00-preview.svg`,`${DCC}/05.webp`, `${DCC}/08.webp`],
    role: "Founding Product Designer, also shipped the front end",
    team: "Founding design and engineering team, working with data science",
    timeframe: "First public product",
    tools: "Figma \u00b7 React \u00b7 UserTesting \u00b7 Strategy",
    accent: "lime",
    brand: "demex",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "What shipped",
        body: [
          {
            kind: "p",
            text: "The Demex Climate Center. Pick a location and it tells you how the weather there has been changing, how erratic it has become, and what that means for a business operating in it.",
          },
          {
            kind: "p",
            text: "I was the founding product designer. Strategy, research, interaction, visual design and prototyping, and I wrote the front end alongside the founding engineers.",
          },
          {
            kind: "img",
            src: `${DCC}/05.webp`,
            alt: "Demex Climate Center showing the Seoul annual average temperature report with trend and variability scores, a plain language explanation, and a historical observations chart",
            caption: "Four scores on the left, and on the right, the same thing said in a sentence. The panel on the right is the part that made this usable.",
          },
        ],
      },
      {
        id: "problem",
        no: "02",
        title: "We had the data. Nobody could read it.",
        body: [
          {
            kind: "p",
            text: "Demex sold climate risk products to insurers and to businesses getting hit by severe weather that never rises to the level of a named disaster. The company already held the data. The problem was that reading it required an analyst.",
          },
          {
            kind: "p",
            text: "Non-catastrophic weather events in the US are up over 500% since 1980 and have cost more than 9.3 billion dollars since 2002. The people absorbing that had no way to look at their own exposure.",
          },
          {
            kind: "p",
            text: "I ran moderated and unmoderated studies with about 50 business owners through UserTesting to find out what they wanted to know. Three findings shaped the product.",
          },
          {
            kind: "features",
            items: [
              {
                title: "Disruption is constant",
                body: "78% reported real operational disruption from unpredictable weather. Lost productivity, higher costs, no way to plan around it.",
              },
              {
                title: "Farming takes it worst",
                body: "65% of agricultural respondents lose crop every year to weather they did not see coming. Average loss is 15% of annual yield.",
              },
              {
                title: "Insurance does not cover it",
                body: "63% found their policy did not cover the weather damage they got, which left them paying for it themselves.",
              },
            ],
          },
          {
            kind: "callout",
            tone: "note",
            text: "So the job was turning decades of climate data into a few numbers a non-analyst could trust in a couple of seconds.",
          },
        ],
      },
      {
        id: "read",
        no: "03",
        title: "Designing the read",
        body: [
          {
            kind: "p",
            text: "I sketched the home and results screens early to settle the hierarchy before anything got built. One climate index at the top, the trend, variability and risk scores next to it, then historical observations and a comparison view underneath.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${DCC}/06.webp`,
                alt: "Wireframe of the Demex Climate Center home page with the climate index, search and an explainer on parametrics",
                caption: "Home. Index first, search second, a short explainer for people who had never heard of parametrics.",
              },
              {
                src: `${DCC}/07.webp`,
                alt: "Wireframe of the search results and detail view with the DVI score, historical band and comparative views",
                caption: "Results. Score, history, comparison, in that order.",
              },
            ],
          },
          {
            kind: "p",
            text: "The decision that mattered most was putting a plain language explanation next to every score instead of under a help link. A trend score of 61 means nothing on its own. A sentence saying temperature has strongly increased over the past ten years and the year to year range is widening is something a business owner can act on.",
          },
        ],
      },
      {
        id: "five",
        no: "04",
        title: "Five users changed the product",
        body: [
          {
            kind: "p",
            text: "Once the platform worked end to end I ran moderated sessions with five people to see whether the navigation and the index itself were working.",
          },
          {
            kind: "quote",
            text: "4 out of 5 users said they wanted a way to look at this data in relation to other areas.",
            speaker: "round-1 testing readout",
          },
          {
            kind: "p",
            text: "Nobody wanted a number in isolation. They wanted to know whether their location was unusual. That reshaped the next sprint, and we built a comparative view that plots locations against historical data so someone looking at Seoul or London or their own zip code can see where it sits against everywhere else.",
          },
          {
            kind: "img",
            src: `${DCC}/08.webp`,
            alt: "Climate trend against variability matrix with every dot representing a location plotted on its historical baseline",
            caption: "Trend against variability. Every dot is a location on its own historical baseline, which is what turns a score into a comparison.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "Fifty survey responses never surfaced this. Five moderated sessions did.",
          },
        ],
      },
      {
        id: "building",
        no: "05",
        title: "Designing it and building it",
        body: [
          {
            kind: "p",
            text: "Being the only designer at a startup means the design is never the constraint. Engineering time is. Writing the front end myself meant the charts, the score components and the comparison view got built the way they were specified, and I could change my mind in code instead of filing a ticket about it.",
          },
          {
            kind: "p",
            text: "It also made the stakeholder conversations easier. At a startup somebody will always want a design changed for a reason that has nothing to do with users, and those conversations go better when you have research behind you and can say what the change will cost to build.",
          },
        ],
      },
    ],
    results: [
      { stat: "12", label: "New clients in year one", sub: "First public product" },
      { stat: "14%", label: "More daily active users", sub: "Year over year" },
      { stat: "5/5", label: "Test rounds that asked for comparison", sub: "Drove the next sprint" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
