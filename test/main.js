/* jshint node: true */
/* global describe, it */

'use strict';

var assert = require('assert'),
    qunit = require('../index'),
    out = process.stdout.write.bind(process.stdout);

describe('node-qunit-phantomjs', function () {
    it('tests should pass', function (cb) {
        this.timeout(5000);

        qunit('test/fixtures/passing.html');

        process.stdout.write = function (str) {
            //out(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('tests should pass with options', function (cb) {
        this.timeout(5000);

        qunit('test/fixtures/passing.html', {'phantomjs-options': ['--ssl-protocol=any']});

        process.stdout.write = function (str) {
            //out(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('tests should not run when passing --help to PhantomJS', function(cb) {
        this.timeout(5000);

        qunit('test/fixtures/passing.html', {'phantomjs-options': ['--help']});

        process.stdout.write = function (str) {
            //out(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(false, 'No tests should run when passing --help to PhantomJS');
                process.stdout.write = out;
                cb();
                return;
            }

            var lines = str.split('\n');
            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                if (/.*--help.*Shows this message and quits/.test(line)) {
                    assert(true);
                    process.stdout.write = out;
                    cb();
                }
            }
        };
    });

    it('tests should time out', function (cb) {
        this.timeout(10000);

        qunit('test/fixtures/async.html', { 'timeout': 1 });

        process.stdout.write = function (str) {
            //out(str);

            if (/The specified timeout of 1 seconds has expired. Aborting.../.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });
});
