'use strict';

var path = require('path'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs'),
    binPath = phantomjs.path;

module.exports = function (filepath, options, callback) {
    var opt = options || {},
        cb = callback || function () {},
        runner = 'lib/runner.js';

    if (opt.verbose) {
        runner = 'lib/runner-list.js';
    }

    var absolutePath = path.resolve(filepath),
        isAbsolutePath = absolutePath.indexOf(filepath) >= 0;

    var childArgs = [
        path.join(__dirname, runner),
        (isAbsolutePath ? 'file:///' + absolutePath.replace(/\\/g, '/') : filepath)
    ];

    if (opt['phantomjs-options'] && opt['phantomjs-options'].length) {
        childArgs.concat( opt['phantomjs-options'] );
    }

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
