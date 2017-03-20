"use strict";

require("rootpath")();
var ProviderController = require("app/controllers/providers");

var basePath = "/api/providers";

module.exports = function app(app) {

    app.route(basePath).get(ProviderController.read);
    app.route(basePath + "/:id").get(ProviderController.readOne);

};
