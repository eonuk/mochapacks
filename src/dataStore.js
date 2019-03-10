import Sanitise from "./utils/sanitise";

/**
 * @class DataStore
 * @summary A simple
 */
export default class DataStore {
    /**
     * @class DataStore
     * @constructor
     */
    constructor() {
        this.items = [];
        // this.suites = {};
        // this.paths = {};
        // this.tags = {};
    }

    /**
     * @member storeSuite
     * @param {Mocha.Suite} suite A Mocha Suite object
     */
    storeSuite(suite, indent) {
        const s = Sanitise.cleanSuite(suite);
        suite.id = this._addItem(s);
        console.log(`${indent}- store suite: ${suite.title} -- #${suite.id}`);
    }

    /**
     * @member storeHook
     * @param {Mocha.Hook} hook A Mocha Hook object
     */
    storeHook(hook, indent) {
        const h = Sanitise.cleanHook(hook);
        hook.id = this._addItem(h);
        console.log(`${indent}- store hook: ${hook.title} -- #${hook.id}`);
    }

    /**
     * @member storeTest
     * @param {Mocha.Test} test A Mocha Test object
     */
    storeTest(test, indent) {
        const t = Sanitise.cleanTest(test);
        test.id = this._addItem(t);
        console.log(`${indent}- store test: ${test.title} -- #${test.id}`);
    }

    /**
     * @member _addItem
     * @private
     * @param {Mocha.Test|Mocha.Suite} item
     * @return index number in items array
     */
    _addItem(item) {
        this.items.push(item);
        return this.items.length - 1;
    }
}
