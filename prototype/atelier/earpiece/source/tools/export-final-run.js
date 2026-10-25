const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
  const p = await b.newPage({ viewport: { width: 1200, height: 500 } });
  p.on('pageerror', e => console.log('ERR', e.message));
  p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log(m.type(), m.text().slice(0, 160)); });
  await p.goto('http://localhost:8767/export-final.html'); await p.waitForFunction(() => window.ready, null, { timeout: 30000 });
  const b64 = await p.evaluate(() => window.exportGLB());
  fs.writeFileSync('../models/atelier-earpiece-final.glb', Buffer.from(b64, 'base64'));
  const shots = [['Off', 1, 'close'], ['Power On', 0.5, 'close'], ['Power On', 3, 'close'], ['Hey Joule', 0.5, 'close'], ['Hey Joule', 3, 'close'], ['Green', 1, 'close'], ['Blue', 1, 'close'], ['Green', 1, 'far'], ['Blue', 30, 'far']];
  const res = await p.evaluate(s => window.loadAndShoot(s), shots);
  console.log(res.names.join(', '));
  res.out.forEach((d, i) => fs.writeFileSync(process.argv[2] + '/g' + i + '.png', Buffer.from(d.split(',')[1], 'base64')));
  await b.close();
})();
