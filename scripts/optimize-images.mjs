import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = path.join(process.cwd(), "public", "sofas");
const OUT_DIR = path.join(process.cwd(), "public", "sofas-optimized");
const MAX_WIDTH = 1600;
const QUALITY = 68;
const CONCURRENCY = 8;

const SUPPORTED_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"]);

function parseFolderFilters() {
  const filters = [];
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];

    if (arg === "--folder") {
      const value = args[i + 1];
      if (!value) {
        throw new Error("Missing value for --folder");
      }
      filters.push(value);
      i += 1;
      continue;
    }

    if (arg.startsWith("--folder=")) {
      const value = arg.slice("--folder=".length);
      if (!value) {
        throw new Error("Missing value for --folder");
      }
      filters.push(value);
    }
  }

  return filters;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(full);
      return [full];
    })
  );
  return files.flat();
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function toOutFile(srcFile) {
  const rel = path.relative(SRC_DIR, srcFile);
  const parsed = path.parse(rel);
  const safeName = `${parsed.name}.webp`;
  return path.join(OUT_DIR, parsed.dir, safeName);
}

async function optimizeOne(srcFile) {
  const outFile = toOutFile(srcFile);
  await ensureDir(path.dirname(outFile));

  const before = (await fs.stat(srcFile)).size;

  await sharp(srcFile)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true, fit: "inside" })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(outFile);

  const after = (await fs.stat(outFile)).size;
  return { srcFile, outFile, before, after };
}

function formatMB(bytes) {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  const folderFilters = parseFolderFilters();
  const folderFilterSet = new Set(folderFilters);
  const allFiles = await walk(SRC_DIR);
  const imageFiles = allFiles
    .filter((f) => SUPPORTED_EXT.has(path.extname(f).toLowerCase()))
    .filter((file) => {
      if (folderFilterSet.size === 0) return true;
      const rel = path.relative(SRC_DIR, file);
      const topLevelFolder = rel.split(path.sep)[0];
      return folderFilterSet.has(topLevelFolder);
    });

  await ensureDir(OUT_DIR);

  if (folderFilterSet.size > 0) {
    console.log(`Folder filters: ${folderFilters.join(", ")}`);
  }

  let cursor = 0;
  let completed = 0;
  let totalBefore = 0;
  let totalAfter = 0;

  async function worker() {
    while (cursor < imageFiles.length) {
      const index = cursor;
      cursor += 1;
      const file = imageFiles[index];

      const result = await optimizeOne(file);
      completed += 1;
      totalBefore += result.before;
      totalAfter += result.after;

      if (completed % 25 === 0 || completed === imageFiles.length) {
        console.log(`Optimized ${completed}/${imageFiles.length}`);
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));

  console.log("\\nOptimization complete");
  console.log(`Files: ${imageFiles.length}`);
  console.log(`Before: ${formatMB(totalBefore)}`);
  console.log(`After:  ${formatMB(totalAfter)}`);
  console.log(`Saved:  ${formatMB(totalBefore - totalAfter)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
