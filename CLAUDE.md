# Portfolio

Next.js portfolio site. Case study content lives in `lib/caseStudies.ts` as typed
`Block` arrays, not MDX. Images live under `public/images/case-studies/<slug>/`.

## How case studies get written

These are non-negotiable. Apply them to every new case study and to any edit of an
existing one. When in doubt, match the shape of `idp-release-plugin`.

The standard comes from a hiring manager with 10+ years of reviewing design
portfolios. The 2018-2023 "process process process" era is over. 2025-2026 is show,
don't tell. **Output over everything.** The portfolio's only job is to get a
conversation started. Depth on the what, why, and how goes in interview materials,
not on the page.

Treat the portfolio as a product, with the same attention to detail as client work.
Small details matter in a crowded market.

### The eight red flags

Every one of these is a reason a hiring manager closes the tab during the initial
scan. Never ship one.

**1. Reams of text.** Show by doing. Show the actual work. Writing out the process in
detail is actively off-putting — a reader who disagrees with how you got there now
has a reason not to interview you.

**2. The template outclassing the work.** The project leads, never the chrome. If the
site is flashy, the work has to match that level of visual craft.

**3. No AI signals.** This is a baseline requirement now, not a bonus. The work has to
show AI embedded in how I work: new tooling, prototyping with AI, changed ways of
working. At Staff+ nobody expects to train me on it. Absence reads as "hasn't
adapted."

**4. A weak initial gut feeling.** People process images thousands of times faster
than text. It has to look good. Many hiring managers aren't designers — they think in
visuals, business outcomes, and whether this person can solve a business problem, not
in service blueprints and IA. Weak visual craft is the number one reason people don't
get interviews.

**5. No evidence of shipping.** Builder mindset. Real, live products beat wireframes.
No animated wireframes dressed up as product work, no slick prototypes or motion
explorations or concept pieces presented as if they shipped. If it shipped, show it
running.

**6. A double diamond.** Instant close. Discovery maps, research synthesis, and
journey diagrams dominating the page while the work is buried at the end is dead. If
the output is strong, the process is interview conversation. If the output is weak,
the process doesn't save it.

**7. No clarity on what I did.** No teamwork framed as personal work. No vague "I led"
with no specific contribution named. Don't look shielded by PMs, researchers, or
other ICs.

**8. Scope-title mismatch.** Title inflation is rife and managers are actively hunting
for it. A Staff or Principal claim backed only by feature-level execution disproves
itself. Staff+ evidence means:
- **Cross-team and systems-level thinking**, and shaping where a product is going.
- **Multiplier work**: patterns other teams adopted, initiatives I started, systems
  or frameworks that compounded across the org.
- **The work before the work**: alignment, bringing teams around a direction,
  clarifying a vague problem before designing. At Staff that's most of the job, so a
  case study starting at wireframes signals I wasn't operating there.

### The canonical format

`idp-release-plugin` is the reference implementation. Live at
https://mthomaswicher.com/work/idp-release-plugin/ (gated; the password is `tokens`,
hardcoded in `app/work/[slug]/page.tsx` and shipped in the client bundle, so it is a
courtesy gate, not a secret). Match its shape unless there is a reason not to.

**Header.** Status chip, org, title, tagline, then a four-field `dl` of Role / Team /
When / Tools, then the hero screens. The reader knows what it is, what I owned, and
what it looks like before scrolling once.

**Five sections, in this order:**

1. **What shipped** — the real thing running. Frame it once ("Everything below is the
   real thing running, not a prototype"), state what I owned end to end, then a
   sequence of `h` + one-line `p` + `video`, one per capability. The demo carries it;
   the paragraph just says what to watch for.
2. **Why it needed to exist** — the before, in one or two paragraphs. A before/after
   `imgGrid`. Then the strategic move that set scope, with the artifact that settled
   it, closed by a `callout` naming what it bought ("Two weeks of mapping up front
   bought a scope nobody reopened for the next seven months").
3. **The constraint that reshaped the page** — the rule that broke the first design.
   Show the killed concept with a caption saying why it died. Then the layout that
   survived, and why the constraint produced it.
4. **What testing changed** — skip the methodology. Two `quote` blocks in the user's
   own words, then a `features` triptych of the changes that came out of it, then
   media proving they shipped.
5. **What outlasted the project** — the multiplier work first (components that went
   back into the design system, patterns other teams inherited). Then `h` "Proving it
   worked" with the real measurement story, constraints included. Then `h` "What did
   not make it", with any unshipped concept explicitly labelled by a `callout` before
   the clip.

**Results** — three stats, each one defensible.

**Rules the format encodes:**

- Media is evidence. Every image, grid, and video sits immediately next to the claim
  it proves.
- Captions are one sentence, fragments welcome. "Before." / "After." / "Bulk approve."
- **Diagrams and UI captures need a mobile variant.** The article column is 768px, and
  a phone renders it near 350px. Author desktop assets at 1536px wide (2x the column)
  and a reflowed `-m` variant at 700px wide, then set `srcMobile` on the `img` block.
  Without it, every label lands around 6px on a phone and the asset is decoration.
- Any diagram carrying real internal UI is a labelled recreation. Say so in the
  caption. Never present an invented screen as a captured one.
- Never let concept work read as shipped work. Label it in a `callout` and repeat it
  in the caption.
- Sections are numbered (`no: "01"`) with short declarative titles. "The constraint
  that reshaped the page", not "Challenges and Learnings".
- Say what the data could not do. "Our internal analytics were not wired into the IDP
  during the closed beta, so I could not lean on behavioral data" is more credible
  than a clean number.

### Voice

- Plain and spoken. First person, specific about what I actually did.
- **No em dashes.** Anywhere.
- No writerly tells. No "in this case study I'll walk you through", no rhetorical
  questions, no drumroll.
- Concrete numbers wherever they exist: 3,600 engineers, 32 weeks, two designers.
- Name the constraint that hurt and what it cost. Show the concept that got killed
  and say why.
- Short sentences. Cut the qualifier if the sentence survives without it.
- `tagline` is problem, then what I did, then outcome, in one or two sentences.
- `role` and `team` state team size and what I owned versus shared, honestly.
- `results` stats are only numbers I can stand behind.

### The caveat

A portfolio never pleases everyone. Build it in my image, how I want to represent
myself, grounded in the fact that I'm looking for a job designing someone else's
product. Hiring is subjective: what one company calls a great fit wouldn't get an
interview elsewhere. These themes are what opens doors at most of them.
