import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "react-native",
  transform: {
    "^.+\\.jsx$": "babel-jest",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: "tsconfig.spec.json"
      }
    ]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: ["src/**", "!src/**/atoms/**", "!src/testUtils/**"],
  transformIgnorePatterns: [
    "node_modules/(?!@react-native|react-native|@react-navigation|react-native-toast-message/(.*))"
  ],
  setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "./src/testUtils/setupTests.ts"
  ],
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  modulePaths: ["<rootDir>/src"]
};

export default jestConfig;
