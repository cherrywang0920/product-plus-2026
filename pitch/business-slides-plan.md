# Stakeholders and value slides plan (semis)

Cherry's part of the 8-minute deck, Oct 23. Team structure: **problem → solution → implementation plan (prototype) → stakeholders → what it means to Aritzia / fashion retail → what it means to SAP.** Cherry owns the last three. Numbers and sources: [research/semis-viability.md](../research/semis-viability.md) and the [brief](one-pager.md) §9–11. Whole-deck storyline: [deck-plan.md](deck-plan.md).

## What this section has to win

| Criterion | Weight | Where it's won here |
|---|---|---|
| Stakeholder Alignment: competing strategic, technical, financial and marketing needs; defend trade-offs; limitations | 20% | Whole section, and **most of the Q&A** |
| Product Solution: "business value relative to costs", "likely adoption" | part of 20% | Aritzia and SAP finance slides |
| Implementation Plan: resources, dependencies, risks, milestones, success criteria | 10% | Shared with the implementation section (see coordination note) |

**Key idea: break "what it means to SAP" down by the four roles on the judging panel.** The panel is SAP software development, marketing, finance and product strategy. That's literally what "stakeholder alignment" scores: one slide per role answers each judge's own priority, then a trade-offs slide shows where they compete.

**Time budget:** ~3 min. 7 slides; the SAP slides get ~25 s each.

---

## Main slides

Headlines state the conclusion.

### K1. "One spoken request serves everyone from the floor to SAP" (20 s)
Stakeholder map in two rings, which also sets up the next two parts:
- **Aritzia:** associates (primary user), runners, store managers, allocators/merchandisers, leadership + IT (buyer), and clients (affected, not users).
- **SAP:** strategy, finance, engineering, marketing/sales.

One line each on what they want. The full table is in the brief §4; slim it down.

### What it means to Aritzia / fashion retail

#### A1. "Aritzia earns back its cost in year one, even at the low end" (30 s)
- Benefit ~CAD $7–15M/yr (recovered sales, fewer markdowns, runner time) vs ~$2.6M/yr ongoing, mostly software; year-1 total ~$4.3–5.8M [C, A].
- **Break-even: +0.07 points of gross margin.** Lead with this.
- What each Aritzia stakeholder gets, one row each: associate (hands free), manager (quiet floor), allocator (unmet demand next morning), leadership (margin + a reason to modernize SAP).
- Visual: cost vs benefit bar with the break-even line.

#### A2. "Every assisted-selling floor has the same blind spot" (20 s)
The expansion the judges asked for:
- Fashion retailers where associates fetch items for clients: same workflow, same demand lost on the floor.
- **Footwear next:** almost every sale means someone fetching a size from the back.
- Then other assisted-selling retail (electronics, home improvement) [A].
- Bridge to SAP: many of these retailers already run SAP's fashion system (next slide).

### What it means to SAP: one slide per panel role

#### SAP-1. Strategy: "Atelier turns ECC inaction into cloud migration" (25 s)
- SAP's problem: ~17,000 ECC customers still there in 2027 [S36]; 95% say the S/4HANA ROI case is hard [S37]; delaying to 2030 costs only +2 pts [S40]. **The competitor is inaction.**
- Fashion: 300+ companies on SAP's old fashion system AFS, support ending 2027 [S41]; Aritzia on ECC since 2008 [S11].
- Differentiation: a demand signal Blue Yonder and RELEX can't see (they learn only from transactions); Joule voice's first retail job [S30].

#### SAP-2. Finance: "US$15–100M a year for SAP, against a small build" (25 s)
- Funnel: 300+ AFS → ~150–200 with stores → 10–20 move sooner → **~$15–50M/yr (low) to $30–100M/yr (base)** [C, A].
- Cost: ~$1.5–2M to pilot-ready [A], **plus year-2 scale-up, go-to-market and support (to build: appendix 3).** Show the full number on the slide, not only the pilot cost.
- Payback in year one even in the low case.
- Revenue lines: per-store subscription + Business Data Cloud fees + the cloud ERP move it unlocks.

