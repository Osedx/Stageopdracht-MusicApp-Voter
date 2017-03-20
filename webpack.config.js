"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "local";

console.log("building " + process.env.NODE_ENV + " environment ...");

require("rootpath")();
module.exports = require("config/webpack/webpack." + process.env.NODE_ENV + ".js");
