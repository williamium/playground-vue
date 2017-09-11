var path              = require('path');
var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist',
        filename: 'app.min.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPlugin.extract({
                            use: [
                                'css-loader',
                                'sass-loader'
                            ]
                        }),
                        js: [
                            {
                                loader: 'babel-loader',
                                options: {
                                    presets: [
                                        [
                                            'env',
                                            {
                                                targets: {
                                                    browsers: [
                                                        'last 2 versions',
                                                        '>2%'
                                                    ]
                                                }
                                            }
                                        ]
                                    ]
                                }
                            }
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'env',
                                    {
                                        targets: {
                                            browsers: [
                                                'last 2 versions',
                                                '>2%'
                                            ]
                                        }
                                    }
                                ]
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('app.min.css')
    ]
}
