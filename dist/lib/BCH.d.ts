import HttpProvider from './HttpProvider';
export default class BCH {
    private provider;
    constructor(provider: HttpProvider);
    getinfo: (...params: any[]) => Promise<any>;
    importaddress: (...params: any[]) => Promise<any>;
    getblockchaininfo: (...params: any[]) => Promise<any>;
    generate: (...params: any[]) => Promise<any>;
    private methodFactory;
}
