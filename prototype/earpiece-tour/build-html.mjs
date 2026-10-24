// Rebuilds ONLY the writing/styling from src/page.html.
//
// Use this after editing copy. It has no dependencies — plain `node`, no
// `npm install` needed — because changing words never touches the 3D bundle.
//
//   node build-html.mjs
//
// If you changed src/main.js (the 3D scene), run `npm run build` instead.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const fragment = readFileSync(new URL('./src/page.html', import.meta.url), 'utf8');
const out = (name) => new URL(`./dist/${name}`, import.meta.url);

if (!existsSync(out('app.js'))) {
  console.error('dist/app.js is missing — run `npm install && npm run build` once first.');
  process.exit(1);
}

// index.html is the body-only fragment used for publishing: the host supplies
// the <!doctype>, <head> and <body> around it.
writeFileSync(out('index.html'), fragment);

// dev.html is the same content in a real page shell, for viewing locally.
writeFileSync(out('dev.html'), `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
${fragment}
</body>
</html>
`);

console.log('Copy rebuilt. Reload http://localhost:4321/dev.html to see it.');
