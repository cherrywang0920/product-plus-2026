// Acted shots with overlays. One component per take in public/footage. Cues in ../timing.ts.
import React from 'react';
import { Audio, Easing, interpolate, Sequence, staticFile } from 'remotion';
import { C, FONT, SHADOW } from '../brand';
import { T } from '../timing';
import { BellOff, Bubble, Card, Check, Chip, clamp, EarGlow, Film, JouleMark, Pin, Said, Tap, Ticks, useInOut, useSec, Waves } from '../kit';

// ---------- 2–4 · shot2: Dora logs the retrieval in CMT, nothing happens, leaves the rooms ----------
const CmtPhone: React.FC = () => {
  const s = T.s2;
  const { t } = useSec();
  const { p, visible } = useInOut(s.phoneIn, s.phoneOut);
  if (!visible) return null;
  const typed = 'Effortless Pant';
  const nTyped = Math.round(interpolate(t, [s.phoneIn + 0.8, s.typeEnd - 0.6], [0, typed.length], clamp));
  const sizeOn = t > s.typeEnd - 0.4;
  const sent = t >= s.send;
  const press = t >= s.send - 0.15 && t < s.send + 0.1;
  const wait = Math.max(0, t - s.send);
  const mmss = `0:${String(Math.floor(wait)).padStart(2, '0')}`;
  const W = 380, H = 780;
  return (
    <div style={{ position: 'absolute', left: 150, top: (1080 - H - 24) / 2, opacity: Math.min(1, p * 1.5), transform: `translateY(${(1 - p) * 120}px)` }}>
      <div style={{ width: W + 24, height: H + 24, padding: 12, boxSizing: 'border-box', borderRadius: 60, background: '#14181E', boxShadow: SHADOW }}>
        <div style={{ width: W, height: H, borderRadius: 48, overflow: 'hidden', background: '#FFFFFF', fontFamily: FONT.sans, color: C.ink, position: 'relative' }}>
          <div style={{ padding: '58px 28px 16px', borderBottom: `1px solid ${C.line}` }}>
            <div style={{ fontSize: 15, letterSpacing: 2, color: C.mute, fontWeight: 600 }}>CMT · MOCK-UP</div>
            <div style={{ fontSize: 30, fontWeight: 700, marginTop: 4 }}>New retrieval</div>
          </div>
          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Room', '3'],
              ['Item', typed.slice(0, nTyped) + (nTyped < typed.length && !sent ? '|' : '')],
              ['Size', sizeOn ? '6' : ''],
            ].map(([k, v]) => (
              <div key={k} style={{ border: `1.5px solid ${C.line}`, borderRadius: 14, padding: '12px 16px', background: '#fff' }}>
                <div style={{ fontSize: 14, color: C.mute, fontWeight: 600 }}>{k}</div>
                <div style={{ fontSize: 26, fontWeight: 600, minHeight: 32 }}>{v}</div>
              </div>
            ))}
            <div style={{ marginTop: 6, borderRadius: 14, padding: '16px 0', textAlign: 'center', fontSize: 24, fontWeight: 700, color: '#fff', background: sent ? C.mute : C.ink, transform: `scale(${press ? 0.95 : 1})` }}>
              {sent ? 'Sent ✓' : 'Send request'}
            </div>
          </div>
          {sent && (
            <div style={{ position: 'absolute', left: 24, right: 24, bottom: 34, borderRadius: 18, padding: 18, background: C.redSoft, border: `1.5px solid ${C.red}`, opacity: interpolate(t, [s.send + 0.5, s.send + 0.9], [0, 1], clamp) }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: C.red, fontWeight: 700, fontSize: 22 }}><BellOff size={24} color={C.red} /> No one notified</div>
              <div style={{ fontSize: 19, marginTop: 6, color: C.ink }}>Seen by 0 · waiting {mmss}</div>
              <div style={{ fontSize: 16, marginTop: 6, color: C.mute }}>Pull down to refresh</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/** Who Dora is, big on the clear wall: viewers outside Aritzia don't know what "AO" means. */
const IntroAO: React.FC = () => {
  const s = T.s2;
  const { p, visible } = useInOut(s.intro, s.introOut);
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', left: 90, top: 250, width: 630, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 40}px)`, fontFamily: FONT.sans }}>
      <div style={{ display: 'inline-block', background: C.band, color: C.white, borderRadius: 999, padding: '10px 22px', fontSize: 26, fontWeight: 600, letterSpacing: 0.5 }}>
        Saturday · 2:14 p.m. · peak hours
      </div>
      <div style={{ marginTop: 22, background: C.card, borderRadius: 28, padding: '34px 40px 38px', boxShadow: SHADOW, borderLeft: `8px solid ${C.blue}` }}>
        <div style={{ fontSize: 26, fontWeight: 600, color: C.blue }}>Meet Dora</div>
        <div style={{ fontFamily: FONT.title, fontSize: 60, fontWeight: 700, letterSpacing: -1.8, lineHeight: 1.05, marginTop: 6, color: C.ink }}>Atelier Operations (AO)</div>
        <div style={{ fontSize: 32, lineHeight: 1.3, marginTop: 16, color: C.ink }}>
          Runs Aritzia's fitting rooms: starts rooms for clients, then sends <b>runners</b> to fetch sizes from the floor.
        </div>
      </div>
    </div>
  );
};

