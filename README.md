# Bitcoin Cash JavaScript API

`bch.js` is a lightweight wrapper around a Bitcoin Cash Node RPC. This allows you to easily create tooling around any Bitcoin Cash Node functionality. It uses an `HttpProvider` API similar to the one used by Ethereum's `web3.js`, so any developer familiar with Ethereum will feel right at home.

## Installation
```bash
npm install bchjs
```

## Usage
```javascript
const { Web3BCH, HttpProvider } = require('bchjs');

const httpNodeProvider = new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
const httpNodeWalletProvider = new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
const web3bch = new Web3BCH(httpNodeProvider, httpNodeWalletProvider);

await web3bch.rpc.getblockchaininfo();
```

## Pandacash and bchjs
`bch.js` can be added to your application or tests. It can be configured to connect to any node. You can use [`pandacash-core`](https://github.com/panda-suite/pandacash-core) local blockchain for local development and testing. 

```javascript
const panda = require("pandacash-core");
const { Web3BCH, HttpProvider } = require('bchjs');

const server = panda.server();

await server.listen(48334);

const web3bch = new Web3BCH(new HttpProvider('http://localhost:48334'));

await web3bch.rpc.getblockchaininfo();
```

## Supported RPC calls
All rpc methods have been added.