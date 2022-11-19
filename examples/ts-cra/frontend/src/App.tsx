import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { HelloNear } from "./contracts";
import type { Wallet } from "./near-wallet";
import { EducationalText, SignInPrompt, SignOutButton } from "./components";
import { HELLO_NEAR_ADDRESS } from "./constants";
import { WalletAccount } from '@neargen-js/core';

interface AppProps {
    wallet: Wallet;
}

const App: FC<AppProps> = ({ wallet }) => {
    const ref = useRef<HTMLInputElement>(null);

    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [uiPleaseWait, setUiPleaseWait] = useState<boolean>(true);
    const [valueFromBlockchain, setValueFromBlockchain] = useState<string>("");

    useEffect(() => {
        wallet.startUp()
            .then(setIsSignedIn)
            .then(() => {
                new HelloNear(HELLO_NEAR_ADDRESS, new WalletAccount(wallet.account, wallet.getJsonRpcProvider(), wallet.wallet)).get_greeting()
                    .then(setValueFromBlockchain)
                    .catch(alert)
                    .finally(() => {
                        setUiPleaseWait(false);
                    });
            })
            .catch(alert)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!isSignedIn) {
        return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn() } />;
    }

    const changeGreeting = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUiPleaseWait(true);
        const greetingInput = ref?.current?.value || "";
        const helloNear = new HelloNear(HELLO_NEAR_ADDRESS, new WalletAccount(wallet.account, wallet.getJsonRpcProvider(), wallet.wallet));
        helloNear.set_greeting({ message: greetingInput })
            .then(() => helloNear.get_greeting())
            .then(setValueFromBlockchain)
            .finally(() => {
                setUiPleaseWait(false);
            });
    };

    return (
        <>
            <SignOutButton accountId={wallet.account.accountId || ""} onClick={() => wallet.signOut()} />
            <main className={uiPleaseWait ? 'please-wait' : ''}>
                <h1>
                    The contract says: <span className="greeting">{valueFromBlockchain}</span>
                </h1>
                <form onSubmit={changeGreeting} className="change">
                    <label>Change greeting:</label>
                    <div>
                        <input
                            autoComplete="off"
                            defaultValue={valueFromBlockchain}
                            id="greetingInput"
                            ref={ref}
                        />
                        <button>
                            <span>Save</span>
                            <div className="loader"></div>
                        </button>
                    </div>
                </form>
                <EducationalText />
            </main>
        </>
    );
};

export default App;
