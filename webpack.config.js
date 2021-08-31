let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let path = require('path');

module.exports = {
    entry: {
        main: ['./src/index.js', './src/cookie.js'],
    },
    output: {
        filename: 'main.js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    devServer: {
        port: 4200,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg|)$/i,
                loader: 'file-loader?name=images/[hash].[ext]'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=fonts/[hash].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Main Homework',
            template: 'cookie.hbs',
            chunks: ['main']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
