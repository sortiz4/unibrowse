import nextJest from 'next/jest.js';
import { dirname } from 'node:path';
import { fileURLToPath as fileUrlToPath } from 'node:url';

export default nextJest({ dir: dirname(fileUrlToPath(import.meta.url)) })(
  {
    preset: '../../jest.preset.mjs',
    displayName: '@unibrowse/client',
    testEnvironment: 'jsdom',
    coverageDirectory: '../../coverage/apps/client',
    transform: {
      '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    },
    moduleFileExtensions: [
      'js',
      'jsx',
      'cjs',
      'mjs',
      'ts',
      'tsx',
      'cts',
      'mts',
    ],
  },
);
