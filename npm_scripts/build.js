"use strict";

var path = require("path");
var Utils = require("./utils");

var baseUrl = path.resolve(__dirname, "../");

Utils.log.lined("STARTING WEBPACK BUILD...");

process.env.NODE_ENV = process.env.NODE_ENV || "server";

Utils.npmExec.spawnSyncOut("webpack", "--progress".split(" "), { cwd: baseUrl, stdio: [0, 1, 2] });

Utils.log.lined("WEBPACK BUILD COMPLETED!");
