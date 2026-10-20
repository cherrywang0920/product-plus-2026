# Omnichannel app: problems to explore

Oct 19. Based on 3 Aritzia associates ([interview note](interviews/2026-10-19-aritzia-store-team.md)) plus public context ([aritzia.md](aritzia.md)). Thin evidence: treat each as a hypothesis.

**Why Omni matters for the case:** Omni is where a store responds to demand from other channels: online orders (BOPIS, ship-from-store) and stock transfers between stores. Digital was 41% of Aritzia's Q4 FY26 revenue [S17]. When Omni fails, the business fails to respond to demand it has already captured.

## Problems

| # | Problem | What we heard | Why it matters | Product experience to explore |
|---|---|---|---|---|
| 1 | **Orders the store can't fulfil** | Orders appear but "never come"; items in returns processing are hard to find | The system thinks stock is there; staff can't find it. The order is cancelled or rerouted late, and the online customer is let down | One-tap "can't find it" that reroutes the order to another store immediately and corrects the store's stock count. The correction also improves future routing |
| 2 | **Too few devices for the order volume** | Omni runs only on ~3 shared work phones per store | Online orders wait for a free device. Online peaks (launches, sales) hit at the same time as busy store hours | A fulfilment queue ranked by promised pickup or ship time; routing that avoids sending ship-from-store orders to stores that are swamped |
| 3 | **Error-prone picking and checking** | Wrong items still scan; one error breaks the app; confusing checks; laggy devices (3/10, 5/10) | Mis-picks, restarts, slower fulfilment | Guided picking with clear stops on wrong scans, and recovery from errors without restarting |
| 4 | **Fraudulent BOPIS orders** | Fake-card buy-online-pick-up-in-store orders | Fake orders hold real stock that walk-in or online customers could have bought, and they distort demand data | Risk flag before staff pick; automatic release of held stock if pickup doesn't happen |
| 5 | **End-of-day close** | No way to shut down when order fulfilment closes; app must stay on overnight | Next-day errors; staff time | Proper close-out with a summary of what's outstanding |
| 6 | **Store-to-store transfers** | Mentioned as an Omni task; no detail yet | Transfers are how stock moves to where demand is. If they're slow, the response to a local demand shift is slow | Unknown until we ask |

## Most relevant to the case

**#1 and #2.** Both are about the business failing to act on demand it already has, both are measurable (fulfilment rate, cancellation rate, time until a BOPIS order is ready), and both apply to any SAP fashion retailer offering BOPIS and ship-from-store.

#1 also ties into the CMT finding. **The store's stock record doesn't match what's physically findable**, whether a client on the floor or an online order is asking. A product that keeps store stock accurate, from the people who touch it, helps both.

## Questions for Dora's group

- What does "orders never come" mean? The order shows on the device but can't be found in the store? Or it never appears at all?
- How often does an online order get cancelled or rerouted because the item can't be found? Per day or week, roughly.
- When an online order lands during a busy period, how long does it wait before someone picks it?
- How do store-to-store transfers work? Who asks for them, how long do they take, and does anyone tell the store why?
- When something can't be found, does anyone correct the stock count? How?
