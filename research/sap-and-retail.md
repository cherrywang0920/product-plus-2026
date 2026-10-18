# Research sprint: SAP and retail

First pass, Oct 18. Numbers in brackets like [S4] point to [sources.md](sources.md). Check the source's status before putting a number in the PDF.

## Key takeaways

- **SAP's retail customers are large chains** selling through stores, e-commerce and often wholesale: fashion and apparel brands (Nike, adidas, PVH, Ralph Lauren, Aritzia) and grocery and department store chains (Empire/Sobeys, Macy's). Our user should work at one of these, not at a small shop.
- **SAP already sells forecasting, replenishment and planning tools**, and in 2026 added Retail Intelligence (AI demand and inventory planning) and Joule agents. Pitching "a better forecast" would compete with SAP's own roadmap.
- **The evidence points to the step after the forecast.** Merchants spend about two-thirds of their time gathering data and firefighting [S7], and one fashion retailer took up to 27 days to pass a demand change to its warehouse [S9]. *Working hypothesis:* the slow part is people noticing, agreeing and acting.
- **The cost is large and mostly empty shelves:** inventory distortion is about $1.7T a year globally, about two-thirds of it out-of-stocks [S4].
- **Aritzia runs SAP** [S11], and we have a contact who recently interviewed there. Fashion is a strong first segment to test in interviews.

## Which retailers SAP works with

- **Fashion, apparel and footwear:** SAP has a dedicated product, S/4HANA for Fashion and Vertical Business. Listed users include Nike, Macy's, VF Corporation, PVH and Ralph Lauren; adidas Canada and US run SAP Apparel and Footwear [S15].
- **Grocery:** Empire Company (Sobeys) is moving 1,600+ stores onto S/4HANA [S12]. Landbase lists Retail, Manufacturing and Grocery Retail as the top industries using SAP for Retail.
- **Canadian fashion:** Aritzia has run SAP ERP (ECC 6.0) since 2008, mainly for finance, and implemented SAP for Retail tools for promotions and merchandise layout [S11].
- **Why fashion is hard:** one pool of inventory serves stores, e-commerce and wholesale, each with different delivery rules and deadlines [S13].
- **So what:** SAP customers have hundreds of stores, several channels and separate teams for merchandising, planning and store operations. Delays likely build up in the hand-offs between those teams.

## What SAP already sells for retail [S14]

| Tool | What it does |
|---|---|
| Customer Activity Repository (CAR) | One view of sales and customer activity across channels; feeds the planning tools |
| Unified Demand Forecast (part of CAR) | Demand models accounting for promotions, assortment changes, store openings; what-if scenarios |
| Predictive Replenishment | AI that calculates and places store orders; intraday forecasting; spoilage prediction for fresh food |
| Integrated Business Planning (IBP) | Aligns demand, supply and finance plans; short-term demand sensing |
| Merchandise Financial Planning | Plans sales, open-to-buy, margin and inventory by category |
| S/4HANA Cloud for retail, fashion and vertical business | Core ERP: pricing, promotions, procurement, store commerce |

**Gap to test:** these tools produce forecasts and plans. We have not found an SAP tool focused on *who acts* when a forecast changes, how fast, and whether the action happened. Assumption until checked against SAP docs and interviews.

## SAP's 2026 AI direction

- **Vision:** the "Autonomous Enterprise", software that helps businesses sense, decide and act in real time, with Joule as the AI copilot [S1].
- **NRF 2026 (Jan):** [S2]
  - *Retail Intelligence* in SAP Business Data Cloud: AI demand and inventory planning with simulations, H1 2026.
  - *AI-assisted assortment management:* planners create or change assortments in plain language through Joule.
  - *Order Reliability Agent:* flags order and fulfilment risks such as stock shortages and delivery delays, Q2 2026.
  - *Storefront MCP Server* (Commerce Cloud): makes storefronts readable by AI assistants.
- **2026 retail assistants:** a Merchandising Assistant that evaluates product performance against demand signals, and a Shopping Assistant for consumers [S3].
- **So what:** our product should plug into Joule and Business Data Cloud, not compete with them. Expect judges to ask how it differs from Retail Intelligence.

## Size of the problem

- Inventory distortion (out-of-stocks + overstocks) costs about **$1.7T a year**, **6.2% of global retail sales**, down from 10.4% in 2021 [S4].
- **65.6% out-of-stocks, 34.4% overstocks**; empty shelves alone are **$690.9B** [S4].
- Retailers spent **$172B** on improvements in the past year and the problem persists [S5].
- Almost half of retailers extended purchasing lead times in 2025 due to tariff uncertainty, buying about three months further ahead, raising overstock risk [S5].
- **52% of shoppers** left a store without everything they planned to buy in 2025, often because items were out of stock or hard to find [S6].
- Stock-outs cost about **4% of sales**; most come from store ordering and planning practices rather than suppliers [S10].

## Evidence of user pain

- Merchants spend **~two-thirds of their time** gathering data, managing exceptions, firefighting and in alignment meetings; one-third on strategy [S7].
- **71%** of merchants say AI merchandising tools have had limited or no effect so far; **61%** say their organization isn't ready to scale AI in merchandising [S7].
- Supply chain teams spend nearly **14 hours a week** tracking data by hand [S8].
- At one fashion retailer, a demand signal change took **up to 27 days** to reach warehouse teams [S9] (single example).
- **80%** of North American store associates say real-time out-of-stock visibility is a major challenge [S6].
- **Gap:** no first-hand accounts yet. Interviews should find where delays like the 27 days come from.

## Competitors [S16]

| Competitor | Positioning |
|---|---|
| Blue Yonder | Broad planning and supply chain suite; Demand Edge for Retail forecasts every SKU in every store |
| RELEX Solutions | Retail-focused planning: forecasting, replenishment, pricing, promotions, space |
| o9 Solutions | AI-native planning connecting functions across the business |
| Oracle Retail | Full merchandising, planning, pricing and store operations suite; SAP's closest ERP-level rival |

**So what:** all of them sell better forecasts, mostly to planning teams. Few appear to focus on the step from forecast to the people who act in stores and distribution centres (assumption, to check).

## Hypotheses to test in interviews

- **H1:** Fashion merchandisers see a demand shift (e.g. a style selling out in some stores) days before inventory moves, because review and allocation run on a weekly cycle.
- **H2:** Store teams notice local demand changes first (weather, local events, social media trends) but have no fast way to tell planners.
- **H3:** Alerts already exist, but there are too many and no one owns the follow-up, so important signals get missed.

For each interview, find out: who notices first, who decides, how long each step takes, which tool they use at each step.
