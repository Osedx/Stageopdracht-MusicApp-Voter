"use strict";

require("rootpath")();
var proxy = require("http-proxy").createProxyServer({});
var config = require("config/main");

module.exports = function(req, res, options) {
    proxy.web(req, res, options, function(error) {
        console.log(error);
        return res.status(500).json({
            err: "Error while proxing to " + config.server.proxyBaseUrl
        });
    });
};
