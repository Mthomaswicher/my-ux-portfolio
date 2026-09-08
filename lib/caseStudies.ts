export type Block =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "img"; src: string; alt: string; caption?: string; srcMobile?: string }
  | { kind: "imgGrid"; items: Array<{ src: string; alt: string; caption?: string }> }
  | {
      kind: "video";
      src: string;
      poster?: string;
      caption?: string;
      alt: string;
      /** "phone" renders portrait footage at phone width, centered, instead
       *  of stretching it to the full article column. */
      frame?: "phone";
    }
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
   *  pulls in electric purple + deep navy, "sift" pulls in the product's
   *  own paper/ink/ember system). */
  brand?: "oportun" | "capital-one" | "demex" | "sift";
  sections: CaseStudySection[];
  results?: Array<{ stat: string; label: string; sub?: string }>;
};

const SIFT = "/images/case-studies/sift";
const IDP = "/images/case-studies/idp-release-plugin";
const TIGER = "/images/case-studies/claude-code-tiger-team";
const OPO = "/images/case-studies/oportun-homepage-widgets";
const OCS = "/images/case-studies/oportun-credit-servicing";
const DCC = "/images/case-studies/demex-climate-center";
const WEB3 = "/images/case-studies/web3-remittances";

export const caseStudies: CaseStudy[] = [
  {
    slug: "sift",
    title: "Sift",
    org: "Solo Side Project, iOS and web",
    status: "SHIPPED",
    tagline:
      "Recipe pages bury four ingredients under ads and somebody's life story, and the screen goes dark while your hands are covered in something. I designed and shipped the fix solo in seven days. Every screen came out of Figma, microinteractions and animations included, some code is mine, and Claude vibe coded the rest to App Store standards.",
    hero: `${SIFT}/00-preview.webp`,
    heroScreens: [`${SIFT}/00-preview.webp`, `${SIFT}/01-trio.webp`],
    role: "Everything. Product, design system, brand, code with Claude, App Store",
    team: "One person, with Claude Code as the instrument",
    timeframe: "August to September 2026, 7 days to 1.0, then three releases in ten days",
    tools: "Figma, Claude Code, Next.js, Capacitor, Xcode",
    accent: "rose",
    brand: "sift",
    sections: [
      {
        id: "shipped",
        no: "01",
        title: "What shipped",
        body: [
          {
            kind: "p",
            text: "Sift is an iPhone app that pulls the recipe out of a hostile web page and keeps the screen awake while you cook. It's free on the App Store and runs in a browser at siftapp.me. Everything below is the real product running, not a prototype.",
          },
          {
            kind: "p",
            text: "One person made this. The product decisions, the design system, the parser, the Safari and share extensions in the binary, and the store submission are all mine. Claude Code wrote most of the code. The process log behind this page runs to 332KB.",
          },
          {
            kind: "h",
            text: "The recipe finds you",
          },
          {
            kind: "p",
            text: "Turn on the Safari extension and a bar appears when a page has a recipe on it. One tap lands the ingredients and steps on a clean card, with a link back to whoever wrote it.",
          },
          {
            kind: "video",
            frame: "phone",
            src: `${SIFT}/v01-capture.mp4`,
            poster: `${SIFT}/v01-capture-poster.webp`,
            alt: "The App Store preview: a recipe blog in Safari, the Sift bar appearing, the same recipe as a clean card, then Cook Mode in dark theme.",
            caption: "The App Store preview without its captions. Safari to saved card in one tap.",
          },
          {
            kind: "h",
            text: "Cook Mode",
          },
          {
            kind: "p",
            text: "Type sized for a phone propped at arm's length, about 1.7 times what rivals use. Steps check off as you pass them. The screen stays awake until you leave, and when a step says bake for 35 minutes, that's a named timer that keeps counting with the app closed.",
          },
          {
            kind: "video",
            frame: "phone",
            src: `${SIFT}/v02-cook.mp4`,
            poster: `${SIFT}/v02-cook-poster.webp`,
            alt: "Tapping Cook this, checking off ingredients with the screen-awake indicator showing, then a named Baking timer counting down.",
            caption: "Cook this, then a timer named for what it's timing.",
          },
          {
            kind: "h",
            text: "Quit the app, keep your cook",
          },
          {
            kind: "p",
            text: "Leave mid-cook, force-quit, whatever. A bar above the tabs offers to pick up exactly where you were, timer still counting.",
          },
          {
            kind: "video",
            frame: "phone",
            src: `${SIFT}/v03-resume.mp4`,
            poster: `${SIFT}/v03-resume-poster.webp`,
            alt: "The resume bar above the tab bar with a running timer, then Cook Mode reopening where it left off.",
            caption: "The resume bar. A cook survives anything.",
          },
          {
            kind: "h",
            text: "Search that filters the junk",
          },
          {
            kind: "p",
            text: "Results come from across the web, filtered on the same structured-data signal the extension reads, so category pages and listicles fall out before you ever see them.",
          },
          {
            kind: "video",
            frame: "phone",
            src: `${SIFT}/v04-search.mp4`,
            poster: `${SIFT}/v04-search-poster.webp`,
            alt: "Typing brisket into Find and getting twenty web results that are all actual recipes.",
            caption: "Twenty results, all of them recipes.",
          },
          {
            kind: "h",
            text: "Scale without arithmetic",
          },
          {
            kind: "p",
            text: "Half a batch to 10×, applied to the quantities and nothing else. When you're out of buttermilk, substitutions come with the ratio and what changes.",
          },
          {
            kind: "video",
            frame: "phone",
            src: `${SIFT}/v05-scale.mp4`,
            poster: `${SIFT}/v05-scale-poster.webp`,
            alt: "Tapping the 5x scaling chip and every ingredient amount updating in place.",
            caption: "5× on the fly.",
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
            text: "Sift started as a take-home for another company's interview process. The brief asked for something real, built with AI, about a problem from your own life. I cook from my phone propped on the counter, and every recipe page is somebody's essay with a video that follows you down the page.",
          },
          {
            kind: "p",
            text: "The bigger problem is the screen. Hands covered in chicken, display asleep every thirty seconds. I used to set the phone to never sleep and forget to put it back. Dead battery by dinner. That round trip shows up in no rival's feature list, and it became the reason the app exists.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${SIFT}/02-before-page.webp`,
                alt: "A recipe blog with an ad and a life story above the recipe",
                caption: "Before. The recipe is down there somewhere.",
              },
              {
                src: `${SIFT}/02-after-card.webp`,
                alt: "The same recipe in Sift: title, source, photo, Cook this",
                caption: "After. Just the recipe.",
              },
            ],
          },
          {
            kind: "h",
            text: "Where the scope came from",
          },
          {
            kind: "p",
            text: "Two facts got verified before any design happened. The Screen Wake Lock API has shipped in Safari since iOS 16.4, so holding the screen awake is a web capability. And recipe sites publish schema.org structured data to get Google's rich recipe cards, so the recipe is already sitting in the page as data. Extraction is a parse.",
          },
          {
            kind: "p",
            text: "Parsing runs four levels down, and the last level is you pasting the text in yourself, so every page lands on the same editable card. There is no unsupported-site error anywhere in Sift, because that message is the moment people delete these apps. Of everything in the product, that's the call I'd defend hardest.",
          },
          {
            kind: "img",
            src: `${SIFT}/01-cascade.svg`,
            srcMobile: `${SIFT}/01-cascade-m.svg`,
            alt: "The four parse tiers, JSON-LD, microdata, heuristic, and manual paste, all converging on one editable card",
            caption: "The parse cascade. No tier ends in an error.",
          },
          {
            kind: "p",
            text: "The rest of the scope came off Mobbin, which documents exactly one rival, ReciMe. Its 214 screens and 64 flows have no cook mode anywhere in them. Its flow list is dominated by account and paywall screens, so Sift launched with no account and no onboarding. And its three separate import paths confirmed capture has to degrade. One path that falls through four tiers beat three doors the user has to diagnose.",
          },
          {
            kind: "p",
            text: "The first commit landed at the exercise's three-hour cap with capture, the reader, and Cook Mode working on the web. Thirty-one more commits landed over the next three days.",
          },
        ],
      },
      {
        id: "redesign",
        no: "03",
        title: "The critique that killed the first design",
        body: [
          {
            kind: "p",
            text: "Version one went from nothing to on-screen in a day. Warm cream paper, a rust accent, serif titles, every control a 999px pill. On an actual phone it looked cheap.",
          },
          {
            kind: "p",
            text: "Cream plus rust is the artisan-bakery palette that generated design reaches for constantly, and a display serif on titles reads as an editorial blog. The pill is worse, the strongest consumer-casual signal a control can carry. None of those faults were brightness, so the fix stayed light.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${SIFT}/03-killed-library.webp`,
                alt: "The killed first design: a warm cream library with serif recipe titles and pill chips",
                caption: "The killed library. Run from an old commit for this page.",
              },
              {
                src: `${SIFT}/03-killed-recipe.webp`,
                alt: "The killed recipe page: Fraunces serif title and a rust pill reading Cook this",
                caption: "Fraunces on cream. The rust pill.",
              },
              {
                src: `${SIFT}/03-killed-cook.webp`,
                alt: "The killed Cook Mode with a warm pink wash background",
                caption: "Cook Mode's warm wash. All of it died.",
              },
            ],
          },
          {
            kind: "p",
            text: "The replacement is cold monochrome with one rule you can check in a screenshot. Color appears exactly once per screen, on the one thing you can act on. The serif survives only inside the recipe itself, because the recipe is a document and the app around it is furniture. And the committed move survived untouched. Cook Mode type stays sized for two feet away.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${SIFT}/03-shipped-recipe.webp`,
                alt: "The shipped recipe page in cold monochrome, with the red Cook this button as the only color",
                caption: "The face that shipped. The one color on it is Cook this.",
              },
              {
                src: `${SIFT}/03-shipped-cook.webp`,
                alt: "Shipped Cook Mode with checkable ingredients and the screen-awake indicator",
                caption: "Cook Mode. The committed move survived untouched.",
              },
              {
                src: `${SIFT}/03-shipped-find.webp`,
                alt: "The shipped Find screen, monochrome except the red Search button",
                caption: "Find. Ember lands on Search and nowhere else.",
              },
            ],
          },
          {
            kind: "callout",
            tone: "note",
            text: "When a screen has two colored things, one of them is wrong and has to become type or space instead. That sentence governed more decisions than any component spec.",
          },
          {
            kind: "p",
            text: "The palette held from there. The typeface got one more turn. Two weeks in, the interface font started reading as AI-default too, and 1.2.0 reset the whole product in Bricolage Grotesque. Most screens on this page wear it.",
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
            text: "No lab, no moderated sessions, and pretending otherwise would show. Sift got tested two ways: instrumented audits, and real hands on real dinners. Both changed the product.",
          },
          {
            kind: "p",
            text: "The audits were the formal half. A pass against Nielsen's ten heuristics on the running build logged 23 findings, 12 fixed and 11 still open and written down. A scripted contrast sweep caught 7 pairings that looked fine to the eye and failed WCAG, one at 1.14 to 1, and that check exits non-zero on any regression so it can gate a build.",
          },
          {
            kind: "quote",
            text: "i opened a mac and cheese recipe in chrome and mise did not auto detect it",
            speaker: "My own bug report. The extension had never loaded, and Sift was still called Mise.",
          },
          {
            kind: "quote",
            text: "and it just continues trying to open and never does",
            speaker: "My wife, on a search hang I never reproduced. Hardening bounded the worst case to 19 seconds, where before it was forever.",
          },
          {
            kind: "p",
            text: "She found the worst bug too. Ten minutes on a couch beat every automated check I had running. She tapped Take Photo on the profile screen, two taps from the home screen, and the app died over a missing permission string. Three more changes shipped straight out of using it.",
          },
          {
            kind: "features",
            items: [
              {
                title: "Start over",
                body: "Checked steps persist so you keep your place mid-cook. Cooking the same recipe again started with every box already ticked. One button, shown only when it applies.",
              },
              {
                title: "The resume bar",
                body: "I force-quit the app mid-brisket and lost the cook. That loss is why the resume bar exists.",
              },
              {
                title: "Two-tap stop",
                body: "A stray touch shouldn't end a two-hour rest, so stopping a timer takes two deliberate taps.",
              },
            ],
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${SIFT}/04-timer-startover.webp`,
                alt: "Cook Mode with a named Baking timer counting down and the Start over button above the steps",
                caption: "The named timer. Start over appears once steps are checked.",
              },
              {
                src: `${SIFT}/04-resume-bar.webp`,
                alt: "The resume bar above the tab bar, dish name and timer still counting, with a Resume button",
                caption: "The resume bar above the tabs.",
              },
            ],
          },
          {
            kind: "h",
            text: "Measuring instead of asking",
          },
          {
            kind: "p",
            text: "Ask a model whether search results look good and you get a yes. Have it hit the live API and count, and 'keto recipe' returned zero usable recipes out of twenty. Filtering on the structured-data signal fixed it. Dish queries now keep 15 of 20, and roundup pages score as lists before anyone sees them.",
          },
          {
            kind: "p",
            text: "The overnight sprints ran the same way. Implementation agents worked in parallel worktrees while verification agents diffed the built app against its claims, and one overnight run's verify lane caught a Live Activity sitting silently dead in the built bundle.",
          },
        ],
      },
      {
        id: "after",
        no: "05",
        title: "What outlasted the app",
        body: [
          {
            kind: "p",
            text: "The multiplier work went into my own tooling. The project-interview framework and the design-research skill written for Sift got promoted to my global setup, so every project since starts with them, this portfolio included. Same for the contrast gate, and for the habit that produced this page: a process log appended as work happened, wrong turns kept in.",
          },
          {
            kind: "h",
            text: "Proving it worked",
          },
          {
            kind: "p",
            text: "Sift launched free, with no ads and no account required, seven days after the first commit. Week one closed with six App Store ratings, all five stars, roughly fifteen users, and no top-50 rank for any category term. It's nine ratings now, still 5.0. Recipes live on the device and searches stay anonymous, so behavioral data is thin by design.",
          },
          {
            kind: "p",
            text: "The evening Sift went live I read the store listings of twelve rivals, their claims and their one-to-three-star reviews. Every one of them waits for you to bring it a link. None claims a Safari extension. That reset the listing overnight. Compete on capture, where nobody else is standing.",
          },
          {
            kind: "img",
            src: `${SIFT}/02-category.svg`,
            srcMobile: `${SIFT}/02-category-m.svg`,
            alt: "Eleven of the twelve audited rivals ranked by ratings count, every one importing by paste or share sheet, against Sift, where a bar appears on the page",
            caption: "The launch-evening audit. Data from the rivals' own listings.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "The audit also backed a call already shipped: all twelve rivals have a grocery list, Sift launched without one, and a half-built table-stakes feature invites a comparison you lose.",
          },
          {
            kind: "p",
            text: "What did move was the listing. I renamed the app to 'Sift: Recipe Keeper & Saver' off AppFigures keyword data and rewrote the subtitle to the one claim no rival can copy, 'Auto-saves recipes from Safari.'",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${SIFT}/05-store-hero.webp`,
                alt: "App Store panel: Just the recipe, above the brisket recipe card",
              },
              {
                src: `${SIFT}/05-store-detect.webp`,
                alt: "App Store panel: Auto-detect, no share sheet, showing the detection bar on a recipe page",
                caption: "The claim on the store.",
              },
            ],
          },
          {
            kind: "h",
            text: "What did not make it",
          },
          {
            kind: "p",
            text: "A three-tier paywall got built and wired to Stripe, then killed twice. The first version would have been an automatic rejection under App Store guideline 3.1.1, caught before it went up. The second died on judgment. Pricing a product before knowing what people use is guessing, and a wall with no door behind it is worse than no wall. The tiers sit behind a flag, switched off, until StoreKit.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "There's also a Bluetooth probe feature I got reading a real Chef iQ thermometer, then parked. Fifteen users don't need hardware support yet.",
          },
          {
            kind: "p",
            text: "iPad support got cut from 1.0 to make the deadline and came back in 1.0.1. By 1.3.0 it had its own screenshot set, shot from the app's real two-column layout.",
          },
        ],
      },
    ],
    results: [
      { stat: "7 days", label: "First commit to the App Store", sub: "Aug 17 to Aug 24, 2026" },
      { stat: "3", label: "Releases in the first ten days", sub: "1.1.0, 1.2.0, 1.3.0" },
      { stat: "5.0", label: "App Store rating", sub: "Nine ratings. Small n" },
    ],
  },

  {
    slug: "claude-code-tiger-team",
    title: "Claude Code Setup",
    org: "Capital One, DevX",
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
    team: "Lead plus 2 designers, working with PM, engineering, One Access and senior leadership",
    timeframe: "3 weeks, March 2026",
    tools: "Claude Code, GitHub, Artifactory, VS Code",
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
    org: "Capital One, Internal Developer Platform",
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
    team: "2 designers, product, engineering, audit and cyber partners",
    timeframe: "32 weeks",
    tools: "Figma, Lucid, Confluence, Jira",
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
    team: "Design, Loans, Savings and Credit PODs",
    timeframe: "32 weeks",
    tools: "Figma, A/B testing, Heuristic eval",
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
    team: "Design, Loans, Savings and Credit PODs, iOS and Android engineering",
    timeframe: "Jul 2022 sprint to Mar 2023 launch",
    tools: "Figma, iOS and Android, Benchmarking, Usability testing",
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
    tools: "Figma, React, UserTesting, Strategy",
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

  {
    slug: "web3-powered-remittances",
    title: "Web3 Powered Remittances",
    org: "Oportun, Hackathon",
    status: "WON",
    tagline:
      "Sending money home from an Oportun account meant a Western Union counter or PayPal's fees. Our hackathon team put a remittance flow on Stellar rails, with the money landing in seconds for cents, and it won Most Creative Idea.",
    hero: `${WEB3}/01.png`,
    heroScreens: [`${WEB3}/01.png`, `${WEB3}/08-anchor-pathway.svg`, `${WEB3}/02-sizing.svg`],
    role: "Product Designer. Research, the flow, and the pitch",
    team: "Cross-functional design and engineering hackathon team",
    timeframe: "Oportun hackathon, one sprint",
    tools: "Figma, Stellar network, User research",
    accent: "amber",
    brand: "oportun",
    sections: [
      {
        id: "pitch",
        no: "01",
        title: "What we pitched",
        body: [
          {
            kind: "p",
            text: "This one never shipped. It's a hackathon concept, it won Most Creative Idea, and everything on this page is labelled as the pitch it was. The flow puts remittances on the Oportun home dashboard next to savings and bills. Pick a recipient, pick an amount, confirm. Stellar settles it underneath in seconds, and the member never sees a token, a wallet seed, or a block explorer.",
          },
          {
            kind: "callout",
            tone: "note",
            text: "Concept work throughout. The screens below are the hackathon prototype, and none of it reached production.",
          },
          {
            kind: "imgGrid",
            items: [
              {
                src: `${WEB3}/01.png`,
                alt: "Mobile mockup of the Oportun home dashboard with savings and bills cards",
                caption: "Where it sits. Next to savings and bills.",
              },
              {
                src: `${WEB3}/07.jpg`,
                alt: "Oportun mobile splash screen on a device frame",
                caption: "Inside the app members already have. No separate wallet.",
              },
            ],
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
            text: "Oportun exists to serve people traditional banks skip, and a big share of those members send money abroad every month. Western Union still runs on cash and storefronts. Wires are slow and opaque. PayPal is fast but takes 5 to 11% per transfer, and the person receiving the money often has no account.",
          },
          {
            kind: "img",
            src: `${WEB3}/05-complaints.svg`,
            srcMobile: `${WEB3}/05-complaints-m.svg`,
            alt: "Two panels: transfers through Western Union and wires are slow and inconvenient, and PayPal takes 5 to 11 percent while recipients often have no account",
            caption: "The same two complaints in every interview. Fast or cheap, never both.",
          },
          {
            kind: "quote",
            text: "I always get nervous when it takes longer and sometimes I don't get a notification. The time it takes is most stressful.",
            speaker: "Luis, Oportun member since 2017",
          },
          {
            kind: "p",
            text: "Luis was typical. Members were already shopping around because nothing served them well, and the market sizing made the case for building it inside the app they already trusted.",
          },
          {
            kind: "img",
            src: `${WEB3}/02-sizing.svg`,
            srcMobile: `${WEB3}/02-sizing-m.svg`,
            alt: "Two panels: a large share of Oportun members send remittances, and U.S. consumers send 76 billion dollars abroad a year",
            caption: "Who sends, and how big it is.",
          },
        ],
      },
      {
        id: "constraint",
        no: "03",
        title: "The constraint that shaped the flow",
        body: [
          {
            kind: "p",
            text: "We set the rule on day one. Crypto stays in the back end, and the product never asks a member to learn it. That single call drove the architecture. We picked Stellar for speed and near-zero fees, and for its anchor model, where regulated partners on each end handle the on-ramp and off-ramp in local currency.",
          },
          {
            kind: "img",
            src: `${WEB3}/08-anchor-pathway.svg`,
            srcMobile: `${WEB3}/08-anchor-pathway-m.svg`,
            alt: "Diagram of the anchor pathway: an Oportun member deposits dollars, value crosses the Stellar network through FinClusive and Biccos anchors, and the recipient is paid in pesos",
            caption: "The anchor pathway. Dollars in, pesos out, seconds in between.",
          },
          {
            kind: "p",
            text: "Engineering sat in the room from the first whiteboard. We mapped which steps had to be on chain, which could stay in the existing Oportun stack, and where compliance and KYC landed. By prototype time the flow was feasible and scoped to something a hackathon could actually build.",
          },
        ],
      },
      {
        id: "research",
        no: "04",
        title: "What the research changed",
        body: [
          {
            kind: "p",
            text: "We interviewed and surveyed more than 30 Oportun members who send money internationally. Speed was the anxiety. People watch the clock between sending and confirmation. A fee that looks small compounds fast at two or three sends a month, and the trip to a counter with cash in a pocket was its own barrier.",
          },
          {
            kind: "quote",
            text: "The most frustrating thing [with Western Union] is that I have to go to a store to do it and carry cash with me.",
            speaker: "Francisco, Oportun member since 2021",
          },
          {
            kind: "p",
            text: "Francisco said what a lot of people said. The trip was as much of a barrier as the fee.",
          },
          {
            kind: "p",
            text: "The research boiled down to three user stories, and the prototype got built against them.",
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
        id: "after",
        no: "05",
        title: "What outlasted the weekend",
        body: [
          {
            kind: "p",
            text: "The judges gave it Most Creative Idea, and the reason they believed it could ship is the part I'd repeat on any project. Design and engineering scoped it together from the first hour. Stellar, the anchor model, and where the MVP stopped all got decided in the same room.",
          },
          {
            kind: "p",
            text: "The other keeper is the framing. Members get the Oportun app they already know, the back end gets Stellar's speed and cost, and nobody has to learn what an anchor is to send money home. The chain is plumbing.",
          },
          {
            kind: "p",
            text: "And the honest ending is that it stayed a concept. Oportun never built it, so the win and the research are the whole outcome.",
          },
        ],
      },
    ],
    results: [
      { stat: "$5", label: "Cheaper per send than Western Union", sub: "Projected, hackathon math" },
      { stat: "8,500", label: "Remittance users projected", sub: "First three months, pitch model" },
      { stat: "WON", label: "Most Creative Idea", sub: "Oportun hackathon" },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
