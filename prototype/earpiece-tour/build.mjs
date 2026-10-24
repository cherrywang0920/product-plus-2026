import { build } from 'esbuild';
import { mkdirSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';

mkdirSync('dist', { recursive: true });

await build({
  entryPoints: ['src/main.js'],
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2020',
  outfile: 'dist/app.js',
  loader: { '.glb': 'base64' },
  logLevel: 'info',
});

const fragment = readFileSync('src/page.html', 'utf8');

// dist/index.html is the file published as an Artifact: the host wraps it
// in <!doctype html><head>…</head><body>, so it carries no shell of its own.
writeFileSync('dist/index.html', fragment);

// dist/dev.html is the same content in a real page shell, for local checks.
writeFileSync('dist/dev.html', `<!doctype html>
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

console.log('built dist/{index.html,dev.html,app.js} — model is inlined in app.js');
