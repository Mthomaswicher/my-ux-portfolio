# Website voice

How every word on this site gets written. Case studies, taglines, captions, UI copy,
metadata, alt text. Read this before drafting any of it, every time.

Two sources feed this file: the standing writing rules (`~/.claude/writing-rules.md`
and the global `~/.claude/CLAUDE.md`, which are canonical everywhere) and the
humanizer brief Matt supplied on 2026-09-08. Where they agreed, this file says it
once. Where they disagreed, the standing rules won, and the disagreements are listed
at the bottom so nothing got dropped silently.

## The reader

A hiring manager on an initial scan. They process the images first, then captions,
then maybe two paragraphs if the images earned it. Every sentence either earns the
next one or the tab closes. Write for someone deciding whether to start a
conversation, never for someone grading a process.

## The voice

First person, plain, spoken. The test for every sentence: would Matt say it aloud to
a friend? If it needs a semicolon and a breath to get through, it fails.

Opinions stated flat. "I think that was right" beats "it could be argued this
approach had merit." Real numbers over adjectives, every time there is one. The
parts that failed stay in, named plainly, because a named failure is more credible
than a clean arc.

## Sentence mechanics

Vary length hard. A three-word sentence next to a thirty-word one that keeps going
past where a machine would have stopped it, picks up a qualifier, and lands
somewhere specific. Fragments are fine. Whole paragraphs of one sentence are fine.

Vary how sentences start: a clause, a number, a name, "So", "And". Uniform openers
are as much a tell as uniform length.

Contractions where he'd speak them. A little natural redundancy is allowed to
survive editing; sanding every edge off is its own tell. Do this by leaving real
speech patterns in, never by inserting fake mistakes.

## Word choice

Concrete over general. "990 minutes" over "a long cook", "four levels down" over
"multiple fallbacks".

Repeat a word rather than reach for a synonym. Thesaurus variation reads as
evasion.

Plain verbs. Is, has, put, broke, shipped, killed, cost.

Colloquialisms and idiom are welcome when they're his, never decorated on.

## Structure

Start mid-thought or mid-scene. Cut the first 10% of any draft; the real opening is
usually a few sentences in. End on a real last thought and stop. Irregular
paragraph lengths on purpose. Prose over bullets when the ideas connect.

## Never

- Em dashes. Anywhere. Commas, colons, parentheses, or a full stop.
- Negative parallelism: "it's not X, it's Y", "not just X, but Y".
- Tricolons, especially ascending ones. Two items or four.
- Announced insight: "here's the thing", "what most people miss", "honestly?".
- Summary conclusions: "ultimately", "at the end of the day", "in essence".
- Trailing "-ing" clauses restating the sentence they hang off.
- AI vocabulary: delve, leverage, robust, pivotal, crucial, seamless, holistic,
  comprehensive, transformative, elevate, empower, showcase, underscore, myriad,
  plethora, nuanced, multifaceted, realm, landscape, tapestry, testament, vibrant,
  boasts, enhance, highlighting, emphasizing, align with, valuable insights.
- "Serves as", "stands as", "represents", "functions as". Write "is" and "has".
- Rhetorical questions and drumroll. No "so what happened next?".
- Hedge qualifiers: "I believe", "perhaps", "arguably", "it's important to note".
- Vague attribution: "experts say", "studies show", "industry reports suggest".
- Emoji, decorative bolding, series of bold-header-colon bullets, headers on short
  pieces.
- Listicles. No numbered-list articles, no bullet run doing a paragraph's job.
- Staged reveals: "my read was two words", "the diagnosis mattered more than the
  reaction", "here is the honest version". Say the thing without the setup.
- Comma-appositive fragments: "The claim, on the store." "The error state,
  designed out." Machine cadence. Write it straight or split it with a period.

## Always

- A number wherever one exists, and a named constraint wherever one hurt.
- Captions as fragments. "Before." "The parse, four levels down."
- What Matt did versus what the team did, stated honestly.
- Verbatim quotes stay verbatim. Quoted users, briefs, and postings are citations,
  never edited into the voice.

## Two guardrails

Don't over-correct. Swapping in odd synonyms or fake errors to seem human produces
prose that reads as evasion, which is worse than reading machine-written. And don't
chase AI-detector scores. Human readers are the audience, and they react to density
and clustering of tells, never to any single device.

## What the humanizer brief changed here, and what it didn't

Adopted: the dramatic short-against-long sentence contrast, varied sentence openers,
irregular paragraph lengths, mid-thought openings, contractions, personality and
stated opinions, the allowance for natural imperfection, conversational transitions
over mechanical ones.

Dropped, each for a reason:

- **Em dashes.** The brief recommends them for "authentic human flow". They're
  banned twice over in the standing rules and they're among the most recognized
  machine tells. The ban stays.
- **Rhetorical questions.** Banned in the portfolio voice rules. A case study that
  asks its reader questions is doing drumroll.
- **Hedge qualifiers** ("I believe," "perhaps," "it seems"). The brief wants them as
  human texture. This voice states opinions flat; hedging is on the banned list.
- **Current events and pop culture.** Case studies age. A 2026 reference reads
  stale in front of a 2028 hiring manager.
- **Deliberately broken grammar.** Covered by the over-correction guardrail. Leave
  natural speech in; never manufacture errors.
- **Detector evasion as the goal.** The standing rules are explicit that detector
  scores are the wrong target. Everything above serves a human reader; that it also
  reads as human to a classifier is a side effect.
