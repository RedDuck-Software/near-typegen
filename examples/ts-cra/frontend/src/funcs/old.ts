import { NO_DEPOSIT, THIRTY_TGAS, Wallet } from "../near-wallet";
import { HELLO_NEAR_ADDRESS } from "../constants";

export const getGreeting = ({ view }: Wallet) => {
  return view<string>(HELLO_NEAR_ADDRESS, "get_greeting");
};

export const setGreeting = ({ call }: Wallet) => {
  return call(
    HELLO_NEAR_ADDRESS,
    "set_gretting",
    { message: "new greeting" },
    THIRTY_TGAS,
    NO_DEPOSIT
  );
};
