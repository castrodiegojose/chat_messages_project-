module.exports = {
    roots: ['<rootDir>/src'],
    coverageReporters: ['html', 'text', 'text-summary', 'cobertura'],
    testMatch: [
      '**/__tests__/**/*.+(ts|tsx|js)',
      '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
  };