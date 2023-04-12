const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/**
 * @type {import("webpack/types").Configuration} 
 */

module.exports = merge(common,{
    module: {
        rules: [
            {
                test: /\.(s[ca]|c)ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ],
    },

    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist')
        },
        open: true
    },
    mode: 'development',
})