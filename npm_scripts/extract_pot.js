"use strict";

var path = require("path");
var Utils = require("./utils");

var baseUrl = path.resolve(__dirname, "../");

Utils.log.lined("EXRACTING TRANSLATIONS ...");

Utils.npmExec.spawnOut(
    "ng2-translate-extract",
    "--dir ./src --output ./public/assets/locale/pot/main.pot --format pot --clean true".split(" "),
    { cwd: baseUrl }
);

Utils.log.lined("TRANSLATIONS EXTRACTED!");
