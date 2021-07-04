const { Server } = require("./../../src/index");

const server = new Server(3000);
server.connect();

server.onClientAdded = (client) => {
    console.log("Client added with id " + client.id);
    client.send("print", "hello from server!");
};

server.onClientRemoved = (client) => {
    console.log("Client removed with id " + client.id);
};