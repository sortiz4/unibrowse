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
                    'clean-css-loader',
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
        }],
        (neutrino) => {
            // Add `node_modules` and `src` to the module resolver
            neutrino.config.resolve.modules
                .add('node_modules')
                .add('src');

            // Prepend styles, extensions, and polyfills to the index
            neutrino.config.entry('index')
                .prepend('@babel/polyfill')
                .prepend('theme/index.scss');

            // Configure the JavaScript optimizer (keep names)
            if(process.env.NODE_ENV === 'production') {
                neutrino.config.optimization.minimizer('terser')
                    .tap(([defaultOptions]) => [{
                        ...defaultOptions,
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
