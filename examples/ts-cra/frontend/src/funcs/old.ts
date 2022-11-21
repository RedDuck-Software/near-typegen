import { Wallet } from "../near-wallet";
import { HELLO_NEAR_ADDRESS } from "../constants";

export const getGreeting = (wallet: Wallet) => {
  return wallet.view<string>(HELLO_NEAR_ADDRESS, "get_greeting");
};

export const setGreeting = (wallet: Wallet) => {
  return wallet.call(HELLO_NEAR_ADDRESS, "set_gretting", { message: "new greeting" });
};
