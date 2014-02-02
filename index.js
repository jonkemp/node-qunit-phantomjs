var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var childArgs = [
    path.join(__dirname, 'runner.js'),
    'file:///C:/Users/jonathan.kemp/Documents/htdocs/node-phantomjs/test.html'
];

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
    console.log(stdout);
    //console.log('stderr: ' + stderr);
    if (err !== null) {
        console.log('exec error: ' + err);
    }
});