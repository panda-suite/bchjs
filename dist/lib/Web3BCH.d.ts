import HttpProvider from './HttpProvider';
import BCHRPC from './BCHRPC';
import { ITransactionObject } from '../interfaces';
export default class Web3BCH extends BCHRPC {
    constructor(provider: HttpProvider);
    defaultPrivateKey: string;
    bch: {
        createTransaction: (transactionObject: ITransactionObject) => Promise<any>;
    };
    private createTransaction;
}
