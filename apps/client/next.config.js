const { composePlugins, withNx } = require('@nx/next');

module.exports = composePlugins(withNx)(
  {
    reactStrictMode: true,
    output: 'export',
    nx: {
      svgr: false,
    },
  },
);
