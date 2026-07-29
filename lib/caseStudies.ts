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
            text: "This is the part I would fight for again. Two weeks of mapping bought us a scope nobody relitigated for the next seven months.",
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
            text: "My first layout put the audit questions behind a modal and kept the actions high on the page. Clean, and dead on arrival. Audit came back and said those questions have to be visible at all times, behind no interaction at all.",
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
                body: "Approvers were already leaving to ask questions. Rather than fight it, I put the door where they were walking.",
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
