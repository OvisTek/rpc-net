const Util = require("./../../../util/util");

/**
 * This is a proxy container that manages the execution of remote functions
 */
class RemoteProxyFunction {
    constructor(fnName, remoteObject) {
        this._fnName = fnName;
        this._remoteObject = remoteObject;

        // map of all calls that were made to a remote context
        this.callInstances = {};
    }

    exec(...args) {
        // generate a new instance-id for this particular function call
        const instanceID = Util.id();
        const signatures = this.callInstances;

        // ensure this instance ID has not been added previously
        // NOTE: This should not ever be executed as all instance ID's are unique
        // If this executes then the PRNG scheme needs to be swapped
        if (signatures[instanceID]) {
            return new Promise((_, reject) => {
                return reject(new Error("RemoteProxyFunction.exec() - internal error - prng error"));
            });
        }

        // add this call as a unique instance and save the Promise
        // to be executed later
        return new Promise((accept, reject) => {
            // save this promise to be executed later
            signatures[instanceID] = {
                accept: accept,
                reject: reject
            };

            const signature = "c:" + this._fnName + ":" + instanceID;

            this._remoteObject.socket.emit(signature, args);
        });
    }
}

module.exports = RemoteProxyFunction;