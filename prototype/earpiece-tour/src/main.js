import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
// Inlined as base64 by esbuild: the artifact host will not serve .glb as its
// own file, and this drops a request in every other context too.
import glbBase64 from '../public/atelier-earpiece.glb';

/* ------------------------------------------------------------------ *
 * Atelier, by Joule — scroll-driven hardware walkthrough
 *
 * All camera targets and callout anchors below are true world-space
 * coordinates (metres) measured out of atelier-earpiece.glb, so the
 * framing stays locked to the real parts rather than eyeballed.
 * ------------------------------------------------------------------ */

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const lerp = (a, b, t) => a + (b - a) * t;

function smoothstep(a, b, x) {
  const d = b - a;
  const t = clamp01(d === 0 ? (x >= b ? 1 : 0) : (x - a) / d);
  return t * t * (3 - 2 * t);
}

/** Button-press shape: quick down, brief hold, quick release. */
function pulse(x, centre, rise, fall) {
  const up = smoothstep(centre - rise, centre, x);
  const down = 1 - smoothstep(centre + 0.015, centre + 0.015 + fall, x);
  return Math.max(0, Math.min(up, down));
}

/* ---------------- choreography ---------------- */

const STEPS = [
  { // 0 · hero — whole device
    target: [0.034, 0.087, -0.014],
    pos:    [0.1439, 0.1584, 0.2278],
    sway: 0.17,
  },
  { // 1 · anatomy — whole device, frontal, room for callouts
    target: [0.034, 0.087, -0.014],
    pos:    [0.1003, 0.1473, 0.2723],
    sway: 0.05,
  },
  { // 2 · power button + indicator light, top-front-right
    target: [0.0180, 0.1000, 0.0040],
    pos:    [0.0385, 0.1271, 0.0534],
    sway: 0.018,
  },
  { // 3 · volume dial, raked to catch the knurling
    target: [0.0130, 0.0960, 0.0075],
    pos:    [0.0285, 0.1126, 0.0577],
    sway: 0.018,
  },
  { // 4 · mute button, raked from the right so the press reads
    target: [0.0160, 0.0972, 0.0074],
    pos:    [0.0412, 0.1098, 0.0385],
    sway: 0.014,
  },
  { // 5 · in use — ear unit through mic boom
    target: [0.048, 0.072, -0.012],
    pos:    [0.109,  0.143,  0.169],
    sway: 0.06,
  },
  { // 6 · close — whole device from the other side
    target: [ 0.034,  0.087, -0.014],
    pos:    [-0.0533, 0.1568, 0.2536],
    sway: 0.15,
  },
];

const LABELS = [
  { id: 'hook',  text: 'Ear hook',        p: [-0.0104, 0.1010, -0.0048], dx: -112, dy: -16, steps: [1] },
  { id: 'tip',   text: 'Ear tip',         p: [ 0.0131, 0.0955, -0.0095], dx: -114, dy:  30, steps: [1] },
  { id: 'power', text: 'Power',           p: [ 0.0195, 0.1055,  0.0025], dx:   84, dy: -52, steps: [1, 2], key: true },
  { id: 'led',   text: 'Indicator light', p: [ 0.0232, 0.1006,  0.0063], dx:  104, dy: -10, steps: [1, 2, 4, 5], key: true },
  { id: 'dial',  text: 'Volume dial',     p: [ 0.0075, 0.0905,  0.0085], dx: -118, dy:  30, steps: [1, 3], key: true },
  { id: 'mute',  text: 'Mute',            p: [ 0.0130, 0.0960,  0.0082], dx:  104, dy:  46, steps: [1, 4], key: true },
  { id: 'boom',  text: 'Mic boom',        p: [ 0.0897, 0.0451, -0.0296], dx:   96, dy:  16, steps: [1, 5] },
];

const FINISH = {
  Shell_MatteBlack: { color: 0x141418, roughness: 0.58, metalness: 0.00 },
  Button:           { color: 0x1A1A1F, roughness: 0.44, metalness: 0.00 },
  Rubber:           { color: 0x0D0D10, roughness: 0.92, metalness: 0.00 },
  MicFoam:          { color: 0x15151A, roughness: 1.00, metalness: 0.00 },
  Chrome:           { color: 0x8E9196, roughness: 0.22, metalness: 1.00 },
};

const LED_LIVE  = new THREE.Color('#2F93FF');
const LED_MUTED = new THREE.Color('#F0A63C');

/* ---------------- dom ---------------- */

