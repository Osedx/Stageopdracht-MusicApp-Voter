"use strict";

var webpack = require("webpack");
var webpackMerge = require("webpack-merge");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

module.exports = webpackMerge(commonConfig, {
    output: {
        path: helpers.root("public", "app"),
        publicPath: "/app/",
        filename: "[name].min.js",
        chunkFilename: "[id].chunk.min.js"
    },

    plugins: [
        new CleanWebpackPlugin(["public/app"], {
            root: helpers.root(""),
            verbose: true,
            dry: false,
            exclude: ["shared.js"]
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            compress: true
        })
    ]
});
