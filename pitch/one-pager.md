# Supporting PDF: content source

Draft v2, Oct 20. The team lays this out in Figma. Each `##` is a PDF section; `---` marks a suggested page break. Headings state conclusions so a judge skimming headings alone gets the pitch. **Sections 1–7 fit on one page.**

**Evidence labels (keep them in the layout, e.g. as small coloured tags):**
- `[S#]` **Verified source**: see Sources and [research/sources.md](../research/sources.md)
- `[I]` **Interview**: 3 Aritzia store associates, informal conversations, Oct 18–19, 2026
- `[C]` **Our calculation** from sourced figures
- `[A]` **Assumption**: our estimate, to validate in a pilot

---

## 0. At a glance

# Joule Floor

**SAP built the voice. We give it its first retail job, on Aritzia's boutique floor.**

- **Problem:** CMT, the app Aritzia Style Advisors use to request items from stock, sends no notifications, so at peak staff skip it and shout. Clients wait, and requests that go unmet are never recorded.
- **Solution:** a Style Advisor says the request once; SAP Joule sends it to the right on-shift teammate, confirms it's coming, and logs every request, filled or not, in SAP Business Data Cloud for Aritzia's allocation team.
- **Payoff:** ~$7–15M a year in gross profit against ~$2.6M a year in cost. Breaks even at +0.07 points of gross margin [C, A].

## 1. Problem: slow floor requests lose Aritzia's demand twice

Slow, unreliable communication on Aritzia's boutique floor means two kinds of demand go unanswered: **the client waiting in the fitting room now**, and **the pattern head office never sees**, because a request that never became a sale is never recorded. Sales data only shows demand that was met [A].

## 2. Segment: Aritzia, because most of its demand is spoken in a boutique

| Why Aritzia | Evidence |
|---|---|
| 65% of revenue ($2.41B) comes from 144 boutiques | [S17] |
| Style Advisors serve clients one on one and pull items from stock, so every request is a precise demand signal made before any sale | [S19], [I] |
| 1 point of gross margin ≈ $37M; 2023's late, heavy inventory and markdowns cut FY24 margin to 38.5% | [C], [S18] |
| 12–13 new boutiques a year, mostly in new US markets, with no sales history to forecast from | [S17] |
| Already on SAP (ERP ECC 6.0 since 2008), and ECC standard support ends Dec 31, 2027 | [S11], [S32] |

## 3. Stakeholders: one request serves four teams

| Stakeholder | Wants | Gets from Joule Floor |
|---|---|---|
| **Style Advisor** (primary user) | Item in hand without leaving the client | Speak once; knows it's coming |
| **Runner** (Atelier Operations, Boutique Associate) | Only their requests, clearly | One queue, silent alert |
| **Store manager** | A calm floor at peak | Live view of who's swamped |
| **Allocation / merchandising** (head office) | Early sign a style is short | Daily unmet demand by style, size, boutique |
| **Aritzia leadership and IT** (buyer) | Margin; a reason to modernize SAP | Fewer markdowns; first step to S/4HANA |
| **SAP** | Joule adoption; cloud migration | A retail job for Joule voice; new data |

## 4. Users: we spoke with 3 Aritzia associates who already asked for voice

Informal conversations with 3 current Aritzia store associates (anonymous) [I]. Persona: **Maya, Style Advisor** (composite): serving several clients on a busy Saturday, bundles over her arm, phone in her pocket.

> "Zero indicator of any notifications, no notifs unless you manually refresh."
> At peak, staff "may resort to skipping CMT entirely just to speed up the retrieving process."

They suggested **voice notes** and **speech-to-text** themselves [I].

## 5. Pain points: the app can't keep up with the floor

| Pain | Evidence |
|---|---|
| **No notifications.** Runners refresh CMT by hand; Advisors don't know if anyone saw the request | All 3 [I] |
| **Skipped at peak.** Staff shout instead, so requests go unrecorded exactly when demand is highest | [I] |
| **Hands full.** Prepping and retrieving "while holding bundles and supporting clients", in a "keep hands busy" culture | [I] |
| **Understaffed runners.** Busy days "feel like 3 people are required"; quiet days are scheduled with 1 | [I] |
| **Unmet demand is invisible.** If the size isn't there, the client leaves and no system records it | [A], to confirm |

## 7. Insight: fix the hand-off and you capture the data

Each floor request is Aritzia's earliest demand signal: a client asking for a specific item, size and colour, before any sale. Today it's lost in the store (slow hand-off) and at head office (never recorded). **The same fix solves both:** a request that reaches the right person fast is also a request on record.

---

## 8. Solution: say it once, the right person gets it, head office sees it

