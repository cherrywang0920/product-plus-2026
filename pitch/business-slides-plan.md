# Stakeholders and value slides plan (semis)

Cherry's part of the 8-minute deck, Oct 23. Team structure: **problem → solution → implementation plan (prototype) → stakeholders → what it means to Aritzia / fashion retail → what it means to SAP.** Cherry owns the last three. Numbers and sources: [research/semis-viability.md](../research/semis-viability.md) and the [brief](one-pager.md) §9–11. Whole-deck storyline: [deck-plan.md](deck-plan.md).

## What this section has to win

| Criterion | Weight | Where it's won here |
|---|---|---|
| Stakeholder Alignment: competing strategic, technical, financial and marketing needs; defend trade-offs; limitations | 20% | Whole section, and **most of the Q&A** |
| Product Solution: "business value relative to costs", "likely adoption" | part of 20% | R1 (Aritzia) and SAP-2 (finance) |
| Implementation Plan: resources, dependencies, risks, milestones, success criteria | 10% | Shared with the implementation section (see coordination note) |

**Key idea: break "what it means to SAP" down by the four roles on the judging panel.** The panel is SAP software development, marketing, finance and product strategy. That's literally what "stakeholder alignment" scores: three SAP slides cover strategy + go-to-market, finance and technology, and each one ends with the trade-off we chose. The full trade-off table is an appendix slide for Q&A.

**Time budget:** ~2:30. 6 slides (K1, R1, R2, SAP-1 to SAP-3); the SAP slides get ~25–30 s each.

---

## Main slides

Headlines state the conclusion.

### K1. "One spoken request serves everyone from the floor to SAP" (20 s)
Stakeholder map in three rings, matching the three parts that follow:
- **Aritzia (pilot customer):** associates (primary user), runners, store managers, allocators/merchandisers, leadership + IT (buyer), and clients (affected, not users).
- **Fashion retail:** other assisted-selling retailers with the same floor, many already on SAP.
- **SAP:** strategy, finance, technology.

One line each on what they want. The full Aritzia table is in the brief §4; slim it down.

### What it means to Aritzia

