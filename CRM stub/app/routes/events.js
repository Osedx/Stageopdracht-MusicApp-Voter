"use strict";

require("rootpath")();
var EventsController = require("app/controllers/events");

var basePath = "/api/events";

module.exports = function app(app) {

    app.route(basePath + "/:id").get(EventsController.readOne);
    app.route(basePath + "/:id/apply").post(EventsController.apply);

};
