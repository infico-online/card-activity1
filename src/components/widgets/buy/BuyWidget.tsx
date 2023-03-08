import { GradientButton } from '../../button/gradient/GradientButton';
import { WalletConnectContext } from '../../../context';
// @ts-ignore
import transakSDK from '@transak/transak-sdk';
import { useConfig } from '../../../hooks/use-config';
import { useContext } from 'react';

const transakBasicConfig = {
    hostURL: window.location.origin,
    widgetHeight: '550px',
    widgetWidth: window.innerWidth > 500 ? '450px' : '90vw',
    defaultNetwork: 'ethereum',
    network: 'ethereum',
    defaultFiatAmount: 1000,
};

export const BuyWidget = () => {
    const { account } = useContext(WalletConnectContext);
    const { transakApiKey, transakEnv } = useConfig();

    const openTransak = (swapAsset: string) => {
        new transakSDK({
            ...transakBasicConfig,
            apiKey: transakApiKey,
            environment: transakEnv,
            walletAddress: account,
            hostURL: window.location.origin,
            defaultCryptoCurrency: swapAsset,
            cryptoCurrencyList: [swapAsset],
        }).init();
    };

    return (
        <div className="w-full flex flex-col items-center mt-10 mb-4">
            <div>
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="OTC TRADE DESK"
                    onClick={() =>
                        window.open(
                            'https://forms.gle/GdRfnSwVBA7H71VDA',
                            '_blank',
                            'noreferrer',
                        )
                    }
                />
            </div>
            <div className="mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY ETH"
                    onClick={() => openTransak('ETH')}
                />
            </div>
            <div className="mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY USDC"
                    onClick={() => openTransak('USDC')}
                />
            </div>
            <div className="mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY USDT"
                    onClick={() => openTransak('USDT')}
                />
            </div>
            <div className="mt-6">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY DAI"
                    onClick={() => openTransak('DAI')}
                />
            </div>
        </div>
    );
};
