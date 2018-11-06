"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider_1 = require("./HttpProvider");
var Web3BCH = /** @class */ (function () {
    function Web3BCH(provider) {
        var _this = this;
        this.provider = provider;
        this.rpc = {};
        this.provider = provider || new HttpProvider_1.default('http://localhost:48332', 'regtest', 'regtest');
        Web3BCH.rpcMethods.forEach(function (method) {
            _this.rpc[method] = _this.methodFactory(method);
        });
    }
    Web3BCH.prototype.methodFactory = function (methodName) {
        var _this = this;
        return function () {
            var params = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                params[_i] = arguments[_i];
            }
            var _a;
            return (_a = _this.provider).send.apply(_a, [methodName].concat(params));
        };
    };
    Web3BCH.rpcMethods = [
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
    return Web3BCH;
}());
exports.default = Web3BCH;