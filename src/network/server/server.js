const io = require("socket.io");
const Connection = require("./connection");

class Server {
    constructor(port) {
        this._address = port;
        this._server = null;
        this._connections = new Array();
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

    connect(connectionListener = null) {
        if (this._server === null) {
            this._server = io(this._address);

            console.log("Server.connect() - server launched on address " + this._address);

            this._server.on("connection", (socket) => {
                const connection = new Connection(socket, this);

                this._connections.push(connection);

                if (connectionListener !== null) {
                    connectionListener(connection);
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

            return true;
        }

        return false;
    }

    remove(connection) {
        const index = this._connections.indexOf(connection);

        if (index >= 0) {
            this._connections.splice(index, 1);

            return true;
        }

        return false;
    }
}

module.exports = Server;