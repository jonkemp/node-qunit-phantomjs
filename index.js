'use strict';
var path = require('path');
var childProcess = require('child_process');
var argv = require('minimist')(process.argv.slice(2));
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;
var runner;

if (!argv.reporter || argv.reporter === 'min') {
	runner = 'lib/runner.js';
} else if (argv.reporter === 'list') {
	runner = 'lib/runner-list.js';
}

var childArgs = [
    path.join(__dirname, runner),
    argv._[0]
];

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(stdout);

    if (stderr !== '') {
        console.log(stderr);
    }

    if (err !== null) {
        console.log(err);
    }
});