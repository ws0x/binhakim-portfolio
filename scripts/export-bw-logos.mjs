/**
 * Exports all 6 Black & White "BH" logo concepts in maximum quality:
 * 1. Infinite-resolution Vector SVGs (Dark & Light)
 * 2. 2048x2048 4K High-Res PNGs (with Lanczos3 filtering)
 */

import sharp from "sharp";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

const OUT_DIR = "d:/Projects/binhakim-portfolio/public/brand-assets/bw-monograms";

mkdirSync(OUT_DIR, { recursive: true });

const concepts = [
  {
    id: "concept-01-interlocking-monolith",
    name: "The Interlocking Monolith",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#070b13"/>
  <rect x="18" y="18" width="164" height="164" rx="32" fill="#ffffff" fill-opacity="0.06" stroke="#ffffff" stroke-width="3.5" stroke-opacity="0.25"/>
  <rect x="42" y="44" width="22" height="112" rx="6" fill="#ffffff"/>
  <path d="M58 44H106C124 44 132 58 124 72C118 82 106 86 58 86" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M58 86H114C134 86 142 102 130 118C122 128 106 130 58 130" stroke="#ffffff" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="136" y="44" width="22" height="112" rx="6" fill="#ffffff"/>
  <rect x="108" y="90" width="34" height="20" fill="#ffffff"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffffff"/>
  <rect x="18" y="18" width="164" height="164" rx="32" fill="#000000" fill-opacity="0.04" stroke="#000000" stroke-width="3.5" stroke-opacity="0.2"/>
  <rect x="42" y="44" width="22" height="112" rx="6" fill="#000000"/>
  <path d="M58 44H106C124 44 132 58 124 72C118 82 106 86 58 86" stroke="#000000" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M58 86H114C134 86 142 102 130 118C122 128 106 130 58 130" stroke="#000000" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <rect x="136" y="44" width="22" height="112" rx="6" fill="#000000"/>
  <rect x="108" y="90" width="34" height="20" fill="#000000"/>
</svg>`,
  },
  {
    id: "concept-02-optical-multi-track",
    name: "The Optical Multi-Track",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#070b13"/>
  <rect x="20" y="20" width="160" height="160" rx="36" stroke="#ffffff" stroke-width="4" stroke-opacity="0.25"/>
  <path d="M50 48H104C126 48 134 64 126 78C120 88 108 90 50 90" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M50 90H112C136 90 144 108 132 126C122 140 102 142 50 142" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="50" y1="48" x2="50" y2="142" stroke="#ffffff" stroke-width="13" stroke-linecap="round"/>
  <line x1="74" y1="48" x2="74" y2="142" stroke="#ffffff" stroke-width="9" stroke-linecap="round"/>
  <line x1="148" y1="48" x2="148" y2="142" stroke="#ffffff" stroke-width="13" stroke-linecap="round"/>
  <line x1="112" y1="90" x2="148" y2="90" stroke="#ffffff" stroke-width="13" stroke-linecap="round"/>
  <circle cx="148" cy="48" r="5" fill="#ffffff"/>
  <circle cx="50" cy="48" r="5" fill="#ffffff"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffffff"/>
  <rect x="20" y="20" width="160" height="160" rx="36" stroke="#000000" stroke-width="4" stroke-opacity="0.2"/>
  <path d="M50 48H104C126 48 134 64 126 78C120 88 108 90 50 90" stroke="#000000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M50 90H112C136 90 144 108 132 126C122 140 102 142 50 142" stroke="#000000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="50" y1="48" x2="50" y2="142" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
  <line x1="74" y1="48" x2="74" y2="142" stroke="#000000" stroke-width="9" stroke-linecap="round"/>
  <line x1="148" y1="48" x2="148" y2="142" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
  <line x1="112" y1="90" x2="148" y2="90" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
  <circle cx="148" cy="48" r="5" fill="#000000"/>
  <circle cx="50" cy="48" r="5" fill="#000000"/>
</svg>`,
  },
  {
    id: "concept-03-brutalist-stencil-die",
    name: "The Brutalist Stencil Die",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="c3-mask-dark">
      <rect width="200" height="200" fill="#ffffff"/>
      <line x1="54" y1="44" x2="54" y2="156" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
      <rect x="70" y="46" width="50" height="42" rx="8" fill="#000000"/>
      <rect x="80" y="56" width="28" height="22" rx="4" fill="#ffffff"/>
      <rect x="70" y="102" width="54" height="46" rx="10" fill="#000000"/>
      <rect x="80" y="112" width="32" height="26" rx="5" fill="#ffffff"/>
      <line x1="146" y1="44" x2="146" y2="156" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
      <rect x="122" y="90" width="28" height="12" fill="#000000"/>
    </mask>
  </defs>
  <rect width="200" height="200" fill="#070b13"/>
  <rect x="24" y="24" width="152" height="152" rx="28" fill="#ffffff" mask="url(#c3-mask-dark)"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="c3-mask-light">
      <rect width="200" height="200" fill="#ffffff"/>
      <line x1="54" y1="44" x2="54" y2="156" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
      <rect x="70" y="46" width="50" height="42" rx="8" fill="#000000"/>
      <rect x="80" y="56" width="28" height="22" rx="4" fill="#ffffff"/>
      <rect x="70" y="102" width="54" height="46" rx="10" fill="#000000"/>
      <rect x="80" y="112" width="32" height="26" rx="5" fill="#ffffff"/>
      <line x1="146" y1="44" x2="146" y2="156" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
      <rect x="122" y="90" width="28" height="12" fill="#000000"/>
    </mask>
  </defs>
  <rect width="200" height="200" fill="#ffffff"/>
  <rect x="24" y="24" width="152" height="152" rx="28" fill="#000000" mask="url(#c3-mask-light)"/>
</svg>`,
  },
  {
    id: "concept-04-logic-circuit-matrix",
    name: "The Logic Circuit Matrix",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#070b13"/>
  <rect x="20" y="20" width="160" height="160" rx="36" stroke="#ffffff" stroke-width="4" stroke-opacity="0.25"/>
  <line x1="48" y1="46" x2="48" y2="154" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>
  <path d="M48 54H106C122 54 130 66 122 80C116 90 106 92 48 92" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M48 92H112C130 92 138 108 128 124C120 136 104 138 48 138" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="112" y1="92" x2="152" y2="92" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
  <line x1="152" y1="46" x2="152" y2="154" stroke="#ffffff" stroke-width="14" stroke-linecap="round"/>
  <circle cx="48" cy="46" r="6" fill="#ffffff"/>
  <circle cx="48" cy="154" r="6" fill="#ffffff"/>
  <circle cx="152" cy="46" r="6" fill="#ffffff"/>
  <circle cx="152" cy="154" r="6" fill="#ffffff"/>
  <circle cx="122" cy="80" r="4.5" fill="#ffffff"/>
  <circle cx="128" cy="124" r="4.5" fill="#ffffff"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffffff"/>
  <rect x="20" y="20" width="160" height="160" rx="36" stroke="#000000" stroke-width="4" stroke-opacity="0.2"/>
  <line x1="48" y1="46" x2="48" y2="154" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  <path d="M48 54H106C122 54 130 66 122 80C116 90 106 92 48 92" stroke="#000000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M48 92H112C130 92 138 108 128 124C120 136 104 138 48 138" stroke="#000000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="112" y1="92" x2="152" y2="92" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
  <line x1="152" y1="46" x2="152" y2="154" stroke="#000000" stroke-width="14" stroke-linecap="round"/>
  <circle cx="48" cy="46" r="6" fill="#000000"/>
  <circle cx="48" cy="154" r="6" fill="#000000"/>
  <circle cx="152" cy="46" r="6" fill="#000000"/>
  <circle cx="152" cy="154" r="6" fill="#000000"/>
  <circle cx="122" cy="80" r="4.5" fill="#000000"/>
  <circle cx="128" cy="124" r="4.5" fill="#000000"/>
</svg>`,
  },
  {
    id: "concept-05-isometric-spatial-delta",
    name: "The Isometric Spatial Delta",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#070b13"/>
  <polygon points="100,32 156,62 100,92 44,62" fill="#ffffff" fill-opacity="0.15" stroke="#ffffff" stroke-width="4"/>
  <path d="M44 62V148L100 178V92L44 62Z" fill="#ffffff" fill-opacity="0.85" stroke="#ffffff" stroke-width="3"/>
  <polygon points="56,84 88,100 88,114 56,98" fill="#070b13"/>
  <polygon points="56,116 88,132 88,146 56,130" fill="#070b13"/>
  <path d="M100 92V178L156 148V62L100 92Z" fill="#ffffff" fill-opacity="0.4" stroke="#ffffff" stroke-width="3"/>
  <polygon points="120,90 136,82 136,150 120,158" fill="#070b13"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffffff"/>
  <polygon points="100,32 156,62 100,92 44,62" fill="#000000" fill-opacity="0.08" stroke="#000000" stroke-width="4"/>
  <path d="M44 62V148L100 178V92L44 62Z" fill="#000000" fill-opacity="0.9" stroke="#000000" stroke-width="3"/>
  <polygon points="56,84 88,100 88,114 56,98" fill="#ffffff"/>
  <polygon points="56,116 88,132 88,146 56,130" fill="#ffffff"/>
  <path d="M100 92V178L156 148V62L100 92Z" fill="#000000" fill-opacity="0.35" stroke="#000000" stroke-width="3"/>
  <polygon points="120,90 136,82 136,150 120,158" fill="#ffffff"/>
</svg>`,
  },
  {
    id: "concept-06-monospaced-syntax-gate",
    name: "The Monospaced Syntax Gate",
    svgDark: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#070b13"/>
  <path d="M46 42H30V158H46" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M58 52H94C108 52 114 62 108 74C104 82 96 84 58 84" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M58 84H98C114 84 120 96 112 110C106 120 94 122 58 122" stroke="#ffffff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="58" y1="52" x2="58" y2="122" stroke="#ffffff" stroke-width="13" stroke-linecap="round"/>
  <circle cx="126" cy="68" r="5" fill="#ffffff"/>
  <circle cx="126" cy="106" r="5" fill="#ffffff"/>
  <line x1="144" y1="52" x2="144" y2="122" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
  <line x1="170" y1="52" x2="170" y2="122" stroke="#ffffff" stroke-width="12" stroke-linecap="round"/>
  <line x1="144" y1="87" x2="170" y2="87" stroke="#ffffff" stroke-width="12"/>
  <path d="M154 42H170V158H154" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.3"/>
</svg>`,
    svgLight: `<svg width="512" height="512" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#ffffff"/>
  <path d="M46 42H30V158H46" stroke="#000000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M58 52H94C108 52 114 62 108 74C104 82 96 84 58 84" stroke="#000000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M58 84H98C114 84 120 96 112 110C106 120 94 122 58 122" stroke="#000000" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <line x1="58" y1="52" x2="58" y2="122" stroke="#000000" stroke-width="13" stroke-linecap="round"/>
  <circle cx="126" cy="68" r="5" fill="#000000"/>
  <circle cx="126" cy="106" r="5" fill="#000000"/>
  <line x1="144" y1="52" x2="144" y2="122" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
  <line x1="170" y1="52" x2="170" y2="122" stroke="#000000" stroke-width="12" stroke-linecap="round"/>
  <line x1="144" y1="87" x2="170" y2="87" stroke="#000000" stroke-width="12"/>
  <path d="M154 42H170V158H154" stroke="#000000" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-opacity="0.2"/>
</svg>`,
  },
];

