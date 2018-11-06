"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider_1 = require("./HttpProvider");
var BCH = /** @class */ (function () {
    function BCH(provider) {
        var _this = this;
        this.provider = provider;
        this.rpc = {};
        this.provider = provider || new HttpProvider_1.default('http://localhost:48332', 'regtest', 'regtest');
        BCH.rpcMethods.forEach(function (method) {
            _this.rpc[method] = _this.methodFactory(method);
        });
    }
    BCH.prototype.methodFactory = function (methodName) {
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
    BCH.rpcMethods = [
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
    return BCH;
}());
exports.default = BCH;
