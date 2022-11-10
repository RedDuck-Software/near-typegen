import { BN } from 'bn.js';
import { Account, Contract, Near } from 'near-api-js';
import { FinalExecutionOutcome } from 'near-api-js/lib/providers';

export type NearBigint = number | string | bigint;

export class CallOverrides {
  gas?: NearBigint;
}

export class CallOverridesPayable {
  attachedDeposit?: NearBigint;
}

export abstract class NearContractBase {
  private _contractId: string;
  private _signer?: Account;

  constructor(contractId: string, signerAccount?: Account) {
    this._contractId = contractId;
    this._signer = signerAccount;
  }

  public get contractId() {
    return this._contractId;
  }

  public get signer() {
    return this._signer;
  }

  public abstract connect(account: Account): NearContractBase;

  protected functionCall<TArgs extends object = object>({
    methodName,
    args,
    overrides = {},
  }: {
    methodName: string;
    args?: TArgs;
    overrides?: CallOverrides & CallOverridesPayable;
  }) {
    if (!this._signer) throw new Error('Signer is not defined');

    return this._signer.functionCall({
      contractId: this.contractId,
      methodName,
      args: args ?? {},
      gas: overrides?.gas ? new BN(overrides?.gas?.toString()) : undefined,
      attachedDeposit: overrides?.attachedDeposit ? new BN(overrides?.attachedDeposit?.toString()) : undefined,
    });
  }

  protected functionView<TArgs extends object = object, TReturn = unknown>({
    methodName,
    args,
  }: {
    methodName: string;
    args?: TArgs;
  }): Promise<TReturn> {
    if (!this._signer) throw new Error('Signer is not defined');

    return this._signer.viewFunctionV2({
      contractId: this.contractId,
      methodName,
      args: args ?? {},
      parse: (resp) => {
        return JSON.parse(Buffer.from(resp).toString('utf8'));
      },
      stringify: (req) => {
        return Buffer.from(JSON.stringify(req), 'utf8');
      },
    });
  }
}

export class NearContract extends NearContractBase {
  constructor(contractId: string, signerAccount: Account) {
    super(contractId, signerAccount);
  }

  public connect(account: Account): NearContract {
    return new NearContract(this.contractId, account);
  }

  public call = new Proxy(
    {} as { [key: string]: (args: object, overrides?: CallOverrides) => Promise<FinalExecutionOutcome> },
    {
      get: (_, key) => {
        return (args: object, overrides?: CallOverrides) => {
          return this.functionCall({ methodName: key as string, args, overrides });
        };
      },
    },
  );

  public view = new Proxy({} as { [key: string]: (args: object) => Promise<FinalExecutionOutcome> }, {
    get: (_, key) => {
      return (args: object) => {
        return this.functionView({ methodName: key as string, args });
      };
    },
  });
}
