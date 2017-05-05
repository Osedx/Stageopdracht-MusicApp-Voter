"use strict";

var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        "polyfills": "./src/polyfills.ts",
        "vendor": "./src/vendor.ts",
        "styles": "./src/styles.ts",
        "app": "./src/main.ts"
    },

    resolve: {
        extensions: ["", ".ts", ".js"]
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader", "angular2-template-loader"]
            },
            {
                test: /\.html$/,
                loader: "html?-minimize",
                query: {
                interpolate: 'require'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: "file?name=assets/[name].[hash].[ext]"
            },
            {
                test: /\.scss$/,
                loaders: ["raw-loader", ExtractTextPlugin.extract("style", "css?sourceMap"), "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loaders: ["raw-loader", ExtractTextPlugin.extract("style", "css?sourceMap"), "css-loader"]
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),

        new webpack.optimize.CommonsChunkPlugin({
            name: ["app", "vendor",  "styles", "polyfills"]
        }),

        new HtmlWebpackPlugin({
            template: "src/index.html"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};
