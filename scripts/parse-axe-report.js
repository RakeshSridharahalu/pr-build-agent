import fs from "fs";

const file = "jest-a11y-report.json";

if (!fs.existsSync(file)) {
  console.log("No Jest accessibility report found.");
  process.exit(0);
}

const report = JSON.parse(fs.readFileSync(file, "utf8"));
let failures = [];

report.testResults.forEach(test => {
  test.assertionResults.forEach(assertion => {
    if (assertion.status === "failed") {
      failures.push({
        testName: assertion.title,
        message: assertion.failureMessages.join("\n")
      });
    }
  });
});

if (failures.length === 0) {
  console.log("✅ No WCAG violations found in Jest Axe scan.");
  process.exit(0);
}

let markdown = `
### 🚨 Accessibility Violations (Jest + Axe)
The test suite detected WCAG accessibility failures.

---

`;

failures.forEach((f, i) => {
  markdown += `**${i + 1}. ${f.testName}**\n`;
  markdown += "```\n" + f.message + "\n```\n\n";
});

console.log(markdown);
