// Atelier earpiece — procedural model. Units: millimetres. Y up, +Z faces the viewer.
// buildEarpiece(THREE, opts) -> { group, parts: {name: Object3D} }
// opts.label(text, w, h, opts) -> optional Mesh for printed labels (browser only)
function buildEarpiece(THREE, opts) {
  opts = opts || {};
  const V = (x, y, z) => new THREE.Vector3(x, y, z);
  const group = new THREE.Group();
  group.name = 'AtelierEarpiece';
  const parts = {};

  // Colours are written as sRGB hex and converted to linear, which is what glTF stores.
  // (Passing sRGB hex straight through makes black read as mid-grey in other apps.)
  const C = hex => new THREE.Color(hex).convertSRGBToLinear();
  const M = {
    shell: new THREE.MeshStandardMaterial({ name: 'Shell_MatteBlack', color: C(0x121214), roughness: 0.78, metalness: 0 }),
    rubber: new THREE.MeshStandardMaterial({ name: 'Rubber_MatteBlack', color: C(0x0f0f10), roughness: 0.92, metalness: 0 }),
    button: new THREE.MeshStandardMaterial({ name: 'Button_MatteBlack', color: C(0x18181a), roughness: 0.62, metalness: 0 }),
    chrome: new THREE.MeshStandardMaterial({ name: 'Chrome', color: C(0xd9dadc), roughness: 0.18, metalness: 1 }),
    foam: new THREE.MeshStandardMaterial({ name: 'MicFoam', color: C(0x161618), roughness: 1, metalness: 0 }),
    braid: new THREE.MeshStandardMaterial({ name: 'BraidedCable', color: C(0x111112), roughness: 0.95, metalness: 0 }),
    led: new THREE.MeshStandardMaterial({ name: 'LED_Off', color: C(0x1c1d21), roughness: 0.12, metalness: 0 }),
    insulator: new THREE.MeshStandardMaterial({ name: 'Insulator', color: C(0x0e0e0f), roughness: 0.4 }),
    ledGreen: new THREE.MeshStandardMaterial({ name: 'LED_Green_Lit', color: C(0x3dff6e), emissive: C(0x2bff5c), emissiveIntensity: 1, roughness: 0.25 }),
    ledRed: new THREE.MeshStandardMaterial({ name: 'LED_Red_Lit', color: C(0xff3b30), emissive: C(0xff2a1f), emissiveIntensity: 1, roughness: 0.25 }),
    ledBlue: new THREE.MeshStandardMaterial({ name: 'LED_Blue_Lit', color: C(0x3d8bff), emissive: C(0x2f7dff), emissiveIntensity: 1, roughness: 0.25 }),
  };

     // keep the lit colours pure in the viewer

  function part(name) { const g = new THREE.Group(); g.name = name; group.add(g); parts[name] = g; return g; }
  function mesh(geo, mat, parent, name) { const m = new THREE.Mesh(geo, mat); m.name = name || ''; parent.add(m); return m; }

  function roundedRectShape(w, h, r) {
    const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
    s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
    s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
    return s;
  }
  // Rounded slab: w x h footprint, d deep, centred on origin, front face at +d/2
  function roundedSlab(w, h, d, r, bevel) {
    const b = Math.min(bevel, d / 2 - 0.01);
    const geo = new THREE.ExtrudeGeometry(roundedRectShape(w - 2 * b, h - 2 * b, Math.max(0.2, r - b)), {
      depth: d - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 5, curveSegments: 14,
    });
    geo.translate(0, 0, -(d - 2 * b) / 2);
    return geo;
  }
  // Lathe around Y from [radius, y] pairs, then aim the +Y axis along dir
  function lathe(profile, segs) {
    return new THREE.LatheGeometry(profile.map(p => new THREE.Vector2(p[0], p[1])), segs || 40);
  }
  function aim(obj, from, dir) {
    obj.position.copy(from);
    obj.quaternion.setFromUnitVectors(V(0, 1, 0), dir.clone().normalize());
  }
  function tube(points, radius, mat, parent, name, tubSegs, closedEnds) {
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal');
    const m = mesh(new THREE.TubeGeometry(curve, tubSegs || 160, radius, 20, false), mat, parent, name);
    if (closedEnds !== false) {
      const s = new THREE.SphereGeometry(radius, 20, 14);
      mesh(s, mat, parent, name + '_capA').position.copy(curve.getPoint(0));
      mesh(s, mat, parent, name + '_capB').position.copy(curve.getPoint(1));
    }
    return curve;
  }

  // ---------- Ear unit: compact body that sits on the outside of the ear ----------
  // Worn on the RIGHT ear, seen from outside: +Z = away from the head (outward),
  // -Z = into the head, +X = toward the face/nose, -X = toward the back of the head.
  const bud = part('EarUnit');
  const hc = V(10, 96, 1);                         // ear-canal axis through the body
  const R = (x, y, z) => hc.clone().add(V(x, y, z));
  const BW = 27, BH = 18, BD = 8, bc = R(3, 0, 1.5), face = bc.z + BD / 2;
  const body = mesh(roundedSlab(BW, BH, BD, 8.6, 2.4), M.shell, bud, 'Body');
  body.position.copy(bc);

  // Volume dial: knurled ring that turns around the mute button
  const dial = new THREE.Group(); dial.name = 'VolumeDial'; bud.add(dial);
  const ring = mesh(lathe([[5.4, 0], [7.1, 0], [7.4, 0.5], [7.4, 2.2], [7.1, 2.7], [5.4, 2.7]], 64), M.button, dial, 'DialRing');
  ring.rotation.x = Math.PI / 2;
  const ridge = new THREE.BoxGeometry(0.55, 0.45, 1.5);
  for (let i = 0; i < 44; i++) {
    const a = (i / 44) * Math.PI * 2, rr = mesh(ridge, M.button, dial, 'Knurl');
    rr.position.set(Math.cos(a) * 7.5, Math.sin(a) * 7.5, 1.35); rr.rotation.z = a;
  }
  const tick = mesh(new THREE.SphereGeometry(0.45, 12, 8), M.chrome, dial, 'DialTick');
  tick.position.set(Math.cos(1.1) * 6.25, Math.sin(1.1) * 6.25, 2.75);
  dial.position.set(bc.x, bc.y, face - 0.6);
  parts.dial = dial;

  // Mute button in the centre of the dial (carries the Atelier "A"). Group so it can be animated as one.
  const mute = new THREE.Group(); mute.name = 'MuteButton'; bud.add(mute);
  mute.position.set(bc.x, bc.y, face + 0.9);
  const muteCap = mesh(new THREE.CylinderGeometry(4.9, 5, 1.6, 48), M.button, mute, 'MuteCap');
  muteCap.rotation.x = Math.PI / 2;
  if (opts.label) {
    const a = opts.label('A', 7, 7, { size: 0.85, serif: true });
    if (a) { a.position.set(0, 0, 0.82); mute.add(a); }
  }
  parts.mute = mute;

  // Power button on the top edge, forward of the hook so it is easy to find by touch
  const power = mesh(roundedSlab(6, 2.4, 3.4, 1.1, 0.5), M.button, bud, 'PowerButton');
  power.position.copy(R(9.5, BH / 2 + 0.5, 1.5));
  parts.power = power;

  // Status light on the face, upper right of the dial.
  // Off: a dark smoked lens. Lit: a glowing lens (hot core -> saturated rim) plus a soft halo
  // that spills onto the housing. Each lit state is a group scaled to ~0 when off, because
  // PowerPoint can animate scale but not material colour.
  const ledPos = V(bc.x + 8.8, bc.y + 3.5, face);
  const bezel = mesh(lathe([[1.15, 0], [1.55, 0], [1.55, 0.18], [1.2, 0.22]], 40), M.rubber, bud, 'LEDBezel');
  bezel.rotation.x = Math.PI / 2; bezel.position.copy(ledPos);
  const lensGeo = new THREE.SphereGeometry(1.12, 32, 16); lensGeo.rotateX(Math.PI / 2); lensGeo.scale(1, 1, 0.5);
  const led = mesh(lensGeo, M.led, bud, 'StatusLED'); led.position.copy(ledPos);
  parts.led = led;
  const litLensGeo = new THREE.SphereGeometry(1.2, 40, 20); litLensGeo.rotateX(Math.PI / 2); litLensGeo.scale(1, 1, 0.56);
  const haloGeo = new THREE.CircleGeometry(5.2, 64);
  const lights = [['LED_Green', 0x18f04f, 0xc8ffd4], ['LED_Blue', 0x1f74ff, 0xc9defe]];
  for (const [nm, col, core] of lights) {
    const g = new THREE.Group(); g.name = nm; g.position.copy(ledPos); bud.add(g); parts[nm] = g;
    const tLens = opts.texture ? opts.texture('lens', col, core) : null;
    const lensMat = new THREE.MeshStandardMaterial({
      name: nm + '_Lens', color: tLens ? 0xffffff : C(col), map: tLens, emissive: tLens ? 0xffffff : C(col), emissiveMap: tLens,
      emissiveIntensity: 1, roughness: 0.2, metalness: 0 });
    lensMat.toneMapped = false;
    mesh(litLensGeo, lensMat, g, nm + '_LensMesh');
    if (opts.texture) {
      const haloMat = new THREE.MeshStandardMaterial({
        name: nm + '_Glow', color: 0xffffff, map: opts.texture('halo', col), emissive: 0xffffff,
        emissiveMap: opts.texture('haloEmissive', col), transparent: true, depthWrite: false, roughness: 1, metalness: 0 });
      haloMat.toneMapped = false;
      const h = mesh(haloGeo, haloMat, g, nm + '_GlowMesh'); h.position.z = 0.05; h.renderOrder = 3;
    }
    g.scale.setScalar(0.001);
  }

  // Nozzle + ear tip point INTO the head (-Z), angled slightly forward like the ear canal
  const nozzleDir = V(0.3, -0.05, -1).normalize();
  const nozzle = mesh(lathe([[0, 0], [3.6, 0], [3.4, 3], [2.6, 6.5], [0, 6.5]]), M.shell, bud, 'Nozzle');
  aim(nozzle, hc.clone().add(nozzleDir.clone().multiplyScalar(2.2)), nozzleDir);
  const tip = mesh(lathe([[0, 0], [2.6, 0], [5.6, 1.5], [6.4, 3.6], [5.9, 6.2], [4.2, 7.8], [2, 8.4], [0, 8.5]], 48), M.rubber, bud, 'EarTip');
  aim(tip, hc.clone().add(nozzleDir.clone().multiplyScalar(6.7)), nozzleDir);

  // ---------- Ear hook: up over the top of the ear, down behind it, resting on the head ----------
  const hook = part('EarHook');
  tube([
    R(-4, 7.5, -1), R(-4, 20, -6), R(-10, 33, -8.5), R(-21, 37, -10), R(-32, 29, -10.5),
    R(-37, 13, -10.5), R(-36, -5, -10), R(-31, -19, -9), R(-25, -27, -7.5),
  ], 2.6, M.rubber, hook, 'HookArm', 220);

  // ---------- Microphone boom: forward along the cheek, curving in toward the mouth ----------
  const mic = part('MicBoom');
  const pivotC = R(15, -3.5, 2.5);
  const pivot = mesh(new THREE.CylinderGeometry(3.4, 3.4, 5.2, 32), M.shell, mic, 'MicPivot');
  pivot.rotation.x = Math.PI / 2; pivot.position.copy(pivotC);
  const pivotCap = mesh(new THREE.CylinderGeometry(2.2, 2.2, 5.6, 24), M.chrome, mic, 'MicPivotPin');
  pivotCap.rotation.x = Math.PI / 2; pivotCap.position.copy(pivotC);
  const boomCurve = tube([
    pivotC.clone().add(V(2, -1.5, 1)), R(33, -15, 4.5), R(52, -28, -1.5), R(67, -41, -15), R(76, -48, -26),
  ], 1.35, M.shell, mic, 'BoomArm', 160);
  const end = boomCurve.getPoint(1), endDir = boomCurve.getTangent(1).normalize();
  const sleeve = mesh(lathe([[0, 0], [1.9, 0], [2.3, 1.2], [2.3, 3.4], [2.0, 4], [0, 4]]), M.shell, mic, 'MicSleeve');
  aim(sleeve, end.clone().sub(endDir.clone().multiplyScalar(1.5)), endDir);
  const foam = mesh(new THREE.SphereGeometry(4, 32, 22), M.foam, mic, 'MicFoam');
  foam.scale.set(1, 1.45, 1);
  foam.position.copy(end.clone().add(endDir.clone().multiplyScalar(6.6)));
  foam.quaternion.setFromUnitVectors(V(0, 1, 0), endDir);

  // ---------- Optional head reference for fit checks (never exported) ----------
  if (opts.headRef) {
    const head = part('HeadRef');
    const hm = new THREE.MeshStandardMaterial({ name: 'HeadRef', color: 0x9aa3ad, roughness: 0.9, transparent: true, opacity: 0.16, depthWrite: false });
    const skull = mesh(new THREE.SphereGeometry(1, 64, 48), hm, head, 'Head');
    skull.scale.set(95, 120, 72); skull.position.copy(R(8, 5, -77));
    // simple pinna outline around the ear canal
    const ear = mesh(new THREE.TorusGeometry(1, 0.16, 12, 48), hm, head, 'Pinna');
    ear.scale.set(17, 30, 17); ear.position.copy(R(-10, 8, -6)); ear.rotation.y = -0.25;
    // mouth marker
    const lips = mesh(new THREE.TorusGeometry(10, 2.2, 10, 32), hm, head, 'Mouth');
    lips.scale.set(1, 0.4, 1); lips.position.copy(R(88, -52, -68)); lips.rotation.y = Math.PI / 2 - 0.25;
    head.visible = false;
  }

  if (opts.cable !== false) {
  // ---------- Cable out of the bottom of the ear unit, strain relief, 3.5 mm jack ----------
  const cable = part('Cable');
  const relief = [[0, 0], [4.2, 0]];
  for (let i = 0; i < 6; i++) { const y = 1 + i * 1.7; relief.push([3.9 - i * 0.22, y], [3.3 - i * 0.22, y + 0.85]); }
  relief.push([2.2, 12], [0, 12]);
  const sr = mesh(lathe(relief, 36), M.rubber, cable, 'StrainRelief');
  aim(sr, R(-6, -BH / 2 + 0.6, -0.5), V(0, -1, 0));
  // Coil: loose loops lower-right, then a tail out to the jack
  const pts = [R(-6, -20, -0.5), R(-6, -32, 0), V(5, 30, 0.5), V(8, 2, 0)];
  const cc = V(42, -32, 0), CR = 30, turns = 3.1, start = Math.PI * 1.05;
  for (let i = 0; i <= 64; i++) {
    const t = i / 64, a = start + t * turns * Math.PI * 2;
    const r = CR * (1 + 0.1 * Math.sin(a * 1.7)) * (1 - 0.06 * t);
    pts.push(V(cc.x + Math.cos(a) * r * 1.05, cc.y + Math.sin(a) * r * 0.82, -6 + 12 * t + 1.5 * Math.sin(a * 2.3)));
  }
  pts.push(V(76, -66, 6), V(88, -78, 7));
  const cableCurve = tube(pts, 1.6, M.braid, cable, 'BraidedCable', 900);
  const jEnd = cableCurve.getPoint(1), jDir = cableCurve.getTangent(1).normalize();
  const jack = new THREE.Group(); jack.name = 'Jack35mm'; cable.add(jack);
  mesh(lathe([[0, 0], [2.6, 0], [3.4, 2], [3.4, 13], [2.8, 15], [0, 15]], 36), M.rubber, jack, 'JackBody');
  const plug = (y0, y1, r, mat, n) => { const g = mesh(new THREE.CylinderGeometry(r, r, y1 - y0, 32), mat, jack, n); g.position.y = (y0 + y1) / 2; };
  plug(15, 18, 2.6, M.chrome, 'JackCollar');
  plug(18, 22, 1.75, M.chrome, 'Sleeve');
  plug(22, 22.8, 1.75, M.insulator, 'Ring1');
  plug(22.8, 25.2, 1.75, M.chrome, 'Ring');
  plug(25.2, 26, 1.75, M.insulator, 'Ring2');
  plug(26, 28.4, 1.75, M.chrome, 'Ring3');
  plug(28.4, 29.2, 1.75, M.insulator, 'Ring4');
  const t = mesh(lathe([[1.75, 0], [1.75, 1.6], [1.1, 2.3], [1.45, 3.1], [0.6, 4.4], [0, 4.6]], 32), M.chrome, jack, 'Tip');
  t.position.y = 29.2;
  aim(jack, jEnd.clone().sub(jDir.clone().multiplyScalar(1)), jDir);

  }

  return { group, parts, materials: M };
}

