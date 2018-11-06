const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;
const BCH = require('../dist/lib/BCH').default;

const panda = require("./helpers/panda");

let accounts;

describe('BCH', () => {
  before(done => panda.runLocalNode((err, pandaCashCore) => {
    accounts = pandaCashCore.accounts;
    console.log(accounts)
    done();
  }));
  
  it('gets blockchain info', async () => {
    const bch = new BCH(new HttpProvider('http://localhost:48334', 'regtest', 'regtest'));

    try {
        const response = await bch.rpc.getinfo();

        console.log(response);
    } catch (err) {
        console.log(err);
    }
  });

  after(() => process.exit());
});
