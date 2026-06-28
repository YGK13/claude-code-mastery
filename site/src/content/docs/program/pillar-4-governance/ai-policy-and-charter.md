---
title: "Writing the AI policy and the governance committee charter"
description: The two foundational documents every CAIO ships in the first 90 days, what real ones contain, and how to keep them short enough to read and specific enough to enforce.
---

<div class="pl-stake">
**The stake.** A regional health system in the US rolled out an AI scribe to clinicians in late 2025 with a 38-page AI policy attached. Six months in, two clinicians had pasted full patient charts into a consumer chatbot to "double check" a diagnosis. The policy forbade this on page 22. Neither clinician had read past page two. The board's after-action finding was not that the policy was wrong. It was that nobody had been asked to read it. This lesson is how to write the two documents that actually run the program — short enough to be read, specific enough to be enforced.
</div>

## Two documents, not a library

The first temptation of a non-technical CAIO is to over-document. A 40-page policy. A 60-page standard. A 90-page playbook. None of it gets read, none of it gets enforced, and the program runs on Slack threads anyway. The CAIO who lands the seat and keeps it ships two short, specific, signed documents in the first 90 days: an AI Policy and a Governance Committee Charter. Everything else is operational appendix that hangs off those two.

The test of both documents is whether a senior leader can read them in one sitting and act on them the same week. If the answer is no, you have policy theater, which is worse than no policy at all because it gives the board false comfort.

## What a real AI policy contains

A real AI policy is four to eight pages. It is signed by the CEO and the general counsel. It is referenced in the employee handbook. It covers six things, in this order.

**Scope and definitions.** Who the policy applies to (all employees, contractors, vendors). What counts as an AI system for the purposes of the policy (generative AI, predictive models, agentic systems, AI features inside SaaS tools you already use). One paragraph. No academic definitions. Plain English.

**Allowed uses.** A short list, by employee role or function, of what AI use is encouraged. "Drafting first versions of internal documents in approved tools." "Summarizing meetings in approved transcription tools." "Generating code with approved assistants." The signal here is positive — we want you using AI in these ways. A policy that only forbids reads as adversarial and trains people to route around you.

**Restricted and prohibited uses.** The hard line. No customer data, no patient data, no employee PII, no source code with proprietary IP, no contracts under negotiation in consumer or non-approved tools. No use of AI to make a final hiring, firing, lending, clinical or legal decision without documented human review. No deepfakes or synthetic media of real people. Each restriction in one line, plain English, no jargon.

**Approved tools and the data classes they accept.** A two-column table. Tool on the left, data class permitted on the right. Public data goes anywhere. Internal data goes only into enterprise-tenant tools. Confidential data goes only into a short list of tools with documented DPAs and residency controls. Regulated data (PHI, financial, regulated employee data) goes only into tools that have been through full governance review and named in this table. If a tool is not in the table, the answer is no.

**Approval and review process.** One paragraph. How an employee requests approval for a new use case or a new tool — the intake form, where it goes, the SLA, who decides. The detail lives in the operational runbook. The policy points to it.

**Human review, training and disclosure.** Three short sections. Where human-in-the-loop review is mandatory (any decision that materially affects a person — hire, fire, deny, diagnose, sentence). What training is required and at what cadence (role-based AI literacy, with an annual refresh and a completion record kept by HR — your Article 4 evidence). When AI use must be disclosed (to customers when AI generates content they receive, to colleagues when AI is used to evaluate them, to regulators when required by sector law).

That is the whole policy. Six sections, four to eight pages, plain English. Reviewed annually or after any material incident. Versioned. Signed.

## What separates a real policy from policy theater

Real policies are referenced in working life. The Slack thread asking "can I use Copilot for this" gets answered with a link to the table. Engineers cite the data-class rules in pull request reviews. HR points new hires at the policy on day one. Theater policies sit in a SharePoint folder no one opens. Real policies are enforced. The review process actually gates new tools, and unapproved deployments get shut off. Theater policies are enforced selectively against the politically weak. Real policies get updated. They have a version date in the last six months. Theater policies have a version date older than the current head of legal.

