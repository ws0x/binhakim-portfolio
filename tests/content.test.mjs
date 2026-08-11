import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const root = new URL("..", import.meta.url);
const content = readFileSync(new URL("src/content/projects.ts", root), "utf8");

test("flagship projects keep the agreed order", () => {
  const expected = ["nexflow", "videx", "orbit", "commit"];
  const actual = [...content.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]);
  assert.deepEqual(actual, expected);
});

test("content validation script passes", () => {
  execFileSync(process.execPath, ["scripts/validate-content.mjs"], { cwd: root, stdio: "pipe" });
});

test("no obsolete Interpack project is published", () => {
  assert.equal(content.includes("Interpack26"), false);
  assert.equal(content.includes("interpack-scraper"), false);
});
