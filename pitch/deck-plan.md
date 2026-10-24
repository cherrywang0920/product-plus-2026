# Semis deck plan: the whole 8 minutes

Oct 23. One storyline for everyone's sections, so the problem, solution, demo and business parts set each other up. Section detail: business → [business-slides-plan.md](business-slides-plan.md); research and numbers → [research/semis-viability.md](../research/semis-viability.md).

## The one-sentence story

**Every day, Aritzia's floor hears demand that its forecasts never see. Atelier, by Joule turns that floor talk into SAP's earliest demand signal, and gives fashion retailers a reason to move to S/4HANA now.**

Every section has to serve this sentence. The Arena version told a communication story with data at the end. Semis tells a **demand story** where communication is how we capture it.

## What the judges said, and where the deck answers it

| Feedback | Answered in |
|---|---|
| Misread the case; expand beyond one customer | Problem (P2–P3) frames it as demand that never reaches planning; A2 and SAP-1 expand to fashion retailers on SAP |
| Tie features back to the problem | Solution (S2): each feature mapped to a pain **and** to the demand signal it creates |
| Not big enough for SAP's investment | SAP-1 to SAP-5: value to SAP by panel role, vs build cost |
| Keep: interviews, stats, video | Problem (P3) keeps quotes; hook reuses the video's characters |

## Running order (8:00)

Team structure (Oct 23): **problem → solution → implementation plan (prototype) → stakeholders → what it means to Aritzia / fashion retail → what it means to SAP.** Timings are a suggestion.

| Time | Section | Slides | Owner | Rubric |
|---|---|---|---|---|
| 0:00–0:20 | **Hook** | H1 | Problem owner | Presentation |
| 0:20–1:30 | **Problem** | P1–P3 | Dora / Brady | Problem Definition 20% |
| 1:30–2:20 | **Solution** | S1–S3 | Dora / Brady | Product Solution 20% |
| 2:20–4:50 | **Implementation plan + prototype demo** | live demo + pilot plan | Dora / Brady | Prototype 20%, Implementation 10% |
| 4:50–7:45 | **Stakeholders → Aritzia / fashion retail → SAP** | K1, A1–A2, SAP-1 to SAP-5 | Cherry | Stakeholder 20%, Solution (value vs cost), Implementation |
| 7:45–8:00 | **Close + ask** | C1 | Cherry | Presentation |

The SAP part is broken down by the four panel roles (strategy, finance, engineering, marketing), then a trade-offs slide. Detail: [business-slides-plan.md](business-slides-plan.md).

## One scenario through the whole deck

Same people, same item, start to finish, so the judges follow one thread:
- **Maya**, a Style Advisor in suite 3; **Dora**, a runner; **an allocator** at head office.
- **The Effortless pant, size 4, black.** It's out in this boutique.
- Hook: the client asks, Maya says "sorry", the demand disappears. Demo: the same request through Atelier, then the dashboard the next morning. Value section: that signal × 144 boutiques × fashion retailers on SAP.

## Slide by slide

### H1. Hook (20 s)
"A client asks for the Effortless pant in a 4. It's not here. Maya says sorry, the client leaves, and **head office never finds out** that anyone wanted it." One image, one line. Sets up "demand nobody sees".

### P1. "Our user: the associate who hears demand first" (25 s)
Style Advisors and runners on Aritzia's floor; the allocator who needs what they hear. Keep it to one specific user, as the rubric asks. The allocator is who receives the data, not a second persona.

### P2. "Today, floor demand dies on the floor" (30 s)
Current workflow as a flow: client asks → CMT on a phone (or shouting at peak) → found / not found → **nothing reaches planning**. Then planning only sees sales. Introduce **censored demand** in one plain line: "forecasts only count what sold, so they stay low exactly where stock ran out."

### P3. "Why this deserves priority" (30 s)
- Interview evidence: no notifications, phones clash with "keep hands busy", CMT skipped at peak [I]. Use two quotes.
- Cost: ~4% of sales lost to out-of-stocks [S4, C]; 1 margin point ≈ CAD $37M for Aritzia [C].
- **The bridge to the case:** the demand shift happens on the floor first, and today it's invisible.

