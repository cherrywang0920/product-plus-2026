# Supporting PDF: content source

Draft v4, Oct 20. Rebuilt from the team's User Insights draft. The team lays this out in Figma. Each `##` is a PDF section; `---` marks a suggested page break. Headings state conclusions so a judge skimming headings alone gets the pitch. **Sections 0–6 fit on one page.**

**Evidence labels (keep them in the layout, e.g. as small coloured tags):**
- `[S#]` **Verified source**: see Sources and [research/sources.md](../research/sources.md)
- `[I]` **Interview**: 3 Aritzia store associates, Oct 18–19, 2026
- `[C]` **Our calculation** from sourced figures
- `[A]` **Assumption**: our estimate, to validate in a pilot

---

## 0. At a glance

# Joule Floor

**SAP built the voice. We give it its first retail job, on Aritzia's boutique floor.**

- **Problem:** Aritzia's store teams coordinate through CMT, which sends no real-time notifications, so requests are missed, refreshed by hand or shouted across the floor. Clients wait, sales slip, and demand that goes unmet is never recorded.
- **Solution:** an earpiece. Say a teammate's name and you're talking to them, and only them. Coworkers still talk to coworkers; AI just gets the voice to the right person and quietly logs each request in SAP Business Data Cloud.
- **Payoff:** ~$7–15M a year in gross profit against ~$3M a year in cost. Breaks even at +0.08 points of gross margin [C, A].

## 1. Problem statement: every unanswered request on Aritzia's floor loses money twice

Aritzia's Style Advisors and Boutique Associates need to get a client's request to the right teammate in seconds, without leaving the client. But CMT (Clientele Management Tool), the tool they coordinate through, sends no real-time notifications, so at peak requests are missed or shouted across the floor [I]. Clients wait or leave without the item, and the demand behind those lost sales is never recorded.
- **Sales lost today:** slow hand-offs contribute to out-of-stock losses, ~4% of retail sales [C from S4, A].
- **Margin lost later:** unrecorded demand means stock lands in the wrong boutique and gets marked down; 1 margin point ≈ $37M [C].

## 2. User overview: frontline associates who are always on the move

Our focus is on Aritzia store employees who deal with clients directly: **Style Advisors** on the floor, **Atelier Sales** stylists in the fitting suites, and the **Boutique Associates and Atelier Operations** team who run items from stock. They are always moving between serving clients, retrieving items and restocking, usually with bundles in hand, under a floor rule to "keep hands busy" [I]. They need communication that reaches the right person instantly without pulling their eyes off the client.

## 3. Segmentation targeting: Aritzia's boutique floor, where most of its demand is spoken

We focus on Aritzia's store teams because they are the front line of client relationships, and Aritzia's "everyday luxury" promise is delivered by them in person.

| Why Aritzia's boutique floor | Evidence |
|---|---|
| 65% of revenue ($2.41B) comes from 144 boutiques | [S17] |
| Associates serve clients one on one and pull items from stock, so every request is a precise demand signal made before any sale | [S19], [I] |
| Late, heavy inventory and markdowns in 2023 cut FY24 gross margin to 38.5%; FY26 recovered to 44.9% on lower markdowns | [S18], [S17] |
| 12–13 new boutiques a year, mostly in new US markets, with no sales history to forecast from | [S17] |
| Already an SAP customer (ERP ECC 6.0 since 2008); ECC standard support ends Dec 31, 2027 | [S11], [S32] |

## 4. Stakeholders: one spoken request serves four teams

| Stakeholder | Wants | Gets from Joule Floor |
|---|---|---|
| **Style Advisor / Atelier Sales** (primary user) | Item in hand without leaving the client | Say a name, ask, hear the answer |
| **Boutique Associate / Atelier Operations** (runner) | Only the requests meant for them | A teammate's voice in their ear, hands free to carry; no CMT needed |
| **Store manager** | A calm floor at peak; the "everyday luxury" feel intact | No phones and no shouting on the floor; live view of load |
| **Allocation / merchandising** (head office) | Early sign a style is short | Daily unmet demand by style, size, boutique |
| **Aritzia leadership and IT** (buyer) | Margin; a reason to modernize SAP | Fewer markdowns; first step to S/4HANA |
| **SAP** | Joule adoption; cloud migration | A retail job for Joule voice; new demand data |

## 5. Pain points: we interviewed 3 Aritzia associates, and they feel how hard communication is

We interviewed 3 current Aritzia store associates (anonymous) who use CMT daily [I], and supplemented the findings with industry research. They described friction caused by a tool that doesn't tell anyone anything: it has "no notifs unless you manually refresh", and the "manual close and open is very annoying and causes disruption on the floor." At peak, associates can be overwhelmed and "resort to skipping CMT entirely just to speed up the retrieving process" [I].

