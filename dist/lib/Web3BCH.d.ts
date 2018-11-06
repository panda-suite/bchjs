import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';
export default class Web3BCH {
    private provider;
    constructor(provider: HttpProvider);
    rpc: {
        [method: string]: (...params: RPCParam[]) => Promise<any>;
    };
    static rpcMethods: string[];
    private methodFactory;
}
