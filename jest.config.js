module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/tests"],
  preset: "ts-jest",
  setupFilesAfterEnv: ["./config/setup-jest.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^.+\\.(s?css)$": "<rootDir>/config/styleStub.js",
    "@/tests/(.*)": "<rootDir>/tests/$1",
    "@/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    ".(js|ts|tsx)": "ts-jest",
  },
  watchPathIgnorePatterns: ["<rootDir>/node_modules"],
  collectCoverageFrom: ["<rootDir>/src/**/*.{ts,tsx}", "!**/node_modules/**", "!src/**/index.ts"],
  reporters: ["default"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "coverage",
};