| Pain | Evidence |
|---|---|
| **No notifications.** Runners only see a request by refreshing; the Advisor doesn't know if anyone saw it | All 3 [I] |
| **Phones clash with the floor.** Retrieving happens "while holding bundles and supporting clients", under a "keep hands busy" rule | [I] |
| **Skipped at peak.** Staff shout instead, so requests go unrecorded exactly when demand is highest | [I] |
| **Overstretched runners.** Busy days "feel like 3 people are required"; quiet days are scheduled with 1. Most BAs don't have CMT at all | [I] |
| **Unmet demand is invisible.** If the size isn't there, the client leaves and no system records it | [A], to confirm |

## 6. Insight: Aritzia's floor already runs on voice, so give voice a direction

Under pressure, Aritzia's teams go back to talking to each other. The problem isn't the talking; it's that talking is loud, goes to everyone and leaves no record. **Point each voice at the right person, and log what was asked**, and the same fix speeds up the floor and gives head office its earliest demand signal, with no one looking at a phone.

---

## 7. Solution: say a name, talk to that person. AI only does the routing

Each on-shift associate wears a company earpiece, picked up at clock-in. **All communication stays human to human:** you hear your coworker's own voice, never an AI voice, and nothing is summarised or relayed on anyone's behalf. AI does two things in the background: it gets each voice to the right ear, and it writes down what was asked.

| MVP feature | What it does | Pain it fixes |
|---|---|---|
| **1. Targeted voice requests** | Maya says: "**Dora**, can you grab the Effortless pant in a 4, black, for suite 3?" Only Dora hears it, in Maya's own voice. "**Any runner**, …" goes to the best available runner on shift. If Dora is busy, on break or off shift, the message goes to the next runner and Maya is told who has it | No notifications; phones clash with the floor; shouting to everyone |
| **2. Direct replies and hand-off** | Dora answers ("On it" / "We're out of the 4") and her voice goes straight back to Maya, no name needed. No answer in 30 s → Maya's message plays for the next available runner | Not knowing if anyone saw it; requests lost at peak |
| **3. Every request → SAP Business Data Cloud** | AI transcribes each routed request and its outcome into a record (item · size · colour · boutique · found / not found). Allocators see unmet demand by style, size and boutique daily; Joule drafts a transfer | Unmet demand invisible to head office |

**Always on, without worrying about it.** The earpiece only routes speech that starts with a teammate's name or role ("Dora, …", "Any runner, …"). Everything else, including every conversation with a client, stays on the device and is dropped immediately: never sent, never stored. A mute button turns it off whenever an associate wants.

**Before vs after (same scene)**

| | Today | With Joule Floor |
|---|---|---|
| Make the request | Step away from the client, take out a phone, type into CMT [I] | Say "Dora, …" and keep serving |
| Reach the runner | Only if they refresh; at peak, shouted to everyone [I] | Only Dora hears it |
| Know it's coming | No signal [I] | Hear Dora say "On it" |
| Size not in store | Client leaves; nothing recorded [A] | Logged as unmet demand; other options offered (next release) |
| Head office learns | When weekly sell-through shows a sell-out [A] | Next morning: "Size 4 black requested 47× this week, 0 in stock" (illustrative) |

**Deliberately left out:** an AI voice or AI assistant in the ear, push-to-talk, a new phone app, customer-facing voice, replacing CMT. CMT stays the system of record; the earpiece replaces the typing and the shouting.
**Next releases:** substitutes, another boutique or ship-to-client when not found; "not found but system says in stock" corrects stock counts, which also helps pickup orders [I].

## 8. People talk, AI routes and records, people decide

| Step | AI (background) | People |
|---|---|---|
| Talk | Detects a teammate's name or role at the start of speech | Say the request in their own words |
| Route | Sends the voice to that person, or to the best available runner; hands off after 30 s | Runner answers; manager can reassign |
| Record | Transcribes routed requests into structured demand data; groups repeats | |
| Act on demand | Drafts a transfer with the evidence | **Allocator approves every move** |

- **Preserves the floor culture:** hands stay busy, eyes stay on the client, and the floor gets quieter, not louder.
- **Company earpieces, on shift only:** handed out at clock-in, so nothing reaches staff off shift and no work alerts go to personal phones. ~62% of Aritzia's revenue is in the US [S17], where off-shift work messages count as paid time for hourly staff [S20].
- **Voice already works on retail floors:** Theatro's voice wearables run at Neiman Marcus Last Call and The Container Store, with ~12% associate time saved (vendor claim) [S29]; Walmart's associate voice assistant answers 3M+ questions a week [S28].

---

## 9. Business case: pays back in year 1, even at the low end

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
- **Build cost:** a Joule Studio agent on SAP BTP using the LiveKit real-time voice layer SAP announced for Joule [S30] to route live audio between associates, with certified third-party earpieces; ~8 people for 9 months to pilot-ready [A].

## 10. Why SAP, why now

| Alternative | What it lacks |
|---|---|
| CMT today | Screen-only, no notifications; requests stay in the boutique [I] |
| Radios / walkie-talkies | Broadcast to everyone; nothing recorded [A] |
| Voice wearables (Theatro), clienteling apps (Tulip) [S25, S29] | Relay requests, but don't feed Aritzia's SAP forecasting and allocation [A] |
| Planning tools (SAP Retail Intelligence, Blue Yonder, RELEX) | Learn from transactions; an unmet request never enters the data [A] |

