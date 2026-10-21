# Video clips (Remotion)

Coded shots for the 60-second video in [../video-script.md](../video-script.md): the deck scenes, and the overlays drawn on top of our footage. One clip per shot, 1920×1080, 25 fps (same as the footage), for cutting together in CapCut with the voice-over.

Footage and renders are **not in Git** (`public/footage/`, `out/` are ignored).

## Clips (`out/clips/`, copied to `~/Desktop/ubc/video/coded-clips/`)

| Clip | Script row | Source take | What's on it |
|---|---|---|---|
| `s01-hook` | 1 | deck | Counter to ~$100M / year, estimate footnote with sources |
| `s02-cmt-no-alert` | 2–4 | `shot2` | "Meet Dora · Atelier Operations (AO)" card explaining the role; caption for the off-camera client ("Could you grab me a size 6?"); CMT mock-up phone (typed request → sent → "no one notified"); red "Atelier leaves the rooms" at the walk-off |
| `s03a-runner-hands-full` | 3 | `shot3.1` | "Brady · runner · hands full"; interview quote card |
| `s03b-pocket-0-notifications` | 3 | `shot3.2` | Red "0 notifications" on the pocketed phone (take's sound muted) |
| `s04-walk-out-nothing-recorded` | 4 | deck | CMT request card: wait ticks up, client leaves, "Recorded outcome: Nothing"; "Sale lost." |
| `s06a-hey-brady` | 5–6 | `shot 6` | "Now, with Atelier, by Joule" title; earpiece glow; Dora's line as a bubble; "Logged in CMT" card |
| `s06b-ear-out` | 6 | `shot6.1` | Sound waves leave Dora's earpiece; "Only Brady hears it" |
| `s06c-ear-in-hey-joule` | 6–7 | `shot6.2 and 7.1` | Waves land in Brady's ear; "New request" card; "Hey Joule, do we have it?" |
| `s07-joule-stock` | 7 | `shot7` | Joule's answer; live-stock card (S/4HANA) |
| `s08a-navy-okay` | 8 | `shot8.1` | "Hey Dora, navy okay?" |
| `s08b-navy-perfect` | 8 | `shot8.2` | "Navy's perfect." + "Substitute accepted · logged" |
| `s09a-handoff-long` | 9–10 | `shot9.1` | "On its way" card; three ticks at the hand-off |
| `s09b-handoff-short` | 9–10 | `shot9.2` | Same, for the shorter take (pick one) |
| `s11-demand-data` | 11 | frozen `shot9.2` | Tags lift out and fly into SAP Business Data Cloud |
| `s12-dashboard` | 12 | deck | Analytics Cloud-style view (**illustrative data**, labelled); Joule drafts a transfer, allocator approves; BTP pricing chips |
| `s13-end` | 13 | deck | Logo, tagline, SAP products, team |

Film clips run the full take with the take's own sound; trim in the editor. Bubbles reveal word by word timed to the measured dialogue in each take.

## The finished cut and its sound

- `final-cut` (composition) rebuilds Cherry's CapCut draft (`draft1.mp4`) from the rendered clips: the cut list is `src/edit.json`, found by matching the draft's frames to the clips (`scripts/match-edit.mjs`).
- `scripts/sound-design.mjs` writes the soundtrack for that cut (`out/sound/`): music with a tense pulse that drops into a beat on "Atelier, by Joule"; UI sound effects on the on-screen moments. The music ducks under the dialogue, measured from the draft's audio.
- `scripts/master.mjs` lifts the final mix 5 dB with a peak limiter at −1 dBFS.

```bash
node scripts/sound-design.mjs && cp out/sound/soundtrack.wav public/audio/ && cp out/clips/*.mp4 public/clips/
npx remotion render src/index.ts final-cut out/final-cut-raw.mp4 --codec=h264 --crf=17
node scripts/master.mjs out/final-cut-raw.mp4 out/final-cut.mp4 5
```

## Change something

- **Timing:** every cue is one number in `src/timing.ts` (seconds from the start of that clip).
- **Words / layout:** `src/shots/FilmShots.tsx` (overlays) and `src/shots/DeckShots.tsx` (deck).
- **Colours / fonts:** `src/brand.ts`, matched to the PDF brief (navy, SAP blue, grey cards; Plus Jakarta Sans for titles and big numbers, Instrument Sans for text). Blue = Joule did this; red = the problem. The end card uses the product photo cropped from the brief (`public/img/atelier-product.png`).

```bash
npm install
npx remotion studio            # preview and scrub every shot
scripts/render-all.sh          # render all clips to out/clips/
scripts/render-all.sh s01-hook # or just one
```

Footage setup (once): copy the takes into `public/footage/` as `shot2.mp4`, `shot3-1.mp4`, … converted to H.264 (`npx remotion ffmpeg -i in.MP4 -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac out.mp4`); some phone takes are HEVC, which Remotion can't always decode.
