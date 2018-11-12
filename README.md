# Bitcoin Cash JavaScript API
`bch.js` is a lightweight wrapper around a Bitcoin Cash Node RPC. This allows you to easily create tooling around any Bitcoin Cash Node functionality. It uses an `HttpProvider` API similar to the one used by Ethereum's `web3.js`, so any developer familiar with Ethereum will feel right at home.

## Installation
```bash
npm install bchjs
```

## Usage
```javascript
const { BCH, HttpProvider } = require('bchjs');

const httpBlockchainProvider = new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
const httpWalletProvider = new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
const bch = new BCH(httpBlockchainProvider, httpWalletProvider);

await bch.rpc.getblockchaininfo();
```

## Pandacash and bchjs
`bch.js` can be added to your application or tests. It can be configured to connect to any node. You can use [`pandacash-core`](https://github.com/panda-suite/pandacash-core) local blockchain for local development and testing. 

```javascript
const panda = require("pandacash-core");
const { BCH, HttpProvider } = require('bchjs');

const server = await panda.server().listen({port: 48332, walletPort: 48333});
const bch = new BCH(
    new HttpProvider('http://localhost:48332'),
    new HttpProvider('http://localhost:48333')
);

await bch.rpc.getblockchaininfo();
```

## Supported RPC calls
All rpc methods have been added.
