// Deck scenes in the PDF brief's style: navy header with the big blue circle, grey cards,
// blue stat numbers, light-blue callouts with a blue bar, dark footer band. Cues in ../timing.ts.
import React from 'react';
import { AbsoluteFill, Easing, Freeze, Img, interpolate, OffthreadVideo, staticFile } from 'remotion';
import { C, FONT, SHADOW } from '../brand';
import { T } from '../timing';
import { Check, clamp, JouleMark, useInOut, useSec } from '../kit';

const Fade: React.FC<{ start: number; end?: number; y?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ start, end, y = 26, children, style }) => {
  const { p, visible } = useInOut(start, end);
  if (!visible) return null;
  return <div style={{ opacity: Math.min(1, p * 1.3), transform: `translateY(${(1 - p) * y}px)`, ...style }}>{children}</div>;
};

/** The brief's big bright-blue circle, top-right. */
const Circle: React.FC<{ grow?: number }> = ({ grow = 1 }) => (
  <div style={{ position: 'absolute', right: -360, top: -520, width: 1250 * grow, height: 1250 * grow, borderRadius: '50%', background: C.blue }} />
);

/** The brief's dark band: left and right text. */
const Band: React.FC<{ left: React.ReactNode; right?: React.ReactNode; start?: number }> = ({ left, right, start = 0 }) => (
  <Fade start={start} y={0} style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 92, background: C.band, color: C.white, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 80px', fontSize: 25, fontWeight: 600 }}>
    <span>{left}</span>
    <span style={{ fontWeight: 500, opacity: 0.9 }}>{right}</span>
  </Fade>
);

/** "01 The Problem" section header with the blue number pill and hairline. */
const Section: React.FC<{ n: string; title: string; x: number; y: number; w: number; start: number }> = ({ n, title, x, y, w, start }) => (
  <Fade start={start} style={{ position: 'absolute', left: x, top: y, width: w, display: 'flex', alignItems: 'center', gap: 20 }}>
    <span style={{ background: C.blue, color: C.white, fontSize: 26, fontWeight: 600, padding: '4px 14px', borderRadius: 8 }}>{n}</span>
    <span style={{ fontFamily: FONT.title, fontSize: 44, fontWeight: 600, color: C.navy, letterSpacing: -0.8, whiteSpace: 'nowrap' }}>{title}</span>
    <span style={{ flex: 1, height: 2, background: C.line }} />
  </Fade>
);

// ---------- 1 · Hook ----------
export const S01Hook: React.FC = () => {
  const s = T.hook;
  const { t } = useSec();
  const n = interpolate(t, [s.count, s.countEnd], [0, 98], { ...clamp, easing: Easing.out(Easing.cubic) });
  const rounded = t >= s.round;
  const swap = interpolate(t, [s.round - 0.15, s.round + 0.15], [0, 1], clamp);
  const out = interpolate(t, [s.dur - 0.5, s.dur], [1, 0], clamp);
  const grow = interpolate(t, [0, s.dur], [0.96, 1.04], clamp);
  return (
    <AbsoluteFill style={{ background: C.navy, color: C.white, fontFamily: FONT.sans, overflow: 'hidden', opacity: out }}>
      <Circle grow={grow} />
      <Fade start={0.1} style={{ position: 'absolute', left: 140, top: 170, fontSize: 32, fontWeight: 500, opacity: 0.92 }}>Did you know? Every year, Aritzia could be losing</Fade>
      <div style={{ position: 'absolute', left: 130, top: 230, fontFamily: FONT.title, fontSize: 290, fontWeight: 700, lineHeight: 1, letterSpacing: -12 }}>
        {rounded ? <span style={{ opacity: swap }}>~$100M</span> : <span>${Math.round(n)}M</span>}
      </div>
      <Fade start={s.line} style={{ position: 'absolute', left: 140, top: 580, fontFamily: FONT.title, fontSize: 64, fontWeight: 600, letterSpacing: -1.5, lineHeight: 1.15 }}>
        on clothes clients ask for,<br />but <span style={{ boxShadow: `inset 0 -14px 0 ${C.red}` }}>never get.</span>
      </Fade>
      <Band start={s.foot}
        left={<span style={{ fontSize: 21, fontWeight: 500 }}><b style={{ fontWeight: 700 }}>Our estimate, not a reported figure:</b> $2.41B Aritzia boutique sales (FY26 results) × ~4.1% of retail sales lost to out-of-stocks (IHL Group, 2026) ≈ $98M</span>}
      />
    </AbsoluteFill>
  );
};

