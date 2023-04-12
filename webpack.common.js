const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * @type {import("webpack/types").Configuration} 
 */

module.exports = {
    entry: {
        bundle: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name]_[contenthash].js',
        assetModuleFilename: '[name]_[hash][ext]',
        chunkFilename: 'js/async-import_[contenthash].js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|ico|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.js$/,
                exclude: /\node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', ['@babel/preset-react', {'runtime': 'automatic'}]]
                    }
                }
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // new BundleAnalyer()
    ],
    performance: {
        hints: false
    }
}