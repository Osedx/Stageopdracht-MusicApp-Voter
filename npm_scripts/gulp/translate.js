'use strict';

var gulp = require('gulp');
var gettext = require('gulp-angular-gettext');

var localePath = 'public/assets/locale/';
var poPath = localePath + 'po/';

// Generate json files from the po files
gulp.task('translations', function() {
    return gulp.src(poPath +'*.po')
        .pipe(gettext.compile({
            format: 'json'
        }))
        .pipe(gulp.dest(localePath));
});
