export const testEnvironment = 'node';
export const testMatch = ['**/*.test.jsx'];
export const moduleFileExtensions = ['jsx'];
export const coverageReporters = ['text-summary', 'html'];
export const collectCoverageFrom = ['**/*.jsx'];
export const coverageThreshold = {
  global: {
    statements: 80,
    branches: 80,
    functions: 80,
    lines: 80,
  },
};