// ---------- 4 · The client walks out; nothing records it (deck, no footage) ----------
const Row: React.FC<{ k: string; v: React.ReactNode; tone?: 'red' | 'ink'; strike?: boolean }> = ({ k, v, tone = 'ink', strike }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: `1.5px solid ${C.line}`, fontSize: 32 }}>
    <span style={{ color: C.mute, fontWeight: 500 }}>{k}</span>
    <span style={{ fontWeight: 600, color: tone === 'red' ? C.red : C.ink, textDecoration: strike ? 'line-through' : undefined }}>{v}</span>
  </div>
);
export const S04WalkOut: React.FC = () => {
  const s = T.walk;
  const { t } = useSec();
  const left = t >= s.left;
  const wait = 3 * 60 + 41 + Math.floor(t * 4); // the wait ticks up fast: time compressed
  const mm = Math.floor(wait / 60), ss = String(wait % 60).padStart(2, '0');
  return (
    <AbsoluteFill style={{ background: C.white, fontFamily: FONT.sans, color: C.ink }}>
      <Section n="01" title="Meanwhile, in room 3" x={120} y={110} w={1680} start={0} />
      <Fade start={0.2} style={{ position: 'absolute', left: 120, top: 250, width: 860, background: C.gray, borderRadius: 28, padding: '36px 44px 22px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 2, color: C.mute }}>CMT · RETRIEVAL REQUEST</div>
        <div style={{ fontFamily: FONT.title, fontSize: 50, fontWeight: 700, letterSpacing: -1.2, margin: '8px 0 18px' }}>Black pant · 6 · Room 3</div>
        <Row k="Requested" v="2:14 p.m." />
        <Row k="Runner" v="— none yet" strike={left} />
        <Row k="Waiting" v={left ? 'stopped' : `${mm}:${ss}`} tone={left ? 'ink' : 'red'} />
        <Row k="Client" v={left ? 'Left the room' : 'Waiting in room 3'} tone={left ? 'red' : 'ink'} />
        <Row k="Recorded outcome" v={left ? 'Nothing' : '—'} tone={left ? 'red' : 'ink'} />
      </Fade>
      <Fade start={s.lost} style={{ position: 'absolute', left: 1060, top: 300, width: 740 }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.red }}>Pain point</div>
        <div style={{ fontFamily: FONT.title, fontSize: 120, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>Sale lost.</div>
      </Fade>
      <Fade start={s.record} style={{ position: 'absolute', left: 1060, top: 520, width: 740, background: C.tint, borderLeft: `8px solid ${C.blue}`, borderRadius: 10, padding: '30px 36px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 24, fontWeight: 600, color: C.blue }}>And then</div>
        <div style={{ fontFamily: FONT.title, fontSize: 44, fontWeight: 600, lineHeight: 1.2, letterSpacing: -0.8, marginTop: 6 }}>No system records what the client wanted.</div>
      </Fade>
    </AbsoluteFill>
  );
};

// ---------- 11 · Every request becomes demand data ----------
const TAGS = [
  { text: 'Navy blazer · M — tried on, not bought', dot: C.mute },
  { text: 'Black pant · 6 — requested, out of stock', dot: C.red },
  { text: 'Navy pant · 6 — substitute accepted', dot: C.blue },
];
// a spring callable inside a map (hooks can't be)
const springAt = (t: number, start: number) => {
  const k = Math.max(0, t - start);
  return Math.min(1.04, Math.max(0, 1 - Math.exp(-k * 7) * Math.cos(k * 9)));
};
export const S11Data: React.FC = () => {
  const s = T.data;
  const { t } = useSec();
  const blur = interpolate(t, [0, 1.0], [0, 14], clamp);
  const dim = interpolate(t, [0, 1.0], [0, 0.72], clamp);
  const bdc = useInOut(s.bdc);
  const pulse = interpolate(t, [s.fly + 0.7, s.fly + 1.0, s.fly + 1.6], [1, 1.12, 1], clamp);
  const count = Math.min(3, Math.max(0, Math.floor((t - (s.fly + 0.6)) / 0.18) + 1));
  return (
    <AbsoluteFill style={{ background: '#000', fontFamily: FONT.sans }}>
      <AbsoluteFill style={{ filter: `blur(${blur}px)`, transform: 'scale(1.05)' }}>
        <Freeze frame={Math.round(3.2 * 25)}>
          <OffthreadVideo src={staticFile('footage/shot9-2.mp4')} muted style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Freeze>
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `rgba(28,80,148,${dim})` }} />
      {TAGS.map((tag, i) => {
        const born = s.tags[i];
        if (t < born - 0.05) return null;
        const p = springAt(t, born);
        // lift out of the clothes (centre), settle in a stack on the left, then fly into BDC (right)
        const sx = 1120, sy = 470, ex = 120, ey = 250 + i * 130;
        const fly = interpolate(t, [s.fly + i * 0.18, s.fly + 0.7 + i * 0.18], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
        const x = interpolate(p, [0, 1], [sx, ex]) + fly * (1480 - ex);
        const y = interpolate(p, [0, 1], [sy, ey]) + fly * (520 - ey);
        const sc = (0.6 + 0.4 * p) * (1 - 0.8 * fly);
        return (
          <div key={i} style={{ position: 'absolute', left: x, top: y, transform: `scale(${sc})`, transformOrigin: 'left center', opacity: Math.min(1, p * 2) * (1 - fly * 0.9),
            display: 'flex', alignItems: 'center', gap: 16, background: C.white, color: C.ink, borderRadius: 999, padding: '20px 34px 20px 24px', fontSize: 38, fontWeight: 600, boxShadow: SHADOW, whiteSpace: 'nowrap' }}>
            <span style={{ width: 22, height: 22, borderRadius: '50%', background: tag.dot }} />
            {tag.text}
          </div>
        );
      })}
      {bdc.visible && (
        <div style={{ position: 'absolute', left: 1440, top: 330, width: 380, textAlign: 'center', opacity: Math.min(1, bdc.p * 1.3), transform: `scale(${(0.9 + 0.1 * bdc.p) * pulse})` }}>
          <div style={{ margin: '0 auto', width: 220, height: 220, borderRadius: 44, background: C.white, display: 'grid', placeItems: 'center', boxShadow: `0 0 0 ${(pulse - 1) * 80}px rgba(59,133,238,0.35), ${SHADOW}` }}>
            <svg width={120} height={120} viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth={1.6}>
              <ellipse cx="12" cy="5.5" rx="7.5" ry="3" /><path d="M4.5 5.5v6.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V5.5" /><path d="M4.5 12v6.5c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V12" />
            </svg>
          </div>
          <div style={{ color: C.white, fontFamily: FONT.title, fontSize: 34, fontWeight: 700, marginTop: 24, lineHeight: 1.15 }}>SAP Business<br />Data Cloud</div>
          {t > s.fly + 0.6 && <div style={{ color: '#BFD8FF', fontSize: 28, fontWeight: 600, marginTop: 12 }}>+{count} demand signals</div>}
        </div>
      )}
      <Fade start={s.label} style={{ position: 'absolute', left: 120, bottom: 110, color: C.white }}>
        <div style={{ fontFamily: FONT.title, fontSize: 68, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>Demand sales reports never see.</div>
        <div style={{ fontSize: 28, color: '#D6E4F7', marginTop: 14, fontWeight: 500 }}>Anonymized and product-level: no client or associate names.</div>
      </Fade>
    </AbsoluteFill>
  );
};

// ---------- 12 · Analytics Cloud-style dashboard; Joule drafts, a person approves ----------
const BARS = [
  { label: 'Black pant · 6', v: 24 },
  { label: 'Black pant · 4', v: 15 },
  { label: 'Ivory knit · S', v: 11 },
  { label: 'Navy blazer · M', v: 7 },
];
export const S12Dashboard: React.FC = () => {
  const s = T.dash;
  const { t, fps, frame } = useSec();
  const clicked = t >= s.click;
  const done = t >= s.done;
  const cx = interpolate(t, [s.joule + 0.6, s.click - 0.1], [1500, 1125], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const cy = interpolate(t, [s.joule + 0.6, s.click - 0.1], [1000, 712], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const press = interpolate(frame, [s.click * fps, s.click * fps + 3, s.click * fps + 8], [1, 0.85, 1], clamp);
  const panel: React.CSSProperties = { background: C.white, borderRadius: 24, border: `1.5px solid ${C.line}`, boxSizing: 'border-box' };
  return (
    <AbsoluteFill style={{ background: C.gray, fontFamily: FONT.sans, color: C.ink }}>
      <Section n="06" title="Fitting-room demand, this week" x={90} y={70} w={1500} start={0} />
      <Fade start={0.1} style={{ position: 'absolute', right: 90, top: 78, fontSize: 22, fontWeight: 600, color: C.mute, border: `1.5px dashed ${C.mute}`, borderRadius: 999, padding: '8px 18px' }}>Illustrative data</Fade>
      <Fade start={0.1} style={{ position: 'absolute', left: 90, top: 150, fontSize: 24, color: C.mute, fontWeight: 500 }}>SAP Analytics Cloud · head-office view, all boutiques</Fade>
      {/* left: requested but out of stock */}
      <div style={{ ...panel, position: 'absolute', left: 90, top: 230, width: 860, height: 560, padding: '36px 40px' }}>
        <div style={{ fontSize: 22, fontWeight: 600, color: C.blue }}>Missed requests</div>
        <div style={{ fontFamily: FONT.title, fontSize: 34, fontWeight: 700, letterSpacing: -0.6, marginTop: 2 }}>Requested, but out of stock</div>
        <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', gap: 30 }}>
          {BARS.map((b, i) => {
            const g = interpolate(t, [s.bars + i * 0.15, s.bars + 0.8 + i * 0.15], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
            return (
              <div key={b.label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr 50px', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 25, fontWeight: 600 }}>{b.label}</span>
                <div style={{ height: 44, borderRadius: 10, background: C.gray }}>
                  <div style={{ width: `${(b.v / 24) * 100 * g}%`, height: '100%', borderRadius: 10, background: i === 0 ? C.blue : '#C5DAF7' }} />
                </div>
                <span style={{ fontSize: 26, fontWeight: 700, opacity: g }}>{Math.round(b.v * g)}</span>
              </div>
            );
          })}
        </div>
      </div>
      {/* right: KPIs, styled like the brief's "By the numbers" */}
      <div style={{ position: 'absolute', left: 990, top: 230, width: 840, display: 'flex', gap: 24 }}>
        {[
          ['41%', 'tried on, not bought', 'Navy blazer · M'],
          ['63%', 'of substitutes accepted', 'when the size is out'],
        ].map(([v, k, sub], i) => (
          <Fade key={k} start={s.kpi + i * 0.25} style={{ ...panel, flex: 1, padding: '24px 32px', borderTop: `6px solid ${C.blue}` }}>
            <div style={{ fontFamily: FONT.title, fontSize: 96, fontWeight: 600, color: C.blue, letterSpacing: -3, lineHeight: 1.05 }}>{v}</div>
            <div style={{ fontSize: 26, fontWeight: 500 }}>{k}</div>
            <div style={{ fontSize: 21, color: C.mute, fontStyle: 'italic', fontFamily: FONT.italic, marginTop: 4 }}>{sub}</div>
          </Fade>
        ))}
      </div>
      {/* Joule drafts the action, a person approves */}
      <Fade start={s.joule} style={{ position: 'absolute', left: 990, top: 530, width: 840, background: C.navy, color: C.white, borderRadius: 24, padding: '30px 34px', boxSizing: 'border-box', boxShadow: SHADOW }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 600, letterSpacing: 1.5, color: '#BFD8FF' }}><JouleMark size={26} /> JOULE SUGGESTS</div>
        <div style={{ fontSize: 32, fontWeight: 500, marginTop: 10, lineHeight: 1.25 }}>Black pant · 6 is short in 3 boutiques. Move 18 units from the distribution centre?</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 22 }}>
          <div style={{ fontSize: 26, fontWeight: 700, padding: '14px 30px', borderRadius: 12, background: done ? C.green : C.blue, transform: `scale(${press})`, display: 'flex', alignItems: 'center', gap: 10 }}>
            {done ? <><Check size={28} color="#fff" /> Approved by allocator</> : 'Approve transfer'}
          </div>
          {!done && <div style={{ fontSize: 26, fontWeight: 600, padding: '14px 30px', borderRadius: 12, border: '1.5px solid rgba(255,255,255,0.35)' }}>Edit</div>}
        </div>
      </Fade>
      {t > s.joule + 0.5 && !clicked && (
        <svg width={44} height={52} viewBox="0 0 24 28" style={{ position: 'absolute', left: cx, top: cy, filter: 'drop-shadow(0 3px 5px rgba(0,0,0,0.35))' }}>
          <path d="M3 2l16 13-7 1.5 4.5 8-3 1.5-4.5-8L4 22z" fill="#fff" stroke="#111" strokeWidth={1.4} strokeLinejoin="round" />
        </svg>
      )}
      <Fade start={s.btp} style={{ position: 'absolute', left: 90, bottom: 110, display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ fontSize: 24, color: C.mute, fontWeight: 500, marginRight: 4 }}>For SAP:</span>
        {['Joule extension on SAP BTP', 'Priced per store', 'Any associate-led SAP retailer'].map((x) => (
          <span key={x} style={{ fontSize: 26, fontWeight: 600, padding: '12px 24px', borderRadius: 999, background: '#DCEAFD', color: C.navy }}>{x}</span>
        ))}
      </Fade>
    </AbsoluteFill>
  );
};

// ---------- 13 · End card, like the brief's header ----------
export const S13End: React.FC = () => {
  const s = T.end;
  const { t } = useSec();
  const grow = interpolate(t, [0, s.dur], [0.97, 1.02], clamp);
  return (
    <AbsoluteFill style={{ background: C.navy, color: C.white, fontFamily: FONT.sans, overflow: 'hidden' }}>
      <Circle grow={grow} />
      <Fade start={s.logo + 0.3} y={40} style={{ position: 'absolute', right: 90, top: 200, width: 700, borderRadius: 14, overflow: 'hidden', boxShadow: '0 30px 80px rgba(0,0,0,0.35)' }}>
        <Img src={staticFile('img/atelier-product.png')} style={{ width: '100%', display: 'block' }} />
      </Fade>
      <Fade start={s.logo} style={{ position: 'absolute', left: 110, top: 150, fontSize: 28, fontWeight: 500, opacity: 0.92 }}>SAP and Aritzia · Product pitch</Fade>
      <Fade start={s.logo} style={{ position: 'absolute', left: 104, top: 200, fontFamily: FONT.title, fontSize: 150, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Atelier,<br />by Joule</Fade>
      <Fade start={s.tag} style={{ position: 'absolute', left: 110, top: 530, width: 940, fontSize: 34, fontWeight: 500, lineHeight: 1.3, opacity: 0.95 }}>
        AI-powered earpiece software that links the fitting room to the floor, and turns every hand-off into demand data for SAP.
      </Fade>
      <Fade start={s.tag + 0.5} style={{ position: 'absolute', left: 110, top: 700, width: 940, background: C.blue, borderRadius: 18, padding: '22px 30px', boxSizing: 'border-box' }}>
        <div style={{ fontSize: 22, fontWeight: 600, opacity: 0.9 }}>Runs on the earpieces associates already wear</div>
        <div style={{ fontSize: 40, fontWeight: 600, fontStyle: 'italic', fontFamily: FONT.italic, marginTop: 4 }}>The fitting room, finally heard.</div>
      </Fade>
      <Fade start={s.chips} style={{ position: 'absolute', right: 90, top: 640, width: 700, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'flex-end' }}>
        {['Joule', 'SAP BTP', 'S/4HANA', 'Business Data Cloud', 'Analytics Cloud'].map((x) => (
          <span key={x} style={{ fontSize: 24, fontWeight: 600, padding: '10px 22px', borderRadius: 999, background: 'rgba(255,255,255,0.18)' }}>{x}</span>
        ))}
      </Fade>
      <Band start={s.team} left="Atelier, by Joule · SAP × Aritzia product pitch" right="Product+ 2026 · Cherry · Dora · Brady" />
    </AbsoluteFill>
  );
};
