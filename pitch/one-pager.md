# Supporting PDF: content source

Draft, Oct 20. The team lays this out in Figma. Every `##` below is a section of the PDF; `---` marks a suggested page break. Headings state conclusions so a judge skimming headings alone gets the pitch.

**Evidence labels (keep them in the layout, e.g. as small coloured tags):**
- `[S#]` **Verified source**: see the Sources section and [research/sources.md](../research/sources.md)
- `[I]` **Interview**: 3 store associates at Aritzia, informal conversations, Oct 18–19, 2026
- `[C]` **Our calculation** from sourced figures
- `[A]` **Assumption**: our estimate, to validate in a pilot

---

# Joule Floor

**SAP built the voice. We give it its first retail job.**

Voice requests for fashion store teams, built on SAP Joule, that get the client their size in minutes and turn every request, filled or not, into demand data head office has never seen.

## The problem: demand goes unanswered twice on the store floor

When a client in the fitting room asks for "these pants in a 4, in black", the Style Advisor types a retrieve request into CMT (Clientele Matching Tool), Aritzia's store clienteling app [I]. CMT sends **no notifications**: the stockroom team only sees it by refreshing, and at peak staff **skip the app and shout across the floor** [I].

That one slow hand-off loses demand twice:
1. **The client waiting now.** Slow or failed retrieves contribute to lost sales: 52% of shoppers left a store without everything they wanted [S6].
2. **The pattern head office never sees.** A request that never became a sale leaves no record. Sales data shows only demand that was met, so allocation learns a style is hot only when weekly sell-through shows it sold out [A].

## The solution: say it once, the right person gets it, head office sees it

| | What it does | Pain it fixes |
|---|---|---|
| **1. Targeted voice requests** | Push-to-talk: "Effortless pant, 4, black, suite 3, navy's OK." Joule turns it into a structured request and sends it **only** to the right on-shift runner | Typing while serving a client; requests skipped at peak [I] |
| **2. Acknowledgement and status** | "Dora's on it" → on its way → found / not found. Silent haptic alert; reassigned after 30 s | No notifications; constant refreshing; going back to shouting [I] |
| **3. Every request → SAP Business Data Cloud** | Unmet demand by style, size and store, daily; Joule drafts a transfer, **an allocator approves** | Head office blind to unmet demand [A] |

## Why it pays: one point of margin is worth ~$37M at a retailer like Aritzia

Reference retailer: Aritzia, $3.70B revenue, 65% in 144 boutiques, 44.9% gross margin [S17].
- **Benefit:** ~$7–15M gross profit a year from recovered sales, fewer markdowns and runner time saved [C, A].
- **Cost:** ~$2.6M a year plus ~$1.6–3.1M to set up [A].
- **Breaks even** if it recovers ~6% of store out-of-stock losses **or** adds 0.07 points of gross margin, with every other benefit at zero [C].

## Why SAP, and why now

- **The voice is shipping:** real-time voice for the Joule Work mobile app (with LiveKit) was announced at Sapphire, May 2026; early adopters now, general availability H2 2026, frontline workers named as the target [S30].
- **The data has a home:** Retail Intelligence in SAP Business Data Cloud plans demand and inventory from sales and inventory data [S2, S33]. A request that never became a sale never reaches it today. Joule Floor adds that missing signal [A].
- **A reason to move to the cloud:** standard support for SAP ECC ends Dec 31, 2027 [S32]. Aritzia has run SAP ECC since 2008 [S11]. Voice on the floor and demand capture is a concrete reason to migrate to SAP's cloud instead of a competitor's.

---

## The user: Style Advisors at clienteling fashion retailers, and the allocators behind them

**Problem statement.** Style Advisors at specialty fashion retailers need to get a client's requested item from stock without leaving the client, because today's store apps don't tell anyone a request exists, which slows the floor at peak and leaves unmet demand unrecorded.

**User overview**

| User | Role | Need |
|---|---|---|
| **Requester** (primary) | Style Advisor, fitting-room stylist | Ask for an item in seconds, hands and eyes on the client; know it's coming |
| **Runner** | Stockroom / operations associate | One clear queue of only their requests, and where to find the item |
| **Allocator** (head office) | Allocation / merchandising | See what clients asked for and couldn't buy, by store, early enough to move stock |

