import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';

export default class BCH {
  constructor(private blockchainProvider: HttpProvider, private walletProvider: HttpProvider) {
    this.blockchainProvider = blockchainProvider || new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
    this.walletProvider = walletProvider || new HttpProvider('http://localhost:48333', 'regtest', 'regtest');

    BCH.blockchainMethods.forEach((method: string) => {
      this.rpc[method] = this.blockchainMethodFactory(method);
    });

    BCH.walletMethods.forEach(method => {
      this.rpc[method] = this.walletMethodFactory(method);
    });
  }

  public rpc: { [method: string]: (...params: RPCParam[]) => Promise<any> } = {};

  static blockchainMethods = [
    // From Bitcoin-ABC v0.18.3
    // == Blockchain ==
    "getbestblockhash",
    "getblock", // "blockhash" ( verbosity )
    "getblockchaininfo",
    "getblockcount",
    "getblockhash", // height
    "getblockheader", // "hash" ( verbose )
    "getchaintips",
    "getchaintxstats", // ( nblocks blockhash )
    "getdifficulty",
    "getmempoolancestors", // txid (verbose)
    "getmempooldescendants", // txid (verbose)
    "getmempoolentry", // txid
    "getmempoolinfo",
    "getrawmempool", // ( verbose )
    "gettxout", // "txid" n ( include_mempool )
    "gettxoutproof", // ["txid",...] ( blockhash )
    "gettxoutsetinfo",
    "preciousblock", // "blockhash"
    "pruneblockchain",
    "verifychain", // ( checklevel nblocks )
    "verifytxoutproof", // "proof"

    // == Control ==
    "getinfo",
    "getmemoryinfo", // ("mode")
    "help", // ( "command" )
    "stop",
    "uptime",

    // == Generating ==
    "generate", // nblocks ( maxtries )
    "generatetoaddress", // nblocks address (maxtries)

    // == Mining ==
    "getblocktemplate", // ( TemplateRequest )
    "getmininginfo",
    "getnetworkhashps", // ( nblocks height )
    "prioritisetransaction", // <txid> <priority delta> <fee delta>
    "submitblock", // "hexdata" ( "jsonparametersobject" )

    // == Network ==
    "addnode", // "node" "add|remove|onetry"
    "clearbanned",
    "disconnectnode", // "[address]" [nodeid]
    "getaddednodeinfo", // ( "node" )
    "getconnectioncount",
    "getexcessiveblock",
    "getnettotals",
    "getnetworkinfo",
    "getpeerinfo",
    "listbanned",
    "ping",
    "setban", // "subnet" "add|remove" (bantime) (absolute)
    "setexcessiveblock", // blockSize
    "setnetworkactive", // true|false

    // == Rawtransactions ==
    "combinerawtransaction", // ["hexstring",...]
    "createrawtransaction", // [{"txid":"id","vout":n},...] {"address":amount,"data":"hex",...} ( locktime )
    "decoderawtransaction", // "hexstring"
    "decodescript", // "hexstring"
    "fundrawtransaction", // "hexstring" ( options )
    "getrawtransaction", // "txid" ( verbose )
    "sendrawtransaction", // "hexstring" ( allowhighfees )
    "signrawtransaction", // "hexstring" ( [{"txid":"id","vout":n,"scriptPubKey":"hex","redeemScript":"hex"},...] ["privatekey1",...] sighashtype )

    // == Util ==
    "createmultisig", // nrequired ["key",...]
    "estimatefee", // nblocks
    "signmessagewithprivkey", // "privkey" "message"
    "validateaddress", // "address"
    "verifymessage" // "address" "signature" "message"
]

  static walletMethods = [
    // From Bitcoin-ABC v0.18.3
    // == Wallet ==
    "abandontransaction", // "txid"
    "abortrescan",
    "addmultisigaddress", // nrequired ["key",...] ( "account" )
    "backupwallet", // "destination"
    "dumpprivkey", // "address"
    "dumpwallet", // "filename"
    "encryptwallet", // "passphrase"
    "getaccount", // "address"
    "getaccountaddress", // "account"
    "getaddressesbyaccount", // "account"
    "getbalance", // ( "account" minconf include_watchonly )
    "getnewaddress", // ( "account" )
    "getrawchangeaddress",
    "getreceivedbyaccount", // "account" ( minconf )
    "getreceivedbyaddress", // "address" ( minconf )
    "gettransaction", // "txid" ( include_watchonly )
    "getunconfirmedbalance",
    "getwalletinfo",
    "importaddress", // "address" ( "label" rescan p2sh )
    "importmulti", // "requests" ( "options" )
    "importprivkey", // "privkey" ( "label" ) ( rescan )
    "importprunedfunds",
    "importpubkey", // "pubkey" ( "label" rescan )
    "importwallet", // "filename"
    "keypoolrefill", // ( newsize )
    "listaccounts", // ( minconf include_watchonly)
    "listaddressgroupings",
    "listlockunspent",
    "listreceivedbyaccount", // ( minconf include_empty include_watchonly)
    "listreceivedbyaddress", // ( minconf include_empty include_watchonly address_filter )
    "listsinceblock", // ( "blockhash" target_confirmations include_watchonly)
    "listtransactions", // ( "account" count skip include_watchonly)
    "listunspent", // ( minconf maxconf  ["addresses",...] [include_unsafe] [query_options])
    "listwallets",
    "lockunspent", // unlock ([{"txid":"txid","vout":n},...])
    "move", // "fromaccount" "toaccount" amount ( minconf "comment" )
    "removeprunedfunds", // "txid"
    "rescanblockchain", // ("start_height") ("stop_height")
    "sendfrom", // "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )
    "sendmany", // "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )
    "sendtoaddress", // "address" amount ( "comment" "comment_to" subtractfeefromamount )
    "setaccount", // "address" "account"
    "settxfee", // amount
    "signmessage" // "address" "message"
  ]

  private blockchainMethodFactory(methodName: string) {
    return (...params: RPCParam[]) => this.blockchainProvider.send(methodName, ...params);
  }

  private walletMethodFactory(methodName: string) {
    return (...params: RPCParam[]) => this.walletProvider.send(methodName, ...params);
  }

  public blockchainConnected(): Promise<boolean> {
    return this.blockchainProvider.isConnected();
  }

  public walletConnected(): Promise<boolean> {
    return this.walletProvider.isConnected();
  }
}
