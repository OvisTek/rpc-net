const Server = require("./../network/server/server");

class ServerRPC {
    constructor() {
        this._server = null;
    }

    connect(port) {
        if (this._server !== null) {
            this._server.disconnect();
        }

        this._server = new Server(port);

        // listen for Client additions
        this._server.onClientAdded = (client) => {

        };

        // listen for Client removals
        this._server.onClientRemoved = (client) => {

        };

        return this._server.connect();
    }

    get channel() {
        return null;
    }
}

module.exports = ServerRPC;