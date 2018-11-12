import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';

const bch = require('bitcoincashjs');

export default class BCHRPC {
  constructor(private provider: HttpProvider) {
    BCHRPC.rpcMethods.forEach(method => {
      this.rpc[method] = this.methodFactory(method);
    });
  }

  public rpc: { [method: string]: (...params: RPCParam[]) => Promise<any> } = {};

  static rpcMethods = [
    "generate",
    "importaddress",
    "listunspent",
    "getwalletinfo",
    "getbalance",
    "sendtoaddress",
    "importprivkey",
    "getaddressesbyaccount",
    "dumpprivkey",

    // experimental:
    "getbestblockhash", "getblock", "getblockchaininfo", "getblockcount", "getblockhash", "getblockheader", "getchaintips", "getchaintxstats", "getdifficulty", "getmempoolancestors", "getmempooldescendants", "getmempoolentry txid", "getmempoolinfo", "getrawmempool", "gettxout", "gettxoutproof", "gettxoutsetinfo", "preciousblock", "pruneblockchain", "verifychain", "verifytxoutproof “proof”", "getinfo", "getmemoryinfo", "help", "stop", "uptime", "generatetoaddress", "getblocktemplate", "getmininginfo", "getnetworkhashps", "prioritisetransaction", "submitblock", "addnode", "clearbanned", "disconnectnode", "getaddednodeinfo", "getconnectioncount", "getexcessiveblock", "getnettotals", "getnetworkinfo", "getpeerinfo", "listbanned", "ping", "setban", "setexcessiveblock", "setnetworkactive", "createrawtransaction", "decoderawtransaction", "decodescript", "getrawtransaction", "sendrawtransaction", "signrawtransaction", "createmultisig", "estimatefee", "estimatepriority", "estimatesmartfee", "estimatesmartpriority", "signmessagewithprivkey", "validateaddress", "verifymessage"
  ];

  private methodFactory(methodName: string) {
    return (...params: RPCParam[]) => this.provider.send(methodName, ...params);
  }
}
