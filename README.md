# node-qunit-phantomjs

Run QUnit unit tests in a PhantomJS-powered headless test runner, providing basic console output for QUnit tests. Uses the [phantomjs](https://github.com/Obvious/phantomjs) node module and the [PhantomJS Runner QUnit Plugin](https://github.com/jonkemp/qunit-phantomjs-runner).

If you're using [gulp](https://github.com/gulpjs/gulp), you should take a look at the [gulp-qunit](https://github.com/jonkemp/gulp-qunit) plugin.

## Usage

```bash
$ node index.js http://localhost/qunit/test/index.html
```

List reporter to output list as test cases pass or fail:

```bash
$ node index.js http://localhost/qunit/test/index.html --reporter=list
```

## License

MIT © [Jonathan Kemp](http://jonkemp.com)