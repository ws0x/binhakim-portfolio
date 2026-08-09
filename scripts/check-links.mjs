import { readFile } from "node:fs/promises";

const files = ["src/lib/site.ts", "src/data/work.json", "src/data/projects.json", "src/data/writing.json"];
const urls = new Set();
for (const file of files) {
  const text = await readFile(file, "utf8");
  for (const match of text.matchAll(/https?:\/\/[^\"'\s)]+/g)) urls.add(match[0].replace(/[),.]+$/, ""));
}

const failures = [];
for (const url of urls) {
  try {
    const response = await fetch(url, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000), headers: { "user-agent": "portfolio-link-audit/1.0" } });
    if (!response.ok && response.status !== 403) failures.push(`${response.status} ${url}`);
    else if (response.status === 403) console.warn(`${response.status} ${url} (blocked by provider, treated as reachable)`);
    else console.log(`${response.status} ${url}`);
  } catch (error) {
    failures.push(`${error instanceof Error ? error.message : "request failed"} ${url}`);
  }
}

if (failures.length) {
  console.error("Broken external links:");
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
