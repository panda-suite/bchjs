import axios from 'axios';
import { RPCParam } from '../interfaces';
import * as errors from './errors';

export default class HttpProvider {
  constructor(private host: string, private user: string, private password: string, private timeout?: number, private headers?: any) {
    this.host = host || 'http://localhost:48332';
    this.user = user || 'regtest';
    this.password = password || 'regtest';
    this.timeout = timeout || 0;
    this.headers = headers || {};
  }

  private rpcCounter: number = 0;

  private preparePayload(method: string, ...params: RPCParam[]) {
    const payload = {
      jsonrpc: '1.0',
      id: this.rpcCounter++,
      method: method,
      params: params || undefined
    };

    return JSON.stringify(payload);
  }

  private prepareRequest(method: string, ...params: RPCParam[]) {
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

  public async send(method: string, ...params: RPCParam[]) {
    const request = this.prepareRequest(method, ...params);

    let response: { error: any, data: any };

    try {
      response = (await axios(request)) as any;
    } catch (e) {
      return errors.InvalidResponse(e);
    }

    if (response.error) {
      return errors.InvalidResponse(response);
    }

    return response.data.result;
  }

  public async isConnected() {
    try {
      const info = await this.send('getinfo');

      return !!info;
    } catch (e) {
      return false;
    }
  }
}
