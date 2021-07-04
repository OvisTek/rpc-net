const Client = require("./../network/client/client");

class ClientRPC {
    constructor() {
        this._client = null;
    }

    connect(address, port) {
        if (this._client !== null) {
            this._client.disconnect();
        }

        this._client = new Client(address, port);
        this._client.connect();

        return this;
    }
}

module.exports = ClientRPC;