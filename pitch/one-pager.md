# Supporting PDF: content source

Draft v3, Oct 20. The team lays this out in Figma. Each `##` is a PDF section; `---` marks a suggested page break. Headings state conclusions so a judge skimming headings alone gets the pitch. **Sections 0–7 fit on one page.**

**Evidence labels (keep them in the layout, e.g. as small coloured tags):**
- `[S#]` **Verified source**: see Sources and [research/sources.md](../research/sources.md)
- `[I]` **Interview**: 3 Aritzia store associates, informal conversations, Oct 18–19, 2026
- `[C]` **Our calculation** from sourced figures
- `[A]` **Assumption**: our estimate, to validate in a pilot

---

## 0. At a glance

# Joule Floor

**SAP built the voice. We give it its first retail job, in the ears of Aritzia's boutique teams.**

- **Problem:** communication on Aritzia's boutique floor runs through a phone app with no notifications, so requests are slow, get shouted at peak, and unmet ones are never recorded. That costs Aritzia sales today and margin later.
- **Solution:** an earpiece. A Style Advisor presses once and says what the client needs; SAP Joule sends it to the right on-shift teammate's ear, confirms it's coming, and logs every request in SAP Business Data Cloud for Aritzia's allocation team. Hands stay busy, eyes stay on the client.
- **Payoff:** ~$7–15M a year in gross profit against ~$3M a year in cost. Breaks even at +0.08 points of gross margin [C, A].

## 1. Problem: inefficient floor communication is costing Aritzia money

On Aritzia's boutique floor, a client's request travels by phone app or by shouting. Both are slow and neither is reliable, and the cost lands in two places:
- **Sales lost now.** The client waits, or leaves without the size. Out-of-stocks cost retailers ~4% of sales [C from S4]; slow hand-offs on the floor contribute to that loss at Aritzia [A].
- **Margin lost later.** A request that never became a sale is never recorded, so allocation can't see which styles and sizes are short in which boutique. Stock lands in the wrong place and gets marked down. **Each point of gross margin is worth ~$37M** to Aritzia [C].

## 2. Segment: Aritzia, where most demand is spoken in a boutique

| Why Aritzia | Evidence |
|---|---|
| 65% of revenue ($2.41B) comes from 144 boutiques | [S17] |
| Style Advisors serve clients one on one and pull items from stock, so every request is a precise demand signal made before any sale | [S19], [I] |
| Late, heavy inventory and markdowns in 2023 cut FY24 gross margin to 38.5%; FY26 recovered to 44.9% on lower markdowns | [S18], [S17] |
| 12–13 new boutiques a year, mostly in new US markets, with no sales history to forecast from | [S17] |
| Already on SAP (ERP ECC 6.0 since 2008); ECC standard support ends Dec 31, 2027 | [S11], [S32] |

## 3. Stakeholders: one spoken request serves four teams

| Stakeholder | Wants | Gets from Joule Floor |
|---|---|---|
| **Style Advisor** (primary user) | Item in hand without leaving the client | Speak once; hear it's coming |
| **Runner** (Atelier Operations, Boutique Associate) | Only their requests, clearly | Requests in their ear, hands free to carry |
| **Store manager** | A calm floor at peak; the boutique's culture intact | No phones on the floor; live view of load |
| **Allocation / merchandising** (head office) | Early sign a style is short | Daily unmet demand by style, size, boutique |
| **Aritzia leadership and IT** (buyer) | Margin; a reason to modernize SAP | Fewer markdowns; first step to S/4HANA |
| **SAP** | Joule adoption; cloud migration | A retail job for Joule voice; new data |

## 4. Users: we spoke with 3 Aritzia associates, and they asked for voice

Informal conversations with 3 current Aritzia store associates (anonymous) [I]. Persona: **Maya, Style Advisor** (composite): serving several clients on a busy Saturday, bundles over her arm, expected to keep her hands busy and her attention on the client.

> "Zero indicator of any notifications, no notifs unless you manually refresh."
> At peak, staff "may resort to skipping CMT entirely just to speed up the retrieving process."

