#!/usr/bin/env node
// Sound for the cut in draft1.mp4: music with a beat and UI sound effects, all synthesized here.
// The music ducks under the dialogue, measured from the draft's own audio.
//
//   node scripts/sound-design.mjs            → out/sound/{soundtrack,music,sfx}.wav + levels.txt
//
// Times are edit seconds in draft1. EDIT maps each clip to where it sits (from scripts/match-edit.mjs,
// clip seconds corrected for 25 fps clips in a 30 fps export), so cues are written in each clip's own seconds.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const SR = 44100, END = JSON.parse(fs.readFileSync('src/edit.json', 'utf8')).end, N = Math.ceil((END + 0.5) * SR), OUT = 'out/sound';
fs.mkdirSync(OUT, { recursive: true });

// clip id → [edit start, clip second at that start, clip second at its end], from src/edit.json (short ids: s06a…)
const CUT = JSON.parse(fs.readFileSync('src/edit.json', 'utf8'));
export const EDIT = Object.fromEntries(CUT.cuts.map(([id, e0, c0, c1]) => [id.split('-')[0], [e0, c0, c1]]));
const E = (id, c) => { const [e0, c0, c1] = EDIT[id]; return c < c0 - 0.01 || c > c1 + 0.01 ? null : e0 + (c - c0); };
const ACT2 = EDIT.s06a[0], ACT3 = EDIT.s11[0], ENDCARD = EDIT.s13[0];

