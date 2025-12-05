import { BuyWidget } from '../widgets/buy/BuyWidget';
import { ConnectWallet } from '../connectWallet/ConnectWallet';
import { WalletConnectContext } from '../../context';
import { useContext } from 'react';

export const BuyCrypto = () => {
    const { account } = useContext(WalletConnectContext);
    return (
        <>
            <div
                className={`w-full h-[80vh] flex m-auto ${
                    account ? '' : 'blur-sm pointer-events-none'
                }`}
            >
                <div className="w-full flex flex-col items-center bg-black-600 rounded-[16px] m-auto box-shadow">
                    <div className="font-kanit-medium color-gray-gradient text-shadow text-xl tracking-[.12em] mt-4">
                        BUY CRYPTO
                    </div>
                    <BuyWidget />
                </div>
            </div>
            {!account && <ConnectWallet />}
        </>
    );
};