| MVP feature | What it does | Pain it fixes |
|---|---|---|
| **1. Targeted voice requests** | Push-to-talk: "Effortless pant, 4, black, suite 3, navy's OK." Joule turns it into item · size · colour · location · substitutes and sends it **only** to the right on-shift runner (by name, by role or auto-assigned) | Hands full; skipped at peak |
| **2. Acknowledgement and status** | "Dora's on it" → on its way → found / not found. Silent haptic alert; reassigned after 30 s | No notifications |
| **3. Every request → SAP Business Data Cloud** | Allocators see unmet demand by style, size and boutique daily; Joule drafts a transfer | Unmet demand invisible |

**Before vs after (same scene)**

| | Today | With Joule Floor |
|---|---|---|
| Make the request | Step away from the client, type into CMT [I] | Hold a button, say one sentence [A] |
| Reach the runner | Only if they refresh; at peak, shouted [I] | Silent tap to one on-shift runner |
| Know it's coming | No signal [I] | "Dora's on it, ~2 min" |
| Size not in store | Client leaves; nothing recorded [A] | Logged as unmet demand; other options offered (next release) |
| Head office learns | When weekly sell-through shows a sell-out [A] | Next morning: "Size 4 black requested 47× this week, 0 in stock" (illustrative) |

**Deliberately left out:** customer-facing voice, always-on listening, replacing CMT. We add one job to the tool Aritzia staff already use.
**Next releases:** substitutes, another boutique or ship-to-client when not found; "not found but system says in stock" corrects stock counts, which also helps pickup orders [I].

## 9. AI drafts, people decide, built for a real boutique

| Step | AI | Person |
|---|---|---|
| Understand the request | Transcribes; fills item, size, colour, location | Confirms or fixes in one tap |
| Route it | Picks the on-shift runner; escalates after 30 s | Runner accepts; manager can reassign |
| Spot demand | Groups repeat requests; flags spikes | |
| Move stock | Drafts the transfer with the evidence | **Allocator approves every move** |

- **Push-to-talk, never always listening:** protects client privacy; audio discarded, only the structured request kept.
- **Tap fallback:** if voice fails twice, the form opens pre-filled.
- **On-shift only:** alerts start at clock-in and stop at clock-out, as Walmart does in its associate app [S27]. ~62% of Aritzia's revenue is in the US [S17], where off-shift work messages count as paid time for hourly staff [S20].
- **Voice already works on retail floors:** Walmart's associate assistant answers 3M+ questions a week [S28]; Theatro reports ~12% associate time saved (vendor claim) [S29].

---

## 10. Business case: pays back in under a year, even at the low end

All CAD, from Aritzia's FY26 figures [S17]. Everything else is labelled.

**Benefits to Aritzia**

| Benefit | Calculation | Per year |
|---|---|---|
| **Recovered floor sales** | Boutique revenue $2.41B [S17] × ~4% lost to out-of-stocks (6.2% inventory distortion × 65.6% out-of-stock share [S4]) = ~$98M [C]. Recover 5–10% [A] = $4.9–9.8M × 44.9% gross margin [S17] | **$2.2–4.4M** |
| **Fewer markdowns** | 1 margin point = $37M [C]. Earlier transfers lift margin 0.1–0.25 points [A] | **$3.7–9.3M** |
| **Runner time** | 1 hour saved per boutique per day [A] × 144 × 360 days × $22/h [A] | **$1.1M** |
| **Total** | | **~$7–15M** |

**Costs to Aritzia**

| Cost | Calculation | Amount |
|---|---|---|
| **Software** (Joule Work, SAP BTP, Business Data Cloud usage) | $1,500 per boutique per month [A; SAP pricing not public] × 144 | **$2.6M / year** |
| **Integration** (CMT, SAP stock data, workforce scheduling) | One-time [A] | **$1.5–3M** |
| **Training** | ~40 staff per boutique [A] × 144 × 1 h × $22 | **~$0.13M** |
| **Devices** | Runs on the phones staff already use for CMT [I] | **$0** |

**Payback:** year 1 costs ~$4.2–5.7M against ~$7–15M benefit [C]. **Break-even** needs only one of: +0.07 points of gross margin, or recovering ~6% of boutique out-of-stock losses [C].

**Value to SAP**
- **First retail job for Joule voice:** a live frontline use case at a flagship fashion customer as Joule Work voice reaches GA (H2 2026) [S30].
- **New data for Retail Intelligence:** requests that never became sales, which transaction-based planning can't see [S2, A].
- **Migration:** Joule Floor needs current SAP stock data and Business Data Cloud, giving Aritzia a concrete reason to move from ECC to S/4HANA before standard support ends in 2027 [S11, S32].
- **Revenue and repeatability:** ~$2.6M a year from Aritzia alone [A]; the same template fits SAP's other clienteling fashion retailers.
- **Build cost:** a Joule Studio agent on SAP BTP reusing LiveKit voice [S30] and SAP Mobile Start push [S24]; ~8 people for 9 months to pilot-ready [A].

## 11. Why SAP, why now

| Alternative | What it lacks |
|---|---|
| CMT today | No notifications; typing only; requests stay in the boutique [I] |
| Voice wearables (Theatro), clienteling apps (Tulip) [S25, S29] | Relay requests, but don't feed Aritzia's SAP forecasting and allocation [A] |
| Planning tools (SAP Retail Intelligence, Blue Yonder, RELEX) | Learn from transactions; an unmet request never enters the data [A] |

