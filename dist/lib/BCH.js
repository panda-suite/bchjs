"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider_1 = require("./HttpProvider");
var BCH = /** @class */ (function () {
    function BCH(blockchainProvider, walletProvider) {
        var _this = this;
        this.blockchainProvider = blockchainProvider;
        this.walletProvider = walletProvider;
        this.rpc = {};
        this.bch = {
        // createTransaction: (transactionObject: ITransactionObject) => this.createTransaction(transactionObject)
        };
        this.blockchainProvider = blockchainProvider || new HttpProvider_1.default('http://localhost:48332', 'regtest', 'regtest');
        this.walletProvider = walletProvider || new HttpProvider_1.default('http://localhost:48333', 'regtest', 'regtest');
        BCH.blockchainMethods.forEach(function (method) {
            _this.rpc[method] = _this.blockchainMethodFactory(method);
        });
        BCH.walletMethods.forEach(function (method) {
            _this.rpc[method] = _this.walletMethodFactory(method);
        });
    }
    BCH.prototype.blockchainMethodFactory = function (methodName) {
        var _this = this;
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var _a;
            return (_a = _this.blockchainProvider).send.apply(_a, [methodName].concat(params));
        };
    };
    BCH.prototype.walletMethodFactory = function (methodName) {
        var _this = this;
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var _a;
            return (_a = _this.walletProvider).send.apply(_a, [methodName].concat(params));
        };
    };
    BCH.prototype.blockchainConnected = function () {
        return this.blockchainProvider.isConnected();
    };
    BCH.prototype.walletConnected = function () {
        return this.walletProvider.isConnected();
    };
    BCH.blockchainMethods = [
        // From Bitcoin-ABC v0.18.3
        // == Blockchain ==
        "getbestblockhash",
        "getblock",
        "getblockchaininfo",
        "getblockcount",
        "getblockhash",
        "getblockheader",
        "getchaintips",
        "getchaintxstats",
        "getdifficulty",
        "getmempoolancestors",
        "getmempooldescendants",
        "getmempoolentry",
        "getmempoolinfo",
        "getrawmempool",
        "gettxout",
        "gettxoutproof",
        "gettxoutsetinfo",
        "preciousblock",
        "pruneblockchain",
        "verifychain",
        "verifytxoutproof",
        // == Control ==
        "getinfo",
        "getmemoryinfo",
        "help",
        "stop",
        "uptime",
        // == Generating ==
        "generate",
        "generatetoaddress",
        // == Mining ==
        "getblocktemplate",
        "getmininginfo",
        "getnetworkhashps",
        "prioritisetransaction",
        "submitblock",
        // == Network ==
        "addnode",
        "clearbanned",
        "disconnectnode",
        "getaddednodeinfo",
        "getconnectioncount",
        "getexcessiveblock",
        "getnettotals",
        "getnetworkinfo",
        "getpeerinfo",
        "listbanned",
        "ping",
        "setban",
        "setexcessiveblock",
        "setnetworkactive",
        // == Rawtransactions ==
        "combinerawtransaction",
        "createrawtransaction",
        "decoderawtransaction",
        "decodescript",
        "fundrawtransaction",
        "getrawtransaction",
        "sendrawtransaction",
        "signrawtransaction",
        // == Util ==
        "createmultisig",
        "estimatefee",
        "signmessagewithprivkey",
        "validateaddress",
        "verifymessage" // "address" "signature" "message"
    ];
    BCH.walletMethods = [
        // From Bitcoin-ABC v0.18.3
        // == Wallet ==
        "abandontransaction",
        "abortrescan",
        "addmultisigaddress",
        "backupwallet",
        "dumpprivkey",
        "dumpwallet",
        "encryptwallet",
        "getaccount",
        "getaccountaddress",
        "getaddressesbyaccount",
        "getbalance",
        "getnewaddress",
        "getrawchangeaddress",
        "getreceivedbyaccount",
        "getreceivedbyaddress",
        "gettransaction",
        "getunconfirmedbalance",
        "getwalletinfo",
        "importaddress",
        "importmulti",
        "importprivkey",
        "importprunedfunds",
        "importpubkey",
        "importwallet",
        "keypoolrefill",
        "listaccounts",
        "listaddressgroupings",
        "listlockunspent",
        "listreceivedbyaccount",
        "listreceivedbyaddress",
        "listsinceblock",
        "listtransactions",
        "listunspent",
        "listwallets",
        "lockunspent",
        "move",
        "removeprunedfunds",
        "rescanblockchain",
        "sendfrom",
        "sendmany",
        "sendtoaddress",
        "setaccount",
        "settxfee",
        "signmessage" // "address" "message"
    ];
    return BCH;
}());
exports.default = BCH;
