/**
 * Read more about panda here: https://panda-suite.github.io/
 */

const panda = require("pandacash-core")

const startServer = async () => {
  const server = panda.server({
    // always the same mnemonic
    mnemonic: "evil sudden oven discover exist approve can catalog farm ivory mom rug",
    seedAccounts: true,
    enableLogs: false,
    debug: false
  });

  return await server.listen({port: 48332, walletPort: 48333});
}

module.exports = {
  startServer
}