**Now:** Joule Work voice (with LiveKit) was announced at Sapphire, May 2026; early adopters now, GA H2 2026, frontline workers named as the target [S30]. Retail Intelligence runs in Business Data Cloud [S2, S33].

## 12. Risks, pilot and metrics

| Risk | Mitigation |
|---|---|
| Boutique noise breaks recognition | Push-to-talk, short phrases, one-tap confirm, tap fallback |
| Clients feel recorded | Push-to-talk only; audio discarded |
| Staff still shout at peak | Must beat shouting; stopwatch-tested in pilot |
| Joule voice not GA until H2 2026 | Pilot via SAP early adopter program [S30]; tap-first version works without voice |
| Noisy signal (one client asks 5 times) | Group by client session; allocator approves every move |

**Pilot:** 3–5 Aritzia boutiques, 8 weeks, on Joule voice early access → all boutiques after GA.

| Metric | Target |
|---|---|
| Floor requests logged (vs shouted) at peak | >80% [A] |
| Request to item in hand | −50% [A] |
| Unmet requests captured per boutique per week | Baseline in pilot |
| Demand spike → approved transfer | Days, not weeks [A] |
| Weekly active Advisors and runners | >70% [A] |

**Still to validate:** whether unmet requests are logged anywhere today; how allocation decides transfers; whether Advisors will speak to a phone in front of a client.

---

## 13. Sources

| ID | Fact used | Source |
|---|---|---|
| S2 | Retail Intelligence in SAP Business Data Cloud, GA H1 2026 | SAP News, "NRF 2026: SAP Builds AI Into the Core of Retail", Jan 2026 |
| S4 | Inventory distortion = 6.2% of retail sales; 65.6% of it out-of-stocks | IHL Group, 2026 Inventory Distortion Study |
| S11 | Aritzia on SAP ERP ECC 6.0 since 2008 | IT World Canada; Panaya case study |
| S17 | Aritzia FY26: $3.70B revenue, 65% boutiques, 144 boutiques, 44.9% GM, ~62% US, 12–13 new boutiques planned | Aritzia Q4 & FY2026 results, May 7, 2026 |
| S18 | 2023 inventory "earlier and heavier than planned"; FY24 GM 38.5% | CBC; Vancouver Is Awesome |
| S19 | Clienteling and ship-from-store / pickup at most boutiques | Aritzia FY2026 Annual Information Form |
| S20 | Off-shift work messages are compensable for US hourly staff (FLSA) | Super Lawyers |
| S24 | SAP Mobile Start push notifications | SAP Community (SAP-authored) |
| S25 | Clienteling vendors Tulip, NewStore | Tulip press release; NewStore |
| S27 | Me@Walmart: work features only while on the clock | HR Dive |
| S28 | Walmart Ask Sam: 900k associates, 3M+ questions a week | TechCrunch; Walmart corporate |
| S29 | Theatro: ~12% associate time saved (vendor claim) | Retail TouchPoints; PR Newswire |
| S30 | Joule Work voice with LiveKit: Sapphire May 2026, GA H2 2026, frontline focus | SAP Sapphire 2026 Innovation News Guide; LiveKit |
| S32 | SAP ECC mainstream maintenance ends Dec 31, 2027 | SAP Community (SAP-authored) |
| S33 | SAP Business Data Cloud unifies SAP and third-party data | SAP News, Feb 2025 |
| [I] | 3 Aritzia store associates, informal group conversation, Oct 18–19, 2026; anonymous; paraphrased except quotes | Team research |

Full URLs and status: [research/sources.md](../research/sources.md).

---

## Notes for the team (not for the PDF)

- **Structure (agreed Oct 20):** 0 at a glance → 1 problem → 2 segment → 3 stakeholders → 4 users → 5 pain points → 7 insight (journey cut) → 8–13. Renumber in Figma.
- **CMT = Clientele Management Tool** (corrected Oct 20). The PDF never says CMT is built by SAP; still unconfirmed [I].
- **Confirm in a browser before submitting:** S4 (IHL), S18 (FY24 margin in Aritzia's annual report), S19 (AIF wording). Cited as Secondary.
- **Not cited on purpose:** S6 (52% shoppers stat, industry-wide; dropped to keep the PDF Aritzia-specific), S31 (weak), S16 (weak), S9 (single anecdote).
- **Left out for privacy:** app ratings, fraud anecdote, interviewee initials, store location.
- **Biggest assumptions** (expect Summit questions): 5–10% recovery of out-of-stock losses, 0.1–0.25 point margin lift, $1,500 per boutique per month. Break-even shows the case holds even if these are well off.
- **Suggested visuals:** page 1 = Maya's fitting-room scene, today vs Joule Floor (matches the video); business case = cost vs benefit bar with the break-even line.
