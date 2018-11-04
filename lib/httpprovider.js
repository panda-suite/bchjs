const axios = require('axios');

class HttpProvider {
  constructor(host, user, password, timeout, headers) {
    this.host = host || 'http://localhost:8545';
    this.user = user;
    this.password = password;
    this.timeout = timeout || 0;
    this.headers = headers || {};
    this.rpcCounter = 0;
  }

  preparePayload(method, ...params) {
    const payload = {
      jsonrpc: '1.0',
      id: this.rpcCounter++,
      method: method,
      params: params || undefined
    };

    return JSON.stringify(payload);
  }

  prepareRequest(method, ...params) {
    const payload = this.preparePayload(method, ...params);

    let headers = this.headers;
    headers['Content-Type'] = 'text/plain';

    const req = {
      method: 'POST',
      url: this.host,
      auth: {
        username: this.username,
        password: this.password
      },
      timeout: this.timeout,
      headers: headers,
      data: payload
    };

    return req;
  }

  async send(method, ...params) {
    const request = this.prepareRequest(method, ...params);

    try {
      const response = axios(request);
      return response.data;
    } catch (e) {
      // TODO: Handle error
      console.log(e);
    }
  }

  async isConnected() {
    try {
      await this.send('getinfo');
      return true;
    } catch (e) {
      return false;
    }
  }
}

module.exports = HttpProvider;
