# Why doesn't CMT notify staff?

Oct 19. Research into whether the lack of notifications in Aritzia's CMT app is a bug or a design decision. Source IDs refer to [sources.md](sources.md).

## Bottom line

**No public source explains it.** We found nothing about CMT online (no app store listing, Reddit threads or vendor case study). Only Aritzia employees can tell us. The research does show that **notifying hourly staff on personal phones carries real legal and design costs**, which makes "leave it out" a plausible deliberate choice. Meanwhile **the technology clearly exists**: SAP's own mobile platform supports push, and Walmart solved the same problem by limiting work features to on-shift time.

## What we know about CMT

- Installed on **every employee's personal phone** (except most Boutique Associates) [I].
- No notifications; staff must refresh manually [I].
- Data sometimes doesn't load until someone mentions it out loud [I]. This is a separate reliability problem and does look like a bug.
- Josh's feedback opens with "first impression", which suggests retrieve may be a **new feature** [I, our inference].
- Associates say it "runs on SAP" [I]. Unconfirmed whether it's SAP-built, a third-party clienteling app (vendors such as Tulip and NewStore exist [S25]) or built in-house.

## Possible reasons, with evidence

### 1. Legal risk of alerting hourly staff on personal phones (strongest)

| Jurisdiction | Rule | Relevance |
|---|---|---|
| United States (federal) | Under the FLSA, time non-exempt employees spend reading or responding to work messages off shift is generally compensable; the "de minimis" exception fails when contact is routine. Courts have held 10 minutes a day is not de minimis [S20] | ~62% of Aritzia's revenue is US [S17]. A retrieve alert reaching an off-shift associate creates unpaid-work exposure across a large hourly workforce |
| California | Labor Code 2802: employers must reimburse a reasonable share of personal phone bills when employees must use them for work (*Cochran v. Schwan's*, 2014) [S21] | Requiring CMT on personal phones already raises this. More notifications means more work use of personal devices. *Assumption: Aritzia operates California boutiques; confirm* |
| Ontario | Employers with 25+ employees must have a written "disconnecting from work" policy (Working for Workers Act, 2021). It doesn't ban contact but requires stated expectations [S22] | Aritzia has Ontario boutiques; notification design must match its policy |
| British Columbia | No right-to-disconnect law; the province said in 2022 it had no intention of following Ontario [S23] | Lower risk at home stores, but rules differ across Aritzia's markets |

**Why this suggests a deliberate choice:** notifications would only be safe if CMT knew who is on shift right now. That means integrating with scheduling and time-clock systems. Without that integration, the cheapest safe option is no notifications.

### 2. The technology isn't the blocker

- **SAP supports push.** SAP Mobile Start sends push notifications to iOS and Android from SAP Fiori apps, after a one-time admin setup of the notification channel [S24].
- **Web apps are limited on iPhone.** If CMT is a web app rather than a native one, iOS only allows push when it's installed to the home screen, and delivery is less reliable [S26]. This could be a contributing reason if CMT is browser-based.

### 3. Others solved it by gating work features to shift time

Walmart's Me@Walmart app (scheduling, clock-in, tasks, push-to-talk, voice assistant) makes **work features available only while associates are on the clock** [S27]. The same pattern would remove reason 1 for CMT.

### 4. Who should get the alert? (unverified)

A retrieve request goes to a role (Atelier Operations), not a person. Notifying everyone creates noise; notifying the right person needs to know who's on duty and where. General research on alert fatigue says too many alerts make people ignore all of them [weak source; use only as background].

### 5. Floor culture (unverified)

Aritzia staff are expected to keep "hands busy" and focus on clients [I]. Phone alerts pull attention away from the client. This could argue against notifications, though staff currently stare at the app refreshing it, which is worse.

## What this means for our product

Design requirements that turn these constraints into strengths:

1. **On-shift only.** Notifications and work features activate on clock-in and stop on clock-out (the Walmart pattern). This removes FLSA and disconnect-policy exposure.
2. **Route to one person, then escalate.** Each request goes to whoever is on duty in that zone; if unclaimed after ~30 seconds, it goes to the next person.
3. **Quiet alerts while with a client.** Haptic or smartwatch tap, never sound.
4. **Built on SAP Mobile Start / Fiori notifications**, so it uses infrastructure SAP already sells.
5. **Optional company device**, for staff who don't want work apps on their own phone (also addresses the California reimbursement issue).

## Questions for Dora's group

- Is retrieve in CMT new? Was it a pilot?
- Is installing CMT on your personal phone required? Does the company pay toward your phone bill?
- Is anything said about using CMT off shift? Does it log you out at clock-out?
- Is CMT from the App Store, a company install, or does it open in a browser? Does it say SAP anywhere?
- Has management said why there are no notifications, or that they're coming?
