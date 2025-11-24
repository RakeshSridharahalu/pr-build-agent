// import { test } from "@playwright/test";
// import { injectAxe, checkA11y } from "axe-playwright";

// test("E2E Accessibility Scan", async ({ page }) => {
//   await page.goto("/");
//   await injectAxe(page);
//   await checkA11y(page);
// });

// import { test, expect } from "@playwright/test";
// import { injectAxe, checkA11y } from "axe-playwright";

// test("E2E Accessibility Scan", async ({ page }) => {
//   await page.goto("http://localhost:5173");

//   await injectAxe(page);

//   // Run axe checks
//   await checkA11y(page, null, {
//     detailedReport: true,
//     detailedReportOptions: { html: true },
//   });
// });

import { test, expect } from "@playwright/test";
import { injectAxe, getViolations } from "axe-playwright";
import fs from "fs";

test("E2E Accessibility Scan", async ({ page }) => {
  // Start the app
  await page.goto("http://localhost:5173");

  // Inject axe into the running page
  await injectAxe(page);

  // Get violation list as structured JSON instead of console table
  const violations = await getViolations(page);

  // Write JSON report so CI can parse it
  fs.writeFileSync(
    "playwright-violations.json",
    JSON.stringify(violations, null, 2)
  );

  // Log readable output (optional)
  console.log(`♿ Accessibility issues found: ${violations.length}`);
  violations.forEach(v => console.log(` - ${v.id}: ${v.description}`));

  // Make the test fail if violations exist
  expect(
    violations.length,
    `${violations.length} WCAG violations detected`
  ).toBe(0);
});

