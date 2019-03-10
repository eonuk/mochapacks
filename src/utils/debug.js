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
                console.log(`${this._indent}> start ${type}: ${obj.title}`);
                break;
            case 'end':
                console.log(`${this._indent}< end ${type}: ${obj.title}`);
                break;
            case 'store':
                msg = `${this._indent}+ #${obj.id} store ${type}:`;
                msg += ` ${obj.title}`;
                msg += ` (${obj.duration}ms).`;
                if (obj.mpStats) {
                    msg += ` stats: ${JSON.stringify(obj.mpStats)}`;
                }
                console.log(msg);
                break;
        }
    }

    // ---------------------------------------------------
    // PRIVATE

    get _indent() {
        return '  '.repeat(this._level);
    }
}
