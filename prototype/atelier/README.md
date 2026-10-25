# Atelier, by Joule — Prototype

Product+ 2026 · Dora Hu, Brady Spur, Cherry Wang

Static site, no build step. Works on GitHub Pages as-is.

| Path | What it is |
|---|---|
| `index.html` | Landing page linking the two prototypes |
| `dashboard/index.html` | **Atelier Demand Signal** dashboard in the SAP Analytics Cloud (Fiori Horizon) style. Single self-contained file: the SAP 72 font is embedded and all interactions are plain JavaScript. Interactive: story page tabs, signal-type filter chips (highlight the weekly chart and filter the anonymized snippets), and an in-page link to the anonymization steps. |
| `earpiece/index.html` | Interactive 3D viewer of the earpiece (three.js 0.147.0 from the jsDelivr CDN). Orbit/zoom, camera views, part toggles, shell finishes, a head reference for fit, and the five status-light scenes. Needs an internet connection for the CDN. |
| `earpiece/models/atelier-earpiece-final.glb` | Final model for PowerPoint. Skeletal animation, 5 scenes: **Off**, **Power On** (green), **Hey Joule** (big button → blue), **Green**, **Blue**. Each scene holds its end state for 60 s. Insert → 3D Models → This Device, then 3D Model → Scenes. |
| `earpiece/models/atelier-earpiece-still-*.glb` | Non-animated versions (light off / light green). |
| `earpiece/models/atelier-earpiece.stl` | Print file in millimetres (older revision with the cable). |
| `earpiece/source/` | Model source: `builder.js` builds the earpiece procedurally in three.js (mm units, worn on the right ear: +Z outward, +X toward the face). `export-final.html` + `tools/export-final-run.js` regenerate the final GLB in a headless browser (the glowing lights use canvas textures). Older Node exporters are kept for reference. |

## Run locally

Open `dashboard/index.html` directly in a browser (works offline). For the earpiece viewer, serve the repo, e.g. `python3 -m http.server`, then open http://localhost:8000/earpiece/.

## Regenerate the final GLB (optional)

```bash
cd earpiece/source
npm install
python3 -m http.server 8767 &   # serves export-final.html and node_modules
node tools/export-final-run.js /tmp   # writes ../models/atelier-earpiece-final.glb, check frames in /tmp
```

## Notes

- Sample data only. Not real Aritzia figures. No SAP logo is used.
- Theme tokens and the 72 font come from SAP's open-source `@sap-theming/theming-base-content` package (Apache-2.0).
