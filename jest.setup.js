// import "@testing-library/jest-dom";

import { axe, toHaveNoViolations } from "jest-axe";
import fs from "fs";
import { createHtmlReport } from "axe-html-reporter";

expect.extend(toHaveNoViolations);

afterAll(() => {
  const reportPath = "reports/jest-accessibility-report.html";

  if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
  }

  const data = JSON.parse(fs.readFileSync("jest-a11y-report.json", "utf8"));
  createHtmlReport({
    results: data,
    options: {
      outputDir: "reports",
      reportFileName: "jest-accessibility-report",
      doNotCreateReportFile: false,
    },
  });

  console.log(`📄 Accessibility report generated: ${reportPath}`);
});