They suggested **voice notes** and **speech-to-text** themselves [I].

## 5. Pain points: the floor runs on hands and voices, the tool runs on a screen

| Pain | Evidence |
|---|---|
| **Phones clash with floor culture.** Staff are expected to keep "hands busy"; prepping and retrieving happen "while holding bundles and supporting clients" | [I] |
| **No notifications.** Requests go into CMT (Clientele Management Tool); runners only see them by refreshing, and Advisors don't know if anyone saw them | All 3 [I] |
| **Skipped at peak.** Staff shout instead, so requests go unrecorded exactly when demand is highest | [I] |
| **Overstretched runners.** Busy days "feel like 3 people are required"; quiet days are scheduled with 1 | [I] |
| **Unmet demand is invisible.** If the size isn't there, the client leaves and no system records it | [A], to confirm |

## 7. Insight: Aritzia's floor already runs on voice, so give voice a system

Under pressure, Aritzia's teams already go back to talking. The problem isn't that they talk; it's that talking is loud, goes to everyone, and leaves no record. **Make the spoken request targeted, acknowledged and logged**, and the same fix speeds up the floor and gives head office its earliest demand signal, without asking anyone to look at a phone.

---

## 8. Solution: press, speak, done. The right person hears it, head office sees it

**How it works:** each on-shift associate wears a company earpiece with a push-to-talk button, picked up at clock-in. No screen on the floor.

| MVP feature | What it does | Pain it fixes |
|---|---|---|
| **1. Targeted voice requests** | Press and say: "Effortless pant, 4, black, suite 3, navy's OK." Joule reads it back in one line, turns it into item · size · colour · location · substitutes and sends it **only** to the right on-shift runner's ear (by name, by role or auto-assigned) | Phones clash with floor culture; skipped at peak |
| **2. Spoken acknowledgement** | Runner says "got it" → Advisor hears "Dora's on it." Runner says "found" or "not found." Unclaimed after 30 s → next runner | No notifications |
| **3. Every request → SAP Business Data Cloud** | Logged alongside CMT; allocators see unmet demand by style, size and boutique daily on a screen at head office; Joule drafts a transfer | Unmet demand invisible |

**Before vs after (same scene)**

| | Today | With Joule Floor |
|---|---|---|
| Make the request | Step away from the client, take out a phone, type into CMT [I] | Press the earpiece, say one sentence, keep serving [A] |
| Reach the runner | Only if they refresh; at peak, shouted to everyone [I] | Spoken into one on-shift runner's ear |
| Know it's coming | No signal [I] | Hear "Dora's on it" |
| Size not in store | Client leaves; nothing recorded [A] | Logged as unmet demand; other options offered (next release) |
| Head office learns | When weekly sell-through shows a sell-out [A] | Next morning: "Size 4 black requested 47× this week, 0 in stock" (illustrative) |

**Deliberately left out:** a new phone app, customer-facing voice, always-on listening, replacing CMT. CMT stays the system of record; the earpiece replaces the typing and the shouting.
**Next releases:** substitutes, another boutique or ship-to-client when not found; "not found but system says in stock" corrects stock counts, which also helps pickup orders [I].

## 9. AI drafts, people decide, built for a real boutique

| Step | AI | Person |
|---|---|---|
| Understand the request | Transcribes; fills item, size, colour, location; reads it back | Says "yes" or corrects it |
| Route it | Picks the on-shift runner; escalates after 30 s | Runner accepts; manager can reassign |
| Spot demand | Groups repeat requests; flags spikes | |
| Move stock | Drafts the transfer with the evidence | **Allocator approves every move** |

