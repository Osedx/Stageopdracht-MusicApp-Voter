"use strict";

require("rootpath")();
var _ = require("lodash");
var glob = require("glob");

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
    app.route(["/", "/*"]).all(function(req, res, next) {
        res.status(404).send("Route does not exist!");
    });
};
