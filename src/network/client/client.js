const io = require("socket.io-client");

class Client {
    constructor(address, port = null) {
        this._address = port === null ? address : address + ":" + port;
        this._socket = null;
    }

    get socket() {
        return this._socket;
    }

    get address() {
        return this._address;
    }

    connect() {
        if (this._socket === null) {
            console.log("Client.connect() - attempting to connect to address " + this._address);
            this._socket = io(this._address);

            this._socket.on("disconnect", () => {
                this.disconnect();
            });

            return true;
        }

        return false;
    }

    disconnect() {
        if (this._socket !== null) {
            this._socket.disconnect();
            this._socket = null;

            return true;
        }

        return false;
    }

    send(event, data) {
        if (this._socket !== null) {
            this._socket.emit(event, data);
        }
    }
}

module.exports = Client;