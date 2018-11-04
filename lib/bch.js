const HttpProvider = require('./httpprovider');

class BCH {
  constructor(provider) {
    this.provider = provider || new HttpProvider('http://localhost:48332', 'regtest', 'regtest');

    this.getinfo = this.methodFactory("getinfo");
    this.importaddress = this.methodFactory("importaddress");
    this.generatetoaddress = this.methodFactory("generatetoaddress");
    this.getblockchaininfo = this.methodFactory("getblockchaininfo");
    this.generate = this.methodFactory("generate");
  }

  methodFactory(methodName) {
    return (...params) => this.provider.send(methodName, ...params);
  }
}

module.exports = BCH;