/** The client is off-camera and hard to hear, so their line gets a caption. */
const ClientCaption: React.FC = () => {
  const s = T.s2;
  const { p, visible } = useInOut(s.client, s.clientOut);
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', right: 110, top: 330, width: 620, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px)`, fontFamily: FONT.sans }}>
      <div style={{ background: C.card, borderRadius: 28, padding: '24px 32px 28px', boxShadow: SHADOW }}>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: 1.2, color: C.mute }}>CLIENT · FITTING ROOM 3</div>
        <div style={{ fontSize: 46, fontWeight: 500, lineHeight: 1.2, letterSpacing: -0.5, marginTop: 8, color: C.ink }}>
          <Said text="“Could you grab me a size 6?”" start={s.client + 0.1} speak={s.clientSpeak} />
        </div>
      </div>
    </div>
  );
};

export const S02Cmt: React.FC = () => {
  const s = T.s2;
  return (
    <Film src="shot2.mp4">
      <IntroAO />
      <ClientCaption />
      <CmtPhone />
      <Chip x={90} y={880} start={s.leave} tone="red" size={34}>Atelier leaves the rooms to find a runner</Chip>
    </Film>
  );
};

// ---------- 3 · shot3-1: Brady on the floor, hands full ----------
export const S03Runner: React.FC = () => {
  const s = T.s31;
  return (
    <Film src="shot3-1.mp4">
      <Chip x={80} y={70} start={s.chip} size={28}>Brady · Runner · hands full</Chip>
      <Card x={80} y={160} w={720} start={s.quote} end={s.quoteOut}>
        <div style={{ display: 'flex', gap: 18 }}>
          <div style={{ fontSize: 90, lineHeight: 0.8, fontWeight: 700, color: C.blue }}>“</div>
          <div style={{ fontFamily: FONT.italic, fontStyle: 'italic', fontSize: 40, lineHeight: 1.22, letterSpacing: -0.4 }}>
            Zero indicator of any notifications… unless you manually refresh.
          </div>
        </div>
        <div style={{ marginTop: 14, marginLeft: 66, fontSize: 21, color: C.mute, fontWeight: 500 }}>—Aritzia store associate · our interview, Oct 2026</div>
      </Card>
    </Film>
  );
};

