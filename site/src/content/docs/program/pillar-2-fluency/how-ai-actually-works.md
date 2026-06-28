---
title: How AI actually works, at the altitude you need
description: The modern AI stack for executives who must lead the build, defend the spend and never get bluffed by a vendor or an engineer.
---

<div class="pl-stake">
**The stake.** A vendor walks into your boardroom with a deck claiming a "proprietary, hallucination-free, fine-tuned LLM." Three of those four words are doing dishonest work. If you cannot tell which, you will sign a seven-figure contract for what is almost certainly a thin wrapper around someone else's API. This lesson gives you the altitude to call it.
</div>

## The model is not the product

Start with the cleanest distinction in the field, the one most executives get wrong on day one. A **model** is a file. It is a multi-gigabyte set of numerical weights produced by a training run. GPT-4, Claude Sonnet, Llama, Gemini — those are models. They do nothing on their own.

An **interface** is what you and your employees actually touch. ChatGPT is an interface. Claude.ai is an interface. Microsoft Copilot is an interface. The interface wraps a model with a chat UI, memory, file handling and safety filters. Most of the user experience your team raves about is the interface, not the model.

An **agent** is a model wired to tools and given a goal. It can read your email, query a database, write to a CRM and loop on its own output until a task is done. Agents are where most enterprise value will be created in the next 24 months and where most enterprise risk will be created in the next 12. When someone pitches you an "AI solution," your first question is which of these three layers they are actually selling. The answer determines who owns the moat, who owns the data and who can be replaced.

## How a model gets made

Modern large language models are produced in two stages, and the difference matters because it controls cost, IP and where you can intervene.

**Pre-training** is the expensive part. A foundation lab takes a trillion-plus tokens of text from the open internet, books and code, and runs an optimization process for months on tens of thousands of GPUs. The output is a base model that has absorbed the statistical structure of language. A single pre-training run for a frontier model costs in the hundreds of millions of dollars. Three or four companies in the world can afford to do this at the frontier. You will not be one of them, and that is fine.

**Post-training** is where the base model is shaped into something usable. This includes supervised fine-tuning on curated examples and reinforcement learning from human feedback, where humans rate model outputs and the model learns to prefer the rated-good ones. Post-training is what turns a chaotic next-token predictor into something that follows instructions, refuses harmful requests and sounds like a colleague. Almost all of the personality and most of the safety behavior of a model lives here.

**Inference** is the cheap-per-call, expensive-at-scale part — the actual moment your user types a question and the model produces an answer. Inference is what you pay for when you use an API. It is where latency and cost meet the user, and it is the only stage most enterprises ever directly touch.

<img class="pl-diagram" src="/diagrams/llm-lifecycle.svg" alt="The LLM lifecycle from pre-training to deployment" />

## Why scale matters and why it does not solve everything

The single most important empirical finding of the last decade in AI is the **scaling laws**: model capability rises predictably as you add more parameters, more data and more compute. Double the inputs in the right ratio and you get a measurable, repeatable improvement in benchmark performance. This is why the frontier labs spend like nation states. They are buying predictable capability gains.

You need to know this for two reasons. First, when a vendor claims a small open-source model "matches GPT-4," they are usually citing one narrow benchmark and ignoring the dozens where it does not. Second, the scaling trend is the reason you cannot wait. Capability that does not exist this quarter will exist next quarter, and your roadmap has to assume the model layer will keep getting better, cheaper and faster underneath you.

Scale does not, however, solve **hallucination**. A language model is fundamentally a probability machine over tokens. It does not have a database of facts; it has a statistical sense of which word usually follows which other words, conditioned on everything in its context window. When it does not know, it does not pause — it produces the most plausible-sounding continuation, which can be confidently wrong. There is no setting that turns this off. There is no model on the market that is "hallucination-free." Anyone who says otherwise is selling you something. The mitigations are real — retrieval, citations, evaluation harnesses, human review — and they are the substance of Pillar III. The cure is not.

<div class="pl-video">
  <iframe src="https://www.youtube.com/embed/zjkBMFhNj_g" title="Intro to Large Language Models — Andrej Karpathy" loading="lazy" allowfullscreen></iframe>
  <p class="pl-video-note">Watch the first 20 minutes for the visual version. Why: Karpathy was a founding member of OpenAI and ran AI at Tesla. This is the cleanest executive-grade explanation of what a model actually is.</p>
</div>

## The context window, the agent and where the value moves

Two more concepts and you have the working vocabulary.

The **context window** is the amount of text the model can hold in mind at once when answering you. It is measured in tokens, roughly three-quarters of a word each. A 200,000-token window holds about 150,000 words — a long book. The context window is where you put the model's working memory: the user's question, the conversation so far, any documents you have retrieved and the instructions you want the model to follow. Larger windows unlock new use cases (entire codebases, long contracts, full case files) and raise per-call cost roughly linearly. A CAIO who understands context windows can reason about why one workflow costs ten cents per query and another costs ten dollars.

An **agent**, as noted above, is a model given tools and a loop. The model decides which tool to call, calls it, reads the result, decides the next step and continues until done. The agent pattern is what turns a chatbot into a colleague. It is also what turns a low-stakes mistake into a high-stakes one — an agent that books the wrong flight, sends the wrong email or runs the wrong SQL query has crossed from text into action. <span class="pl-stat">76%</span> of CEOs in the IBM 2026 study now expect a CAIO on the executive team, and the reason is precisely this transition. Text is interesting; action is consequential, and action needs an owner.

The value, accordingly, is moving up the stack. The model layer is consolidating to a handful of foundation labs. The interface layer is consolidating to the platform giants and a few independents. The durable enterprise value is in the application and agent layer, built on top of those, tuned to your data and your workflows. That is what Pillar III teaches you to ship.

<div class="pl-exercise">
**Exercise.** Pick one specific AI claim a vendor has made to you in the last 90 days. Write down the claim in their words, then write the three questions you would need answered to validate it — at the level of model, interface or agent; pre-training versus post-training versus retrieval; and what they mean by any superlative ("most accurate," "fine-tuned," "proprietary"). If you do not have a vendor claim, use the next press release in your inbox.
</div>

<div class="pl-artifact">
**Your artifact.** This lesson contributes the foundation to your **AI Capability & Vendor Map** — the document a CAIO walks into a strategy session holding. The full template, with worked examples and the evaluation rubric, is in the [paid certificate](/program/the-program/).
</div>

<details class="pl-check">
  <summary>Check yourself</summary>
**Q.** A vendor pitches you a "hallucination-free, fine-tuned model trained on your data." What is your move?

**A.** Push on three things in order. First, "hallucination-free" is not a real product property — ask what their evaluation harness measures and on what test set, then ask for the false-positive rate they accept. Second, "fine-tuned" usually means they have done light post-training on a base model they did not make — ask whose base model, whose data the fine-tune used, and whether your data is sent back into training. Third, ask whether the value they are pitching could be delivered just as well with retrieval-augmented generation over your documents, which is cheaper, safer and does not put your data into anyone's weights.
</details>

You now have the altitude. Next, in [the Build pillar](/program/pillar-3-build/overview/), you will use it to ship something real.
