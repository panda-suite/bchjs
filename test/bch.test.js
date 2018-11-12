const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const Web3BCH = require('../dist/lib/Web3BCH').default;

const panda = require("./helpers/panda");

let account;

describe('Web3BCH', () => {

  before(function(done) {
    this.timeout(6000);
  
    panda.runLocalNode((err, pandaCashCore) => {
      account = pandaCashCore.account;

      done();
    });
  });

  it('web3bch.rpc.getinfo', async () => {
    const web3bch = new Web3BCH(new HttpProvider('http://localhost:48334', 'regtest', 'regtest'));

    try {
        const response = await web3bch.rpc.getinfo();

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

  after(() => process.exit());
});
