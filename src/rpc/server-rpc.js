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
        return this._server.connect();
    }

}

module.exports = ServerRPC;