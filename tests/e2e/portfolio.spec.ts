import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = ["/", "/work/commit", "/work/videx", "/work/orbit", "/work/nexflow"];

for (const route of routes) {
  test(`${route} has no horizontal overflow`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator(".brand")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
    }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.viewportWidth);
  });

  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(blocking, blocking.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  });
}

test("homepage keeps the agreed project order, accents, portrait, and interactive details", async ({ page }) => {
  await page.goto("/#work");
  await expect(page.locator(".hero-portrait img")).toBeVisible();
  await expect(page.locator(".project-story h3")).toHaveText(["commit_", "Videx", "Orbit", "NexFlow"]);
  await expect(page.locator(".project-story")).toHaveClass([/accent-green/, /accent-amber/, /accent-violet/, /accent-cyan/]);

  const firstTabs = page.locator(".project-story").first().getByRole("tab");
  await firstTabs.first().focus();
  await firstTabs.first().press("ArrowRight");
  await expect(firstTabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(page.locator(".project-story").first().getByRole("tabpanel", { name: "Evidence" })).toBeVisible();
});

test("case studies keep shared navigation and do not link to themselves", async ({ page }) => {
  await page.goto("/work/commit");
  await expect(page.locator(".site-nav")).toBeVisible();
  await expect(page.getByRole("link", { name: "Read case study" })).toHaveCount(0);
  await expect(page.getByRole("link", { name: "Visit product" })).toBeVisible();
});

test("compact navigation remains usable", async ({ page, viewport }) => {
  test.skip(!viewport || viewport.width > 900, "Compact menu applies at tablet and mobile widths");
  await page.goto("/work/videx");
  const toggle = page.getByRole("button", { name: "Open menu" });
  await expect(toggle).toBeVisible();
  await toggle.click();
  await expect(page.locator("#mobile-navigation").getByRole("link", { name: "Work" })).toBeVisible();
});