**Now:** real-time voice for Joule (with LiveKit) was announced at Sapphire, May 2026; early adopters now, GA H2 2026, frontline workers named as the target [S30]. Retail Intelligence runs in Business Data Cloud [S2, S33].

## 11. Risks, pilot and metrics

| Risk | Mitigation |
|---|---|
| Clients feel listened to by an always-on mic | Name-triggered routing on the device; client conversation never leaves the earpiece or gets stored; mute button; privacy review with Aritzia before pilot [A] |
| Wrong person triggered ("Dora will bring it" said to a client) | Short clip only reaches Dora, who ignores it; name detection tuned in pilot |
| Boutique noise breaks detection | Mic close to the mouth; teammate names are a small, known vocabulary [A] |

**Pilot:** 3–5 Aritzia boutiques, 8 weeks, on Joule voice early access → all boutiques after GA.

| Metric | Target |
|---|---|
| Floor requests routed (vs shouted) at peak | >80% [A] |
| Request to item in hand | −50% [A] |
| Unmet requests captured per boutique per week | Baseline in pilot |
| Demand spike → approved transfer | Days, not weeks [A] |
| Associates wearing the earpiece on shift | >70% [A] |

**Still to validate:** whether unmet requests are logged anywhere today; how allocation decides transfers; whether Aritzia boutiques use radios or earpieces today; how staff and clients feel about earpieces on the floor.

---

## 12. Sources

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
| [I] | 3 Aritzia store associates, Oct 18–19, 2026; anonymous; notes paraphrased except quotes | Team research |

Full URLs and status: [research/sources.md](../research/sources.md).

---

## Notes for the team (not for the PDF)

- **Design decisions (Oct 20, Cherry):**
  - Earpiece only, no phone app, to fit Aritzia's "hands busy" floor rule.
  - Always on with a mute button, no push-to-talk. A teammate's name or role at the start of speech is the trigger.
  - Communication is human to human. Nobody hears an AI voice, and AI never interprets a request and passes it on. AI routes the audio and transcribes requests for the data log only.
  - The problem statement leads with money lost.
- **Before submitting:**
  - **Cite "everyday luxury".** It's Aritzia's own positioning but has no source ID yet. Add the Aritzia website or Annual Information Form (S19) as a source, or drop the quote marks.
  - **Don't call the interviews "structured".** The team draft says "3 structured user interviews", but Dora's notes describe casual conversations. v4 says "we interviewed 3", per Cherry's edit.
  - **CMT isn't on everyone's phone.** The team draft says every employee is required to use CMT, but Dora's notes say most BAs don't have it. v4 uses that as a pain point and an earpiece advantage.
  - **Don't claim why CMT has no notifications.** It's unproven whether it was a choice (to avoid overwhelming staff) or a bug, so v4 says neither (Cherry's comment in the Google Doc).
- **Summit questions to prepare:**
  - **Always-on mic near clients.** Expect privacy and legal questions (Canadian privacy law, US state recording laws). Our answer: detection happens on the device, only teammate-addressed speech leaves the earpiece, and the audio isn't stored. Confirm with a source before the Summit.
  - **What SAP actually announced.** Joule voice was announced for talking *to* Joule in the Joule Work mobile app [S30]. Routing live audio *between* associates over LiveKit, and earpiece support, are our extension [A].
- **New sources in the Google Doc, not yet in sources.md:**
  - Unily/ScreenCloud: frontline workers lose ~120 hours a year to poor access to information; $80.6B a year.
  - SMG: non-purchasers are 20% less likely to return within three weeks.
  - Zebra: 39% left a store over out-of-stocks; 85% of associates say real-time visibility would help.
  - Any of these would back "inefficient communication loses money". Log each with a status before citing.
- **Structure:** 0 at a glance → 1 problem statement → 2 user overview → 3 segmentation → 4 stakeholders → 5 pain points (with interview quotes) → 6 insight → 7 solution → 8 AI vs people → 9 business case → 10 why SAP → 11 risks → 12 sources. The journey is cut.
- **Confirm in a browser before submitting:** S4 (IHL), S18 (FY24 margin in Aritzia's annual report), S19 (AIF wording).
- **Left out for privacy:** app ratings, fraud anecdote, interviewee names or initials, store location.
- **Biggest assumptions:** 5–10% recovery of out-of-stock losses, a 0.1–0.25 point margin lift, $1,500 per boutique per month, and $250 earpieces × 20 per boutique. The break-even line exists so the case holds even if these are well off.
- **Suggested visuals:**
  - Page 1: Maya in the fitting room. Today: phone out, shouting. With Joule Floor: "Dora, …" with hands on the client, and Dora hearing it across the floor.
  - Business case: a cost vs benefit bar with the break-even line.
