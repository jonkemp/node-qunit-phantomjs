'use strict';

var path = require('path'),
    chalk = require('chalk'),
    childProcess = require('child_process'),
    phantomjs = require('phantomjs-prebuilt'),
    binPath = phantomjs.path,
    phantomjsRunnerDir = path.dirname(require.resolve('qunit-phantomjs-runner')),
    isUrl = function (uri) {
        return uri.match(/^http(s?):/) !== null;
    },
    getUri = function (uri) {
        return isUrl(uri) ? uri : 'file:///' + path.resolve(uri).replace(/\\/g, '/');
    },
    getRunner = function (options) {
        if (options.verbose) {
            return path.join(phantomjsRunnerDir, 'runner-list.js');
        }
        if (options.customRunner) {
            // A custom phantomjs runner can be used to have more control
            // over phantomjs configuration or to customize phantomjs hooks.
            return options.customRunner;
        }
        return path.join(phantomjsRunnerDir, 'runner-json.js');
    },
    getArgs = function (options, runner, testUri) {
        var args = [];

        if (options['phantomjs-options'] && options['phantomjs-options'].length) {
            if (Array.isArray(options['phantomjs-options'])) {
                args = args.concat(options['phantomjs-options']);
            } else {
                args.push(options['phantomjs-options']);
            }
        }

        args.push(
            runner,
            testUri
        );

        if (options.timeout) {
            args.push(options.timeout);
        }

        if (options.page) {
            // Push default timeout value unless specified otherwise
            if (!options.timeout) {
                args.push(5);
            }

            args.push(JSON.stringify(options.page));
        }
        return args;
    },
    parseLine = function (line) {
        try {
            return JSON.parse(line);
        } catch (err) {
            return { message: line };
        }
    },
    logTestResult = function (result) {
        var message = 'Took ' + result.runtime + ' ms to run ' + result.total + ' tests. ' + result.passed + ' passed, ' + result.failed + ' failed.';

        console.log(result.failed > 0 ? chalk.red(message) : chalk.green(message));
    },
    logTestFailures = function (failures) {
        var test;

        for (test in failures) {
            console.log('\n' + chalk.red('Test failed') + ': ' + chalk.red(test) + ': \n' + failures[test].join('\n  '));
        }
    };

module.exports = function (uri, options, callback) {
    var cb = callback || function () {},
        opt = options || {},
        runner = getRunner(opt),
        testUri = getUri(uri.trim()),
        childArgs = getArgs(opt, runner, testUri),
        proc;

    console.log('Testing: ' + chalk.blue(testUri));

    // phantomjs [options] runner.js [arg1 [arg2 [...]]]
    proc = childProcess.spawn(binPath, childArgs);

    proc.stdout.on('data', function (data) {
        var line = parseLine(data.toString().trim());

        if (line.message) {
            console.log(line.message);
        }
        if (line.exceptions) {
            logTestFailures(line.exceptions);
        }
        if (line.result) {
            logTestResult(line.result);
        }
    });

    proc.stderr.on('data', function (data) {
        console.log(data.toString().trim());
    });

    proc.on('close', function (code) {
        return cb(code);
    });
};