// ---------- 3 · shot3-2: the phone stays in the pocket ----------
export const S03Pocket: React.FC = () => {
  const s = T.s32;
  const { t } = useSec();
  const ring = interpolate(t, [s.bubble - 0.2, s.bubble + 0.3], [0, 1], clamp);
  return (
    <Film src="shot3-2.mp4" volume={() => 0}>
      <div style={{ position: 'absolute', left: s.phone.x - 230, top: s.phone.y - 230, width: 460, height: 460, borderRadius: '50%', border: `5px dashed ${C.red}`, opacity: ring * 0.9, transform: `scale(${0.85 + 0.15 * ring}) rotate(${t * 12}deg)` }} />
      <Chip x={1330} y={300} start={s.bubble} tone="red" size={44} icon={<BellOff size={44} />}>0 notifications</Chip>
      <Card x={1330} y={430} w={500} start={s.bubble + 0.6}>
        <div style={{ fontSize: 22, color: C.mute, fontWeight: 600, letterSpacing: 1 }}>RETRIEVAL · ROOM 3</div>
        <div style={{ fontFamily: FONT.title, fontSize: 32, fontWeight: 600, marginTop: 6 }}>Effortless Pant · black · 6</div>
        <div style={{ fontSize: 24, color: C.red, fontWeight: 600, marginTop: 6 }}>Waiting · seen by no one</div>
      </Card>
    </Film>
  );
};

