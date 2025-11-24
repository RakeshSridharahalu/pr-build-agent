// import { test } from "@playwright/test";
// import { injectAxe, checkA11y } from "axe-playwright";

// test("E2E Accessibility Scan", async ({ page }) => {
//   await page.goto("/");
//   await injectAxe(page);
//   await checkA11y(page);
// });

import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test("E2E Accessibility Scan", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await injectAxe(page);

  // Run axe checks
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
