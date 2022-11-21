import { Wallet } from "../near-wallet";
import { HelloNear } from "../contracts";
import { HELLO_NEAR_ADDRESS } from "../constants";
import { WalletAccount } from "@neargen-js/core";

export const getGreeting = ({
  account,
  getJsonRpcProvider,
  wallet,
}: Wallet) => {
  return new HelloNear(
    HELLO_NEAR_ADDRESS,
    new WalletAccount(account, getJsonRpcProvider(), wallet)
  ).get_greeting();
};

export const setGreeting = ({
  account,
  getJsonRpcProvider,
  wallet,
}: Wallet) => {
  return new HelloNear(
    HELLO_NEAR_ADDRESS,
    new WalletAccount(account, getJsonRpcProvider(), wallet)
  ).set_greeting({ message: "new_message" });
};
