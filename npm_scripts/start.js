"use strict";

var path = require("path");
var Utils = require("./utils");

var baseUrl = path.resolve(__dirname, "../");

Utils.log.lined("NPM START ...");

console.log("STARTING SERVER...");
Utils.npmExec.spawnOut("nodemon", [], { cwd: baseUrl, stdio: [0,1,2] });

console.log("STARTING WEBPACK WATCH...");
Utils.npmExec.spawnOut("webpack", "--watch --progress".split(" "), { cwd: baseUrl, stdio: [0,1,2] });

// Utils.npmExec.spawnOut(
//     'node_modules/tslint/bin/tslint', '-s ./node_modules/custom-tslint-formatters/formatters -t grouped ./src/**/*.ts'.split(' '),
//     { cwd: baseUrl, stdio: [0,1,2] }
// );
