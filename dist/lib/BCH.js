"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpProvider_1 = require("./HttpProvider");
var BCH = /** @class */ (function () {
    function BCH(provider) {
        this.provider = provider;
        this.getinfo = this.methodFactory("getinfo");
        this.importaddress = this.methodFactory("importaddress");
        this.getblockchaininfo = this.methodFactory("getblockchaininfo");
        this.generate = this.methodFactory("generate");
        this.provider = provider || new HttpProvider_1.default('http://localhost:48332', 'regtest', 'regtest');
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
    return BCH;
}());
exports.default = BCH;
