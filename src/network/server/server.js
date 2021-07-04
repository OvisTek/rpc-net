const io = require("socket.io");
const Connection = require("./connection");

class Server {
    constructor(port) {
        this._address = port;
        this._server = null;
        this._connections = new Array();

        // handlers
        this._onConnectionAddedHandler = null;
        this._onConnectionDroppedHandler = null;
    }

    set onClientAdded(value) {
        if (!value) {
            this._onConnectionAddedHandler = null;
        }
        else {
            this._onConnectionAddedHandler = value;
        }
    }

    set onClientRemoved(value) {
        if (!value) {
            this._onConnectionDroppedHandler = null;
        }
        else {
            this._onConnectionDroppedHandler = value;
        }
    }

    get socket() {
        return this._server;
    }

    get address() {
        return this._address;
    }

    get connections() {
        return this._connections;
    }

    connect() {
        if (this._server === null) {
            this._server = io(this._address);

            console.log("Server.connect() - server launched on address " + this._address);

            this._server.on("connection", (socket) => {
                const connection = new Connection(socket, this);

                this._connections.push(connection);

                if (this._onConnectionAddedHandler !== null) {
                    this._onConnectionAddedHandler(connection);
                }
            });

            return true;
        }

        return false;
    }

    disconnect() {
        if (this._server !== null) {
            this._server.disconnect();
            this._server = null;
            this._connections = new Array();

            return true;
        }

        return false;
    }

    remove(connection) {
        const index = this._connections.indexOf(connection);

        if (index >= 0) {
            this._connections.splice(index, 1);

            if (this._onConnectionDroppedHandler !== null) {
                this._onConnectionDroppedHandler(connection);
            }

            return true;
        }

        return false;
    }
}

module.exports = Server;