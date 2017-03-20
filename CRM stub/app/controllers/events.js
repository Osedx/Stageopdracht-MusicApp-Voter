"use strict";
require("rootpath")();
var Q = require("q");
var _ = require("lodash");
var jsonReader = require("app/helpers/jsonReader");

module.exports.readOne = function readOne(req, res, next) {
    jsonReader("providers")
        .then(
            function onSuccess(data) {
                var result = _.find(data, { id: req.params.id });

                if (result) {
                    return Q.resolve(result);
                }

                return Q.reject("not found");

            },
            function onError(err) {
                throw err;
            }
        )
        .then(
            function onSuccess(result) {
                return res.status(200).json(result);
            },
            function onError(err) {
                res.status(400).json(err);
            }
        );
};

module.exports.apply = function apply(req, res, next) {
    if (!req.param.id) {
        return res.status(412).json({ err: "id not present" });
    }

    return res.status(204).send();
};
