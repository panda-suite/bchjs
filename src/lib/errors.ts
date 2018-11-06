
export function InvalidNumberOfRPCParams() {
  return new Error('Invalid number of input parameters to RPC method');
}

export function InvalidConnection(host: string) {
  return new Error(`CONNECTION ERROR: Couldn't connect to node ${host}.`);
}

export function InvalidProvider() {
  return new Error('Provider not set or invalid');
}

export function InvalidResponse(result: any) {
  var message = !!result && !!result.error && !!result.error.message ? result.error.message : `Invalid JSON RPC response: ${JSON.stringify(result)}`;
  return new Error(message);
}

export function ConnectionTimeout(ms: number) {
  return new Error(`CONNECTION TIMEOUT: timeout of ${ms} ms achieved`);
}
