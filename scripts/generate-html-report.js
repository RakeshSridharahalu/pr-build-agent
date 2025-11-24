import { createHtmlReport } from "axe-html-reporter";
import fs from "fs";

function extractViolations(data) {
  // Jest format already has violations
  if (data.violations) return data;

  // Playwright format → must extract
  if (data.suites) {
    const violations = [];

    const findViolations = (obj) => {
      if (!obj) return;
      if (obj.violations) violations.push(...obj.violations);

      Object.values(obj).forEach(value => {
        if (Array.isArray(value)) value.forEach(findViolations);
        else if (typeof value === "object") findViolations(value);
      });
    };

    findViolations(data);

    return { violations };
  }

  return { violations: [] }; // fallback
}

function generateReport(jsonFile, htmlFile) {
  if (!fs.existsSync(jsonFile)) {
    console.log(`⚠ Skipped: ${jsonFile} not found.`);
    return;
  }

  const rawData = fs.readFileSync(jsonFile, "utf-8");
  const parsed = JSON.parse(rawData);

  const extracted = extractViolations(parsed);

  createHtmlReport({
    results: extracted,
    options: {
      outputDir: "reports",
      reportFileName: htmlFile,
    },
  });

  console.log(`📄 Generated: reports/${htmlFile}`);
}

// Generate reports
generateReport("jest-a11y-report.json", "jest-accessibility-report.html");
generateReport("playwright-accessibility-report.json", "playwright-accessibility-report.html");