// ---------- 5–6 · shot6: "Hey Brady, size 6 in the black pant, room 3." ----------
// "Hey Brady" opens a direct line: Brady lights up, a line draws Dora → Brady, the rest of the staff dim.
const STAFF = ['Style advisor', 'Brady · Runner', 'Cash wrap', 'Stockroom', 'Floor lead'];
const BRADY = 1;
const ChannelPanel: React.FC = () => {
  const s = T.s6;
  const { t } = useSec();
  const { p, visible } = useInOut(s.panel, s.out);
  if (!visible) return null;
  const W = 860, H = 520;
  const dora = { x: 170, y: 255 };
  const node = (i: number) => ({ x: 560, y: 100 + i * 78 });
  const hl = interpolate(t, [s.hl, s.hl + 0.3], [0, 1], clamp); // Brady picked
  const draw = interpolate(t, [s.line, s.line + 0.45], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const b = node(BRADY);
  const len = Math.hypot(b.x - dora.x, b.y - dora.y);
  return (
    <div style={{ position: 'absolute', left: 80, top: 110, width: W, height: H, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px)`, background: C.card, borderRadius: 26, boxShadow: SHADOW, fontFamily: FONT.sans, color: C.ink }}>
      <div style={{ position: 'absolute', left: 36, top: 26, display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 600, letterSpacing: 1.5, color: C.mute }}>
        <span style={{ width: 12, height: 12, borderRadius: '50%', background: hl > 0 ? C.blue : C.mute }} /> ATELIER CHANNEL · STORE 3 FLOOR
      </div>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {/* faint "could go to anyone" lines, fading as Brady is picked */}
        {STAFF.map((_, i) => i !== BRADY && (
          <line key={i} x1={dora.x} y1={dora.y} x2={node(i).x} y2={node(i).y} stroke={C.line} strokeWidth={3} strokeDasharray="6 10" opacity={1 - hl} />
        ))}
        {/* the direct line */}
        <line x1={dora.x} y1={dora.y} x2={b.x} y2={b.y} stroke={C.blue} strokeWidth={8} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
        {draw >= 1 && [0, 1, 2].map((k) => {
          const f = ((t - s.line - 0.45) / 0.9 + k / 3) % 1;
          return <circle key={k} cx={dora.x + (b.x - dora.x) * f} cy={dora.y + (b.y - dora.y) * f} r={9} fill={C.white} stroke={C.blue} strokeWidth={4} opacity={Math.sin(f * Math.PI)} />;
        })}
      </svg>
      {/* Dora */}
      <div style={{ position: 'absolute', left: dora.x - 62, top: dora.y - 62, width: 124, height: 124, borderRadius: '50%', background: C.navy, color: C.white, display: 'grid', placeItems: 'center', fontFamily: FONT.title, fontSize: 52, fontWeight: 700 }}>D</div>
      <div style={{ position: 'absolute', left: dora.x - 120, top: dora.y + 74, width: 240, textAlign: 'center', fontSize: 26, fontWeight: 600 }}>Dora · Atelier</div>
      {/* staff */}
      {STAFF.map((name, i) => {
        const n = node(i);
        const isB = i === BRADY;
        const pulse = isB ? 1 + 0.18 * Math.sin(Math.min(1, hl) * Math.PI) : 1;
        return (
          <div key={name} style={{ position: 'absolute', left: n.x - 32, top: n.y - 32, display: 'flex', alignItems: 'center', gap: 18, opacity: isB ? 1 : 1 - 0.6 * hl }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', transform: `scale(${pulse})`, background: isB && hl > 0 ? C.blue : C.gray, border: `3px solid ${isB && hl > 0 ? C.blue : C.line}`, color: isB && hl > 0 ? C.white : C.mute, display: 'grid', placeItems: 'center', fontSize: 26, fontWeight: 700, boxShadow: isB ? `0 0 0 ${hl * 10}px rgba(59,133,238,0.22)` : undefined }}>
              {name[0]}
            </div>
            <div style={{ fontSize: isB ? 30 : 24, fontWeight: isB ? 700 : 500, color: isB && hl > 0 ? C.blue : C.ink, whiteSpace: 'nowrap' }}>
              {name}
              {!isB && hl > 0.5 && <span style={{ marginLeft: 12, verticalAlign: 'middle', opacity: Math.min(1, (hl - 0.5) * 2) }}><BellOff size={22} color={C.mute} /></span>}
            </div>
          </div>
        );
      })}
      <Fade start={s.direct} style={{ position: 'absolute', left: 36, bottom: 24, display: 'flex', alignItems: 'center', gap: 10, background: C.blue, color: C.white, borderRadius: 999, padding: '10px 22px', fontSize: 24, fontWeight: 600 }}>
        <Tap size={24} /> Direct line: only Brady hears it · rest of the floor not interrupted
      </Fade>
    </div>
  );
};
const Fade: React.FC<{ start: number; style?: React.CSSProperties; children: React.ReactNode }> = ({ start, style, children }) => {
  const { p, visible } = useInOut(start);
  if (!visible) return null;
  return <div style={{ ...style, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 14}px)` }}>{children}</div>;
};

export const S06Request: React.FC = () => {
  const s = T.s6;
  const { t } = useSec();
  const ts = s.ear.map((e) => e[0]);
  const ex = interpolate(t, ts, s.ear.map((e) => e[1]), clamp);
  const ey = interpolate(t, ts, s.ear.map((e) => e[2]), clamp);
  const title = useInOut(s.title, s.titleOut);
  return (
    <Film src="shot6.mp4">
      {title.visible && (
        <div style={{ position: 'absolute', left: 110, top: 90, opacity: Math.min(1, title.p * 1.4), transform: `translateY(${(1 - title.p) * 30}px)`, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.45)' }}>
          <div style={{ fontFamily: FONT.sans, fontSize: 30, fontWeight: 600, letterSpacing: 4, opacity: 0.9 }}>NOW, WITH</div>
          <div style={{ fontFamily: FONT.title, fontSize: 124, fontWeight: 700, letterSpacing: -4, lineHeight: 1.05, display: 'flex', alignItems: 'center', gap: 22 }}>
            Atelier, by Joule <JouleMark size={64} color="#fff" />
          </div>
        </div>
      )}
      <EarGlow x={ex} y={ey} start={s.glow} end={s.out} />
      <ChannelPanel />
      <Bubble x={80} y={650} w={860} start={s.bubble} end={s.out} who="Dora → Brady" text="Hey Brady, can you get me a size 6 Effortless Pant in black?" speak={3.0} highlight="Brady"
        listen={{ src: 'footage/shot6.mp4', from: s.speech[0], to: s.speech[1], status: 'Joule transcribing · opening channel', done: 'Channel open: Dora ↔ Brady' }} />
      <Chip x={80} y={975} start={s.logged} end={s.out} size={24} icon={<Check size={26} color="#fff" />} tone="blue">Logged in CMT · Room 3 · Effortless Pant · black · 6</Chip>
    </Film>
  );
};

// ---------- 6 · shot6-1: the request leaves Dora's earpiece, toward Brady ----------
export const S06EarOut: React.FC = () => {
  const s = T.s61;
  return (
    <Film src="shot6-1.mp4">
      <EarGlow x={s.ear.x} y={s.ear.y} start={0} end={s.dur} />
      <Waves x1={s.ear.x + 60} y1={s.ear.y - 20} x2={2000} y2={520} start={s.waves} end={s.dur - 0.4} />
      <Chip x={70} y={70} start={s.chip} tone="blue" size={30} icon={<Tap size={30} />}>Only Brady hears it</Chip>
      <Chip x={70} y={150} start={s.chip + 0.6} size={24}>Rest of the floor: not interrupted</Chip>
    </Film>
  );
};

// ---------- 6–7 · shot6-2_7-1: it lands in Brady's ear; he asks Joule ----------
export const S06EarIn: React.FC = () => {
  const s = T.s62;
  return (
    <Film src="shot6-2_7-1.mp4">
      <Waves x1={-80} y1={480} x2={s.ear.x - 30} y2={s.ear.y} start={s.arrive} end={0.95} />
      <EarGlow x={s.ear.x} y={s.ear.y} start={s.chime} end={1.25} />
      <Card x={70} y={60} w={600} start={s.card} end={s.cardOut} from="left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 22, fontWeight: 600, color: C.blue, letterSpacing: 1.2 }}><Tap size={26} color={C.blue} /> NEW REQUEST · FROM DORA</div>
        <div style={{ fontFamily: FONT.title, fontSize: 38, fontWeight: 600, marginTop: 8 }}>Effortless Pant · black · 6</div>
        <div style={{ fontSize: 28, color: C.mute, marginTop: 4, fontWeight: 500 }}>to Room 3</div>
      </Card>
      <Bubble x={90} y={110} w={700} start={s.ask} who="Brady → Joule" text="Hey Joule, do we have it?" speak={1.1}
        listen={{ src: 'footage/shot6-2_7-1.mp4', from: s.speech[0], to: s.speech[1], status: 'Joule listening', done: 'Checking live stock' }} />
    </Film>
  );
};

// ---------- 7 · shot7: Joule answers with live stock ----------
const StockRow: React.FC<{ item: string; where: string; tone: 'red' | 'blue'; start: number }> = ({ item, where, tone, start }) => {
  const { p } = useInOut(start);
  return (
    <div style={{ opacity: Math.min(1, p * 1.4), transform: `translateX(${(1 - p) * -20}px)`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderTop: `1px solid ${C.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{ width: 18, height: 18, borderRadius: 6, background: item.startsWith('Black') ? '#111' : '#1F2B4A' }} />
        <span style={{ fontSize: 30, fontWeight: 600 }}>{item}</span>
      </div>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 26, fontWeight: 600, color: tone === 'red' ? C.red : C.blue }}>
        {tone === 'blue' && <Pin size={26} />}{where}
      </span>
    </div>
  );
};
export const S07Stock: React.FC = () => {
  const s = T.s7;
  const { fps } = useSec();
  // the take's own sound dips under Joule's voice, then comes back
  const duck = (f: number) => interpolate(f / fps, [s.voice - 0.25, s.voice, s.voice + s.voiceDur, s.voice + s.voiceDur + 0.3], [1, 0.12, 0.12, 1], clamp);
  return (
    <Film src="shot7.mp4" volume={duck}>
      <Sequence from={Math.round((s.voice - s.voiceLead) * fps)} layout="none">
        <Audio src={staticFile('audio/joule-stock.wav')} />
      </Sequence>
      <EarGlow x={s.ear.x} y={s.ear.y} start={s.glow} end={s.voice + s.voiceDur} />
      <Bubble x={80} y={70} w={780} start={s.voice - 0.1} end={s.out} who="Joule" via="joule" text="Black 6 is sold out. Navy 6, two on rack B." speak={s.voiceDur - 0.2}
        listen={{ src: 'audio/joule-stock.wav', audioAt: -(s.voice - s.voiceLead), from: s.voice, to: s.voice + s.voiceDur, status: 'Joule speaking', done: 'Answered from live stock' }} />
      <Card x={80} y={470} w={780} start={s.map} end={s.out}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 1.2, color: C.mute }}>LIVE STOCK · THIS BOUTIQUE</span>
          <span style={{ fontSize: 20, fontWeight: 600, color: C.blue, background: C.blueSoft, borderRadius: 999, padding: '6px 14px' }}>SAP S/4HANA</span>
        </div>
        <StockRow item="Black · size 6" where="Floor 0 · Back 0" tone="red" start={s.map + 0.3} />
        <StockRow item="Navy · size 6" where="Rack B · 2" tone="blue" start={s.map + 0.8} />
      </Card>
    </Film>
  );
};

// ---------- 8 · shot8-1 / 8-2: "Hey Dora, navy okay?" / "Navy's perfect." ----------
export const S08Ask: React.FC = () => (
  <Film src="shot8-1.mp4">
    <Bubble x={90} y={110} w={700} start={T.s81.ask} who="Brady → Dora" text="Hey Dora, does navy size 6 work?" speak={1.8} highlight="Dora"
      listen={{ src: 'footage/shot8-1.mp4', from: T.s81.speech[0], to: T.s81.speech[1], status: 'Joule transcribing · opening channel', done: 'Channel open: Brady ↔ Dora' }} />
  </Film>
);
export const S08Yes: React.FC = () => {
  const s = T.s82;
  return (
    <Film src="shot8-2.mp4">
      <Bubble x={90} y={130} w={620} start={s.reply} who="Dora → Brady" text="Navy's great!" speak={0.8}
        listen={{ src: 'footage/shot8-2.mp4', from: s.speech[0], to: s.speech[1], status: 'Joule transcribing', done: 'Substitute accepted · logged' }} />
    </Film>
  );
};

// ---------- 9–10 · shot9-1 / 9-2: on its way, then the hand-off ----------
const OnWay: React.FC<{ x: number; y: number; start: number; end: number }> = ({ x, y, start, end }) => (
  <Card x={x} y={y} w={540} start={start} end={end}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 32, fontWeight: 600 }}>
      <span style={{ width: 46, height: 46, borderRadius: '50%', background: C.blue, display: 'grid', placeItems: 'center' }}><Tap size={28} /></span>
      On its way · ~2 min
    </div>
    <div style={{ fontSize: 24, color: C.mute, marginTop: 8, fontWeight: 500 }}>Navy · size 6 → Room 3 · Dora felt a tap</div>
  </Card>
);
const TICKS = ['No refreshing', 'No shouting', 'Hands stay busy'];
export const S09Long: React.FC = () => {
  const s = T.s91;
  return (
    <Film src="shot9-1.mp4">
      <OnWay x={70} y={70} start={s.onWay} end={s.onWayOut} />
      <Ticks x={300} y={930} items={TICKS} start={s.ticks} row />
    </Film>
  );
};
export const S09Short: React.FC = () => {
  const s = T.s92;
  return (
    <Film src="shot9-2.mp4">
      <OnWay x={1290} y={80} start={s.onWay} end={s.onWayOut} />
      <Ticks x={1400} y={70} items={TICKS} start={s.ticks} gap={0.45} />
    </Film>
  );
};