**Segment.** Specialty fashion retailers on SAP with a clienteling model and most revenue in stores. Aritzia is our design partner and reference: 65% of revenue in boutiques, 14 new boutiques in FY26 [S17]. New stores have no sales history to forecast from, so floor requests matter most there [A].

**What we heard** (3 store associates at one retailer, informal conversations; anonymous) [I]

> "Zero indicator of any notifications, no notifs unless you manually refresh."

> At peak, staff "may resort to skipping CMT entirely just to speed up the retrieving process."

> It "feels like 3 people are required" in stockroom operations on busy days; quiet days are scheduled with 1.

- Staff run, prep and retrieve "while holding bundles and supporting clients", in a "keep hands busy" floor culture.
- **They asked for voice:** voice notes so the runner knows whether another colour is OK, and speech-to-text search.

**Persona: Maya, Style Advisor** (composite from the interviews)

Serves several clients at once on a busy Saturday. Phone in her pocket, bundles over her arm. Wants her attention on the client, not on an app. Her need, in our words: *"I just need someone to know I need it."* (illustrative, not a quote)

**Journey today**

| Step | What Maya does | What breaks |
|---|---|---|
| 1 | Client in suite 3 asks for the pants in a 4, black | |
| 2 | Steps away from the client, types the request into CMT | Hands full; attention off the client [I] |
| 3 | Waits; no idea if anyone saw it | No notifications; runner must refresh [I] |
| 4 | Gives up and shouts across the floor | The request is now off the record [I] |
| 5 | Size isn't there; client leaves without it | Contributes to a lost sale; **no system records the demand** [A] |

**Insight.** The store floor is where demand shifts first: every request is a precise statement of what a client wants, made before any sale. Today it is lost twice: in the store (slow hand-off) and at head office (never recorded). Fixing the hand-off is also how you capture the data.

---

## The experience: from typing and shouting to one sentence

**Before vs after (same scene)**

| | Today | With Joule Floor |
|---|---|---|
| Make the request | Step away, type into the app [I] | Hold a button, say one sentence (~3 s) [A] |
| Reach the runner | Only if they refresh; at peak, shouted [I] | Silent tap to one on-shift runner; next person after 30 s |
| Know it's coming | No signal [I] | "Dora's on it, ~2 min" |
| Not in stock | Client leaves; nothing recorded [A] | Substitute, other store or ship-to-client offered (next release); request logged |
| Head office learns | When weekly sell-through shows a sell-out [A] | Next morning: "Size 4 black requested 47× this week, 0 in stock" (illustrative) |

**How a request is routed**

| You say | Who gets it |
|---|---|
| "**Dora**, can you grab…" | Dora; if she's busy or off shift, the next person in her role, and you're told who |
| "**Any runner**, size 4 black…" | Best available on-shift runner (free, closest) |
| No name | Joule picks by request type |

**Where AI acts and where people decide**

| Step | AI | Person |
|---|---|---|
| Understand the request | Transcribes and fills item, size, colour, location | Confirms or fixes in one tap |
| Route it | Picks the on-shift runner; escalates after 30 s | Runner accepts; manager can reassign |
| Spot demand | Groups requests, filters repeats, flags spikes | |
| Move stock | Drafts the transfer with the evidence | **Allocator approves every move** |

Rule: **AI never moves inventory on its own.**

**Designed for a real store floor**
- **Push-to-talk, never always listening.** Protects client privacy and copes with store noise; audio is discarded, only the structured request is kept.
- **Tap fallback.** If voice fails twice, the form opens pre-filled with what it heard.
- **On-shift only.** Alerts start at clock-in and stop at clock-out, the pattern Walmart uses for its associate app [S27]. Alerting hourly staff off shift creates unpaid-work exposure in the US [S20].

**Why voice works here.** Walmart's associate voice assistant answers 3M+ questions a week from 900k associates [S28]. Theatro reports ~12% associate time saved with voice wearables (vendor claim) [S29].

**Deliberately left out:** customer-facing voice, always-on listening, voice checkout, replacing CMT. We add one job to the tool staff already use.

