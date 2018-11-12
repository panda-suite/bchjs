import HttpProvider from './HttpProvider';
import BCHRPC from './BCHRPC';
import { ITransactionObject } from '../interfaces';
const bch = require('bitcoincashjs');


export default class Web3BCH extends BCHRPC {
  constructor(provider: HttpProvider) {
    super(provider);
  }

  public defaultPrivateKey: string;
  
  public bch = {
    createTransaction: (transactionObject: ITransactionObject) => this.createTransaction(transactionObject)
  }

  private async createTransaction(transactionObject: ITransactionObject): Promise<any> {
    const Address = bch.Address;

    const address = new Address(transactionObject.from);
    console.log(address.toString(Address.CashAddrFormat))

    const unspentTxs = await this.rpc.listunspent(0, 20, [ transactionObject.from ]);

    const _utxo = unspentTxs[0];

    const utxo = {
      'txId': _utxo.txid,
      'outputIndex': 0,
      'address': transactionObject.from,
      'script': _utxo.scriptPubKey,
      'satoshis': transactionObject.value
    };

    // bitcoincashjs works only with the standard format!
    const transaction = new bch.Transaction()
      .from(utxo)
      .to(transactionObject.to, transactionObject.value)
      .sign(transactionObject.privateKey || this.defaultPrivateKey);

    return transaction;
  }
}
