const Client = require("./../network/client/client");
const LocalChannel = require("./channel/local/local-channel");
const RemoteChannel = require("./channel/remote/remote-channel");

class ClientRPC {
    constructor() {
        this._client = null;
        this._localChannel = new LocalChannel();
        this._remoteChannel = null;
    }

    connect(address, port) {
        if (this._client !== null) {
            this._client.disconnect();
        }

        this._client = new Client(address, port);
        this._client.connect();

        this._remoteChannel = new RemoteChannel(this._client, this._localChannel);

        return this;
    }

    get local() {
        return this._localChannel;
    }

    get remote() {
        return this._remoteChannel;
    }
}

module.exports = ClientRPC;