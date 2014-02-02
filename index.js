var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var args = process.argv.slice(2);
var childArgs = [
    path.join(__dirname, 'runner.js'),
    args[0]
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