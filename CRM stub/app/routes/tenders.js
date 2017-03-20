"use strict";

require("rootpath")();
var TenderController = require("app/controllers/tenders");

var basePath = "/api/productTenders";

module.exports = function app(app) {

    app.route(basePath).get(TenderController.read);
    app.route(basePath + "/:id").get(TenderController.readOne);

    app.route(basePath + "/:id/apply").get(TenderController.apply);

    // We need to know which tender id already applied to a specific tender, how? ...

};
