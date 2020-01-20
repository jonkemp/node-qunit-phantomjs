const path = require('path');
const chalk = require('chalk');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;
const phantomjsRunnerDir = path.dirname(require.resolve('qunit-phantomjs-runner'));
const isUrl = uri => uri.match(/^http(s?):/) !== null;

module.exports = (uri, options, callback) => {
    const opt = options || {};
    const cb = callback || (() => {});
    let runner = path.join(phantomjsRunnerDir, 'runner-json.js');
    const testUri = isUrl(uri) ? uri : `file:///${path.resolve(uri).replace(/\\/g, '/')}`;
    let childArgs = [];
    let proc;

    if (opt.verbose) {
        runner = path.join(phantomjsRunnerDir, 'runner-list.js');
    } else if (opt.customRunner) {
        // A custom phantomjs runner can be used to have more control
        // over phantomjs configuration or to customize phantomjs hooks.
        runner = opt.customRunner;
    }

    if (opt['phantomjs-options'] && opt['phantomjs-options'].length) {
        if (Array.isArray(opt['phantomjs-options'])) {
            childArgs = childArgs.concat(opt['phantomjs-options']);
        } else {
            childArgs.push(opt['phantomjs-options']);
        }
    }

    childArgs.push(
        runner,
        testUri
    );

    if (opt.timeout) {
        childArgs.push(opt.timeout);
    }

    if (opt.page) {
        // Push default timeout value unless specified otherwise
        if (!opt.timeout) {
            childArgs.push(5);
        }

        childArgs.push(JSON.stringify(opt.page));
    }

    console.log(`Testing ${chalk.blue(testUri)}`);

    // phantomjs [phantomjs-options] runner testuri [timeout [page]]
    proc = childProcess.spawn(binPath, childArgs);

    proc.stdout.on('data', data => {
        let out;
        let test;
        let message;
        const line = data.toString().trim();

        try {
            out = JSON.parse(line);
        } catch (err) {
            console.log(line);
            return;
        }

        if (out.exceptions) {
            for (test in out.exceptions) {
                console.log(`\n${chalk.red('Test failed')}: ${chalk.red(test)}: \n${out.exceptions[test].join('\n  ')}`);
            }
        }

        if (out.result) {
            message = `Took ${out.result.runtime} ms to run ${out.result.total} tests. ${out.result.passed} passed, ${out.result.failed} failed.`;

            console.log(out.result.failed > 0 ? chalk.red(message) : chalk.green(message));
        }
    });

    proc.stderr.on('data', data => {
        console.log(data.toString().trim());
    });

    proc.on('close', code => cb(code));
};
