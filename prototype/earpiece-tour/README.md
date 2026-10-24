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

| File | What it is |
|---|---|
| `src/page.html` | Page content, copy and all CSS. Published as `dist/index.html`. |
| `src/main.js` | Three.js scene, camera choreography, control animation. |
| `public/atelier-earpiece.glb` | The model. |
| `build.mjs` | esbuild bundle + file copy. No dev server, no framework. |

## How the scroll timeline works

Everything keys off one scalar, `u`: its integer part is the active step, its fraction is
progress through that step. Scrolling back up replays the whole thing in reverse, which is
why nothing is written as a one-shot animation.

| `u` | Step | What actuates |
|---|---|---|
| 0 | Hero | slow camera sway |
| 1 | Anatomy | seven callouts projected from true part coordinates |
| 2 | Power | button presses at `u≈2.36`, light comes up at `u≈2.40` and stays lit |
| 3 | Volume | dial sweeps to 9, settles back to 6 |
| 4 | Mute | presses at `u≈4.22` → muted/amber; presses again at `u≈4.54` → live |
| 5 | In use | the AO → BA hand-off |
| 6 | Close | hand-off becomes data in SAP Business Data Cloud |

The camera holds on each part for the first ~62% of a step, then travels, so presses land
on a still frame rather than mid-move.

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
