const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const Web3BCH = require('../dist/lib/Web3BCH').default;

const panda = require("./helpers/panda");

let accounts;

describe('Web3BCH', () => {
  before(done => panda.runLocalNode((err, pandaCashCore) => {
    accounts = pandaCashCore.accounts;

    done();
  }));

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

  after(() => process.exit());
});
