import axios from 'axios';

export default class HttpProvider {
  constructor(private host: string, private user: string, private password: string, private timeout?: number, private headers?: any) {
    this.host = host || 'http://localhost:48332';
    this.user = user || 'regtest';
    this.password = password || 'regtest';
    this.timeout = timeout || 0;
    this.headers = headers || {};
  }

  private rpcCounter: number = 0;

  private preparePayload(method: string, ...params: any[]) {
    const payload = {
      jsonrpc: '1.0',
      id: this.rpcCounter++,
      method: method,
      params: params || undefined
    };

    return JSON.stringify(payload);
  }

  private prepareRequest(method: string, ...params: any[]) {
    const payload = this.preparePayload(method, ...params);

    let headers = this.headers;
    headers['Content-Type'] = 'text/plain';

    const req = {
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
  }

  public async send(method: string, ...params: any[]) {
    const request = this.prepareRequest(method, ...params);

    try {
      const response = axios(request);

      return response.data;
    } catch (e) {
      // TODO: Handle error
      console.log(e);
    }
  }

  public async isConnected() {
    try {
      await this.send('getinfo');
      return true;
    } catch (e) {
      return false;
    }
  }
}