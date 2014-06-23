# node-qunit-phantomjs [![Build Status](https://travis-ci.org/jonkemp/node-qunit-phantomjs.png?branch=master)](https://travis-ci.org/jonkemp/node-qunit-phantomjs)

> Run QUnit unit tests in a headless PhantomJS instance without using Grunt.

Run QUnit unit tests in a PhantomJS-powered headless test runner, providing basic console output for QUnit tests. Uses the [phantomjs](https://github.com/Obvious/phantomjs) node module and the [PhantomJS Runner QUnit Plugin](https://github.com/jonkemp/qunit-phantomjs-runner).

If you're using [gulp](https://github.com/gulpjs/gulp), you should take a look at the [gulp-qunit](https://github.com/jonkemp/gulp-qunit) plugin.


## Install

Install with [npm](https://npmjs.org/package/node-qunit-phantomjs)

globally:
```bash
$ npm install -g node-qunit-phantomjs
```

or locally:
```bash
$ npm install --save-dev node-qunit-phantomjs
```

## Usage

Via command line:
```bash
$ node-qunit-phantomjs ./test/fixture.html
```
With options:
```bash
$ node-qunit-phantomjs ./test/fixture.html --verbose
```

Or require it as a module:
```js
var qunit = require('node-qunit-phantomjs');

qunit('./test/fixture.html');
```

Verbose option to output list as test cases pass or fail:
```js
var qunit = require('node-qunit-phantomjs');

qunit('./test/fixture.html', { 'verbose': true });
```

Sample [gulp](https://github.com/gulpjs/gulp) task:
```js
var gulp = require('gulp'),
    qunit = require('node-qunit-phantomjs');

gulp.task('qunit', function() {
    qunit('./test/fixture.html');
});
```

## API

### qunit(path-to-test-runner[, options]);

Opens a test runner file in PhantomJS and logs test results to the console.

#### options.verbose

Type: `Boolean`  
Default: `none`  

Add list as test cases pass or fail to output.

## License

MIT © [Jonathan Kemp](http://jonkemp.com)
