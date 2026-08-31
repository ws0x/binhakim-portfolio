import { readFile } from "node:fs/promises";

const files = [
  "src/content/projects.ts",
  "src/components/SiteSections.tsx",
  "src/data/blog.json",
];
const urls = new Set();
for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(/https:\/\/[^"'\s)]+/g)) urls.add(match[0].replace(/[.,]+$/, ""));
}

const ignored = ["https://schema.org", "https://www.google-analytics.com"];
const results = [];
for (const url of [...urls].filter((value) => !ignored.includes(value))) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000) });
    const antiBot = response.status === 403 && /(medium|linkedin)\.com/.test(new URL(url).hostname);
    if (!response.ok && !antiBot) throw new Error(`HTTP ${response.status}`);
    results.push(`${response.status} ${url}${antiBot ? " (anti-bot exception)" : ""}`);
  } catch (error) {
    throw new Error(`${url}: ${error.message}`);
  }
}

console.log(`Checked ${results.length} external links.`);
console.log(results.join("\n"));
