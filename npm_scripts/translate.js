"use strict";

require("rootpath")();
var gulp = require("gulp");
var Utils = require("./utils");

require("./gulp/translate");

Utils.log.lined("PO TO JSON CONVERSION STARTED ...");

gulp.start("translations", function(err) {
    if(err) {
        console.log("AN ERROR OCCURED WHILE CONVERTING!");
        console.log(err);
        return process.exit(1);
    }

    Utils.log.lined("CONVERSION COMPLETE!");
    process.exit();
});
