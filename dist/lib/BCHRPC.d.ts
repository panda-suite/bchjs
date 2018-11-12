import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';
export default class BCHRPC {
    private provider;
    constructor(provider: HttpProvider);
    rpc: {
        [method: string]: (...params: RPCParam[]) => Promise<any>;
    };
    static rpcMethods: string[];
    private methodFactory;
}
