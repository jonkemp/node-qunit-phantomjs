/* eslint-disable */
/* global describe, it */

const assert = require('assert');
const stripAnsi = require('strip-ansi');
const qunit = require('../index');
const out = process.stdout.write.bind(process.stdout);

describe('node-qunit-phantomjs', function () {
    this.timeout(10000);

    it('tests should pass', cb => {
        qunit('test/fixtures/passing.html');

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('tests should fail', done => {
        qunit('test/fixtures/failing.html');

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/10 passed. 1 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                done();
            }
        };
    });

    it('tests should not be affected by console.log in test code', cb => {
        qunit('test/fixtures/console-log.html');

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('tests should pass with options', cb => {
        qunit('test/fixtures/passing.html', {'phantomjs-options': ['--ssl-protocol=any']});

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('tests should pass with more than one options', cb => {
        qunit('test/fixtures/passing.html', {'phantomjs-options': ['--ignore-ssl-errors=true', '--web-security=false']});

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });

    it('should set custom viewport', done => {
        qunit('test/fixtures/custom-viewport.html', {'page': {
            viewportSize: { width: 1280, height: 800 }
        }});

        process.stdout.write = str => {
            //out(str);
            str = stripAnsi(str);

            if (/2 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                done();
            }
        };
    });

    it('tests should not run when passing --help to PhantomJS', cb => {
        qunit('test/fixtures/passing.html', {'phantomjs-options': ['--help']});

        process.stdout.write = str => {
            //out(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(false, 'No tests should run when passing --help to PhantomJS');
                process.stdout.write = out;
                cb();
                return;
            }

            const lines = str.split('\n');
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                if (/.*--help.*Shows this message and quits/.test(line)) {
                    assert(true);
                    process.stdout.write = out;
                    cb();
                }
            }
        };
    });

    it('tests should time out', cb => {

        qunit('test/fixtures/async.html', { 'timeout': 1 });

        process.stdout.write = str => {
            //out(str);

            if (/The specified timeout of 1 seconds has expired. Aborting.../.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });
});
