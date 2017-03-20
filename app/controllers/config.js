"use strict";

require("rootpath")();
var config = require("config/main");

module.exports.read = function read(req, res, next) {
    res.status(200).json(config.front);
};
