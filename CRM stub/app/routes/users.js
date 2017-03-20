"use strict";

require("rootpath")();
var UsersController = require("app/controllers/users");

var basePath = "/api/productTenders";

module.exports = function app(app) {

    app.route(basePath).get(UsersController.read);
    app.route(basePath + "/:id").get(UsersController.readOne);

    app.route(basePath).post(UsersController.create);
    app.route(basePath).put(UsersController.update);

};
