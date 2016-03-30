/* eslint-disable */
'use strict';

var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    mocha = require('gulp-mocha'),
    qunit = require('./index');

var paths = {
    scripts: ['./*.js', '!./gulpfile.js']
};

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('test', function() {
    return gulp.src('./test/*.js')
        .pipe(mocha());
});

gulp.task('qunit', function() {
    qunit('./test/fixtures/passing.html');
});

gulp.task('qunit-verbose', function() {
    qunit('./test/fixtures/passing.html', { 'verbose': true });
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint', 'jscs', 'test']);
});

gulp.task('default', ['lint', 'jscs', 'test', 'watch']);
