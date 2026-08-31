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
  <defs>
    <linearGradient id="plat-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="60%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>
    <mask id="plat-mask">
      <rect width="200" height="200" fill="#ffffff"/>
      <line x1="56" y1="46" x2="56" y2="154" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
      <rect x="74" y="48" width="56" height="42" rx="10" fill="#000000"/>
      <rect x="86" y="58" width="32" height="22" rx="5" fill="#ffffff"/>
      <rect x="74" y="104" width="66" height="46" rx="12" fill="#000000"/>
      <rect x="86" y="114" width="42" height="26" rx="6" fill="#ffffff"/>
      <polygon points="144,48 160,48 148,152 132,152" fill="#000000"/>
    </mask>
  </defs>

  <!-- Deep dark container for standalone icons & app manifest -->
  <rect width="200" height="200" rx="36" fill="#030712"/>

  <!-- Main Platinum Monolith Slab with Negative Space Mask -->
  <rect x="24" y="24" width="152" height="152" rx="28" fill="url(#plat-grad)" mask="url(#plat-mask)"/>
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
