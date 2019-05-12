/* eslint-disable no-unused-vars */

const Base = require('mocha/lib/reporters/base');
const Spec = require('mocha/lib/reporters/spec');
const Mocha = require('mocha');

/**
 * statistics regarding test-steps within a test-case
 * @typedef {Object} TestCaseSteps
 * @property {Number} total The total number of steps within the test-case
 * @property {Number} pass The number of steps that passed within the test-case
 * @property {Number} fail The number of steps that failed within the test-case
 * @property {Number} skip The number of steps that were skipped within the test-case
 */

/**
 * test-case definition
 * @typedef {Object} TestCase
 * @property {String} title The title of the test case (removed tags/ref codes)
 * @property {String} file The relative filepath of the test-case
 * @property {Date} start The Date that the test-case started
 * @property {Date} end The Date that the test-case finished
 * @property {Number} duration The test-case's duration in milliseconds
 * @property {Array.<String>} tags The test-case's tag(s)
 * @property {Array.<String>} refCodes The test-case's reference code(s)
 * @property {String} status The test-case's status
 * @property {TestCaseSteps} steps The test-case's steps statistics
 */

/**
 * overall results definition
 * @typedef {Object} Result
 * @property {Date} start The Date that the test-run started
 * @property {Date} end The Date that the test-run finished
 * @property {Number} duration The test-run's duration in milliseconds
 * @property {Array.<TestCase>} testCases The test-run's test-cases
 */

// mocha event constants
const {
    EVENT_RUN_BEGIN,
    EVENT_RUN_END,
    EVENT_SUITE_BEGIN,
    EVENT_SUITE_END,
    EVENT_TEST_PASS,
    EVENT_TEST_FAIL,
    EVENT_TEST_PENDING,
    EVENT_TEST_END,
} = Mocha.Runner.constants;

/**
 * @class
 * The Test-Case reporter provides an HTML emailer report detailing the test-run as a test case level.
 * @param {Runner} runner
 */
class TestCaseReporter {
    constructor(runner, options) {
        /** @type {Result} */
        this._result;

        /** @type {TestCase} */
        this._testCase;

        /** @type {Number} */
        this._suiteLevel;

        // extending reporter base
        Base.call(this, runner);

        // Spec Reporter for the console
        new Spec(runner);

        // options
        this._options = this._parseOptionsWithDefaults(options);

        // add event listeners
        runner.once(EVENT_RUN_BEGIN, this._eventRunBegin.bind(this));
        runner.once(EVENT_RUN_END, this._eventRunEnd.bind(this));
        runner.on(EVENT_SUITE_BEGIN, this._eventSuiteBegin.bind(this));
        runner.on(EVENT_SUITE_END, this._eventSuiteEnd.bind(this));
        runner.on(EVENT_TEST_PASS, this._eventTestPass.bind(this));
        runner.on(EVENT_TEST_FAIL, this._eventTestFail.bind(this));
        runner.on(EVENT_TEST_PENDING, this._eventTestPending.bind(this));
        runner.on(EVENT_TEST_END, this._eventTestEnd.bind(this));
    }

    // ----------------------------------------------------------------------
    // private event handlers

    /**
     * @private
     */
    _eventRunBegin() {
        this._result = {
            start: new Date(),
            end: undefined,
            duration: undefined,
            testCases: [],
        };
        this._suiteLevel = 0;
    }

    /**
     * @private
     */
    _eventRunEnd() {
        // calc times
        this._result.end = new Date();
        this._result.duration = this._result.end - this._result.start;

        console.log(JSON.stringify(this._result, undefined, 2));
    }

    /**
     * @param {Mocha.Suite} suite
     * @private
     */
    _eventSuiteBegin(suite) {
        this._suiteLevel++;
        if (this._suiteLevel === this._options.testCaseLevel) {
            // this suite is considered to be at the right level to be a test-case (root is level 1)
            this._testCase = this._initTestCase(suite);
        }
    }

