const io = require("socket.io");
const Connection = require("./connection");

class Server {
    constructor(address, port = null) {
        this._address = port === null ? address : address + ":" + port;
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

    connect() {
        if (this._server === null) {
            this._server = io.listen(this._address);

            this._server.on("connection", (socket) => {
                const connection = new Connection(socket);

                this._connections.push(connection);
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
}

module.exports = Server;