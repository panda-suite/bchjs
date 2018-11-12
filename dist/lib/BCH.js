"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider_1 = require("./HttpProvider");
var BCH = /** @class */ (function () {
    function BCH(blockchainProvider, walletProvider) {
        var _this = this;
        this.blockchainProvider = blockchainProvider;
        this.walletProvider = walletProvider;
        this.rpc = {};
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
        "getblockchaininfo",
        "getinfo",
        "generate",
        "generatetoaddress",
        // experimental:
        "getbestblockhash", "getblock", "getblockcount", "getblockhash", "getblockheader", "getchaintips", "getchaintxstats", "getdifficulty", "getmempoolancestors", "getmempooldescendants", "getmempoolentry txid", "getmempoolinfo", "getrawmempool", "gettxout", "gettxoutproof", "gettxoutsetinfo", "preciousblock", "pruneblockchain", "verifychain", "verifytxoutproof “proof”", "getmemoryinfo", "help", "stop", "uptime", "getblocktemplate", "getmininginfo", "getnetworkhashps", "prioritisetransaction", "submitblock", "addnode", "clearbanned", "disconnectnode", "getaddednodeinfo", "getconnectioncount", "getexcessiveblock", "getnettotals", "getnetworkinfo", "getpeerinfo", "listbanned", "ping", "setban", "setexcessiveblock", "setnetworkactive", "createrawtransaction", "decoderawtransaction", "decodescript", "getrawtransaction", "sendrawtransaction", "signrawtransaction", "createmultisig", "estimatefee", "estimatepriority", "estimatesmartfee", "estimatesmartpriority", "signmessagewithprivkey", "validateaddress", "verifymessage"
    ];
    BCH.walletMethods = [
        "importprivkey",
        "importaddress",
        "listunspent",
        "getwalletinfo",
        "getbalance",
        "sendtoaddress",
        "getaddressesbyaccount",
        "dumpprivkey",
        // experimental:
        "getbestblockhash", "getblock", "getblockcount", "getblockhash", "getblockheader", "getchaintips", "getchaintxstats", "getdifficulty", "getmempoolancestors", "getmempooldescendants", "getmempoolentry txid", "getmempoolinfo", "getrawmempool", "gettxout", "gettxoutproof", "gettxoutsetinfo", "preciousblock", "pruneblockchain", "verifychain", "verifytxoutproof “proof”", "getmemoryinfo", "help", "stop", "uptime", "getblocktemplate", "getmininginfo", "getnetworkhashps", "prioritisetransaction", "submitblock", "addnode", "clearbanned", "disconnectnode", "getaddednodeinfo", "getconnectioncount", "getexcessiveblock", "getnettotals", "getnetworkinfo", "getpeerinfo", "listbanned", "ping", "setban", "setexcessiveblock", "setnetworkactive", "createrawtransaction", "decoderawtransaction", "decodescript", "getrawtransaction", "sendrawtransaction", "signrawtransaction", "createmultisig", "estimatefee", "estimatepriority", "estimatesmartfee", "estimatesmartpriority", "signmessagewithprivkey", "validateaddress", "verifymessage"
    ];
    return BCH;
}());
exports.default = BCH;
