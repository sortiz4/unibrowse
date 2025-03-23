export default {
  preset: '../../jest.preset.js',
  displayName: 'client',
  coverageDirectory: '../../coverage/apps/client',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: [
          '@nx/next/babel',
        ],
      },
    ],
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
};
