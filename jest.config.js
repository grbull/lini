module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test|e2e-spec|e2e-test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageDirectory: './.coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/server/**/*.module.ts',
    '!src/server/main.ts',
    '!src/server/scripts/**',
    '!src/server/**/*.api.ts',
    '!**/node_modules/**',
    '!**/migrations/**',
  ],
  maxConcurrency: 1,
  maxWorkers: 1,
};
