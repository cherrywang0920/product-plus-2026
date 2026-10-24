# Semis: the data story and SAP viability

Working doc, Oct 22. Consolidates the post-Arena discussion: judge feedback, the pivot to demand data, why fashion retailers would choose SAP, and what Atelier is worth to SAP in dollars. Product name is now **Atelier, by Joule** (was Joule Floor).

**Labels** (same as the brief): `[S#]` source in [sources.md](sources.md) · `[I]` interview · `[C]` our calculation · `[A]` assumption.

---

## 1. Judge feedback → what changes

| Feedback | What it really says | What we change |
|---|---|---|
| "Some misunderstanding of the case… needs more on how this expands broadly" | We pitched an in-store comms tool. The case asks about closing the gap between a demand shift and the business response | Make the **demand data** the product; voice is how it's collected. Show expansion beyond Aritzia |
| "Can be tied back to the problem more" | Features read as CMT fixes, not demand-response fixes | Tie each feature to a demand signal and the action it triggers |
| "Not a justified large enough problem for the investment from SAP" | One retailer's floor problem looks small for SAP | Size the value **to SAP**: fashion retailers choosing SAP + the ECC→S/4HANA migration, in dollars (sections 5–8) |
| Research, interviews, video | Strengths | Keep |

## 2. The reframe: floor voice is a demand signal no planning system has

**The concept: censored demand.** Sales data only records what was bought. When a size is out, or a client leaves, that demand is never recorded, so forecasts stay too low exactly where stock is short.

**What voice adds over CMT.** CMT stock searches may already be logged (to confirm, §9). Voice still adds three things:
- **Coverage all shift, including peak.** Associates skip CMT at peak and shout instead [I], so search logs thin out when demand is highest. The vision is that *every* floor request goes through the earpiece, all shift; full adoption is what makes the data valuable.
- **The outcome.** A search shows someone looked. A routed request plus "we're out of the 4" shows whether the client got it.
- **The reason.** "The 6 ran big, bring a 4" never enters a search box.

**The "sorry" gap, and the decision that closes it (Oct 23).** If an associate already knows something is out, they say "sorry, we don't have it" and CMT records nothing. **Team decision: the earpiece listens all shift**, so these moments are captured too. That's what gives us real censored demand, not just the requests that reach a runner. (A "tell my client when it's back" command was discussed and parked for a later release.)

**Privacy safeguards (confirmed Oct 23; presented in the implementation section, owner Dora / Brady):**
- **Mic off at any time**, by a physical switch; and a close-talk mic that mainly picks up the wearer, not people further away.
- **Listen for demand, not conversations:** speech is turned into structured events on the earpiece or edge (item · size · colour · outcome · reason · boutique · time) and the audio and transcript are discarded straight away. No client voices, names or identities are stored.
- **Employee consent at rollout:** associates sign updated consent / policy documents when Atelier is introduced.
- **Disclosure to clients:** signage in boutiques [proposed]. Employee consent doesn't cover clients, so the client side rests on storing nothing identifiable plus disclosure; legal review confirms.
- **Legal review before the pilot** (see §9): customer consent rules differ by jurisdiction, and most of Aritzia's revenue is in the US [S17].

**Honest limit: not all talk is demand data.** "Dora, can you cover register" isn't a signal. Our claim is that **product requests** are the valuable part; the pilot measures what share of floor talk they are [A].

**Don't overclaim.** RFID smart fitting rooms already count try-ons vs purchases. What only voice gets is **why**.

## 3. From voice data to action (dashboard input)

| Signal | What it means | Action | Who |
|---|---|---|---|
| Tried on a lot, rarely bought | Product problem (fit, length, fabric); voice gives the reason | Flag to design / merchandising | Merchandiser |
| Rarely tried on, but bought when it is | Placement or visibility problem | Move it on the floor | Store manager |
| Requested, not in stock | Unmet demand | Transfer or reorder (Joule drafts, allocator approves) | Allocator |
| Asked for, never carried | Assortment gap | Signal to buying | Buyer / planner |

**Dashboard hero idea:** show the gap the case is about. A demand shift shows up in voice data on day X; show when sales data would have caught it (weeks later, or never if the item was out), then the approved transfer.

