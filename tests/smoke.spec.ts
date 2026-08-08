import { test, expect, type Page } from "@playwright/test";
import { ROUTES, SITE_URL } from "../src/lib/site";

/**
 * Smoke suite.
 *
 * These are deliberately shallow but broad: they assert the things that break
 * silently in a content-driven site — a section that stops rendering, a layout
 * that overflows on a phone, a reveal animation that never resolves and leaves
 * content invisible, a dead internal anchor.
 *
 * Anything failing here means the deployed page is visibly wrong.
 */

/** Every section the homepage is expected to render, in document order. */
const SECTIONS = [
  "hero",
  "about",
  "skills",
  "live-projects",
  "experience",
  "projects",
  "education",
  "certifications",
  "achievements",
  "languages",
  "writing",
  "contact",
];

/**
 * Requests to Vercel's analytics endpoints only resolve on Vercel's edge, so
 * they 404 against a local production server. Not a site defect.
 */
const IGNORED_REQUEST_FAILURES = /\/_vercel\/(insights|speed-insights)/;

/**
 * Scroll the full page so every IntersectionObserver-driven reveal fires.
 *
 * Steps by half a viewport and waits a frame or two at each stop. Larger jumps
 * outrun the observer — it reports intersections on a render-frame cadence, so
 * an element scrolled past between frames is never seen as intersecting.
 *
 * `returnToTop` is opt-in: coming back to the top leaves anything the observer
 * missed permanently out of view, which hides exactly the bug the reveal test
 * is looking for.
 */
async function scrollThrough(page: Page, { returnToTop = false } = {}) {
  const { height, step } = await page.evaluate(() => ({
    height: document.body.scrollHeight,
    step: Math.max(200, Math.floor(window.innerHeight / 2)),
  }));

  for (let y = 0; y <= height; y += step) {
    await page.evaluate((offset) => window.scrollTo(0, offset), y);
    await page.waitForTimeout(120);
  }

  if (returnToTop) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
  }
}

test.describe("homepage", () => {
  test("renders every section", async ({ page }) => {
    await page.goto("/");
    for (const id of SECTIONS) {
      await expect(page.locator(`#${id}`), `#${id} should exist`).toHaveCount(1);
    }
  });

  test("has no console or page errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
    page.on("console", (m) => {
      if (m.type() === "error" && !IGNORED_REQUEST_FAILURES.test(m.location().url)) {
        errors.push(`console: ${m.text()}`);
      }
    });
    page.on("response", (r) => {
      if (r.status() >= 400 && !IGNORED_REQUEST_FAILURES.test(r.url())) {
        errors.push(`${r.status()} ${r.url()}`);
      }
    });

    await page.goto("/", { waitUntil: "load" });
    await scrollThrough(page);

    expect(errors).toEqual([]);
  });

  test("never scrolls horizontally", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page, { returnToTop: true });
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth
    );
    expect(overflows, "page must not overflow its viewport width").toBe(false);
  });

  test("every scroll reveal resolves to visible", async ({ page }) => {
    await page.goto("/");
    await scrollThrough(page);

    const countHidden = () =>
      page.evaluate(
        () =>
          [...document.querySelectorAll(".reveal")].filter(
            (el) => getComputedStyle(el).opacity !== "1"
          ).length
      );

    // Reveals transition over 0.55s plus a per-element stagger, so poll until
    // they settle rather than sleeping for a guessed duration — a fixed wait
    // either flakes on a slow machine or wastes time on a fast one.
    await expect
      .poll(countHidden, {
        message: "content stuck at opacity 0 is invisible to readers",
        timeout: 10_000,
      })
      .toBe(0);

    const total = await page.locator(".reveal").count();
    expect(total, "expected reveal-wrapped content on the page").toBeGreaterThan(0);
  });

  test("in-page nav links all point at real sections", async ({ page }) => {
    await page.goto("/");
    const hrefs = await page.$$eval("a[href^='#']", (as) =>
      as.map((a) => a.getAttribute("href")!).filter((h) => h.length > 1)
    );
    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of new Set(hrefs)) {
      await expect(page.locator(href), `${href} should resolve`).toHaveCount(1);
    }
  });
});

