const ProxyFunction = require("./proxy-function");

/**
 * Allows dynamic storage and execution of functions in the current local context
 */
class LocalChannel {
    constructor() {
        return new Proxy(this, {
            // get a previously stored function for execution
            get: (target, prop, receiver) => {
                // check if function exists before calling
                if (!target[prop]) {
                    // if it does not exist, then we just reject this execution
                    // with an error
                    return () => {
                        return new Promise((_, reject) => {
                            return reject(new Error("get ProxyFunction - function with name " + prop + "() is not defined and cannot be executed"));
                        });
                    };
                }

                // otherwise return an anonymous function that
                // executes our stored function
                return (...args) => {
                    return target[prop].exec(...args);
                };
            },
            // sets a new local function that can be executed remotely
            set: (target, prop, value) => {
                if (!target[prop]) {
                    target[prop] = new ProxyFunction(value);

                    return true;
                }

                throw new Error("set ProxyFunction - function with name " + prop + "() is already defined");
            },
            // deletes a previously stored function
            deleteProperty(target, prop) {
                if (prop in target) {
                    delete target[prop];
                }
            }
        });
    }
}

module.exports = LocalChannel;