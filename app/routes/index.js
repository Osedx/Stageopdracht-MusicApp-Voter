"use strict";

require("rootpath")();
var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var config = require("config/main");

module.exports = function(app) {
    // Load all routes
    var routes = glob("./app/routes/**/*.js", {
        sync: true
    });

    // Require each route
    _.forEach(routes, function(route) {
        // Exclude current file
        if (route !== "./app/routes/index.js") {
            // Remove `./` from route before requiring it
            require(route.substring(2))(app);
        }
    });
    // Fallback route
    app.route("/app/assets/favicon.ico").all(function(req, res, next) {
        var img = fs.readFileSync(path.join(__dirname, "../../src/app/assets/favicon.ico"));
             res.writeHead(200, {"Content-Type": "image/vnd.microsoft.icon"});
             res.end(img, "binary");
    });
    // Fallback route
    app.route("/app/assets/*").all(function(req, res, next) {
        res.set("Content-Type", "image/png");
        var action = req.originalUrl;
        var img = fs.readFileSync(path.join(__dirname, "../../src/app/assets/",req.params[0]));
             res.writeHead(200, {"Content-Type": "image/png"});
             res.end(img, "binary");
    });
    // Fallback route
    app.route(["/", "/*"]).all(function(req, res, next) {
        res.set("Content-Type", "text/html");
        var indexStream = fs.createReadStream(path.join(config.server.indexLocation, "index.html"));

        indexStream.on("error", function(err) {
                res.status(500).json(err);
            });

        indexStream.pipe(res);
    });
    
//    // Fallback route
//    app.use("app/assets", function(req, res, next) {
//        res.set("Content-Type", "image/png");
//    });
//    
//    // Fallback route
//    app.all(["/", "/*"], function(req, res, next) {
//        res.set("Content-Type", "text/html");
//        var indexStream = fs.createReadStream(path.join(config.server.indexLocation, "index.html"));
//
//        indexStream.on("error", function(err) {
//                res.status(500).json(err);
//            });
//
//        indexStream.pipe(res);
//    });
};