- **Preserves the floor culture:** hands stay busy, eyes stay on the client, and the floor gets quieter, not louder.
- **Push-to-talk, never always listening:** protects client privacy and cuts store noise; the mic sits close to the speaker's mouth. Audio is discarded; only the structured request is kept.
- **Company earpieces, on shift only:** handed out at clock-in, so nothing reaches staff off shift and no work alerts go to personal phones. ~62% of Aritzia's revenue is in the US [S17], where off-shift work messages count as paid time for hourly staff [S20].
- **Fallback:** if voice fails twice, the Advisor uses CMT as today.
- **Voice already works on retail floors:** Theatro's voice wearables run at Neiman Marcus Last Call and The Container Store, with ~12% associate time saved (vendor claim) [S29]; Walmart's associate voice assistant answers 3M+ questions a week [S28].

---

## 10. Business case: pays back in year 1, even at the low end

All CAD, from Aritzia's FY26 figures [S17]. Everything else is labelled.

**Benefits to Aritzia**

| Benefit | Calculation | Per year |
|---|---|---|
| **Recovered floor sales** | Boutique revenue $2.41B [S17] × ~4% lost to out-of-stocks (6.2% inventory distortion × 65.6% out-of-stock share [S4]) = ~$98M [C]. Recover 5–10% [A] = $4.9–9.8M × 44.9% gross margin [S17] | **$2.2–4.4M** |
| **Fewer markdowns** | 1 margin point = $3.70B × 1% = $37M [C]. Earlier transfers lift margin 0.1–0.25 points [A] | **$3.7–9.3M** |
| **Runner time** | 1 hour saved per boutique per day [A] × 144 × 360 days × $22/h [A] | **$1.1M** |
| **Total** | | **~$7–15M** |

**Costs to Aritzia**

| Cost | Calculation | Amount |
|---|---|---|
| **Software** (Joule voice, SAP BTP, Business Data Cloud usage) | $1,500 per boutique per month [A; SAP pricing not public] × 144 | **$2.6M / year** |
| **Earpieces** | 20 per boutique (peak shift + spares) [A] × $250 [A] × 144 = $0.72M, replaced every 2 years | **$0.72M once, ~$0.36M / year** |
| **Integration** (CMT, SAP stock data, workforce scheduling) | One-time [A] | **$1.5–3M** |
| **Training** | ~40 staff per boutique [A] × 144 × 1 h × $22 | **~$0.13M** |

**Payback:** year 1 costs ~$5.0–6.5M against ~$7–15M benefit [C]. Ongoing ~$3.0M a year. **Break-even** needs only one of: +0.08 points of gross margin, or recovering ~7% of boutique out-of-stock losses [C].

**Value to SAP**
- **First retail job for Joule voice:** a live frontline use case at a flagship fashion customer as Joule voice reaches GA (H2 2026) [S30].
- **New data for Retail Intelligence:** requests that never became sales, which transaction-based planning can't see [S2, A].
- **Migration:** Joule Floor needs current SAP stock data and Business Data Cloud, giving Aritzia a concrete reason to move from ECC to S/4HANA before standard support ends in 2027 [S11, S32].
- **Revenue and repeatability:** ~$2.6M a year from Aritzia alone [A]; the same template fits SAP's other clienteling fashion retailers.
- **Build cost:** a Joule Studio agent on SAP BTP using the LiveKit real-time voice layer SAP announced for Joule [S30], with certified third-party earpieces; ~8 people for 9 months to pilot-ready [A].

## 11. Why SAP, why now

| Alternative | What it lacks |
|---|---|
| CMT today | Screen-only, no notifications; requests stay in the boutique [I] |
| Radios / walkie-talkies | Broadcast to everyone; nothing structured or recorded [A] |
| Voice wearables (Theatro), clienteling apps (Tulip) [S25, S29] | Relay requests, but don't feed Aritzia's SAP forecasting and allocation [A] |
| Planning tools (SAP Retail Intelligence, Blue Yonder, RELEX) | Learn from transactions; an unmet request never enters the data [A] |

**Now:** real-time voice for Joule (with LiveKit) was announced at Sapphire, May 2026; early adopters now, GA H2 2026, frontline workers named as the target [S30]. Retail Intelligence runs in Business Data Cloud [S2, S33].

## 12. Risks, pilot and metrics

