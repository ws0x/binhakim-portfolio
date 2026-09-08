/**
 * Generates favicon.ico + icon.png from the vector Binhakim Logo.
 * Uses sharp (bundled with Next.js).
 */

import sharp from "sharp";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const APP_DIR = resolve(__dir, "../src/app");
const PUB_DIR = resolve(__dir, "../public");

const svgLogo = `
<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Deep dark container for app manifest & standalone icons -->
  <rect width="200" height="200" rx="36" fill="#070b13"/>

  <!-- Housing Frame -->
  <rect x="18" y="18" width="164" height="164" rx="32" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-width="4" stroke-opacity="0.35"/>

  <!-- Left B Spine -->
  <rect x="42" y="44" width="22" height="112" rx="6" fill="#ffffff"/>

  <!-- Upper B Loop -->
  <path d="M58 44H106C124 44 132 58 124 72C118 82 106 86 58 86" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Lower B Loop & Integrated H Crossbar Bridge -->
  <path d="M58 86H114C134 86 142 102 130 118C122 128 106 130 58 130" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

  <!-- Right H Upright Column -->
  <rect x="136" y="44" width="22" height="112" rx="6" fill="#ffffff"/>

  <!-- H Crossbar connecting B center to H Column -->
  <rect x="108" y="90" width="34" height="20" fill="#ffffff"/>
</svg>
`;

async function run() {
  const svgBuffer = Buffer.from(svgLogo);

  // 1. Generate icon.png (192x192, 512x512, and 180x180 Apple Touch)
  const icon192 = await sharp(svgBuffer)
    .resize(192, 192, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const icon512 = await sharp(svgBuffer)
    .resize(512, 512, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const appleTouch = await sharp(svgBuffer)
    .resize(180, 180, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(`${APP_DIR}/icon.png`, icon192);
  writeFileSync(`${PUB_DIR}/icon.png`, icon512);
  writeFileSync(`${PUB_DIR}/apple-touch-icon.png`, appleTouch);
  console.log("Wrote icon.png (192px and 512px) and apple-touch-icon.png (180px)");

  // 2. Generate multi-size favicon.ico (16, 32, 48)
  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) =>
      sharp(svgBuffer)
        .resize(s, s)
        .ensureAlpha()
        .png({ compressionLevel: 9 })
        .toBuffer()
    )
  );

  const iconDir = Buffer.alloc(6);
  iconDir.writeUInt16LE(0, 0); // reserved
  iconDir.writeUInt16LE(1, 2); // ICO type = 1
  iconDir.writeUInt16LE(sizes.length, 4); // count

  const dirEntries = [];
  let dataOffset = 6 + sizes.length * 16;

  for (let i = 0; i < sizes.length; i++) {
    const s = sizes[i];
    const len = pngBuffers[i].length;
    const entry = Buffer.alloc(16);
    entry.writeUInt8(s === 256 ? 0 : s, 0);
    entry.writeUInt8(s === 256 ? 0 : s, 1);
    entry.writeUInt8(0, 2); // color palette count
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // 32 bits per pixel
    entry.writeUInt32LE(len, 8); // image size
    entry.writeUInt32LE(dataOffset, 12); // data offset
    dirEntries.push(entry);
    dataOffset += len;
  }

  const icoBuffer = Buffer.concat([iconDir, ...dirEntries, ...pngBuffers]);
  writeFileSync(`${PUB_DIR}/favicon.ico`, icoBuffer);
  console.log(`Wrote favicon.ico to public/ (${icoBuffer.length} bytes)`);

  console.log("\nDone! Binhakim Logo and Favicon generated successfully.");
}

run().catch((err) => {
  console.error("Error generating logo/favicon:", err);
  process.exit(1);
});
