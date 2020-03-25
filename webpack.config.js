const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    context: __dirname,
    entry: './static/assets/js/index',
    output: {
        path: path.resolve('./static/assets/js/bundles/'),
        filename: 'app.js'
    },

    plugins: [
        new VueLoaderPlugin(),
        new BundleTracker({filename: './webpack-stats.json'}),
    ],

    module: {
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
              }
        ],
    },
    resolve: {
        alias: {vue: 'vue/dist/vue.js'}
    },

};
