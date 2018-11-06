const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const Web3BCH = require('../dist/lib/Web3BCH').default;

const panda = require("./helpers/panda");

let accounts;

describe('Web3BCH', () => {
  before(done => panda.runLocalNode((err, pandaCashCore) => {
    accounts = pandaCashCore.accounts;
    console.log(accounts)
    done();
  }));
  
  it('gets blockchain info', async () => {
    const web3bch = new Web3BCH(new HttpProvider('http://localhost:48334', 'regtest', 'regtest'));

    try {
        const response = await web3bch.rpc.getinfo();

        console.log(response);
    } catch (err) {
        console.log(err);
    }
  });

  after(() => process.exit());
});
