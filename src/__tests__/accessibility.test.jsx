// import React from "react";
// import { render } from "@testing-library/react";
// import { axe, toHaveNoViolations } from "jest-axe";
// import App from "../App";

// expect.extend(toHaveNoViolations);

// test("App has no WCAG violations", async () => {
//   const { container } = render(<App />);
//   const results = await axe(container);
//   expect(results).toHaveNoViolations();
// });

import { render } from "@testing-library/react";
import App from "../App";
import { axe } from "jest-axe";
import fs from "fs";

test("Accessibility Scan", async () => {
  const { container } = render(<App />);
  const results = await axe(container);

  fs.writeFileSync("jest-a11y-report.json", JSON.stringify(results, null, 2));

  if (results.violations.length > 0) {
    console.log("\n❌ Accessibility Violations Found:\n");
    results.violations.forEach(v => {
      console.log(`🔍 Rule: ${v.id}`);
      console.log(`📌 Impact: ${v.impact}`);
      console.log(`💡 Help: ${v.help}`);
      console.log(`🔗 Docs: ${v.helpUrl}`);
      console.log(`HTML Nodes: ${v.nodes.map(n => n.html).join("\n")}`);
      console.log("\n---\n");
    });
  }

  expect(results.violations.length).toBe(0);
});
