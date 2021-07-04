const Server = require("./../network/server/server");
const LocalChannel = require("./channel/local/local-channel");
const RemoteChannel = require("./channel/remote/remote-channel");

class ServerRPC {
    constructor() {
        this._server = null;
        this._localChannel = new LocalChannel();
        this._remoteChannels = {};
    }

    connect(port) {
        if (this._server !== null) {
            this._server.disconnect();
            this._remoteChannels = {};
        }

        this._server = new Server(port);

        // listen for Client additions
        this._server.onClientAdded = (client) => {
            this._remoteChannels[client.id] = new RemoteChannel(client, this._localChannel);
        };

        // listen for Client removals
        this._server.onClientRemoved = (client) => {
            delete this._remoteChannels[client.id];
        };

        return this._server.connect();
    }

    get local() {
        return this._localChannel;
    }

    getRemote(id) {
        return this._remoteChannels[id];
    }
}

module.exports = ServerRPC;