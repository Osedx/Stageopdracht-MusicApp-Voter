"use strict";

var fs = require("fs");
var Q = require("q");

var dataBasePath = "data/";

var dataMap = {
    "tenders": "tenders.json",
    "documents": "documents.json",
    "events": "events.json",
    "providers": "providers.json",
    "users": "users.json"
};

module.exports = function jsonReader(type) {
    var d = Q.defer();

    if (!dataMap[type]) {
        return Q.reject("File not mapped!");
    }

    fs.readFile(dataBasePath + dataMap[type], function(err, data) {
        if (err || !data) {
            return d.reject(err);
        }

        var result = null;

        try {
            result = JSON.parse(data);
        } catch (e) {
            return d.reject(e);
        }

        return d.resolve(result);
    });

    return d.promise;
};
