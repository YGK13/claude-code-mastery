---
title: "Build vs. buy vs. fine-tune: the decision framework"
description: The criteria, the decision tree and the common executive mistakes — the framework a CAIO uses to decide where the company should actually invest in AI.
---

<div class="pl-stake">
**The stake.** Three vendor proposals are on your desk for the same capability. One is a $40K SaaS subscription that ships next month. One is a $1.4M implementation that customizes an enterprise platform over a quarter. One is a $6M build-from-scratch program with a custom fine-tuned model and an 18-month timeline. The sponsor argues all three are "strategic." The board wants an answer next week. Without a clean framework you will either pick on instinct (and be unable to defend it) or pick on cost (and miss the cases where the expensive answer is right). This lesson is the framework a CAIO is paid to apply.
</div>

## The five criteria that actually decide

Strip away the slide titles and every credible build-vs-buy-vs-fine-tune decision comes down to five questions, asked in order. The order matters.

**Data.** Does the capability depend on data that is yours, that you can legally use for this purpose and that materially differentiates the result? If yes, the answer trends toward build or fine-tune. If no — if it runs on common public data or a vendor's own corpus — the answer trends toward buy. Most "we need our own AI" arguments collapse under this question because the team has not actually identified a proprietary, usable dataset that the model needs to be shaped by.

**Differentiation.** Is this capability a source of competitive advantage or a cost of doing business? If it is differentiating — your unique pricing engine, your proprietary risk model, the experience customers come to you specifically for — then owning it matters. If it is undifferentiated — meeting transcription, document summarization, sales-email drafting, support triage — then buying the best general solution and routing your scarce capital elsewhere is almost always right. The honest answer is usually "less differentiating than the sponsor claims."

**Regulatory.** Does the workflow sit in a regulated domain (healthcare, financial services, legal, government, EU operations under the AI Act) that constrains where the data can flow, who can audit the system and what residency, explainability or human-oversight requirements apply? If yes, the buy menu narrows fast and the build or private-cloud option becomes more credible.

**Talent.** Do you have, or can you credibly hire and retain, the engineering, ML, security and product talent to build and operate this capability for the next five years? Building is a five-year commitment, not a project. "We can hire for it but it will be hard" is a yellow light. "We already have it and it is underutilized" is the only green light.

**Time-to-value.** When does the business need this working? If the answer is "this quarter," build is off the table for anything non-trivial. If the answer is "by end of fiscal year," buy is the default and fine-tune is the customization layer on top. If the answer is "two-year strategic horizon," all three options are live and the other four criteria decide.

## The decision tree, in practice

The five criteria assemble into a decision tree you can walk through with a sponsor in twenty minutes.

Start at the top. Undifferentiated, unregulated and needed soon? **Buy.** Pick the best SaaS or platform option, integrate cleanly, focus your scarce capital on workflows that do differentiate. A meaningful share of the most successful enterprise AI programs of the last two years are mostly excellent buying decisions with thin internal integration layers on top.

Differentiating, data proprietary, time horizon at least a year? Now the choice narrows to **build** or **fine-tune on a bought base**. The right move here is almost never a full-stack build from raw model up — recall the lifecycle lesson. The right move is to rent the frontier model, build the application and agent layer that captures the differentiation, and either prompt-engineer or fine-tune where customization needs to be enforced harder than a prompt can manage.

Regulated to a degree no vendor offering can clear your compliance bar? The calculus shifts toward a **private deployment** of a frontier or open-weights model, hosted in your tenant or on-premises, with the same application-layer build on top. The most expensive path and the one that requires the most mature talent. Also, in some domains, the only path that survives a regulator's review.

Ambiguous on every criterion? **Pilot before you decide.** Run a four-to-eight week experiment using the cheapest viable option (almost always buy), measure against the eval framework from the previous lessons and let the data tell you whether to go further. A pilot is not a decision postponed; it is a decision instrumented.

<img class="pl-diagram" src="/diagrams/build-buy-finetune-tree.svg" alt="Build vs buy vs fine-tune decision tree" />

## When each path is right

