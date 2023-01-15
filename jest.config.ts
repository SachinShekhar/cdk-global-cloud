import type { Config } from 'jest';

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.ts',
    '<rootDir>/examples/**/*.ts',
    '!<rootDir>/tests/**',
    '!<rootDir>/node_modules/**',
    '!<rootDir>/examples/multi-region-serverless/index.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  cacheDirectory: '<rootDir>/.cache/jest',
};

export default jestConfig;
