var gulp = require('gulp');
var jslint = require('gulp-jslint');
var files = ['./*.js'];
// JSlint task
gulp.task('lint', function () {
    'use strict';
    return gulp.src(files)
        .pipe(jslint({
            node: true,
            reporter: 'default'
        }));
});
gulp.task('default', ['lint'], function () {
    'use strict';
    gulp.watch(files, function () {
        gulp.run('lint');
    });
});


