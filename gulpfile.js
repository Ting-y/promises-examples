var gulp = require('gulp');
var jslint = require('gulp-jslint');
var dir = ['./*.js'];
// JS hint task
gulp.task('lint', function () {
    'use strict';
    return gulp.src(dir)
        .pipe(jslint({
            node: true,
            reporter: 'default'
        }));
});
gulp.task('default', ['lint'], function () {
    'use strict';
    gulp.watch(dir, function () {
        gulp.run('lint');
    });
});
