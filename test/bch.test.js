const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const BCH = require('../dist/lib/BCH').default;

const panda = require("./helpers/panda");

let accounts;

describe('BCH', () => {
  before(async () => {
    const pandaServer = await panda.startServer();
    accounts = pandaServer.accounts;
  });

  it('bch.rpc.getinfo', async () => {
    const bch = new BCH(
      new HttpProvider('http://localhost:48332', 'regtest', 'regtest'),
      new HttpProvider('http://localhost:48333', 'regtest', 'regtest')
    );

    try {
      const response = await bch.rpc.getinfo();

      assert.deepEqual(Object.keys(response), [
        "version",
        "protocolversion",
        "walletversion",
        "balance",
        "blocks",
        "timeoffset",
        "connections",
        "proxy",
        "difficulty",
        "testnet",
        "keypoololdest",
        "keypoolsize",
        "unlocked_until",
        "paytxfee",
        "relayfee",
        "errors"
      ]);
    } catch (err) {
      console.log(err);
    }
  });

  after(() => process.exit());
});