const $ = (sel) => document.querySelector(sel);

const stageEl  = $('[data-stage]');
const canvasEl = $('[data-canvas]');
const leadersEl = $('[data-leaders]');
const labelsEl = $('[data-labels]');
const hudEl    = $('[data-hud]');
const railEl   = $('[data-rail]');
const waveEl   = $('[data-wave]');
const bootEl   = $('[data-boot]');
const bootFill = $('[data-boot-fill]');
const bootLabel = $('[data-boot-label]');
const meterEl  = $('[data-meter]');

const hudOut = {
  power: $('[data-v="power"]'),
  vol:   $('[data-v="vol"]'),
  mic:   $('[data-v="mic"]'),
  dotPower: $('[data-dot="power"]'),
  dotMic:   $('[data-dot="mic"]'),
};

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* step rail */
const railTicks = STEPS.map(() => {
  const t = document.createElement('span');
  t.className = 'rail__tick';
  railEl.appendChild(t);
  return t;
});

/* volume meter — ten steps, matching the copy */
const METER_STEPS = 10;
const meterBars = [];
for (let i = 0; i < METER_STEPS; i++) {
  const b = document.createElement('i');
  meterEl.appendChild(b);
  meterBars.push(b);
}

/* callout labels + leader lines */
const SVG_NS = 'http://www.w3.org/2000/svg';
const labelViews = LABELS.map((def) => {
  const root = document.createElement('div');
  root.className = 'lbl' + (def.key ? ' lbl--key' : '');
  const dot = document.createElement('span');
  dot.className = 'lbl__dot';
  const txt = document.createElement('span');
  txt.className = 'lbl__txt';
  txt.textContent = def.text;
  root.append(dot, txt);
  labelsEl.appendChild(root);

  const line = document.createElementNS(SVG_NS, 'line');
  leadersEl.appendChild(line);

  return { def, root, txt, line, world: new THREE.Vector3(...def.p), shown: -1, w: 0 };
});

function fail(message) {
  bootEl.classList.remove('is-done');
  bootEl.style.opacity = '1';
  bootFill.parentElement.style.display = 'none';
  bootLabel.className = 'boot__msg';
  bootLabel.textContent = message;
}

/* ---------------- renderer ---------------- */

let renderer;
try {
  renderer = new THREE.WebGLRenderer({
    canvas: canvasEl,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
} catch (err) {
  fail('This walkthrough needs WebGL, which this browser has turned off. The written steps alongside still describe each control.');
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(34, 1, 0.002, 6);

const keyLight  = new THREE.DirectionalLight(0xffffff, 0.6);
const fillLight = new THREE.DirectionalLight(0xffffff, 0.12);
const rimLight  = new THREE.DirectionalLight(0xffffff, 0.7);
const ledLight  = new THREE.PointLight(LED_LIVE.clone(), 0, 0.04, 2);

keyLight.position.set(0.22, 0.26, 0.30);
fillLight.position.set(-0.26, 0.04, 0.18);
rimLight.position.set(-0.12, 0.16, -0.30);
ledLight.position.set(0.0232, 0.1006, 0.0075);
scene.add(keyLight, fillLight, rimLight, ledLight);

/* LED bloom stand-in — the emitter is only 1.4 mm across, so a small
   additive sprite is what makes the state legible on camera. */
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const rg = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  rg.addColorStop(0.00, 'rgba(255,255,255,1)');
  rg.addColorStop(0.22, 'rgba(255,255,255,0.5)');
  rg.addColorStop(1.00, 'rgba(255,255,255,0)');
  g.fillStyle = rg;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const glow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: glowTexture(),
  color: LED_LIVE.clone(),
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
  opacity: 0,
}));
glow.position.set(0.0232, 0.1006, 0.0072);
glow.scale.setScalar(0.0045);
scene.add(glow);

/* ---------------- theme ---------------- */

