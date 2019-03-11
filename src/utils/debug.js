/**
 * @class Debug
 */
export default class Debug {
    constructor() {
        this._level = 0;
    }

    incrementLevel() {
        this._level++;
    }

    decrementLevel() {
        this._level--;
    }

    /**
     * @member log logs an operation
     * @param {string} operation what kind of operation was done
     * @param {*} obj the data object
     * @param {string} type the type of the data object
     */
    log(operation, obj, type) {
        let msg;
        switch (operation) {
            case 'start':
                this._logMsg(`> start ${type}: ${obj.title}`);
                break;
            case 'end':
                this._logMsg(`< end ${type}: ${obj.title}`);
                break;
            case 'store':
                msg = `+ #${obj.id} store ${type}:`;
                msg += ` ${obj.title}`;
                msg += ` (${obj.duration}ms).`;
                if (obj.mpStats) {
                    msg += ` stats: ${JSON.stringify(obj.mpStats)}`;
                }
                this._logMsg(msg);
                break;
        }
    }

    // ---------------------------------------------------
    // PRIVATE

    get _indent() {
        return '  '.repeat(this._level);
    }

    _logMsg(msg) {
        console.log(`\u001b[38;5;3m${this._indent}${msg}\u001b[0m`);
    }
}
