import Sanitise from './utils/sanitise';
import './utils/debug';

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
     * @param {Debug} debug
     */
    storeSuite(suite, debug) {
        const s = Sanitise.cleanSuite(suite);
        suite.mpId = this._addItem(s);
        debug.log('store', s, 'suite');
    }

    /**
     * @member storeHook
     * @param {Mocha.Hook} hook A Mocha Hook object
     * @param {Debug} debug
     */
    storeHook(hook, debug) {
        // only add 'each' hooks for the first time used
        if (!hook.mpId) {
            const h = Sanitise.cleanHook(hook);
            hook.mpId = this._addItem(h);
            debug.log('store', h, 'hook');
        }
    }

    /**
     * @member storeTest
     * @param {Mocha.Test} test A Mocha Test object
     * @param {Debug} debug
     */
    storeTest(test, debug) {
        const t = Sanitise.cleanTest(test);
        test.mpId = this._addItem(t);
        debug.log('store', t, 'test');
    }

    // -------------------------------------------------
    // PRIVATE

    /**
     * @member _addItem Add an item to the items array
     * @private
     * @param {Object} item A sanitized version of the Mocha obj
     * @return The index number of item in the items array
     */
    _addItem(item) {
        item.id = this.items.length;
        this.items.push(item);
        return item.id;
    }
}
