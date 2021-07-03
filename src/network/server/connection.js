class Connection {
    constructor(server, socket) {
        this._socket = socket;
        this._server = server;

        if (this._socket) {
            this._socket.on("disconnect", () => {
                server.remove(this);

                this._socket = null;
                this._server = null;
            });
        }
    }

    get server() {
        return this._server;
    }

    get socket() {
        return this._socket;
    }

    send(event, data) {
        if (this._socket !== null) {
            this._socket.emit(event, data);
        }
    }
}

module.exports = Connection;