import React from 'react';

export const EducationalText = () => {
    return (
        <>
        <p>
            Look at that! A Hello World app! This greeting is stored on the NEAR blockchain. Check it out:
        </p>
        <ol>
            <li>
                Look in <code>frontend/App.tsx</code> - you'll see <code>getGreeting</code> and <code>setGreeting</code> being called on <code>contract</code>. What's this?
            </li>
            <li>
                Ultimately, this <code>contract</code> code is defined in <code>./contracts</code> – this is the source code for your <a target="_blank" rel="noreferrer" href="https://docs.near.org/docs/develop/contracts/overview">smart contract</a>.</li>
            <li>
                When you run <code>yarn deploy</code>, the code in <code>./contracts</code> gets deployed to the NEAR testnet. You can see how this happens by looking in <code>package.json</code>.</li>
        </ol>
        <hr />
        <p>
            To keep learning, check out <a target="_blank" rel="noreferrer" href="https://docs.near.org">the NEAR docs</a> or look through some <a target="_blank" rel="noreferrer" href="https://examples.near.org">example apps</a>.
        </p>
        </>
    );
};