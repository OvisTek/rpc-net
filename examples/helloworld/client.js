const { Client } = require("./../../src/index");

const client = new Client("http://192.168.1.3", 3000);
client.connect();

client.socket.on("print", (data) => {
    console.log(data);
});