function isDark() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'dark') return true;
  if (attr === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme() {
  if (!renderer) return;
  const dark = isDark();
  renderer.toneMappingExposure = dark ? 1.05 : 1.0;
  keyLight.intensity  = dark ? 0.5 : 0.6;
  fillLight.intensity = dark ? 0.08 : 0.12;
  rimLight.intensity  = dark ? 1.0 : 0.7;
  scene.environmentIntensity = dark ? 0.55 : 0.95;
}

/* ---------------- model ---------------- */

const parts = { dial: null, mute: null, power: null, led: null, ledMat: null };
const base = { mutez: 0, powery: 0 };
let ready = false;

function initScene() {
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  pmrem.dispose();

  applyTheme();
  resize();

  let glb;
  try {
    const bin = atob(glbBase64);
    glb = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) glb[i] = bin.charCodeAt(i);
  } catch (err) {
    fail('The earpiece model could not be decoded. The written steps alongside still describe each control.');
    return;
  }

  bootFill.style.width = '100%';

  new GLTFLoader().parse(
    glb.buffer,
    '',
    (gltf) => {
      scene.add(gltf.scene);

      // The cable and jack read as clutter next to a 27 mm ear unit, so the
      // walkthrough shows the wearable half only.
      const cable = gltf.scene.getObjectByName('Cable');
      if (cable) cable.visible = false;

      gltf.scene.traverse((o) => {
        const m = o.material;
        if (!m) return;
        const spec = FINISH[m.name];
        if (!spec) return;
        m.color.setHex(spec.color);
        m.roughness = spec.roughness;
        m.metalness = spec.metalness;
        m.needsUpdate = true;
      });

      parts.dial  = gltf.scene.getObjectByName('VolumeDial');
      parts.mute  = gltf.scene.getObjectByName('MuteButton');
      parts.power = gltf.scene.getObjectByName('PowerButton');
      parts.led   = gltf.scene.getObjectByName('StatusLED');

      if (!parts.dial || !parts.mute || !parts.power || !parts.led) {
        fail('The earpiece model loaded without its control parts, so the walkthrough cannot animate them.');
        return;
      }

      base.mutez = parts.mute.position.z;
      base.powery = parts.power.position.y;

      // Own the LED material so changing its emission can't bleed elsewhere.
      parts.ledMat = parts.led.material.clone();
      parts.ledMat.emissive = new THREE.Color(0x000000);
      parts.ledMat.emissiveIntensity = 0;
      parts.ledMat.toneMapped = true;
      parts.led.material = parts.ledMat;
      parts.ledBase = parts.ledMat.color.clone();

      ready = true;
      bootEl.classList.add('is-done');
      measure();
    },
    () => fail('The earpiece model could not be read. The written steps alongside still describe each control.')
  );
}

/* ---------------- scroll timeline ---------------- */

/* `u` is one continuous scalar over the whole page: its integer part is
   the active step, its fraction is progress through that step. Every
   camera move and every button press is keyed off it, so scrolling back
   up replays the whole thing in reverse. */

const plates = Array.from(document.querySelectorAll('.plate'));
let anchors = [];
let pinned = [];

function measure() {
  const vh = window.innerHeight;
  anchors = plates.map((p) => p.getBoundingClientRect().top + window.scrollY);
  // A plate's card is stuck for (height - one viewport) of scroll, then slides
  // away over the last viewport. Everything times off that fraction, so
  // changing a plate's --h retimes its animation instead of desyncing it.
  pinned = plates.map((p) => {
    const h = p.getBoundingClientRect().height;
    return h > 0 ? Math.max(0.12, Math.min(0.92, (h - vh) / h)) : 0.62;
  });
}

/** Progress through step `k`'s pinned phase: 0 before it, 1 once it releases. */
const pinProgress = (u, k) => clamp01((u - k) / (pinned[k] || 0.62));

function computeU() {
  if (anchors.length < 2) return 0;
  const y = window.scrollY;
  if (y <= anchors[0]) return 0;
  for (let i = 0; i < anchors.length - 1; i++) {
    if (y <= anchors[i + 1]) {
      const span = Math.max(1, anchors[i + 1] - anchors[i]);
      return i + (y - anchors[i]) / span;
    }
  }
  return anchors.length - 1;
}

/* ---------------- resize ---------------- */

let W = 1, H = 1;

function resize() {
  if (!renderer) return;
  const r = stageEl.getBoundingClientRect();
  W = Math.max(1, Math.round(r.width));
  H = Math.max(1, Math.round(r.height));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H, false);
  camera.aspect = W / H;
  camera.updateProjectionMatrix();
  leadersEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  measure();
}

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', () => setTimeout(resize, 220));
if ('ResizeObserver' in window) new ResizeObserver(resize).observe(document.body);

const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
darkQuery.addEventListener('change', applyTheme);
new MutationObserver(applyTheme).observe(document.documentElement, {
  attributes: true, attributeFilter: ['data-theme'],
});

/* ---------------- per-frame ---------------- */

