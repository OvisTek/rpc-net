const Util = require("../../util/util");

/**
 * This is a proxy container that holds a function that can be safely executed
 */
class LocalProxyFunction {
    constructor(value) {
        this._value = value;

        if (!Util.isFunction(this._value)) {
            throw new TypeError("LocalProxyFunction(value) - value must be a function");
        }
    }

    exec(...args) {
        return new Promise((accept, reject) => {
            try {
                // execute our stored function locally
                const rObject = this._value(...args);

                // we need to check if the returned object is a Promise, if so, handle it
                // differently. This can happen if the function wants to execute async
                // so we only return when the Promise is resolved
                if (Util.isPromise(rObject)) {
                    rObject.then((res) => {
                        return accept(res);
                    }).catch((err) => {
                        return reject(err);
                    });
                }
                else {
                    // otherwise, its a non async object so just execute and return the results
                    return accept(rObject);
                }
            }
            catch (e) {
                // if any execution errors occur, just reject it
                return reject(e);
            }
        });
    }
}

module.exports = LocalProxyFunction;