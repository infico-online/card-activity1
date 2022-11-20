import { useContext, useEffect, useState } from 'react';

import { GradientButton } from '../../button/gradient/GradientButton';
import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk';
import { WalletConnectContext } from '../../../context';

const rampBasicConfig = {
    hostAppName: 'Data Lake',
    hostLogoUrl:
        'https://data-lake.co/wp-content/uploads/2022/07/DL-Logo-Mark-Black.png',
    fiatValue: '100',
    fiatCurrency: 'USD',
};

export const BuyWidget = () => {
    const { account } = useContext(WalletConnectContext);

    const openRamp = (swapAsset: string) => {
        new RampInstantSDK({
            ...rampBasicConfig,
            swapAsset,
            userAddress: account,
        }).show();
    };

    return (
        <div className="w-full flex flex-col items-center mt-10 mb-4">
            <div>
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY ETH"
                    onClick={() => openRamp('ETH_ETH')}
                />
            </div>
            <div className="mt-8">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY USDC"
                    onClick={() => openRamp('ETH_USDC')}
                />
            </div>
            <div className="mt-8">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY USDT"
                    onClick={() => openRamp('ETH_USDT')}
                />
            </div>
            <div className="mt-8">
                <GradientButton
                    size="medium"
                    disabled={false}
                    text="BUY DAI"
                    onClick={() => openRamp('ETH_DAI')}
                />
            </div>
        </div>
    );
};
