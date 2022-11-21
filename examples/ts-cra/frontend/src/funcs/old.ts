import { Wallet } from "../near-wallet";
import { CONTRACT_ADDRESS } from "../constants";

export const getGreeting = (wallet: Wallet) => {
  return wallet.view<string>(CONTRACT_ADDRESS, "get_greeting");
};

export const setGreeting = (wallet: Wallet) => {
  return wallet.call(CONTRACT_ADDRESS, "set_gretting", { message: "new greeting" });
};
