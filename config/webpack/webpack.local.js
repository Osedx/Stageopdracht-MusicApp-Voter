"use strict";

var webpackMerge = require("webpack-merge");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var commonConfig = require("./webpack.common.js");
var helpers = require("./helpers");

module.exports = webpackMerge(commonConfig, {
    devtool: "#source-map",

    output: {
        path: helpers.root("public", "app"),
        publicPath: "/app/",
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },

    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "tslint-loader"
            }
        ]
    },

    tslint: {
        fix: true,
        failOnHint : true,
        emitErrors: true,
        formatter : "grouped",
        formattersDirectory: "node_modules/custom-tslint-formatters/formatters"
    },

    plugins: [
        new CleanWebpackPlugin(["public/app"], {
            root: helpers.root(""),
            verbose: true,
            dry: false,
            exclude: ["shared.js"]
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: "minimal"
    }
});
