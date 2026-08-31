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
<svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0a1220"/>
      <stop offset="50%" stop-color="#070b13"/>
      <stop offset="100%" stop-color="#04080e"/>
    </linearGradient>
    <linearGradient id="bh-cyan-blue" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#67e8f9"/>
      <stop offset="60%" stop-color="#5aa7ff"/>
      <stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
    <radialGradient id="bh-glow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#67e8f9" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#67e8f9" stop-opacity="0"/>
    </radialGradient>
    <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#67e8f9" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Base container with subtle border -->
  <rect x="20" y="20" width="472" height="472" rx="104" fill="url(#bg-grad)"/>
  <rect x="20" y="20" width="472" height="472" rx="104" fill="url(#bh-glow)"/>
  <rect x="20" y="20" width="472" height="472" rx="104" stroke="url(#bh-cyan-blue)" stroke-width="8" stroke-opacity="0.45"/>

  <!-- Inner Monogram Glyph: B + H Circuit Interlock -->
  <g filter="url(#glow-filter)">
    <!-- Left B spine -->
    <path d="M148 116V396" stroke="url(#bh-cyan-blue)" stroke-width="36" stroke-linecap="round"/>

    <!-- Upper B loop -->
    <path d="M148 134H244C298 134 298 248 244 248H148" stroke="url(#bh-cyan-blue)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Lower B loop -->
    <path d="M148 248H252C310 248 310 378 252 378H148" stroke="url(#bh-cyan-blue)" stroke-width="36" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Right H pillar -->
    <path d="M364 116V396" stroke="url(#bh-cyan-blue)" stroke-width="36" stroke-linecap="round"/>

    <!-- Cross bridge uniting B and H -->
    <path d="M252 248H364" stroke="url(#bh-cyan-blue)" stroke-width="36" stroke-linecap="round"/>

    <!-- High-tech Node Accents -->
    <circle cx="364" cy="116" r="16" fill="#67e8f9"/>
    <circle cx="148" cy="116" r="16" fill="#67e8f9"/>
    <circle cx="364" cy="396" r="14" fill="#5aa7ff"/>
    <circle cx="148" cy="396" r="14" fill="#5aa7ff"/>
  </g>
</svg>
`;

async function run() {
  const svgBuffer = Buffer.from(svgLogo);

  // 1. Generate icon.png (192x192 and 512x512)
  const icon192 = await sharp(svgBuffer)
    .resize(192, 192)
    .png({ compressionLevel: 9 })
    .toBuffer();

  const icon512 = await sharp(svgBuffer)
    .resize(512, 512)
    .png({ compressionLevel: 9 })
    .toBuffer();

  writeFileSync(`${APP_DIR}/icon.png`, icon192);
  writeFileSync(`${PUB_DIR}/icon.png`, icon512);
  console.log("Wrote icon.png (192px to src/app and 512px to public)");

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
