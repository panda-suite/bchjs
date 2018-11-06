import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';
export default class Web3BCH {
  constructor(private provider: HttpProvider) {
    this.provider = provider || new HttpProvider('http://localhost:48332', 'regtest', 'regtest');

    Web3BCH.rpcMethods.forEach(method => {
      this.rpc[method] = this.methodFactory(method);
    });
  }

  public rpc: { [method: string]: (...params: RPCParam[]) => Promise<any> } = {};

  static rpcMethods = [
    "getinfo",
    "generatetoaddress",
    "getblockchaininfo",
    "generate",
    "importaddress",
    "listunspent",
    "getwalletinfo",
    "getbalance",
    "sendtoaddress",
    "importprivkey",
    "getaddressesbyaccount",
    "dumpprivkey"
  ];

  private methodFactory(methodName: string) {
    return (...params: RPCParam[]) => this.provider.send(methodName, ...params);
  }
}
