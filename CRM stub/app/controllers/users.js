"use strict";

require("rootpath")();
var Q = require("q");
var _ = require("lodash");
var jsonReader = require("app/helpers/jsonReader");

module.exports.read = function read(req, res, next) {
    jsonReader("users")
        .then(
            function onSuccess(data) {
                var result = {
                    "_links": {},
                    "_page": {},
                    "_embedded": data
                };

                if (req.query.limit) {
                    var limit = parseInt(req.query.limit);

                    if (!isNaN(limit)) {
                        result._embedded = data.slice(0, limit);
                    }
                }

                res.status(200).json(result);
            },
            function onError(err) {
                res.status(400).json(err);
            }
        );
};

module.exports.readOne = function readOne(req, res, next) {
    jsonReader("users")
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

module.exports.create = function create(req, res, next) {
    if (
        !req.body ||
        !req.body.surname ||
        !req.body.name ||
        !req.body.provider ||
        !req.body.provider.companyName
    ) {
        return res.statu(412).json("Not a valid body");
    }

    jsonReader("users")
        .then(
            function onSuccess(data) {
                var createdUserMock = data[0];

                return Q.when(createdUserMock);
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

module.exports.update = function update(req, res, next) {
    if (
        !req.body ||
        !req.body.surname ||
        !req.body.name ||
        !req.body.provider ||
        !req.body.provider.companyName
    ) {
        return res.statu(412).json("Not a valid body");
    }

    jsonReader("users")
        .then(
            function onSuccess(data) {
                var createdUserMock = data[0];

                return Q.when(createdUserMock);
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