// ------------------------------------------------------------------ helpers
let seed = 98765;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;
const len = (s) => Math.max(1, Math.floor(s * SR));
const lp1 = (f) => { const a = Math.exp((-2 * Math.PI * f) / SR); let y = 0; return (x) => (y = (1 - a) * x + a * y); };
const hp1 = (f) => { const a = Math.exp((-2 * Math.PI * f) / SR); let y = 0, px = 0; return (x) => { y = a * (y + x - px); px = x; return y; }; };
const bp = (f, q = 1) => { const w = (2 * Math.PI * f) / SR, al = Math.sin(w) / (2 * q), b0 = al, b2 = -al, a0 = 1 + al, a1 = -2 * Math.cos(w), a2 = 1 - al; let x1 = 0, x2 = 0, y1 = 0, y2 = 0; return (x) => { const y = (b0 * x + b2 * x2 - a1 * y1 - a2 * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y; }; };
const track = () => ({ L: new Float32Array(N), R: new Float32Array(N) });
const midi = (n) => 440 * Math.pow(2, (n - 69) / 12);
function put(tr, t0, buf, gain = 1, pan = 0) {
  if (t0 == null) return;
  const i0 = Math.floor(t0 * SR), gl = gain * Math.cos(((pan + 1) * Math.PI) / 4) * Math.SQRT2, gr = gain * Math.sin(((pan + 1) * Math.PI) / 4) * Math.SQRT2;
  for (let i = 0; i < buf.length; i++) { const j = i0 + i; if (j < 0 || j >= N) continue; tr.L[j] += buf[i] * gl; tr.R[j] += buf[i] * gr; }
}
const gen = (dur, f) => { const n = len(dur), o = new Float32Array(n); for (let i = 0; i < n; i++) o[i] = f(i / SR, i, n); return o; };
function readWav(file) {
  const b = fs.readFileSync(file); let p = 12; while (b.toString('ascii', p, p + 4) !== 'data') p += 8 + b.readUInt32LE(p + 4);
  const ch = b.readUInt16LE(22), n = (b.length - p - 8) / 2 / ch, o = new Float32Array(n);
  for (let i = 0; i < n; i++) o[i] = b.readInt16LE(p + 8 + i * 2 * ch) / 32768;
  return { data: o, sr: b.readUInt32LE(24) };
}
function reverb(tr, mix = 0.25) { // a few feedback combs, cheap room
  for (const ch of [tr.L, tr.R]) {
    const src = Float32Array.from(ch), out = new Float32Array(N);
    for (const [d, g] of [[0.0297, 0.72], [0.0371, 0.7], [0.0411, 0.68], [0.0437, 0.66]]) {
      const D = len(d * (ch === tr.R ? 1.07 : 1)), buf = new Float32Array(N), lp = lp1(3500);
      for (let i = 0; i < N; i++) { buf[i] = src[i] + (i >= D ? lp(buf[i - D]) * g : 0); out[i] += buf[i] * 0.25; }
    }
    for (let i = 0; i < N; i++) ch[i] = src[i] * (1 - mix) + out[i] * mix;
  }
}

// ------------------------------------------------------------------ talk envelope (dialogue in the draft)
const vo = readWav('out/wav/draft1.16k.wav').data;
const HOP = 160, NV = Math.ceil(vo.length / HOP), env = new Float32Array(NV);
for (let k = 0; k < NV; k++) { let s = 0; for (let i = k * HOP; i < Math.min(vo.length, (k + 1) * HOP); i++) s += vo[i] * vo[i]; env[k] = Math.sqrt(s / HOP); }
const voiced = Float32Array.from(env).filter((v) => v > 1e-4).sort();
const floorV = voiced[Math.floor(voiced.length * 0.3)] ?? 0.001, speechV = voiced[Math.floor(voiced.length * 0.9)] ?? 0.05;
const talk = new Float32Array(NV);
{ let y = 0; for (let k = 0; k < NV; k++) { const x = Math.min(1, Math.max(0, (env[k] - floorV * 1.5) / (speechV * 0.5 - floorV * 1.5 || 1))); y = x > y ? y + (x - y) * 0.3 : y + (x - y) * 0.015; talk[k] = y; } }
const talkAt = (t) => talk[Math.min(NV - 1, Math.max(0, Math.floor((t * 16000) / HOP)))] ?? 0;

// ------------------------------------------------------------------ 1. music: tense pulse → beat drop at "Atelier, by Joule"
const MUS = track();
{
  const BPM = 100, BEAT = 60 / BPM, BAR = BEAT * 4;
  const grid0 = ACT2 - Math.floor(ACT2 / BAR) * BAR; // bar lines land on the drop
  const kick = gen(0.4, (s) => Math.sin(2 * Math.PI * (45 * s + (75 / 18) * (1 - Math.exp(-s * 18)))) * Math.exp(-s * 7) * 0.9);
  const clap = (() => { const f = bp(1500, 0.8); return gen(0.25, (s) => f(rnd()) * (Math.exp(-((s % 0.012) * 300)) * (s < 0.036 ? 1 : 0) * 0.8 + Math.exp(-s * 18) * 0.6)); })();
  const hat = (() => { const h = hp1(7000); return gen(0.05, (s) => h(rnd()) * Math.exp(-s * 90) * 0.5); })();
  const pluck = (n, dur = 0.5) => { const p = Math.round(SR / midi(n)), buf = Float32Array.from({ length: p }, () => rnd()), o = new Float32Array(len(dur)); for (let i = 0; i < o.length; i++) { const j = i % p; const v = buf[j]; buf[j] = 0.5 * (v + buf[(j + 1) % p]) * 0.996; o[i] = v * Math.min(1, (o.length - i) / 400); } return o; };
  const padC = (notes, dur) => { const lp = lp1(1100); return gen(dur + 0.8, (s) => { const e = Math.min(1, s / 0.5) * (s > dur ? Math.max(0, 1 - (s - dur) / 0.8) : 1); let v = 0; for (const n of notes) { const f = midi(n); v += Math.sin(2 * Math.PI * f * 0.997 * s) + Math.sin(2 * Math.PI * f * 1.003 * s + 1); } return lp(v / notes.length) * e; }); };
  const bassN = (n, dur) => { const lp = lp1(400); return gen(dur, (s, i, nn) => { const f = midi(n); return lp(Math.sin(2 * Math.PI * f * s) + 0.5 * Math.sign(Math.sin(2 * Math.PI * f * s))) * Math.min(1, s / 0.01) * Math.min(1, (nn - i) / 300) * Math.exp(-s * 1.5); }); };
  const A1 = [{ r: 45, c: [57, 60, 64] }, { r: 41, c: [57, 60, 65] }, { r: 48, c: [55, 60, 64] }, { r: 43, c: [55, 59, 62] }]; // Am F C G
  const A2 = [{ r: 48, c: [60, 64, 67] }, { r: 43, c: [59, 62, 67] }, { r: 45, c: [57, 60, 64] }, { r: 41, c: [57, 60, 65] }]; // C G Am F
  let bar = 0;
  for (let t = grid0 - BAR; t < ENDCARD; t += BAR, bar++) {
    const act2 = t >= ACT2 - 0.01, act3 = t >= ACT3 - BAR * 0.5;
    const ch = (act2 ? A2 : A1)[((bar % 4) + 4) % 4];
    put(MUS, t, padC(ch.c, BAR), act2 ? 0.07 : 0.06);
    for (let b = 0; b < 4; b++) {
      const tb = t + b * BEAT;
      if (tb < 0 || tb >= ENDCARD) continue;
      if (!act2) { // Act 1: a low heartbeat pulse and a ticking hat, no kick: tension, like a clock
        put(MUS, tb, bassN(ch.r, BEAT * 0.6), 0.16);
        put(MUS, tb + BEAT / 2, hat, 0.12, 0.3);
      } else {
        if (b === 0 || b === 2) put(MUS, tb, kick, 0.55);
        if (b === 1 || b === 3) put(MUS, tb, clap, 0.22, 0.05);
        for (let e = 0; e < 2; e++) put(MUS, tb + (e * BEAT) / 2, hat, e ? 0.16 : 0.1, -0.25);
        put(MUS, tb, bassN(ch.r, BEAT * 0.9), 0.2);
        put(MUS, tb + BEAT / 2, bassN(ch.r + 12, BEAT * 0.4), 0.08);
        const arp = [ch.c[0] + 12, ch.c[1] + 12, ch.c[2] + 12, ch.c[1] + 12];
        put(MUS, tb, pluck(arp[b], 0.45), act3 ? 0.16 : 0.12, (b % 2 ? 0.35 : -0.35));
        if (act3) put(MUS, tb + BEAT / 2, pluck(arp[(b + 2) % 4] + 12, 0.3), 0.07, 0.4);
      }
    }
  }
  // the drop lands on the title, then the home chord under the end card rings to the last frame
  put(MUS, ACT2, kick, 0.8); put(MUS, ACT2, (() => { const lp = lp1(2500); return gen(1.2, (s) => lp(rnd()) * Math.exp(-s * 4) * 0.5); })(), 0.4);
  const ring = END - ENDCARD + 0.3;
  put(MUS, ENDCARD, padC([48, 55, 60, 64, 67, 72], ring), 0.09);
  put(MUS, ENDCARD, bassN(36, ring), 0.25);
  put(MUS, ENDCARD, kick, 0.6);
  [72, 76, 79, 84].forEach((n, k) => put(MUS, ENDCARD + 0.12 * k, pluck(n, 2.5), 0.12, -0.3 + k * 0.2));
  reverb(MUS, 0.2);
  for (let i = 0; i < N; i++) { const s = i / SR, g = (1 - 0.68 * talkAt(s)) * Math.min(1, s / 0.6, Math.max(0, (END - s) / 1.2)); MUS.L[i] *= g; MUS.R[i] *= g; }
}

// ------------------------------------------------------------------ 2. sound effects
const SFX = track(), CUES = [];
const S = {
  tick: () => { const h = hp1(1800); return gen(0.012, (s) => h(rnd()) * Math.exp(-s * 500)); },
  pop: (f = 880) => gen(0.09, (s) => Math.sin(2 * Math.PI * f * (1 - 0.25 * Math.min(1, s / 0.05)) * s) * Math.exp(-s * 45) * Math.min(1, s / 0.002)),
  impact: () => { const lp = lp1(1500); return gen(0.9, (s) => Math.sin(2 * Math.PI * (40 * s + 3 * (1 - Math.exp(-s * 15)))) * Math.exp(-s * 5) + lp(rnd()) * Math.exp(-s * 8) * 0.35); },
  thud: () => gen(0.5, (s) => Math.sin(2 * Math.PI * (55 * s + 2.2 * (1 - Math.exp(-s * 12)))) * Math.exp(-s * 6) * 0.9),
  bonk: () => { const lp = lp1(1800); return gen(0.5, (s) => lp(Math.sin(2 * Math.PI * midi(s < 0.12 ? 76 : 72) * s)) * Math.exp(-((s % 0.12) * 18)) * (s < 0.4 ? 1 : 0)); }, // a muted "nope"
  listen: () => gen(0.6, (s) => [[84, 0], [91, 0.09]].reduce((a, [n, d]) => a + (s >= d ? Math.sin(2 * Math.PI * midi(n) * (s - d)) * Math.exp(-(s - d) * 9) : 0), 0) * 0.6), // Joule earcon, up a fifth
  confirm: () => gen(0.7, (s) => [[79, 0], [83, 0.07], [86, 0.14]].reduce((a, [n, d]) => a + (s >= d ? Math.sin(2 * Math.PI * midi(n) * (s - d)) * Math.exp(-(s - d) * 8) : 0), 0) * 0.45),
  key: () => { const f = hp1(2500); return gen(0.02, (s) => f(rnd()) * Math.exp(-s * 300)); },
  tap: () => gen(0.12, (s) => Math.sin(2 * Math.PI * 70 * s) * Math.sin(Math.PI * Math.min(1, s / 0.12)) * 0.9),
  click: () => { const h = hp1(1200); return gen(0.03, (s) => h(rnd()) * Math.exp(-s * 220) + Math.sin(2 * Math.PI * 1800 * s) * Math.exp(-s * 160) * 0.4); },
  clock: (hi = true) => gen(0.03, (s) => Math.sin(2 * Math.PI * (hi ? 2400 : 1800) * s) * Math.exp(-s * 180)),
};
/** air moving past: a band-pass sweeping up */
S.whoosh = (d = 0.4) => { let y1 = 0, y2 = 0, x1 = 0, x2 = 0; return gen(d, (s) => { const p = s / d, w = (2 * Math.PI * (350 + 2800 * p * p)) / SR, al = Math.sin(w) / 1.4, a0 = 1 + al; const x = rnd(); const y = (al * x - al * x2 + 2 * Math.cos(w) * y1 - (1 - al) * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y * Math.sin(Math.PI * p) * 1.4; }); };
/** the build into the drop */
const riser = (d) => { let y1 = 0, y2 = 0, x1 = 0, x2 = 0; return gen(d, (s) => { const p = s / d, w = (2 * Math.PI * (200 + 4000 * p * p)) / SR, al = Math.sin(w) / 3, a0 = 1 + al; const x = rnd(); const y = (al * x - al * x2 + 2 * Math.cos(w) * y1 - (1 - al) * y2) / a0; x2 = x1; x1 = x; y2 = y1; y1 = y; return y * p * p * 2 + Math.sin(2 * Math.PI * (200 + 600 * p) * s) * p * 0.15; }); };
function cue(id, c, kind, gain = 0.5, pan = 0, arg) {
  const t = id ? E(id, c) : c;
  CUES.push(`${t == null ? '  (cut) ' : t.toFixed(2).padStart(7)}  ${kind.padEnd(8)} ${id ?? 'edit'} @ ${c}`);
  if (t == null) return;
  put(SFX, t, typeof kind === 'string' ? S[kind](arg) : kind, gain, pan);
}
// 1 hook: ARITZIA lands, the facts pop in, the name shrinks away, the counter ticks, the number lands
cue('s01', 0.05, 'impact', 0.35);
[0.7, 0.85, 1.0].forEach((c, k) => cue('s01', c, 'pop', 0.14, [-0.3, 0, 0.3][k], [660, 784, 880][k]));
cue('s01', 2.4, 'whoosh', 0.2, 0, 0.5);
for (let c = 3.0; c < 4.3; c += 0.045 + (c - 3.0) * 0.05) cue('s01', c, 'tick', 0.25);
cue('s01', 4.7, 'impact', 0.55);
cue('s01', 5.0, 'whoosh', 0.18, 0, 0.35);
// 2 the AO intro card, the client's caption, then phone out, typing, send
cue('s02', 2.85, 'whoosh', 0.14, -0.4, 0.4);
cue('s02', 3.15, 'pop', 0.14, 0.4, 700);
cue('s02', 10.3, 'whoosh', 0.2, -0.5, 0.4);
for (let c = 11.0; c < 12.7; c += 0.09 + Math.abs(rnd()) * 0.08) cue('s02', c, 'key', 0.18, -0.5);
cue('s02', 13.8, 'click', 0.35, -0.5);
// 3 the phone stays silent: a muted "nope"
cue('s03b', 0.5, 'bonk', 0.4, 0.2);
cue('s03b', 1.1, 'pop', 0.18, 0.3, 700);
// 4 the wait ticks, the client leaves, sale lost
for (let c = 0.2, k = 0; c < 1.6; c += 0.25, k++) cue('s04', c, 'clock', 0.22, -0.2, k % 2 === 0);
cue('s04', 1.6, 'whoosh', 0.16, 0.3, 0.5); // the client walks out
cue('s04', 1.9, 'thud', 0.6);
cue('s04', 2.9, 'pop', 0.18, 0.2, 600);
// into the drop
put(SFX, ACT2 - 1.3, riser(1.3), 0.35); CUES.push(`${(ACT2 - 1.3).toFixed(2).padStart(7)}  riser    edit`);
cue('s06a', 0.0, 'impact', 0.45);
// 5–6 Joule hears "Hey Brady": listening earcon, scanning the staff, locks on Brady, line draws, logged
cue('s06a', 1.05, 'listen', 0.35, 0.2);
for (let c = 0.95; c < 1.6; c += 0.28) cue('s06a', c, 'tick', 0.16, -0.4);
cue('s06a', 1.6, 'pop', 0.3, -0.3, 1046);
cue('s06a', 1.65, 'whoosh', 0.18, -0.2, 0.45);
cue('s06a', 2.3, 'pop', 0.18, -0.3, 784);
cue('s06a', 3.3, 'confirm', 0.3, -0.3);
// 6–7 Brady asks Joule; Joule answers: SOLD OUT stamp, navy found, the route to Rack B
cue('s06c', 5.25, 'listen', 0.35, -0.2);
cue('s07', 1.05, 'listen', 0.25, -0.3);
cue('s07', 2.0, 'thud', 0.3, -0.4);
cue('s07', 2.55, 'pop', 0.2, -0.3, 880);
cue('s07', 2.95, 'confirm', 0.24, -0.3);
cue('s07', 3.15, 'whoosh', 0.16, -0.4, 0.7);
// 8 navy?  navy's great → logged
cue('s08a', 0.85, 'listen', 0.3, -0.2);
cue('s08b', 1.55, 'confirm', 0.3, -0.2);
// 9–10 haptic tap, then the three ticks
cue('s09b', 1.3, 'tap', 0.5, 0.3);
[1.7, 2.15, 2.6].forEach((c, k) => cue('s09b', c, 'pop', 0.24, 0.4, [784, 988, 1175][k]));
// 11 tags lift out, fly into Business Data Cloud
[1.0, 2.0, 3.0].forEach((c, k) => cue('s11', c, 'pop', 0.22, -0.4, [660, 784, 880][k]));
[4.4, 4.58, 4.76].forEach((c) => cue('s11', c, 'whoosh', 0.16, 0.4, 0.5));
cue('s11', 5.15, 'confirm', 0.3, 0.4);
// 12 dashboard builds, Joule suggests, approve
cue('s12', 0.6, 'whoosh', 0.14, -0.2, 0.8);
[1.6, 1.85].forEach((c) => cue('s12', c, 'pop', 0.18, 0.3, 784));
cue('s12', 3.4, 'listen', 0.22, 0.3);
cue('s12', 5.3, 'click', 0.4, 0.2);
cue('s12', 5.7, 'confirm', 0.32, 0.2);
// 13 end card
cue('s13', 0.3, 'whoosh', 0.18, 0, 0.6);
reverb(SFX, 0.15);

// ------------------------------------------------------------------ levels: measured against the dialogue
const db = (x) => 20 * Math.log10(Math.max(x, 1e-9)), fromDb = (d) => Math.pow(10, d / 20);
const rmsWhere = (arr, rate, pick) => { let s = 0, n = 0; for (let i = 0; i < arr.length; i += 4) { if (!pick(i / rate)) continue; s += arr[i] * arr[i]; n++; } return Math.sqrt(s / Math.max(1, n)); };
const voTalk = rmsWhere(vo, 16000, (t) => talkAt(t) > 0.6);
const peakOf = (tr) => { let p = 0; for (let i = 0; i < N; i++) p = Math.max(p, Math.abs(tr.L[i]), Math.abs(tr.R[i])); return p || 1e-9; };
// music: −4 dB under the voice where nobody talks (it carries the silent decks), ducks ~10 dB more under speech
const musQuiet = rmsWhere(MUS.L, SR, (t) => talkAt(t) < 0.05 && t > 1 && t < ENDCARD) || 1e-9;
const gM = (voTalk * fromDb(-4)) / musQuiet;
// sfx: peaks 4 dB under the voice's peaks
const voPeak = (() => { const a = Float32Array.from(vo, Math.abs).sort(); return a[Math.floor(a.length * 0.999)] || 0.3; })();
const gS = (voPeak * fromDb(-4)) / peakOf(SFX);
function writeWav(file, L, R, gain) {
  const b = Buffer.alloc(44 + N * 4);
  b.write('RIFF', 0); b.writeUInt32LE(36 + N * 4, 4); b.write('WAVE', 8); b.write('fmt ', 12); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20); b.writeUInt16LE(2, 22);
  b.writeUInt32LE(SR, 24); b.writeUInt32LE(SR * 4, 28); b.writeUInt16LE(4, 32); b.writeUInt16LE(16, 34); b.write('data', 36); b.writeUInt32LE(N * 4, 40);
  for (let i = 0; i < N; i++) { b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * gain)) * 32767), 44 + i * 4); b.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * gain)) * 32767), 46 + i * 4); }
  fs.writeFileSync(file, b);
}
writeWav(path.join(OUT, 'music.wav'), MUS.L, MUS.R, gM);
writeWav(path.join(OUT, 'sfx.wav'), SFX.L, SFX.R, gS);
const all = track(); let pk = 0;
for (let i = 0; i < N; i++) { all.L[i] = MUS.L[i] * gM + SFX.L[i] * gS; all.R[i] = MUS.R[i] * gM + SFX.R[i] * gS; pk = Math.max(pk, Math.abs(all.L[i]), Math.abs(all.R[i])); }
const safe = pk > 0.89 ? 0.89 / pk : 1;
writeWav(path.join(OUT, 'soundtrack.wav'), all.L, all.R, safe);
const musTalk = rmsWhere(MUS.L, SR, (t) => talkAt(t) > 0.6) * gM;
fs.writeFileSync(path.join(OUT, 'levels.txt'), [
  `dialogue while talking  ${db(voTalk).toFixed(1)} dBFS (peak ${db(voPeak).toFixed(1)})`,
  `music, nobody talking   ${db(musQuiet * gM).toFixed(1)} dBFS ; under dialogue ${db(musTalk).toFixed(1)} dBFS`,
  `sfx peak                ${db(peakOf(SFX) * gS).toFixed(1)} dBFS`,
  `soundtrack peak         ${db(pk * safe).toFixed(1)} dBFS (safety gain ${safe.toFixed(2)})`,
].join('\n') + '\n');
fs.writeFileSync(path.join(OUT, 'cues.txt'), CUES.sort().join('\n') + '\n');
console.log(fs.readFileSync(path.join(OUT, 'levels.txt'), 'utf8'));
