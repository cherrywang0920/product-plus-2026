#!/usr/bin/env node
// Lay sound onto a finished edit: quiet paper sound effects on the moments of your rendered clips, and
// light music under it all that dips under the voice. For when the user has already cut the video in an
// editor (CapCut, Premiere…) from clips you rendered, possibly retimed, trimmed or reused, and
// re-inserting audio clip by clip would be painful.
//
//   node sound-onto-export.mjs --export edit.mp4 --clips out/clips --cues cues.mjs --foley audio/foley --out out/sound
//   options: --only sfx|music   --music-db -15   --sfx-db -6
//   (defaults = the mix Orizuru's Part 3 shipped with: music 15 dB under the voice while talking, a little
//   more in the pauses; paper peaks 6 dB under the voice's loud peaks, which reads as "barely there")
//
// How it finds the moments: every frame of the export is matched against every frame of every clip in
// --clips (64×36 grayscale thumbnails, mean abs difference < 8). So a cue written in a clip's own seconds
// lands on the edit frame that shows that moment, at any speed, and once for every time the clip is used.
// Clip ids are file names without .mp4 (a trailing " 2" from a duplicate file is dropped).
//
// --cues is a JS module (see cues-example.mjs):
//   export default {
//     sfx: [ [clipId, seconds | [seconds…], 'fold'|'land'|'page'|'settle'|'touch'|'shutter', gain?, pan | [pans…]?], … ],
//     music: {
//       bpm: 96, transpose: 0,                 // E major by default; transpose in semitones
//       anchors: [[clipId, sec], …],           // the chord cycle restarts on I here (story turns)
//       accents: [[clipId, sec], …],           // a soft celesta pair (a key word turning red, a dot)
//       home: [clipId, sec],                   // V before it, then home on I, ringing out to the end
//       thin: [[from, to], …],                 // edit seconds to play thinner (live action, someone on camera)
//     },
//   };
// The paper sounds are cut from two Mixkit recordings (free license, no credit), put in --foley once:
//   mixkit-2379.mp3  https://assets.mixkit.co/active_storage/sfx/2379/2379-preview.mp3  ("Papers being moved")
//   mixkit-1104.mp3  https://assets.mixkit.co/active_storage/sfx/1104/1104-preview.mp3  ("Page turn single")
// Ask the user before downloading them. touch, settle and shutter are synthesized and need nothing.
//
// Writes to --out: music-sfx.wav (one track, drop it at 0:00 in the editor), music.wav, sfx.wav,
// with-sound.mp4 (the export with it mixed in, to listen to), cues.txt (where each sound landed),
// clips.txt (where each clip sits in the edit), levels.txt (voice / music / sfx, measured).
// ffmpeg: $FFMPEG, else `ffmpeg` if it runs, else `npx remotion ffmpeg` (works in any Remotion project).

import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// ---------------------------------------------------------------------------- args
const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > 0 ? process.argv[i + 1] : d; };
const EXPORT = arg('export'), CLIPS = arg('clips'), CUESF = arg('cues'), FOLEY = arg('foley'), OUT = arg('out', 'out/sound');
const ONLY = arg('only'), MUSIC_DB = Number(arg('music-db', -15)), SFX_DB = Number(arg('sfx-db', -6));
if (!EXPORT || !CLIPS) throw new Error('usage: --export edit.mp4 --clips <dir of rendered clips> --cues cues.mjs [--foley dir] [--out dir]');
const CUES = CUESF ? (await import(pathToFileURL(path.resolve(CUESF)).href)).default : {};
fs.mkdirSync(OUT, { recursive: true });
const SR = 44100, FPS = Number(arg('fps', 30));

const FF = (() => {
  if (process.env.FFMPEG) return [process.env.FFMPEG];
  if (spawnSync('ffmpeg', ['-hide_banner', '-version'], { stdio: 'ignore' }).status === 0) return ['ffmpeg'];
  return ['npx', 'remotion', 'ffmpeg'];
})();
const ff = (args) => execFileSync(FF[0], [...FF.slice(1), '-v', 'error', ...args], { maxBuffer: 1 << 30, stdio: ['ignore', 'pipe', 'ignore'] });

