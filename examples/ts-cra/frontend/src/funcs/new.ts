import { Wallet } from "../near-wallet";
import { HelloNear } from "../contracts";
import { CONTRACT_ADDRESS } from "../constants";
import { WalletAccount } from "@neargen-js/core";

export const getAccount = (wallet: Wallet) => new WalletAccount(wallet.account, wallet.getJsonRpcProvider(), wallet.wallet);

export const getGreeting = (wallet: Wallet) => {
  return new HelloNear(CONTRACT_ADDRESS, getAccount(wallet)).get_greeting();
};

export const setGreeting = (wallet: Wallet) => {
  return new HelloNear(CONTRACT_ADDRESS, getAccount(wallet)).set_greeting({ message: "new greeting" });
};
