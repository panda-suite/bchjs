const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const BCH = require('../dist/lib/BCH').default;

const panda = require("./helpers/panda");

let account;


describe('BCH', () => {
  before(async function () {
    this.timeout(5000);
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

  it('bch.rpc.getbalance', async () => {
    const bch = new BCH(
      new HttpProvider('http://localhost:48332', 'regtest', 'regtest'),
      new HttpProvider('http://localhost:48333', 'regtest', 'regtest')
    );

    try {
      const balance = await bch.rpc.getbalance();

      assert(balance, 11650);
    } catch (err) {
      console.log(err);
    }
  });
  /*
  it('web3bch.bch.createTransaction', async () => {
    const web3bch = new Web3BCH(new HttpProvider('http://localhost:48335', 'panda', 'panda'));

    web3bch.defaultPrivateKey = account.keyPairs[0].privateKey;

    let response;

    try {
        response = await web3bch.bch.createTransaction({
          from: account.keyPairs[0].cashAddress,
          to: account.keyPairs[1].cashAddress,
          value: 50,
        });
    } catch (err) {
        console.log(err);
    }

    console.log(response);
  });
  */
  after(() => process.exit());
});
