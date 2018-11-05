"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function InvalidNumberOfRPCParams() {
    return new Error('Invalid number of input parameters to RPC method');
}
exports.InvalidNumberOfRPCParams = InvalidNumberOfRPCParams;
function InvalidConnection(host) {
    return new Error("CONNECTION ERROR: Couldn't connect to node " + host + ".");
}
exports.InvalidConnection = InvalidConnection;
function InvalidProvider() {
    return new Error('Provider not set or invalid');
}
exports.InvalidProvider = InvalidProvider;
function InvalidResponse(result) {
    var message = !!result && !!result.error && !!result.error.message ? result.error.message : "Invalid JSON RPC response: " + JSON.stringify(result);
    return new Error(message);
}
exports.InvalidResponse = InvalidResponse;
function ConnectionTimeout(ms) {
    return new Error("CONNECTION TIMEOUT: timeout of " + ms + " ms achieved");
}
exports.ConnectionTimeout = ConnectionTimeout;
