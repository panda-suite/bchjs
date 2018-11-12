"use strict"

/**
 * Read more about panda here: https://panda-suite.github.io/
 */
const panda = require("pandacash-core");

const runLocalNode = (cb) => {
  const server = panda.server({
    // always the same mnemonic
    mnemonic: "evil sudden oven discover exist approve can catalog farm ivory mom rug",
    seedAccounts: true,
    enableLogs: false,
    debug: false
  });

  const core = server.listen({
      port: 48334,
      walletPort: 48335
  }, cb);
};

module.exports = {
  runLocalNode
}