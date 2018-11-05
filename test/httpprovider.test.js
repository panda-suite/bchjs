const { assert } = require('chai');
const HttpProvider = require('../dist/lib/HttpProvider').default;

const panda = require("./helpers/panda");

describe('HttpProvider', () => {
  const HOST = 'http://localhost:48332';
  const RPC_USER = 'regtest';
  const RPC_PASS = 'regtest';

  before(panda.runLocalNode);

  it('can connect to PandaCash blockchain', async () => {
    // when
    const provider = new HttpProvider(HOST, RPC_USER, RPC_PASS);

    // then
    assert.isTrue(await provider.isConnected());
  });

  after(() => process.exit());
});
