# Product ideas: the store floor as a demand sensor

Oct 19. Every idea follows the same pattern:

1. **Staff get a tool they want**, because it makes their own job faster. That's what gets them to adopt it.
2. **The tool records a demand signal as a side effect**, one that sales data misses.
3. **The signal goes to the person who can act on it**, with an AI-drafted action that a person approves.
4. **It plugs into SAP** (Customer Activity Repository, Unified Demand Forecast, Retail Intelligence, Joule) as a new input.

Evidence tags: **[I]** heard in interviews, **[P]** public source, **[A]** our assumption.

---

## A. Unmet-request capture (current lead)

- **Staff tool:** fast retrieve requests for Style Advisors, with voice input and notifications.
- **Signal:** sizes and colours asked for but not in stock; whether the client took a substitute.
- **Acted on by:** allocators. Suggested store transfers and reorders.
- **Evidence:** retrieve requests run through CMT [I]; no notifications [I]; staff skip it at peak [I].

## B. Fitting-room signal: tried on, didn't buy

- **Staff tool:** a fitting suite board for Atelier Sales (AS). It shows what's in each suite and lets them request another size with one tap. They already move clients into suites in CMT [I].
- **Signal:** try-on-to-purchase rate by style, and why clients said no (runs small, colour, fabric).
- **Acted on by:** merchandising and buying. Fix the **size mix** on reorders, update online fit notes, catch a fit or quality problem in week 1 instead of when the markdowns start.
- **Why it matters:** buying the wrong size mix causes stock-outs in some sizes and markdowns in others at the same time [A]. Aritzia's 2023 margin drop was driven by markdowns on the wrong inventory [P, S18].
- **Risk:** clients may see it as surveillance. Record products, not people.

## C. "Notify me" waitlist for sold-out sizes

- **Staff tool:** a Style Advisor adds the client to a waitlist for the exact item and size in CMT. When stock arrives, the same Style Advisor is told and follows up. It turns a lost sale into a future one, which fits Aritzia's clienteling model.
- **Signal:** *countable* unmet demand, with contact details attached: "214 people waiting for item X in size 4 across 9 stores."
- **Acted on by:** allocators and buyers. Waitlist size justifies a transfer or reorder, and they can measure how many waitlisted clients convert.
- **Why it matters:** the easiest benefit to put a number on (sales recovered) [A]. Simpler to build than A or B.
- **Check:** Aritzia may already have a back-in-stock email online. If so, the new part is the in-store, Style Advisor-driven version and its feed to allocation.

## D. Returns back to the floor, fast

- **Staff tool:** a prioritized returns-processing queue. Items clients are asking for, or that online orders need, go back to sellable stock first.
- **Signal:** how long returned stock takes to become sellable; return reasons by style.
- **Acted on by:** store managers (staffing) and merchandising (repeat return reasons point to fit or quality problems).
- **Evidence:** items "stuck" in returns processing make requests fail even when stock is in the building [I]. Ties into the Omni findings ([omni-problems.md](omni-problems.md)).

## E. Demand-aware task list for floor operations

- **Staff tool:** for Atelier Operations (AO) and Boutique Associates (BA), a live list of what to bring to the floor or restock next, ranked by what's selling and being asked for right now, instead of a fixed routine.
- **Signal:** which items empty from the floor fastest during the day; where the team is short-staffed.
- **Acted on by:** store managers (staffing levels) and allocators.
- **Evidence:** CMT feels like it needs 3 people in AO, but quiet days are scheduled with 1 [I].
- **Weaker for the case:** mostly a store-efficiency tool; the link to head office is thinner.

---

## Comparison

| Idea | Fits the case | Evidence so far | Easy to value | Easy to prototype |
|---|---|---|---|---|
| A. Unmet requests | High | Medium (interviews) | Medium | High |
| B. Fitting room | High | Low (none heard yet) | Medium (markdowns) | Medium |
| C. Waitlist | High | Low | **High** (sales recovered) | **High** |
| D. Returns to floor | Medium | Medium (interviews) | Medium | Medium |
| E. Floor tasks | Medium-low | Medium (interviews) | Low | High |

## Suggested direction

**Make A the core and C the feature that delivers measurable value.** The same Style Advisor flow handles both: *request it → not in stock? → add the client to a waitlist*. The waitlist turns unmet demand into a number head office trusts and gives the business case a figure for recovered sales. Put B, D and E on the roadmap ("the store floor becomes SAP's demand sensor"), which also answers the Summit question about how the product grows.
