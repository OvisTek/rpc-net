const { ClientRPC } = require("./../../src/index");

const client = new ClientRPC();
client.connect("http://192.168.1.3", 3000);

// call a pre-defined function on the remote server
client.remote.sayHello("Hello World!").then((value) => {
    console.log(value);
}).catch((err) => {
    console.error(err);
});