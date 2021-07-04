const { ServerRPC } = require("./../../src/index");

const server = new ServerRPC();
server.connect(3000);

// define a local function on the server
server.local.sayHello = (append) => {
    return "Server Says " + append;
};