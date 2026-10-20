// Check that each URL of the old Jekyll site exists in the new `out/` folder.
//
// scripts/jekyll-urls.txt is the URL map of the last Jekyll build (_site/).
// It lists every page and file of the live site, except the Chirpy theme
// internals that the new site does not need (assets/css, assets/js,
// app.min.js) and two scripts that Jekyll published by mistake
// (publish.ps1, serve.ps1).
//
// A URL that ends with "/" must exist as out/<url>/index.html.
// Any other URL must exist as out/<url>.
//
// Usage: npm run check:urls   (run `npm run build` first)

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'out');
const listFile = path.join(root, 'scripts', 'jekyll-urls.txt');

if (!fs.existsSync(outDir)) {
	console.error('The out/ folder does not exist. Run `npm run build` first.');
	process.exit(1);
}

const urls = fs
	.readFileSync(listFile, 'utf8')
	.split('\n')
	.map((line) => line.trim())
	.filter(Boolean);

const missing = [];
for (const url of urls) {
	const rel = url.endsWith('/') ? `${url}index.html` : url;
	if (!fs.existsSync(path.join(outDir, rel))) missing.push(url);
}

console.log(`Checked ${urls.length} URLs from the Jekyll site.`);
if (missing.length > 0) {
	console.error(`Missing in out/: ${missing.length}`);
	for (const url of missing) console.error(`  ${url}`);
	process.exit(1);
}
console.log('All URLs exist in out/.');