async function exportAll() {
  console.log("Exporting 6 Black & White BH Monogram Logo Assets in Highest Quality (Vector + 2048x2048 4K PNG)...");

  for (const c of concepts) {
    const cDir = resolve(OUT_DIR, c.id);
    mkdirSync(cDir, { recursive: true });

    // 1. Write SVGs
    const darkSvgPath = resolve(cDir, `${c.id}-dark.svg`);
    const lightSvgPath = resolve(cDir, `${c.id}-light.svg`);
    writeFileSync(darkSvgPath, c.svgDark);
    writeFileSync(lightSvgPath, c.svgLight);

    // 2. Render 4K (2048x2048) Ultra-High-Resolution PNGs with Lanczos3 resampling
    const darkPng2048 = await sharp(Buffer.from(c.svgDark))
      .resize(2048, 2048, { kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toBuffer();

    const lightPng2048 = await sharp(Buffer.from(c.svgLight))
      .resize(2048, 2048, { kernel: "lanczos3" })
      .png({ compressionLevel: 9 })
      .toBuffer();

    const darkPngPath = resolve(cDir, `${c.id}-dark-4k.png`);
    const lightPngPath = resolve(cDir, `${c.id}-light-4k.png`);
    writeFileSync(darkPngPath, darkPng2048);
    writeFileSync(lightPngPath, lightPng2048);

    console.log(`✓ Exported: ${c.name} -> ${c.id}/`);
  }

  console.log("\nAll 6 B&W BH logo concepts successfully exported to public/brand-assets/bw-monograms/");
}

exportAll().catch((err) => {
  console.error("Export failed:", err);
  process.exit(1);
});