### S1. "Insight: the floor already runs on voice, so record what it says" (15 s)
Shortened from the brief. Point voice at the right person, and log what's asked.

### S2. "Three features, each one a fix and a data source" (30 s)
| Feature | Pain it fixes | Demand signal it creates |
|---|---|---|
| Targeted voice requests | No notifications; shouting | What was asked for, where, when |
| Replies and hand-off | Not knowing if anyone heard | Outcome: found / not found |
| Every request → Business Data Cloud | Demand invisible to head office | Unmet demand by style, size, boutique, plus the reason |

Note what was left out and why (no phone app, no AI voice, no stored audio or transcripts).

### S3. "Why this beats the alternatives" (15 s)
CMT, radios, Theatro, Tulip, RFID fitting rooms, Retail Intelligence / Blue Yonder / RELEX. One column: **who captures the reason a sale didn't happen?** Only Atelier. Include RFID, because a judge may know it.

### Demo (2:30)
Two halves, continuing the hook scenario:
1. **Floor (~1:00):** Maya says "Dora, Effortless pant, 4, black, suite 3." Dora hears it and replies "we're out of the 4." It's logged.
2. **Head office (~1:30), the hero:** next morning, the dashboard shows requests for the size 4 spiking across boutiques with zero stock; sales data alone would show nothing. Joule drafts a transfer, the allocator approves. **End on the time gap:** "days, not weeks."

Optional, if time allows: the try-on vs conversion view (product vs placement problem).

### K1 → SAP-5. Stakeholders and value (~3:00)
See [business-slides-plan.md](business-slides-plan.md):
- K1 stakeholder map (Aritzia ring, SAP ring)
- A1 Aritzia pays back in year one; A2 every assisted-selling floor has the same blind spot
- SAP-1 strategy, SAP-2 finance, SAP-3 engineering, SAP-4 marketing, SAP-5 trade-offs + limitations

### C1. Close and ask (15 s)
**"Green-light an 8-week pilot in 5 Aritzia boutiques."** One callback to the hook: "next time Maya says sorry, head office will hear it."

## Consistency rules (everyone)

- Name: **Atelier, by Joule**. Never "Joule Floor".
- Same numbers everywhere; every figure from the viability doc or the brief, with its label `[S#] [I] [C] [A]`.
- Privacy line, word for word (draft, agree as a team): "Atelier listens for demand, not conversations: it keeps what was asked for and what happened, never the audio or who said it. The mic switches off anytime."
- Privacy and legal are presented in the **implementation section** (Dora / Brady): always-on, demand events only, employee consent documents at rollout, legal review.
- The brief told judges client talk is "never sent, never stored". We changed that, so **say why** before they ask: always-on is what captures censored demand.
- Don't claim "no other technology captures try-ons". Claim the **reason**.
- Currency: Aritzia case in CAD, SAP case in USD; say which on each slide.

## Q&A split (5 min)

| Question area | First answer | Backup |
|---|---|---|
| User, interviews, workflow | Dora | Brady |
| Feasibility, speech detection, architecture | Prototype owner | Cherry |
| Cost, ROI, pricing, SAP value | Cherry | |
| Privacy, legal, adoption, change management | Implementation owner | Cherry |
| Strategy, competitors, expansion | Cherry | Dora |

Prepared answers per judge role: [business-slides-plan.md](business-slides-plan.md#prepared-answers-one-per-panel-role). Problem/solution owners should add theirs.

## Decisions the team needs to make

- [ ] Agree the implementation split: prototype + pilot plan + pilot metrics (Dora / Brady) vs build phases, costs, SAP metrics (Cherry)
- [ ] Who owns the hook and the demo, and who builds the prototype (earpiece simulation + dashboard)
- [ ] Is the dashboard the demo hero? Recommended: yes, it's the part that answers the feedback
- [ ] Does P1 stay Aritzia-only, with expansion saved for A2 / SAP-1? Recommended: yes. The rubric wants a specific user; the judges want breadth, and A2 gives it
- [ ] Timed run-through by Oct 24 evening
