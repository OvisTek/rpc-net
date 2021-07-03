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

    get serverInstance() {
        return this._server;
    }

    get socketInstance() {
        return this._socket;
    }

    send(event, data) {
        if (this._socket !== null) {
            this._socket.emit(event, data);
        }
    }
}

module.exports = Connection;