import fs from "fs";

const file = "playwright-accessibility-report.json";

if (!fs.existsSync(file)) {
  console.log("No Playwright report found.");
  process.exit(0);
}

const data = JSON.parse(fs.readFileSync(file, "utf8"));

let markdown = `
### 🔍 Browser Accessibility Scan Results (Playwright + Axe)

`;

data.forEach(result => {
  markdown += `#### Page: ${result.attachments?.[0]?.name || "Unknown"}\n`;
  markdown += "```\n";
  markdown += JSON.stringify(result, null, 2);
  markdown += "\n```\n\n";
});

console.log(markdown);
