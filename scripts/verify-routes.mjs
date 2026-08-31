const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/work", "/work/nexflow", "/work/videx", "/work/orbit", "/work/commit"];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(10000) });
  const html = await response.text();
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  if (!html.includes("<main")) throw new Error(`${route} is missing a main landmark`);
  if (!html.match(/<h1[\s>]/)) throw new Error(`${route} is missing a primary heading`);
}

const missing = await fetch(`${baseUrl}/work/not-a-project`, { signal: AbortSignal.timeout(10000) });
if (missing.status !== 404) throw new Error(`Unknown project slug returned ${missing.status}, expected 404`);

console.log(`Verified ${routes.length} routes and the invalid-slug 404 at ${baseUrl}.`);
