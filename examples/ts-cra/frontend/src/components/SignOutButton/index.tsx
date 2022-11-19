import React, { FC } from 'react';

interface SignOutButtonProps {
    accountId: string;
    onClick: () => void | Promise<void>;
}

export const SignOutButton: FC<SignOutButtonProps> = ({ accountId, onClick }) => {
    return (
        <button style={{ float: 'right' }} onClick={onClick}>
            Sign out {accountId}
        </button>
    );
};