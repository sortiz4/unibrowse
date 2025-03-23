const { fixupConfigRules } = require('@eslint/compat');
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const nx = require('@nx/eslint-plugin');
const base = require('../../eslint.config.js');

const old = new FlatCompat(
  {
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
  },
);

module.exports = [
  ...fixupConfigRules(old.extends('next')),
  ...fixupConfigRules(old.extends('next/core-web-vitals')),
  ...nx.configs['flat/react-typescript'],
  ...base,
  {
    ignores: [
      '.next/**/*',
    ],
  },
];
