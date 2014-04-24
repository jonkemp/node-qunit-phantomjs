/* jshint node: true */
/* global describe, it */

'use strict';
var assert = require('assert'),
    qunit = require('../index'),
    out = process.stdout.write.bind(process.stdout);

describe('node-qunit-phantomjs', function() {
    it('tests should pass', function(cb) {
        this.timeout(5000);

        qunit('test/fixture.html');

        process.stdout.write = function (str) {
            //out(str);

            if (/10 passed. 0 failed./.test(str)) {
                assert(true);
                process.stdout.write = out;
                cb();
            }
        };
    });
});