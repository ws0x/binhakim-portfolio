/**
 * Generates favicon.ico + icon.png from a source photo.
 * Uses sharp (bundled with Next.js) — no extra installs needed.
 *
 * Crop strategy:
 *   The photo is a B&W side-profile portrait (portrait orientation).
 *   Face is roughly in the upper-center. We extract a centred square
 *   biased toward the top so the head fills the icon frame well.
 */

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const SRC   = "I:\\My Drive\\Personal\\Pictures\\BW Side Profile Pic - min.jpg";
const OUT   = resolve(__dir, "../src/app");

// ── 1. Read source & get metadata ────────────────────────────────────────────
const meta = await sharp(SRC).metadata();
const { width: W, height: H } = meta;
console.log(`Source: ${W}×${H}`);

// ── 2. Compute square crop (face-centred, biased toward top) ─────────────────
const side   = Math.min(W, H);          // largest square that fits
const left   = Math.round((W - side) / 2);   // horizontally centred
// Bias toward the top: for a portrait shot the face is in the upper portion.
// We take the full top of the image so the head is never clipped.
const top    = 0;

console.log(`Crop: ${side}×${side} from (${left}, ${top})`);

const cropped = sharp(SRC).extract({ left, top, width: side, height: side });

// ── 3. Generate icon.png (192×192, high-res for PWA / Apple touch) ───────────
const iconPng = await cropped
  .clone()
  .resize(192, 192, { kernel: "lanczos3" })
  .ensureAlpha()
  .png({ compressionLevel: 9 })
  .toBuffer();

writeFileSync(`${OUT}/icon.png`, iconPng);
console.log("Wrote icon.png (192×192)");

// ── 4. Build favicon.ico (multi-size: 16, 32, 48) ────────────────────────────
// ICO format: ICONDIR + N × ICONDIRENTRY + N × image-data (PNG)
const sizes = [16, 32, 48];

const pngBuffers = await Promise.all(
  sizes.map((s) =>
    cropped
      .clone()
      .resize(s, s, { kernel: "lanczos3" })
      .ensureAlpha()          // Turbopack requires RGBA (32-bit) PNGs inside ICO
      .png({ compressionLevel: 9 })
      .toBuffer()
  )
);

// ICONDIR  (6 bytes): reserved(2) + type=1(2) + count(2)
const iconDir = Buffer.alloc(6);
iconDir.writeUInt16LE(0, 0);          // reserved
iconDir.writeUInt16LE(1, 2);          // type: 1 = icon
iconDir.writeUInt16LE(sizes.length, 4);

// Each ICONDIRENTRY is 16 bytes
const dirEntries = [];
let dataOffset = 6 + sizes.length * 16;  // header + all directory entries

for (let i = 0; i < sizes.length; i++) {
  const s   = sizes[i];
  const len = pngBuffers[i].length;
  const entry = Buffer.alloc(16);
  entry.writeUInt8(s === 256 ? 0 : s, 0);   // width  (0 means 256)
  entry.writeUInt8(s === 256 ? 0 : s, 1);   // height
  entry.writeUInt8(0, 2);                    // color count (0 = not palette)
  entry.writeUInt8(0, 3);                    // reserved
  entry.writeUInt16LE(1, 4);                 // color planes
  entry.writeUInt16LE(32, 6);                // bits per pixel
  entry.writeUInt32LE(len, 8);               // size of image data
  entry.writeUInt32LE(dataOffset, 12);       // offset of image data
  dirEntries.push(entry);
  dataOffset += len;
}

const icoBuffer = Buffer.concat([iconDir, ...dirEntries, ...pngBuffers]);
writeFileSync(`${OUT}/favicon.ico`, icoBuffer);
console.log(`Wrote favicon.ico (${sizes.join("/")}px, ${icoBuffer.length} bytes)`);

console.log("\nDone! Favicon files placed in src/app/");
