import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

// Small copies of every catalogue photo for cards and thumbnail strips:
//   public/<folder>/a/b.webp  ->  public/thumbs/<folder>/a/b.webp   (640 px wide)
// The site serves these itself (see lib/image-loader.ts) instead of using Vercel's
// image optimizer, which stops working once the account's monthly quota is used up.
// Run after adding photos:  npm run thumbs      (already-made thumbnails are skipped)
const PUBLIC = path.join(process.cwd(), "public");
const FOLDERS = ["sofas-optimized", "tables-optimized", "zorof-optimized"];
const OUT = path.join(PUBLIC, "thumbs");
const WIDTH = 640;
const QUALITY = 70;
const CONCURRENCY = 8;

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))
  );
  return files.flat();
}

async function isFresh(src, dst) {
  try {
    const [a, b] = await Promise.all([fs.stat(src), fs.stat(dst)]);
    return b.mtimeMs >= a.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  const files = (await Promise.all(FOLDERS.map((f) => walk(path.join(PUBLIC, f)))))
    .flat()
    .filter((f) => f.toLowerCase().endsWith(".webp"));

  let cursor = 0;
  let made = 0;
  let bytes = 0;

  async function worker() {
    while (cursor < files.length) {
      const src = files[cursor++];
      const dst = path.join(OUT, path.relative(PUBLIC, src));
      if (!(await isFresh(src, dst))) {
        await fs.mkdir(path.dirname(dst), { recursive: true });
        await sharp(src)
          .resize({ width: WIDTH, withoutEnlargement: true })
          .webp({ quality: QUALITY, effort: 4 })
          .toFile(dst);
        made += 1;
      }
      bytes += (await fs.stat(dst)).size;
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  // Drop thumbnails whose photo no longer exists.
  const wanted = new Set(files.map((f) => path.join(OUT, path.relative(PUBLIC, f))));
  let removed = 0;
  for (const t of await walk(OUT)) {
    if (!wanted.has(t)) {
      await fs.unlink(t);
      removed += 1;
    }
  }

  console.log(`Thumbnails: ${files.length} photos, ${made} made, ${removed} removed, ${(bytes / 1048576).toFixed(1)} MB total`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
