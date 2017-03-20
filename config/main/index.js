"use strict";

var _ = require("lodash");
var envConfig = require("./config." + (process.env.NODE_ENV || "local"));
var commonConfig = require("./config.common.js");


module.exports = _.merge(commonConfig, envConfig);
