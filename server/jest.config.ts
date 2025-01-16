import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest", // Use ts-jest preset
  testEnvironment: "node", // Specify the test environment
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignore test files in these directories
  moduleFileExtensions: ["ts", "js", "json", "node"], // Supported file extensions
  transform: {
    "^.+\\.tsx?$": "ts-jest", // Transform TypeScript files using ts-jest
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Optional: setup file for global configurations
};

export default config;
