const { ClientRPC } = require("./../../src/index");

const client = new ClientRPC();
client.connect("http://192.168.1.3", 3000);

client.local.myFunc = () => {

};

client.local.myFunc = () => {

};