const curPos = new THREE.Vector3(...STEPS[0].pos);
const curTgt = new THREE.Vector3(...STEPS[0].target);
const wantPos = new THREE.Vector3();
const wantTgt = new THREE.Vector3();
const offset = new THREE.Vector3();
const lookTgt = new THREE.Vector3();
const projected = new THREE.Vector3();
const tmpColour = new THREE.Color();

const B = new THREE.Vector3();

let clock = new THREE.Clock();
let lastLevel = -1;
let lastPower = null;
let lastMic = null;

function frame(dtOverride) {
  const dt = dtOverride !== undefined ? dtOverride : Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const u = computeU();

  /* ----- state driven by scroll ----- */
  const p2 = pinProgress(u, 2);
  const p3 = pinProgress(u, 3);
  const p4 = pinProgress(u, 4);

  const powerOn = smoothstep(0.50, 0.66, p2);
  const powerPress = pulse(p2, 0.54, 0.09, 0.16);

  // Resting level, then the dial sweeps up and settles back at 6.
  const VOL_REST = 0.4;
  const volume = p3 < 0.62
    ? lerp(VOL_REST, 0.95, smoothstep(0.14, 0.62, p3))
    : lerp(0.95, 0.62, smoothstep(0.62, 0.90, p3));

  // Pressed on, held amber long enough to read, then pressed off again.
  const muted = clamp01(smoothstep(0.28, 0.36, p4) - smoothstep(0.70, 0.78, p4));
  const mutePress = Math.max(pulse(p4, 0.30, 0.07, 0.14), pulse(p4, 0.72, 0.07, 0.14));

  /* ----- camera ----- */
  const i = Math.min(STEPS.length - 1, Math.floor(u));
  const j = Math.min(STEPS.length - 1, i + 1);
  const f = u - i;
  // Hold while the card is pinned; travel while it slides away.
  const e = smoothstep(pinned[i] || 0.62, 1.0, f);

  wantTgt.fromArray(STEPS[i].target).lerp(B.fromArray(STEPS[j].target), e);
  wantPos.fromArray(STEPS[i].pos).lerp(B.fromArray(STEPS[j].pos), e);

  offset.subVectors(wantPos, wantTgt);
  const dist = offset.length();

  // Keep the device framed when the stage is portrait (phones, narrow windows).
  const aspect = W / H;
  const narrow = aspect < 0.95;
  const stacked = window.innerWidth <= 900;
  const fit = narrow ? Math.min(2.4, 0.95 / Math.max(aspect, 0.3)) : 1;
  offset.multiplyScalar(fit);

  // Gentle sway so the hero reads as alive without being distracting.
  if (!reduced) {
    const sway = lerp(STEPS[i].sway, STEPS[j].sway, e);
    const a = Math.sin(t * 0.17) * sway;
    const cos = Math.cos(a), sin = Math.sin(a);
    const x = offset.x, z = offset.z;
    offset.x = x * cos + z * sin;
    offset.z = -x * sin + z * cos;
  }

  wantPos.copy(wantTgt).add(offset);

  // On a narrow stage the text card covers the lower third, so aim a
  // little below the part to lift it into the clear area.
  if (stacked) wantTgt.y -= dist * fit * 0.14;

  const k = reduced ? 1 : 1 - Math.pow(0.0001, dt);
  curPos.lerp(wantPos, k);
  curTgt.lerp(wantTgt, k);

  camera.position.copy(curPos);
  camera.lookAt(lookTgt.copy(curTgt));

  /* ----- parts ----- */
  if (ready) {
    parts.mute.position.z = base.mutez - mutePress * 0.95;      // mm, parent space
    parts.power.position.y = base.powery - powerPress * 0.80;
    parts.dial.rotation.z = -volume * 4.1;                      // ~235° of travel

    const breath = reduced ? 0 : Math.sin(t * 2.1) * 0.16;
    tmpColour.copy(LED_LIVE).lerp(LED_MUTED, muted);

    parts.ledMat.emissive.copy(tmpColour);
    parts.ledMat.emissiveIntensity = powerOn * (2.3 + breath);
    parts.ledMat.color.copy(parts.ledBase).lerp(tmpColour, 0.5 * powerOn);

    ledLight.color.copy(tmpColour);
    ledLight.intensity = powerOn * 0.0012;

    glow.material.color.copy(tmpColour);
    glow.material.opacity = powerOn * 0.5;
    glow.scale.setScalar(0.0045 + powerOn * 0.0012);
  }

  /* ----- callouts ----- */
  camera.updateMatrixWorld();
  for (const lv of labelViews) {
    let w = 0;
    // Stay up for the whole step (the camera holds through ~62% of it),
    // then fade out as it travels to the next one.
    for (const s of lv.def.steps) {
      w = Math.max(w, clamp01(Math.min((u - s + 0.25) / 0.20, (s + 0.95 - u) / 0.20)));
    }

    if (w <= 0.002) {
      if (lv.shown !== 0) {
        lv.root.style.opacity = '0';
        lv.line.style.opacity = '0';
        lv.shown = 0;
      }
      continue;
    }

    projected.copy(lv.world).project(camera);
    const sxRaw = (projected.x * 0.5 + 0.5) * W;
    const syRaw = (-projected.y * 0.5 + 0.5) * H;
    // Anchored off-canvas: the leader would clamp into a stub at the edge.
    const off = sxRaw < 6 || sxRaw > W - 6 || syRaw < 6 || syRaw > H - 6;
    if (projected.z > 1 || off) {
      lv.root.style.opacity = '0';
      lv.line.style.opacity = '0';
      lv.shown = 0;
      continue;
    }

    const sx = (projected.x * 0.5 + 0.5) * W;
    const sy = (-projected.y * 0.5 + 0.5) * H;

    // Keep the text box inside the stage, and let the leader follow it.
    if (!lv.w) lv.w = lv.txt.offsetWidth || 90;
    const pad = 10;
    const tx = lv.def.dx < 0
      ? Math.min(Math.max(sx + lv.def.dx, pad + lv.w), W - pad)
      : Math.min(Math.max(sx + lv.def.dx, pad), W - pad - lv.w);
    const ty = Math.min(Math.max(sy + lv.def.dy, 64), H - 92);

    lv.root.style.transform = `translate(${sx.toFixed(1)}px, ${sy.toFixed(1)}px)`;
    lv.txt.style.transform =
      `translate(${(tx - sx).toFixed(1)}px, ${(ty - sy).toFixed(1)}px) translate(${lv.def.dx < 0 ? '-100%' : '0'}, -50%)`;
    lv.root.style.opacity = w.toFixed(3);

    lv.line.setAttribute('x1', sx.toFixed(1));
    lv.line.setAttribute('y1', sy.toFixed(1));
    lv.line.setAttribute('x2', tx.toFixed(1));
    lv.line.setAttribute('y2', ty.toFixed(1));
    lv.line.style.opacity = (w * 0.85).toFixed(3);
    lv.shown = 1;
  }

  /* ----- readout ----- */
  hudEl.classList.toggle('is-on', u > 0.55);

  const on = powerOn > 0.5;
  const isMuted = muted > 0.5;
  const level = on ? Math.round(volume * METER_STEPS) : 0;

  const powerTxt = on ? 'On shift' : 'Off';
  if (powerTxt !== lastPower) {
    hudOut.power.textContent = powerTxt;
    hudOut.dotPower.className = 'dot' + (on ? ' is-live' : '');
    lastPower = powerTxt;
  }

  const micTxt = !on ? 'Off' : isMuted ? 'Muted' : 'Live';
  if (micTxt !== lastMic) {
    hudOut.mic.textContent = micTxt;
    hudOut.dotMic.className = 'dot' + (!on ? '' : isMuted ? ' is-muted' : ' is-live');
    lastMic = micTxt;
  }

  if (level !== lastLevel) {
    hudOut.vol.textContent = on ? String(level) : '—';
    for (let n = 0; n < METER_STEPS; n++) meterBars[n].classList.toggle('is-on', n < level);
    lastLevel = level;
  }

  drawWave(t, powerOn * (1 - muted), volume, isMuted);

  const active = Math.max(0, Math.min(STEPS.length - 1, Math.round(u)));
  for (let n = 0; n < railTicks.length; n++) railTicks[n].classList.toggle('is-on', n === active);

  renderer.render(scene, camera);
}

