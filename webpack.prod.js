const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');


/**
 * @type {import("webpack/types").Configuration} 
 */

module.exports = merge(common,{
    module: {
        rules: [
            {
                test: /\.(s[ca]|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[contenthash].css'
        }),
    ],
    mode: 'production',
    optimization: {
        runtimeChunk: 'single',
        chunkIds: 'deterministic',
        usedExports: true,
        splitChunks: {
            chunks: 'initial',
            minSize: 10000,
            maxSize: 200000,
            cacheGroups: {
                default: false,
                vendorSplit: { 
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                    // Extract the name of the package from the path segment after node_modules
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `vendor.${packageName.replace('@', '')}`;
                    },
                    priority: 20
                },

                defaultVendors: { // picks up everything else being used from node_modules that is less than minSize
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 19,
                    enforce: true
                },
        
                // generic 'async' vendor node module splits: separates out larger modules
                vendorAsyncSplit: { // vendor async chunks, create each asynchronously used node module as separate chunk file if module is bigger than minSize
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                    const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                    return `vendor.async.${packageName.replace('@', '')}`;
                    },
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    minSize: 5000
                },

                vendorsAsync: { // vendors async chunk, remaining asynchronously used node modules as single chunk file
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors.async',
                    chunks: 'async',
                    priority: 9,
                    reuseExistingChunk: true,
                    enforce: true
                },
        
                // generic 'async' common module splits: separates out larger modules
                commonAsync: { // common async chunks, each asynchronously used module as a separate chunk files
                    name(module) {
                    // Extract the name of the module from last path component. 'src/modulename/' results in 'modulename'
                    const moduleName = module.context.match(/[^\\/]+(?=\/$|$)/)[0];
                    return `common.async.${moduleName.replace('@', '')}`;
                    },
                    minChunks: 2, 
                    chunks: 'async',
                    priority: 1,
                    reuseExistingChunk: true,
                    minSize: 5000 
                },

                commonsAsync: { // commons async chunk, remaining asynchronously used modules as single chunk file
                    name: 'commons.async',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 0,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
})