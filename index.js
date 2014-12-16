'use strict';

var path = require('path'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path;

module.exports = function (filepath, options, callback) {
    var opt = options || {},
        cb = callback || function () {},
        runner = './node_modules/qunit-phantomjs-runner/runner.js';

    if (opt.verbose) {
        runner = './node_modules/qunit-phantomjs-runner/runner-list.js';
    }

    var absolutePath = path.resolve(filepath),
        isAbsolutePath = absolutePath.indexOf(filepath) >= 0,
        childArgs = [];

    if (opt['phantomjs-options'] && opt['phantomjs-options'].length) {
        childArgs.push( opt['phantomjs-options'] );
    }

    childArgs.push(
        path.join(__dirname, runner),
        (isAbsolutePath ? 'file:///' + absolutePath.replace(/\\/g, '/') : file.path)
    );

    var proc = childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
        console.log('Testing ' + path.relative(__dirname, filepath));

        if (stdout) {
            stdout = stdout.trim(); // Trim trailing cr-lf
            console.log(stdout);
        }

        if (stderr) {
            console.log(stderr);
        }

        if (err) {
            console.log(err);
        }
    });

    proc.on('close', function (code) {
        return cb(code);
    });
};
