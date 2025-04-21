const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  // Test environment
  testEnvironment: 'jsdom',

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Module name mapping
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@components/(.*)$': '<rootDir>/components/$1',
    '^@lib/(.*)$': '<rootDir>/lib/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
    '^@types/(.*)$': '<rootDir>/types/$1',
  },

  // Coverage configuration
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.js',
  ],

  // Files to ignore
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '<rootDir>/coverage/',
  ],

  // Transform configuration
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          [
            'next/babel',
            {
              'preset-env': {
                modules: 'commonjs',
                targets: {
                  node: 'current',
                },
              },
            },
          ],
        ],
      },
    ],
  },

  // Important: Updated transformIgnorePatterns to handle ESM modules
  transformIgnorePatterns: [
    '/node_modules/(?!(' +
      [
        'query-string',
        'decode-uri-component',
        'split-on-first',
        'filter-obj',
        'next-auth',
        '@babel/runtime',
        // Add other ESM-only modules here
      ].join('|') +
      '))',
  ],

  // Module directories
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Test patterns
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // File extensions
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },

  // Global test timeout
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Clear mocks
  clearMocks: true,

  // Restore mocks
  restoreMocks: true,

  // Show native errors
  errorOnDeprecated: true,

  // Cache directory
  cacheDirectory: '.jest/cache',
}

module.exports = createJestConfig(customJestConfig)

// Current Date and Time (UTC): 2025-04-20 22:15:14
// Current User's Login: ibrahim-lasfar