**Next releases:** not-found options (substitute, other store, ship to client); "not found but system says in stock" → stock count correction, which also fixes failed online pickup orders [I]; fitting-room "tried, didn't buy" signal.

---

## Business case: pays back in under a year at a 144-boutique retailer, even at the low end

All money in CAD. Reference retailer: Aritzia's public FY26 figures [S17]. Everything else is labelled.

### Why a retailer adopts it

| Benefit | Calculation | Per year |
|---|---|---|
| **Recovered floor sales** | Boutique revenue $2.41B [S17] × out-of-stock losses ~4% of sales (6.2% inventory distortion × 65.6% out-of-stock share [S4]) = ~$98M lost [C]. Joule Floor recovers 5–10% of that through faster retrieves, finding "lost" stock and substitutes [A] = $4.9–9.8M revenue × 44.9% gross margin [S17] | **$2.2–4.4M** |
| **Fewer markdowns** | 1 point of gross margin = $3.70B × 1% = **$37M** [C]. Earlier transfers of in-demand sizes lift margin 0.1–0.25 points [A] | **$3.7–9.3M** |
| **Runner time** | 1 runner-hour saved per boutique per day [A] × 144 boutiques × 360 days × $22/hour loaded wage [A] | **$1.1M** |
| **Total** | | **~$7–15M** |

| Cost | Calculation | Amount |
|---|---|---|
| **Software** (Joule Work seats, BTP, Business Data Cloud usage) | $1,500 per boutique per month [A; SAP pricing not public] × 144 | **$2.6M / year** |
| **Integration** (CMT or SAP app, S/4HANA stock, workforce scheduling) | One-time [A] | **$1.5–3M once** |
| **Training and change management** | ~40 staff per boutique [A] × 144 × 1 hour × $22 | **~$0.13M once** |
| **Devices** | None: runs on the phones staff already use for CMT [I]. Earbuds optional later | **$0** |

**Payback:** year 1 costs ~$4.2–5.7M against ~$7–15M benefit [C]. **Break-even** at $2.6M/year ongoing needs only **one** of: recovering ~6% of store out-of-stock losses, or +0.07 points of gross margin [C].

**Why we believe the margin lever:** Aritzia has paid for slow demand response before. In 2023 inventory arrived "earlier and heavier than planned", markdowns followed and FY24 gross margin fell to 38.5% [S18]. Management credits FY26's 44.9% to lower markdowns and better inventory management [S17].

### Why SAP wants it

| Value to SAP | How |
|---|---|
| **Adoption of Joule voice** | A ready-made frontline job for Joule Work voice at launch, in an industry where staff can't type [S30] |
| **New data in Business Data Cloud** | Unmet demand that sales-based planning, SAP's or a competitor's, can't see; makes Retail Intelligence more accurate [S2, A] |
| **Cloud migration** | ECC standard support ends Dec 31, 2027 [S32]. Joule Floor needs S/4HANA stock data and Business Data Cloud, so it is a reason for ECC retailers like Aritzia [S11] to move to SAP's cloud |
| **Recurring revenue** | Per-store subscription on top of Joule Work. Illustrative: 50 SAP fashion retailers × 150 stores × $1,500/month = **$135M a year** [A] |

**Build cost to SAP (estimate):** a Joule Studio agent on SAP BTP reusing the LiveKit voice layer [S30] and SAP Mobile Start push notifications [S24]; ~8 people for 9 months to a pilot-ready release [A].

### How it differs

| Alternative | What it lacks |
|---|---|
| Today's store apps (CMT) | No notifications; typing only; requests stay in the store [I] |
| Voice wearables (Theatro) and clienteling apps (Tulip) [S25, S29] | Capture or relay requests, but don't feed the retailer's SAP forecasting and allocation [A] |
| Planning tools (SAP Retail Intelligence, Blue Yonder, RELEX) | Learn from transactions; a request that never became a sale never enters the data [A] |

### Risks and how we handle them

| Risk | Mitigation |
|---|---|
| Store noise breaks recognition | Push-to-talk, short phrases, one-tap confirm card, tap fallback |
| Clients feel recorded | Push-to-talk only; audio discarded |
| Staff still shout at peak | Must beat shouting; stopwatch-tested in the pilot |
| Joule voice not GA until H2 2026 | Pilot via SAP's early adopter program [S30]; tap-first version works without voice |
| Noisy demand signal (one client asks 5 times) | Group by client session; allocator approves every move |

