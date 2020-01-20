/* eslint-disable */
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const qunit = require('./index');

const paths = {
    scripts: ['./*.js', '!./gulpfile.js']
};

gulp.task('lint', () => gulp.src(paths.scripts)
    .pipe(eslint({fix: true}))
    .pipe(eslint.format()));

gulp.task('test', () => gulp.src('./test/*.js')
    .pipe(mocha()));

gulp.task('qunit:pass', () => {
    qunit('./test/fixtures/passing.html');
});

gulp.task('qunit:fail', () => {
    qunit('./test/fixtures/failing.html');
});

gulp.task('qunit-verbose', () => {
    qunit('./test/fixtures/passing.html', { 'verbose': true });
});

gulp.task('watch', () => {
    gulp.watch(paths.scripts, gulp.parallel('lint', 'test'));
});

gulp.task('default', gulp.parallel('lint', 'test', 'watch'));
