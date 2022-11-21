import { Wallet } from "../near-wallet";
import { HelloNear } from "../contracts";
import { HELLO_NEAR_ADDRESS } from "../constants";
import { WalletAccount } from "@neargen-js/core";

export const getGreeting = (wallet: Wallet) => {
  return new HelloNear(HELLO_NEAR_ADDRESS, new WalletAccount(wallet.account, wallet.getJsonRpcProvider(), wallet.wallet)).get_greeting();
};

export const setGreeting = (wallet: Wallet) => {
  return new HelloNear(HELLO_NEAR_ADDRESS, new WalletAccount(wallet.account, wallet.getJsonRpcProvider(), wallet.wallet)).set_greeting({ message: "new greeting" });
};
