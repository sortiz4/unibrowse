import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: [
      '**/.next',
      '**/coverage',
      '**/dist',
      '**/out',
      '**/out-tsc',
      '**/next-env.d.ts',
    ],
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
    ],
    rules: {
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: false,
          allowDirectConstAssertionInArrowFunctions: false,
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
    },
  },
  {
    files: [
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
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
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: {
            memberTypes: [
              'static-field',
              'abstract-field',
              'instance-field',
              'static-method',
              'constructor',
              'abstract-method',
              'instance-method',
            ],
          },
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'comma-dangle': [
        'error',
        'always-multiline',
      ],
      'import/no-anonymous-default-export': 'off',
      'no-case-declarations': 'off',
      'no-restricted-globals': 'off',
      'no-empty': [
        'error',
        {
          allowEmptyCatch: true,
        },
      ],
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
