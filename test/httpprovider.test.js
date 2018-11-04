const { assert } = require('chai');
const HttpProvider = require('../lib/httpprovider');

describe('HttpProvider', () => {
  const HOST = 'http://localhost:48332';
  const RPC_USER = 'regtest';
  const RPC_PASS = 'regtest';

  it('can connect to PandaCash blockchain', async () => {
    // when
    const provider = new HttpProvider(HOST, RPC_USER, RPC_PASS);

    // then
    assert.isTrue(await provider.isConnected());
  });
});
