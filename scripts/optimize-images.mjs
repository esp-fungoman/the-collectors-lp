#!/usr/bin/env node
/**
 * Convert heavy PNG/JPG and raster-in-SVG assets to WebP.
 * Run: yarn optimize:images
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const IMAGES = path.join(ROOT, "public", "images");

const QUALITY = 80;

/** @type {{ rel: string, maxWidth: number, deleteSource?: boolean }[]} */
const JOBS = [
  // Full-bleed backgrounds
  { rel: "hero-bg.svg", maxWidth: 1920 },
  { rel: "masterpiece/masterpiece-bg.png", maxWidth: 1920 },
  { rel: "value/value-bg.png", maxWidth: 1920 },
  { rel: "menu-bg.png", maxWidth: 1920 },
  { rel: "footer/footer-bg.svg", maxWidth: 1920 },
  { rel: "hero/banner-bg.png", maxWidth: 1920 },
  { rel: "hero/card-icons/cardbg.png", maxWidth: 640 },

  // Map / times (raster-in-SVG)
  { rel: "map/map.svg", maxWidth: 1272 },
  { rel: "map/time-1.svg", maxWidth: 600 },
  { rel: "map/time-2.svg", maxWidth: 600 },
  { rel: "map/time-3.svg", maxWidth: 600 },

  // Photos
  ...["01", "02", "03", "04", "05"].map((n) => ({
    rel: `concept/${n}.jpg`,
    maxWidth: 1600,
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    rel: `masterpiece/${i + 1}.jpg`,
    maxWidth: 1600,
  })),
  ...["01", "02", "03", "04", "05", "06"].flatMap((n) => [
    { rel: `cultural/prive-mansion/${n}.jpg`, maxWidth: 1600 },
    { rel: `cultural/oasis-mansion/${n}.jpg`, maxWidth: 1600 },
  ]),

  // UI / icons
  { rel: "logo.png", maxWidth: 256 },
  { rel: "logo-big.svg", maxWidth: 512 },
  { rel: "form-title.png", maxWidth: 800 },
  { rel: "form-float.png", maxWidth: 256 },
  { rel: "phone-float.png", maxWidth: 256 },
  { rel: "message-float.png", maxWidth: 256 },
  { rel: "footer/footer-address.svg", maxWidth: 800 },
  { rel: "hero/banner-hero-divider.png", maxWidth: 64 },
  { rel: "hero/hamburger-icon.png", maxWidth: 128 },
  { rel: "masterpiece/arrow-right.png", maxWidth: 256 },
  { rel: "masterpiece/arrow.png", maxWidth: 256 },
  ...["icon-vitri", "icon-quymo", "icon-tienich", "icon-bangiao"].map((n) => ({
    rel: `hero/card-icons/${n}.png`,
    maxWidth: 320,
  })),
  ...[
    "icon-vanhdai",
    "icon-lienphuong",
    "icon-caotoc",
    "icon-thuthiem",
    "icon-sanbay",
  ].map((n) => ({
    rel: `hero/network-icons/${n}.png`,
    maxWidth: 128,
  })),
  ...["icon-1", "icon-2", "icon-3", "icon-4"].map((n) => ({
    rel: `value/${n}.png`,
    maxWidth: 256,
  })),
];

const DELETE_ONLY = ["hero-bg.png"];

async function optimizeOne(rel, maxWidth) {
  const src = path.join(IMAGES, rel);
  const destRel = rel.replace(/\.(png|jpe?g|svg)$/i, ".webp");
  const dest = path.join(IMAGES, destRel);

  try {
    await fs.access(src);
  } catch {
    console.warn(`skip missing: ${rel}`);
    return null;
  }

  const pipeline = sharp(src, { density: 144, failOn: "none" }).rotate();
  const meta = await pipeline.metadata();
  const width = meta.width ?? maxWidth;
  const targetW = Math.min(width, maxWidth);

  await pipeline
    .resize({
      width: targetW,
      withoutEnlargement: true,
    })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(dest);

  const [srcStat, destStat] = await Promise.all([
    fs.stat(src),
    fs.stat(dest),
  ]);
  const saved = ((1 - destStat.size / srcStat.size) * 100).toFixed(0);
  console.log(
    `✓ ${rel} → ${destRel}  ${(srcStat.size / 1024).toFixed(0)}KB → ${(destStat.size / 1024).toFixed(0)}KB (−${saved}%)`,
  );

  if (src !== dest) {
    await fs.unlink(src);
  }
  return destRel;
}

async function main() {
  console.log("Optimizing images in public/images …\n");

  for (const job of JOBS) {
    await optimizeOne(job.rel, job.maxWidth);
  }

  for (const rel of DELETE_ONLY) {
    const p = path.join(IMAGES, rel);
    try {
      await fs.unlink(p);
      console.log(`✗ deleted unused ${rel}`);
    } catch {
      // already gone
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