// ---------------------------------------------------------------------------- 1. find the clips
// image2pipe + rawvideo: Remotion's minimal ffmpeg has no rawvideo muxer and no fps filter, but this works.
const W = 64, H = 36, P = W * H;
const thumbs = (file) => ff(['-i', file, '-an', '-vf', `scale=${W}:${H},format=gray`, '-c:v', 'rawvideo', '-f', 'image2pipe', '-']);
const sig = (buf, off) => {
  const s = new Float32Array(144);
  for (let by = 0; by < 9; by++) for (let bx = 0; bx < 16; bx++) {
    let a = 0; for (let y = 0; y < 4; y++) for (let x = 0; x < 4; x++) a += buf[off + (by * 4 + y) * W + bx * 4 + x];
    s[by * 16 + bx] = a / 16;
  }
  return s;
};
console.log('reading the edit…');
const edit = thumbs(EXPORT);
const NE = edit.length / P, END = NE / FPS; // assumes a 60 fps export; for 30 fps set FPS above
const clips = {};
for (const f of fs.readdirSync(CLIPS).filter((f) => f.endsWith('.mp4'))) clips[f.replace(/\.mp4$/, '').replace(/ \d+$/, '')] = thumbs(path.join(CLIPS, f));
const cand = [];
for (const [id, b] of Object.entries(clips)) for (let i = 0; i < b.length / P; i++) cand.push({ id, i, s: sig(b, i * P) });
console.log(`matching ${NE} edit frames against ${cand.length} clip frames…`);
const match = [];
for (let e = 0; e < NE; e++) {
  const se = sig(edit, e * P);
  let best = 1e18, bi = -1;
  for (let k = 0; k < cand.length; k++) {
    const s = cand[k].s; let d = 0;
    for (let j = 0; j < 144; j += 3) { d += Math.abs(s[j] - se[j]); if (d > best) break; }
    if (d < best) { best = d; bi = k; }
  }
  const m = cand[bi], b = clips[m.id];
  let full = 0; for (let j = 0; j < P; j++) full += Math.abs(b[m.i * P + j] - edit[e * P + j]);
  match.push(full / P < 8 ? [m.id, m.i] : [null, -1]);
}
/** Clip `id` at its own `sec` → edit seconds, once per stretch of the edit the clip appears in. */
function atAll(id, sec) {
  const f = Math.round(sec * FPS), out = [];
  let inRun = false, found = false, gap = 0;
  for (let e = 0; e < NE; e++) {
    const [c, i] = match[e];
    if (c === id) {
      if (!inRun) { inRun = true; found = false; }
      gap = 0;
      if (!found && i >= f && i <= f + 45) { out.push(e / FPS); found = true; }
    } else if (inRun && ++gap > 6) inRun = false;
  }
  return out;
}
const at = (id, sec) => atAll(id, sec)[0] ?? null;
const mmss = (t) => `${Math.floor(t / 60)}:${(t % 60).toFixed(2).padStart(5, '0')}`;
{ // clips.txt: where each clip sits in the edit (runs under 0.3 s left out). A plain white or black frame
  // matches whichever clip starts on one, so a white gap can show up under that clip's name.
  const rows = [];
  let cur = null;
  const flush = () => { if (cur && (cur.e1 - cur.e0) / FPS >= 0.3) rows.push(`${mmss(cur.e0 / FPS)}–${mmss(cur.e1 / FPS)}  ${cur.id ?? '(not one of the clips: footage or titles)'}${cur.id ? `  (clip ${(cur.i0 / FPS).toFixed(2)}–${(cur.i1 / FPS).toFixed(2)} s)` : ''}`); };
  match.forEach(([id, i], e) => {
    if (cur && cur.id === id) { cur.e1 = e; if (id) { cur.i0 = Math.min(cur.i0, i); cur.i1 = Math.max(cur.i1, i); } return; }
    flush(); cur = { id, e0: e, e1: e, i0: i, i1: i };
  });
  flush();
  fs.writeFileSync(path.join(OUT, 'clips.txt'), rows.join('\n') + '\n');
}

console.log(fs.readFileSync(path.join(OUT, 'clips.txt'), 'utf8'));
