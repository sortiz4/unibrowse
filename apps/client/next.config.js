const { withNx } = require('@nrwl/next/plugins/with-nx');

module.exports = withNx({
  output: 'export',
  reactStrictMode: true,
  nx: {
    svgr: false,
  },
});
