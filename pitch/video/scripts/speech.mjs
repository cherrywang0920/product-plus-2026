// Loudness per 0.1 s for a footage file, to find when people speak. node scripts/speech.mjs <name>
import { execFileSync } from 'node:child_process';
import { readFileSync, mkdirSync } from 'node:fs';
const f = process.argv[2];
mkdirSync('out/wav', { recursive: true });
const wav = `out/wav/${f}.wav`;
execFileSync('npx', ['remotion', 'ffmpeg', '-v', 'error', '-y', '-i', `public/footage/${f}.mp4`, '-ac', '1', '-ar', '8000', '-c:a', 'pcm_s16le', wav], { stdio: 'ignore' });
const b = readFileSync(wav);
const data = b.indexOf('data');
const s = new Int16Array(b.buffer.slice(b.byteOffset + data + 8, b.byteOffset + b.length - ((b.length - data - 8) % 2)));
const win = 800, db = [];
for (let i = 0; i + win <= s.length; i += win) { let e = 0; for (let j = i; j < i + win; j++) e += s[j] * s[j]; db.push(10 * Math.log10(e / win + 1)); }
const max = Math.max(...db);
db.forEach((d, k) => console.log((k / 10).toFixed(1).padStart(5), '#'.repeat(Math.max(0, Math.round((d - (max - 36)) / 1.5)))));
