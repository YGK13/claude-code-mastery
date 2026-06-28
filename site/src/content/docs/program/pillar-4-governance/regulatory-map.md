---
title: "The regulatory map: EU AI Act, NIST AI RMF, ISO 42001"
description: An executive orientation to the three frameworks every CAIO must hold in working memory, and the operational map that connects them to your AI inventory.
---

<div class="pl-stake">
**The stake.** In August 2026, EU AI Act Article 4 goes live and every employee touching an in-scope AI system must be demonstrably literate. A French insurer was fined under interim guidance for failing to evidence training before the underwriting model went into production. Their CAIO was a former actuary who could explain the model in fine detail and could not explain the framework. The board read both findings the same way: the program was not actually run. This lesson gives you the working map across the three frameworks every board, auditor and regulator will reference, and the coverage matrix that proves your program is.
</div>

## Three frameworks, three different things

Most non-technical CAIOs walk into the first board meeting thinking the EU AI Act, NIST AI RMF and ISO 42001 are competing standards and they need to pick one. They are not competing. They do three different jobs, and a mature governance program touches all three. The CAIO who can explain that in 90 seconds wins the room. The CAIO who confuses them loses it.

The EU AI Act is a law. It tells you what you may not do, what you must do and what happens if you do not do it. NIST AI RMF is a voluntary management framework. It tells you how to think about and operate the program. ISO 42001 is a certifiable management-system standard. It tells you what your program must contain to be audited and certified by a third party. Law, frame, certification. Memorize that sequence.

## The EU AI Act in executive depth

The Act classifies every AI system into one of four risk tiers and assigns obligations accordingly.

**Unacceptable risk** — banned outright. Social scoring by governments, real-time biometric surveillance in public spaces with narrow exceptions, manipulation of vulnerable people, predictive policing based on profiling. If a vendor pitches you anything that smells like this, the answer is no and the conversation ends.

**High risk** — heavily regulated. AI used in critical infrastructure, education and vocational training, employment and worker management, essential private and public services (including credit scoring), law enforcement, migration, justice. High-risk systems require a quality management system, technical documentation, logging, human oversight, accuracy and robustness testing, conformity assessment and registration in the EU database. This is where most enterprise CAIOs will spend their compliance budget.

**Limited risk** — transparency obligations. Chatbots must disclose they are AI. Synthetic media must be labeled. Emotion recognition and biometric categorization must be disclosed to the affected person.

**Minimal risk** — largely unregulated. Spam filters, AI in video games. Free to deploy.

Article 4 sits on top of all of this. It requires providers and deployers to ensure AI literacy among staff "to the best extent" given the context. There is no certification, no specific curriculum, no hour requirement. What there is, in every enforcement action that has surfaced under the interim guidance, is a question: show us the program. Role-mapped training, completion records, refresh cadence, evidence of comprehension. The CAIOs being asked to leave their seats in 2026 are the ones who confused "we sent a deck around" with "we have a program."

Fines are GDPR-style: up to seven percent of global annual turnover or 35 million euros for the most serious violations, whichever is higher. The Act has extraterritorial reach. If you place an AI system on the EU market or its output is used in the EU, you are in scope regardless of where the company is headquartered.

## NIST AI RMF as the operating frame

NIST AI RMF is organized around four functions: Govern, Map, Measure, Manage. Govern is the program — the policies, the roles, the accountabilities, the culture. Map is the inventory and context — what systems do you have, what do they do, what is the intended use, who is affected. Measure is the testing — performance, bias, robustness, security. Manage is the ongoing operation — monitoring, incident response, decommissioning.

The reason most US enterprise programs start with NIST is that it is principles-based and sector-agnostic. It does not tell you what to do; it tells you what to ask. That is the right altitude for a CAIO. You direct the conversation, you do not become the auditor. NIST also pairs cleanly with the AI RMF Generative AI Profile, which extends the framework to LLM-specific risks. Read both at the executive-summary level. Direct your AI risk lead to read both in full.

## ISO 42001 as the auditable spine

ISO 42001 is the first international management-system standard for AI. It is built on the same annex structure as ISO 27001 (information security) and ISO 9001 (quality), which means if your organization already runs an ISO-certified management system, your auditors and your CISO will recognize the bones of 42001 immediately. The standard requires an AI management system with documented policies, defined roles, impact assessments, lifecycle controls, supplier management and continual improvement. It is certifiable, meaning an accredited third party can audit your program and issue a certificate.

In 2026, ISO 42001 certification is becoming a procurement requirement in regulated industries. Large financial services buyers are starting to ask vendors for it. Healthcare buyers are not far behind. If you sell AI-enabled software into regulated buyers, ISO 42001 is moving from nice-to-have to entry ticket. <span class="pl-stat">76%</span> of CEOs now have a CAIO in seat per the IBM 2026 study; a meaningful and growing share of those CAIOs are being measured on whether they shipped the certification.

## Sectoral overlays

Financial services adds SR 11-7 model risk management (US), the PRA's SS1/23 (UK), and the emerging EBA guidance on AI in credit. Healthcare adds FDA guidance on AI/ML-enabled medical devices, HIPAA on data, and emerging state-level patient-notification rules. Public sector adds OMB M-24-10 in the US and the Council of Europe's AI Framework Convention. The CAIO's job is not to memorize each overlay; it is to know which ones bind your company and to have a named person responsible for each.

<img class="pl-diagram" src="/diagrams/eu-ai-act-tiers.svg" alt="EU AI Act risk tiers" />

## What you know vs. what you delegate

You know the four EU risk tiers and which of your systems sit where. You know the NIST four-function model well enough to use it as the agenda for your governance committee. You know whether your company is pursuing ISO 42001 and what the certification path looks like. You know which sectoral regulators bind you. You do not draft the conformity assessment, you do not write the technical documentation, you do not run the conformance audit. You direct the people who do. That is the line.

<div class="pl-exercise">
**Exercise.** Take your current AI inventory — even if it is a five-row list scribbled on a napkin. For each system, write down: which EU risk tier it falls into, which NIST functions you have evidence for, whether it would survive an ISO 42001 spot check today, and which sectoral overlay applies. The gaps are your 90-day roadmap.
</div>

<div class="pl-artifact">
**Your artifact.** The **Regulatory Coverage Matrix** — one row per AI system, columns for EU AI Act tier, NIST function coverage (G/M/M/M), ISO 42001 readiness and sectoral overlay, with an owner and a next-review date per row. The full template, with worked examples for a SaaS company, a regional bank and a hospital network, lives in your **AI Governance Pack** in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
<summary>Check yourself</summary>
**Q.** Your general counsel asks "do we need ISO 42001 certification or is NIST AI RMF enough." How do you answer in under a minute.

**A.** They are not substitutes. NIST is how you run the program day to day. ISO 42001 is whether an external auditor can certify the program. The right question is whether your buyers or regulators are asking for the certificate yet. If yes, we pursue it; if not yet, we operate to NIST and pre-build the artifacts so 42001 is a 90-day sprint when the demand lands.
</details>

The map is the orientation. The risks the map covers are the next four lessons — model, vendor, data and IP. [Start with model and vendor risk](/program/pillar-4-governance/model-vendor-data-risk/).
