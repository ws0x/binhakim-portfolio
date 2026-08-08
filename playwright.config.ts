import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.PORT ?? 3210);
const BASE_URL = `http://localhost:${PORT}`;

/**
 * Escape hatch for sandboxes that ship a preinstalled Chromium whose build
 * number does not match the pinned @playwright/test version. Unset everywhere
 * else (CI, local dev), so Playwright resolves its own managed browser.
 */
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_PATH || undefined;
const launchOptions = executablePath ? { executablePath } : undefined;

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [["github"], ["list"]] : "list",

  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    launchOptions,
  },

  // The smoke suite runs against a production build, not `next dev` — dev-mode
  // rendering differs enough (no static optimisation, different hydration
  // timing) that passing there would not tell us the deployed site is sound.
  webServer: {
    command: `npx next build && npx next start -p ${PORT}`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },

  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 }, launchOptions } },
    { name: "tablet", use: { ...devices["Desktop Chrome"], viewport: { width: 900, height: 900 }, launchOptions } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions } },
  ],
});
