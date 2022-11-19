import { FinalExecutionOutcome } from 'near-api-js/lib/providers'
import {
  IAccount,
  CallOverrides,
  CallOverridesPayable,
  NearContractBase,
} from '@neargen-js/core'

export type HelloNearSetGreetingInput = {
  message: string
}

class HelloNear extends NearContractBase {
  constructor(contractId: string, signerAccount: IAccount) {
    super(contractId, signerAccount)
  }

  public connect(account: IAccount): HelloNear {
    return new HelloNear(this.contractId, account)
  }

  public get_greeting(): Promise<string> {
    return this.functionView<object, string>({
      methodName: 'get_greeting',
      args: {},
    })
  }

  public async set_greeting(
    args: HelloNearSetGreetingInput,
    overrides?: CallOverrides
  ): Promise<FinalExecutionOutcome> {
    return this.functionCall<HelloNearSetGreetingInput>({
      methodName: 'set_greeting',
      overrides,
      args: args,
    })
  }
}

export default HelloNear
