// Acted shots with overlays. One component per take in public/footage. Cues in ../timing.ts.
import React from 'react';
import { Audio, Easing, interpolate, Sequence, staticFile } from 'remotion';
import { C, FONT, GLASS, SHADOW } from '../brand';
import { T } from '../timing';
import { BellOff, Bubble, Card, Check, Chip, clamp, EarGlow, Film, JouleMark, NameBadge, Pant, Person, Pin, Said, Tap, Ticks, useInOut, useSec, Waves } from '../kit';

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

/** Who Dora is, as a staff badge on the clear wall: viewers outside Aritzia don't know what "AO" means. */
const IntroAO: React.FC = () => {
  const s = T.s2;
  return (
    <NameBadge x={90} top={150} w={630} start={s.intro} end={s.introOut} name="Dora" role="Atelier Operations · AO" avatar={C.navy}
      desc={<>Runs the fitting rooms: starts rooms for clients, then sends <b>runners</b> to fetch sizes from the floor.</>}>
      <div style={{ background: C.band, color: C.white, padding: '12px 30px', fontSize: 22, fontWeight: 600 }}>On shift · Saturday 2:14 p.m. · peak hours</div>
    </NameBadge>
  );
};

/** The client is off-camera and hard to hear, so their line gets a caption. */
const ClientCaption: React.FC = () => {
  const s = T.s2;
  const { p, visible } = useInOut(s.client, s.clientOut);
  if (!visible) return null;
  return (
    <div style={{ position: 'absolute', right: 110, top: 330, width: 620, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px)`, fontFamily: FONT.sans }}>
      <div style={{ background: C.card, backdropFilter: GLASS, borderRadius: 28, padding: '24px 32px 28px', boxShadow: SHADOW }}>
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
/** Who Brady is, as a staff badge like Dora's: viewers don't know what a "runner" is either. */
export const S03Runner: React.FC = () => {
  const s = T.s31;
  return (
    <Film src="shot3-1.mp4">
      <NameBadge x={70} top={125} w={640} start={s.chip} name="Brady" role="Runner · boutique associate" avatar={C.blue}
        desc={<>Serves clients on the floor <b>and</b> fetches sizes for the fitting rooms, usually with hands full.</>} />
      <Card x={70} y={540} w={680} start={s.quote} end={s.quoteOut}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <Person size={76} color="#8E9AAF" />
            <div style={{ fontSize: 17, color: C.mute, fontWeight: 600, marginTop: 6 }}>Associate</div>
          </div>
          <div>
            <div style={{ fontFamily: FONT.italic, fontStyle: 'italic', fontSize: 36, lineHeight: 1.22, letterSpacing: -0.4 }}>
              “Zero indicator of any notifications… unless you manually refresh.”
            </div>
            <div style={{ marginTop: 12, fontSize: 20, color: C.mute, fontWeight: 500 }}>—Aritzia store associate · our interview, Oct 2026</div>
          </div>
        </div>
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
// Everyone on the floor Dora could be calling: three runners (Brady is one), plus other roles.
const STAFF = [
  { name: 'Maya', role: 'Runner', color: '#8E9AAF' },
  { name: 'Brady', role: 'Runner', color: C.blue },
  { name: 'Leo', role: 'Runner', color: '#9C8B7A' },
  { name: 'Sofia', role: 'Style advisor', color: '#A0A7B4' },
  { name: 'Jin', role: 'Floor lead', color: '#7D8C99' },
];
const BRADY = 1;
const ChannelPanel: React.FC = () => {
  const s = T.s6;
  const { t } = useSec();
  const { p, visible } = useInOut(s.panel, s.out);
  if (!visible) return null;
  const W = 860, H = 540;
  const dora = { x: 700, y: 250 }; // right side, the side Dora stands on in the frame
  const node = (i: number) => ({ x: 300, y: 104 + i * 80 });
  const lock = interpolate(t, [s.hl, s.hl + 0.3], [0, 1], clamp); // Joule heard "Brady"
  const draw = interpolate(t, [s.line, s.line + 0.45], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  // before the name: Joule scans everyone, a highlight sweeping down and back up the list
  const scanning = t < s.hl;
  const sweep = ((t - s.panel) / 0.28) % (STAFF.length * 2 - 2);
  const scanI = Math.round(sweep < STAFF.length ? sweep : STAFF.length * 2 - 2 - sweep);
  const b = node(BRADY);
  const len = Math.hypot(b.x - dora.x, b.y - dora.y);
  return (
    <div style={{ position: 'absolute', left: 80, top: 100, width: W, height: H, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px)`, background: C.card, backdropFilter: GLASS, borderRadius: 26, boxShadow: SHADOW, fontFamily: FONT.sans, color: C.ink }}>
      <div style={{ position: 'absolute', left: 36, top: 24, right: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 22, fontWeight: 600, letterSpacing: 1.2 }}>
        <span style={{ color: C.mute }}>ATELIER CHANNEL · FLOOR STAFF</span>
        <span style={{ color: lock > 0.5 ? C.green : C.blue, display: 'flex', alignItems: 'center', gap: 8 }}>
          {lock > 0.5 ? <><Check size={22} color={C.green} /> HEARD “BRADY”</> : <><span style={{ width: 10, height: 10, borderRadius: '50%', background: C.blue, opacity: 0.4 + 0.6 * Math.abs(Math.sin(t * 6)) }} /> FINDING WHO DORA MEANS…</>}
        </span>
      </div>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {/* scanning: a line to whoever Joule is checking; all faint lines fade once Brady is locked */}
        {STAFF.map((_, i) => (
          <line key={i} x1={node(i).x + 34} y1={node(i).y} x2={dora.x - 62} y2={dora.y} stroke={scanning && i === scanI ? C.blue : C.line} strokeWidth={scanning && i === scanI ? 4 : 3} strokeDasharray="6 9" opacity={(1 - lock) * (scanning && i === scanI ? 0.9 : 0.8)} />
        ))}
        {/* the direct line, Dora → Brady */}
        <line x1={dora.x - 62} y1={dora.y} x2={b.x + 34} y2={b.y} stroke={C.blue} strokeWidth={8} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
        {draw >= 1 && [0, 1, 2].map((k) => {
          const f = ((t - s.line - 0.45) / 0.9 + k / 3) % 1;
          return <circle key={k} cx={dora.x - 62 + (b.x + 34 - dora.x + 62) * f} cy={dora.y + (b.y - dora.y) * f} r={9} fill={C.white} stroke={C.blue} strokeWidth={4} opacity={Math.sin(f * Math.PI)} />;
        })}
      </svg>
      {/* Dora, right */}
      <div style={{ position: 'absolute', left: dora.x - 62, top: dora.y - 62 }}><Person size={124} color={C.navy} ring={C.navy} /></div>
      <div style={{ position: 'absolute', left: dora.x - 110, top: dora.y + 70, width: 220, textAlign: 'center' }}>
        <div style={{ fontSize: 28, fontWeight: 700 }}>Dora</div>
        <div style={{ fontSize: 21, color: C.mute, fontWeight: 500 }}>Atelier ops</div>
      </div>
      {/* the floor staff, left: name and role to the left of each person */}
      {STAFF.map((m, i) => {
        const n = node(i);
        const isB = i === BRADY;
        const checking = scanning && i === scanI;
        const pulse = isB ? 1 + 0.16 * Math.sin(Math.min(1, lock) * Math.PI) : checking ? 1.08 : 1;
        const dim = isB ? 1 : 1 - 0.6 * lock;
        return (
          <div key={m.name} style={{ position: 'absolute', left: 36, top: n.y - 34, width: n.x + 34 - 36, height: 68, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16, opacity: dim }}>
            {!isB && lock > 0.5 && <BellOff size={22} color={C.mute} />}
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: isB && lock > 0 ? 28 : 25, fontWeight: isB && lock > 0 ? 700 : 600, color: isB && lock > 0 ? C.blue : C.ink, lineHeight: 1.1 }}>{m.name}</div>
              <div style={{ fontSize: 19, color: C.mute, fontWeight: 500 }}>{m.role}</div>
            </div>
            <div style={{ transform: `scale(${pulse})`, borderRadius: '50%', boxShadow: isB ? `0 0 0 ${lock * 10}px rgba(59,133,238,0.22)` : checking ? '0 0 0 6px rgba(59,133,238,0.2)' : undefined }}>
              <Person size={68} color={isB && lock > 0 ? C.blue : m.color} ring={(isB && lock > 0) || checking ? C.blue : undefined} />
            </div>
          </div>
        );
      })}
      <Fade start={s.direct} style={{ position: 'absolute', left: 36, bottom: 22, display: 'flex', alignItems: 'center', gap: 10, background: C.blue, color: C.white, borderRadius: 999, padding: '10px 22px', fontSize: 23, fontWeight: 600 }}>
        <Tap size={24} /> Direct line to Brady · the rest of the floor isn't interrupted
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
/** Joule's answer as a picture: black 6 is out, navy 6 is on Rack B, and the way there. */
const StockVisual: React.FC = () => {
  const s = T.s7;
  const { t } = useSec();
  const { p, visible } = useInOut(s.card, s.out);
  if (!visible) return null;
  const stamp = interpolate(t, [s.soldOut, s.soldOut + 0.18], [1.8, 1], { ...clamp, easing: Easing.out(Easing.back(2)) });
  const stampO = interpolate(t, [s.soldOut, s.soldOut + 0.1], [0, 1], clamp);
  const navy = useInOutValue(t, s.navy);
  const ok = interpolate(t, [s.navyOk, s.navyOk + 0.2], [0, 1], clamp);
  const mapO = interpolate(t, [s.card + 0.2, s.card + 0.5], [0, 1], clamp); // the floor is there from the start; the route draws in later
  const route = interpolate(t, [s.route, s.route + 0.7], [0, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const tile: React.CSSProperties = { flex: 1, borderRadius: 20, background: 'rgba(255,255,255,0.7)', border: `1.5px solid ${C.line}`, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 18, position: 'relative', overflow: 'hidden' };
  const badge = (txt: string, bg: string) => <span style={{ position: 'absolute', left: 52, top: 92, background: bg, color: C.white, fontFamily: FONT.title, fontWeight: 700, fontSize: 26, borderRadius: 10, padding: '2px 10px' }}>{txt}</span>;
  // the floor map, in the card's own pixels
  const M = { w: 716, h: 200 };
  const you = { x: 60, y: 150 }, rackB = { x: 400, y: 70 };
  const pathD = `M ${you.x} ${you.y} L ${you.x + 140} ${you.y} L ${you.x + 140} ${rackB.y + 40} L ${rackB.x} ${rackB.y + 40} L ${rackB.x} ${rackB.y + 8}`;
  return (
    <div style={{ position: 'absolute', left: 80, top: 400, width: 780, opacity: Math.min(1, p * 1.4), transform: `translateY(${(1 - p) * 30}px)`, background: C.card, backdropFilter: GLASS, borderRadius: 26, boxShadow: SHADOW, padding: '22px 32px 26px', boxSizing: 'border-box', fontFamily: FONT.sans, color: C.ink }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 1.2, color: C.mute }}>LIVE STOCK · EFFORTLESS PANT · SIZE 6</span>
        <span style={{ fontSize: 19, fontWeight: 600, color: C.blue, background: C.blueSoft, borderRadius: 999, padding: '5px 12px' }}>SAP S/4HANA</span>
      </div>
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={tile}>
          <div style={{ position: 'relative' }}>
            <div style={{ opacity: 1 - 0.55 * stampO }}><Pant color="#16181C" size={96} />{badge('6', '#16181C')}</div>
            <svg width={96} height={120} viewBox="0 0 96 120" style={{ position: 'absolute', left: 0, top: 0, opacity: stampO, transform: `scale(${stamp})` }}>
              <path d="M18 24 L78 96 M78 24 L18 96" stroke={C.red} strokeWidth={10} strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: FONT.title, fontSize: 32, fontWeight: 700 }}>Black</div>
            <div style={{ display: 'inline-block', marginTop: 6, transform: `rotate(-6deg) scale(${stamp})`, opacity: stampO, border: `3px solid ${C.red}`, color: C.red, fontFamily: FONT.title, fontWeight: 800, fontSize: 24, letterSpacing: 1.5, padding: '1px 10px', borderRadius: 8, whiteSpace: 'nowrap' }}>SOLD OUT</div>
            <div style={{ fontSize: 20, fontWeight: 600, color: C.mute, marginTop: 6 }}>Floor 0 · Back 0</div>
          </div>
        </div>
        <div style={{ ...tile, opacity: navy, transform: `translateY(${(1 - navy) * 20}px)`, borderColor: ok > 0.5 ? C.green : C.line }}>
          <div style={{ position: 'relative' }}><Pant color="#22325A" size={96} />{badge('6', '#22325A')}</div>
          <div>
            <div style={{ fontFamily: FONT.title, fontSize: 32, fontWeight: 700 }}>Navy</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 26, fontWeight: 700, color: C.green, marginTop: 4, opacity: ok }}><Check size={28} color={C.green} /> 2 on Rack B</div>
          </div>
        </div>
      </div>
      {/* where it is: a mini floor plan, the route from Brady to Rack B draws in */}
      <div style={{ marginTop: 16, opacity: mapO, position: 'relative', height: M.h, borderRadius: 18, background: 'rgba(240,249,254,0.85)', border: `1.5px solid ${C.line}` }}>
        <svg width={M.w} height={M.h} style={{ position: 'absolute', inset: 0 }}>
          {[['A', 300], ['B', 400], ['C', 500]].map(([n, x]) => (
            <g key={n as string}>
              <rect x={(x as number) - 34} y={40} width={68} height={22} rx={6} fill={n === 'B' && route > 0.95 ? C.green : '#C8D3DE'} />
              <text x={x as number} y={92} textAnchor="middle" fontSize={20} fontWeight={600} fill={n === 'B' ? C.ink : C.mute} fontFamily={FONT.sans}>Rack {n as string}</text>
            </g>
          ))}
          <rect x={600} y={24} width={96} height={150} rx={12} fill="none" stroke="#B9C6D3" strokeWidth={2} strokeDasharray="6 6" />
          <text x={648} y={104} textAnchor="middle" fontSize={18} fontWeight={600} fill={C.mute} fontFamily={FONT.sans}>Rooms</text>
          <path d={pathD} fill="none" stroke={C.blue} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1000" strokeDashoffset={1000 * (1 - route)} />
          <circle cx={you.x} cy={you.y} r={14} fill={C.blue} />
          <text x={you.x} y={you.y + 40} textAnchor="middle" fontSize={20} fontWeight={700} fill={C.blue} fontFamily={FONT.sans}>Brady</text>
        </svg>
        {route > 0.95 && <div style={{ position: 'absolute', left: rackB.x - 16, top: rackB.y - 58 }}><Pin size={34} color={C.green} /></div>}
      </div>
    </div>
  );
};
const useInOutValue = (t: number, start: number) => interpolate(t, [start, start + 0.3], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

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
      <Bubble x={80} y={60} w={780} start={s.voice - 0.1} end={s.out} who="Joule" via="joule" text="Black 6 is sold out. Navy 6, two on rack B." speak={s.voiceDur - 0.2}
        listen={{ src: 'audio/joule-stock.wav', audioAt: -(s.voice - s.voiceLead), from: s.voice, to: s.voice + s.voiceDur, status: 'Joule speaking', done: 'Answered from live stock' }} />
      <StockVisual />
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
