const Util = require("../../util/util");

class Connection {
    constructor(socket, server) {
        this._socket = socket;
        this._server = server;
        this._id = Util.id();

        if (this._socket) {
            this._socket.on("disconnect", () => {
                server.remove(this);

                this._socket = null;
                this._server = null;
            });
        }
    }

    get id() {
        return this._id;
    }

    get server() {
        return this._server;
    }

    get socket() {
        return this._socket;
    }
}

module.exports = Connection;