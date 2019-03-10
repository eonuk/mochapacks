import DataStore from "./dataStore";

const Mocha = require("mocha");
const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_TEST_BEGIN,
    EVENT_TEST_END,
    EVENT_TEST_PASS,
    EVENT_TEST_FAIL,
    EVENT_TEST_PENDING,
    EVENT_TEST_RETRY,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    EVENT_HOOK_BEGIN,
    EVENT_HOOK_END
} = Mocha.Runner.constants;

/**
 * @class
 * @summary this reporter outputs test results, indenting two spaces per suite
 */
class MochaPacksReporter {
    /**
     * @constructor
     * @param {Runner} runner
     */
    constructor(runner) {
        this._indents = 0;
        //const stats = runner.stats;

        // event listeners
        runner.once(EVENT_RUN_BEGIN, this._eventRunBegin.bind(this));
        runner.once(EVENT_RUN_END, this._eventRunEnd.bind(this));
        runner.on(EVENT_SUITE_BEGIN, this._eventSuiteBegin.bind(this));
        runner.on(EVENT_SUITE_END, this._eventSuiteEnd.bind(this));
        runner.on(EVENT_HOOK_BEGIN, this._eventHookBegin.bind(this));
        runner.on(EVENT_HOOK_END, this._eventHookEnd.bind(this));
        runner.on(EVENT_TEST_BEGIN, this._eventTestBegin.bind(this));
        runner.on(EVENT_TEST_END, this._eventTestEnd.bind(this));
        runner.on(EVENT_TEST_PASS, this._eventTestPass.bind(this));
        runner.on(EVENT_TEST_FAIL, this._eventTestFail.bind(this));
        runner.on(EVENT_TEST_PENDING, this._eventTestPending.bind(this));
        runner.on(EVENT_TEST_RETRY, this._eventTestRetry.bind(this));

        this._dataStore = new DataStore();
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

    /**
     * @method eventRunBegin
     * @private
     */
    _eventRunBegin() {
        console.log(`${this.indent()}begin_run`);
    }

    /**
     * @method eventRunEnd
     * @private
     */
    _eventRunEnd() {
        console.log(`${this.indent()}end_run`);
    }

    /**
     * @method eventSuiteBegin
     * @param {Mocha.Suite} suite
     * @private
     */
    _eventSuiteBegin(suite) {
        //console.log(`${this.indent()}begin_suite: ${suite.fullTitle()}`);
        console.log(`${this.indent()}> start suite: ${suite.title}`);
        this.increaseIndent();
    }

    /**
     * @method eventSuiteEnd
     * @param {Mocha.Suite} suite
     * @private
     */
    _eventSuiteEnd(suite) {
        //console.log(`${this.indent()}end_suite: ${suite.fullTitle()}`);
        this.decreaseIndent();
        this._dataStore.storeSuite(suite, this.indent());
    }

    /**
     * @method eventHookBegin
     * @param {Mocha.Hook} hook
     * @private
     */
    _eventHookBegin(hook) {
        hook;
        //console.log(`${this.indent()}begin_hook: ${hook.fullTitle()}`);
    }

    /**
     * @method eventHookEnd
     * @param {Mocha.Hook} hook
     * @private
     */
    _eventHookEnd(hook) {
        //console.log(`${this.indent()}end_hook: ${hook.fullTitle()}`);
        this._dataStore.storeHook(hook, this.indent());
    }

    /**
     * @method eventTestBegin
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestBegin(test) {
        test;
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        //console.log(`${this.indent()}begin_test: ${test.fullTitle()}`);
    }

    /**
     * @method eventTestEnd
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestEnd(test) {
        //console.log(`${this.indent()}end_test: ${test.fullTitle()}`);
        this._dataStore.storeTest(test, this.indent());
    }

    /**
     * @method eventTestPass
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestPass(test) {
        test;
        //console.log(`${this.indent()}pass: ${test.fullTitle()}`);
    }

    /**
     * @method eventTestFail
     * @param {Mocha.Test} test
     * @param {Error} err
     * @private
     */
    _eventTestFail(test, err) {
        test;
        err;
        //console.log(`${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`);
    }

    /**
     * @method eventTestPending
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestPending(test) {
        test;
        //console.log(`${this.indent()}pending: ${test.fullTitle()}`);
    }

    /**
     * @method eventTestRetry
     * @param {Mocha.Test} test
     * @param {Error} err
     * @private
     */
    _eventTestRetry(test, err) {
        test;
        err;
        /*console.log(
            `${this.indent()}retry: ${test.fullTitle()} - error: ${err.message}`
        );*/
    }
}

module.exports = MochaPacksReporter;
