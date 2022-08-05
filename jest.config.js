module.exports = {
  preset: "ts-jest",
  setupFilesAfterEnv: ["./config/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(s?css)$": "<rootDir>/config/styleStub.js",
  },
  transform: {
    ".(js|ts|tsx)": "ts-jest",
  },
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
  collectCoverageFrom: ["**/*.{ts,tsx}", "!**/node_modules/**", "!src/**/index.ts"],
  reporters: ["default"],
};
