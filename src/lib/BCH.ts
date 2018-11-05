import HttpProvider from './HttpProvider';

export default class BCH {
  constructor(private provider: HttpProvider) {
    this.provider = provider || new HttpProvider('http://localhost:48332', 'regtest', 'regtest');
  }

  public getinfo = this.methodFactory("getinfo");
  public importaddress = this.methodFactory("importaddress");
  public getblockchaininfo = this.methodFactory("getblockchaininfo");
  public generate = this.methodFactory("generate");

  private methodFactory(methodName: string) {
    return (...params: any[]) => this.provider.send(methodName, ...params);
  }
}
