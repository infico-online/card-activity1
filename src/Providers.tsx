import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DAppProvider } from '@usedapp/core';

import { GlobalStyle } from './providers/GlobalStyle';
import { WalletConnectProvider } from './providers/WalletConnectProvider';
import { dappConfig } from './dapp-config';

interface Props {
    children: ReactNode;
}

export const Providers = ({ children }: Props) => (
    <DAppProvider config={dappConfig}>
        <WalletConnectProvider>
            <BrowserRouter>
                <GlobalStyle />
                {children}
            </BrowserRouter>
        </WalletConnectProvider>
    </DAppProvider>
);
