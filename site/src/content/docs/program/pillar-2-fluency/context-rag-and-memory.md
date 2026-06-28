---
title: "Context, RAG and memory: how you give a model your company's knowledge"
description: The practical mechanics of putting your company's documents, data and history in front of a model — at the altitude an executive needs to fund the right thing.
---

<div class="pl-stake">
**The stake.** A business leader asks why the new AI assistant does not know the company's pricing policy, last quarter's board minutes or the customer's renewal history. The honest answer is that nobody connected them. The expensive wrong answer, given by a vendor in the next meeting, is "we need to fine-tune a custom model on your data." The correct answer in nine cases out of ten is retrieval. If you do not know the difference, you will fund the wrong project and still not have the right answer in production. This lesson gives you the working model at executive altitude.
</div>

## Why the model does not know your stuff

A foundation model knows what was in its training data, frozen at a cutoff date. It does not know your customer list, your pricing exceptions, last week's incident report or the email thread your CFO just sent. To do useful work in your business, the model needs that knowledge put in front of it. There are three ways to do that and the choice is one of the most consequential architectural decisions a CAIO will make.

The first way is to put the knowledge directly into the **context window** — paste it into the prompt, attach the file. The second is to **retrieve** it dynamically from a store of your company's content and inject the relevant pieces at query time. The third is to **bake it into the model's weights** through fine-tuning or continued pre-training. The first two are cheap and reversible. The third is expensive and permanent. Most enterprises get this order backwards.

## Context windows as working memory

The context window is the model's working memory for a single request. Everything the model sees — system prompt, conversation history, retrieved documents, the user's question, any tool outputs — sits in the window. Anything outside the window does not exist to the model on this call.

Modern frontier windows have grown from 8,000 tokens in 2023 to 1,000,000+ by 2026. You can now fit an entire 300-page contract or a full quarter of board materials in one call. That does not mean you should. Three constraints bite. Cost rises with input length, and at scale a casual "just put everything in context" pattern can add a zero to your inference bill. Latency rises with input length too; a three-second workflow at 5,000 tokens may take thirty at 500,000. And effective recall lags nominal capacity — facts buried in the middle of a long context are systematically harder for the model to find, a pattern researchers call "lost in the middle."

The executive heuristic is simple. Use context generously for one-off, high-value, low-volume tasks where the user has assembled the relevant material themselves. Use retrieval for repeated, automated, large-corpus tasks where the right material has to be found at query time.

## Retrieval-augmented generation, in plain language

Retrieval-augmented generation, or **RAG**, is the practical default for putting company knowledge in front of a model. Stripped of jargon, it is two steps. When a user asks a question, a retrieval system searches your company's content for the most relevant passages. Those passages are inserted into the model's context along with the question, and the model is instructed to answer using them, ideally with citations.

The retrieval step is where the engineering lives and where most RAG systems fail. The simplest retrieval is keyword search, the same technology that has powered enterprise search for thirty years. The modern default is **semantic search** using **embeddings** — numerical representations of meaning, produced by a smaller model, that let the system find passages that mean the same thing as the question even when they share no words. The store that holds those embeddings is called a **vector database**. The best systems combine keyword and semantic retrieval, rerank the results and pass only the top handful into context.

You do not need to choose the vector database. You do need three things to evaluate a RAG proposal. The quality of the retrieval, measured separately from the model, because if retrieval is bad no model can save the answer. The corpus being indexed and what is being excluded, because the gaps are where the model will confidently confabulate. The citation and traceability story, because in regulated and high-stakes settings an answer without a verifiable source is a liability not an asset.

<img class="pl-diagram" src="/diagrams/rag-flow.svg" alt="Retrieval-augmented generation flow" />

## Memory, honestly

"Memory" is the most over-claimed feature in enterprise AI today. Vendors say their system "remembers" your team. Be precise about what that means, because the implementations differ wildly and so do the risks.

At the basic level, memory is just **conversation history** — prior turns replayed into the context on each new turn. Real but shallow. A second pattern is **summarized long-term memory**: the system periodically distills prior conversations into compact notes and retrieves them, RAG-style, on future calls. More useful, with the failure modes of retrieval. A third pattern, aggressively marketed, is **user-state memory** — the system stores explicit facts about the user ("prefers concise answers," "manages EMEA," "decision-maker for procurement") and injects them into context. Genuinely valuable and genuinely dangerous. Who can read the memory, who can edit it, what happens at offboarding, where it is stored relative to your data-residency obligations and whether the contents are exposed to the model vendor — these are the questions you must ask.

The thing that "memory" is almost never, despite the marketing, is the model itself learning from your interactions. The weights of the model are not updated by your usage. What feels like learning is retrieval and prompting dressed up. Knowing this distinction is the difference between a CAIO and a credulous buyer.

## When to use what

The decision rule, in order. <span class="pl-stat">95%</span> of "we need a custom model" conversations resolve to one of the first three options.

Use **prompting and context** when the knowledge is small, the use case is bespoke, the user can supply the material or the volume is low. Use **RAG** when the knowledge is large, lives in documents or databases, changes often, must be cited and the volume is significant. Use **memory** patterns on top of RAG when personalization is genuinely load-bearing and you have a clear governance answer for who owns the stored facts. Reserve **fine-tuning** for narrow, high-volume tasks where prompting and retrieval have plateaued and the unit economics justify the program. Reserve **continued pre-training** for almost nothing, almost ever, outside the foundation labs.

The single most common enterprise failure is to skip the first three options and reach for the fourth. The single most common CAIO contribution in year one is to redirect those projects back to where the value actually lives.

<div class="pl-exercise">
**Exercise.** Pick a real question your CEO or board chair has asked in the last quarter that an AI assistant should have been able to answer well — pricing exception, customer history, policy detail, regulatory commitment. Write down where the answer actually lives (which system, which document, which person's head). Then write the one-paragraph retrieval design that would have put that knowledge in front of the model in time. If the answer lives in a person's head, that is a knowledge-management problem you have just discovered.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the knowledge-integration column of your **AI Capability & Vendor Map** — the page where you record, for each high-value workflow, which sources of company knowledge the model must reach, by which mechanism and with what governance. The full template, with the retrieval-quality scorecard, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** A vendor demos a "memory-enabled assistant that learns from every interaction with your team." Your board chair is impressed. What do you ask before the next meeting?

**A.** Two questions, in order. First, ask whether the model weights are being updated or whether "learning" is retrieval and prompting over a stored user-state. The honest answer will be the latter, which is fine but is not learning in the sense the marketing implies. Second, ask the governance questions — who can read the stored memory, who can edit it, where it is hosted, what happens at offboarding, whether it leaves your tenant and whether it is exposed to the vendor's own training pipeline. The first question separates fluent CAIOs from credulous buyers. The second one prevents a data-protection incident eighteen months later.
</details>

You can now put your company's knowledge in front of a model deliberately. Next, in [agents and tools](/program/pillar-2-fluency/agents-and-tools/), you will see what happens when the model is allowed to act on that knowledge.
