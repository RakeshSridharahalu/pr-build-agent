import { defineConfig } from '@playwright/test';

export default defineConfig({
  reporter: [
    ['json', { outputFile: 'playwright-accessibility-report.json' }],
    ['list'], // optional: keeps console logs
  ],
});