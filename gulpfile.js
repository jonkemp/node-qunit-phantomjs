'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    mocha = require('gulp-mocha'),
    qunit = require('./index');

var paths = {
    scripts: ['./*.js', './test/*.js', '!./lib', '!./gulpfile.js']
};

gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
    return gulp.src('./test/*.js')
        .pipe(mocha({reporter: 'dot'}));
});

gulp.task('qunit', function() {
    qunit('./test/fixture.html');
});

gulp.task('qunit-verbose', function() {
    qunit('./test/fixture.html', { 'verbose': true });
});

gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['lint', 'test']);
});

gulp.task('default', ['lint', 'test', 'watch']);