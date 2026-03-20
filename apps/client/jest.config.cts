const nextJest = require('next/jest.js');

const createJestConfig = nextJest(
  {
    dir: './',
  },
);

module.exports = createJestConfig(
  {
    preset: '../../jest.preset.js',
    displayName: '@unibrowse/client',
    testEnvironment: 'jsdom',
    coverageDirectory: '../../coverage/apps/client',
    transform: {
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    },
    moduleFileExtensions: [
      'js',
      'jsx',
      'ts',
      'tsx',
    ],
  },
);
