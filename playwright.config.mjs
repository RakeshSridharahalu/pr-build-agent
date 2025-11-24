// import { defineConfig } from '@playwright/test';

// export default defineConfig({
//   reporter: [
//     ['json', { outputFile: 'playwright-accessibility-report.json' }],
//     ['list'], // optional: keeps console logs
//   ],
// });

// playwright.config.mjs
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testMatch: ["**/*.e2e.spec.js","**/*.pw.spec.js"],   // prevent jest conflict
  reporter: [
    ['json', { outputFile: 'playwright-accessibility-report.json' }],
    ['list']
  ],
  use: {
    headless: true,
    baseURL: "http://localhost:5173"
  }
});
