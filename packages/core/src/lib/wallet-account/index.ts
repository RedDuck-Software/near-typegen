import { Account, Wallet } from "@near-wallet-selector/core";
import { JsonRpcProvider } from "near-api-js/lib/providers"
import { ChangeFunctionCallOptions, ViewFunctionCallOptions } from "near-api-js-1-1-0/lib/account";
import { FinalExecutionOutcome } from "near-api-js-1-1-0/lib/providers";
import { CodeResult } from "near-api-js-1-1-0/lib/providers/provider";
import { IAccount } from "../gen-types";

const MAX_TX_TGAS = '300000000000000';

export class WalletAccount implements IAccount {
    constructor(
        public account: Account,
        public rpcProvider: JsonRpcProvider,
        public wallet?: Wallet,
    ) {
    }

    public get accountId(): string {
        return this.account.accountId
    }

    public async functionCall({
        contractId,
        methodName,
        args,
        gas,
        attachedDeposit,
        walletMeta,
        walletCallbackUrl,
        stringify,
        jsContract
    }: ChangeFunctionCallOptions): Promise<FinalExecutionOutcome> {
        if (!this.wallet) throw 'Wallet is required for transaction signing';
        // TODO: implement stringify

        const res = await this.wallet.signAndSendTransaction({
            signerId: this.account.accountId,
            receiverId: contractId,
            callbackUrl: walletCallbackUrl,
            actions: [
                {
                    type: "FunctionCall",
                    params: {
                        methodName,
                        args,
                        gas: gas?.toString() ?? MAX_TX_TGAS,
                        deposit: attachedDeposit?.toString() ?? '0',
                    },
                },
            ],
        });

        return res as FinalExecutionOutcome;
    }

    public async viewFunctionV2({
        contractId,
        methodName,
        args,
        parse,
        stringify,
        jsContract,
        blockQuery
    }: ViewFunctionCallOptions): Promise<any> {

        stringify = stringify ?? ((input: any) => Buffer.from(JSON.stringify(input)));
        parse = parse ?? ((response: Uint8Array) => JSON.parse(Buffer.from(response).toString()));

        const result = await this.rpcProvider.query<CodeResult>({
            request_type: "call_function",
            account_id: contractId,
            method_name: methodName,
            args_base64: stringify(args).toString("base64"),
            finality: "optimistic",
        });

        return parse(new Uint8Array(result.result));
    }
}