# bch.js

`bch.js` is a lightweight wrapper around a Bitcoin Cash Node RPC. This allows you to easily create tooling around any Bitcoin Cash Node functionality. It uses an `HttpProvider` API similar to the one used by Ethereum's `web3.js`, so any developer familiar with Ethereum will feel right at home.

## Installation
```bash
npm install bchjs
```

## Usage
`bch.js` can be added to your application or tests, and be used accordingly. It can be configured to connect to any node such as the [`pandacash-cli`](https://github.com/panda-suite/pandacash-cli) local blockchain.
```javascript
const { BCH, HttpProvider } = require('bchjs');

const bch = new BCH(new HttpProvider('http://localhost:48332', 'regtest', 'regtest'));

await bch.rpc.getblockchaininfo();
```

## Supported RPC calls
Currently, the following RPC calls are supported:

* bch.rpc.getinfo()
* bch.rpc.getblockchaininfo()
* bch.rpc.importaddress(address)
* bch.rpc.generatetoaddress(blocks, address)
* bch.rpc.generate(blocks)
* bch.rpc.importaddress()
* bch.rpc.listunspent()
* bch.rpc.getwalletinfo()
* bch.rpc.getbalance()
* bch.rpc.sendtoaddress()
* bch.rpc.importprivkey()
* bch.rpc.getaddressesbyaccount()
* bch.rpc.dumpprivkey()

Other RPC calls will be added in a later version.