/* ---------------- mic waveform ---------------- */

const waveCtx = waveEl.getContext('2d');
let waveInk = '#4A5666';
let waveAccent = '#0A6ED1';
let waveSignal = '#C87A17';

function readWaveColours() {
  const cs = getComputedStyle(document.documentElement);
  waveInk = cs.getPropertyValue('--ink-3').trim() || waveInk;
  waveAccent = cs.getPropertyValue('--accent').trim() || waveAccent;
  waveSignal = cs.getPropertyValue('--signal').trim() || waveSignal;
}

function drawWave(t, amp, volume, isMuted) {
  const w = waveEl.width, h = waveEl.height;
  const mid = h / 2;
  waveCtx.clearRect(0, 0, w, h);
  waveCtx.lineWidth = 3;
  waveCtx.lineJoin = 'round';
  waveCtx.strokeStyle = amp > 0.02 ? waveAccent : isMuted ? waveSignal : waveInk;
  waveCtx.globalAlpha = amp > 0.02 ? 1 : 0.5;
  waveCtx.beginPath();

  const gain = amp * (0.45 + volume * 0.55) * (h * 0.42);
  const time = reduced ? 0 : t;
  for (let x = 0; x <= w; x += 3) {
    const p = x / w;
    const env = Math.sin(p * Math.PI);
    const y = mid + env * gain * (
      Math.sin(p * 17 + time * 7.1) * 0.55 +
      Math.sin(p * 31 - time * 4.3) * 0.30 +
      Math.sin(p * 7 + time * 2.2) * 0.35
    );
    if (x === 0) waveCtx.moveTo(x, y); else waveCtx.lineTo(x, y);
  }
  waveCtx.stroke();
  waveCtx.globalAlpha = 1;
}

