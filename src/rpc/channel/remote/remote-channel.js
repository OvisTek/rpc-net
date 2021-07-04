/**
 * Allows executing functions on a remote object and allows remote contexts to
 * execute functions locally
 */
class RemoteChannel {
    constructor(remoteObject, localChannel) {
        if (!remoteObject.socket) {
            throw new TypeError("RemoteChannel(remoteObject) - cannot create as required socket is not defined");
        }

        // this is the primary proxy that is going to control most of the state
        // for this object, including holding execution states
        const proxy = new Proxy(this, {
            // attempt to execute a function remotely
            get: (target, prop, _) => {
                // check if function exists before calling
                if (!target[prop]) {
                    // if it does not exist, then we just reject this execution
                    // with an error
                    return () => {
                        return new Promise((_, reject) => {
                            return reject(new Error("get LocalProxyFunction - function with name " + prop + "() is not defined and cannot be executed"));
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
            set: (_, prop, _) => {
                throw new Error("set RemoteChannel - component with name " + prop + " cannot be defined on a remote context");
            }
        });

        // start listening to the remote socket for events
        remoteObject.socket.onAny((eventName, ...args) => {
            // todo
        });

        // return the proxy object
        return proxy;
    }
}

module.exports = RemoteChannel;