#### SAP-3. Engineering: "Built on what SAP already has" (25 s)
- Existing: Joule voice + LiveKit [S30], Joule Studio on BTP, Business Data Cloud [S33].
- **New (our extension):** routing audio between people, name detection on the earpiece, the demand data product [A]. That's why it's the build phase.
- Phases with go/no-go gates (coordinate with the implementation section so they're not presented twice):

| Phase | When [A] | Gate to pass |
|---|---|---|
| 0. Build | Months 0–9, ~8 people | Routing and demand-event extraction work in a noisy test store; **legal and privacy review of always-on listening signed off (Canada + US states)** |
| 1. Pilot | 8 weeks, 3–5 boutiques + control boutiques | Pilot metrics hit target vs control |
| 2. Aritzia rollout | After Joule voice GA | Forecast / markdown impact on pilot styles |
| 3. Expand | Year 2+ | Migration deals citing Atelier |

- Dependencies: Joule voice GA; existing earpieces connecting; whether Business Data Cloud can take ECC data (verify).

#### SAP-4. Marketing / sales: "Sold through migration deals, proven at Aritzia" (25 s)
- **How it's sold:** offered inside RISE migration conversations with AFS / ECC fashion retailers, not as a standalone product.
- **Proof:** Aritzia as the reference customer; pilot results as the case study.
- **Story SAP can tell:** "the first ERP that hears demand before the sale" plus Joule voice's frontline launch.
- **Brand protection:** one line only, since privacy and legal are covered in the implementation section: "Atelier listens for demand, not conversations", and that's a message SAP can sell on.

#### SAP-5. "Where SAP's teams pull in different directions, and what we chose" (20 s)

| Tension | Side A | Side B | Our call | Why |
|---|---|---|---|---|
| Data vs trust | Strategy: more data → better forecasts | Marketing / legal: clients and staff must not feel recorded | **Always on** (captures censored demand), but keep only anonymous demand events; discard audio; mic off anytime; signage | Without the "sorry" moments there's no censored demand, but a privacy scandal would end adoption, so the safeguards are part of the product |
| Fast pilot vs migration pull | Engineering: pilot on Aritzia's current ECC | Strategy: Atelier should pull S/4HANA | Routing works on ECC; the demand intelligence needs S/4HANA + Business Data Cloud [A, verify] | Pilot quickly, migrate to get the payoff |
| Price vs adoption | Finance: higher per-store price | Sales: low enough to say yes | $1,500/store/month [A]; the real revenue is the migration | Atelier is the hook, cloud ERP is the deal |
| Build scope | Engineering: smallest MVP | Retail users: substitutes, ship-to-client | MVP = routing + logging | Data value starts on day one with routing alone |

End with the limitations stated up front: *the biggest assumptions are recovery %, margin lift, price and migration influence; break-even holds even if they're well off.*

---

## Coordination with the implementation section

**Privacy and legal live in the implementation section (agreed Oct 23).** Always-on listening, "listen for demand, not conversations", employee consent documents at rollout, and the legal review. Cherry's slides only reference it: one row in SAP-5, one line in SAP-4.

The implementation rubric (10%) wants resources, dependencies, risks, milestones, adoption and success metrics. If the team's "implementation plan" means mostly the prototype demo, those items could fall through. Agree with Dora / Brady:
- **They cover:** the prototype, plus the pilot plan and pilot success metrics (floor and data metrics).
- **Cherry covers:** the build phases and dependencies (SAP-3), costs (SAP-2), business metrics and SAP metrics.
- **Pilot metrics** (whoever presents them): >70% wearing on shift; >80% of requests routed, not shouted; request-to-item −50%; unmet requests captured per boutique per week; forecast error and markdown rate on pilot styles vs control [A]. **SAP metrics:** migration commitments and ARR from fashion retailers citing Atelier.

## Appendix slides (for Q&A, not presented)

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
| **Marketing** | "Won't clients feel recorded?" | We keep what was asked for, not what was said: no audio, no transcript, no identity. Mic off anytime; signage; legal review before pilot | Viability doc §2 |
| | "Your brief said client talk is never stored. Why change?" | The judges asked for a bigger problem; censored demand is it, and it lives in the "sorry" moments. We kept the spirit: nothing identifiable is stored | Viability doc §2 |
| **Software dev** | "Is it legal to listen to customers in US stores?" | Implementation owner answers: employee consent documents at rollout, nothing identifiable stored, legal review as gate 0 | Implementation section |
| | "How do you sell it beyond Aritzia?" | Through RISE migration conversations with AFS / ECC fashion retailers; Aritzia as reference; footwear next | S36, S41 |
| **Finance** | "Your numbers rest on assumptions." | Yes, labelled; break-even at +0.07 margin pts; SAP case pays back even in the low scenario | Brief §9; viability doc §8 |
| | "Total cost to SAP?" | Appendix 3 | to build |
| **Product strategy** | "Why does this need SAP, not Theatro?" | Theatro relays requests but doesn't feed SAP forecasting and allocation; the value is in the data loop | S29, brief §10 |
| | "Doesn't this pull Aritzia off SAP if it fails?" | It's a pilot with gates; failure costs little and nothing is migrated off | |

## To do

- [ ] Agree the implementation split with Dora / Brady (above)
- [ ] Check whether Joule voice reached GA (announced for H2 2026)
- [ ] Verify: can Business Data Cloud take data from ECC, or only S/4HANA? Decides the "fast pilot vs migration pull" answer
- [ ] Build appendix 3: full cost to SAP through year 2
- [ ] Named-retailer list for the SAP-2 funnel
- [ ] Rehearse K1 → SAP-5 to ≤3 min
