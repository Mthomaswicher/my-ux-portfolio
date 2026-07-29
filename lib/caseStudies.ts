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
    org: "Capital One \u00b7 Internal Developer Platform",
    status: "SHIPPED",
    tagline:
      "Shipping code meant checking five tools to answer one question. I designed the release plugin that put it in one place, and it went out to 3,600 engineers.",
    hero: `${IDP}/22-final.png`,
    heroScreens: [
      `${IDP}/22-final.png`,
      `${IDP}/03-new-experience.png`,
      `${IDP}/16-concept-3a.webp`,
      `${IDP}/17-concept-3b.webp`,
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
            text: "Capital One runs its own internal developer platform. I designed the release plugin, the part engineers use to actually ship code. Everything below is the real thing running, not a prototype.",
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
            text: "Approvers were signing off on releases they could not see inside. The activity trail shows what Artemis actually did, so the decision stops being a guess.",
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
                src: `${IDP}/02-previous.png`,
                alt: "The previous release experience",
                caption: "Before.",
              },
              {
                src: `${IDP}/03-new-experience.png`,
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
            text: "Nobody on design knew how the existing system really worked, so I spent the first two weeks having product and engineering walk me through it for each of the three people who touch a release. ICs, approvers, escalators.",
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
            src: `${IDP}/15-concept-1.png`,
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
            caption: "Where it landed. Role-aware alert up top, PAR activity and justification raised so approvers stop hunting.",
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
            text: "Our internal analytics were not wired into the IDP during the closed beta, so I could not lean on behavioral data. I built the measurement plan around UMUX-Lite, NPS and surveys instead, which is what the numbers below come from.",
          },
          {
            kind: "img",
            src: `${IDP}/24-metrics.png`,
            alt: "Measurement framework built on the HEART model",
            caption: "The measurement plan, built around what we could actually collect.",
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
      { stat: "55", label: "3-month NPS", sub: "3,600 respondents" },
      { stat: "71", label: "UMUX-Lite score", sub: "2,750 respondents" },
      { stat: "2%", label: "Faster from release to deployment" },
    ],
  },

  {
    slug: "oportun-homepage-widgets",
    title: "Oportun Homepage Widgets",
    org: "Oportun (formerly Digit)",
    status: "SHIPPED",
    tagline:
      "The home screen was advertising features while people churned. I replaced the ads with balances you could act on, and auto-pay setup went up 37%.",
    hero: `${OPO}/01-hero.png`,
    heroScreens: [`${OPO}/01-hero.png`, `${OPO}/03-process.png`],
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
            src: `${OPO}/01-hero.png`,
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
            text: "The numbers underneath said otherwise. Churn had been high for a while, referrals were sliding, and app store ratings were going with them. Digit had spent ten years as a savings app that quietly moved money for you. After the acquisition it became a savings account with a five dollar monthly fee, and the home screen was still mostly advertising features.",
          },
          {
            kind: "img",
            src: `${OPO}/02-hypothesis.png`,
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
            text: "A deck was not going to move anyone who had just won an award. I needed a number, and I needed it from their own traffic rather than a study.",
          },
          {
            kind: "p",
            text: "So I talked the Loans team into a small A/B test. Route a slice of web traffic to a page where you could pay the loan, turn on auto-pay and see the balance, instead of a page that only told you about them.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "People were two to three times more likely to set up auto-pay or pay on time when the action was in front of them instead of a description of the action.",
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
            src: `${OPO}/03-process.png`,
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
    hero: `${OCS}/01-hero.png`,
    heroScreens: [
      `${OCS}/01-hero.png`,
      `${OCS}/02-account-overview.png`,
      `${OCS}/09-flow-architecture.png`,
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
            text: "Credit card servicing, inside the app 2 million people were already using, on both iOS and Android, on the date it had to land.",
          },
          {
            kind: "p",
            text: "I owned all of it. Account overview, payment flows, auto-pay enrollment, transaction history, and every payment status state, on both platforms.",
          },
          {
            kind: "img",
            src: `${OCS}/02-account-overview.png`,
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
            text: "What actually settled it was the cost. Extending the existing system was slightly more work up front and cheaper on every feature after it, and that was the version product and engineering could agree to.",
          },
          {
            kind: "callout",
            tone: "plus",
            text: "We extended the design system instead of forking it. Credit components were built on top of what already existed rather than beside it.",
          },
          {
            kind: "p",
            text: "That decision had to be made before anyone drew a real screen, so I spent the first two weeks mapping the whole servicing flow end to end. The map is what showed exactly where loan infrastructure could carry the credit card and where it could not.",
          },
          {
            kind: "img",
            src: `${OCS}/09-flow-architecture.png`,
            alt: "End to end credit card servicing flow architecture from app home through payments, transaction history and auto-pay",
            caption: "The flow map, drawn before any screens. Everything that follows is downstream of where these lines split.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/11-sketches-overview.png`,
                alt: "Early wireframes exploring how the credit card tab extends existing app navigation",
                caption: "Working out how the credit card tab could hang off the existing navigation.",
              },
              {
                src: `${OCS}/10-sketches-payment.png`,
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
            text: "Reading the support documentation against our usability sessions turned up the thing members never said out loud but were clearly calling in about. The status labels were accurate and still confusing, because they had been written for legal precision rather than for someone working out whether they were late.",
          },
          {
            kind: "p",
            text: "So I pinned the status card to the top of the credit view instead of showing it only when something was wrong. It had to hold three states, each with its own urgency and its own required legal wording, and it had to be readable without using color to carry the meaning, since color on its own does not meet accessibility requirements.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/03-status-upcoming.png`,
                alt: "Status card in the upcoming payment state",
                caption: "Upcoming. Informational, no alarm.",
              },
              {
                src: `${OCS}/04-status-due.png`,
                alt: "Status card in the payment due state",
                caption: "Due. The urgency comes from the label and the badge.",
              },
              {
                src: `${OCS}/05-status-autopay.png`,
                alt: "Status card in the auto pay enabled state",
                caption: "Auto pay on. Nothing to do.",
              },
            ],
          },
          {
            kind: "p",
            text: "The hierarchy is built from type weight, spacing and a small amount of badge color. Each badge still carries the legally required label, but the layout around it makes the meaning obvious, so the same screen clears compliance and still reads in the two seconds someone actually gives it.",
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
            text: "Two things were causing it, and both showed up in testing rather than in the data.",
          },
          {
            kind: "p",
            text: "The old flow sent you out to a settings page to add a bank account before you could enroll, which lost people at the exact moment they had decided to do it. I moved funding source setup inside enrollment so someone who has never linked an account can finish in one pass.",
          },
          {
            kind: "p",
            text: "The other one was quieter. People were picking payment dates outside their billing cycle without knowing it, so payments bounced or landed on the wrong statement. The calendar now only offers dates that work, and the disclosure sits on the page instead of behind a tooltip nobody taps.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${OCS}/06-autopay-amount.png`,
                alt: "Auto-pay enrollment, selecting a payment amount",
                caption: "Pick an amount, with the billing disclosures right there.",
              },
              {
                src: `${OCS}/07-autopay-date.png`,
                alt: "Auto-pay enrollment, selecting a date from a calendar limited to valid billing cycle dates",
                caption: "Pick a date. Only the valid ones are selectable.",
              },
            ],
          },
          {
            kind: "img",
            src: `${OCS}/08-autopay-confirm.png`,
            alt: "Auto-pay review and confirm screen with full ACH authorization language",
            caption: "Review and confirm. The full ACH authorization sits above the button rather than behind a link.",
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
            text: "On a regulated payment product that is a compliance problem rather than a tidiness one. A payment status has to behave the same way on iOS and Android because the rules apply to both. So I designed them together and specified every status, disclosure and confirmation once for both.",
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
    hero: `${DCC}/05.png`,
    heroScreens: [`${DCC}/05.png`, `${DCC}/08.png`],
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
            src: `${DCC}/05.png`,
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
            text: "I ran moderated and unmoderated studies with about 50 business owners through UserTesting to find out what they actually wanted to know. Three findings shaped the product.",
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
                body: "63% said their policy did not actually cover the weather damage they got, which left them paying for it themselves.",
              },
            ],
          },
          {
            kind: "callout",
            tone: "note",
            text: "So the job was turning a large amount of climate signal into a few numbers a non-analyst could trust in a couple of seconds.",
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
                src: `${DCC}/06.png`,
                alt: "Wireframe of the Demex Climate Center home page with the climate index, search and an explainer on parametrics",
                caption: "Home. Index first, search second, a short explainer for people who had never heard of parametrics.",
              },
              {
                src: `${DCC}/07.png`,
                alt: "Wireframe of the search results and detail view with the DVI score, historical band and comparative views",
                caption: "Results. Score, history, comparison, in that order.",
              },
            ],
          },
          {
            kind: "p",
            text: "The decision that mattered most was putting a plain language explanation next to every score rather than under a help link. A trend score of 61 means nothing on its own. A sentence saying temperature has strongly increased over the past ten years and the year to year range is widening is something a business owner can act on.",
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
            text: "Once the platform worked end to end I ran moderated sessions with five people to see whether the navigation and the index itself were landing.",
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
            src: `${DCC}/08.png`,
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
