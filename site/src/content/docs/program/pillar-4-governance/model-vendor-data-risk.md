---
title: "Model, vendor and data risk; IP and privacy"
description: The four risk surfaces every CAIO owns, the questions you ask vendors, the data flows you must be able to draw and the contracting basics that protect the company.
---

<div class="pl-stake">
**The stake.** In early 2026, a midmarket law firm's contract-review assistant began returning fragments of another firm's privileged communications. The cause was traced to a fine-tuning step at the vendor, where customer data had been pooled across tenants. The vendor settled. The buying firm's CAIO did not survive the year. The board's finding was simple: the contract did not prohibit cross-tenant training and no one on the buyer's side had asked. This lesson is the four risk surfaces every CAIO owns and the questions that would have killed that deployment before it shipped.
</div>

## Four surfaces, one owner

A CAIO who only watches the model misses three quarters of the exposure. The four surfaces are model, vendor, data and IP. They overlap; an incident usually lights up two or three of them at once. But you have to be able to discuss each on its own terms with the board, the general counsel and the CISO, because each has its own controls, its own contracts and its own failure modes.

## Model risk

Model risk is what the model itself can do wrong. It comes in five flavors worth naming.

**Capability gaps.** The model is asked to do something it cannot reliably do. A summarization model used as a reasoning engine. A classifier deployed outside its training distribution. The mitigation is task-fit testing before deployment and a documented intended-use statement that scopes what the system is and is not for.

**Hallucination.** The model generates plausible content that is factually wrong. The mitigation is retrieval grounding for factual tasks, evaluation harnesses that test for it, and human review for any output that becomes a record.

**Drift.** Performance degrades over time because the world changes, the data changes or the model is updated by the vendor without notice. The mitigation is monitoring against a held-out evaluation set and a re-evaluation cadence written into the operating procedure.

**Jailbreak and prompt injection.** A user, or content the model ingests, manipulates it into bypassing safety controls. The mitigation is input sanitization, output filtering, least-privilege tool access and red-team testing before any external-facing deployment.

**Misuse.** The model is used by an internal employee for a purpose the policy forbids — pasting customer data into a public chatbot, generating a synthetic image of a real person, drafting a contract the company never sees. The mitigation is policy, training and monitoring, not engineering.

You do not run the evaluation harness. You require that one exists, you read the dashboard monthly and you ask the question your evaluator hopes you will not: what does this test not cover.

## Vendor risk

Vendor risk is everything that can go wrong because someone other than you is operating part of the stack. There are four sub-questions.

**Dependency and concentration.** How many of your AI workflows depend on a single model provider. If OpenAI raises prices 40 percent, or Anthropic deprecates a model, or a hyperscaler has a regional outage, what breaks. The mitigation is multi-model abstraction in the application layer and a documented contingency for each top-tier workflow.

**Lock-in.** Are your prompts, evaluation sets, fine-tuning data and integrations portable. Can you switch providers in 90 days if you had to. If the answer is no, you have a hidden contractual exposure that does not show up until renewal.

**Security.** SOC 2 Type II is table stakes. ISO 27001 is increasingly expected. For high-risk use cases you want a recent penetration test report, a documented incident response process and named sub-processors. The CISO runs this review. You read the executive summary and ask one question: where would we be in the news if this vendor were breached tomorrow.

**Sub-processors.** Every meaningful AI vendor uses other vendors — a hyperscaler for compute, a database provider, sometimes another model provider behind the scenes. The contract should list them, require notification of changes and bind them to the same data protections as the primary vendor.

## Data risk

Data risk is what can go wrong because of what flows in and out. Four dimensions matter.

**Privacy.** Personal data going into a model is processing under GDPR, CCPA and similar regimes. You need a lawful basis, a data processing agreement with the vendor, and an answer to whether the data is used to train the underlying model. For most enterprise contracts the answer must be no, and that no must be in writing.

**Residency.** Where is the data when the model processes it. EU data subject to GDPR generally needs to stay in jurisdiction or move under an approved mechanism. Healthcare data has its own residency expectations. The vendor's regional deployment options are a contract-negotiation lever, not a technical detail.

**Leakage.** Information flows out of the boundary it was supposed to stay in. The most common cause is employees pasting sensitive content into consumer-grade tools. The second is poorly scoped retrieval, where a model is given access to a corpus it should not have. The mitigation is enterprise tooling with logging, DLP coverage and access controls inherited from the source systems.

**Lineage.** Can you answer, for any output a model produced, what data went into producing it. For regulated decisions, this question is not optional. For unregulated ones, it becomes mandatory the day something goes wrong.

## IP risk

IP risk is the youngest and least settled surface. Three questions.

**Training-data provenance.** Was the model trained on data the vendor had the right to use. The major foundation-model providers are in active litigation on this. Your contract should include an IP indemnity that covers you for outputs generated through ordinary use.

**Output ownership.** Who owns what the model generates. In the US, purely AI-generated work is not copyrightable, which matters for marketing assets, code and content. Your contracts and your internal policy should be explicit about what gets human authorship in the loop.

**Customer-data contamination.** When you fine-tune or use long-context features, does your data become part of the vendor's product. The default answer in good enterprise contracts is no, and the contract must say so explicitly. The law firm in the opening paragraph learned this the hard way.

## The data flow diagram you must be able to draw

Every CAIO should be able to take a whiteboard marker and, for any high-risk AI system the company operates, draw the flow: source system, data classification, transport, model provider, region, retention, output destination, who can see the output. Not a polished diagram — a working sketch. If you cannot draw it, you do not understand the system well enough to govern it.

<!-- diagram: a horizontal data-flow sketch — Source System → DLP/Classification Gate → Application Layer → Model Provider (region tagged) → Output Store → Human Reviewer. Above each arrow: the data class. Below each box: the control owner. The CAIO sits to the side, marked as the accountable owner. -->

## Contracting basics

You are not the lawyer. You direct the lawyer. The clauses you must know exist and ask for: data-use restriction (no training on customer data), sub-processor list and notification, regional residency, IP indemnity, security and incident notification timelines, audit rights, deletion on termination, model-change notification, evaluation and benchmark sharing, and exit assistance. If a vendor balks at three or more of these, it is a small vendor selling to a buyer that does not yet know what to ask. Be the buyer that knows.

<div class="pl-exercise">
**Exercise.** Pick the single highest-risk AI vendor your organization uses today. Walk the four surfaces in order — model, vendor, data, IP — and write one paragraph per surface naming the top exposure and the mitigation you have or need. If you find more than one surface with no mitigation, that vendor is your next governance committee agenda item.
</div>

<div class="pl-artifact">
**Your artifact.** The **Model & Vendor Risk Register template** — one row per system, columns for each of the four surfaces with severity, mitigation, owner and review date, plus a one-page Vendor Question Set you hand to procurement before any new AI contract. The full template is in the certificate and lives in your **AI Governance Pack** in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** Your CISO escalates that a business unit is piloting an AI vendor that has not signed a DPA and whose contract is silent on training-data use. The business unit wants to ship in two weeks. What do you do.

**A.** You stop the deployment, not the pilot. The pilot continues with synthetic or non-sensitive data while procurement, legal and the vendor close the DPA and the data-use clause. If the vendor will not sign, you reject and offer the business unit two pre-approved alternatives. The lesson is not "we said no." The lesson is "we have a path."
</details>

The risk surfaces are the territory. The policy and the charter are how you enforce coverage. [Build them next](/program/pillar-4-governance/ai-policy-and-charter/).