test.describe("accessibility", () => {
  test("honours prefers-reduced-motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/", { waitUntil: "load" });
    await page.waitForTimeout(600);

    const state = await page.evaluate(() => {
      const scan = document.querySelector(".scan-line");
      const reveals = [...document.querySelectorAll(".reveal")];
      return {
        scanDisplay: scan ? getComputedStyle(scan).display : "absent",
        hiddenReveals: reveals.filter((el) => getComputedStyle(el).opacity !== "1").length,
      };
    });

    // Reveals resolve immediately rather than waiting on scroll.
    expect(state.hiddenReveals).toBe(0);
    // The decorative scan line is removed rather than left looping.
    expect(state.scanDisplay).toBe("none");
  });

  test("dim text meets WCAG AA against every surface", async ({ page }) => {
    await page.goto("/");

    const ratios = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const toRgb = (v: string) => {
        const d = document.createElement("div");
        d.style.color = v;
        document.body.appendChild(d);
        const rgb = getComputedStyle(d).color.match(/\d+/g)!.map(Number);
        d.remove();
        return rgb as [number, number, number];
      };
      const lin = (c: number) => {
        const s = c / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      const lum = ([r, g, b]: number[]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
      const fg = lum(toRgb(root.getPropertyValue("--text-dim")));

      return ["--bg-base", "--bg-elevated", "--bg-card"].map((token) => {
        const bg = lum(toRgb(root.getPropertyValue(token)));
        const [hi, lo] = fg > bg ? [fg, bg] : [bg, fg];
        return { token, ratio: (hi + 0.05) / (lo + 0.05) };
      });
    });

    for (const { token, ratio } of ratios) {
      expect(ratio, `--text-dim on ${token} is ${ratio.toFixed(2)}:1`).toBeGreaterThanOrEqual(4.5);
    }
  });
});

/**
 * Driven by the same ROUTES table the site builds its nav and sitemap from, so
 * a newly added route is covered here the moment it is registered — there is no
 * separate list to remember to update.
 */
test.describe("routes", () => {
  for (const route of ROUTES) {
    test(`${route.href} responds and is self-canonical`, async ({ page }) => {
      const response = await page.goto(route.href);
      expect(response?.status(), `${route.href} should be reachable`).toBe(200);

      const canonical = await page
        .locator('link[rel="canonical"]')
        .first()
        .getAttribute("href");
      const expected = route.href === "/" ? SITE_URL : `${SITE_URL}${route.href}`;
      expect(canonical, `${route.href} must declare its own canonical`).toBe(expected);

      // Exactly one <h1> per page: more than one is an outline bug, none means
      // the page has no title for a crawler or a screen reader to anchor on.
      await expect(page.locator("h1")).toHaveCount(1);
    });
  }

  test("no two routes share a canonical", async ({ page }) => {
    const seen = new Map<string, string>();
    for (const route of ROUTES) {
      await page.goto(route.href);
      const canonical = (await page
        .locator('link[rel="canonical"]')
        .first()
        .getAttribute("href"))!;
      expect(
        seen.has(canonical),
        `${route.href} and ${seen.get(canonical)} both claim ${canonical}`
      ).toBe(false);
      seen.set(canonical, route.href);
    }
  });
});

test.describe("error routes", () => {
  test("unknown paths return a styled 404, not a framework default", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");

    expect(response?.status(), "must be a real 404, not a 200 soft-404").toBe(404);
    await expect(page.getByText("no such file or directory")).toBeVisible();

    // Offers a way back rather than stranding the visitor.
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
  });

  test("404 is excluded from indexing", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    const robots = await page.locator('meta[name="robots"]').first().getAttribute("content");
    expect(robots).toContain("noindex");
  });

  test("every escape route offered by the 404 actually resolves", async ({ page, request }) => {
    // The 404 builds its links from the ROUTES table. If that table ever lists
    // a route that has not been built, the error page sends people from one
    // dead end to another — which is worse than offering nothing.
    await page.goto("/this-route-does-not-exist");
    const hrefs = await page.$$eval("main a[href^='/']", (as) =>
      as.map((a) => a.getAttribute("href")!)
    );

    expect(hrefs.length, "the 404 should offer at least one way out").toBeGreaterThan(0);
    for (const href of new Set(hrefs)) {
      const res = await request.get(href);
      expect(res.status(), `404 links to ${href}, which is itself a ${res.status()}`).toBe(200);
    }
  });
});

test.describe("SEO essentials", () => {
  test("serves a title, description, canonical and OG image", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Yusuf Naeem/);

    const meta = async (sel: string) => page.locator(sel).first().getAttribute("content");
    expect(await meta('meta[name="description"]')).toBeTruthy();
    expect(await meta('meta[property="og:image"]')).toBeTruthy();
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
  });

  test("exposes valid Person structured data", async ({ page }) => {
    await page.goto("/");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    expect(raw).toBeTruthy();

    const parsed = JSON.parse(raw!);
    const types = (parsed["@graph"] ?? [parsed]).map((n: { "@type": string }) => n["@type"]);
    expect(types).toContain("Person");
  });

  test("serves robots.txt and sitemap.xml", async ({ request }) => {
    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap:");

    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    expect(await sitemap.text()).toContain("<urlset");
  });

  test("the linked resume PDF actually exists", async ({ page, request }) => {
    await page.goto("/");
    const href = await page.locator('a[href$=".pdf"]').first().getAttribute("href");
    expect(href).toBeTruthy();
    const res = await request.get(href!);
    expect(res.status(), `${href} should be reachable`).toBe(200);
  });
});
