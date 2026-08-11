const baseUrl = process.env.BASE_URL || "http://localhost:3000";
const routes = ["/", "/work/nexflow", "/work/videx", "/work/orbit", "/work/commit"];

for (const route of routes) {
  const response = await fetch(`${baseUrl}${route}`, { signal: AbortSignal.timeout(10000) });
  const html = await response.text();
  if (!response.ok) throw new Error(`${route} returned ${response.status}`);
  if (!html.includes('href="#main-content"')) throw new Error(`${route} is missing skip navigation`);
  if (!html.includes('id="main-content"')) throw new Error(`${route} is missing the main content target`);
  if (/<img(?![^>]*\balt=)[^>]*>/i.test(html)) throw new Error(`${route} contains an image without alt text`);
  if ((html.match(/<h1[\s>]/gi) || []).length !== 1) throw new Error(`${route} must contain exactly one h1`);
}

console.log(`Passed accessibility smoke checks for ${routes.length} routes.`);
