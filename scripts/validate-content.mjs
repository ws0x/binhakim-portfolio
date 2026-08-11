import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const content = await readFile(join(root, "src/content/projects.ts"), "utf8");
const requiredSlugs = ["nexflow", "videx", "orbit", "commit"];
const missingSlugs = requiredSlugs.filter((slug) => !content.includes(`slug: "${slug}"`));
if (missingSlugs.length > 0) throw new Error(`Missing flagship projects: ${missingSlugs.join(", ")}`);
if (content.includes("Interpack26") || content.includes("interpack-scraper")) throw new Error("Obsolete Interpack content is still present");

for (const slug of requiredSlugs) {
  await access(join(root, `src/app/work/[slug]/page.tsx`));
  if (!content.includes(`slug: "${slug}"`)) throw new Error(`Project ${slug} has no content record`);
}

console.log(`Validated ${requiredSlugs.length} flagship project records and case-study routing.`);
