import nx from '@nx/eslint-plugin';
import nextEslintPluginNext from '@next/eslint-plugin-next';
import baseConfig from '../../eslint.config.mjs';

export default [
  {
    plugins: {
      '@next/next': nextEslintPluginNext,
    },
  },
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  {
    ignores: [
      '.next/**/*',
      '**/out-tsc',
    ],
  },
];
