import { createContext } from 'react';
import { WalletConnectState } from '../hooks/use-wallet-connect';

export const WalletConnectContext = createContext<WalletConnectState>({
    loading: false,
    active: false,
    account: undefined,
    ethBalance: 0,
    tokenBalance: 0,
    library: undefined,
    error: null,
    activateProvider: () => {},
    deactivate: () => {},
    activateBrowserWallet: () => {},
});
