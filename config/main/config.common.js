"use strict";

require("rootpath")();
var webpackConfig = require("webpack.config");

module.exports =  {
    server: {
        publicPath: "public",
        indexLocation: (webpackConfig.output || {}).path,
    },
    
    front: {

    }
};
