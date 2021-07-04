const { ServerRPC } = require("./../../src/index");

const server = new ServerRPC();
server.connect(3000);