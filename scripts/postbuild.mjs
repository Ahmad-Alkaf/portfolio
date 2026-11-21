// Runs after `next build` (see "build" in package.json).
//
// The English "not found" page is built as the page /en/not-found/. Cloudflare Pages
// serves the nearest 404.html of a path, so this script moves the page to
// out/en/404.html: an unknown URL under /en/ then gets the English page, and each
// other unknown URL gets the Arabic page (out/404.html).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pageDir = path.join(root, 'out', 'en', 'not-found');
const page = path.join(pageDir, 'index.html');
const target = path.join(root, 'out', 'en', '404.html');

if (!fs.existsSync(page)) {
	console.error('out/en/not-found/index.html does not exist. Did `next build` fail?');
	process.exit(1);
}

fs.copyFileSync(page, target);
fs.rmSync(pageDir, { recursive: true });
console.log('Moved the English "not found" page to out/en/404.html.');
