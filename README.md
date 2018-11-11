# Bitcoin Cash JavaScript API

`bch.js` is a lightweight wrapper around a Bitcoin Cash Node RPC. This allows you to easily create tooling around any Bitcoin Cash Node functionality. It uses an `HttpProvider` API similar to the one used by Ethereum's `web3.js`, so any developer familiar with Ethereum will feel right at home.

## Installation
```bash
npm install bchjs
```

## Usage
```javascript
const { Web3BCH, HttpProvider } = require('bchjs');

const web3bch = new Web3BCH(new HttpProvider('http://localhost:48332', 'regtest', 'regtest'));

await web3bch.rpc.getblockchaininfo();
```

## Pandacash and bch.js
`bch.js` can be added to your application or tests, and be used accordingly. It can be configured to connect to any node such as the [`pandacash-cli`](https://github.com/panda-suite/pandacash-cli) local blockchain.

```javascript
const panda = require("pandacash-cli");
const { Web3BCH, HttpProvider } = require('bchjs');

const server = panda.server();

server.listen(48334, (err) => {
    const web3bch = new Web3BCH(new HttpProvider('http://localhost:48334'));

    await web3bch.rpc.getblockchaininfo();
});
```

## Supported RPC calls
Currently, the following RPC calls are supported:

* web3bch.rpc.getinfo
* web3bch.rpc.getblockchaininfo
* web3bch.rpc.importaddress
* web3bch.rpc.generatetoaddress
* web3bch.rpc.generate
* web3bch.rpc.importaddress
* web3bch.rpc.listunspent
* web3bch.rpc.getwalletinfo
* web3bch.rpc.getbalance
* web3bch.rpc.sendtoaddress
* web3bch.rpc.importprivkey
* web3bch.rpc.getaddressesbyaccount
* web3bch.rpc.dumpprivkey

Other RPC calls will be added in a later version.
