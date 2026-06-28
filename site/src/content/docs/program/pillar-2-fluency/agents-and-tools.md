---
title: "Agents and tools: what they are, what they can and can't do"
description: The agent loop, function calling and MCP at executive altitude — and the discipline required to deploy systems that take action on your behalf.
---

<div class="pl-stake">
**The stake.** An "agentic" pilot in your finance org runs unattended over a weekend, generates 4,000 vendor emails, three of them factually wrong and one of them in violation of a contract clause nobody flagged. The CFO is on the phone Monday morning asking who approved it. The honest answer is that nobody did — the system was given a goal and a set of tools and ran. <span class="pl-stat">80%+</span> of enterprise AI projects never reach production per RAND, and the ones that do reach production most dangerously are agentic systems deployed without the controls this lesson teaches you to demand.
</div>

## The shift from assistant to agent

An **assistant** answers. You ask, it responds. You read the response, decide what to do and do it. The model is a thinking tool. Accountability ends with you.

An **agent** acts. You give it a goal, it decides which tools to call, calls them, reads the results, decides the next step and loops until the goal is met or the budget is spent. The model is now a colleague with hands. Accountability is shared — between you, the team that built the agent and the system that lets it touch live infrastructure.

That distinction is the reason agents have a different governance posture, evaluation regime and failure mode from chatbots. A bad chatbot wastes a user's time. A bad agent sends the wrong email, books the wrong flight, runs the wrong SQL query or pays the wrong invoice. The cost surface is asymmetric and the controls have to be designed for the downside, not the average case.

## The agent loop, honestly

Strip the marketing away and a modern agent is a loop with four steps. **Perceive** — read the current state of the world, including the original goal, any tool outputs so far and any new inputs. **Reason** — using the model, decide what the next action should be. **Act** — call a tool, send a message, write to a database. **Observe** — read what the tool returned. Then loop. The agent halts when it decides the goal is met, hits a guardrail (budget, time, action count) or a human intervenes.

Two things matter for an executive. The loop runs as long as it decides to run. A poorly bounded agent can spend hours and dollars on a task that should have taken ten seconds, or worse, spiral into a degenerate cycle. Hard limits — on calls, cost, time and tool scope — are not optional. And every step is a decision the model is making with the information it has at that moment, which means an early bad tool call can poison every subsequent step. The system has to be observable end to end or you will not be able to reconstruct what happened when something goes wrong.

<img class="pl-diagram" src="/diagrams/agent-loop.svg" alt="The agent loop: perceive, reason, act, observe" />

## Tools, function calling and MCP

A **tool** is anything the model can invoke to read from the world or change it. A search API is a tool. A database query is a tool. Sending an email is a tool. Charging a credit card is a tool. The toolset you give an agent is the surface area of its capabilities and its risk simultaneously.

The dominant mechanism for letting models call tools is **function calling**. The application gives the model a structured description of each available tool — what it does, what arguments it takes, what it returns — and the model decides when to call which, with which arguments. The application runs the call and feeds the result back. The model decides what to do; the application controls what is allowed. Permissions, rate limits, audit logs and safety checks all live in the application layer, where you control them.

**MCP** — the Model Context Protocol — is the emerging open standard for how tools and data sources expose themselves to models. Before MCP, every vendor wired every tool into every model bespoke. With MCP, a tool is implemented once and any compliant model or agent can use it. The executive implication is real even though the term sounds technical. Standardization at the tool layer is what will let your CAIO function build a portable agent stack — tools that work across model vendors, agents that can be re-pointed at a new model when the leader changes. Insist that your vendors and your internal builds adopt the open standards. The portability is the leverage.

## What reliable agentic systems require

A production-grade agent is not a model with a clever prompt. It is a system with a model in it and five non-negotiable controls around it.

**Scoped permissions.** Every tool an agent can call is wrapped in a permission layer that enforces who, what and when. An agent that can read the CRM should not by default be able to write to the CRM. An agent that can draft emails should not by default be able to send them. Least privilege, the principle your security team has applied to humans for two decades, applied now to a non-human actor.

**Observability.** Every step the agent takes — every perception, every decision, every tool call, every observation — is logged in a way that lets you reconstruct exactly what happened, in order, after the fact. When something goes wrong, "what did the agent do at 2:47am" must have a precise answer in under five minutes.

**Kill switches and human-in-the-loop.** Some actions need a human signature before they happen. Some agents need to be stoppable in one click. The system has to express both. The threshold for human approval — by dollar amount, recipient, action type, confidence score — is a policy decision you, your CFO and your General Counsel make together.

**Evaluation.** Agents need evaluation beyond what a single-turn chatbot needs, because failures are sequential. A 95% per-step success rate over a 20-step task is a 36% end-to-end success rate. The evaluation harness from the next lesson has to measure not just whether each step is right but whether the loop converges, terminates and stays within budget.

**Recovery.** When the agent fails — and it will — the system has to fail safely. Transactional boundaries on consequential actions, rollback paths on writes, escalation paths to humans and clear ownership for cleanup. "The AI did it" is not an incident response posture your board will accept.

## The realistic frontier circa 2026

Agents work reliably today for well-scoped, well-instrumented, repetitive tasks with clear success criteria — customer-support triage, inbox processing, code review on bounded codebases, data extraction from structured documents, internal research with citation. They work less reliably for open-ended, long-horizon, multi-stakeholder tasks where the goal itself is fuzzy — "run the marketing campaign," "manage the vendor relationship," "decide our pricing." For those, the agent is a useful assistant and a dangerous autonomous actor.

The frontier is moving fast in two directions at once. Reliability is improving as labs invest in reasoning and tool-use post-training. The tool ecosystem is exploding as MCP and similar standards make it cheap to wire new capabilities in. A CAIO who deploys agents at the 2026 frontier with 2024 governance will produce the incident this lesson opened with.

<div class="pl-exercise">
**Exercise.** Identify one workflow in your business that is currently performed by a person, that is high-volume, low-judgment and well-instrumented and that an agent could plausibly take over in the next twelve months. Write down the tool list the agent would need (read scopes and write scopes separately), the three permission gates a human must sit behind and the single failure mode that would force you to shut it off. If you cannot write the kill-switch condition, the workflow is not ready.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the agent-layer column of your **AI Capability & Vendor Map** — the page where you record, for each agentic workload, the loop scope, the tool list, the permission model, the observability story and the kill-switch policy. The full template, with the production-readiness checklist, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** A vendor demos an "autonomous research agent" that can browse the web, summarize what it finds and email the team. Your head of strategy wants to deploy it Monday. What do you require before you sign?

**A.** Three things, in writing. A clear scope of write actions — the agent can browse and summarize, but every outbound email needs human approval until you have evidence the quality is consistent. An observability story that lets your team see every URL the agent visited and every claim it made, mapped to its source. A kill-switch and a budget cap on tool calls and total cost per run. None of these is a research question; they are configuration choices the vendor either supports or does not.
</details>

You can now reason about systems that act, not just systems that answer. Next, in [evaluation and hallucination](/program/pillar-2-fluency/evaluation-and-hallucination/), you will see how to know whether any of it is actually working.
