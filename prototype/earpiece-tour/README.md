# Earpiece walkthrough (3D, scroll-driven)

A scroll-driven walkthrough of the Atelier, by Joule earpiece for the Summit pitch:
scrolling moves the camera between the three controls an associate touches on a shift,
and the controls actually actuate — the power button presses and the indicator light
comes up, the volume dial turns, the mute button presses and the light goes amber.

Built from Cherry's `atelier-earpiece.glb`. Shows the wearable half only; the cable and
3.5 mm jack are hidden (`Cable.visible = false`) because they crowded the 27 mm ear unit.

## Just want to look at it?

Published here: https://claude.ai/code/artifact/49081cde-0a3d-4181-b838-0edc319b7c78

## Run it locally

`dist/` is committed, so you do **not** need Node to view this. From the repo root:

```bash
python3 -m http.server 4321 --directory prototype/earpiece-tour/dist
```

Then open http://localhost:4321/dev.html. It needs to be served over http — opening
the file directly won't work, because the page loads as an ES module.

To change anything, rebuild after editing `src/`:

```bash
cd prototype/earpiece-tour && npm install && npm run build
```

`dev.html` is the local page. `index.html` is the same content as a body-only fragment
for publishing, so it has no `<html>`/`<head>` shell — don't open that one directly.

## Editing the writing

**All the copy is in `src/page.html`**, in the seven `<section class="plate">` blocks near
the bottom of the file. Nothing in `src/main.js` needs touching to change words.

```bash
# edit src/page.html, then:
node build-html.mjs          # no npm install needed
```

Reload the page. Use `npm run build` only if you changed `src/main.js`.

| Section | Line | Eyebrow |
|---|---|---|
| Hero | ~421 | The hardware |
| Anatomy | ~432 | Anatomy |
| Power + light | ~441 | Control 01 · Clock-in |
| Volume dial | ~451 | Control 02 · Set level |
| Mute | ~461 | Control 03 · Mute |
| In use | ~471 | In use |
| Close | ~484 | And then |

Each block uses the same set of pieces — keep the classes and the design holds:

| Class | What it is |
|---|---|
| `.eyebrow` | Small blue label above the heading |
| `<h1>` / `<h2>` | The headline. `<h1>` only on the hero |
| `.lede` | Slightly larger opening paragraph |
| `.body` | Normal paragraph. `<strong>` inside it goes full-contrast |
| `.spec` | Monospace facts row, divided by a rule. Each fact is its own `<span>` |
| `.note` | Call-out box. Add `note--signal` for the amber version |
| `.say` | The quoted exchange — `.say__who` is the speaker tag, `.say__txt` the line |
| `.chain` | The arrow sequence at the end |

Two things live elsewhere:

- **Callout names on the 3D model** ("Ear hook", "Mute", …) are the `text` fields in the
  `LABELS` array at the top of `src/main.js`.
- **How long a section lasts** is `style="--h:310svh"` on its `<section>`. The card stays
  pinned for `--h` minus one screen, then slides away over the last screen. So `--h:310svh`
  pins for about 2.1 screens of scrolling. Raising it gives you longer on that control;
  the camera and the button presses retime themselves off it, so nothing desyncs.
  Don't go below about `140svh`, or there's barely any pinned phase left.

Use `&rsquo;` for apostrophes, `&mdash;` for em dashes, `&middot;` for the dot separator.

| File | What it is |
|---|---|
| `src/page.html` | Page content, copy and all CSS. Published as `dist/index.html`. |
| `src/main.js` | Three.js scene, camera choreography, control animation. |
| `public/atelier-earpiece.glb` | The model. |
| `build.mjs` | esbuild bundle + file copy. No dev server, no framework. |

## How the scroll timeline works

Each section has **two phases**, and the writing is pinned for the first one:

1. **Pinned.** The card sticks in place and the camera holds on the part, while the control
   actuates. This lasts `height − one viewport` of scroll.
2. **Hand-off.** The card slides away, the next one rises, and the camera travels to the
   next part. This lasts exactly one viewport of scroll.

So every press, sweep and colour change finishes while its text is still on screen.

Everything keys off one scalar, `u`: its integer part is the active step, its fraction is
progress through that step. Scrolling back up replays the whole thing in reverse, which is
why nothing is written as a one-shot animation. Within a step, `pinProgress()` rescales
that to 0→1 across the pinned phase, and the animations are written against *that* — which
is why they stay in sync when a section's length changes.

| Step | Track | Pinned | What actuates while pinned |
|---|---|---|---|
| 0 Hero | 150svh | 33% | slow camera sway |
| 1 Anatomy | 230svh | 57% | seven callouts projected from true part coordinates |
| 2 Power | 250svh | 60% | button presses, light comes up and stays lit |
| 3 Volume | 270svh | 63% | dial sweeps 4 → 9, settles at 6 |
| 4 Mute | 310svh | 68% | presses → amber, holds, presses again → live |
| 5 In use | 220svh | 55% | the hand-off exchange |
| 6 Close | 170svh | 41% | final frame, stays put to the end |

## Coordinates

Camera targets and callout anchors in `main.js` are **true world-space coordinates in
metres**, measured out of the GLB rather than eyeballed, so framing stays locked to the
real parts. The GLB is authored in millimetres with a 0.001 scale on the root, so part
positions inside `EarUnit` are in millimetres — which is why button travel reads as
`0.95` (mm), not `0.00095`.

Key parts, in world metres:

| Node | Centre | Notes |
|---|---|---|
| `PowerButton` | 0.0195, 0.1055, 0.0025 | top face, presses along −Y |
| `StatusLED` | 0.0232, 0.1006, 0.0063 | 1.4 mm emitter, protrudes 0.4 mm |
| `VolumeDial` | 0.0130, 0.0960, 0.0075 | ring, rotates about world Z |
| `MuteButton` | 0.0130, 0.0960, 0.0074 | 10 mm disc, concentric inside the dial, presses along −Z |

## Debug hooks

Available in the console on any build:

- `__tour()` — current `u`, scroll anchors, and the device's projected screen bounds (for checking framing)
- `__look({env, key, fill, rim, exposure})` — retune the lighting live

## Notes

- The matte-black finish is pinned in `FINISH` in `main.js`. The GLB's own near-black
  factors washed out grey under a full studio environment, so shell, button, rubber and
  foam are set explicitly; only the chrome accents stay metallic.
- Lighting is mostly `RoomEnvironment` (procedural, no external HDR) with weak
  directionals for edge definition — the artifact CSP blocks any external asset.
- Respects `prefers-reduced-motion`: no sway, no LED breathing, no waveform animation.
