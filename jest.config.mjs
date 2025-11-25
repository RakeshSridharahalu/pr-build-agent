export default {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: { "^.+\\.(js|jsx)$": "babel-jest" },
  testMatch: ["**/__tests__/**/*.test.jsx"]
};