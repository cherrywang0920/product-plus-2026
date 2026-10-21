// Shared pieces: film background, cards, chips, speech bubbles, earpiece glow, travelling waves, icons.
import React from 'react';
import { AbsoluteFill, Easing, interpolate, OffthreadVideo, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { useAudioData } from '@remotion/media-utils';
import { C, FONT, SHADOW } from './brand';

export const useSec = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { t: frame / fps, frame, fps };
};

/** 0→1 spring from `start`, then 1→0 ease over 0.35 s from `end`. */
export const useInOut = (start: number, end = Infinity) => {
  const { frame, fps } = useSec();
  const inP = spring({ frame: frame - Math.round(start * fps), fps, config: { damping: 20, stiffness: 140, mass: 0.9 } });
  const outP = Number.isFinite(end) ? interpolate(frame, [end * fps, (end + 0.35) * fps], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic) }) : 0;
  return { p: inP * (1 - outP), inP, outP, visible: frame >= Math.round(start * fps) - 1 && outP < 1 };
};

export const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Film full frame, its own sound kept (the editor turns it down under the VO). */
export const Film: React.FC<{ src: string; volume?: (frame: number) => number; children?: React.ReactNode }> = ({ src, volume, children }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <OffthreadVideo src={staticFile(`footage/${src}`)} volume={volume} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    {children}
  </AbsoluteFill>
);

/** A frosted card that springs up into place. */
export const Card: React.FC<{ x: number; y: number; w?: number; start: number; end?: number; children: React.ReactNode; dark?: boolean; from?: 'up' | 'left' | 'right' }> = ({ x, y, w, start, end, children, dark, from = 'up' }) => {
  const { p, visible } = useInOut(start, end);
  if (!visible) return null;
  const off = (1 - p) * 40;
  const tr = from === 'up' ? `translateY(${off}px)` : from === 'left' ? `translateX(${-off}px)` : `translateX(${off}px)`;
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: Math.min(1, p * 1.4), transform: `${tr} scale(${0.96 + 0.04 * p})`, transformOrigin: 'left center',
      background: dark ? 'rgba(26,40,53,0.92)' : C.card, color: dark ? C.white : C.ink, borderRadius: 22, padding: '22px 28px', boxShadow: SHADOW,
      fontFamily: FONT.sans, backdropFilter: 'blur(8px)' }}>
      {children}
    </div>
  );
};

