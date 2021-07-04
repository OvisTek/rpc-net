const Client = require("./../network/client/client");
const LocalChannel = require("./channel/local-channel");

class ClientRPC {
    constructor() {
        this._client = null;
        this._localChannel = null;
    }

    connect(address, port) {
        if (this._client !== null) {
            this._client.disconnect();
        }

        this._client = new Client(address, port);
        this._client.connect();

        this._localChannel = new LocalChannel();

        return this;
    }

    get local() {
        return this._localChannel;
    }

    get remote() {
        return null;
    }
}

module.exports = ClientRPC;