## 4. Why fashion retailers choose SAP

1. **A signal no competitor has.** Blue Yonder, RELEX and SAP's own forecasting learn from transactions [S16, weak]. SAP would be the only one that also sees what clients asked for before buying or leaving.
2. **Faster response, not just a better forecast:** the case's own question.
3. **A reason to migrate now** (section 6).
4. **Aritzia as the reference customer** for similar retailers.

**Market position (context):**
- SAP has 14,000+ retail customers [S34]; 208 of the world's top 250 retailers run SAP [S35, dated].
- SAP's fashion product, S/4HANA for Fashion and Vertical Business, had 350+ customers (130+ live) around 2019 [S35]; users include Nike, PVH, VF, Macy's [S15, weak].
- Overall ERP market: SAP ~22%, Microsoft ~12%, Oracle ~12% [S44, weak; context only].
- Better forecasting is worth a lot: AI forecasting cuts forecast errors 20–50% and lost sales up to 65% [S43]. This is about supply chains in general, not fashion; say so.

## 5. What SAP gains from the data

**Correction to avoid:** SAP can't take Aritzia's data. The retailer owns it; using customer data for AI without consent is normally off-limits (check SAP's policy, §9). The defensible version: **SAP gets a new kind of data its products can use, which makes those products worth more.**

1. **A new data product in Business Data Cloud:** "in-store demand intent" as a standard feed forecasting can use, built once, offered to every retailer using the earpiece.
2. **Know-how from the pilot:** how requests become forecast adjustments, how much a request counts vs a sale. SAP keeps the model design; Aritzia keeps the raw data.
3. **Opt-in industry benchmarks, later:** anonymized, combined trends across consenting retailers. Future option with a clear risk, not the main case.
4. **Revenue that grows with use:** per-boutique software + Business Data Cloud fees + forecasting upgrades.

**The loop:** more associates use it → more requests recorded → better forecasts → more retailers choose SAP → more data products and benchmarks.

## 6. The ECC deadline: real, but soft

ECC standard support ends **Dec 31, 2027** [S32]. Customers can keep delaying:

| Period | Option | Catch |
|---|---|---|
| To end 2027 | Standard support | Normal fee |
| 2028–2030 | Extended support | +2 percentage points on the fee [S40] |
| 2031–2033 | Transition option, large customers only | Must sign a cloud deal (RISE) and move to SAP's cloud-hosted ERP by 2030 [S40] |
| After 2030 | Reduced support | No guaranteed security or legal patches |
| Any time | Third-party support (e.g. Rimini Street) | SAP loses the support fee |

**The real competitor is inaction, not Oracle.**
- 35,000 ECC customers; only 39% had moved to S/4HANA by end 2024; Gartner expects ~17,000 still on ECC in 2027 and ~13,000 in 2030 [S36].
- 95% of 455 SAP customers say the return on investment for S/4HANA is hard to make; nearly half don't plan S/4HANA cloud within five years [S37, vendor-biased survey]. Gartner: relatively few customers have dropped SAP [S37].

**Why delay costs SAP money:**
- Q2 2026: cloud revenue €6.28B (+24% at constant currency); support revenue ~€2.4B (−8%); cloud revenue under contract for the next 12 months €22.9B [S38].
- FY2025: total revenue €36.8B; cloud €21.0B [S39].
- A customer on ECC pays only support, not the larger cloud subscription. Every year of delay is a year of cloud revenue SAP doesn't get.

**Pitch line:** "ECC standard support ends in 2027. Without a reason to move, retailers will pay extra to wait until 2030. Atelier is that reason."

## 7. How many fashion retailers are still on ECC

No published figure; SAP and analysts don't break migration out by industry. Our estimate:

| Estimate | Basis |
|---|---|
| **About half to 60% of SAP's fashion customers are probably still on ECC** [A] | All-industry: 61% not migrated end 2024 [S36]; ~41% not started per an ASUG/Precisely survey, Nov 2025 [S45]. Nothing shows fashion is faster |
| **300+ fashion companies on SAP AFS** (ECC's apparel & footwear add-on) face the 2027 deadline with a hard rebuild, not a simple upgrade [S41] | Consultant sources citing SAP; original SAP blog blocked our fetch |
| **Aritzia is one of them:** ECC 6.0 since 2008 [S11] | |

Caveat: AFS users include brands and wholesalers, not only retailers with stores. Atelier needs store floors, so the target is a subset of the 300+.

**Pitch line:** "SAP's own fashion system for ECC has 300+ customers whose support ends in 2027, and across SAP roughly 6 in 10 ECC customers hadn't migrated by end of 2024."

## 8. What Atelier is worth to SAP

All USD. The brief's Aritzia business case is in CAD; keep the two separate or convert explicitly.

| Input | Value | Basis |
|---|---|---|
| Fashion retailers with stores, on SAP, still on ECC | ~150–200 | [A] ~half or more of 300+ AFS customers have their own stores [S41, A]. Replace with a named list (§9) |
| Share Atelier gets to move sooner | 5% low / 10% base | [A] |
| Extra yearly revenue when one moves to cloud ERP | $0.5–2M | Cloud ERP (RISE) contracts run ~$0.5–5M a year [S42, weak], minus the support fee already paid [A] |
| Atelier subscription per retailer | $1–3M a year | ~100–150 stores × $1,500 per store per month [A] |

| Scenario | Retailers moved | Added yearly revenue for SAP | Over a 5-year contract |
|---|---|---|---|
| Low | 10 | ~$15–50M [C] | ~$75–250M [C] |
| Base | 20 | ~$30–100M [C] | ~$150–500M [C] |

**Framing for judges.** Next to SAP's €36.8B revenue this looks small, so compare it to **SAP's cost to build Atelier**: ~8 people × 9 months ≈ $1.5–2M at a loaded ~$250–330k per person-year [A]. The low case alone returns ~7× that build cost every year. That answers "not justified for the investment" directly.

**Upside, unquantified:** other assisted-selling retail (footwear first: almost every sale involves fetching a size from the back); customers kept from leaving for third-party support.

**Weakest input:** the number of fashion retailers on ECC. Everything else scales from it.

## 9. To do before semis

**Verify (open in a browser, update [sources.md](sources.md) status):**
- [ ] AFS customer count and end-of-support date on the SAP Community blog [S41]
- [ ] Extended-maintenance +2 points and 2033 transition option on an SAP page [S40]
- [ ] SAP Q2 2026 figures in the statement PDF [S38]
- [ ] McKinsey forecasting figures: which article, which year [S43]
- [ ] SAP's policy on using customer data for AI (no source yet)
- [ ] **Always-on legal check (highest priority):** US state recording / eavesdropping laws (e.g. California's all-party consent rules) for client conversations; Canadian privacy law (PIPEDA, BC PIPA, Quebec Law 25) on collecting personal information; Ontario's written electronic-monitoring policy requirement for employers with 25+ staff. Confirm whether "keep only anonymous demand events, discard audio" changes the analysis. None of this is sourced yet
- [ ] A recent "top 250 retailers" figure, or show the date [S35]

**Research:**
- [ ] Named list of 10–20 SAP fashion retailers still on ECC/AFS + store counts from annual reports → replaces the "150–200" assumption and gives a bottom-up Atelier revenue figure
- [ ] A sourced figure for how much stockouts bias sales-based forecasts

**Interview follow-ups (Aritzia associates):**
1. When you search a product in CMT, is it saved anywhere? Does head office use it?
2. When something's out and you already know it, what do you do? Any way to note it?
3. Can you take a client's details to follow up when something's back? How often do clients ask?
4. How often do several clients ask for the same out-of-stock item in one shift?

**Decisions made (Oct 22):**
- Full-shift use is the vision, not just peak.
- ~~Privacy rule: only name/role-addressed speech leaves the earpiece.~~ **Replaced Oct 23:** the earpiece listens all shift to capture censored demand; mic can be switched off; safeguards in §2.
- Back-in-stock command parked for a later release.
- Viability story: Atelier makes fashion retailers choose SAP and migrate sooner, quantified in dollars for SAP.
