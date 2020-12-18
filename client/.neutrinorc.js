module.exports = {
  use: [
    require('@neutrinojs/eslint')(),
    require('@neutrinojs/react')({
      // Server proxies
      devServer: {
        proxy: [
          {
            context: ['/api'],
            target: 'http://localhost:8000',
          },
        ],
      },

      // Document properties
      html: {
        title: 'Unibrowse',
      },

      // Stylesheet processing
      style: {
        extract: false,
        loaders: [
          {
            loader: 'clean-css-loader',
            options: {
              level: {
                1: {
                  specialComments: 0,
                },
              },
            },
          },
          'sass-loader',
        ],
        test: /\.(css|sass|scss)$/,
      },

      // Compilation targets
      targets: {
        browsers: [
          'Firefox >= 40',
        ],
      },
    }),
    neutrino => {
      // Add `node_modules` and `src` to the module resolver
      neutrino.config
        .resolve
        .modules
        .add('node_modules')
        .add('src');

      // Prepend styles and polyfills to the entry point
      neutrino.config
        .entry('index')
        .prepend('theme/index.scss')
        .prepend('regenerator-runtime')
        .prepend('core-js');

      if (process.env.NODE_ENV === 'production') {
        // Configure the optimizer
        neutrino.config
          .optimization
          .minimizer('terser')
          .use(
            require('terser-webpack-plugin'),
            [
              {
                cache: true,
                parallel: true,
                terserOptions: {
                  output: {
                    comments: false,
                  },
                },
              },
            ],
          );

        // Disable application splitting
        neutrino.config
          .optimization
          .delete('runtimeChunk')
          .delete('splitChunks');
      }
    },
  ],
};
