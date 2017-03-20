"use strict";

require("rootpath")();
var Q = require("q");
var _ = require("lodash");
var jsonReader = require("app/helpers/jsonReader");

module.exports.read = function read(req, res, next) {
    jsonReader("tenders")
        .then(
            function onSuccess(data) {
                var result = {
                    "_links": {},
                    "_page": {},
                    "_embedded": data
                };

                var filter = {};

                if (req.query.status) {
                    filter.product = {
                        status: "" + req.query.status
                    };
                }

                if (!_.isEmpty(filter)) {
                    result._embedded = _.filter(data, filter);
                }

                if (req.query.provider) {
                    result._embedded = result._embedded.slice(0, 2);
                }

                // Reverse sort tenders by default.
                result._embedded = _.sortBy(result._embedded, function(item) {
                    return new Date(item.publishingStartDate || null).toISOString();
                });

                result._embedded = _.reverse(result._embedded);

                res.status(200).json(result);
            },
            function onError(err) {
                res.status(400).json(err);
            }
        );
};

module.exports.readOne = function readOne(req, res, next) {
    jsonReader("tenders")
        .then(
            function onSuccess(data) {
                var result = _.find(data, { id: req.params.id });

                if (req.query.provider) {
                    // Do something here
                }

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
    if (req.body.id) {
        return res.status(204).json();
    }

    return res.satus(400).json("some error");
};
