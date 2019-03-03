// my-reporter.js
"use strict";

const Mocha = require("mocha");
const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_TEST_BEGIN,
    EVENT_TEST_END,
    EVENT_TEST_FAIL,
    EVENT_TEST_PASS,
    EVENT_TEST_PENDING,
    EVENT_TEST_RETRY,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    EVENT_HOOK_BEGIN,
    EVENT_HOOK_END
} = Mocha.Runner.constants;

// this reporter outputs test results, indenting two spaces per suite
class MyReporter {
    constructor(runner) {
        this._indents = 0;
        const stats = runner.stats;

        runner
            .once(EVENT_RUN_BEGIN, () => {
                console.log("start");
            })
            .on(EVENT_SUITE_BEGIN, suite => {
                console.log(
                    `${this.indent()}begin_suite: ${suite.fullTitle()}`
                );
                this.increaseIndent();
            })
            .on(EVENT_SUITE_END, suite => {
                console.log(`${this.indent()}end_suite: ${suite.fullTitle()}`);
                this.decreaseIndent();
            })
            .on(EVENT_HOOK_BEGIN, hook => {
                console.log(`${this.indent()}begin_hook: ${hook.fullTitle()}`);
            })
            .on(EVENT_HOOK_END, hook => {
                console.log(`${this.indent()}end_hook: ${hook.fullTitle()}`);
            })
            .on(EVENT_TEST_BEGIN, test => {
                // Test#fullTitle() returns the suite name(s)
                // prepended to the test title
                console.log(`${this.indent()}begin_test: ${test.fullTitle()}`);
            })
            .on(EVENT_TEST_END, test => {
                // Test#fullTitle() returns the suite name(s)
                // prepended to the test title
                console.log(`${this.indent()}end_test: ${test.fullTitle()}`);
            })
            .on(EVENT_TEST_PASS, test => {
                // Test#fullTitle() returns the suite name(s)
                // prepended to the test title
                console.log(`${this.indent()}pass: ${test.fullTitle()}`);
            })
            .on(EVENT_TEST_PENDING, test => {
                console.log(`${this.indent()}pending: ${test.fullTitle()}`);
            })
            .on(EVENT_TEST_FAIL, (test, err) => {
                console.log(
                    `${this.indent()}fail: ${test.fullTitle()} - error: ${
                        err.message
                    }`
                );
            })
            .on(EVENT_TEST_RETRY, (test, err) => {
                console.log(
                    `${this.indent()}retry: ${test.fullTitle()} - error: ${
                        err.message
                    }`
                );
            })
            .once(EVENT_RUN_END, () => {
                console.log(
                    `end: ${stats.passes}/${stats.passes + stats.failures} ok`
                );
            });
    }

    indent() {
        return Array(this._indents).join("  ");
    }

    increaseIndent() {
        this._indents++;
    }

    decreaseIndent() {
        this._indents--;
    }
}

module.exports = MyReporter;
