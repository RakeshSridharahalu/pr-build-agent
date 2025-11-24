/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testMatch: ["**/*.spec.js"], // Only run Playwright spec tests
  reporter: [
    ['json', { outputFile: 'playwright-accessibility-report.json' }]
  ],
  use: {
    headless: true,
  },
};

export default config;
