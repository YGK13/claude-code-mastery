---
title: "Cost, latency and risk: the executive tradeoff triangle"
description: The three knobs every AI decision turns — capability, speed and exposure — and how a CAIO sets them deliberately instead of accidentally.
---

<div class="pl-stake">
**The stake.** Your CTO walks in with a $9M annual AI infrastructure bill and a deck arguing for an "efficiency program" that swaps the frontier model for a smaller one across the stack. The CFO is nodding. You have ninety seconds to decide whether to support the move. If you do not know which workloads can tolerate a smaller model, which cannot and what the latency-and-risk shifts will be, you will either approve a quiet quality collapse or block a credible $3M saving. This lesson gives you the triangle that every AI decision sits inside.
</div>

## The three knobs of every AI decision

Every AI workflow turns on three knobs at once. **Capability** — how smart, accurate or capable the model must be for this task. **Latency and cost** — how fast and how cheap the answer needs to be. **Risk surface** — what happens if the answer is wrong, slow or exposed. The three are coupled. You cannot maximize all three for the same workload, and pretending otherwise is the single most common cause of AI program drift.

The fluent CAIO does not start a workflow design with "which model." The fluent CAIO starts with the three knobs. What capability bar does this workflow require to be useful. What latency does the user expect and what cost can the business absorb at this volume. What is the realistic worst case if the system is wrong, slow or compromised, and how do we keep that worst case inside what the business can survive. The model choice falls out of the answers, not the other way around.

<!-- diagram: an equilateral triangle with three vertices labeled "Capability," "Latency & cost" and "Risk surface." Inside, a movable point shows the workload's chosen position. Three example points are labeled: "Customer support draft (high capability, high latency tolerance, medium risk)," "Real-time autocomplete (medium capability, very low latency, low risk)" and "Financial advice (very high capability, medium latency, very high risk)." Caption: "Every workload sits somewhere inside the triangle. The wrong question is 'which model.' The right question is 'where in the triangle.'" -->

## Capability is not a single dimension

The first source of expensive confusion is treating "model capability" as one number. The vendor benchmarks invite this — a leaderboard score, a percentile, a single bar in the slide. In production, capability is a vector.

A model excellent at long-context summarization may be mediocre at structured extraction. A model that writes beautifully may reason poorly about numbers. A model that handles English flawlessly may degrade sharply in Spanish or Arabic. A model best in class on a static benchmark may be worse than a smaller competitor on your specific corpus.

The executive move is to demand workload-level capability evidence, not headline benchmarks. For each material workflow, the team should be able to show, on a test set drawn from your real traffic, how each candidate model performs against your rubric. The eval discipline from the previous lesson is the input to the cost decision in this one.

The corollary is that the right answer is rarely "one model for everything." Mature AI programs run a portfolio — a frontier model for the hardest, highest-stakes calls, a mid-tier for the bulk of routine traffic, a small fast model for high-volume low-judgment work and sometimes a fine-tuned narrow model for one specific format. The orchestration layer routes each request to the cheapest model that meets the bar. That portfolio approach is what makes unit economics work at scale.

## Concrete vendor pricing patterns

You do not need to memorize a price list — they change quarterly. You do need to know the shape of the pricing so you can read any vendor's sheet quickly.

Modern frontier API pricing is denominated per million tokens, split between input and output, with output usually two to five times more expensive than input. Mid-tier models from the same vendor typically price at one-tenth to one-third of frontier; small models at one-twentieth to one-fiftieth. Caching of repeated input (the same long system prompt across thousands of calls) knocks another large fraction off the input cost. Batch processing, where latency does not matter, can knock another half off.

Three line items routinely surprise executives. **Long context** carries a surcharge that grows non-linearly with input length and can dominate the bill for workloads that habitually load large documents into the prompt. **Tool use and reasoning modes** in newer models often produce a great deal more output tokens than the user sees — internal "thinking" steps you still pay for. **Volume commitments and reserved capacity** are negotiable at enterprise scale; the published rate card is the start of a conversation, not the final price.

The CAIO who walks into a renewal knowing their own workload's input-output ratio, average context length, cache-hit potential and batch-eligible fraction will negotiate a materially better deal than the one who quotes the rack rate back at the vendor.

