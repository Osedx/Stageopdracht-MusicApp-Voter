"use strict";

require("rootpath")();
var express = require("express");
var app = express();
var helmet = require("helmet");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var config = require("./config");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb", keepExtensions: true }));

// Log each request for development purposes
app.use(function(req, res, next) {
    console.log("[" + req.method + "] " + req.url); // eslint-disable-line no-console
    next();
});

// Using helmet to make app more secure
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.disable("x-powered-by");

// Load all custom routes
require("app/routes")(app);

// Start the server
app.listen(config.server.port, function() {
    console.log("app listening at http://localhost:%s running in %s mode.", config.server.port, process.env.NODE_ENV); // eslint-disable-line no-console
});

exports = module.exports = app;
