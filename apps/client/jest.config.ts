export default {
  preset: '../../jest.preset.js',
  displayName: 'client',
  coverageDirectory: '../../coverage/apps/client',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: [
          '@nrwl/next/babel',
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
