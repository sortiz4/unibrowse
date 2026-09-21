import nx from '@nx/eslint-plugin';
import coreWebVitals from 'eslint-config-next/core-web-vitals';
import workspaceConfig from '../../eslint.config.mjs';

export default [
  ...nx.configs['flat/react-typescript'],
  ...coreWebVitals,
  ...workspaceConfig,
  {
    rules: {
      '@next/next/no-img-element': 'off',
      'jsx-a11y/anchor-is-valid': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/refs': 'off',
    },
  },
];
