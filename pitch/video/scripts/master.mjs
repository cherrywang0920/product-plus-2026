// Master the final cut's audio: +gain, then a look-ahead peak limiter at -1 dBFS; remux with the video untouched.
//   node scripts/master.mjs in.mp4 out.mp4 [gainDb=5]
import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const [IN, OUTF, G = '5'] = process.argv.slice(2);
const ff = (a) => execFileSync('npx', ['remotion', 'ffmpeg', '-v', 'error', '-y', ...a], { stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 1 << 30 });
ff(['-i', IN, '-vn', '-ac', '2', '-ar', '48000', '-c:a', 'pcm_s16le', 'out/master-in.wav']);
const b = fs.readFileSync('out/master-in.wav'); let p = 12; while (b.toString('ascii', p, p + 4) !== 'data') p += 8 + b.readUInt32LE(p + 4);
const n = (b.length - p - 8) / 4, L = new Float32Array(n), R = new Float32Array(n);
for (let i = 0; i < n; i++) { L[i] = b.readInt16LE(p + 8 + i * 4) / 32768; R[i] = b.readInt16LE(p + 10 + i * 4) / 32768; }
const g = Math.pow(10, Number(G) / 20), ceil = Math.pow(10, -1 / 20), LA = 240, REL = Math.exp(-1 / (0.08 * 48000));
// gain each sample needs, looked ahead over 5 ms, smoothed on release
const need = new Float32Array(n); for (let i = 0; i < n; i++) { const pk = Math.max(Math.abs(L[i]), Math.abs(R[i])) * g; need[i] = pk > ceil ? ceil / pk : 1; }
let env = 1, out = Buffer.alloc(44 + n * 4), worst = 1;
for (let i = 0; i < n; i++) {
  let m = 1; for (let k = i; k < Math.min(n, i + LA); k++) if (need[k] < m) m = need[k];
  env = m < env ? m : Math.min(m, 1 - (1 - env) * REL); // instant attack (looked ahead), smooth release
  worst = Math.min(worst, env);
  const l = Math.max(-1, Math.min(1, L[i] * g * env)), r = Math.max(-1, Math.min(1, R[i] * g * env));
  out.writeInt16LE(Math.round(l * 32767), 44 + i * 4); out.writeInt16LE(Math.round(r * 32767), 46 + i * 4);
}
out.write('RIFF', 0); out.writeUInt32LE(36 + n * 4, 4); out.write('WAVE', 8); out.write('fmt ', 12); out.writeUInt32LE(16, 16); out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22);
out.writeUInt32LE(48000, 24); out.writeUInt32LE(192000, 28); out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(n * 4, 40);
fs.writeFileSync('out/master-out.wav', out);
ff(['-i', IN, '-i', 'out/master-out.wav', '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '256k', '-shortest', OUTF]);
console.log(`+${G} dB, limiter at -1 dBFS (max reduction ${(20 * Math.log10(worst)).toFixed(1)} dB) → ${OUTF}`);
