module.exports = {
    use: [
        '@neutrinojs/eslint',
        ['@neutrinojs/react', {
            // Browser request proxy (development)
            devServer: {
                port: 8000,
                proxy: [{
                    context: ['/api', '/static'],
                    target: 'http://localhost:5000',
                }],
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

            // Babel plugins
            babel: {
                plugins: [
                    ['@babel/plugin-proposal-decorators', {
                        decoratorsBeforeExport: true,
                    }],
                    ['@babel/plugin-proposal-class-properties', {
                        loose: true,
                    }],
                ]
            },
        }],
        (neutrino) => {
            // Add `node_modules` and `src` to the module resolver
            neutrino.config.resolve.modules
                .add('node_modules')
                .add('src');

            // Prepend styles, extensions, and polyfills to the index
            neutrino.config.entry('index')
                .prepend('theme/index.scss')
                .prepend('@babel/polyfill');

            // Configure the JavaScript optimizer
            if(process.env.NODE_ENV === 'production') {
                neutrino.config.optimization.minimizer('terser')
                    .use(require.resolve('terser-webpack-plugin'), [{
                        cache: true,
                        parallel: true,
                        sourceMap: (
                            neutrino.config.devtool &&
                            /source-?map/.test(neutrino.config.devtool)
                        ),
                        terserOptions: {
                            output: {
                                comments: false,
                            },
                        },
                    }]);
            }

            // Disable application splitting
            neutrino.config.optimization
                .delete('runtimeChunk')
                .delete('splitChunks');
        },
    ],
};
