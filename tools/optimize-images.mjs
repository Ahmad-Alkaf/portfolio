// Optimize heavy project/resume screenshots into resized WebP.
//
// Walks a fixed set of image folders, and for every raster screenshot
// (.png/.jpg/.jpeg that is NOT a logo/icon) writes a sibling .webp that is
// downscaled to MAX_WIDTH and re-encoded at WEBP_QUALITY. Logos and icons are
// left untouched so the post thumbnails keep their original art.
//
// Originals are NOT deleted here — that happens only after the Markdown
// references have been repointed to the .webp files and the build passes.
//
// Usage: npm run optimize-images
//
// Windows note: feed sharp a Buffer (sharp(fs.readFileSync(fp))) and disable
// its cache — the path-based loader throws "UNKNOWN: open" on Windows.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

sharp.cache(false);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Folders to sweep (globbed for Projects/* subfolders).
const ROOTS = [
  path.join(ROOT, 'assets/img/Projects'),
  path.join(ROOT, 'assets/img/resume'),
];

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 80;
const RASTER = /\.(png|jpe?g)$/i;
const SKIP = /logo|icon/i; // keep brand marks as-is

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (RASTER.test(entry.name) && !SKIP.test(entry.name)) out.push(full);
  }
  return out;
}

const files = ROOTS.flatMap(walk);
const fmt = (b) => (b / 1024).toFixed(0).padStart(5) + ' KB';

let before = 0;
let after = 0;
const converted = [];

for (const fp of files) {
  const buf = fs.readFileSync(fp);
  const meta = await sharp(buf).metadata();
  let pipeline = sharp(buf, { failOn: 'none' });
  if (meta.width && meta.width > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  const outBuf = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
  const outPath = fp.replace(RASTER, '.webp');
  fs.writeFileSync(outPath, outBuf);

  before += buf.length;
  after += outBuf.length;
  const rel = path.relative(ROOT, fp).replace(/\\/g, '/');
  const relOut = path.relative(ROOT, outPath).replace(/\\/g, '/');
  converted.push({ from: rel, to: relOut });
  console.log(`${fmt(buf.length)} -> ${fmt(outBuf.length)}  ${rel}`);
}

console.log('\n' + '-'.repeat(60));
console.log(`Files converted : ${converted.length}`);
console.log(`Total before    : ${fmt(before)}`);
console.log(`Total after     : ${fmt(after)}`);
if (before > 0) {
  const saved = before - after;
  console.log(`Saved           : ${fmt(saved)}  (${((saved / before) * 100).toFixed(1)}%)`);
}
console.log('-'.repeat(60));
console.log('\nConverted basenames (for reference rewrite):');
for (const c of converted) {
  console.log(`  ${path.basename(c.from)}  ->  ${path.basename(c.to)}`);
}