## Why "cheaper" is often the wrong question

The instinct, especially from the CFO seat, is to ask which model is cheapest. The better question is which model is cheapest per accepted answer, where "accepted" means meeting the workflow's quality bar.

A frontier model that gets 92% of cases right on the first try, at $0.10 per call, costs $0.11 per accepted answer. A smaller model that gets 70% right at $0.02 per call, with the failed 30% retried on the frontier, costs roughly $0.05 per accepted answer — a real win. The same smaller model, in a workflow where the 30% failure is a customer-facing escalation that costs the company $40 to resolve, has a true unit cost of more than $12 per call. Wrong answer.

The math has to be done at the workflow level, with the full cost of a bad answer in it. <span class="pl-stat">95%</span> of enterprise AI pilots reportedly produce zero measurable ROI because the cost side of the ledger is usually one line item (the API bill) and the value side is usually four — labor savings, revenue lift, error reduction, time-to-decision. A CAIO who can put both sides on one page survives the budget conversation.

## Risk surface, soberly

The third knob is the one most likely to be discounted in the room and most likely to end careers. Risk surface includes accuracy risk (wrong answers reach customers), security risk (the model or its surrounding system is compromised), data risk (sensitive information leaks into prompts, outputs or vendor training pipelines), regulatory risk (the workflow violates a rule like the EU AI Act's Article 4 literacy provisions live as of August 2026) and reputational risk (the system says something the company would never sanction).

Each scales differently with the other two knobs. Pushing for lower cost often means smaller models, which means more errors, which raises accuracy risk. Pushing for lower latency often means weaker reasoning, which can raise accuracy risk further on complex tasks. Pushing for higher capability often means routing more traffic to the frontier model, which means more of your data flowing to a single vendor, which raises data risk and concentration risk. Every move on one knob is a move on the other two.

The discipline is to make those tradeoffs explicit at the workflow level, signed off by the right executives — security, legal, compliance, the business owner and you — at the right cadence. Risk that is implicit in an engineering decision is risk that nobody owns.

## The budget arc of a credible enterprise AI program

For an executive setting the multi-year plan, a useful frame is the budget arc. Year one runs heavy on experimentation, low on volume — many use cases, small spend each, almost all of it learning. Year two consolidates winners, kills losers and starts to run real volume on a handful of workflows. Year three is when the portfolio approach pays off — the frontier model handles the hard calls, mid-tier and small models handle the bulk, the orchestration layer is mature and unit economics start to compound. Year four onwards, the AI line item is a meaningful percentage of operating cost and a meaningful contributor to revenue or margin, governed like any other major spend.

The CAIO whose budget request reads like that arc is the CAIO whose budget is approved.

<div class="pl-exercise">
**Exercise.** Take the AI workload in your business with the highest current spend. Plot it on the triangle in your own notes. Write one sentence each on (a) the capability bar it actually needs, (b) the latency the user actually experiences and the cost per call you are actually paying and (c) the realistic worst case if it gives a wrong answer. Then write the one move on each knob you would propose if asked tomorrow to take 30% out of the cost without taking quality with it.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the cost model to your **AI Value & ROI model** — the page where you record, for each workload, the model portfolio, the per-accepted-answer unit cost, the cache and batch optimization assumptions and the risk-adjusted breakeven. The full template, with the negotiation prep checklist, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** Your CTO proposes swapping the frontier model for a smaller model across the entire AI stack to save 60% of the API bill. What do you ask before you decide?

**A.** Three things. The per-workflow eval delta — on each material workload's representative test set, what does quality look like on the smaller model relative to the current one. The cost-of-error map — for each workload where quality drops, what is the full downstream cost of the additional bad answers (escalations, refunds, compliance hits, churn). The routing alternative — instead of a global swap, what does a portfolio approach look like, with the smaller model handling routine traffic and the frontier model handling the hard cases via an orchestration layer. A blanket swap optimizes for the bill. A portfolio optimizes for unit economics.
</details>

You can now reason about the economics with the same fluency as the engineering. Next, in [build vs. buy vs. fine-tune](/program/pillar-2-fluency/build-vs-buy-vs-fine-tune/), you will see the framework that turns this fluency into the decisions a CAIO is actually paid to make.
