# bch.js

`bch.js` is a lightweight wrapper around a Bitcoin Cash Node RPC. This allows you to easily create tooling around any Bitcoin Cash Node functionality. It uses an `HttpProvider` API similar to the one used by Ethereum's `web3.js`, so any developer familiar with Ethereum will feel right at home.

## Installation
```bash
npm install bchjs
```

## Usage
`bch.js` can be added to your application or tests, and be used accordingly. It can be configured to connect to any node such as the [`pandacash-cli`](https://github.com/panda-suite/pandacash-cli) local blockchain.
```javascript
const { BCH, HttpProvider } = require('bchjs);

const bch = new BCH(new HttpProvider(`http://127.0.0.1:${this.opts.port}`, 'regtest', 'regtest'));

await bch.getblockchaininfo();
```

## Supported RPC calls
Currently, the following RPC calls are supported:

* bch.getinfo()
* bch.getblockchaininfo()
* bch.importaddress(address)
* bch.generatetoaddress(blocks, address)
* bch.generate(blocks)

Other RPC calls will be added in a later version.