**Buy is right** for the great majority of horizontal productivity workloads — meeting capture, search, drafting, summarization, code assist, internal Q&A. The category leaders ship more capability per quarter than your internal team can match, pricing is rational at enterprise scale and the integration burden is real but bounded. The CAIO move is rigorous vendor selection, clean integration and ruthless consolidation — not parallel internal tooling.

**Fine-tune is right** for narrow, repeated, format-or-tone-sensitive tasks where prompting has demonstrably plateaued, where you have hundreds to thousands of clean examples and where a smaller fine-tuned model can beat a prompted frontier model on cost, latency or both at your volume. Customer-support reply generation in a specific brand voice. Document classification in a specific taxonomy. Structured extraction from a specific document format. Fine-tuning is a scalpel, not a hammer.

**Build is right** for the application and agent layer on top of bought models, where your differentiation actually lives. The workflow logic. The retrieval over your proprietary corpus. The orchestration across multiple models. The integration into your data, your systems, your customers. <span class="pl-stat">80%+</span> of enterprise AI projects never reach production per RAND, and the ones that do almost always have a deliberate build layer where the company's unique value is encoded. Build the layer that is yours. Buy the layers that are not.

## The common executive mistakes

Four mistakes recur. Each is the symptom of skipping one of the five criteria.

**The vanity build.** A senior leader decides the company must have "its own AI" for strategic-narrative reasons unconnected to the criteria. The team spends a year and many millions building something a vendor ships better six months in. The fix is to make the differentiation question the first one asked, with honest answers required.

**The over-customization spiral.** A bought product is heavily customized to mirror legacy workflows, accumulating integration debt that consumes the original cost advantage and locks the company into a configuration that no longer matches the vendor's roadmap. The fix is to redesign the workflow to the bought product where possible and reserve customization for the differentiating edges.

**The single-vendor lockout.** Architecture is built so tightly around one vendor's APIs, formats and quirks that switching costs become prohibitive. When that vendor falls behind on capability or price, the company cannot move. The fix is portable architecture — open standards at the tool and protocol layer (MCP, function-calling formats, evaluation frameworks) so the model itself remains swappable.

**The premature fine-tune.** A team fine-tunes before they have exhausted prompting and retrieval, because fine-tuning sounds more serious. They end up with a fragile artifact that ages out with the next frontier model release. The fix is the lifecycle discipline — prompting first, retrieval second, fine-tuning only when the first two have demonstrably plateaued.

A CAIO who can recognize these four patterns by the third slide of any pitch saves the company more money in year one than the CAIO's own compensation.

<div class="pl-exercise">
**Exercise.** Take the three live AI initiatives in your business with the largest committed spend. For each one, walk it through the five criteria and the decision tree. Write down where the team currently sits, where the tree says it should sit and the gap between the two. If any initiative is on the build path without a credible answer to the data, differentiation and talent questions, it is the first conversation you should have this month.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the **Build-vs-Buy Decision Memo template** — the one-page document a CAIO writes for any AI capability decision over a defined threshold, capturing the five criteria, the tree position, the chosen path, the cost-and-time envelope and the named owners. The full template, with worked examples for each path, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** A division head argues that the company should build a custom AI sales assistant from scratch because "our sales process is unique." The proposal is $4M over 18 months. What is your response?

**A.** Push it through the five criteria on the spot. On data — what specifically about your sales data is proprietary, usable and not already captured by major sales-AI vendors. On differentiation — is the sales process itself the moat, or is the moat the product, the relationships and the brand. On regulatory — is there a constraint that excludes the bought options. On talent — do you have the team to build and operate this for five years. On time-to-value — what is the cost of waiting 18 months while competitors using bought tools sell against you. In nearly every case the honest answers point to buy-with-a-thin-application-layer at a fraction of the cost. The CAIO conversation is not "no to build." It is "build where it earns the spend and buy everywhere else."
</details>

You have completed Pillar II. You now have the fluency to defend any AI decision in a boardroom and to credibly direct an engineer who knows more than you do. The next pillar, [Build](/program/pillar-3-build/overview/), is where that fluency becomes a shipped artifact.
