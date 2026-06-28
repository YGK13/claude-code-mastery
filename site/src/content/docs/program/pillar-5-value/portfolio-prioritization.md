---
title: "Portfolio prioritization: choosing the right AI bets"
description: How to score, stage and kill AI investments so the portfolio compounds instead of sprawling.
---

<div class="pl-stake">
**The stake.** Your organization has 47 AI initiatives in flight. Eleven of them are real. Six are vendor pilots nobody asked for. Nine are pet projects from executives who watched a keynote. The rest are dashboards. The board wants to know which ones matter and which ones you are killing. <span class="pl-stat">80%</span> of AI projects never reach production. If you cannot make the portfolio call publicly and defensibly, the failure rate stays at 80% and the budget stays sprawling. This lesson is the framework you use to make the call.
</div>

## The myth of the prioritized list

Most "AI portfolios" are spreadsheets with a column called priority sorted by who shouted loudest in the last steering committee. The CIO has six initiatives. The CMO has four. The Head of Sales has three. Nobody has killed anything in two years. The pattern is familiar from every poorly run capex cycle in the last 30 years, and AI has made it worse because the technology is newer, the FOMO is louder and the marginal cost of starting another pilot feels like zero.

It is not zero. Every pilot consumes the scarcest resource in the building, which is the attention of the senior operators who would have to change behavior for the system to work. A portfolio with 47 things on it is a portfolio with zero things on it. A CAIO's first job is to compress the list to a number the organization can actually staff and sustain. For most companies that number is between 8 and 15.

## The 2x2 and the third overlay

The base frame is the value-feasibility 2x2 every strategy consultant has drawn since 1987. The y-axis is value, sized in the dollars from your AI Value & ROI Model. The x-axis is feasibility, scored on data readiness, model maturity, workflow integration and the presence of a willing executive sponsor with operational authority.

The four quadrants give you the first read. High value, high feasibility is where you start. High value, low feasibility is where you invest in capability. Low value, high feasibility is where you ship quick wins for credibility. Low value, low feasibility is where you say no.

The 2x2 is necessary and incomplete. AI portfolios fail on a third dimension the standard frame ignores, which is risk and dependency. Two initiatives can sit in the same quadrant but have wildly different risk profiles. One uses a foundation model from a single vendor on regulated customer data with no human review. The other uses an internal classifier on operational data with three points of human approval. The 2x2 calls them equivalent. The risk overlay does not.

Add the overlay as a color or a bubble size. Red bubbles get a governance gate before they advance. Green bubbles move on the standard cadence. The portfolio map becomes a one-page conversation with the board.

<!-- diagram: A 2x2 grid with value on the y-axis and feasibility on the x-axis, populated with 10-12 bubbles sized by investment dollars and colored by risk tier (green/yellow/red); quadrants labeled "ship now," "invest in capability," "quick wins," and "no." -->

## The four bet types

A real portfolio mixes four kinds of bets in deliberate proportion. The mix is the strategic statement.

**Quick wins.** Six- to twelve-week deployments with a single function, a clear owner and a P&L line that moves visibly. Document summarization for legal. Email triage for sales operations. Forecast cleanup for finance. These build the operational credibility you spend on bigger bets. The portfolio should hold three to five at any time.

**Platform plays.** Twelve- to twenty-four-month investments in shared capability — the data plane, the model abstraction layer, the evaluation harness, the governance tooling. Nobody outside the AI org sees them and everyone outside the AI org benefits from them. Underfunding the platform is the single most common reason year two of the portfolio underperforms year one. Two to three at any time.

**Moonshots.** Bets on the new operating model itself — the autonomous claims function, the AI-native product, the org redesign that 10x's an existing service line. High variance, long horizon, board-level visibility. One to two at any time. Anything more and you are not running a portfolio, you are running a science fair.

**Table stakes.** Investments you make because the regulator, the customer or the competitive set requires them. EU AI Act compliance work after August 2026. Basic security review on every model in production. Literacy training. Not exciting and not optional. Budgeted separately so they do not crowd out the discretionary bets.

