import nx from '@nx/eslint-plugin';

const options = {
  noUnusedVars: [
    'warn',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_',
    },
  ],
};

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/dist',
      '**/out-tsc',
    ],
  },
  {
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: [
                '*',
              ],
            },
          ],
          allow: [
            '^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$',
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.cjs',
      '**/*.cts',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
      '**/*.mts',
      '**/*.ts',
      '**/*.tsx',
    ],
    rules: {
      '@next/next/no-img-element': 'off',
      '@typescript-eslint/consistent-indexed-object-style': [
        'error',
        'index-signature',
      ],
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: false,
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'static-field',
              'static-method',
              'instance-field',
              'abstract-field',
              'constructor',
              'instance-method',
              'abstract-method',
            ],
          },
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: [
            'PascalCase',
          ],
        },
      ],
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-unused-vars': options.noUnusedVars,
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'import/no-anonymous-default-export': 'off',
      'no-case-declarations': 'off',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
      'no-unused-vars': options.noUnusedVars,
      'object-curly-spacing': [
        'error',
        'always',
      ],
      'semi': [
        'error',
        'always',
      ],
    },
  },
];
