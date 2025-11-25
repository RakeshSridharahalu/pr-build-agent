import { createHtmlReport } from "axe-html-reporter";
import fs from "fs";

function generateReport(jsonFile, htmlFile) {
  if (!fs.existsSync(jsonFile)) return;

  const data = JSON.parse(fs.readFileSync(jsonFile));
  if (!data.violations) return;

  createHtmlReport({
    results: data,
    options: {
      outputDir: "reports",
      reportFileName: htmlFile,
    },
  });

  console.log(`✅ Generated HTML → reports/${htmlFile}`);
}

generateReport("jest-a11y-report.json", "jest-accessibility-report.html");
generateReport("playwright-accessibility-report.json", "playwright-accessibility-report.html");
