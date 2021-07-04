const RemoteProxyFunction = require("./remote-proxy-function");
/**
 * Allows executing functions on a remote object and allows remote contexts to
 * execute functions locally
 */
class RemoteChannel {
    constructor(remoteObject, localChannel) {
        if (!remoteObject.socket) {
            throw new TypeError("RemoteChannel(remoteObject) - cannot create as required socket is not defined");
        }

        // keps a list of internal function references
        const internalList = {};

        // this is the primary proxy that is going to control most of the state
        // for this object, including holding execution states
        const proxy = new Proxy(this, {
            // attempt to execute a function remotely
            get: (_target, prop, _recv) => {
                // because of the dynamic nature, we don't know if the function we are
                // trying to call remotely actually exists.. this means we need to reach out
                // to remote, call the function and return the results.
                // as such, all functions are actually defined
                if (!internalList[prop]) {
                    internalList[prop] = new RemoteProxyFunction(prop, remoteObject);
                }

                // return an anonymous function that executes for this variable
                return (...args) => {
                    return internalList[prop].exec(...args);
                };
            },
            // sets a new local function that can be executed remotely
            set: (_target, prop, _value) => {
                throw new Error("set RemoteChannel - component with name " + prop + " cannot be defined on a remote context");
            }
        });

        // start listening to the remote socket for events
        remoteObject.socket.onAny((eventName, ...args) => {
            const split = eventName.split(":");

            if (split && split.length === 3) {
                // operation
                const op = split[0];
                // function name
                const fn = split[1];
                // function id
                const sgn = split[2];

                // we want to call a local function
                if (op === "c") {
                    // execute the function in the local context and get result
                    localChannel[fn](args).then((value) => {
                        // send result back to the callee
                        const signature = "rs:" + fn + ":" + sgn;
                        remoteObject.socket.emit(signature, value);
                    }).catch((err) => {
                        // some error occured, send the error
                        const signature = "re:" + fn + ":" + sgn;
                        remoteObject.socket.emit(signature, err.message);
                    });
                }
                // this is a return function from another remote that sent back
                // a successful result. We need to re-evaluate the local function
                else if (op === "rs") {
                    const listeners = internalList[fn].callInstances;
                    // grab resolver via signature
                    const resolver = listeners[sgn];
                    // delete the resolver as it has been resolved
                    delete listeners[sgn];

                    if (resolver) {
                        resolver.accept(...args);
                    }
                }
                // this is a return function from another remote that sent back
                // an error result. We need to re-evaluate the local function
                else if (op === "re") {
                    const listeners = internalList[fn].callInstances;
                    // grab resolver via signature
                    const resolver = listeners[sgn];
                    // delete the resolver as it has been resolved
                    delete listeners[sgn];

                    if (resolver) {
                        resolver.reject(...args);
                    }
                }
            }
        });

        // return the proxy object
        return proxy;
    }
}

module.exports = RemoteChannel;