#### R1. "Atelier pays for itself within the first season" (30 s)
Main number: **~CAD $18–37M a year once forecasts use the voice data**, against ~$1.3M a year in software. Full model: [viability doc §8a](../research/semis-viability.md#8a-what-atelier-is-worth-to-aritzia-revised-oct-23).
- **Priced as part of the upgrade:** $750 per boutique per month when bought with the cloud ERP move (50% bundle discount) [A]; integration runs inside the migration Aritzia must do anyway ($0.75–1.5M once) [A]. This is the low price SAP-1 refers to.
- **Four benefits:** recovered floor sales $2.2–4.4M; in-season transfers $3.7–9.3M; **better forecasts and buying $11.1–22.2M (new)**; runner time $1.1M [C, A].
- **Aritzia's own evidence for the forecasting line:** gross margin fell to 38.5% in FY24 when inventory arrived "earlier and heavier than planned", and recovered to 44.9% by FY26 on lower markdowns [S17, S18]. A 6.4-point swing from inventory decisions; we assume better demand data prevents 5–10% of a swing like that (0.3–0.6 pts) [A].
- **Pays back in ~2–5 months** (year 1 counts only floor and transfer benefits; forecasting needs a season of data) [C]. **~$38–84M net over three years** [C].
- Safety line, small: it breaks even if only ~4–7% of the projected benefit shows up [C].
- Don't headline the multiple ($14–28 per $1): it invites a finance judge to hunt for the flaw.
- What each Aritzia stakeholder gets, one row each: associate (hands free), manager (quiet floor), allocator (unmet demand next morning), leadership (margin + a reason to modernize SAP).
- Visual: per boutique, ~$9k a year in software vs ~$126–257k a year in benefit.

### What it means to fashion retail

#### R2. "Every assisted-selling floor has the same blind spot" (20 s)
The expansion the judges asked for:
- **The industry problem:** inventory distortion costs retailers ~$1.7T a year, 65.6% of it out-of-stocks [S4]; 52% of shoppers left a store without everything they came for [S6]. Sales data can't see that demand anywhere.
- **Same workflow elsewhere:** fashion retailers where associates fetch items for clients lose demand on the floor the same way.
- **Footwear next:** almost every sale means someone fetching a size from the back [A].
- Then other assisted-selling retail (electronics, home improvement) [A].
- Bridge to SAP: many of these retailers already run SAP's fashion system (next slide).

### What it means to SAP: by panel role

#### SAP-1. Strategy + go-to-market: "Atelier turns ECC inaction into cloud migration" (30 s)
Merged with the old marketing slide, since both were about the migration.
- **SAP's problem:** ~17,000 ECC customers still there in 2027 [S36]; 95% say the S/4HANA ROI case is hard [S37]; delaying to 2030 costs only +2 pts [S40]. **The competitor is inaction.**
- **Who:** 300+ companies on SAP's old fashion system AFS, support ending 2027 [S41]; Aritzia on ECC since 2008 [S11].
- **How it's sold:** inside RISE migration deals with those retailers, with Aritzia as the reference customer.
- **Why only SAP:** a demand signal Blue Yonder and RELEX can't see (they learn only from transactions); Joule voice's first retail job [S30]. Story: "the first ERP that hears demand before the sale."
- **Trade-off line:** we price Atelier low to win the migration; the cloud ERP deal is the real revenue.

#### SAP-2. Finance: "US$14–67M a year for SAP, against a small build" (25 s)
- Funnel: 300+ AFS → ~150–200 with stores → 10–20 move sooner → **~$14–34M/yr (low) to $28–67M/yr (base)** [C, A]. Most of it is the cloud ERP move; Atelier itself is priced low (R1).
- Cost: ~$1.5–2M to pilot-ready [A], **plus year-2 scale-up, go-to-market and support (to build: appendix 3).** Show the full number on the slide, not only the pilot cost.
- Payback in year one even in the low case.
- Revenue lines: per-store subscription + Business Data Cloud fees + the cloud ERP move it unlocks.
- **Limitations line:** the biggest assumptions are recovery %, margin lift, price and migration influence; break-even holds even if they're well off.

#### SAP-3. Technology: "Aritzia's floor is where Joule voice learns to work in the real world" (30 s)
Renamed from Engineering: the point isn't only "we can build it", it's what Atelier does for SAP's newest technology.
- **Joule voice is brand new.** Real-time voice with LiveKit was announced at Sapphire in May 2026, is in Early Adopter Care now, GA planned H2 2026, aimed at frontline workers [S30, S47]. SAP needs real frontline deployments to prove it.
- **Voice gets good with real-world data.** Speech recognition trained or adapted on in-domain, noisy audio makes far fewer errors: studies report ~29–35% lower error rates after adapting to the target environment [S48, secondary]. A busy boutique, with music, crowds and fashion vocabulary (style names, sizes, colours), is exactly the kind of setting general models struggle with.
- **So Atelier is a real-world testbed** for early-access Joule voice: new use cases (person-to-person routing, demand extraction), failure modes found on a live floor, and requirements that shape GA.
- **Caveat to say out loud, since an SAP judge will know it:** SAP's policy is that customer data isn't used to train SAP models by default; some services offer optional learning that **the customer chooses to enable** [S49]. So the training benefit needs Aritzia to opt in as an early-adopter / co-innovation partner [A]. Without opt-in, SAP still gets the learnings: performance benchmarks, failure cases, product requirements; and Aritzia's own system still adapts to its own vocabulary (teammate names, style names).
- **What's new to build (our extension):** routing audio between people, demand-event extraction, the demand data product in Business Data Cloud [A]. Everything else exists: Joule voice + LiveKit [S30], Joule Studio on BTP, Business Data Cloud [S33].
- Phases with go/no-go gates (coordinate with the implementation section so they're not presented twice):

| Phase | When [A] | Gate to pass |
|---|---|---|
| 0. Build | Months 0–9, ~8 people | Routing and demand-event extraction work in a noisy test store; **legal and privacy review of always-on listening signed off (Canada + US states)** |
| 1. Pilot | 8 weeks, 3–5 boutiques + control boutiques, on Joule voice early access | Pilot metrics hit target vs control; speech accuracy on the floor measured |
| 2. Aritzia rollout | After Joule voice GA | Forecast / markdown impact on pilot styles |
| 3. Expand | Year 2+ | Migration deals citing Atelier |

- Dependencies: Joule voice GA; Aritzia opting in to optional learning; existing earpieces connecting; whether Business Data Cloud can take ECC data (verify).
- **Trade-off line:** we build on early-access tech, which is riskier than waiting for GA, but it makes Aritzia the frontline proof SAP needs and puts SAP's voice product in the hardest real setting first. The pilot runs on Aritzia's current ECC so it starts fast; the demand intelligence needs S/4HANA + Business Data Cloud [A, verify].

---

## Coordination with the implementation section

**Privacy and legal live in the implementation section (agreed Oct 23).** Always-on listening, "listen for demand, not conversations", employee consent documents at rollout, and the legal review. Cherry's slides only reference it (the data-vs-trust row in the appendix trade-off table).

The implementation rubric (10%) wants resources, dependencies, risks, milestones, adoption and success metrics. If the team's "implementation plan" means mostly the prototype demo, those items could fall through. Agree with Dora / Brady:
- **They cover:** the prototype, plus the pilot plan and pilot success metrics (floor and data metrics).
- **Cherry covers:** the build phases and dependencies (SAP-3, technology), costs (SAP-2), business metrics and SAP metrics.
- **Pilot metrics** (whoever presents them): >70% wearing on shift; >80% of requests routed, not shouted; request-to-item −50%; unmet requests captured per boutique per week; forecast error and markdown rate on pilot styles vs control [A]. **SAP metrics:** migration commitments and ARR from fashion retailers citing Atelier.

## Appendix slides (for Q&A, not presented)

0. **Trade-offs between SAP's teams** (was main slide SAP-5). Pull this up when a judge asks "why not X?":

| Tension | Side A | Side B | Our call | Why |
|---|---|---|---|---|
| Data vs trust | Strategy: more data → better forecasts | Marketing / legal: clients and staff must not feel recorded | **Always on** (captures censored demand), but keep only demand events; discard audio; mic off anytime | Without the "sorry" moments there's no censored demand, but a privacy scandal would end adoption, so the safeguards are part of the product |
| Fast pilot vs migration pull | Engineering: pilot on Aritzia's current ECC | Strategy: Atelier should pull S/4HANA | Routing works on ECC; the demand intelligence needs S/4HANA + Business Data Cloud [A, verify] | Pilot quickly, migrate to get the payoff |
| Price vs adoption | Finance: higher per-store price | Sales: low enough to say yes | $750/store/month bundled with the upgrade [A]; the real revenue is the migration | Atelier is the hook, cloud ERP is the deal |
| Build scope | Engineering: smallest MVP | Retail users: substitutes, ship-to-client | MVP = routing + logging | Data value starts on day one with routing alone |


1. **Assumption sensitivity:** SAP value if only 5 retailers move; Aritzia break-even table.
2. **Risk register:** privacy/legal (Canada + US state recording laws), adoption, noise breaking speech detection, Joule voice slipping, data quality, long enterprise sales cycles. Each with mitigation and owner.
3. **Full cost to SAP through year 2:** build, scale team, go-to-market, support.
4. **Data ownership:** Aritzia owns the data; SAP gets the product and the know-how; benchmarks opt-in only.
5. **Architecture:** earpiece → on-device name detection → LiveKit → Joule Studio / BTP → Business Data Cloud → allocation.
6. **Competitors:** Theatro, Tulip, radios, RFID fitting rooms, Retail Intelligence / Blue Yonder / RELEX.
7. **Named fashion retailers on ECC/AFS** with store counts (the funnel's evidence).

## Prepared answers, one per panel role

| Judge | Likely question | Our answer (short) | Evidence |
|---|---|---|---|
| **Software dev** | "Can you really detect names reliably in a loud store?" | Small, known vocabulary (teammate names, roles); mic near the mouth; tuned in pilot; gate 0 tests it in a noisy store | [A]; S31 is weak, find a better benchmark |
| | "What did SAP actually announce?" | Joule voice with LiveKit for talking *to* Joule [S30]; routing between people is our extension, which is why it's phase 0 | S30 |
| **Software dev** | "Customer data doesn't train SAP models. How does Aritzia help Joule voice improve?" | Opt-in: optional learning is the customer's choice [S49]; Aritzia joins as an early-adopter partner. Without opt-in, SAP still gets benchmarks, failure cases and requirements from a live floor | S49 |
| **Marketing** | "Won't clients feel recorded?" | We keep what was asked for, not what was said: no audio, no transcript, no identity. Mic off anytime; signage; legal review before pilot | Viability doc §2 |
| | "Your brief said client talk is never stored. Why change?" | The judges asked for a bigger problem; censored demand is it, and it lives in the "sorry" moments. We kept the spirit: nothing identifiable is stored | Viability doc §2 |
| **Software dev** | "Is it legal to listen to customers in US stores?" | Implementation owner answers: employee consent documents at rollout, nothing identifiable stored, legal review as gate 0 | Implementation section |
| | "How do you sell it beyond Aritzia?" | Through RISE migration conversations with AFS / ECC fashion retailers; Aritzia as reference; footwear next | S36, S41 |
| **Finance** | "Your numbers rest on assumptions." | Yes, labelled; it breaks even if only ~4–7% of the projected benefit shows up; the forecasting line is anchored to Aritzia's own 6.4-point margin swing; SAP case pays back even in the low scenario | Brief §9; viability doc §8 |
| | "Total cost to SAP?" | Appendix 3 | to build |
| | "Aren't you counting markdowns twice?" | No: transfers fix this season's stock; better forecasts fix next season's buy. Different decisions, different times. Together 0.4–0.85 pts, 6–13% of Aritzia's FY24 swing | Viability doc §8a |
| **Product strategy** | "Why does this need SAP, not Theatro?" | Theatro relays requests but doesn't feed SAP forecasting and allocation; the value is in the data loop | S29, brief §10 |
| | "Doesn't this pull Aritzia off SAP if it fails?" | It's a pilot with gates; failure costs little and nothing is migrated off | |

## To do

- [ ] Agree the implementation split with Dora / Brady (above)
- [ ] Check whether Joule voice reached GA (announced for H2 2026)
- [ ] Verify: can Business Data Cloud take data from ECC, or only S/4HANA? Decides the "fast pilot vs migration pull" answer
- [ ] Build appendix 3: full cost to SAP through year 2
- [ ] Named-retailer list for the SAP-2 funnel
- [ ] Rehearse K1 → SAP-3 to ≤2:30