    /**
     * @param {Mocha.Suite} suite
     * @private
     */
    _eventSuiteEnd(suite) {
        if (this._suiteLevel === this._options.testCaseLevel) {
            // the end of this suite is considered to be at the right level to be end of test-case
            // end-time & duration
            this._testCase.end = new Date();
            this._testCase.duration = this._testCase.end - this._testCase.start;

            // status
            this._testCase.status = this._calcStatus(this._testCase.steps);

            // push test-case to results
            this._result.testCases.push(this._testCase);
            this._testCase = undefined;
        }
        this._suiteLevel--;
    }

    /**
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestPass(test) {
        if (this._testCase) {
            // only test steps within a test-case
            this._testCase.steps.pass++;
        }
    }

    /**
     * @param {Mocha.Test} test
     * @param {Error} err
     * @private
     */
    _eventTestFail(test, err) {
        if (this._testCase) {
            // only test steps within a test-case
            this._testCase.steps.fail++;
        }
    }

    /**
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestPending(test) {
        if (this._testCase) {
            // only test steps within a test-case
            this._testCase.steps.skip++;
        }
    }

    /**
     * @param {Mocha.Test} test
     * @private
     */
    _eventTestEnd(test) {
        if (this._testCase) {
            // only test steps within a test-case
            this._testCase.steps.total++;
        }
    }

    // ----------------------------------------------------------------------
    // private methods

    /**
     * Parse the reporter-options and use defaults where required
     * @param {Object} opts The options supplied to the reporter
     * @return {Object} The parsed options for the reporter runtime
     * @private
     */
    _parseOptionsWithDefaults(opts) {
        // extract options and implement defaults as required
        const o = opts && opts.reporterOptions ? opts.reporterOptions : {};
        return {
            ...o,
            testCaseLevel: Number(o.testCaseLevel) || 2, // the level of the suite in the tree that forms a test-case
            tagPrefix: o.tagPrefix || '@', // the 'tag' prefix char
            refPrefix: o.refPrefix || '$', // the 'refCode' prefix char
        };
    }

    /**
     * create a test-case object from the given mocha.suite
     * @param {Mocha.Suite} suite
     * @return {TestCase}
     * @private
     */
    _initTestCase(suite) {
        // test-case tag(s) & reference code(s)
        const tags = this._extractTags(suite.title, this._options.tagPrefix);
        const refCodes = this._extractTags(
            suite.title,
            this._options.refPrefix
        );
        const allTags = tags.concat(refCodes);

        // test-case title - remove all tags and any left-over duplicate spaces
        let title = suite.title;
        for (const tag of allTags) {
            title = title.replace(tag, '');
        }
        title = title.replace(/\s{2,}/g, ' ').trim();

        // create an initial test-case object
        return {
            title,
            file: suite.file ? suite.file.replace(process.cwd(), '') : '',
            start: new Date(),
            end: undefined,
            duration: undefined,
            tags,
            refCodes,
            status: undefined,
            steps: {
                total: 0,
                pass: 0,
                fail: 0,
                skip: 0,
            },
        };
    }

    /**
     * extract tags from a suite title and return in an array
     * @param {String} title The suite's title
     * @param {String} prefix The char that prefixes the tags to extract
     * @return {Array.<String>} An array of tags
     * @private
     */
    _extractTags(title, prefix) {
        const tags = [];
        const words = title.split(' ');
        for (const word of words) {
            if (word.charAt(0) === prefix) {
                tags.push(word);
            }
        }
        return tags;
    }

    /**
     * evaluate a test-case status by looking at the given steps-stats object
     * @param {TestCaseSteps} steps The test-case's steps-stats object
     * @return {String} The evaluated status of the test case
     * @private
     */
    _calcStatus(steps) {
        let status;
        if (steps.fail > 0) {
            // at least one failing test-step... consider test-case failed
            status = 'fail';
        } else {
            if (steps.pass > 0) {
                // only passing test-steps... consider test-case partial or passed
                if (steps.skip > 0) {
                    status = 'partial';
                } else {
                    status = 'pass';
                }
            } else {
                // no passing or failing test-steps... consider test-case skipped
                status = 'skip';
            }
        }

        return status;
    }

    // end-class
}

module.exports = TestCaseReporter;
