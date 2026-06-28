---
title: Ship a RAG assistant over your own documents
description: The architecture, the recipe and the executive logic for the single most valuable thing a non-technical CAIO can ship in their first 90 days.
---

<div class="pl-stake">
**The stake.** More than <span class="pl-stat">80%</span> of enterprise AI projects never reach production. The cohort of CAIOs that get hired in 2026 will be the ones who can point to something they shipped — not a deck, not a pilot, an actual working system that answers questions over the company's own knowledge. This lesson teaches you the architecture, the recipe and the judgment to lead that build. The cohort ships it together.
</div>

## What RAG is, in one paragraph

Retrieval-augmented generation, RAG, is the way you give a language model your company's knowledge without retraining it. Instead of stuffing facts into the model's weights — which is expensive, slow and immediately stale — you keep the documents on the outside, retrieve the most relevant chunks at the moment of the question and pass them into the model's context window as evidence. The model then answers grounded in those chunks and, when configured properly, cites them. It is the architecture behind almost every enterprise AI assistant you have actually used: the policy bot at a bank, the engineering wiki search at a tech company, the contract assistant at a law firm. It is also the architecture you will ship.

RAG is the right starting point for a non-technical CAIO for three reasons. It is genuinely useful — it solves a real problem your people have today. It is defensible to a board — you can explain every step in plain English. And it is unambiguous about what was retrieved and what was generated, which is what your risk committee will ask first.

## The architecture, one layer at a time

A RAG system has five stages, and you should be able to draw them on a whiteboard from memory. They are sequential, each with its own decision points, and the quality of the final answer is bounded by the weakest link.

**Ingest.** You pull documents out of the systems where they live — SharePoint, Confluence, Notion, a Google Drive, a file share, a database. You normalize them into clean text and strip the formatting noise that confuses downstream steps. The boring stage that determines everything. Ninety percent of bad RAG systems are bad here.

**Chunk.** Long documents get broken into pieces small enough to fit usefully into the model's context but large enough to preserve meaning — typically a few hundred to a couple thousand tokens, with some overlap so that ideas straddling a boundary are not lost. There is judgment here: a contracts corpus and a transcripts corpus do not chunk the same way.

**Embed.** Each chunk is converted into an **embedding** — a long list of numbers that represents the chunk's meaning in a high-dimensional space. Two chunks about the same topic land near each other in this space; two about different topics land far apart. You produce embeddings with a small, cheap model designed for the job, not the same model that writes the answers. The embeddings get stored in a **vector store** — a specialized database that can find nearest neighbors quickly.

**Retrieve.** At question time, you embed the user's question with the same embedding model, query the vector store for the chunks closest to that question and pull back the top handful. Good systems also do keyword search alongside vector search and combine the results, because some questions are about exact terms (a contract number, a person's name) and vectors alone miss those.

**Ground and generate.** You assemble a prompt that contains the question, the retrieved chunks and an instruction to the model: answer only from the evidence provided, cite which chunks you used, and say "I do not know" if the evidence does not support an answer. The model produces a grounded response with citations. The user clicks a citation, sees the source, and trusts the system. Or the system says it does not know, and the user trusts it more.

<img class="pl-diagram" src="/diagrams/rag-flow.svg" alt="RAG flow: query, retrieve, ground, generate" />

## The six-step shippable recipe

This is the high-altitude version of what your cohort will actually build. In the program, this maps to AIEFS lessons P11.04 through P11.07. Here it is at the level you need to lead it.

**One. Pick a corpus that matters and is bounded.** Not "all of our knowledge." One specific corpus where a real person spends real time hunting for answers today — your HR policies, your sales playbooks, your engineering runbooks, your customer contracts. Bounded scope is the difference between a demo in two weeks and a project in two years.

**Two. Stand up the model and the vector store.** For most enterprises this is the Anthropic or OpenAI API for generation, a smaller embedding model from the same provider, and a managed vector store — Pinecone, Weaviate or the vector features now built into Postgres and Snowflake. You are not building infrastructure. You are wiring it.

