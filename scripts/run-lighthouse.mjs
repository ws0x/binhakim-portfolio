import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

const baseUrl = process.env.LIGHTHOUSE_BASE_URL ?? "http://127.0.0.1:3000";
const chromePath = process.env.CHROME_PATH;
const routes = ["/", "/work/commit", "/work/videx", "/work/orbit", "/work/nexflow"];
const minimumScores = { performance: 0.95, accessibility: 1, "best-practices": 1, seo: 1 };

const chrome = await launch({
  chromePath,
  chromeFlags: ["--headless=new", "--no-first-run", "--disable-gpu"],
});

let failed = false;

try {
  for (const route of routes) {
    const result = await lighthouse(`${baseUrl}${route}`, {
      logLevel: "error",
      output: "json",
      port: chrome.port,
      onlyCategories: Object.keys(minimumScores),
      formFactor: "mobile",
      screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false },
    });

    if (!result) throw new Error(`Lighthouse returned no result for ${route}`);

    const scores = Object.fromEntries(
      Object.keys(minimumScores).map((category) => [category, result.lhr.categories[category].score ?? 0]),
    );
    const lcp = result.lhr.audits["largest-contentful-paint"].numericValue;
    const cls = result.lhr.audits["cumulative-layout-shift"].numericValue;

    console.log(`${route} ${JSON.stringify({ scores, lcp: Math.round(lcp), cls })}`);

    for (const [category, minimum] of Object.entries(minimumScores)) {
      if (scores[category] < minimum) failed = true;
    }
    if (lcp > 2500 || cls > 0.1) failed = true;
  }
} finally {
  await chrome.kill();
}

if (failed) {
  throw new Error("One or more Lighthouse release budgets failed");
}
