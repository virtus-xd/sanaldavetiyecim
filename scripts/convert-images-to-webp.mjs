import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const TARGETS = [
  join(ROOT, 'public', 'themes'),
  join(ROOT, 'public', 'images'),
];

const EXTS = new Set(['.png', '.jpg', '.jpeg']);
const QUALITY = 82;

async function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else if (EXTS.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

const results = [];
let totalOld = 0;
let totalNew = 0;
let skipped = 0;
let converted = 0;
let failed = 0;

for (const target of TARGETS) {
  const files = await walk(target);
  for (const src of files) {
    const out = src.replace(/\.(png|jpe?g)$/i, '.webp');
    const rel = src.replace(ROOT + '\\', '').replace(ROOT + '/', '');

    if (existsSync(out)) {
      skipped++;
      continue;
    }

    try {
      const oldSize = (await stat(src)).size;
      await sharp(src).webp({ quality: QUALITY, effort: 6 }).toFile(out);
      const newSize = (await stat(out)).size;
      totalOld += oldSize;
      totalNew += newSize;
      converted++;
      results.push({ file: rel, oldSize, newSize, ratio: newSize / oldSize });
    } catch (err) {
      failed++;
      console.error(`FAIL ${rel}: ${err.message}`);
    }
  }
}

results.sort((a, b) => b.oldSize - a.oldSize);

console.log('\n=== Per-file results (largest first) ===');
console.log('OLD'.padStart(10), 'NEW'.padStart(10), 'SAVE'.padStart(7), '  FILE');
for (const r of results) {
  const save = (100 - r.ratio * 100).toFixed(0) + '%';
  console.log(
    fmt(r.oldSize).padStart(10),
    fmt(r.newSize).padStart(10),
    save.padStart(7),
    '  ' + r.file
  );
}

console.log('\n=== Summary ===');
console.log(`Converted : ${converted}`);
console.log(`Skipped   : ${skipped}  (.webp already existed)`);
console.log(`Failed    : ${failed}`);
console.log(`Old total : ${fmt(totalOld)}`);
console.log(`New total : ${fmt(totalNew)}`);
if (totalOld > 0) {
  const saved = totalOld - totalNew;
  const pct = ((saved / totalOld) * 100).toFixed(1);
  console.log(`Saved     : ${fmt(saved)}  (${pct}%)`);
}
console.log('\nOriginal .png/.jpg files NOT deleted. Run a separate step after you verify.');
