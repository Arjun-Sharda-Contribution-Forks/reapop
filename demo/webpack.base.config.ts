import path from 'path'
import {Configuration} from 'webpack'

const config: Configuration = {
    context: __dirname,
    entry: './src/app',
    output: {
        path: path.join(__dirname, 'dist/static/'),
        filename: 'demo.js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        modules: ['../node_modules', './node_modules'],
        alias: {
            src: path.resolve(__dirname, '../src'),
            demo: path.resolve(__dirname, '../demo'),
            'package.json': path.resolve(__dirname, '../package.json'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'file',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: '@teamsupercell/typings-for-css-modules-loader',
                        options: {formatter: 'prettier'},
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true,
                            modules: {
                                localIdentName: '[name]__[local]__[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                ],
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: 'application/font-woff',
                },
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader',
            },
        ],
    },
}

export default config
