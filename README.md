<h3 align="center">
  <img src="graphics/icon.png?raw=true" alt="OvisTek Logo" width="150">
</h3>

[![Twitter: @OvisTek](https://img.shields.io/badge/contact-OvisTek-blue.svg?style=flat)](https://twitter.com/OvisTek)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/070f1a541d9d4dd19e2a07f226bdea03)](https://www.codacy.com/gh/OvisTek/rpc-net/dashboard?utm_source=github.com&utm_medium=referral&utm_content=OvisTek/rpc-net&utm_campaign=Badge_Grade)
[![install size](https://packagephobia.com/badge?p=@ovistek/rpc-net)](https://packagephobia.com/result?p=@ovistek/rpc-net)
[![NPM](https://img.shields.io/npm/v/@ovistek/rpc-net)](https://www.npmjs.com/package/@ovistek/rpc-net)
[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat)](LICENSE)

#### **Lightweight JS Remote Procedure Call (RPC) Framework using Socket.io**

* * *

**_rpc-net_** allows defining JavaScript/TypeScript functions on a Server or Client environment and executing them from either context. Built using [Socket.io](https://socket.io/).

#### _Installation_

-   Install using [npm](https://www.npmjs.com/package/@ovistek/rpc-net)

```console
npm install @ovistek/rpc-net
```

#### _Usage_

Define server-side code using the following snippet and call it `server.js`

```javascript
const { ServerRPC } = require("@ovistek/rpc-net");

// host a local server on port 3000
const server = new ServerRPC();
server.connect(3000);

// define a local function on the server
// this will be called by the client
server.local.sayHello = (append) => {
    return "Server Says " + append;
};
```

Define client-side code using the following snippet and call it `client.js`

```javascript
const { ClientRPC } = require("@ovistek/rpc-net");

const client = new ClientRPC();
// connect to a hosted local server on port 3000
client.connect("http://localhost", 3000);

// call a pre-defined function on the remote server
client.remote.sayHello("Hello World!").then((value) => {
    console.log(value);
}).catch((err) => {
    console.error(err);
});
```

-   Run the server via `node server.js`
-   Run the client via `node client.js`

Output should be `Server Says Hello World!`

#### _Acknowledgements_

This tool relies on the following open source projects.

-   [Socket.io](https://socket.io/)
