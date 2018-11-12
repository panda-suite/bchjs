import HttpProvider from './HttpProvider';
import { RPCParam } from '../interfaces';
export default class BCH {
    private blockchainProvider;
    private walletProvider;
    constructor(blockchainProvider: HttpProvider, walletProvider: HttpProvider);
    rpc: {
        [method: string]: (...params: RPCParam[]) => Promise<any>;
    };
    static blockchainMethods: string[];
    static walletMethods: string[];
    private blockchainMethodFactory;
    private walletMethodFactory;
    blockchainConnected(): Promise<boolean>;
    walletConnected(): Promise<boolean>;
}
