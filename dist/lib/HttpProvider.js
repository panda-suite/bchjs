"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var errors = require("./errors");
var HttpProvider = /** @class */ (function () {
    function HttpProvider(host, user, password, timeout, headers) {
        this.host = host;
        this.user = user;
        this.password = password;
        this.timeout = timeout;
        this.headers = headers;
        this.rpcCounter = 0;
        this.host = host || 'http://localhost:48332';
        this.user = user || 'regtest';
        this.password = password || 'regtest';
        this.timeout = timeout || 0;
        this.headers = headers || {};
    }
    HttpProvider.prototype.preparePayload = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var payload = {
            jsonrpc: '1.0',
            id: this.rpcCounter++,
            method: method,
            params: params || undefined
        };
        return JSON.stringify(payload);
    };
    HttpProvider.prototype.prepareRequest = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        var payload = this.preparePayload.apply(this, [method].concat(params));
        var headers = this.headers;
        headers['Content-Type'] = 'text/plain';
        var req = {
            method: 'POST',
            url: this.host,
            auth: {
                username: this.user,
                password: this.password
            },
            timeout: this.timeout,
            headers: headers,
            data: payload
        };
        return req;
    };
    HttpProvider.prototype.send = function (method) {
        var params = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            params[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var request, response, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = this.prepareRequest.apply(this, [method].concat(params));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default(request)];
                    case 2:
                        response = (_a.sent());
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        return [2 /*return*/, errors.InvalidResponse(e_1)];
                    case 4:
                        if (response.error) {
                            return [2 /*return*/, errors.InvalidResponse(response)];
                        }
                        return [2 /*return*/, response.data.result];
                }
            });
        });
    };
    HttpProvider.prototype.isConnected = function () {
        return __awaiter(this, void 0, void 0, function () {
            var info, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.send('getinfo')];
                    case 1:
                        info = _a.sent();
                        return [2 /*return*/, !!info];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return HttpProvider;
}());
exports.default = HttpProvider;
