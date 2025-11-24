import { test } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

test("E2E Accessibility Scan", async ({ page }) => {
  await page.goto("/");
  await injectAxe(page);
  await checkA11y(page);
});