// ---------- Animation clips (bind by node name; same clips drive the page and the GLB) ----------
// Final scene set. Each scene ends in its state and then HOLDS for 60 s, so PowerPoint
// (which snaps back to frame 1 when a scene ends) keeps the end state on screen.
function buildClips(THREE, parts) {
  const OFF = 0.001, HOLD = 60;
  const mute0 = parts.mute.position.clone(), pow0 = parts.power.position.clone();
  const s3 = v => { const k = v > 0 ? v : OFF; return [k, k, k]; };
  // keys: { green: [[t, v]...], blue, power: [[t, depthMm]], mute }
  function clip(name, keys) {
    const tr = [];
    const g = keys.green || [[0, 0]], b = keys.blue || [[0, 0]], p = keys.power || [[0, 0]], m = keys.mute || [[0, 0]];
    const fin = arr => { const a = arr.slice(); if (a[0][0] > 0) a.unshift([0, a[0][1]]); a.push([HOLD, a[a.length - 1][1]]); return a; };
    const G = fin(g), B = fin(b), P = fin(p), Mu = fin(m);
    tr.push(new THREE.VectorKeyframeTrack('LED_Green.scale', G.map(k => k[0]), G.flatMap(k => s3(k[1]))));
    tr.push(new THREE.VectorKeyframeTrack('LED_Blue.scale', B.map(k => k[0]), B.flatMap(k => s3(k[1]))));
    tr.push(new THREE.VectorKeyframeTrack('PowerButton.position', P.map(k => k[0]), P.flatMap(k => [pow0.x, pow0.y - k[1] * 1.1, pow0.z])));
    tr.push(new THREE.VectorKeyframeTrack('MuteButton.position', Mu.map(k => k[0]), Mu.flatMap(k => [mute0.x, mute0.y, mute0.z - k[1] * 1.0])));
    return new THREE.AnimationClip(name, HOLD, tr);
  }
  const press = t0 => [[0, 0], [t0, 0], [t0 + 0.12, 1], [t0 + 0.32, 1], [t0 + 0.45, 0]];
  return [
    clip('Off', {}),
    clip('Power On', { power: press(0.4), green: [[0, 0], [0.62, 0], [0.8, 1]] }),
    clip('Hey Joule', { mute: press(0.4), green: [[0, 1], [0.6, 1], [0.78, 0]], blue: [[0, 0], [0.6, 0], [0.78, 1]] }),
    clip('Green', { green: [[0, 1]] }),
    clip('Blue', { blue: [[0, 1]] }),
  ];
}
if (typeof module !== 'undefined') module.exports = { buildEarpiece, buildClips };
