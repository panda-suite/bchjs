import { RPCParam } from '../interfaces';
export default class HttpProvider {
    private host;
    private user;
    private password;
    private timeout?;
    private headers?;
    constructor(host: string, user: string, password: string, timeout?: number, headers?: any);
    private rpcCounter;
    private preparePayload;
    private prepareRequest;
    send(method: string, ...params: RPCParam[]): Promise<any>;
    isConnected(): Promise<boolean>;
}
