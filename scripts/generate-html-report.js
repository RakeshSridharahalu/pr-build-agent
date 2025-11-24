import { createHtmlReport } from "axe-html-reporter";
import fs from "fs";

function generateReport(jsonFile, htmlFile) {
  if (!fs.existsSync(jsonFile)) {
    console.log(`⚠ Skipped: ${jsonFile} not found.`);
    return;
  }

  const rawData = fs.readFileSync(jsonFile, "utf-8");
  const results = JSON.parse(rawData);

  createHtmlReport({
    results,
    options: {
      outputDir: "reports",
      reportFileName: htmlFile
    }
  });

  console.log(`📄 Generated: reports/${htmlFile}`);
}

// Generate reports for Jest and Playwright
generateReport("jest-a11y-report.json", "jest-accessibility-report.html");
generateReport("playwright-accessibility-report.json", "playwright-accessibility-report.html");
