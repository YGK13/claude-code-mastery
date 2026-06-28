---
title: "The LLM lifecycle: pre-training, fine-tuning, RLHF — and why it matters to you"
description: The four stages that turn a raw neural network into a usable model, the cost of each and where the executive decisions actually live.
---

<div class="pl-stake">
**The stake.** A vendor proposes a $4M engagement to "fine-tune a custom model on your data." The CFO looks to you. If you cannot tell whether they mean a full pre-training run (impossible at that budget), supervised fine-tuning on a base model (usually unnecessary), reinforcement-learning post-training (rarely the right answer) or simply prompting and retrieval (almost always the right answer), you will sign for the wrong thing. This lesson gives you the four-stage map and the decision rules attached to it.
</div>

## The four stages, end to end

Every model you can buy or build moves through the same four stages. The cost separation between them is real and the executive consequences differ sharply at each one.

**Pre-training** is where a base model is born. A foundation lab takes trillions of tokens — open web, books, code, curated data — and runs an optimization process for months on tens of thousands of GPUs. The output is a raw next-token predictor that has absorbed the statistical structure of language but does not yet know how to follow instructions or refuse harmful requests. A single frontier run costs hundreds of millions of dollars in compute alone.

**Supervised fine-tuning**, or SFT, is the first post-training stage. Engineers feed the base model tens to hundreds of thousands of curated input-output pairs — questions and ideal answers, instructions and good completions — and the weights are nudged to produce that style of response. SFT teaches the model to follow instructions instead of free-associating. A meaningful effort runs in the low single-digit millions and weeks to months, sometimes much less for narrower goals.

**Reinforcement learning from human feedback**, or RLHF (and its cousin RLAIF, where the rater is another model), shapes the model to prefer outputs humans actually like. Raters compare two responses and pick the better one. The model learns a reward function from those comparisons and is updated to maximize it. RLHF is where personality, helpfulness, tone, refusal behavior and most of what feels like "judgment" live.

**Deployment** is where the model meets a real user. The same weights now serve millions of requests through an API or product surface. The cost shape inverts here. Each call is cheap; the bill is the sum of millions of cheap calls. The hard problems shift from training to serving — latency, throughput, monitoring, drift.

<img class="pl-diagram" src="/diagrams/llm-lifecycle.svg" alt="The LLM lifecycle: pre-training, fine-tuning, RLHF, deployment" />

## Pre-training is not your problem

The first executive instinct is to ask whether the company should build its own. The answer is almost always no, and the reasoning matters because you will be asked.

The economics are stark. Nine-figure compute spend. A research team of dozens of specialists. A multi-year data and infrastructure investment. <span class="pl-stat">95%</span> of enterprise AI pilots reportedly produce zero measurable ROI per MIT's NANDA study, and almost none of those failures are because the model was not bespoke enough. They fail at the workflow, change-management and evaluation layers — the layers you actually control.

The exceptions are narrow. A frontier lab pre-trains because the model is the product. A handful of national labs pre-train for strategic reasons. Outside that set, the right move is to rent the base model and spend your scarce talent above it. A CAIO who proposes a pre-training program without a credible answer for "why us, why now" has confused ambition with strategy.

## Fine-tuning is the most misused word in the field

When a stakeholder says "we should fine-tune," they almost always mean one of four things and rarely know which. Your job is to translate.

Sometimes they mean **prompt engineering** — better instructions, better examples, better structure. Free, fast and the right first move for most problems. Sometimes they mean **retrieval-augmented generation** — connecting the model to your company's documents so it can cite them. The right answer for most "make the model know our stuff" requests, and the subject of the next lesson. Sometimes they mean **supervised fine-tuning** on a base or instruction-tuned model — appropriate when you need a specific format, a tone the prompt cannot reliably enforce or a narrow domain where a small fine-tuned model can beat a large prompted one on cost and latency. Sometimes, very rarely, they mean **continued pre-training or RLHF** — appropriate almost nowhere outside regulated, data-rich, high-volume use cases.

The decision rule is brutally simple. Start with prompting. If prompting plateaus, add retrieval. If retrieval plateaus on a narrow repeated task, consider SFT. Only consider full post-training when you can show, with numbers, that the prior three stages have been exhausted. Most "fine-tuning" projects in the wild fail this test.

## What RLHF actually shapes

RLHF is the stage executives understand the least and underestimate the most. It is where the model learns what "good" looks like according to the humans doing the rating. Almost every behavior that makes the user experience feel premium — the patient tone, the helpful structure, the willingness to push back politely, the refusal of unsafe requests — is RLHF doing its job. Almost every behavior that makes the model feel frustrating — sycophancy, over-hedging, refusal of reasonable requests — is also RLHF, miscalibrated.

For an enterprise, three implications follow. The personality of the model you buy is the personality the lab chose; pick the model whose default matches your user's expectations. Model upgrades change behavior in subtle ways because the lab re-ran RLHF, and your evaluation harness has to catch the regressions before your customers do. An internal RLHF program is rarely justified — it is the most expensive stage and the one where the labs have the deepest moat.

## The executive implication: where to spend

Pre-training is a sunk cost the lab pays and prices into the API. Post-training is where the labs invest most of their differentiation, and you rent it. Your scarce talent and capital go above the model — into prompting, retrieval, evaluation, workflow design, agent orchestration and change management. That is where <span class="pl-stat">80%+</span> of enterprise AI projects fail to reach production per RAND, and therefore where the highest-leverage CAIO work lives.

<div class="pl-exercise">
**Exercise.** Take the most ambitious AI proposal currently on your desk. Walk it through the four stages: which stage does it actually touch, which stage does the vendor or sponsor think it touches and what is the cost-and-time delta between the two answers. If the proposal lives at the post-training layer, write the one paragraph you would need to justify to your board why it is not a prompting-and-retrieval problem.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the lifecycle column of your **AI Capability & Vendor Map** — the page where you record, for each capability you need, which lifecycle stage delivers it, at what cost and who owns the IP afterwards. The full template, with the build-vs-buy decision tree, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** A business unit lead tells you they want to "fine-tune the model on three years of our support tickets so it answers like our best agent." What is your response?

**A.** Push it back one stage. Start with retrieval over the same three years of tickets and a strong system prompt that captures the best agent's tone and protocol. Measure the result on a representative test set. Only after retrieval plateaus, and you have data on where it plateaus, is supervised fine-tuning a credible spend — and even then the question becomes whether a smaller, cheaper fine-tuned model beats the prompted frontier model on cost and latency, not just on quality.
</details>

You now know what each stage costs and what each stage shapes. Next, in [context, RAG and memory](/program/pillar-2-fluency/context-rag-and-memory/), you will see how to give the model your company's knowledge without ever touching the weights.