/** Small pill label. tone: red = problem, blue = Joule, ink = neutral context. */
export const Chip: React.FC<{ x: number; y: number; start: number; end?: number; tone?: 'red' | 'blue' | 'ink'; icon?: React.ReactNode; children: React.ReactNode; size?: number }> = ({ x, y, start, end, tone = 'ink', icon, children, size = 30 }) => {
  const { p, visible } = useInOut(start, end);
  if (!visible) return null;
  const bg = tone === 'red' ? C.red : tone === 'blue' ? C.blue : 'rgba(26,40,53,0.85)';
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 24}px)`, display: 'flex', alignItems: 'center', gap: 12,
      background: bg, color: '#fff', borderRadius: 999, padding: `${size * 0.42}px ${size * 0.8}px`, fontFamily: FONT.sans, fontWeight: 600, fontSize: size, letterSpacing: -0.2, boxShadow: SHADOW, whiteSpace: 'nowrap' }}>
      {icon}
      {children}
    </div>
  );
};

/** Words appear one by one across [start, start + speak]: matches the line as it's said. */
export const Said: React.FC<{ text: string; start: number; speak: number; highlight?: string }> = ({ text, start, speak, highlight }) => {
  const { t } = useSec();
  const words = text.split(' ');
  return (
    <>
      {words.map((w, i) => {
        const at = start + (speak * i) / words.length;
        const o = interpolate(t, [at, at + 0.12], [0.18, 1], clamp);
        const hl = highlight && w.replace(/[^\w]/g, '') === highlight;
        if (hl) {
          const k = interpolate(t, [at, at + 0.25], [0, 1], clamp);
          return <span key={i} style={{ opacity: o }}><span style={{ color: C.white, background: C.blue, borderRadius: 10, padding: '0 10px', fontWeight: 700, boxShadow: `0 0 0 ${(1 - k) * 14}px rgba(59,133,238,${0.35 * k})` }}>{w.replace(/[,.]$/, '')}</span>{w.match(/[,.]$/)?.[0]}{i < words.length - 1 ? ' ' : ''}</span>;
        }
        return <span key={i} style={{ opacity: o }}>{w}{i < words.length - 1 ? ' ' : ''}</span>;
      })}
    </>
  );
};

/** Speech bubble with the speaker on top. via = "through Joule" (blue edge). */
/** Joule listening: a live line drawn from the actual voice in `src` (a footage file or a wav), with a status.
 *  audioAt = the audio file's time at this clip's t = 0 (negative if the audio starts later). */
export type Listen = { src: string; audioAt?: number; from: number; to: number; done: string; status?: string };
export const VoiceLine: React.FC<{ listen: Listen; dark?: boolean; w: number }> = ({ listen, dark, w }) => {
  const { t } = useSec();
  const audio = useAudioData(staticFile(listen.src));
  const H = 80, N = 90;
  // loudness envelope of the file (10 ms steps), normalised to its own loud speech
  const env = React.useMemo(() => {
    if (!audio) return null;
    const ch = audio.channelWaveforms[0], sr = audio.sampleRate, hop = Math.round(sr / 100);
    const e = new Float32Array(Math.floor(ch.length / hop));
    for (let k = 0; k < e.length; k++) { let q = 0; for (let i = k * hop; i < (k + 1) * hop; i++) q += ch[i] * ch[i]; e[k] = Math.sqrt(q / hop); }
    const sorted = Float32Array.from(e).sort();
    const ref = sorted[Math.floor(e.length * 0.97)] || 1;
    return Array.from(e, (v) => Math.min(1, v / ref));
  }, [audio]);
  const at = t + (listen.audioAt ?? 0); // seconds into the audio
  const lvlAt = (sec: number) => (env ? env[Math.max(0, Math.min(env.length - 1, Math.round(sec * 100)))] ?? 0 : 0);
  // smooth over ~60 ms so the line breathes with the syllables instead of flickering
  const level = (lvlAt(at - 0.03) + lvlAt(at) + lvlAt(at + 0.03)) / 3;
  const active = t >= listen.from && t <= listen.to;
  const after = t > listen.to;
  const amp = active ? 0.1 + 0.9 * level : 0.05;
  const waves = [
    { f: 2.2, sp: 5.0, a: 1.0, o: 1 },
    { f: 3.4, sp: -3.6, a: 0.6, o: 0.55 },
    { f: 1.4, sp: 2.4, a: 0.45, o: 0.35 },
  ];
  const path = (wv: (typeof waves)[number]) => Array.from({ length: N }, (_, i) => {
    const x = i / (N - 1), taper = Math.pow(Math.sin(x * Math.PI), 2);
    const y = Math.sin(x * Math.PI * 2 * wv.f + t * wv.sp) * wv.a * amp * taper;
    return `${i ? 'L' : 'M'} ${x * w} ${H / 2 - y * (H / 2 - 4)}`;
  }).join(' ');
  const col = dark ? '#BFD8FF' : C.blue;
  const status = after ? listen.done : active ? (listen.status ?? 'Transcribing') : 'Listening';
  return (
    <div style={{ margin: '4px 0 10px' }}>
      <svg width={w} height={H} style={{ display: 'block', overflow: 'visible' }}>
        <line x1={0} x2={w} y1={H / 2} y2={H / 2} stroke={col} strokeOpacity={0.15} strokeWidth={2} />
        {waves.map((wv, k) => <path key={k} d={path(wv)} fill="none" stroke={col} strokeWidth={k === 0 ? 4.5 : 3} strokeLinecap="round" opacity={(after ? 0.35 : 1) * wv.o} />)}
      </svg>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 21, fontWeight: 600, color: after ? (dark ? '#9FE3B4' : C.green) : col, marginTop: 4 }}>
        {after ? <Check size={22} color={dark ? '#9FE3B4' : C.green} /> : <span style={{ width: 10, height: 10, borderRadius: '50%', background: col, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 5)) }} />}
        {status}{!after && <span style={{ opacity: 0.6 }}>{'.'.repeat(1 + (Math.floor(t * 3) % 3))}</span>}
      </div>
    </div>
  );
};

/** Speech bubble with the speaker on top. via = "through Joule" (blue edge). listen = live voice line + status. */
export const Bubble: React.FC<{ x: number; y: number; w: number; start: number; end?: number; who: string; text: string; speak: number; via?: 'joule' | 'person'; tail?: 'left' | 'right' | 'none'; size?: number; highlight?: string; listen?: Listen }> = ({ x, y, w, start, end, who, text, speak, via = 'person', tail = 'right', size = 40, highlight, listen }) => {
  const { p, visible } = useInOut(start, end);
  if (!visible) return null;
  const isJoule = via === 'joule';
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px) scale(${0.95 + 0.05 * p})`, transformOrigin: tail === 'left' ? 'left bottom' : 'right bottom' }}>
      <div style={{ background: isJoule ? 'rgba(28,80,148,0.96)' : C.card, color: isJoule ? '#fff' : C.ink, borderRadius: 28, padding: '22px 30px 26px', boxShadow: SHADOW, borderLeft: `6px solid ${C.blue}`, fontFamily: FONT.sans }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', color: isJoule ? '#BFD8FF' : C.blue, marginBottom: 8 }}>
          {isJoule ? <JouleMark size={24} /> : <Wave size={24} color={C.blue} />}
          {who}
        </div>
        {listen && <VoiceLine listen={listen} dark={isJoule} w={w - 66} />}
        <div style={{ fontSize: size, fontWeight: 500, lineHeight: 1.2, letterSpacing: -0.4 }}>
          <Said text={text} start={start + 0.05} speak={speak} highlight={highlight} />
        </div>
      </div>
    </div>
  );
};

