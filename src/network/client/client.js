const io = require("socket.io");

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
            this._socket = io(this._address);

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
}

module.exports = Client;