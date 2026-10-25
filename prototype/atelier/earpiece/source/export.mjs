import * as THREE from 'three';
import { STLExporter } from 'three/examples/jsm/exporters/STLExporter.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { buildEarpiece, buildClips } = require('./builder.js');

// Minimal FileReader polyfill for GLTFExporter in Node
globalThis.FileReader = class {
  readAsArrayBuffer(b) { b.arrayBuffer().then(r => { this.result = r; this.onloadend && this.onloadend(); }); }
  readAsDataURL(b) { b.arrayBuffer().then(r => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(r).toString('base64'); this.onloadend && this.onloadend(); }); }
};

const { group } = buildEarpiece(THREE, {});
const cordlessBuilt = buildEarpiece(THREE, { cable: false }), cordless = cordlessBuilt.group;
group.updateMatrixWorld(true);
fs.mkdirSync('out', { recursive: true });

// STL in millimetres (slicers assume mm)
fs.writeFileSync('out/atelier-earpiece.stl', Buffer.from(new STLExporter().parse(group, { binary: true }).buffer));

// GLB in metres (glTF convention) so it imports at real size in Blender
// Wrap in a centred "Turntable" node so the spin happens around the earpiece itself
cordless.updateMatrixWorld(true);
const cbox = new THREE.Box3().setFromObject(cordless), cctr = cbox.getCenter(new THREE.Vector3());
cordless.position.sub(cctr);
const spin = new THREE.Group(); spin.name = 'Turntable'; spin.add(cordless);
const s = new THREE.Group(); s.name = 'AtelierEarpiece_m'; s.scale.setScalar(0.001); s.add(spin); s.updateMatrixWorld(true);
const clips = buildClips(THREE, cordlessBuilt.parts, { spinNode: 'Turntable' });
console.log('clips', clips.map(c => c.name + ' ' + c.duration.toFixed(1) + 's').join(', '));
new GLTFExporter().parse(s, glb => {
  fs.writeFileSync('out/atelier-earpiece.glb', Buffer.from(glb));
  const box = new THREE.Box3().setFromObject(group);
  console.log('bbox mm', box.min.toArray().map(v => v.toFixed(1)), box.max.toArray().map(v => v.toFixed(1)));
  for (const f of fs.readdirSync('out')) console.log(f, (fs.statSync('out/' + f).size / 1024).toFixed(0) + ' KB');
}, e => console.error(e), { binary: true, animations: clips });
