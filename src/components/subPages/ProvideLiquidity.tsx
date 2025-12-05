import { ConnectWallet } from '../connectWallet/ConnectWallet';
import { ProvideLiquidityWidget } from '../widgets/provideLiquidity/ProvideLiquidityWidget';
import { WalletConnectContext } from '../../context';
import { useContext } from 'react';

export const ProvideLiquidity = () => {
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
                        PROVIDE LIQUIDITY
                    </div>
                    <ProvideLiquidityWidget />
                </div>
            </div>
            {!account && <ConnectWallet />}
        </>
    );
};
