# node-qunit

Run QUnit unit tests in a PhantomJS-powered headless test runner, providing basic console output for QUnit tests. Uses the [phantomjs](https://github.com/Obvious/phantomjs) node module and the [PhantomJS Runner QUnit Plugin](https://github.com/jonkemp/qunit-phantomjs-runner).


## Usage

```bash
$ node index.js http://localhost/qunit/test/index.html
```

If you're using [gulp](https://github.com/gulpjs/gulp), you should take a look at the [gulp-qunit](https://github.com/jonkemp/gulp-qunit) plugin.