/** Rings pulsing out of an earpiece. */
export const EarGlow: React.FC<{ x: number; y: number; start: number; end?: number; color?: string; scale?: number }> = ({ x, y, start, end = Infinity, color = C.blue, scale = 1 }) => {
  const { t } = useSec();
  if (t < start || t > end + 0.5) return null;
  const fade = (Number.isFinite(end) ? interpolate(t, [end, end + 0.5], [1, 0], clamp) : 1) * interpolate(t, [start, start + 0.2], [0, 1], clamp);
  return (
    <div style={{ position: 'absolute', left: x, top: y, opacity: fade }}>
      <div style={{ position: 'absolute', left: -26 * scale, top: -26 * scale, width: 52 * scale, height: 52 * scale, borderRadius: '50%', background: color, opacity: 0.35, filter: 'blur(10px)' }} />
      {[0, 1, 2].map((i) => {
        const ph = ((t - start) / 1.2 + i / 3) % 1;
        const r = (30 + ph * 110) * scale;
        return <div key={i} style={{ position: 'absolute', left: -r, top: -r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${4 * scale}px solid ${color}`, opacity: (1 - ph) * 0.9 }} />;
      })}
    </div>
  );
};

/** Arcs of sound travelling from (x1,y1) to (x2,y2): the request moving between earpieces. */
export const Waves: React.FC<{ x1: number; y1: number; x2: number; y2: number; start: number; end: number; color?: string }> = ({ x1, y1, x2, y2, start, end, color = C.blue }) => {
  const { t } = useSec();
  if (t < start || t > end + 0.8) return null;
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
  const n = 5;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const born = start + i * 0.16;
        const k = (t - born) / 0.8; // each arc takes 0.8 s to cross
        if (t > end) return null;
        const kk = ((k % 1) + 1) % 1;
        if (t < born) return null;
        const e = Easing.inOut(Easing.quad)(kk);
        const x = x1 + (x2 - x1) * e;
        const y = y1 + (y2 - y1) * e;
        const o = Math.sin(kk * Math.PI);
        return (
          <svg key={i} width={120} height={160} style={{ position: 'absolute', left: x - 60, top: y - 80, transform: `rotate(${ang}deg)`, opacity: o, overflow: 'visible' }}>
            <path d="M 40 20 Q 90 80 40 140" stroke={color} strokeWidth={9} fill="none" strokeLinecap="round" />
            <path d="M 70 45 Q 100 80 70 115" stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" opacity={0.7} />
          </svg>
        );
      })}
    </>
  );
};

/** Vertical line of ticks, one by one. */
export const Ticks: React.FC<{ x: number; y: number; items: string[]; start: number; gap?: number; end?: number; row?: boolean }> = ({ x, y, items, start, gap = 0.55, end, row }) => (
  <div style={{ position: 'absolute', left: x, top: y, display: 'flex', flexDirection: row ? 'row' : 'column', gap: 16 }}>
    {items.map((s, i) => <TickRow key={s} text={s} start={start + i * gap} end={end} />)}
  </div>
);
const TickRow: React.FC<{ text: string; start: number; end?: number }> = ({ text, start, end }) => {
  const { p, visible } = useInOut(start, end);
  return (
    <div style={{ opacity: visible ? Math.min(1, p * 1.4) : 0, transform: `translateX(${(1 - p) * -30}px)`, display: 'flex', alignItems: 'center', gap: 18, background: C.card, borderRadius: 999, padding: '16px 34px 16px 18px', boxShadow: SHADOW, fontFamily: FONT.sans, fontWeight: 600, fontSize: 40, color: C.ink, width: 'fit-content' }}>
      <span style={{ width: 50, height: 50, borderRadius: '50%', background: C.blue, display: 'grid', placeItems: 'center' }}><Check size={30} color="#fff" /></span>
      {text}
    </div>
  );
};

// ---- icons (inline SVG, no external assets) ----
export const Check: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = C.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const BellOff: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.7 3.9A6 6 0 0 1 18 9c0 3.3.8 5.4 1.6 6.7M6.3 6.6A6 6 0 0 0 6 9c0 4.5-1.5 7-2.5 8h13" /><path d="M10.3 20a2 2 0 0 0 3.4 0" /><path d="M3 3l18 18" />
  </svg>
);
export const Wave: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = C.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.4} strokeLinecap="round"><path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" /></svg>
);
export const Pin: React.FC<{ size?: number; color?: string }> = ({ size = 26, color = C.blue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" /></svg>
);
export const Tap: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#fff' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.2} strokeLinecap="round"><circle cx="12" cy="12" r="3" fill={color} /><path d="M6.3 6.3a8 8 0 0 0 0 11.4M17.7 6.3a8 8 0 0 1 0 11.4" /></svg>
);
/** Joule-ish mark: a four-point spark (our drawing, not SAP's logo). */
export const JouleMark: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#BFD8FF' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 1.5c.6 4.9 2.8 8.3 9 10.5-6.2 2.2-8.4 5.6-9 10.5-.6-4.9-2.8-8.3-9-10.5 6.2-2.2 8.4-5.6 9-10.5z" /></svg>
);