## The governance committee charter

The committee is what makes the policy a system instead of a document. The charter is one to two pages and answers six questions.

**Mandate.** Why the committee exists, in one paragraph. It approves high-risk AI use cases, owns the risk register, reviews incidents, recommends policy updates, and reports to the audit committee or board AI subcommittee on a defined cadence.

**Membership.** The CAIO chairs. Permanent seats: general counsel, CISO, CHRO, CFO, head of data. Rotating seat: a business-line leader on a quarterly rotation. Optional observer: internal audit. Quorum is the chair plus three permanent members. No exceptions for convenience — quorum is the discipline that prevents the committee from becoming a one-person show.

**Authority.** What the committee can decide on its own (approve, reject or conditionally approve any AI use case within the policy; recommend policy changes; commission audits). What it must escalate (use cases that exceed the policy; incidents above defined severity; budget commitments above a threshold).

**Cadence.** Monthly standing meeting, 60 minutes. Emergency convening within 48 hours of a Sev-1 incident. Agenda is published 48 hours ahead. Minutes are kept and circulated within five business days. Decisions are logged in the register.

**Intake process.** How a use case reaches the committee. A short intake form (use case, business owner, vendor, data classes, users, intended outputs, risk tier per a defined rubric). Triage by the CAIO's office. Low-risk auto-approved against the policy. Medium-risk reviewed on the next standing agenda. High-risk reviewed with a full packet — model card, data flow diagram, human-oversight design, evaluation plan, exit plan.

**Relationship to existing risk committees.** This is the part most CAIOs forget. The committee does not replace enterprise risk, model risk, security review or vendor risk. It coordinates with them. The charter should explicitly name the handoff: model risk is escalated to the CRO's model risk function for sign-off above a threshold; security review is delegated to the CISO's third-party risk team; legal review on contracts goes to the GC's office. The AI governance committee is a node in the existing risk fabric, not a parallel one. Parallel structures get killed by audit committees within a year.

<!-- diagram: a one-page "page one" view. Left side: the AI Policy spine — six sections with one line each. Right side: the Governance Committee Charter spine — six answers with one line each. A single arrow connects "Approval and review process" on the left to "Intake process" on the right, showing the policy points to the committee and the committee enforces the policy. -->

## Length is a design decision

Short is harder than long. Stripe's published policies, Anthropic's usage policies, the better bank AI policies that have leaked into the wild — all read short and specific because somebody fought to cut every line. The right test on every line is: does this constrain behavior in a way a reasonable employee can comply with on a Tuesday afternoon. If the answer is no, the line is decoration. Cut it.

<div class="pl-exercise">
**Exercise.** Open whatever AI policy your organization has today, even if it is a one-pager. Time how long it takes you to read. Mark every line that does not change what an employee does on Tuesday. Then write the six-section table of contents above on a fresh page. The delta between the two is your rewrite scope. Do the same for the committee charter using the six-question structure.
</div>

<div class="pl-artifact">
**Your artifact.** **AI Policy v1** and **Governance Committee Charter v1**, both fillable templates in the structures above, with worked examples for a SaaS company, a regulated financial services firm and a healthcare provider. Both live in your **AI Governance Pack** in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** Your general counsel returns a markup of your draft policy that doubles the length and adds extensive defined-term sections. How do you handle it.

**A.** You thank them, accept the substantive legal additions, and push back on length. The agreement is that the GC owns the legally enforceable backing document — call it the AI Standard — and you jointly own the four-to-eight-page Policy that employees actually read. The Standard sits in legal's library. The Policy sits in the handbook. Both signed, neither bloated.
</details>

The policy and the charter run the program. The four words your board will use carelessly and you must use precisely come next. [Bias, fairness, interpretability, responsible AI](/program/pillar-4-governance/bias-fairness-interpretability/).