**Three. Build the ingestion pipeline.** A script that pulls documents from their source, normalizes them, chunks them, embeds them and writes them to the vector store. Claude Code or a similar coding agent can scaffold most of this in a day if you describe the corpus precisely. You will iterate on chunking strategy more than you expect.

**Four. Build the query path and the prompt.** The prompt is where the executive judgment lives. You will specify the instructions: answer only from evidence, refuse out-of-scope questions, cite sources, escalate sensitive categories to a human. This is your governance, written in English, sitting in the system.

**Five. Build an evaluation set.** Twenty to fifty real questions from real users with the right answers written by a human expert. You run the system against this set every time you change anything, and you watch the accuracy number. Without an eval set you are not engineering — you are vibing. The eval set is also what your audit committee will ask to see.

**Six. Pilot with one team, measure adoption and grounded accuracy, then expand.** A small group of users for two to four weeks. You watch what they ask, where the system fails and whether they keep coming back. The expansion conversation is much easier when you can show a usage chart and an accuracy chart, not a screenshot.

A small team with the right scoping can stand up a useful first version of this in two to four weeks. The cohort does it in six, with governance, evaluation and a board-ready writeup.

## What goes wrong and what to insist on

The most common failure is **bad ingest**. Documents extracted with formatting noise, tables that turn into garbage, PDFs where the text is actually images. The system retrieves nonsense, generates nonsense, the pilot fails and someone declares "the AI does not work." It was not the AI.

The second is **no evaluation**. The team ships, the demo is impressive, a month later a user finds the system confidently citing a chunk that does not support the answer it gave. Without an eval set, no one knows whether this is one bug or a class of bugs. Insist on the eval set.

The third is **prompt-as-policy drift**. The instructions in the system prompt are the policy of the assistant. When the legal team has not seen them, you have a governance hole you do not know about. The prompt belongs in version control and in your governance pack — see Pillar IV.

The fourth is **scope creep**. The pilot works on contracts; someone asks for it to also cover sales playbooks, HR policies and customer support tickets in the same assistant. The retrieval quality collapses, because the embedding space is now crowded and the prompt instructions are now contradictory. One corpus, one assistant. Expansion is a new project.

<div class="pl-exercise">
**Exercise.** Pick one document corpus in your organization you would want to RAG over in your first 90 days as CAIO. Write down the corpus in one sentence, the user who would use it daily, two or three out-of-scope questions the system must refuse to answer and one category of question where a wrong answer would be a real risk. That paragraph is the scoping document you would hand to the build team.
</div>

<div class="pl-artifact">
**Your artifact.** A deployed RAG assistant over a real corpus, with an evaluation set, a governance-reviewed system prompt and a usage dashboard. Your first and most credible portfolio piece. The cohort actually ships this together; this lesson teaches the architecture and the recipe so you understand it deeply enough to lead the build. The full build kit, eval template and governance checklist are in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
  <summary>Check yourself</summary>
**Q.** A vendor offers to build your enterprise assistant by fine-tuning a model on all of your internal documents, no retrieval needed. Why is this almost always the wrong choice?

**A.** Fine-tuning bakes knowledge into the model's weights, which makes it expensive to update (every change is a retraining run), impossible to cite (the model cannot tell you which document a fact came from), and dangerous if any document was wrong or stale (the error is now in the weights). RAG keeps your knowledge external, citable and updatable in minutes. Fine-tuning has a role — usually for style, tone or narrow task specialization — but it is the wrong tool for the "answer questions over our documents" job, and a vendor pitching it as such is either inexperienced or selling you their preferred margin.
</details>

When you have the architecture in your head and the recipe in your hands, the next question is the one your board will ask the moment you walk in. [Pillar IV](/program/pillar-4-governance/overview/) is the answer.