A portfolio that is 90% quick wins is a portfolio that does not move the operating model. A portfolio that is 50% moonshots is a portfolio that misses the budget. The defensible mix for most companies in 2026 is roughly 40% quick wins, 30% platform, 10% moonshot, 20% table stakes.

## Cadence: kill rate and replenish rate

The two numbers that matter most in portfolio management are the kill rate and the replenish rate. Healthy AI portfolios kill 20 to 30% of active initiatives every year. Healthy AI portfolios replenish at roughly the same rate. If your kill rate is zero, you are not running a portfolio, you are running a cemetery with a lawn service. If your replenish rate is zero, you have stopped learning.

Killing requires explicit criteria written down at the start. Every initiative enters the portfolio with three kill triggers attached. Failed validation against the pre-mortem indicators. Sponsor departure without a successor. Or a value forecast that drops below threshold on the post-hoc. When a trigger fires, the initiative goes to the portfolio review with a recommendation to kill, pivot or rescope. The decision is made in the room and communicated within a week.

Replenishment runs on the same cadence. Every quarter the portfolio review names two to three new candidates from the intake pipeline, scores them against the same framework and lets them in. The pipeline itself is fed by a standing intake process that any executive in the company can use, scored by the AI office, ranked into the next review.

## The politics of killing pet projects

The hardest portfolio decisions are not the analytical ones. They are the political ones. The CMO's pet generative-content pilot has 18 months of sunk cost, a vendor relationship she championed and zero attributable value. The CFO who told you to be ruthless will not back you in the room when you propose killing it.

Three moves make this survivable. First, never kill in isolation. Kills happen in batches at the quarterly portfolio review, where every executive has at least one of their initiatives discussed. The asymmetry of attention disappears.

Second, kill on pre-committed criteria. The CMO signed the pre-mortem 12 months ago. The kill trigger is hers, not yours. You are the messenger of her own framework.

Third, offer a graceful exit. The initiative does not die. It pivots into a smaller scope, gets folded into a related platform play or becomes a learning memo published to the full executive team. The sponsor keeps their face. The portfolio keeps its discipline.

## Staffing the portfolio, not the loudest stakeholder

The default failure mode in AI staffing is to allocate engineers and analysts to whoever called the most meetings. The disciplined alternative is to staff against the portfolio mix. Quick wins get small embedded squads of two to four. Platform plays get the senior staff and the longest tenure. Moonshots get a dedicated team with explicit board air cover. Table stakes get a shared service.

Your weekly conversation with engineering leadership stops being "who needs people" and becomes "are we staffing against the portfolio." The change is small and the consequence is enormous.

<div class="pl-exercise">
**Exercise.** List every AI initiative in your organization that has a budget line, an engineer assigned or an executive sponsor named. Score each on value (from the AI Value & ROI Model), feasibility (data, sponsor, integration), risk tier and bet type. Plot the top 20 on the 2x2 with the risk overlay. Write down three you would kill this quarter and the kill trigger for each. Bring the list to your next steering committee.
</div>

<div class="pl-artifact">
**Your artifact.** A prioritized AI Portfolio Plan — your top 12 bets scored, staged into the four bet types, with explicit kill criteria per initiative and a target mix percentage for the next 12 months. This is the document that runs the quarterly portfolio review. The full scoring rubric, kill-trigger template and intake process are in the certificate and live alongside your AI Value & ROI Model.
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** Your CIO has 18 AI initiatives in flight, all rated "high priority" in last quarter's review. The CEO asks you in the hallway which ones matter. What is the structural answer, not the political one?

**A.** Eighteen high-priority initiatives means zero priorities. The structural answer is that the portfolio needs a forced mix — no more than 12 active, with explicit allocation across quick wins, platform, moonshot and table stakes, and a kill rate of 20 to 30% per year. The political work happens in the next quarterly review, not in the hallway.
</details>

The portfolio sets what you build. The next lesson is what determines whether anyone uses it. Move to [The adoption program](/program/pillar-5-value/the-adoption-program/) or see the full certificate in [/pricing/](/pricing/).
