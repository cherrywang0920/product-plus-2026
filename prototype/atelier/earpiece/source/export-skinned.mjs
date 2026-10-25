// PowerPoint only plays SKINNED (skeletal) glTF animations, not node-transform ones.
// This rebuilds the cordless earpiece as skinned meshes (one per material) rigidly bound
// to a small skeleton, and retargets the animation clips onto the bones. Output in metres.
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createRequire } from 'module';
import fs from 'fs';
const require = createRequire(import.meta.url);
const { buildEarpiece, buildClips } = require('./builder.js');

globalThis.FileReader = class {
  readAsArrayBuffer(b) { b.arrayBuffer().then(r => { this.result = r; this.onloadend && this.onloadend(); }); }
  readAsDataURL(b) { b.arrayBuffer().then(r => { this.result = 'data:application/octet-stream;base64,' + Buffer.from(r).toString('base64'); this.onloadend && this.onloadend(); }); }
};

const MM = 0.001;
const built = buildEarpiece(THREE, { cable: false });
const src = built.group;
built.parts.LED_Green.scale.setScalar(1); built.parts.LED_Red.scale.setScalar(1); built.parts.LED_Blue.scale.setScalar(1);   // bake lit lenses at full size
src.updateMatrixWorld(true);
const ctr = new THREE.Box3().setFromObject(src).getCenter(new THREE.Vector3());
const toLocal = v => v.clone().sub(ctr).multiplyScalar(MM);

// ---- Skeleton: Spin (root, model centre) -> moving parts ----
const movers = { MuteButton: 'Bone_Mute', PowerButton: 'Bone_Power', VolumeDial: 'Bone_Dial', LED_Green: 'Bone_LEDGreen', LED_Red: 'Bone_LEDRed', LED_Blue: 'Bone_LEDBlue' };
const spin = new THREE.Bone(); spin.name = 'Bone_Spin';
const bones = [spin], boneIndex = { Bone_Spin: 0 };
for (const [node, bn] of Object.entries(movers)) {
  const b = new THREE.Bone(); b.name = bn;
  b.position.copy(toLocal(src.getObjectByName(node).getWorldPosition(new THREE.Vector3())));
  spin.add(b); boneIndex[bn] = bones.length; bones.push(b);
}
const root = new THREE.Group(); root.name = 'AtelierEarpiece';
const rig = new THREE.Group(); rig.name = 'Rig'; rig.add(spin); root.add(rig);
root.updateMatrixWorld(true);
const skeleton = new THREE.Skeleton(bones);

// ---- Bake every mesh into model space, tag each vertex with its bone, merge per material ----
function boneFor(o) { for (let p = o; p; p = p.parent) if (movers[p.name]) return boneIndex[movers[p.name]]; return 0; }
const byMat = new Map();
src.traverse(o => {
  if (!o.isMesh) return;
  let g = o.geometry.clone().applyMatrix4(o.matrixWorld);
  g.translate(-ctr.x, -ctr.y, -ctr.z); g.scale(MM, MM, MM);
  if (g.index) g = g.toNonIndexed();
  for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
  const n = g.attributes.position.count;
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(n * 2), 2));
  if (!g.attributes.normal) g.computeVertexNormals();
  g.morphAttributes = {}; g.clearGroups();
  const bi = boneFor(o), si = new Uint16Array(n * 4), sw = new Float32Array(n * 4);
  for (let i = 0; i < n; i++) { si[i * 4] = bi; sw[i * 4] = 1; }
  g.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(si, 4));
  g.setAttribute('skinWeight', new THREE.Float32BufferAttribute(sw, 4));
  if (!byMat.has(o.material)) byMat.set(o.material, []);
  byMat.get(o.material).push(g);
});
for (const [mat, geos] of byMat) {
  const m = new THREE.SkinnedMesh(mergeBufferGeometries(geos), mat);
  m.name = mat.name; rig.add(m); m.bind(skeleton);
}
// Rest pose: status light off
bones[boneIndex.Bone_LEDGreen].scale.setScalar(0.001);
bones[boneIndex.Bone_LEDRed].scale.setScalar(0.001);
bones[boneIndex.Bone_LEDBlue].scale.setScalar(0.001);
root.updateMatrixWorld(true);

// ---- Retarget clips (mm, model space) onto bones (m, relative to Spin) ----
const rename = { ...movers, Turntable: 'Bone_Spin' };
const clips = buildClips(THREE, built.parts, { spinNode: 'Turntable' }).map(c => {
  const tracks = c.tracks.map(t => {
    const [node, prop] = t.name.split('.');
    const tt = t.clone(); tt.name = rename[node] + '.' + prop;
    if (prop === 'position') {
      const v = tt.values;
      for (let i = 0; i < v.length; i += 3) { const p = toLocal(new THREE.Vector3(v[i], v[i + 1], v[i + 2])); v[i] = p.x; v[i + 1] = p.y; v[i + 2] = p.z; }
    }
    return tt;
  });
  return new THREE.AnimationClip(c.name, c.duration, tracks);
});

new GLTFExporter().parse(root, glb => {
  fs.mkdirSync('out', { recursive: true });
  fs.writeFileSync('out/atelier-earpiece.glb', Buffer.from(glb));
  console.log('meshes', [...byMat.keys()].map(m => m.name).join(', '));
  console.log('clips', clips.map(c => c.name).join(', '));
  console.log('glb', (fs.statSync('out/atelier-earpiece.glb').size / 1024).toFixed(0) + ' KB');
}, e => console.error(e), { binary: true, animations: clips });