### Plan and success metrics

**Pilot:** 3–5 boutiques, 8 weeks, on Joule Work voice early access → scale after GA (H2 2026) [S30].

| Metric | Target |
|---|---|
| Floor requests logged (vs shouted) at peak | >80% [A] |
| Time from request to item in hand | −50% [A] |
| Unmet requests captured per store per week | Baseline set in pilot |
| Demand spike → approved transfer | Days, not weeks [A] |
| Weekly active Style Advisors and runners | >70% [A] |

**What we still need to validate:** whether unmet requests are logged anywhere today; how allocation decides transfers; whether advisors will speak to a phone in front of a client; whether other fashion retailers share the problem (our sample is 3 associates at one retailer).

---

## Sources

| ID | Fact used | Source |
|---|---|---|
| S2 | Retail Intelligence in SAP Business Data Cloud, GA H1 2026 | SAP News, "NRF 2026: SAP Builds AI Into the Core of Retail", Jan 2026 |
| S4 | Inventory distortion = 6.2% of retail sales; 65.6% of it out-of-stocks | IHL Group, 2026 Inventory Distortion Study |
| S6 | 52% of shoppers left a store without all the items they wanted | Zebra, 18th Annual Global Shopper Study |
| S11 | Aritzia on SAP ERP ECC 6.0 since 2008 | IT World Canada; Panaya case study |
| S17 | Aritzia FY26: $3.70B revenue, 65% boutiques, 144 boutiques, 44.9% gross margin | Aritzia Q4 & FY2026 results, May 7, 2026 |
| S18 | 2023 inventory "earlier and heavier than planned"; FY24 gross margin 38.5% | CBC; Vancouver Is Awesome |
| S20 | Off-shift work messages are compensable time for US hourly staff (FLSA) | Super Lawyers |
| S24 | SAP Mobile Start push notifications from Fiori apps | SAP Community (SAP-authored) |
| S25 | Clienteling vendors Tulip, NewStore | Tulip press release; NewStore |
| S27 | Me@Walmart: work features only while on the clock | HR Dive |
| S28 | Walmart Ask Sam: 900k associates, 3M+ questions a week | TechCrunch; Walmart corporate |
| S29 | Theatro: ~12% associate time saved (vendor claim) | Retail TouchPoints; PR Newswire |
| S30 | Joule Work voice with LiveKit: Sapphire May 2026, GA H2 2026, frontline focus | SAP Sapphire 2026 Innovation News Guide; LiveKit |
| S32 | SAP ECC mainstream maintenance ends Dec 31, 2027 | SAP Community (SAP-authored) |
| S33 | SAP Business Data Cloud unifies SAP and third-party data for AI and analytics | SAP News, Feb 2025 |
| [I] | Interviews: 3 store associates at Aritzia, informal group conversation, Oct 18–19, 2026; anonymous; notes paraphrased except quotes | Team primary research |

Full URLs and verification status: [research/sources.md](../research/sources.md).

---

## Notes for the team (not for the PDF)

- **Before submitting, confirm in a browser:** S4 (IHL blocked automated fetch), S6 (Zebra PDF page number), S18 (FY24 margin in Aritzia's annual report). They are cited as Secondary.
- **Not cited on purpose:** S31 (speech-recognition noise benchmark, weak vendor blog), S16 (competitor roundups, weak), S9 (single anecdote). The "27 days for a demand signal to reach the warehouse" figure stays out.
- **Left out for privacy:** app ratings, the fraud anecdote, interviewee initials, the store location.
- **Biggest assumptions** (most likely to be challenged at the Summit): 5–10% recovery of out-of-stock losses, 0.1–0.25 point margin lift, $1,500/store/month price. The break-even line exists so the case holds even if these are off by a lot.
- **CMT** is named as Aritzia's app per Cherry (Oct 20). The PDF never says CMT is built by SAP; that's still unconfirmed [I].
- **Suggested visuals:** page 1 = before/after split of the fitting-room scene (matches the video); business case = a cost vs benefit bar with the break-even line.
