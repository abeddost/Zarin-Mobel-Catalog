import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Studio photos made by ../zorof-tools (source-images/zorof/<product>/<nn>.jpg)
// -> public/zorof-optimized/<product>/<nn>.webp
const SRC_DIR = path.join(process.cwd(), "source-images", "zorof");
const OUT_DIR = path.join(process.cwd(), "public", "zorof-optimized");
const MAX_WIDTH = 1200;
const QUALITY = 72;
const CONCURRENCY = 8;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  );
  return files.flat();
}

async function main() {
  const files = (await walk(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  // Start clean so removed products do not linger in the deployed folder.
  await fs.rm(OUT_DIR, { recursive: true, force: true });

  let cursor = 0;
  let before = 0;
  let after = 0;
  async function worker() {
    while (cursor < files.length) {
      const src = files[cursor++];
      const rel = path.relative(SRC_DIR, src).replace(/\.(jpe?g|png)$/i, ".webp");
      const out = path.join(OUT_DIR, rel);
      await fs.mkdir(path.dirname(out), { recursive: true });
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(out);
      before += (await fs.stat(src)).size;
      after += (await fs.stat(out)).size;
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  const mb = (b) => `${(b / 1048576).toFixed(1)} MB`;
  console.log(`Optimized ${files.length} photos: ${mb(before)} -> ${mb(after)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
