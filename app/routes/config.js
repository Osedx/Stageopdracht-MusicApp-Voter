"use strict";

var ConfigController = require("app/controllers/config");
var baseUrl = "/api/config";

module.exports = function(app) {
    app.route(baseUrl).get(ConfigController.read);
};
