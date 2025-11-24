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

// import { test, expect } from "@playwright/test";
// import { injectAxe, getViolations } from "axe-playwright";
// import fs from "fs";

// test("E2E Accessibility Scan", async ({ page }) => {
//   // Start the app
//   await page.goto("http://localhost:5173");

//   // Inject axe into the running page
//   await injectAxe(page);

//   // Get violation list as structured JSON instead of console table
//   const violations = await getViolations(page);

//   // Write JSON report so CI can parse it
//   fs.writeFileSync(
//     "playwright-violations.json",
//     JSON.stringify(violations, null, 2)
//   );

//   // Log readable output (optional)
//   console.log(`♿ Accessibility issues found: ${violations.length}`);
//   violations.forEach(v => console.log(` - ${v.id}: ${v.description}`));

//   // Make the test fail if violations exist
//   expect(
//     violations.length,
//     `${violations.length} WCAG violations detected`
//   ).toBe(0);
// });

// import { test } from "@playwright/test";
// import * as fs from "fs";
// import { injectAxe, checkA11y } from "axe-playwright";

// test("E2E Accessibility Scan", async ({ page }) => {
//   await page.goto("http://localhost:5173");
//   await injectAxe(page);

//   const results = await checkA11y(page, null, {
//     detailedReport: true,
//     detailedReportOptions: { html: true }
//   });

//   // Save JSON
//   fs.writeFileSync(
//     "playwright-accessibility-report.json",
//     JSON.stringify(results, null, 2)
//   );

//   // Create custom HTML
//   fs.writeFileSync(
//     "reports/playwright-accessibility-report.html",
//     `
//       <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 20px; }
//           .critical { color: red; font-weight: bold; }
//           .serious { color: #c43b2c; }
//           .moderate { color: orange; }
//           .minor { color: green; }
//           pre { background: #f4f4f4; padding: 10px; border-radius: 6px; }
//         </style>
//       </head>
//       <body>
//         <h1>Playwright WCAG Report</h1>
//         <h3>Violations Found: ${results.violations.length}</h3>
//         ${results.violations
//           .map(
//             v => `
//           <div class="${v.impact}">
//             <h2>${v.id} — <span>${v.impact.toUpperCase()}</span></h2>
//             <p>${v.description}</p>
//             <a href="${v.helpUrl}" target="_blank">Learn More</a>
//             <pre>${v.nodes.map(n => n.html).join("\n")}</pre>
//           </div>
//         `
//           )
//           .join("<hr>")}
//       </body>
//       </html>
//     `
//   );

//   fs.writeFileSync(
//   "playwright-accessibility-report.json",
//   JSON.stringify({ violations: violations.violations }, null, 2)
//   );

// });

import { test } from "@playwright/test";
import { injectAxe } from "axe-playwright";
import * as fs from "fs";

test("Accessibility Scan", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await injectAxe(page);

  // Run scan
  const results = await page.evaluate(async () => await window.axe.run());

  // Extract only violations
  const filtered = {
    violations: results.violations.map(v => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      helpUrl: v.helpUrl,
      nodes: v.nodes.map(n => n.html)
    }))
  };

  fs.writeFileSync(
    "playwright-accessibility-report.json",
    JSON.stringify(filtered, null, 2)
  );

  console.log(`🔍 Accessibility issues found: ${filtered.violations.length}`);
});
