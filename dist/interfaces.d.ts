export declare type RPCParam = (string | number | string[]);
export interface ITransactionObject {
    from: string;
    to: string;
    value: string;
    privateKey?: string;
}
