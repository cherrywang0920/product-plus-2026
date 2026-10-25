// Still (non-animated) GLBs for slides where nothing should move.
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { buildEarpiece } = require('./builder.js');
globalThis.FileReader = class {
  readAsArrayBuffer(b) { b.arrayBuffer().then(r => { this.result = r; this.onloadend && this.onloadend(); }); }
  readAsDataURL(b) { b.arrayBuffer().then(r => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(r).toString('base64'); this.onloadend && this.onloadend(); }); }
};
for (const [file, lit] of [['atelier-earpiece-still-off.glb', null], ['atelier-earpiece-still-green.glb', 'LED_Green']]) {
  const b = buildEarpiece(THREE, { cable: false }), g = b.group;
  // drop the unlit lenses entirely so nothing hidden is left in the file
  for (const n of ['LED_Green', 'LED_Red', 'LED_Blue']) { if (n === lit) b.parts[n].scale.setScalar(1); else b.parts[n].parent.remove(b.parts[n]); }
  g.updateMatrixWorld(true);
  const c = new THREE.Box3().setFromObject(g).getCenter(new THREE.Vector3()); g.position.sub(c);
  const root = new THREE.Group(); root.name = 'AtelierEarpiece'; root.scale.setScalar(0.001); root.add(g); root.updateMatrixWorld(true);
  await new Promise(res => new GLTFExporter().parse(root, glb => { fs.writeFileSync('out/' + file, Buffer.from(glb)); console.log(file, (glb.byteLength / 1024).toFixed(0) + ' KB'); res(); }, e => console.error(e), { binary: true }));
}
