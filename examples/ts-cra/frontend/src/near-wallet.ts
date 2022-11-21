/* A helper file that simplifies using the wallet selector */

// near api js
import {providers} from 'near-api-js';

// wallet selector UI
import '@near-wallet-selector/modal-ui/styles.css';
import { setupModal } from '@near-wallet-selector/modal-ui';
import MyNearIconUrl from '@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png';

// wallet selector options
import { setupWalletSelector, WalletSelector, Wallet as W, Account } from '@near-wallet-selector/core';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { CodeResult } from "near-api-js/lib/providers/provider";

export const THIRTY_TGAS = "30000000000000";
export const NO_DEPOSIT = "0";

export class Wallet {
    public wallet: W | undefined = undefined;

    private walletSelector: WalletSelector | null = null;
    private readonly network: "mainnet" | "testnet";
    private _account?: Account | undefined;

    constructor(network?: "mainnet" | "testnet") {
        this.network = network || "testnet";
    }

    public async startUp(): Promise<boolean> {
        this.walletSelector = await setupWalletSelector({
            network: this.network,
            modules: [
                setupMyNearWallet({ iconUrl: MyNearIconUrl }),
            ],
        });
        const isSignedIn = this.walletSelector.isSignedIn();
        if (isSignedIn) {
            this.wallet = await this.walletSelector.wallet();
            this._account =  { accountId: this.walletSelector.store.getState().accounts[0].accountId };
        }

        return isSignedIn;
    }

    // Sign-in method
    public signIn() {
        if (!this.walletSelector) throw new Error("Wallet selector is null or undefined.");

        const description = 'Please select a wallet to sign in.';
        const modal = setupModal(this.walletSelector, { contractId: "", description });
        modal.show();
    }

    // Sign-out method
    public async signOut(): Promise<void> {
        if (this.wallet) {
            await this.wallet.signOut();
        }
        this.wallet = this._account = undefined;
        window.location.replace(window.location.origin + window.location.pathname);
    }

    // Make a read-only call to retrieve information from the network
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    public async view<T extends unknown = unknown>(
      contractId: string,
      method: string,
      args: Record<string, unknown> = {}
    ): Promise<T> {
        if (!this.walletSelector)
            throw new Error("Wallet selector is null or undefined.");

        const { network } = this.walletSelector.options;
        const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });
        const result = await provider.query<CodeResult>({
            request_type: "call_function",
            account_id: contractId,
            method_name: method,
            args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
            finality: "optimistic",
        });

        return JSON.parse(Buffer.from(result.result).toString()) as T;
    }

    // Call a method that changes the contract's state
    public async call(
      contractId: string,
      method: string,
      args: Record<string, unknown> = {},
      gas = THIRTY_TGAS,
      deposit = NO_DEPOSIT
    ) {
        if (!this.wallet || !this.account.accountId)
            throw new Error("Wallet or/and accountId is/are null or undefined.");

        // Sign a transaction with the "FunctionCall" action
        return await this.wallet.signAndSendTransaction({
            signerId: this.account.accountId,
            receiverId: contractId,
            actions: [
                {
                    type: "FunctionCall",
                    params: {
                        methodName: method,
                        args,
                        gas,
                        deposit,
                    },
                },
            ],
        });
    }

    public getJsonRpcProvider() {
        if (!this.walletSelector) throw new Error("Wallet selector is null or undefined.");

        const { network } = this.walletSelector.options;
        return new providers.JsonRpcProvider({ url: network.nodeUrl });
    }

    public get account() {
        return this._account ?? { accountId: "" };
    }
}