/* ---------------- run ---------------- */

if (renderer) {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  readWaveColours();
  darkQuery.addEventListener('change', readWaveColours);
  new MutationObserver(readWaveColours).observe(document.documentElement, {
    attributes: true, attributeFilter: ['data-theme'],
  });

  initScene();
  measure();
  window.addEventListener('load', () => { measure(); setTimeout(measure, 400); });

  // Pause while the tab is hidden. Tracking the handle matters: a pending
  // rAF resumes on its own when the tab comes back, so starting another
  // loop here would leave two running at once.
  let running = true;
  let rafId = 0;

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      running = false;
      if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    } else if (!running) {
      running = true;
      clock.getDelta();   // drop the gap so damping doesn't jump
      loop();
    }
  });

  window.__look = (o = {}) => {
    if (o.env !== undefined) scene.environmentIntensity = o.env;
    if (o.key !== undefined) keyLight.intensity = o.key;
    if (o.fill !== undefined) fillLight.intensity = o.fill;
    if (o.rim !== undefined) rimLight.intensity = o.rim;
    if (o.exposure !== undefined) renderer.toneMappingExposure = o.exposure;
    return {
      env: scene.environmentIntensity, key: keyLight.intensity,
      fill: fillLight.intensity, rim: rimLight.intensity,
      exposure: renderer.toneMappingExposure,
    };
  };

  // Scroll somewhere and run the animation forward deterministically, without
  // depending on rAF (which is throttled whenever the tab isn't visible).
  window.__settle = (y, n = 30) => {
    if (y !== undefined) window.scrollTo(0, y);
    for (let k = 0; k < n; k++) frame(1 / 60);
    return window.__tour();
  };

  window.__tour = () => {
    // Project the visible device bounds to stage pixels, to verify framing.
    const box = new THREE.Box3();
    scene.traverse((o) => {
      let vis = o.isMesh;
      for (let a = o; vis && a; a = a.parent) if (!a.visible) vis = false;
      if (vis) {
        o.updateWorldMatrix(true, false);
        box.expandByObject(o);
      }
    });
    const pts = [];
    for (let i = 0; i < 8; i++) {
      const v = new THREE.Vector3(
        i & 1 ? box.max.x : box.min.x,
        i & 2 ? box.max.y : box.min.y,
        i & 4 ? box.max.z : box.min.z
      ).project(camera);
      pts.push([(v.x * 0.5 + 0.5) * W, (-v.y * 0.5 + 0.5) * H]);
    }
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return {
      u: +computeU().toFixed(3),
      scrollY: window.scrollY,
      anchors: anchors.map(Math.round),
      ready,
      stagePx: [W, H],
      worldBox: [box.min.toArray().map((n) => +n.toFixed(4)), box.max.toArray().map((n) => +n.toFixed(4))],
      screenBox: [Math.round(Math.min(...xs)), Math.round(Math.min(...ys)), Math.round(Math.max(...xs)), Math.round(Math.max(...ys))],
      camPos: camera.position.toArray().map((n) => +n.toFixed(4)),
    };
  };

  function loop() {
    rafId = 0;
    if (!running) return;
    frame();
    rafId = requestAnimationFrame(loop);
  }

  loop();
}