| Risk | Mitigation |
|---|---|
| Boutique noise breaks recognition | Earpiece mic close to the mouth, push-to-talk, short phrases, spoken read-back |
| Clients feel recorded | Push-to-talk only; audio discarded |
| Earpieces feel off-brand or unwelcoming | Discreet single-ear design; pilot tests client and staff reaction |
| Staff still shout at peak | Must beat shouting; stopwatch-tested in pilot |
| Joule voice not GA until H2 2026 | Pilot via SAP early adopter program [S30] |
| Noisy signal (one client asks 5 times) | Group by client session; allocator approves every move |

**Pilot:** 3–5 Aritzia boutiques, 8 weeks, on Joule voice early access → all boutiques after GA.

| Metric | Target |
|---|---|
| Floor requests logged (vs shouted) at peak | >80% [A] |
| Request to item in hand | −50% [A] |
| Unmet requests captured per boutique per week | Baseline in pilot |
| Demand spike → approved transfer | Days, not weeks [A] |
| Associates wearing the earpiece on shift | >70% [A] |

**Still to validate:** whether unmet requests are logged anywhere today; how allocation decides transfers; whether Aritzia boutiques use radios or earpieces today; how staff and clients feel about earpieces on the floor.

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
| S25 | Clienteling vendors Tulip, NewStore | Tulip press release; NewStore |
| S28 | Walmart Ask Sam: 900k associates, 3M+ questions a week | TechCrunch; Walmart corporate |
| S29 | Theatro voice wearables at Neiman Marcus Last Call, The Container Store; ~12% time saved (vendor claim) | Retail TouchPoints; PR Newswire |
| S30 | Joule voice with LiveKit: Sapphire May 2026, GA H2 2026, frontline focus | SAP Sapphire 2026 Innovation News Guide; LiveKit |
| S32 | SAP ECC mainstream maintenance ends Dec 31, 2027 | SAP Community (SAP-authored) |
| S33 | SAP Business Data Cloud unifies SAP and third-party data | SAP News, Feb 2025 |
| [I] | 3 Aritzia store associates, informal group conversation, Oct 18–19, 2026; anonymous; paraphrased except quotes | Team research |

Full URLs and status: [research/sources.md](../research/sources.md).

---

## Notes for the team (not for the PDF)

- **Direction update (Oct 20, Cherry):** the solution is **earpiece-only, no phone app**, to preserve Aritzia's "hands busy" floor culture. Problem statement leads with **inefficient floor communication → lost money**.
- **Open technical choice:** what the earpiece connects to. Options: (a) a standalone Wi-Fi earpiece/badge (like Theatro; no phone at all), (b) a Bluetooth earpiece paired to a phone that stays in the pocket. The draft says "company earpiece, picked up at clock-in", which fits (a) and avoids personal phones. Joule voice is announced for the Joule Work **mobile app** [S30], so earpiece support is our assumption [A]. Expect this question at the Summit.
- **Structure (agreed Oct 20):** 0 at a glance → 1 problem → 2 segment → 3 stakeholders → 4 users → 5 pain points → 7 insight (journey cut) → 8–13. Renumber in Figma.
- **CMT = Clientele Management Tool.** The PDF never says CMT is built by SAP; still unconfirmed [I].
- **Confirm in a browser before submitting:** S4 (IHL), S18 (FY24 margin in Aritzia's annual report), S19 (AIF wording). Cited as Secondary.
- **Not cited on purpose:** S6, S31, S16, S9. S24 (Mobile Start push) and S27 (Me@Walmart) dropped with the phone app.
- **Left out for privacy:** app ratings, fraud anecdote, interviewee initials, store location.
- **Biggest assumptions** (expect Summit questions): 5–10% recovery of out-of-stock losses, 0.1–0.25 point margin lift, $1,500 per boutique per month, $250 earpieces × 20 per boutique. Break-even shows the case holds even if these are well off.
- **Suggested visuals:** page 1 = Maya in the fitting room, today (phone out, shouting) vs Joule Floor (one press on the earpiece, hands on the client); business case = cost vs benefit bar with the break-even line.
