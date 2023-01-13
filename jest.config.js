const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const jestConfig = async () => ({
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: '.',
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/lib/**/*.ts',
    '<rootDir>/examples/**/*.ts',
    '!<rootDir>/tests/**',
    '!<rootDir>/node_modules/**',
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
});

module.exports = jestConfig;
