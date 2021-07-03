const { Server } = require("./../../src/index");

const server = new Server(3000);
server.connect((connection) => {
    connection.send("print", "hello from server!");
});