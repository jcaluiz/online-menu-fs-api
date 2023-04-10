module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  },
  testMatch: ["**/__tests__/**/*.test.ts"]
};
